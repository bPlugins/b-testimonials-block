<?php
/**
 * Importing the reviews themselves from Google and Facebook.
 *
 * The badge blocks already show a live score -- "4.8, 312 reviews" -- fetched by
 * includes/review-sources.php. What nobody could do until now was read those
 * 312 reviews. This brings them across as testimonials, so a shop can show real
 * Google reviews in any of the forty layouts instead of retyping them.
 *
 * Credentials are not asked for twice. Whatever was entered on the Review
 * Sources screen for the badges is what this reads, through
 * BPBTB_Review_Sources' public API -- this file stores no keys of its own and
 * writes nothing back to that option.
 *
 * ---------------------------------------------------------------------------
 * Two limits worth knowing before promising anything to a user:
 *
 *   Google returns at most FIVE reviews. Not a bug, not a quota, not something
 *   a paid key lifts: Place Details has no pagination and returns the five it
 *   considers most relevant. Every plugin claiming to import "all" your Google
 *   reviews is either scraping or paying a third-party aggregator. The screen
 *   says five, because five is what arrives.
 *
 *   Facebook needs a Page you administer. There is no way to read the reviews
 *   of a Page you do not own, and there should not be.
 * ---------------------------------------------------------------------------
 *
 * ---------------------------------------------------------------------------
 * On which Google endpoint is used.
 *
 * There are two, and they are not interchangeable:
 *
 *   legacy  maps.googleapis.com/maps/api/place/details/json
 *           Frozen since 1 March 2025. It still answers, and stays supported for
 *           projects that already had it switched on -- but it CANNOT BE ENABLED
 *           ON A NEW CLOUD PROJECT. Somebody making a key today will not find
 *           "Places API" in the console at all, only "Places API (New)".
 *
 *   new     places.googleapis.com/v1/places/{id}
 *           What a new key gets. Bills per field mask, so asking for `reviews`
 *           alone costs a fraction of a whole place read. It is also the one
 *           review-sources.php already calls for the badge score.
 *
 * The default mode is `auto`: legacy is tried first, and when it refuses for a
 * reason that is about access rather than about content, the new one answers
 * instead. Whichever succeeded is recorded and shown on the import screen, so
 * which endpoint is feeding the site is a fact on the page rather than a guess.
 * `legacy` and `new` pin it, through the option or the
 * `bpbtb_google_reviews_endpoint` filter.
 *
 * Both paths produce the same rows and -- the part that matters -- the same
 * dedupe keys, so changing mode re-imports nothing. See google_key().
 * ---------------------------------------------------------------------------
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Review_Import' ) ) {

class BPBTB_Review_Import {

	/**
	 * Fetched reviews are cached under this transient, per platform.
	 */
	const CACHE_PREFIX = 'bpbtb_imported_reviews_';

	/**
	 * How long a fetched batch stays usable.
	 *
	 * Long, deliberately. This is a manual import -- somebody presses a button --
	 * so the cache exists to stop a double-click costing two API calls, not to
	 * keep anything fresh. "Refresh from the platform" clears it.
	 */
	const CACHE_TTL = HOUR_IN_SECONDS;

	/**
	 * Which Google endpoint to read reviews from: auto, legacy or new.
	 */
	const ENDPOINT_OPTION = 'bpbtb_google_endpoint';

	/**
	 * Which one actually answered last time, and what the other one said.
	 */
	const ENDPOINT_STATE = 'bpbtb_google_endpoint_state';

	/**
	 * The platform slugs, with no translated strings attached.
	 *
	 * Separate from platforms() because this file runs while the plugin is
	 * loading, and init() needs the slugs then to register its hooks. Calling
	 * __() that early makes WordPress load the text domain before `init`, which
	 * it warns about and which breaks translation for the whole plugin.
	 *
	 * @return string[]
	 */
	public static function slugs() {
		return [ 'google', 'facebook' ];
	}

	/**
	 * Platforms this can read reviews from.
	 *
	 * Trustpilot and G2 are absent on purpose: neither publishes review text on
	 * the plan a normal site owner has. Trustpilot's review content is a paid
	 * API tier, and G2's is a vendor partnership. Their badges keep working;
	 * only the import is missing, which is honest about what is reachable.
	 *
	 * @return array<string,string> Slug => label.
	 */
	public static function platforms() {
		return [
			'google'   => __( 'Google reviews', 'b-testimonials-block' ),
			'facebook' => __( 'Facebook recommendations', 'b-testimonials-block' ),
		];
	}

	/**
	 * Hook into the import screen.
	 */
	public static function init() {
		add_filter( 'bpbtb_import_sources', [ __CLASS__, 'register_sources' ] );

		foreach ( self::slugs() as $slug ) {
			add_filter( 'bpbtb_import_read_' . $slug, [ __CLASS__, 'read_rows' ], 10, 1 );
		}

		add_action( 'admin_post_bpbtb_refresh_reviews', [ __CLASS__, 'handle_refresh' ] );
		add_action( 'admin_post_bpbtb_google_endpoint', [ __CLASS__, 'handle_endpoint' ] );
	}

	/**
	 * Whether the badge settings already hold what this platform needs.
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function is_connected( $platform ) {
		return class_exists( 'BPBTB_Review_Sources' )
			&& BPBTB_Review_Sources::is_connected( $platform );
	}

	/**
	 * Add the connected platforms to the import screen's source list.
	 *
	 * @param array $sources Existing sources.
	 * @return array
	 */
	public static function register_sources( $sources ) {
		foreach ( self::platforms() as $slug => $label ) {
			if ( ! self::is_connected( $slug ) ) {
				continue;
			}

			$sources[ $slug ] = [
				'label'          => $label,
				'post_type'      => '',
				'remote'         => true,
				'count_callback' => static function () use ( $slug ) {
					return count( self::fetch( $slug ) );
				},
			];
		}

		return $sources;
	}

	/**
	 * Rows for the importer, in the shape BPBTB_Import_Sources::create() wants.
	 *
	 * @param array|null $rows Passed through from the filter; always null here.
	 * @return array|null
	 */
	public static function read_rows( $rows ) {
		$filter = current_filter();
		$slug   = str_replace( 'bpbtb_import_read_', '', $filter );

		if ( ! in_array( $slug, self::slugs(), true ) ) {
			return $rows;
		}

		return self::fetch( $slug );
	}

	/**
	 * Fetch a platform's reviews, from cache when possible.
	 *
	 * @param string $platform Platform slug.
	 * @param bool   $force    Skip the cache.
	 * @return array[] Normalised rows.
	 */
	public static function fetch( $platform, $force = false ) {
		if ( ! in_array( $platform, self::slugs(), true ) || ! self::is_connected( $platform ) ) {
			return [];
		}

		$key = self::CACHE_PREFIX . $platform;

		if ( ! $force ) {
			$cached = get_transient( $key );

			if ( is_array( $cached ) ) {
				return $cached;
			}
		}

		$settings = BPBTB_Review_Sources::get_settings();
		$config   = isset( $settings[ $platform ] ) ? $settings[ $platform ] : [];

		$rows = 'google' === $platform
			? self::fetch_google( $config )
			: self::fetch_facebook( $config );

		if ( is_wp_error( $rows ) ) {
			self::remember_error( $platform, $rows->get_error_message() );

			// A short cache on failure too, so a broken key does not mean an
			// outbound request on every page load of the import screen.
			set_transient( $key, [], 5 * MINUTE_IN_SECONDS );

			return [];
		}

		self::remember_error( $platform, '' );
		set_transient( $key, $rows, self::CACHE_TTL );

		return $rows;
	}

	/**
	 * The last error a platform reported, for the screen to show.
	 *
	 * @param string $platform Platform slug.
	 * @param string|null $set Message to store, or null to read.
	 * @return string
	 */
	public static function remember_error( $platform, $set = null ) {
		$errors = get_option( 'bpbtb_review_import_errors', [] );
		$errors = is_array( $errors ) ? $errors : [];

		if ( null === $set ) {
			return isset( $errors[ $platform ] ) ? (string) $errors[ $platform ] : '';
		}

		if ( '' === $set ) {
			unset( $errors[ $platform ] );
		} else {
			$errors[ $platform ] = $set;
		}

		update_option( 'bpbtb_review_import_errors', $errors, false );

		return (string) $set;
	}

	/**
	 * Which endpoint mode is in force.
	 *
	 * @return string 'auto', 'legacy' or 'new'.
	 */
	public static function endpoint_mode() {
		$mode = (string) get_option( self::ENDPOINT_OPTION, 'auto' );

		/**
		 * Pin the Google reviews endpoint in code.
		 *
		 * @param string $mode 'auto', 'legacy' or 'new'.
		 */
		$mode = (string) apply_filters( 'bpbtb_google_reviews_endpoint', $mode );

		return in_array( $mode, [ 'auto', 'legacy', 'new' ], true ) ? $mode : 'auto';
	}

	/**
	 * The endpoint modes, labelled for the settings control.
	 *
	 * @return array<string,string>
	 */
	public static function endpoint_modes() {
		return [
			'auto'   => __( 'Automatic — try the legacy endpoint, fall back to Places API (New)', 'b-testimonials-block' ),
			'legacy' => __( 'Legacy only — maps.googleapis.com Place Details', 'b-testimonials-block' ),
			'new'    => __( 'Places API (New) only — places.googleapis.com', 'b-testimonials-block' ),
		];
	}

	/**
	 * What happened on the last Google read.
	 *
	 * Recorded rather than inferred, because the interesting case is the quiet
	 * one: `auto` succeeding on the new endpoint after the legacy one refused
	 * looks identical, from the imported reviews alone, to legacy having worked.
	 * The import screen shows this so the difference is visible.
	 *
	 * @param string|null $used Endpoint that answered, or null to read.
	 * @param string      $note Why the other one did not.
	 * @return array{used:string,note:string,time:int}
	 */
	public static function endpoint_state( $used = null, $note = '' ) {
		if ( null === $used ) {
			$state = get_option( self::ENDPOINT_STATE, [] );
			$state = is_array( $state ) ? $state : [];

			return [
				'used' => isset( $state['used'] ) ? (string) $state['used'] : '',
				'note' => isset( $state['note'] ) ? (string) $state['note'] : '',
				'time' => isset( $state['time'] ) ? (int) $state['time'] : 0,
			];
		}

		$state = [
			'used' => (string) $used,
			'note' => (string) $note,
			'time' => time(),
		];

		update_option( self::ENDPOINT_STATE, $state, false );

		return $state;
	}

	/**
	 * Google reviews, from whichever endpoint the mode asks for.
	 *
	 * @param array $config Stored Google settings.
	 * @return array[]|WP_Error
	 */
	private static function fetch_google( $config ) {
		$place = preg_replace( '#^places/#', '', trim( (string) ( $config['place_id'] ?? '' ) ) );
		$key   = trim( (string) ( $config['api_key'] ?? '' ) );

		if ( '' === $place || '' === $key ) {
			return new WP_Error( 'bpbtb_not_connected', __( 'Google is not connected.', 'b-testimonials-block' ) );
		}

		$mode = self::endpoint_mode();

		if ( 'new' === $mode ) {
			$rows = self::fetch_google_new( $place, $key );

			self::endpoint_state(
				is_wp_error( $rows ) ? 'new-failed' : 'new',
				is_wp_error( $rows ) ? $rows->get_error_message() : ''
			);

			return $rows;
		}

		$legacy = self::fetch_google_legacy( $place, $key );

		if ( ! is_wp_error( $legacy ) ) {
			self::endpoint_state( 'legacy' );

			return $legacy;
		}

		/*
		 * Only an access refusal is worth a second call.
		 *
		 * A Place ID that does not exist, or a listing with no written reviews,
		 * gets the same answer from the new endpoint -- so retrying there spends a
		 * billable request to be told the same thing twice. `bpbtb_google_denied`
		 * marks the failures that are about the key or the project rather than
		 * about the place, and those are the ones the new endpoint may well
		 * answer, since a modern key is entitled to it and not to the old one.
		 */
		$retry = 'bpbtb_google_denied' === $legacy->get_error_code();

		if ( 'legacy' === $mode || ! $retry ) {
			self::endpoint_state( 'legacy-failed', $legacy->get_error_message() );

			return $legacy;
		}

		$rows = self::fetch_google_new( $place, $key );

		if ( is_wp_error( $rows ) ) {
			// Both refused. The legacy reason is what started it, but the new
			// endpoint's is the one to act on: a modern key that cannot read the
			// modern endpoint is a real misconfiguration, whereas the legacy
			// refusal may simply be March 2025 doing its job.
			self::endpoint_state( 'both-failed', $legacy->get_error_message() );

			return $rows;
		}

		self::endpoint_state( 'new', $legacy->get_error_message() );

		return $rows;
	}

	/**
	 * Google reviews, via the legacy Place Details endpoint.
	 *
	 * `reviews_no_translations=true` is what keeps the dedupe key stable across
	 * the two endpoints: without it Google hands back its own translation of the
	 * review into the request language, which is different text from what
	 * `originalText` gives on the new endpoint, and would hash differently.
	 *
	 * @param string $place Place ID.
	 * @param string $key   API key.
	 * @return array[]|WP_Error
	 */
	private static function fetch_google_legacy( $place, $key ) {
		$response = wp_remote_get(
			add_query_arg(
				[
					'place_id'                => rawurlencode( $place ),
					'fields'                  => 'reviews',
					'reviews_no_translations' => 'true',
					'key'                     => rawurlencode( $key ),
				],
				'https://maps.googleapis.com/maps/api/place/details/json'
			),
			[ 'timeout' => 15 ]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			return new WP_Error( 'bpbtb_bad_json', __( 'Google returned something that was not JSON.', 'b-testimonials-block' ) );
		}

		$status = isset( $body['status'] ) ? (string) $body['status'] : '';

		if ( 'OK' !== $status ) {
			$message = isset( $body['error_message'] ) && '' !== $body['error_message']
				? (string) $body['error_message']
				: $status;

			/*
			 * REQUEST_DENIED is the one this whole arrangement exists for: it is
			 * what a key from a Cloud project created after 1 March 2025 gets,
			 * because the legacy Places API cannot be switched on for such a
			 * project at all. OVER_QUERY_LIMIT and UNKNOWN_ERROR are transient,
			 * and INVALID_REQUEST here is about the request rather than the place.
			 * All four are worth asking the other endpoint about; NOT_FOUND and
			 * ZERO_RESULTS are not, since they would be just as true there.
			 */
			$denied = in_array( $status, [ 'REQUEST_DENIED', 'OVER_QUERY_LIMIT', 'UNKNOWN_ERROR', 'INVALID_REQUEST' ], true );

			return new WP_Error(
				$denied ? 'bpbtb_google_denied' : 'bpbtb_google_error',
				sprintf(
					/* translators: 1: Google status code, 2: Google's own message */
					__( 'Legacy Place Details returned %1$s: %2$s', 'b-testimonials-block' ),
					$status ? $status : __( 'no status', 'b-testimonials-block' ),
					$message
				)
			);
		}

		$reviews = isset( $body['result']['reviews'] ) && is_array( $body['result']['reviews'] )
			? $body['result']['reviews']
			: [];

		if ( ! $reviews ) {
			return new WP_Error(
				'bpbtb_no_reviews',
				__( 'Google returned no reviews for this Place ID. A listing with no written reviews returns none even when it has a star rating.', 'b-testimonials-block' )
			);
		}

		$rows = [];

		foreach ( $reviews as $review ) {
			$text = trim( (string) ( $review['text'] ?? '' ) );

			if ( '' === $text ) {
				continue;
			}

			$author = (string) ( $review['author_name'] ?? '' );

			$rows[] = [
				'source_id' => self::google_key( $author, $text ),
				'name'      => sanitize_text_field( $author ),
				'content'   => wp_kses_post( $text ),
				'job'       => '',
				'company'   => '',
				'rating'    => isset( $review['rating'] ) ? (float) $review['rating'] : 0,
				'image_id'  => 0,
				// The reviewer's Google avatar is hotlinked from Google's CDN and
				// is not ours to copy into a media library, so no photo is taken.
				'date'      => isset( $review['time'] ) ? gmdate( 'Y-m-d H:i:s', (int) $review['time'] ) : '',
			];
		}

		return $rows;
	}

	/**
	 * Google reviews, via Places API (New).
	 *
	 * @param string $place Place ID.
	 * @param string $key   API key.
	 * @return array[]|WP_Error
	 */
	private static function fetch_google_new( $place, $key ) {
		$response = wp_remote_get(
			'https://places.googleapis.com/v1/places/' . rawurlencode( $place ),
			[
				'timeout' => 15,
				'headers' => [
					'X-Goog-Api-Key' => $key,
					/*
					 * The field mask is what makes this cost what it costs --
					 * Places API (New) bills per field group, so only the review
					 * fields are asked for, not the whole place.
					 */
					'X-Goog-FieldMask' => 'reviews',
				],
			]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			return new WP_Error( 'bpbtb_bad_json', __( 'Google returned something that was not JSON.', 'b-testimonials-block' ) );
		}

		if ( isset( $body['error']['message'] ) ) {
			return new WP_Error( 'bpbtb_google_error', (string) $body['error']['message'] );
		}

		$reviews = isset( $body['reviews'] ) && is_array( $body['reviews'] ) ? $body['reviews'] : [];

		if ( ! $reviews ) {
			return new WP_Error(
				'bpbtb_no_reviews',
				__( 'Google returned no reviews for this Place ID. A listing with no written reviews returns none even when it has a star rating.', 'b-testimonials-block' )
			);
		}

		$rows = [];

		foreach ( $reviews as $review ) {
			// `text` is the review as written; `originalText` is the same thing
			// before Google translated it. Prefer the original -- a review
			// machine-translated into the site language reads worse than the words
			// the customer actually chose, and it is what the legacy call asks for
			// too, so the two agree on the text and therefore on the dedupe key.
			$body_text = $review['originalText']['text'] ?? ( $review['text']['text'] ?? '' );
			$body_text = trim( (string) $body_text );

			if ( '' === $body_text ) {
				continue;
			}

			$author = $review['authorAttribution'] ?? [];
			$name   = (string) ( $author['displayName'] ?? '' );

			$rows[] = [
				'source_id' => self::google_key( $name, $body_text ),
				'name'      => sanitize_text_field( $name ),
				'content'   => wp_kses_post( $body_text ),
				'job'       => '',
				'company'   => '',
				'rating'    => isset( $review['rating'] ) ? (float) $review['rating'] : 0,
				'image_id'  => 0,
				'date'      => self::to_mysql( $review['publishTime'] ?? '' ),
			];
		}

		return $rows;
	}

	/**
	 * The dedupe key for one Google review.
	 *
	 * Derived from the author and the text rather than from Google's own review
	 * id, and that is the point: the new endpoint gives every review a stable
	 * resource path (`places/X/reviews/Y`) and the legacy one gives no id at all.
	 * Keying on the resource path would mean a site that imported under `legacy`
	 * and later switched to `new` re-imported all five reviews as duplicates --
	 * which is exactly the switch this file exists to make painless.
	 *
	 * The cost is that a review edited by its author imports as a new row rather
	 * than updating the old one. With a hard ceiling of five reviews per listing,
	 * that is a tidy-up rather than a problem.
	 *
	 * @param string $author Reviewer name.
	 * @param string $text   Review body.
	 * @return string
	 */
	private static function google_key( $author, $text ) {
		$author = trim( strtolower( (string) $author ) );
		$text   = trim( preg_replace( '/\s+/u', ' ', (string) $text ) );

		return 'google:' . md5( $author . '|' . $text );
	}

	/**
	 * Facebook Page recommendations, via the Graph API.
	 *
	 * @param array $config Stored Facebook settings.
	 * @return array[]|WP_Error
	 */
	private static function fetch_facebook( $config ) {
		$page_id = trim( (string) ( $config['page_id'] ?? '' ) );
		$token   = trim( (string) ( $config['access_token'] ?? '' ) );

		if ( '' === $page_id || '' === $token ) {
			return new WP_Error( 'bpbtb_not_connected', __( 'Facebook is not connected.', 'b-testimonials-block' ) );
		}

		$response = wp_remote_get(
			add_query_arg(
				[
					'fields'       => 'reviewer{name,picture.width(120).height(120)},created_time,rating,recommendation_type,review_text',
					'limit'        => 100,
					'access_token' => $token,
				],
				'https://graph.facebook.com/v21.0/' . rawurlencode( $page_id ) . '/ratings'
			),
			[ 'timeout' => 15 ]
		);

		if ( is_wp_error( $response ) ) {
			return $response;
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			return new WP_Error( 'bpbtb_bad_json', __( 'Facebook returned something that was not JSON.', 'b-testimonials-block' ) );
		}

		if ( isset( $body['error']['message'] ) ) {
			return new WP_Error( 'bpbtb_facebook_error', (string) $body['error']['message'] );
		}

		$entries = isset( $body['data'] ) && is_array( $body['data'] ) ? $body['data'] : [];

		if ( ! $entries ) {
			return new WP_Error(
				'bpbtb_no_reviews',
				__( 'Facebook returned no recommendations. The Page needs recommendations switched on, and the token must be a Page access token for a Page you administer.', 'b-testimonials-block' )
			);
		}

		$rows = [];

		foreach ( $entries as $entry ) {
			$text = trim( (string) ( $entry['review_text'] ?? '' ) );

			// A recommendation with no words is a thumbs-up and nothing more.
			// There is no testimonial to show, so it is not imported.
			if ( '' === $text ) {
				continue;
			}

			/*
			 * Facebook replaced star ratings with recommend / does not recommend
			 * in 2018, so `rating` is absent on anything recent. A positive
			 * recommendation is mapped to five stars and a negative one to one,
			 * which is the convention every other plugin in this space uses --
			 * and negatives are kept rather than dropped, because silently
			 * importing only the good ones is how review markup gets penalised.
			 */
			if ( isset( $entry['rating'] ) && is_numeric( $entry['rating'] ) ) {
				$rating = (float) $entry['rating'];
			} elseif ( isset( $entry['recommendation_type'] ) ) {
				$rating = 'positive' === $entry['recommendation_type'] ? 5.0 : 1.0;
			} else {
				$rating = 0.0;
			}

			$reviewer = $entry['reviewer'] ?? [];

			$rows[] = [
				'source_id' => (string) ( $entry['open_graph_story']['id'] ?? md5( $text . ( $reviewer['name'] ?? '' ) ) ),
				'name'      => sanitize_text_field( (string) ( $reviewer['name'] ?? '' ) ),
				'content'   => wp_kses_post( $text ),
				'job'       => '',
				'company'   => '',
				'rating'    => $rating,
				'image_id'  => 0,
				'date'      => self::to_mysql( $entry['created_time'] ?? '' ),
			];
		}

		return $rows;
	}

	/**
	 * Turn a platform timestamp into one wp_insert_post() accepts.
	 *
	 * Both platforms send ISO 8601 with a zone. Left empty when it cannot be
	 * read, which makes wp_insert_post() use "now" rather than 1970.
	 *
	 * @param string $value Timestamp.
	 * @return string
	 */
	private static function to_mysql( $value ) {
		$value = trim( (string) $value );

		if ( '' === $value ) {
			return '';
		}

		$time = strtotime( $value );

		return $time ? gmdate( 'Y-m-d H:i:s', $time ) : '';
	}

	/**
	 * The last Google read, said in words, for the import screen.
	 *
	 * @return array{text:string,tone:string} Tone is 'good', 'warn' or 'bad'.
	 */
	public static function endpoint_report() {
		$state = self::endpoint_state();

		if ( '' === $state['used'] ) {
			return [
				'text' => __( 'Not read yet. Press Refresh to try.', 'b-testimonials-block' ),
				'tone' => 'warn',
			];
		}

		switch ( $state['used'] ) {
			case 'legacy':
				return [
					'text' => __( 'The legacy endpoint answered. Your Cloud project has the old Places API enabled, so it keeps working — but a project created after 1 March 2025 cannot enable it, so anyone setting this up fresh will land on Places API (New) instead.', 'b-testimonials-block' ),
					'tone' => 'good',
				];

			case 'new':
				$text = __( 'Places API (New) answered.', 'b-testimonials-block' );

				if ( '' !== $state['note'] ) {
					$text .= ' ' . sprintf(
						/* translators: %s: the legacy endpoint's refusal */
						__( 'The legacy endpoint was tried first and refused: %s', 'b-testimonials-block' ),
						$state['note']
					);
				}

				return [ 'text' => $text, 'tone' => 'good' ];

			case 'legacy-failed':
				return [
					'text' => sprintf(
						/* translators: %s: the legacy endpoint's refusal */
						__( 'The legacy endpoint refused and this setting forbids falling back: %s — switch the setting above to Automatic or to Places API (New).', 'b-testimonials-block' ),
						$state['note']
					),
					'tone' => 'bad',
				];

			case 'new-failed':
				return [
					'text' => sprintf(
						/* translators: %s: the new endpoint's error */
						__( 'Places API (New) refused: %s', 'b-testimonials-block' ),
						$state['note']
					),
					'tone' => 'bad',
				];

			case 'both-failed':
				return [
					'text' => sprintf(
						/* translators: %s: the legacy endpoint's refusal */
						__( 'Neither endpoint would answer. The legacy one said: %s — the error beside Google above is what the new one said, and that is the one to fix.', 'b-testimonials-block' ),
						$state['note']
					),
					'tone' => 'bad',
				];
		}

		return [ 'text' => '', 'tone' => 'warn' ];
	}

	/**
	 * Save the endpoint mode, and re-read straight away so the answer is current.
	 */
	public static function handle_endpoint() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'b-testimonials-block' ), '', [ 'response' => 403 ] );
		}

		check_admin_referer( 'bpbtb_import_export' );

		$mode = isset( $_POST['endpoint'] ) ? sanitize_key( wp_unslash( $_POST['endpoint'] ) ) : 'auto';

		if ( ! in_array( $mode, [ 'auto', 'legacy', 'new' ], true ) ) {
			$mode = 'auto';
		}

		update_option( self::ENDPOINT_OPTION, $mode, false );

		// Changing the endpoint invalidates what the other one cached, and the
		// whole point of the control is to find out what the chosen one says --
		// so it says it now rather than in an hour.
		delete_transient( self::CACHE_PREFIX . 'google' );
		self::fetch( 'google', true );

		wp_safe_redirect(
			add_query_arg(
				[
					'post_type'  => 'testimonial',
					'page'       => 'bpbtb-import-export',
					'bpbtb_done' => 'endpoint',
				],
				admin_url( 'edit.php' )
			)
		);
		exit;
	}

	/**
	 * Clear a platform's cache so the next read goes to the API.
	 */
	public static function handle_refresh() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'b-testimonials-block' ), '', [ 'response' => 403 ] );
		}

		check_admin_referer( 'bpbtb_import_export' );

		$platform = isset( $_POST['platform'] ) ? sanitize_key( wp_unslash( $_POST['platform'] ) ) : '';

		if ( in_array( $platform, self::slugs(), true ) ) {
			delete_transient( self::CACHE_PREFIX . $platform );
			self::fetch( $platform, true );
		}

		wp_safe_redirect(
			add_query_arg(
				[
					'post_type'  => 'testimonial',
					'page'       => 'bpbtb-import-export',
					'bpbtb_done' => 'refreshed',
				],
				admin_url( 'edit.php' )
			)
		);
		exit;
	}
}
}

BPBTB_Review_Import::init();
