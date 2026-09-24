<?php
/**
 * Live review scores from Google, Capterra, Facebook, Trustpilot and G2.
 *
 * The five platform badges used to show a number that was typed into the
 * sidebar, or -- failing that -- averaged from the local testimonials, or --
 * failing that -- a literal in Layout.js ("4.9", "(128+ Reviews)"). None of the
 * three is the score the platform actually publishes, which is the only number a
 * visitor has any reason to believe.
 *
 * This file fetches the real one. Credentials live on one screen
 * (admin-review-sources.php) rather than in each block's attributes, so a key is
 * never written into post content and a site with twenty badges answers for its
 * Google listing once.
 *
 * Four of the five have an official API and are read from it:
 *
 *   Google      Places API (New) -- rating, userRatingCount
 *   Facebook    Graph API page fields -- overall_star_rating, rating_count
 *   Trustpilot  Business API business-units/find -- score.trustScore, numberOfReviews
 *   G2          data.g2.com/api/v2/products -- star_rating, review_count
 *
 * G2's needs a word, because its public side is genuinely shut. Its product
 * pages answer every server-side request with HTTP 403 -- measured, not assumed,
 * against g2.com and capterra.com with four User-Agents (an honest one, a plain
 * WordPress one, desktop Chrome, Googlebot): all eight requests 403, no
 * structured data in the body. Scraping is therefore not attempted, and would
 * mean defeating a deliberate access control if it were.
 *
 * The API is a different door and it is open: `data.g2.com/api/v2` is JSON:API
 * with a bearer token from my.G2's developer portal, and `filter[slug][]` looks
 * a product up by the slug in its own G2 URL. Whether a given account may call
 * it depends on its G2 plan -- the endpoint answers 403 "Your current plan does
 * not provide access to this resource" otherwise -- which is why the typed
 * rating below stays as a fallback rather than being replaced by it.
 *
 * Capterra (Gartner) has no equivalent public API, so it is the one platform
 * whose figure is only ever entered. Entering it here rather than in each block
 * is the part that was actually broken about it: a site with a Capterra badge in
 * three places used to have three numbers to keep in step. See
 * resolve_entered(). A page URL is still read when one is given, for any page
 * that does publish an AggregateRating; it costs the entered figure nothing when
 * it does not.
 *
 * A failed fetch anywhere here keeps the last good score rather than blanking
 * the badge, and reports the reason on the settings screen.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Review_Sources' ) ) {

class BPBTB_Review_Sources {

	/**
	 * Option holding the per-platform credentials and the cache window.
	 */
	const OPTION = 'bpbtb_review_sources';

	/**
	 * Option holding what was last fetched, per platform.
	 *
	 * An option and not a transient. A transient is allowed to vanish -- object
	 * caches drop them, and some hosts flush them wholesale -- and the moment
	 * this one vanished every badge on the site would either blank out or block
	 * the request on a live API call. The freshness clock lives inside the
	 * stored value instead, so losing nothing means losing nothing.
	 */
	const CACHE = 'bpbtb_review_sources_cache';

	/**
	 * Cron hook that refreshes stale platforms in the background.
	 */
	const CRON_HOOK = 'bpbtb_refresh_review_sources';

	/**
	 * Transient prefix for the per-platform "a fetch is already running" lock.
	 */
	const LOCK_PREFIX = 'bpbtb_review_lock_';

	/**
	 * Default hours a fetched score is treated as fresh.
	 */
	const DEFAULT_CACHE_HOURS = 12;

	/**
	 * How long a failed fetch is held before it is retried.
	 *
	 * Short enough that fixing a key shows up quickly, long enough that a
	 * revoked token does not mean an outbound HTTP request per page view.
	 */
	const ERROR_TTL = 900;

	/**
	 * The layout key each platform badge registers, mapped to its platform.
	 *
	 * Read off `layout` rather than the block name: `bpbtb_prepare_block_items()`
	 * is handed attributes alone, and every badge's block.json defaults `layout`
	 * to its own slug. The mirror of BADGE_PLATFORMS in
	 * src/shared/utils/reviewSources.js -- the two must agree, since one decides
	 * what is fetched and the other what is drawn.
	 */
	const LAYOUT_PLATFORMS = [
		'google-review-badge'     => 'google',
		'capterra-review-badge'   => 'capterra',
		'facebook-review-badge'   => 'facebook',
		'trustpilot-review-badge' => 'trustpilot',
		'g2-review-badge'         => 'g2',
	];

	/**
	 * The generic badge, which is bound to no platform by its own identity.
	 *
	 * It picks one in the inspector instead, so its platform comes from the
	 * `ratingPlatform` attribute.
	 */
	const GENERIC_LAYOUT = 'review-badge-widget';

	/**
	 * Platforms whose fetch also returns individual review text.
	 *
	 * Google's Places API (New) hands over up to 5 reviews per place on the
	 * same call that gets the score -- no extra request, just a wider field
	 * mask. Facebook can too, via the `/ratings` edge, with one extra call to
	 * turn whatever token was stored into a Page token (see
	 * facebook_page_token()). Trustpilot and G2's badge scope don't expose
	 * individual review bodies at all, and Capterra is typed in by hand --
	 * those three fall back to Manual Quotes instead; see
	 * RatingSourcePanel.js's isManualQuotesCapable.
	 */
	const PLATFORMS_WITH_REVIEWS = [ 'google', 'facebook' ];

	/**
	 * Does this platform's fetch also return individual review text?
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function supports_reviews( $platform ) {
		return in_array( $platform, self::PLATFORMS_WITH_REVIEWS, true );
	}

	/**
	 * Platforms that publish their own official embeddable widget as an
	 * alternative to reading a score through an API.
	 *
	 * G2's Badge and Trustpilot's TrustBox are both a self-contained snippet a
	 * site pastes in once, needing no credentials at all -- a zero-maintenance
	 * option beside the token-based one, for a site that would rather not run
	 * a G2 API plan or a Trustpilot Business login. See the `embed_code` field
	 * on each in platforms().
	 *
	 * Mirror of PLATFORMS_WITH_EMBED in src/shared/utils/reviewSources.js.
	 */
	const PLATFORMS_WITH_EMBED = [ 'g2', 'trustpilot' ];

	/**
	 * Does this platform offer an official embed widget?
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function supports_embed( $platform ) {
		return in_array( $platform, self::PLATFORMS_WITH_EMBED, true );
	}

	/**
	 * The embed snippet entered for a platform that supports one.
	 *
	 * Independent of is_connected()/is_live_source() on purpose: the whole
	 * point of this mode is that it needs no API credentials, so a site using
	 * only the embed code should never be told the platform is "not
	 * connected".
	 *
	 * @param string $platform Platform slug.
	 * @return string
	 */
	public static function get_embed_code( $platform ) {
		if ( ! self::supports_embed( $platform ) ) {
			return '';
		}

		$settings = self::get_settings()[ $platform ];

		return trim( (string) ( $settings['embed_code'] ?? '' ) );
	}

	/**
	 * Every platform, its credential fields and where to get them.
	 *
	 * `secret` fields are never sent back out of this class -- not to the
	 * settings screen, which renders a masked placeholder, and not over REST.
	 *
	 * @return array
	 */
	public static function platforms() {
		return [
			'google'     => [
				'label'  => __( 'Google', 'b-testimonials-block' ),
				'note'   => __( 'Official Places API (New). The rating and review count come straight from your Google Business Profile listing.', 'b-testimonials-block' ),
				'doc'      => BPBTB_DIR . 'DOCUMENTATION.html#rs-google',
				'requires' => [ [ 'place_id', 'api_key' ] ],
				'fields'   => [
					'place_id' => [
						'label'    => __( 'Place ID', 'b-testimonials-block' ),
						'help'     => __( 'Your listing\'s Place ID, e.g. ChIJN1t_tDeuEmsRUsoyG83frY4. Find it with Google\'s Place ID Finder.', 'b-testimonials-block' ),
					],
					'api_key'  => [
						'label'    => __( 'API key', 'b-testimonials-block' ),
						'help'     => __( 'A Google Cloud API key with the Places API (New) enabled.', 'b-testimonials-block' ),
						'secret'   => true,
					],
				],
			],
			'facebook'   => [
				'label'  => __( 'Facebook', 'b-testimonials-block' ),
				'note'   => __( 'Official Graph API. Needs a Page access token with pages_read_engagement — a Page must have recommendations switched on to report a star rating at all.', 'b-testimonials-block' ),
				'doc'      => BPBTB_DIR . 'DOCUMENTATION.html#rs-facebook',
				'requires' => [ [ 'page_id', 'access_token' ] ],
				'fields'   => [
					'page_id'      => [
						'label'    => __( 'Page ID', 'b-testimonials-block' ),
						'help'     => __( 'The numeric Page ID, or the Page\'s username.', 'b-testimonials-block' ),
					],
					'access_token' => [
						'label'    => __( 'Page access token', 'b-testimonials-block' ),
						'help'     => __( 'A long-lived Page access token. A short-lived one will stop working within hours.', 'b-testimonials-block' ),
						'secret'   => true,
					],
				],
			],
			'trustpilot' => [
				'label'  => __( 'Trustpilot', 'b-testimonials-block' ),
				'note'   => __( 'Official Trustpilot Business API. Returns your TrustScore and total review count for the domain below.', 'b-testimonials-block' ),
				'doc'      => 'https://developers.trustpilot.com/business-units-api',
				'requires' => [ [ 'domain', 'api_key' ] ],
				'fields'   => [
					'domain'  => [
						'label'    => __( 'Business domain', 'b-testimonials-block' ),
						'help'     => __( 'The domain your Trustpilot profile is registered under, e.g. bplugins.com — no https://.', 'b-testimonials-block' ),
					],
					'api_key' => [
						'label'    => __( 'API key', 'b-testimonials-block' ),
						'help'     => __( 'The API key from your Trustpilot Business account.', 'b-testimonials-block' ),
						'secret'   => true,
					],
					'embed_code' => [
						'label' => __( 'TrustBox embed code (optional)', 'b-testimonials-block' ),
						'help'  => __( 'Paste a TrustBox snippet from your Trustpilot Business account (Widgets → TrustBox). A block set to "Official embed widget" shows this instead of the badge above, and needs no API key. The standard TrustBox snippet — a <div> plus a <script src="..."> that loads Trustpilot\'s own bootstrap file — works as-is; a snippet with JavaScript written directly between <script> tags may be altered on save.', 'b-testimonials-block' ),
						'type'  => 'textarea',
					],
				],
			],
			'g2'         => [
				'label'  => __( 'G2', 'b-testimonials-block' ),
				'note'   => __( 'Official G2 API, if your G2 plan includes one. Add a token and a product slug below and the star rating and review count are fetched for real. Without a token there is no way to fetch them — G2\'s public product pages answer every server-side request with HTTP 403 — so the figure you type below is used instead, once for every G2 badge on the site.', 'b-testimonials-block' ),
				'doc'    => 'https://documentation.g2.com/docs/developer-portal',
				// Either half is enough on its own: an API token and slug make
				// this a real live source, and a typed rating makes it a
				// site-wide constant. Both filled in means the API wins and the
				// typed figure is the fallback for when it cannot be reached.
				'manual'   => true,
				'requires' => [ [ 'api_token', 'product_slug' ], [ 'score' ] ],
				'fields'   => [
					'api_token'    => [
						'label'  => __( 'G2 API token', 'b-testimonials-block' ),
						'help'   => __( 'Optional. An access token from my.G2 → Developers → Access Tokens, with Read on the products endpoint. Leave empty to use the typed rating below.', 'b-testimonials-block' ),
						'secret' => true,
					],
					'product_slug' => [
						'label' => __( 'G2 product slug', 'b-testimonials-block' ),
						'help'  => __( 'The last part of your G2 product URL — for g2.com/products/your-product/reviews that is "your-product". Needed with the token above.', 'b-testimonials-block' ),
					],
					'score'        => [
						'label' => __( 'Rating (fallback)', 'b-testimonials-block' ),
						'help'  => __( 'Out of 5, as shown on your G2 product page, e.g. 4.8. Used when there is no API token, and when the API cannot be reached.', 'b-testimonials-block' ),
						'type'  => 'number',
					],
					'count'       => [
						'label' => __( 'Review count', 'b-testimonials-block' ),
						'help'  => __( 'Total reviews. Leave it empty and the badge shows no count line at all. For a category label instead — "Leader, Spring 2026" — type that into the block\'s own Category / Text field; a value there wins over this one.', 'b-testimonials-block' ),
						'type'  => 'integer',
					],
					'profile_url' => [
						'label' => __( 'G2 product page URL', 'b-testimonials-block' ),
						'help'  => __( 'Optional. The badge title links here so a visitor can check the rating. Also read for schema.org data, on the off-chance the page serves any — the figure above is used when it does not.', 'b-testimonials-block' ),
						'type'  => 'url',
					],
					'embed_code' => [
						'label' => __( 'G2 Badge embed code (optional)', 'b-testimonials-block' ),
						'help'  => __( 'Paste the embed code from your G2 profile (Manage → Badges → Embed). A block set to "Official embed widget" shows this instead of the badge above, and needs no API token. G2\'s standard badge — a linked image, with no inline JavaScript — works as-is.', 'b-testimonials-block' ),
						'type'  => 'textarea',
					],
				],
			],
			'capterra'   => [
				'label'  => __( 'Capterra', 'b-testimonials-block' ),
				'note'   => __( 'Capterra (Gartner) has no public rating API, and it answers every server-side request with HTTP 403 — so its figure cannot be fetched and is entered here instead. Entered once: every Capterra badge on the site reads it.', 'b-testimonials-block' ),
				'doc'      => 'https://www.capterra.com/',
				'manual'   => true,
				'requires' => [ [ 'score' ] ],
				'fields'   => [
					'score'       => [
						'label'    => __( 'Rating', 'b-testimonials-block' ),
						'help'     => __( 'Out of 5, as shown on your Capterra product page, e.g. 4.6', 'b-testimonials-block' ),
						'type'     => 'number',
					],
					'count'       => [
						'label' => __( 'Review count', 'b-testimonials-block' ),
						'help'  => __( 'Total reviews. Leave it empty and the badge shows no count line at all — the rating and the stars, and nothing else. Any text in the block\'s own Review Count / Text field wins over this.', 'b-testimonials-block' ),
						'type'  => 'integer',
					],
					'profile_url' => [
						'label' => __( 'Capterra product page URL', 'b-testimonials-block' ),
						'help'  => __( 'Optional. The badge title links here so a visitor can check the rating. Also read for schema.org data, on the off-chance the page serves any — the figure above is used when it does not.', 'b-testimonials-block' ),
						'type'  => 'url',
					],
				],
			],
		];
	}

	/**
	 * Is this a platform we know about?
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function is_platform( $platform ) {
		return is_string( $platform ) && isset( self::platforms()[ $platform ] );
	}

	/**
	 * The stored settings, with every platform's fields present.
	 *
	 * @return array
	 */
	public static function get_settings() {
		$stored = get_option( self::OPTION, [] );
		$stored = is_array( $stored ) ? $stored : [];

		$settings = [
			'cache_hours' => isset( $stored['cache_hours'] ) ? max( 1, min( 168, (int) $stored['cache_hours'] ) ) : self::DEFAULT_CACHE_HOURS,
		];

		foreach ( self::platforms() as $slug => $platform ) {
			$saved = isset( $stored[ $slug ] ) && is_array( $stored[ $slug ] ) ? $stored[ $slug ] : [];

			$settings[ $slug ] = [];
			foreach ( $platform['fields'] as $key => $field ) {
				$settings[ $slug ][ $key ] = isset( $saved[ $key ] ) ? (string) $saved[ $key ] : '';
			}
		}

		return $settings;
	}

	/**
	 * How long a fetched score stays fresh, in seconds.
	 *
	 * @return int
	 */
	public static function cache_ttl() {
		$settings = self::get_settings();

		return (int) $settings['cache_hours'] * HOUR_IN_SECONDS;
	}

	/**
	 * Are all of a platform's required fields filled in?
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function is_connected( $platform ) {
		if ( ! self::is_platform( $platform ) ) {
			return false;
		}

		$settings = self::get_settings()[ $platform ];
		$groups   = self::platforms()[ $platform ]['requires'];

		// Any one complete group is enough. G2 has two -- an API token with a
		// product slug, or a typed rating -- because either makes its badges
		// work and neither is a prerequisite for the other.
		foreach ( $groups as $group ) {
			$complete = true;

			foreach ( $group as $key ) {
				if ( '' === trim( (string) ( $settings[ $key ] ?? '' ) ) ) {
					$complete = false;
					break;
				}
			}

			if ( $complete ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Is this platform reading a real live source, as opposed to only a figure
	 * typed in?
	 *
	 * G2 and Capterra are the two `manual` platforms, and each has its own
	 * live path: G2 by an API token + product slug (see fetch_g2()), Capterra
	 * (and G2 without a token) by scraping a given profile URL for structured
	 * data (see resolve_entered()). Checking `api_token`/`product_slug` for
	 * both used to leave Capterra permanently reporting `false` -- it has
	 * neither field -- even with a profile URL that was reading live.
	 *
	 * @param string $platform Platform slug.
	 * @return bool
	 */
	public static function is_live_source( $platform ) {
		if ( ! self::is_platform( $platform ) ) {
			return false;
		}

		if ( empty( self::platforms()[ $platform ]['manual'] ) ) {
			return true;
		}

		$settings = self::get_settings()[ $platform ];

		if ( isset( $settings['api_token'] ) ) {
			return '' !== trim( (string) $settings['api_token'] )
				&& '' !== trim( (string) ( $settings['product_slug'] ?? '' ) );
		}

		return '' !== trim( (string) ( $settings['profile_url'] ?? '' ) );
	}

	/**
	 * Which platform a set of block attributes is asking for, if any.
	 *
	 * @param array $attributes Block attributes.
	 * @return string Platform slug, or '' when the block is not a review badge.
	 */
	public static function platform_for_attributes( $attributes ) {
		$layout = isset( $attributes['layout'] ) ? (string) $attributes['layout'] : '';

		if ( isset( self::LAYOUT_PLATFORMS[ $layout ] ) ) {
			return self::LAYOUT_PLATFORMS[ $layout ];
		}

		if ( self::GENERIC_LAYOUT === $layout ) {
			$picked = isset( $attributes['ratingPlatform'] ) ? (string) $attributes['ratingPlatform'] : '';

			return self::is_platform( $picked ) ? $picked : '';
		}

		return '';
	}

	/**
	 * An empty result, so every caller gets the same shape.
	 *
	 * @param string $error Error message, if any.
	 * @return array
	 */
	private static function blank( $error = '' ) {
		return [
			'score'   => null,
			'count'   => null,
			'title'   => '',
			'url'     => '',
			'fetched' => 0,
			'error'   => (string) $error,
			// Distinct from `error`, and the distinction matters: an error means
			// the figure could not be got and the badge is falling back. A note
			// means the figure is right and there is something worth saying
			// about where it came from -- which is the normal state of affairs
			// for G2 and Capterra, and not a fault to be reported in red.
			'note'    => '',
			// The long-form reason behind a note, for the settings screen only.
			// The inspector is a 280px column and a paragraph of diagnosis is
			// unreadable in it; the screen that owns the fields has room to
			// explain, and the inspector links to it.
			'detail'  => '',
			// Did the figure being returned actually come from a live read?
			//
			// Separate from `connected`, which only says the fields are filled
			// in, and that gap is what made the UI lie: a G2 badge with a token
			// and a slug reported "Connected" and "fetched just now" while
			// quietly serving the typed fallback. Whether something was fetched
			// is not the same question as whether it could have been.
			'live'    => false,
			'stale'   => false,
			// Individual review text, where the platform hands it over (Google
			// only for now -- see PLATFORMS_WITH_REVIEWS). Each entry:
			// { id, author, rating, text, time, avatarUrl }.
			'reviews' => [],
		];
	}

	/**
	 * Everything currently cached, keyed by platform.
	 *
	 * @return array
	 */
	private static function read_cache() {
		$cache = get_option( self::CACHE, [] );

		return is_array( $cache ) ? $cache : [];
	}

	/**
	 * Store one platform's result.
	 *
	 * @param string $platform Platform slug.
	 * @param array  $data     Result to store.
	 */
	private static function write_cache( $platform, $data ) {
		$cache              = self::read_cache();
		$cache[ $platform ] = $data;

		update_option( self::CACHE, $cache, false );
	}

	/**
	 * The published score for one platform.
	 *
	 * Never blocks a front-end page view on an HTTP request it can avoid. A
	 * stale-but-present score is served immediately and refreshed in the
	 * background; only a platform that has never been fetched at all waits for
	 * the network, because there is nothing else to show.
	 *
	 * @param string $platform Platform slug.
	 * @param bool   $force    Fetch now, ignoring the freshness window.
	 * @return array {
	 *     @type float|null $score   Published rating, null when unknown.
	 *     @type int|null   $count   Published review count, null when unknown.
	 *     @type string     $title   Business or product name as the platform has it.
	 *     @type string     $url     Public profile URL.
	 *     @type int        $fetched Unix time of the last successful attempt.
	 *     @type string     $error   Message from the last failed attempt.
	 *     @type bool       $stale   Whether $score is older than the cache window.
	 * }
	 */
	public static function get_data( $platform, $force = false ) {
		if ( ! self::is_platform( $platform ) ) {
			return self::blank();
		}

		$cache  = self::read_cache();
		$stored = isset( $cache[ $platform ] ) && is_array( $cache[ $platform ] )
			? array_merge( self::blank(), $cache[ $platform ] )
			: null;

		if ( ! self::is_connected( $platform ) ) {
			// Deliberately still returns what was last fetched. Clearing a key
			// to swap it should not blank every badge on the site in between.
			$out = $stored ? $stored : self::blank();

			$out['error'] = __( 'Not connected. Add this platform\'s details under Testimonials → Review Sources.', 'b-testimonials-block' );
			$out['note']   = '';
			$out['detail'] = '';
			$out['live']   = false;
			$out['stale'] = (bool) $stored;

			return $out;
		}

		// An errored result is held for ERROR_TTL, a good one for the configured
		// window -- so a broken token is retried in minutes while a working one
		// is left alone for hours.
		$ttl     = ( $stored && '' !== $stored['error'] ) ? self::ERROR_TTL : self::cache_ttl();
		$age     = $stored ? ( time() - (int) $stored['fetched'] ) : PHP_INT_MAX;
		$is_fresh = $stored && $age < $ttl;

		if ( $is_fresh && ! $force ) {
			return $stored;
		}

		$lock = self::LOCK_PREFIX . $platform;

		// Another request is already fetching this platform. With something to
		// show, show it; with nothing, fall through and fetch -- a lock left
		// behind by a request that died must not leave the badge permanently
		// empty.
		if ( get_transient( $lock ) && $stored && ! $force ) {
			$stored['stale'] = true;

			return $stored;
		}

		// On the front end, refresh out of band unless there is nothing at all
		// to render. Admin, REST and cron are already off the visitor's critical
		// path, so those fetch inline and report the outcome.
		$defer = $stored && ! $force && ! is_admin() && ! wp_doing_cron()
			&& ! ( defined( 'REST_REQUEST' ) && REST_REQUEST );

		if ( $defer ) {
			/*
			 * Nothing is scheduled from here.
			 *
			 * maybe_schedule() keeps an hourly event booked for as long as any
			 * platform is connected, and refresh_stale() re-asks get_data() for
			 * each of them -- from inside cron, where $defer is false and the
			 * fetch happens for real. So the refresh this branch is deferring
			 * is already booked, and a single event added here would only
			 * duplicate it.
			 *
			 * The cost is that a figure can be up to an hour past its window
			 * rather than seconds. That is the right trade for the thing being
			 * traded against: the alternative is a visitor's page render
			 * blocking on somebody else's API.
			 */
			$stored['stale'] = true;

			return $stored;
		}

		set_transient( $lock, 1, 5 * MINUTE_IN_SECONDS );

		$result = self::fetch( $platform );

		delete_transient( $lock );

		if ( is_wp_error( $result ) ) {
			// The last good numbers are kept alongside the error: a badge that
			// blanks out on a rate limit is worse than one showing yesterday's
			// score, and the error still surfaces on the settings screen.
			$data            = $stored ? $stored : self::blank();
			$data['error']   = $result->get_error_message();
			// The note and its detail described where the kept figure came from
			// last time; the error is now the more important thing to say about it.
			$data['note']    = '';
			$data['detail']  = '';
			$data['live']    = false;
			$data['fetched'] = time();
			$data['stale']   = true;

			self::write_cache( $platform, $data );

			return $data;
		}

		$data = array_merge(
			self::blank(),
			$result,
			[
				'fetched' => time(),
				'error'   => '',
				'stale'   => false,
			]
		);

		self::write_cache( $platform, $data );

		return $data;
	}

	/**
	 * Perform one platform's HTTP request.
	 *
	 * @param string $platform Platform slug.
	 * @return array|WP_Error Score/count/title/url, or the reason it failed.
	 */
	private static function fetch( $platform ) {
		$config = self::get_settings()[ $platform ];

		switch ( $platform ) {
			case 'google':
				return self::fetch_google( $config );
			case 'facebook':
				return self::fetch_facebook( $config );
			case 'trustpilot':
				return self::fetch_trustpilot( $config );
			case 'g2':
				return self::fetch_g2( $config );
			case 'capterra':
				return self::resolve_entered( $config, self::platforms()[ $platform ]['label'] );
		}

		return new WP_Error( 'bpbtb_unknown_platform', __( 'Unknown review platform.', 'b-testimonials-block' ) );
	}

	/**
	 * Decode a JSON response, turning transport and HTTP errors into WP_Error.
	 *
	 * @param array|WP_Error $response Result of wp_remote_get().
	 * @param string         $label    Platform name, for the message.
	 * @return array|WP_Error
	 */
	private static function decode_json( $response, $label ) {
		if ( is_wp_error( $response ) ) {
			/* translators: 1: platform name, 2: transport error */
			return new WP_Error( 'bpbtb_http', sprintf( __( 'Could not reach %1$s: %2$s', 'b-testimonials-block' ), $label, $response->get_error_message() ) );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			/* translators: 1: platform name, 2: HTTP status code */
			return new WP_Error( 'bpbtb_bad_json', sprintf( __( '%1$s returned an unreadable response (HTTP %2$d).', 'b-testimonials-block' ), $label, (int) wp_remote_retrieve_response_code( $response ) ) );
		}

		// Both Google and Facebook report failure in an `error` object rather
		// than only in the status line, and their message is far more useful
		// than the code -- "API key not valid", "Page not found".
		if ( isset( $body['error'] ) ) {
			$message = '';
			if ( is_array( $body['error'] ) && ! empty( $body['error']['message'] ) ) {
				$message = (string) $body['error']['message'];
			} elseif ( is_string( $body['error'] ) ) {
				$message = $body['error'];
			}

			/* translators: 1: platform name, 2: error message from the platform */
			return new WP_Error( 'bpbtb_api_error', sprintf( __( '%1$s: %2$s', 'b-testimonials-block' ), $label, $message ? $message : __( 'request rejected', 'b-testimonials-block' ) ) );
		}

		$code = (int) wp_remote_retrieve_response_code( $response );
		if ( $code < 200 || $code > 299 ) {
			/* translators: 1: platform name, 2: HTTP status code */
			return new WP_Error( 'bpbtb_http_status', sprintf( __( '%1$s returned HTTP %2$d.', 'b-testimonials-block' ), $label, $code ) );
		}

		return $body;
	}

	/**
	 * Is any published Google badge actually set to "Review quotes"?
	 *
	 * Checked with a direct LIKE scan of post content rather than a WP_Query +
	 * has_block() loop, which would mean loading and parsing every post that
	 * merely contains the block, quotes mode or not. Runs at most once per
	 * fetch_google() call, which is itself already throttled to the cache
	 * window (get_data()), so an occasional table scan costs far less than
	 * the Places API tier it decides between.
	 *
	 * @return bool
	 */
	private static function site_wants_google_reviews() {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- runs once per cache window, see above.
		$found = $wpdb->get_var(
			"SELECT 1 FROM {$wpdb->posts}
			 WHERE post_status IN ( 'publish', 'draft', 'pending', 'future', 'private' )
			 AND (
			     ( post_content LIKE '%wp:bptmb/google-review-badge%' AND post_content LIKE '%\"displayMode\":\"quotes\"%' )
			     OR (
			         post_content LIKE '%wp:bptmb/review-badge-widget%'
			         AND post_content LIKE '%\"ratingPlatform\":\"google\"%'
			         AND post_content LIKE '%\"displayMode\":\"quotes\"%'
			     )
			 )
			 LIMIT 1"
		);

		return (bool) $found;
	}

	/**
	 * Google Business Profile rating, via the Places API (New).
	 *
	 * The field mask is required by that API. Asking for `reviews` alongside
	 * the score moves this from the Essentials tier to the Enterprise +
	 * Atmosphere tier -- a real cost difference per Google's price sheet, so
	 * it is only added when `site_wants_google_reviews()` finds a published
	 * "Review quotes" badge that would actually use it. Every other site pays
	 * the cheaper tier for the same rating and count.
	 *
	 * @param array $config Platform settings.
	 * @return array|WP_Error
	 */
	private static function fetch_google( $config ) {
		$place = trim( $config['place_id'] );

		// A Place ID pasted from the Places API response often arrives as
		// `places/ChIJ...`; the URL below adds that prefix itself.
		$place = preg_replace( '#^places/#', '', $place );

		$field_mask = 'id,displayName,rating,userRatingCount,googleMapsUri';

		if ( self::site_wants_google_reviews() ) {
			$field_mask .= ',reviews';
		}

		$response = wp_remote_get(
			'https://places.googleapis.com/v1/places/' . rawurlencode( $place ),
			[
				'timeout' => 12,
				'headers' => [
					'X-Goog-Api-Key'   => trim( $config['api_key'] ),
					'X-Goog-FieldMask' => $field_mask,
				],
			]
		);

		$body = self::decode_json( $response, __( 'Google', 'b-testimonials-block' ) );

		if ( is_wp_error( $body ) ) {
			return $body;
		}

		if ( ! isset( $body['rating'] ) ) {
			return new WP_Error( 'bpbtb_no_rating', __( 'Google returned no rating for this Place ID — the listing may have no reviews yet.', 'b-testimonials-block' ) );
		}

		return [
			'score'   => (float) $body['rating'],
			'count'   => isset( $body['userRatingCount'] ) ? (int) $body['userRatingCount'] : null,
			'reviews' => self::parse_google_reviews( $body ),
			'title'   => isset( $body['displayName']['text'] ) ? (string) $body['displayName']['text'] : '',
			'url'     => isset( $body['googleMapsUri'] ) ? (string) $body['googleMapsUri'] : '',
			'live'    => true,
		];
	}

	/**
	 * Normalise the Places API (New) `reviews` array for the editor and front end.
	 *
	 * `name` (e.g. "places/ChIJ.../reviews/xyz") is Google's own opaque id for
	 * the review, kept as-is so a curated pick (`quoteReviewIds`) still matches
	 * after a refetch that returns the same review in a different position.
	 *
	 * @param array $body Decoded Place Details response.
	 * @return array
	 */
	private static function parse_google_reviews( $body ) {
		if ( empty( $body['reviews'] ) || ! is_array( $body['reviews'] ) ) {
			return [];
		}

		$reviews = [];

		foreach ( $body['reviews'] as $review ) {
			$text = isset( $review['text']['text'] ) ? (string) $review['text']['text'] : '';

			// A rating with no text is nothing a "Review quotes" card can show,
			// and the badge above already has the score this review fed into.
			if ( '' === trim( $text ) ) {
				continue;
			}

			$reviews[] = [
				'id'         => isset( $review['name'] ) ? (string) $review['name'] : '',
				'author'     => isset( $review['authorAttribution']['displayName'] ) ? (string) $review['authorAttribution']['displayName'] : '',
				'rating'     => isset( $review['rating'] ) ? (float) $review['rating'] : null,
				'text'       => $text,
				'time'       => isset( $review['relativePublishTimeDescription'] ) ? (string) $review['relativePublishTimeDescription'] : '',
				'avatarUrl'  => isset( $review['authorAttribution']['photoUri'] ) ? (string) $review['authorAttribution']['photoUri'] : '',
				// The reviewer's own Google Maps contributor profile -- Google
				// doesn't hand out a URL to the individual review itself, only
				// to the person who wrote it (which does list it).
				'authorUrl'  => isset( $review['authorAttribution']['uri'] ) ? (string) $review['authorAttribution']['uri'] : '',
			];
		}

		return $reviews;
	}

	/**
	 * Facebook Page star rating and reviews, via the Graph API.
	 *
	 * Two sources, and which of them a token can read depends on the Facebook
	 * app behind it -- measured, not guessed:
	 *
	 *   - The Page's own fields (overall_star_rating, rating_count, name,
	 *     link). A token from a personal app with pages_read_engagement reads
	 *     them. A token from the bPlugins app behind "Connect with Facebook"
	 *     is refused every one of them, even `id`, with `(#100) ... requires
	 *     the 'pages_read_engagement' permission or the 'Page Public Content
	 *     Access' feature`.
	 *   - The `/ratings` edge -- the recommendations themselves. The bPlugins
	 *     token reads it, reviewer names and all; this is the only call
	 *     Business Reviews makes, which is why it works there.
	 *
	 * So neither is allowed to sink the other. Whichever answers is used; the
	 * Page fields win for the score when both do, and when only `/ratings`
	 * answers, the score and count are worked out from the recommendations.
	 * Only when both fail is there an error, and it is the Page-fields one,
	 * since that is the more specific of the two.
	 *
	 * @param array $config Platform settings.
	 * @return array|WP_Error
	 */
	private static function fetch_facebook( $config ) {
		$token   = self::facebook_page_token( $config );
		$page_id = trim( (string) $config['page_id'] );

		$response = wp_remote_get(
			add_query_arg(
				[
					'fields'       => 'name,overall_star_rating,rating_count,link',
					'access_token' => $token,
				],
				'https://graph.facebook.com/v21.0/' . rawurlencode( $page_id )
			),
			[ 'timeout' => 12 ]
		);

		$body    = self::decode_json( $response, __( 'Facebook', 'b-testimonials-block' ) );
		$entries = self::fetch_facebook_ratings( $page_id, $token );

		if ( is_wp_error( $body ) && is_wp_error( $entries ) ) {
			return $body;
		}

		$entries = is_wp_error( $entries ) ? [] : $entries;
		$page    = is_wp_error( $body ) ? [] : $body;

		$score = isset( $page['overall_star_rating'] ) ? (float) $page['overall_star_rating'] : null;

		if ( null === $score && $entries ) {
			$score = self::facebook_average( $entries );
		}

		if ( null === $score ) {
			return new WP_Error( 'bpbtb_no_rating', __( 'Facebook returned no star rating. The Page needs recommendations switched on, and at least one recommendation.', 'b-testimonials-block' ) );
		}

		// `rating_count` only counts the old 1-5 star ratings. A Page that
		// has only had thumbs-up Recommendations since 2018 reports 0 there
		// while /ratings lists them all -- which read as "0 reviews" under
		// five stars. The recommendations are the real count on such a Page.
		$count = isset( $page['rating_count'] ) ? (int) $page['rating_count'] : null;

		if ( ! $count && $entries ) {
			$count = count( $entries );
		}

		return [
			'score'   => $score,
			'count'   => $count,
			'title'   => isset( $page['name'] ) ? (string) $page['name'] : '',
			'url'     => isset( $page['link'] ) ? (string) $page['link'] : 'https://www.facebook.com/' . rawurlencode( $page_id ) . '/reviews',
			'live'    => true,
			'reviews' => self::parse_facebook_reviews( $entries ),
		];
	}

	/**
	 * The star figure a set of recommendations works out to.
	 *
	 * Used only when the Page's own overall_star_rating cannot be read. Each
	 * entry counts as its `rating` if it has one (the pre-2018 stars), else 5
	 * for a recommendation and 1 for a "does not recommend" -- the same
	 * mapping parse_facebook_reviews() puts on the cards, so the score and
	 * the quotes under it agree.
	 *
	 * @param array[] $entries Raw entries from fetch_facebook_ratings().
	 * @return float|null Null when no entry carries a rating either way.
	 */
	private static function facebook_average( $entries ) {
		$sum = 0;
		$n   = 0;

		foreach ( $entries as $entry ) {
			$rating = self::facebook_entry_rating( $entry );

			if ( $rating > 0 ) {
				$sum += $rating;
				++$n;
			}
		}

		return $n ? round( $sum / $n, 1 ) : null;
	}

	/**
	 * One recommendation's stars: its `rating`, else 5 / 1 for positive /
	 * negative, else 0.
	 *
	 * @param array $entry Raw /ratings entry.
	 * @return int
	 */
	private static function facebook_entry_rating( $entry ) {
		if ( isset( $entry['rating'] ) ) {
			return (int) $entry['rating'];
		}

		if ( 'positive' === ( $entry['recommendation_type'] ?? '' ) ) {
			return 5;
		}

		if ( 'negative' === ( $entry['recommendation_type'] ?? '' ) ) {
			return 1;
		}

		return 0;
	}

	/**
	 * The Page access token for the configured Page, whatever was stored.
	 *
	 * `/ratings` answers `(#210) A page access token is required` to anything
	 * else -- and what gets stored is often a USER token: Graph API Explorer
	 * hands one out by default, and it looks exactly like a Page token when
	 * pasted into the field. Business Reviews gets around this the same way:
	 * it trades the token at `/me/accounts` for the token of the Page with
	 * the matching id. A token that is already a Page token has no accounts
	 * edge, Facebook says so, and it is used as it is.
	 *
	 * Remembered for twelve hours, keyed on the stored token, so the exchange
	 * is not repeated on every refresh and reconnecting starts afresh. A
	 * transport failure is not remembered -- that would pin the wrong token
	 * for half a day over one dropped request.
	 *
	 * @param array $config Facebook settings: page_id, access_token.
	 * @return string
	 */
	public static function facebook_page_token( $config ) {
		$page_id = trim( (string) ( $config['page_id'] ?? '' ) );
		$token   = trim( (string) ( $config['access_token'] ?? '' ) );

		if ( '' === $page_id || '' === $token ) {
			return $token;
		}

		$key    = 'bpbtb_fb_page_token_' . md5( $page_id . '|' . $token );
		$cached = get_transient( $key );

		if ( is_string( $cached ) && '' !== $cached ) {
			return $cached;
		}

		$response = wp_remote_get(
			add_query_arg(
				[
					'fields'       => 'id,access_token',
					'limit'        => 250,
					'access_token' => $token,
				],
				'https://graph.facebook.com/v21.0/me/accounts'
			),
			[ 'timeout' => 12 ]
		);

		if ( is_wp_error( $response ) ) {
			return $token;
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			return $token;
		}

		$resolved = $token;

		foreach ( ( isset( $body['data'] ) && is_array( $body['data'] ) ) ? $body['data'] : [] as $account ) {
			if ( $page_id === (string) ( $account['id'] ?? '' ) && ! empty( $account['access_token'] ) ) {
				$resolved = (string) $account['access_token'];
				break;
			}
		}

		set_transient( $key, $resolved, 12 * HOUR_IN_SECONDS );

		return $resolved;
	}

	/**
	 * Raw entries from a Page's `/ratings` edge -- its recommendations.
	 *
	 * Needs a Page access token; see facebook_page_token(). `reviewer` (name
	 * and photo) is only included when the Facebook app behind the token is
	 * allowed to show it: the bPlugins app behind "Connect with Facebook" is,
	 * a personal app in development mode is not, and its entries arrive with
	 * the text and date but no reviewer.
	 *
	 * @param string $page_id Page id.
	 * @param string $token   Page access token.
	 * @return array[]|WP_Error Empty array for a Page with no recommendations.
	 */
	private static function fetch_facebook_ratings( $page_id, $token ) {
		$response = wp_remote_get(
			add_query_arg(
				[
					'fields'       => 'reviewer{id,name,picture.width(120).height(120)},created_time,rating,recommendation_type,review_text',
					'limit'        => 100,
					'access_token' => $token,
				],
				'https://graph.facebook.com/v21.0/' . rawurlencode( trim( (string) $page_id ) ) . '/ratings'
			),
			[ 'timeout' => 15 ]
		);

		$body = self::decode_json( $response, __( 'Facebook', 'b-testimonials-block' ) );

		if ( is_wp_error( $body ) ) {
			return $body;
		}

		return isset( $body['data'] ) && is_array( $body['data'] ) ? $body['data'] : [];
	}

	/**
	 * Individual Facebook reviews, for "Review quotes".
	 *
	 * `recommendation_type` ("positive"/"negative") is what a Page using
	 * Facebook's newer thumbs-up Recommendations feature returns instead of a
	 * numeric `rating`. That mapping (5 / 1) still rides along as `rating` for
	 * anything that needs a plain number -- quoteMinRating's filter, sorting --
	 * but a recommendation was never actually a star count, and Facebook's own
	 * Page no longer shows one either: since the 2018 change it reports a
	 * percentage ("100% based on the opinion of 2 people"), not stars. So each
	 * such entry also carries `recommendationType`, and Layout.js's quote card
	 * shows Facebook's own words -- Recommended / Not Recommended -- instead of
	 * a star row it never gave, for exactly these entries. An entry with a real
	 * numeric `rating` (a Page still using the old star system) has no
	 * `recommendationType` and keeps its actual stars.
	 *
	 * @param array[] $entries Raw entries from fetch_facebook_ratings().
	 * @return array Review objects: { id, author, rating, recommendationType, text, time, avatarUrl, authorUrl }.
	 */
	private static function parse_facebook_reviews( $entries ) {
		$reviews = [];

		foreach ( $entries as $index => $entry ) {
			$text = trim( (string) ( $entry['review_text'] ?? '' ) );

			// Same rule as Google's parse_google_reviews(): a rating with no
			// written words is not a quote, so it is left out rather than
			// shown as an empty card.
			if ( '' === $text ) {
				continue;
			}

			$rating = self::facebook_entry_rating( $entry );

			$reviews[] = [
				'id'                 => 'fb-' . $index . '-' . substr( md5( $text ), 0, 8 ),
				// No reviewer at all when the token's app may not show one --
				// see fetch_facebook_ratings(). A named placeholder reads better
				// on the card than a blank line and a "?" avatar.
				// Private-use code points are stripped: Facebook lets people put
				// its own glyphs in a name (seen here as U+F188F), and no font on
				// a visitor's machine has them, so they only ever draw as a box.
				'author'             => trim( (string) preg_replace( '/[\x{E000}-\x{F8FF}\x{F0000}-\x{FFFFD}\x{100000}-\x{10FFFD}]/u', '', (string) ( $entry['reviewer']['name'] ?? __( 'Facebook user', 'b-testimonials-block' ) ) ) ),
				'rating'             => $rating,
				// '' for a Page still on the old star system -- isset( $entry['rating'] )
				// there, so this stays empty and the card falls back to real stars.
				'recommendationType' => isset( $entry['rating'] ) ? '' : (string) ( $entry['recommendation_type'] ?? '' ),
				'text'               => $text,
				'time'               => isset( $entry['created_time'] )
					? sprintf(
						/* translators: %s: time since the review, e.g. "3 days" */
						__( '%s ago', 'b-testimonials-block' ),
						human_time_diff( strtotime( $entry['created_time'] ) )
					)
					: '',
				'avatarUrl'          => (string) ( $entry['reviewer']['picture']['data']['url'] ?? '' ),
				// No profile link, unlike Google's parse_google_reviews() -- tried
				// once, reverted. The `id` this edge hands back is app-scoped: Meta
				// assigns each person a different, meaningless-outside-this-app id
				// per Facebook App specifically so the app that received it can't
				// use it to find or link to their real profile without their
				// consent. facebook.com/{that id} is not a working profile URL --
				// verified against a real one, which loads Facebook's own "This
				// content isn't available right now" -- so the name and avatar stay
				// plain text/an image rather than a link nothing can follow.
				'authorUrl'          => '',
			];
		}

		return $reviews;
	}

	/**
	 * Trustpilot TrustScore, via the Business Units API.
	 *
	 * @param array $config Platform settings.
	 * @return array|WP_Error
	 */
	private static function fetch_trustpilot( $config ) {
		// Accepts a pasted URL as well as a bare domain, because the field is
		// the one place a user is likely to paste their profile address.
		$domain = trim( $config['domain'] );
		$domain = preg_replace( '#^https?://#i', '', $domain );
		$domain = preg_replace( '#^www\.#i', '', $domain );
		$domain = trim( strtok( $domain, '/' ) );

		$response = wp_remote_get(
			add_query_arg(
				[
					'name'   => $domain,
					'apikey' => trim( $config['api_key'] ),
				],
				'https://api.trustpilot.com/v1/business-units/find'
			),
			[ 'timeout' => 12 ]
		);

		$body = self::decode_json( $response, __( 'Trustpilot', 'b-testimonials-block' ) );

		if ( is_wp_error( $body ) ) {
			return $body;
		}

		$score = isset( $body['score']['trustScore'] ) ? (float) $body['score']['trustScore'] : null;

		if ( null === $score ) {
			return new WP_Error( 'bpbtb_no_rating', __( 'Trustpilot returned no TrustScore for this domain.', 'b-testimonials-block' ) );
		}

		// `numberOfReviews` has been both an object with a `total` and a plain
		// integer across versions of this endpoint, so both are accepted.
		$count = null;
		if ( isset( $body['numberOfReviews']['total'] ) ) {
			$count = (int) $body['numberOfReviews']['total'];
		} elseif ( isset( $body['numberOfReviews'] ) && is_numeric( $body['numberOfReviews'] ) ) {
			$count = (int) $body['numberOfReviews'];
		}

		$url = isset( $body['profileUrl'] ) ? (string) $body['profileUrl'] : '';
		if ( '' === $url && $domain ) {
			$url = 'https://www.trustpilot.com/review/' . $domain;
		}

		return [
			'score' => $score,
			'count' => $count,
			'title' => isset( $body['displayName'] ) ? (string) $body['displayName'] : '',
			'url'   => $url,
			'live'  => true,
		];
	}

	/**
	 * G2, from the official G2 API when a token is configured.
	 *
	 * The API is real and public at `data.g2.com/api/v2` -- JSON:API, a bearer
	 * token, and `filter[slug][]` to look a product up by the slug in its own
	 * G2 URL. `star_rating` and `review_count` are exactly the two numbers the
	 * badge draws, so this is a genuine live source, the same as Google's or
	 * Trustpilot's.
	 *
	 * What it is *not* is guaranteed: the endpoint returns 403 with "Your
	 * current plan does not provide access to this resource" on a G2 plan that
	 * does not include API access. That is a licensing answer, not a bug, and
	 * it is why the typed rating stays as the fallback rather than being
	 * replaced -- a site whose plan lapses keeps showing a figure instead of
	 * going blank.
	 *
	 * `fields[products]` is deliberately not sent. Restricting it would trim
	 * `g2_url` out of the response, which is the link the badge title uses.
	 *
	 * @param array $config Platform settings.
	 * @return array|WP_Error
	 */
	private static function fetch_g2( $config ) {
		$token = trim( (string) $config['api_token'] );
		$slug  = trim( (string) $config['product_slug'] );

		// No API configured: this platform is a typed figure, and that is a
		// supported way to use it rather than a failure. The note says so in
		// G2's own terms, since unlike Capterra it *can* be made live.
		if ( '' === $token || '' === $slug ) {
			$entered = self::resolve_entered( $config, __( 'G2', 'b-testimonials-block' ) );

			if ( ! is_wp_error( $entered ) && '' === trim( (string) $config['profile_url'] ) ) {
				$entered['note'] = __( 'Entered by hand. Add a G2 API token and product slug above to fetch this for real.', 'b-testimonials-block' );
			}

			return $entered;
		}

		// Accepts a pasted product URL as well as a bare slug, since the field
		// sits next to a URL and the two are easy to confuse.
		if ( false !== strpos( $slug, '/' ) ) {
			if ( preg_match( '#/products/([a-z0-9_-]+)#i', $slug, $m ) ) {
				$slug = $m[1];
			} else {
				$slug = trim( basename( parse_url( $slug, PHP_URL_PATH ) ?? '' ) );
			}
		}

		/*
		 * The query string is built by hand, not with add_query_arg().
		 *
		 * G2 requires `filter[slug][]=<slug>` -- an unindexed array bracket.
		 * add_query_arg() runs nested arrays through http_build_query(), which
		 * numbers them: `filter[slug][0]=<slug>`. G2 rejects that outright with
		 * "filter > slug: must be an array", which is the sort of thing only a
		 * real token finds, since an unauthenticated call fails on credentials
		 * first and never reaches the filter.
		 */
		$response = wp_remote_get(
			'https://data.g2.com/api/v2/products?filter%5Bslug%5D%5B%5D=' . rawurlencode( $slug ),
			[
				'timeout' => 12,
				'headers' => [
					'Authorization' => 'Bearer ' . $token,
					'Accept'        => 'application/vnd.api+json',
				],
			]
		);

		$body = self::decode_g2( $response );

		if ( is_wp_error( $body ) ) {
			return self::g2_fallback( $config, $body );
		}

		$product = isset( $body['data'][0] ) ? $body['data'][0] : null;

		// A 200 with an empty `data` array. Two very different causes, and the
		// message has to cover both because the response cannot tell them apart:
		// a mistyped slug, or a token whose account is entitled to no products
		// at all -- which is what an account with no claimed G2 listing returns,
		// for every slug, including ones that plainly exist.
		if ( ! $product || ! isset( $product['attributes'] ) ) {
			return self::g2_fallback(
				$config,
				new WP_Error(
					'bpbtb_no_product',
					sprintf(
						/* translators: %s: product slug */
						__( 'G2 returned no product for the slug "%s". Either the slug is wrong — it is the last part of your G2 product URL — or this token\'s account has no G2 product listing attached to it. Check that the token\'s Resource Owner is your organization rather than your user.', 'b-testimonials-block' ),
						$slug
					)
				)
			);
		}

		$attributes = $product['attributes'];

		if ( ! isset( $attributes['star_rating'] ) || ! ( (float) $attributes['star_rating'] > 0 ) ) {
			return self::g2_fallback(
				$config,
				new WP_Error( 'bpbtb_no_rating', __( 'G2 returned no star rating for that product — it may have no reviews yet.', 'b-testimonials-block' ) )
			);
		}

		return [
			'score' => (float) $attributes['star_rating'],
			'count' => isset( $attributes['review_count'] ) ? (int) $attributes['review_count'] : null,
			'title' => isset( $attributes['name'] ) ? (string) $attributes['name'] : '',
			'url'   => ! empty( $attributes['g2_url'] )
				? (string) $attributes['g2_url']
				: ( ! empty( $config['profile_url'] ) ? (string) $config['profile_url'] : '' ),
			'live'  => true,
			'note'  => __( 'Read live from the G2 API.', 'b-testimonials-block' ),
		];
	}

	/**
	 * When the G2 API cannot answer, fall back to the rating typed in beside it.
	 *
	 * Every failure in the API path comes through here, which is the point. The
	 * first version only did this for a rejected request, so a mistyped slug --
	 * a 200 with an empty result -- blanked the badge while a perfectly good
	 * typed figure sat in the next field. The reason for a failure has no
	 * bearing on whether the fallback is still valid.
	 *
	 * The reason travels as a `note` rather than an `error`, because nothing on
	 * the page is broken: the badge is showing the number it was told to. The
	 * error is only returned when there is no fallback, since then it is the
	 * only thing left to say.
	 *
	 * @param array    $config Platform settings.
	 * @param WP_Error $why    What went wrong with the API call.
	 * @return array|WP_Error
	 */
	private static function g2_fallback( $config, $why ) {
		$entered = self::resolve_entered( $config, __( 'G2', 'b-testimonials-block' ) );

		if ( is_wp_error( $entered ) ) {
			return $why;
		}

		// Short line for the inspector, full reason for the settings screen.
		// The reason is a paragraph and the inspector is a narrow column, so
		// putting the whole thing in both places made the panel unreadable
		// without making the diagnosis any easier to act on.
		$entered['note']   = __( 'Showing the fallback rating — the G2 API could not be read.', 'b-testimonials-block' );
		$entered['detail'] = $why->get_error_message();

		return $entered;
	}

	/**
	 * Decode a G2 API response.
	 *
	 * Its own method rather than decode_json(), because G2 reports failure as
	 * JSON:API's `errors` array -- a list of `{status, title}` objects -- and
	 * decode_json() looks for a single `error` object the way Google and
	 * Facebook send one. The titles are worth surfacing verbatim: "Bad
	 * Credentials" and "Your current plan does not provide access to this
	 * resource" are different problems with different fixes.
	 *
	 * @param array|WP_Error $response Result of wp_remote_get().
	 * @return array|WP_Error
	 */
	private static function decode_g2( $response ) {
		if ( is_wp_error( $response ) ) {
			/* translators: %s: transport error */
			return new WP_Error( 'bpbtb_http', sprintf( __( 'Could not reach the G2 API: %s', 'b-testimonials-block' ), $response->get_error_message() ) );
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );
		$code = (int) wp_remote_retrieve_response_code( $response );

		if ( ! is_array( $body ) ) {
			/* translators: %d: HTTP status code */
			return new WP_Error( 'bpbtb_bad_json', sprintf( __( 'The G2 API returned an unreadable response (HTTP %d).', 'b-testimonials-block' ), $code ) );
		}

		if ( ! empty( $body['errors'] ) && is_array( $body['errors'] ) ) {
			$titles = [];
			foreach ( $body['errors'] as $error ) {
				if ( is_array( $error ) && ! empty( $error['title'] ) ) {
					$titles[] = (string) $error['title'];
				}
			}

			return new WP_Error(
				'bpbtb_api_error',
				$titles
					/* translators: %s: error message from G2 */
					? sprintf( __( 'G2: %s', 'b-testimonials-block' ), implode( '; ', $titles ) )
					/* translators: %d: HTTP status code */
					: sprintf( __( 'The G2 API returned HTTP %d.', 'b-testimonials-block' ), $code )
			);
		}

		if ( $code < 200 || $code > 299 ) {
			/* translators: %d: HTTP status code */
			return new WP_Error( 'bpbtb_http_status', sprintf( __( 'The G2 API returned HTTP %d.', 'b-testimonials-block' ), $code ) );
		}

		return $body;
	}

	/**
	 * Capterra, and G2 without a token: the figure entered on the settings screen.
	 *
	 * Neither has a public rating API, and neither can be read from its own
	 * product page either: both sit behind bot protection that answers every
	 * server-side request with HTTP 403, whatever User-Agent is sent -- measured
	 * against both, with an honest UA, a plain WordPress one, a desktop Chrome
	 * one and Googlebot's. All four: 403, no structured data in the body.
	 *
	 * Working around that would mean defeating an access control the site owner
	 * put there deliberately, so it is not attempted. The figure is entered on
	 * the settings screen instead, which is not "live" but is the thing that was
	 * actually broken about these two badges: the rating used to be typed into
	 * every block that showed it, and a site with a G2 badge in three places had
	 * three numbers to remember to update. Now there is one, and every badge
	 * follows it.
	 *
	 * A page URL is still read when one is given. It is not expected to work for
	 * g2.com or capterra.com, and it costs the entered figure nothing when it
	 * does not -- but the field also accepts any page that does publish an
	 * AggregateRating, and there the badge is genuinely live.
	 *
	 * @param array  $config Platform settings.
	 * @param string $label  Platform name, for the note.
	 * @return array|WP_Error
	 */
	private static function resolve_entered( $config, $label ) {
		$entered = [
			'score' => '' === trim( (string) $config['score'] ) ? null : (float) $config['score'],
			'count' => '' === trim( (string) $config['count'] ) ? null : (int) $config['count'],
			'title' => '',
			'url'   => (string) $config['profile_url'],
			'note'  => '',
			'live'  => false,
		];

		if ( null === $entered['score'] ) {
			/* translators: %s: platform name */
			return new WP_Error( 'bpbtb_no_rating', sprintf( __( 'No %s rating has been entered yet.', 'b-testimonials-block' ), $label ) );
		}

		if ( '' === trim( $entered['url'] ) ) {
			/* translators: %s: platform name */
			$entered['note'] = sprintf( __( 'Entered by hand — %s cannot be read automatically.', 'b-testimonials-block' ), $label );

			return $entered;
		}

		$live = self::fetch_public_page( $entered['url'] );

		if ( is_wp_error( $live ) ) {
			$entered['note']   = sprintf(
				/* translators: %s: platform name */
				__( 'Showing the figure entered here — %s did not serve a readable rating.', 'b-testimonials-block' ),
				$label
			);
			$entered['detail'] = $live->get_error_message();

			return $entered;
		}

		// The page did publish structured data, so it wins -- that is a real
		// live reading and the entered figure was only ever the stand-in. Its
		// count is only taken when the page actually gave one.
		$live['url']  = $entered['url'];
		$live['live'] = true;
		$live['note'] = __( 'Read live from the page URL below.', 'b-testimonials-block' );

		if ( null === $live['count'] ) {
			$live['count'] = $entered['count'];
		}

		return $live;
	}

	/**
	 * The AggregateRating a page publishes as structured data.
	 *
	 * @param string $url Page URL.
	 * @return array|WP_Error
	 */
	private static function fetch_public_page( $url ) {
		$url = trim( (string) $url );

		if ( ! $url || ! wp_http_validate_url( $url ) ) {
			return new WP_Error( 'bpbtb_bad_url', __( 'That does not look like a valid product page URL.', 'b-testimonials-block' ) );
		}

		$response = wp_remote_get(
			$url,
			[
				'timeout'     => 15,
				'redirection' => 3,
				'headers'     => [
					'Accept'          => 'text/html,application/xhtml+xml',
					'Accept-Language' => 'en-US,en;q=0.9',
				],
				// Identifies the site rather than pretending to be a browser, so
				// the request is honest about who is asking.
				'user-agent'  => 'Mozilla/5.0 (compatible; WordPress/' . get_bloginfo( 'version' ) . '; ' . home_url( '/' ) . ')',
			]
		);

		if ( is_wp_error( $response ) ) {
			/* translators: %s: transport error */
			return new WP_Error( 'bpbtb_http', sprintf( __( 'Could not reach the product page: %s', 'b-testimonials-block' ), $response->get_error_message() ) );
		}

		$code = (int) wp_remote_retrieve_response_code( $response );
		if ( $code < 200 || $code > 299 ) {
			/* translators: %d: HTTP status code */
			return new WP_Error( 'bpbtb_http_status', sprintf( __( 'The product page returned HTTP %d. It may be blocking automated requests, or the URL may be wrong.', 'b-testimonials-block' ), $code ) );
		}

		$parsed = self::parse_aggregate_rating( wp_remote_retrieve_body( $response ) );

		if ( is_wp_error( $parsed ) ) {
			return $parsed;
		}

		$parsed['url'] = $url;

		return $parsed;
	}

	/**
	 * Pull an AggregateRating out of a page's structured data.
	 *
	 * JSON-LD first, because that is what both sites actually publish and it is
	 * unambiguous. The microdata regexes below it are a second chance at the
	 * same figure in the older markup style, not a scrape of the visible page:
	 * a number read off body text would silently pick up whatever else on the
	 * page happens to look like a rating.
	 *
	 * @param string $html Page HTML.
	 * @return array|WP_Error
	 */
	private static function parse_aggregate_rating( $html ) {
		$html = (string) $html;

		if ( '' === $html ) {
			return new WP_Error( 'bpbtb_empty_page', __( 'The product page came back empty.', 'b-testimonials-block' ) );
		}

		if ( preg_match_all( '#<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>#is', $html, $matches ) ) {
			foreach ( $matches[1] as $json ) {
				$decoded = json_decode( trim( $json ), true );

				if ( ! is_array( $decoded ) ) {
					continue;
				}

				$found = self::find_aggregate_rating( $decoded );

				if ( $found ) {
					return $found;
				}
			}
		}

		// Microdata fallback: itemprop attributes, in either attribute order.
		$score = null;
		$count = null;

		if ( preg_match( '#itemprop=["\']ratingValue["\'][^>]*content=["\']([\d.]+)["\']#i', $html, $m )
			|| preg_match( '#content=["\']([\d.]+)["\'][^>]*itemprop=["\']ratingValue["\']#i', $html, $m ) ) {
			$score = (float) $m[1];
		}

		if ( preg_match( '#itemprop=["\'](?:reviewCount|ratingCount)["\'][^>]*content=["\']([\d,]+)["\']#i', $html, $m )
			|| preg_match( '#content=["\']([\d,]+)["\'][^>]*itemprop=["\'](?:reviewCount|ratingCount)["\']#i', $html, $m ) ) {
			$count = (int) str_replace( ',', '', $m[1] );
		}

		if ( null !== $score ) {
			return [
				'score' => $score,
				'count' => $count,
				'title' => '',
				'url'   => '',
			];
		}

		return new WP_Error(
			'bpbtb_no_rating',
			__( 'No rating found on that page. Check the URL points at the product page itself — the one showing the star rating.', 'b-testimonials-block' )
		);
	}

	/**
	 * Walk decoded JSON-LD for the first usable AggregateRating.
	 *
	 * Recursive because the node sits in a different place on every site: at the
	 * top level, inside `@graph`, or nested under a Product or SoftwareApplication.
	 *
	 * @param mixed $node  Decoded JSON-LD fragment.
	 * @param int   $depth Guard against a pathological document.
	 * @return array|null
	 */
	private static function find_aggregate_rating( $node, $depth = 0 ) {
		if ( $depth > 8 || ! is_array( $node ) ) {
			return null;
		}

		if ( isset( $node['aggregateRating'] ) && is_array( $node['aggregateRating'] ) ) {
			$rating = $node['aggregateRating'];
			$score  = isset( $rating['ratingValue'] ) ? (float) $rating['ratingValue'] : null;

			if ( $score > 0 ) {
				$count = null;
				foreach ( [ 'reviewCount', 'ratingCount' ] as $key ) {
					if ( isset( $rating[ $key ] ) && is_numeric( str_replace( ',', '', (string) $rating[ $key ] ) ) ) {
						$count = (int) str_replace( ',', '', (string) $rating[ $key ] );
						break;
					}
				}

				// A rating out of something other than 5 is rescaled, so the
				// five drawn stars keep meaning what they look like.
				$best = isset( $rating['bestRating'] ) ? (float) $rating['bestRating'] : 5.0;
				if ( $best > 0 && abs( $best - 5.0 ) > 0.01 ) {
					$score = round( $score * 5 / $best, 2 );
				}

				return [
					'score' => $score,
					'count' => $count,
					'title' => isset( $node['name'] ) && is_string( $node['name'] ) ? $node['name'] : '',
					'url'   => '',
				];
			}
		}

		foreach ( $node as $child ) {
			if ( is_array( $child ) ) {
				$found = self::find_aggregate_rating( $child, $depth + 1 );

				if ( $found ) {
					return $found;
				}
			}
		}

		return null;
	}

	/**
	 * Refresh every connected platform whose score has gone stale.
	 *
	 * The cron hook runs hourly and almost always does nothing: each platform is
	 * only re-fetched once its own window has passed, so the schedule is a
	 * heartbeat rather than a fetch rate.
	 */
	public static function refresh_stale() {
		foreach ( array_keys( self::platforms() ) as $platform ) {
			if ( self::is_connected( $platform ) ) {
				// Not forced -- get_data() decides whether this one is due, and
				// wp_doing_cron() is what puts it on the blocking path.
				self::get_data( $platform );
			}
		}
	}

	/**
	 * Keep the hourly refresh scheduled while any platform is connected.
	 */
	public static function maybe_schedule() {
		$connected = false;
		foreach ( array_keys( self::platforms() ) as $platform ) {
			if ( self::is_connected( $platform ) ) {
				$connected = true;
				break;
			}
		}

		$scheduled = wp_next_scheduled( self::CRON_HOOK );

		if ( $connected && ! $scheduled ) {
			wp_schedule_event( time() + HOUR_IN_SECONDS, 'hourly', self::CRON_HOOK );
		} elseif ( ! $connected && $scheduled ) {
			wp_clear_scheduled_hook( self::CRON_HOOK );
		}
	}

	/**
	 * Drop every cached score, so the next read fetches afresh.
	 */
	public static function flush_cache() {
		delete_option( self::CACHE );

		foreach ( array_keys( self::platforms() ) as $platform ) {
			delete_transient( self::LOCK_PREFIX . $platform );
		}
	}

	/**
	 * One platform's public state, safe to hand to the editor.
	 *
	 * Credentials are not in it -- neither the values nor their length. The
	 * editor needs to know whether a source is connected and what it last
	 * returned, and nothing more.
	 *
	 * @param string $platform Platform slug.
	 * @param bool   $force    Fetch now.
	 * @return array
	 */
	public static function get_public_state( $platform, $force = false ) {
		$data = self::get_data( $platform, $force );

		// `error`/`detail` can contain a platform's own diagnostic text --
		// "G2: Bad Credentials", a Facebook token failure, and similar --
		// which says something about a *site owner's* account, not the post
		// being edited. `edit_posts` is deliberately as low as Contributor,
		// so anyone who can open the block editor could otherwise read it.
		// Only the capability that owns the settings screen sees the detail;
		// everyone else gets a generic line, still enough to know the badge
		// is showing a fallback figure.
		$can_manage = current_user_can( 'manage_options' );
		$error      = (string) $data['error'];
		$detail     = (string) $data['detail'];

		if ( ! $can_manage ) {
			$error  = '' === $error ? '' : __( 'This platform is not connected properly. An administrator can check Testimonials → Review Sources.', 'b-testimonials-block' );
			$detail = '' === $detail ? '' : __( 'See Testimonials → Review Sources for details.', 'b-testimonials-block' );
		}

		return [
			'platform'  => $platform,
			'label'     => self::is_platform( $platform ) ? self::platforms()[ $platform ]['label'] : '',
			'connected' => self::is_connected( $platform ),
			'score'     => null === $data['score'] ? null : (float) $data['score'],
			'count'     => null === $data['count'] ? null : (int) $data['count'],
			'title'     => (string) $data['title'],
			'url'       => (string) $data['url'],
			'fetched'   => (int) $data['fetched'],
			'error'     => $error,
			'note'      => (string) $data['note'],
			'detail'    => $detail,
			// Whether the figure on show was actually fetched.
			'live'      => (bool) $data['live'],
			// Whether this platform is set up to use an API at all, which is a
			// different question: it is what decides whether retrying is even
			// meaningful, so it gates the Refresh button rather than the wording.
			'api'       => self::is_live_source( $platform ),
			'stale'     => (bool) $data['stale'],
			// Whether this platform's figure is entered rather than fetched, so
			// the editor can say "entered" instead of implying a live read that
			// never happens. Computed rather than read off the definition: G2 is
			// a real live source once an API token and slug are set, and a typed
			// figure only until then. See is_live_source().
			'manual'    => ! self::is_live_source( $platform ),
			// Individual review text, for the "Review quotes" display mode's
			// picker. Always '' for a platform outside PLATFORMS_WITH_REVIEWS,
			// same as every other field here when there is nothing to report.
			'reviews'   => is_array( $data['reviews'] ?? null ) ? $data['reviews'] : [],
			// The pasted embed snippet, for the "Official embed widget" display
			// mode. Deliberately not gated on `connected` -- see get_embed_code().
			'embedCode' => self::supports_embed( $platform ) ? self::get_embed_code( $platform ) : '',
		];
	}
}

