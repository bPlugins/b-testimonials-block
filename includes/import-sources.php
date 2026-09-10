<?php
/**
 * Bringing testimonials in from somewhere else.
 *
 * The three plugins that dominate this niche between them hold several hundred
 * thousand sites' testimonials, and all three charge for the importer that would
 * let someone leave. That is the moat, and this is the bridge over it: reading
 * their storage is free, it is one-way, and it changes nothing on their side.
 *
 * Nothing here deletes, edits or deactivates anything belonging to another
 * plugin. A migration that breaks the thing you migrated from is not a
 * migration, it is a hostage situation -- and someone who tries this and does
 * not like the result must be able to simply carry on as before.
 *
 * Re-running an import is safe. Every testimonial created here remembers where
 * it came from, and a row already imported is skipped rather than duplicated, so
 * "import" doubles as "import whatever has been added since".
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Import_Sources' ) ) {

class BPBTB_Import_Sources {

	/**
	 * Meta recording which plugin a testimonial was imported from.
	 */
	const SOURCE_META = '_bpbtb_import_source';

	/**
	 * Meta recording the post or comment ID it was imported from.
	 */
	const SOURCE_ID_META = '_bpbtb_import_source_id';

	/**
	 * Post-type sources, as data.
	 *
	 * Each entry says where a plugin keeps its testimonials and which meta keys
	 * hold the parts we need. Several keys per field, tried in order, because
	 * these plugins have renamed their meta across major versions and a site
	 * that has been upgraded in place can hold either -- Site Reviews in
	 * particular has moved its storage more than once, so its keys are listed
	 * oldest-last and the first one that answers wins.
	 *
	 * Adding a fourth source is one array entry, not a new method.
	 */
	private static function post_type_sources() {
		return [
			'strong-testimonials' => [
				'label'     => 'Strong Testimonials',
				'post_type' => 'wpm-testimonial',
				'name'      => [ 'client_name' ],
				'job'       => [ 'client_title', 'position' ],
				'company'   => [ 'company_name', 'company' ],
				'rating'    => [ 'star_rating', 'rating' ],
				'plugin'    => 'strong-testimonials/strong-testimonials.php',
			],
			'real-testimonials'   => [
				'label'     => 'Real Testimonials',
				'post_type' => 'sp_testimonial',
				'name'      => [ 'sp_testimonial_client_name' ],
				'job'       => [ 'sp_testimonial_client_designation' ],
				'company'   => [ 'sp_testimonial_client_company' ],
				'rating'    => [ 'sp_testimonial_client_rating', 'sp_testimonial_rating' ],
				'plugin'    => 'testimonial-free/testimonial-free.php',
			],
			'site-reviews'        => [
				'label'     => 'Site Reviews',
				'post_type' => 'site-review',
				'name'      => [ '_author', '_review_author', 'author' ],
				'job'       => [],
				'company'   => [],
				'rating'    => [ '_rating', '_review_rating', 'rating' ],
				'plugin'    => 'site-reviews/site-reviews.php',
			],
		];
	}

	/**
	 * Every source that can be imported from, post types and WooCommerce alike.
	 *
	 * @return array[]
	 */
	public static function all() {
		$sources = self::post_type_sources();

		$sources['woocommerce'] = [
			'label'     => 'WooCommerce product reviews',
			'post_type' => '',
			'plugin'    => 'woocommerce/woocommerce.php',
		];

		/**
		 * Sources offered on the import screen.
		 *
		 * @param array[] $sources Source definitions keyed by slug.
		 */
		return (array) apply_filters( 'bpbtb_import_sources', $sources );
	}

	/**
	 * How many testimonials a source is holding, and how many we already took.
	 *
	 * Counts rather than a boolean, because "Strong Testimonials: 42 found, 42
	 * already imported" is the only version of this screen that tells someone
	 * whether pressing the button will do anything.
	 *
	 * @return array[] Keyed by slug: label, available, imported.
	 */
	public static function survey() {
		$out = [];

		foreach ( self::all() as $slug => $source ) {
			/*
			 * A source that lives somewhere other than a post type -- a remote
			 * platform, say -- says how to count itself. Everything on this site
			 * falls through to the post-type count as before.
			 */
			if ( isset( $source['count_callback'] ) && is_callable( $source['count_callback'] ) ) {
				$available = (int) call_user_func( $source['count_callback'] );
			} else {
				$available = 'woocommerce' === $slug
					? self::count_woo_reviews()
					: self::count_posts( $source['post_type'] ?? '' );
			}

			if ( ! $available ) {
				continue;
			}

			$out[ $slug ] = [
				'label'     => $source['label'],
				'available' => $available,
				'imported'  => self::count_imported( $slug ),
			];
		}

		return $out;
	}

	/**
	 * Published posts of a type, without registering the type ourselves.
	 *
	 * wp_count_posts() needs the post type registered, and a source plugin that
	 * has been deactivated no longer registers its own -- which is exactly the
	 * case someone migrating is most likely to be in. Counted directly so that
	 * the testimonials of a switched-off plugin are still reachable.
	 *
	 * @param string $post_type Post type.
	 * @return int
	 */
	private static function count_posts( $post_type ) {
		global $wpdb;

		if ( ! $post_type ) {
			return 0;
		}

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- no cache API for a foreign post type; the screen runs this once.
		return (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(ID) FROM {$wpdb->posts} WHERE post_type = %s AND post_status IN ( 'publish', 'draft', 'pending', 'private' )",
				$post_type
			)
		);
	}

	/**
	 * Approved WooCommerce product reviews.
	 *
	 * @return int
	 */
	private static function count_woo_reviews() {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- see count_posts().
		return (int) $wpdb->get_var(
			"SELECT COUNT(comment_ID) FROM {$wpdb->comments} WHERE comment_type = 'review' AND comment_approved = '1'"
		);
	}

	/**
	 * How many testimonials we already hold from a given source.
	 *
	 * @param string $slug Source slug.
	 * @return int
	 */
	public static function count_imported( $slug ) {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- see count_posts().
		return (int) $wpdb->get_var(
			$wpdb->prepare(
				"SELECT COUNT(pm.post_id) FROM {$wpdb->postmeta} pm
				 INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id AND p.post_type = 'testimonial'
				 WHERE pm.meta_key = %s AND pm.meta_value = %s",
				self::SOURCE_META,
				$slug
			)
		);
	}

	/**
	 * The source IDs already imported from one source.
	 *
	 * Fetched in one query and held for the length of the import, rather than a
	 * lookup per row: importing four hundred reviews should not mean four
	 * hundred round trips to answer a question one query answers.
	 *
	 * @param string $slug Source slug.
	 * @return array Map of source ID => true.
	 */
	private static function already_imported( $slug ) {
		global $wpdb;

		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- see count_posts().
		$ids = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT src.meta_value FROM {$wpdb->postmeta} src
				 INNER JOIN {$wpdb->postmeta} from_ ON from_.post_id = src.post_id AND from_.meta_key = %s AND from_.meta_value = %s
				 INNER JOIN {$wpdb->posts} p ON p.ID = src.post_id AND p.post_type = 'testimonial'
				 WHERE src.meta_key = %s",
				self::SOURCE_META,
				$slug,
				self::SOURCE_ID_META
			)
		);

		return $ids ? array_fill_keys( array_map( 'strval', $ids ), true ) : [];
	}

	/**
	 * First non-empty value among several meta keys.
	 *
	 * @param int      $post_id Post ID.
	 * @param string[] $keys    Candidate meta keys, best first.
	 * @return string
	 */
	private static function meta( $post_id, $keys ) {
		foreach ( (array) $keys as $key ) {
			$value = get_post_meta( $post_id, $key, true );

			if ( is_array( $value ) ) {
				// Strong Testimonials stores some fields as a one-element array.
				$value = reset( $value );
			}

			if ( is_scalar( $value ) && '' !== trim( (string) $value ) ) {
				return trim( (string) $value );
			}
		}

		return '';
	}

	/**
	 * Read one source into our own testimonial shape.
	 *
	 * @param string $slug Source slug.
	 * @return array[] Rows: source_id, name, content, job, company, rating, image_id.
	 */
	public static function read( $slug ) {
		if ( 'woocommerce' === $slug ) {
			return self::read_woo();
		}

		/**
		 * Rows for a source that is not a local post type.
		 *
		 * Returning an array here short-circuits the post-type reader below, so
		 * a remote platform can be added without this file knowing anything
		 * about it. Null means "not mine, carry on".
		 *
		 * @param array|null $rows Normalised rows, or null.
		 */
		$external = apply_filters( 'bpbtb_import_read_' . sanitize_key( $slug ), null );

		if ( is_array( $external ) ) {
			return $external;
		}

		$sources = self::post_type_sources();

		if ( ! isset( $sources[ $slug ] ) ) {
			return [];
		}

		$source = $sources[ $slug ];

		global $wpdb;

		// Direct, not get_posts(): a deactivated source plugin no longer
		// registers its post type, and WP_Query returns nothing for one it does
		// not know.
		// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- see count_posts().
		$posts = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT ID, post_title, post_content, post_excerpt, post_date FROM {$wpdb->posts}
				 WHERE post_type = %s AND post_status IN ( 'publish', 'draft', 'pending', 'private' )
				 ORDER BY post_date ASC",
				$source['post_type']
			)
		);

		$rows = [];

		foreach ( $posts as $post ) {
			$name = self::meta( $post->ID, $source['name'] );

			/*
			 * Whether the title is the person or the review is not consistent
			 * between these plugins, or even between two rows of the same one.
			 * When no name meta answered, the title is the best candidate for
			 * the name -- unless the body is empty, in which case the title is
			 * evidently the review itself and there is no name to be had.
			 */
			$content = trim( (string) $post->post_content );

			if ( '' === $content ) {
				$content = trim( (string) $post->post_excerpt );
			}

			if ( '' === $name && '' !== $content ) {
				$name = trim( (string) $post->post_title );
			} elseif ( '' === $name && '' === $content ) {
				$content = trim( (string) $post->post_title );
			}

			if ( '' === $content && '' === $name ) {
				continue;
			}

			$rating = self::meta( $post->ID, $source['rating'] );

			$rows[] = [
				'source_id' => (string) $post->ID,
				'name'      => $name,
				'content'   => $content,
				'job'       => self::meta( $post->ID, $source['job'] ),
				'company'   => self::meta( $post->ID, $source['company'] ),
				'rating'    => is_numeric( $rating ) ? (float) $rating : 0,
				'image_id'  => (int) get_post_thumbnail_id( $post->ID ),
				'date'      => (string) $post->post_date,
			];
		}

		return $rows;
	}

	/**
	 * Read approved WooCommerce product reviews.
	 *
	 * The product being reviewed becomes the company line, which is what makes a
	 * shop's reviews readable once they are out of their product context and
	 * sitting together in a grid.
	 *
	 * @return array[]
	 */
	private static function read_woo() {
		$comments = get_comments(
			[
				'type'    => 'review',
				'status'  => 'approve',
				'orderby' => 'comment_date_gmt',
				'order'   => 'ASC',
				'number'  => 0,
			]
		);

		$rows = [];

		foreach ( $comments as $comment ) {
			$content = trim( (string) $comment->comment_content );

			if ( '' === $content ) {
				continue;
			}

			$rating   = get_comment_meta( $comment->comment_ID, 'rating', true );
			$verified = get_comment_meta( $comment->comment_ID, 'verified', true );
			$product  = get_the_title( $comment->comment_post_ID );

			$rows[] = [
				'source_id' => (string) $comment->comment_ID,
				'name'      => trim( (string) $comment->comment_author ),
				'content'   => $content,
				'job'       => $verified ? __( 'Verified buyer', 'b-testimonials-block' ) : '',
				'company'   => (string) $product,
				'rating'    => is_numeric( $rating ) ? (float) $rating : 0,
				// Product reviews carry no photo of the reviewer.
				'image_id'  => 0,
				'date'      => (string) $comment->comment_date,
			];
		}

		return $rows;
	}

	/**
	 * Create testimonials from a source, skipping anything already taken.
	 *
	 * @param string $slug Source slug.
	 * @return array {
	 *     @type int $imported Newly created.
	 *     @type int $skipped  Already present.
	 *     @type int $total    Rows read.
	 * }
	 */
	public static function import( $slug ) {
		$rows    = self::read( $slug );
		$seen    = self::already_imported( $slug );
		$created = 0;
		$skipped = 0;

		foreach ( $rows as $row ) {
			if ( isset( $seen[ $row['source_id'] ] ) ) {
				$skipped++;
				continue;
			}

			if ( self::create( $slug, $row ) ) {
				$created++;
			}
		}

		return [
			'imported' => $created,
			'skipped'  => $skipped,
			'total'    => count( $rows ),
		];
	}

	/**
	 * Create one testimonial from a normalised row.
	 *
	 * @param string $slug Source slug, or '' for a CSV row.
	 * @param array  $row  Normalised row.
	 * @return int|false New post ID, or false.
	 */
	public static function create( $slug, $row ) {
		$name    = sanitize_text_field( (string) ( $row['name'] ?? '' ) );
		$content = wp_kses_post( (string) ( $row['content'] ?? '' ) );

		if ( '' === trim( wp_strip_all_tags( $content ) ) && '' === $name ) {
			return false;
		}

		$post_id = wp_insert_post(
			[
				'post_type'    => 'testimonial',
				// A testimonial with no name still needs a title to be findable
				// in the admin list, so the opening words of the review stand in.
				'post_title'   => '' !== $name ? $name : wp_trim_words( wp_strip_all_tags( $content ), 6, '…' ),
				'post_content' => $content,
				'post_status'  => 'publish',
				'post_date'    => ! empty( $row['date'] ) ? (string) $row['date'] : '',
			],
			true
		);

		if ( is_wp_error( $post_id ) || ! $post_id ) {
			return false;
		}

		$rating = isset( $row['rating'] ) && is_numeric( $row['rating'] ) ? (float) $row['rating'] : 0;

		if ( $rating > 0 ) {
			update_post_meta( $post_id, 'bpbtb_rating', round( min( 5, max( 0, $rating ) ), 1 ) );
		}

		if ( ! empty( $row['job'] ) ) {
			update_post_meta( $post_id, 'bpbtb_designation', sanitize_text_field( (string) $row['job'] ) );
		}

		if ( ! empty( $row['company'] ) ) {
			update_post_meta( $post_id, 'bpbtb_company', sanitize_text_field( (string) $row['company'] ) );
		}

		/*
		 * The photo is pointed at, not copied. Both plugins' attachments are
		 * already in this site's media library, so re-uploading would leave two
		 * copies of every avatar and double the disk cost of migrating.
		 */
		if ( ! empty( $row['image_id'] ) ) {
			set_post_thumbnail( $post_id, (int) $row['image_id'] );
		}

		if ( $slug ) {
			update_post_meta( $post_id, self::SOURCE_META, sanitize_key( $slug ) );
			update_post_meta( $post_id, self::SOURCE_ID_META, (string) ( $row['source_id'] ?? '' ) );
		}

		return $post_id;
	}

	/**
	 * The CSV column order, used for both export and import.
	 *
	 * @return string[]
	 */
	public static function csv_columns() {
		return [ 'name', 'designation', 'company', 'rating', 'review', 'image_url', 'date' ];
	}

	/**
	 * Every testimonial as CSV rows, header first.
	 *
	 * @return array[]
	 */
	public static function export_rows() {
		$posts = get_posts(
			[
				'post_type'      => 'testimonial',
				'post_status'    => [ 'publish', 'draft', 'pending', 'private' ],
				'posts_per_page' => -1,
				'orderby'        => 'date',
				'order'          => 'ASC',
			]
		);

		$rows = [ self::csv_columns() ];

		foreach ( $posts as $post ) {
			$rows[] = [
				get_the_title( $post ),
				(string) get_post_meta( $post->ID, 'bpbtb_designation', true ),
				(string) get_post_meta( $post->ID, 'bpbtb_company', true ),
				(string) get_post_meta( $post->ID, 'bpbtb_rating', true ),
				$post->post_content,
				(string) get_the_post_thumbnail_url( $post->ID, 'full' ),
				$post->post_date,
			];
		}

		return $rows;
	}

	/**
	 * Map a CSV header to our field names.
	 *
	 * People export from all sorts of places, and a column called "Author",
	 * "Client" or "Reviewer" means the same thing. Matching on a normalised
	 * label rather than an exact string is the difference between an import that
	 * works and a support ticket.
	 *
	 * @param array $header Raw header cells.
	 * @return array Position => field name.
	 */
	public static function map_header( $header ) {
		$aliases = [
			'name'          => 'name',
			'author'        => 'name',
			'client'        => 'name',
			'client_name'   => 'name',
			'reviewer'      => 'name',
			'customer'      => 'name',
			'full_name'     => 'name',
			'designation'   => 'job',
			'title'         => 'job',
			'job'           => 'job',
			'job_title'     => 'job',
			'position'      => 'job',
			'role'          => 'job',
			'company'       => 'company',
			'organisation'  => 'company',
			'organization'  => 'company',
			'business'      => 'company',
			'rating'        => 'rating',
			'stars'         => 'rating',
			'star_rating'   => 'rating',
			'score'         => 'rating',
			'review'        => 'content',
			'content'       => 'content',
			'text'          => 'content',
			'testimonial'   => 'content',
			'feedback'      => 'content',
			'comment'       => 'content',
			'message'       => 'content',
			'body'          => 'content',
			'image'         => 'image_url',
			'image_url'     => 'image_url',
			'photo'         => 'image_url',
			'avatar'        => 'image_url',
			'picture'       => 'image_url',
			'date'          => 'date',
			'created'       => 'date',
			'published'     => 'date',
		];

		$map = [];

		foreach ( (array) $header as $i => $cell ) {
			// "Client Name", "client-name" and "CLIENT_NAME" are one column.
			$key = strtolower( trim( (string) $cell ) );
			$key = preg_replace( '/[^a-z0-9]+/', '_', $key );
			$key = trim( (string) $key, '_' );

			if ( isset( $aliases[ $key ] ) ) {
				$map[ $i ] = $aliases[ $key ];
			}
		}

		return $map;
	}

	/**
	 * Create testimonials from parsed CSV rows.
	 *
	 * @param array[] $rows Rows, header included.
	 * @return array {
	 *     @type int    $imported Created.
	 *     @type int    $skipped  Rows with nothing usable in them.
	 *     @type string $error    Reason the file could not be used at all.
	 * }
	 */
	public static function import_csv_rows( $rows ) {
		$rows = array_values( array_filter( (array) $rows, 'is_array' ) );

		if ( count( $rows ) < 2 ) {
			return [
				'imported' => 0,
				'skipped'  => 0,
				'error'    => __( 'That file has no rows under its header.', 'b-testimonials-block' ),
			];
		}

		$map = self::map_header( array_shift( $rows ) );

		if ( ! in_array( 'content', $map, true ) && ! in_array( 'name', $map, true ) ) {
			return [
				'imported' => 0,
				'skipped'  => 0,
				'error'    => __( 'No column in that file looks like a name or a review. Expected a header row with columns such as Name, Review and Rating.', 'b-testimonials-block' ),
			];
		}

		$imported = 0;
		$skipped  = 0;

		foreach ( $rows as $cells ) {
			$row = [
				'name'    => '',
				'content' => '',
				'job'     => '',
				'company' => '',
				'rating'  => 0,
				'date'    => '',
			];

			foreach ( $map as $i => $field ) {
				if ( ! isset( $cells[ $i ] ) ) {
					continue;
				}

				$value = trim( (string) $cells[ $i ] );

				if ( 'image_url' === $field ) {
					$row['image_id'] = $value ? self::attachment_id_from_url( $value ) : 0;
					continue;
				}

				$row[ $field ] = $value;
			}

			if ( '' === $row['name'] && '' === $row['content'] ) {
				$skipped++;
				continue;
			}

			if ( self::create( '', $row ) ) {
				$imported++;
			} else {
				$skipped++;
			}
		}

		return [
			'imported' => $imported,
			'skipped'  => $skipped,
			'error'    => '',
		];
	}

	/**
	 * Resolve a media-library URL back to its attachment.
	 *
	 * Only local attachments. A CSV from another site can name any URL at all,
	 * and downloading one on the strength of a spreadsheet cell would let an
	 * uploaded file reach out to an arbitrary host from the server.
	 *
	 * @param string $url Image URL.
	 * @return int Attachment ID, or 0.
	 */
	private static function attachment_id_from_url( $url ) {
		$url = esc_url_raw( $url );

		if ( ! $url ) {
			return 0;
		}

		return (int) attachment_url_to_postid( $url );
	}
}
}