add_action( BPBTB_Review_Sources::CRON_HOOK, [ 'BPBTB_Review_Sources', 'refresh_stale' ] );
add_action( 'init', [ 'BPBTB_Review_Sources', 'maybe_schedule' ] );
}

/**
 * Tell the editor where the Review Sources screen is.
 *
 * The inspector panel links to it, and there is no admin_url() on the client.
 * Attached to `wp-blocks` for the same reason the disabled-blocks list is: every
 * editor screen loads it, and the blocks bundle depends on it, so this is on the
 * page before anything reads it.
 *
 * The URL only, and only for a user who could act on it. Nothing about the
 * credentials themselves crosses this line.
 */
if ( ! function_exists( 'bpbtb_editor_review_sources_url' ) ) {
function bpbtb_editor_review_sources_url() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	wp_add_inline_script(
		'wp-blocks',
		'window.bpbtbReviewSources = ' . wp_json_encode(
			[
				'settingsUrl' => admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources' ),
			]
		) . ';',
		'before'
	);
}
}
add_action( 'enqueue_block_editor_assets', 'bpbtb_editor_review_sources_url' );

/**
 * Resolve a badge block's live score into its attributes before it renders.
 *
 * Written into `liveScore` / `liveCount` / `liveTitle` / `liveUrl` rather than
 * over `badgeScore` / `badgeCount`, so the values the author typed survive
 * untouched and are still there to fall back on. Layout.js decides between them;
 * see resolveBadge() in src/shared/utils/reviewSources.js.
 *
 * None of these four is a registered attribute, and that is on purpose: these
 * blocks save their attributes into post content, so a registered `liveScore`
 * would freeze one afternoon's rating into the page and go stale there. They are
 * added to the payload on the way out and nowhere else.
 *
 * @param array $attributes Block attributes.
 * @return array
 */
if ( ! function_exists( 'bpbtb_apply_live_review_data' ) ) {
function bpbtb_apply_live_review_data( $attributes ) {
	if ( ! class_exists( 'BPBTB_Review_Sources' ) || ! is_array( $attributes ) ) {
		return $attributes;
	}

	// None of the six `live*` keys this function writes is a registered block
	// attribute (deliberately -- see the docblock below), and WordPress only
	// validates an attribute found in a block's own comment JSON against a
	// registered schema; an unregistered one is passed to render_callback()
	// untouched. `liveEmbedCode` is the one of the six actually rendered as
	// raw HTML (EmbedWidget's dangerouslySetInnerHTML in Layout.js), so a
	// hand-crafted `{"liveEmbedCode":"<img src=x onerror=...>"}` in a block's
	// markup would otherwise reach the page verbatim. Clearing all six before
	// any early return below means every path out of this function either
	// re-populates one from data this site's own admin actually saved, or
	// leaves it absent -- never carries through whatever the caller handed in.
	foreach ( [ 'liveScore', 'liveCount', 'liveTitle', 'liveUrl', 'liveReviews', 'liveEmbedCode' ] as $live_key ) {
		unset( $attributes[ $live_key ] );
	}

	$source = isset( $attributes['ratingSource'] ) ? (string) $attributes['ratingSource'] : 'live';

	if ( 'live' !== $source ) {
		return $attributes;
	}

	$platform = BPBTB_Review_Sources::platform_for_attributes( $attributes );

	if ( ! $platform ) {
		return $attributes;
	}

	// Independent of is_connected() below: the embed code needs no API
	// credentials at all, so a site using only that mode must not be treated
	// as "not connected" just because it never set up an API token.
	if ( BPBTB_Review_Sources::supports_embed( $platform ) ) {
		$embed_code = BPBTB_Review_Sources::get_embed_code( $platform );

		if ( '' !== $embed_code ) {
			$attributes['liveEmbedCode'] = $embed_code;
		}
	}

	if ( ! BPBTB_Review_Sources::is_connected( $platform ) ) {
		return $attributes;
	}

	$data = BPBTB_Review_Sources::get_data( $platform );

	if ( null === $data['score'] ) {
		return $attributes;
	}

	$attributes['liveScore'] = (float) $data['score'];
	$attributes['liveTitle'] = (string) $data['title'];
	$attributes['liveUrl']   = (string) $data['url'];

	if ( null !== $data['count'] ) {
		$attributes['liveCount'] = (int) $data['count'];
	}

	if ( ! empty( $data['reviews'] ) && is_array( $data['reviews'] ) ) {
		$attributes['liveReviews'] = $data['reviews'];
	}

	return $attributes;
}
}

/**
 * REST routes the editor reads a platform's live state from.
 */
if ( ! function_exists( 'bpbtb_register_review_source_routes' ) ) {
function bpbtb_register_review_source_routes() {
	register_rest_route(
		'bptmb/v1',
		'/review-sources',
		[
			'methods'             => 'GET',
			'callback'            => 'bpbtb_rest_review_sources',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		]
	);

	register_rest_route(
		'bptmb/v1',
		'/review-sources/(?P<platform>[a-z0-9_-]+)',
		[
			'methods'             => 'GET',
			'callback'            => 'bpbtb_rest_review_source',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
			'args'                => [
				'platform' => [
					'type'              => 'string',
					'required'          => true,
					'sanitize_callback' => 'sanitize_key',
				],
				'refresh'  => [
					'type'    => 'boolean',
					'default' => false,
				],
			],
		]
	);
}
}
add_action( 'rest_api_init', 'bpbtb_register_review_source_routes' );

/**
 * Every platform's public state at once.
 *
 * @return WP_REST_Response
 */
if ( ! function_exists( 'bpbtb_rest_review_sources' ) ) {
function bpbtb_rest_review_sources() {
	$out = [];

	foreach ( array_keys( BPBTB_Review_Sources::platforms() ) as $platform ) {
		$out[ $platform ] = BPBTB_Review_Sources::get_public_state( $platform );
	}

	return rest_ensure_response( $out );
}
}

/**
 * One platform's public state.
 *
 * `?refresh=1` spends an API call, so it needs the capability that owns the
 * settings screen rather than the one that owns a post.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
if ( ! function_exists( 'bpbtb_rest_review_source' ) ) {
function bpbtb_rest_review_source( $request ) {
	$platform = sanitize_key( $request['platform'] );

	if ( ! BPBTB_Review_Sources::is_platform( $platform ) ) {
		return new WP_Error( 'bpbtb_unknown_platform', __( 'Unknown review platform.', 'b-testimonials-block' ), [ 'status' => 404 ] );
	}

	$force = (bool) $request->get_param( 'refresh' ) && current_user_can( 'manage_options' );

	return rest_ensure_response( BPBTB_Review_Sources::get_public_state( $platform, $force ) );
}
}
