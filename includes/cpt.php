<?php
/**
 * Testimonial Custom Post Type + query helpers.
 *
 * Provides a central place to manage testimonials once and reuse them across
 * every block via each block's "Content Source" (Manual / Testimonials) option.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Clamp a rating to the 0-5 scale, keeping half stars.
 *
 * @param mixed $value Raw meta value.
 * @return float
 */
if ( ! function_exists( 'bpbtb_sanitize_rating' ) ) {
function bpbtb_sanitize_rating( $value ) {
	if ( ! is_numeric( $value ) ) {
		return 0.0;
	}

	return round( min( 5, max( 0, (float) $value ) ), 1 );
}
}

/**
 * Register the `testimonial` post type and its meta fields.
 */
if ( ! function_exists( 'bpbtb_register_testimonial_cpt' ) ) {
function bpbtb_register_testimonial_cpt() {
	$labels = [
		'name'               => __( 'Testimonials', 'b-testimonials-block' ),
		'singular_name'      => __( 'Testimonial', 'b-testimonials-block' ),
		'add_new'            => __( 'Add New', 'b-testimonials-block' ),
		'add_new_item'       => __( 'Add New Testimonial', 'b-testimonials-block' ),
		'edit_item'          => __( 'Edit Testimonial', 'b-testimonials-block' ),
		'new_item'           => __( 'New Testimonial', 'b-testimonials-block' ),
		'view_item'          => __( 'View Testimonial', 'b-testimonials-block' ),
		'search_items'       => __( 'Search Testimonials', 'b-testimonials-block' ),
		'not_found'          => __( 'No testimonials found', 'b-testimonials-block' ),
		'not_found_in_trash' => __( 'No testimonials found in Trash', 'b-testimonials-block' ),
		'all_items'          => __( 'All Testimonials', 'b-testimonials-block' ),
		'menu_name'          => __( 'Testimonials', 'b-testimonials-block' ),
	];

	register_post_type(
		'testimonial',
		[
			'labels'       => $labels,
			'public'       => false,
			'show_ui'      => true,
			'show_in_rest' => true, // Needed so blocks can fetch testimonials in the editor.
			'menu_icon'    => 'dashicons-format-quote',
			'has_archive'  => false,
			'rewrite'      => false,
			'supports'     => [ 'title', 'editor', 'thumbnail' ],
			'taxonomies'   => [ 'testimonial_category' ],
		]
	);

	/*
	 * Categories, so one block can show one group of testimonials -- and so the
	 * front-end filter bar has something to filter by.
	 *
	 * Not hierarchical: testimonial groups are tags in practice ("Enterprise",
	 * "Agency", "Support"), and a parent/child tree only adds a column to the
	 * admin screen that nobody fills in. show_in_rest so the editor can read
	 * them alongside the testimonials themselves.
	 */
	register_taxonomy(
		'testimonial_category',
		'testimonial',
		[
			'labels'            => [
				'name'          => __( 'Testimonial Categories', 'b-testimonials-block' ),
				'singular_name' => __( 'Testimonial Category', 'b-testimonials-block' ),
				'menu_name'     => __( 'Categories', 'b-testimonials-block' ),
				'all_items'     => __( 'All Categories', 'b-testimonials-block' ),
				'edit_item'     => __( 'Edit Category', 'b-testimonials-block' ),
				'add_new_item'  => __( 'Add New Category', 'b-testimonials-block' ),
				'search_items'  => __( 'Search Categories', 'b-testimonials-block' ),
				'not_found'     => __( 'No categories found', 'b-testimonials-block' ),
			],
			'public'            => false,
			'show_ui'           => true,
			'show_admin_column' => true,
			'show_in_rest'      => true,
			'hierarchical'      => false,
			'rewrite'           => false,
		]
	);

	$auth = function () {
		return current_user_can( 'edit_posts' );
	};

	/*
	 * A number, not an integer, and clamped rather than absint()ed.
	 *
	 * The meta box below offers step="0.1" and the importer reads 4.5 out of
	 * other plugins, but a registered sanitize_callback runs on every
	 * update_post_meta() -- so absint() was quietly rounding every half star
	 * down to a whole one, whichever path did the writing.
	 */
	register_post_meta(
		'testimonial',
		'bpbtb_rating',
		[
			'type'              => 'number',
			'single'            => true,
			'show_in_rest'      => true,
			'default'           => 5,
			'sanitize_callback' => 'bpbtb_sanitize_rating',
			'auth_callback'     => $auth,
		]
	);

	register_post_meta(
		'testimonial',
		'bpbtb_designation',
		[
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => $auth,
		]
	);

	register_post_meta(
		'testimonial',
		'bpbtb_company',
		[
			'type'              => 'string',
			'single'            => true,
			'show_in_rest'      => true,
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
			'auth_callback'     => $auth,
		]
	);
}
}
add_action( 'init', 'bpbtb_register_testimonial_cpt' );

/**
 * Use the classic editor for testimonials so the meta box below is easy to fill.
 * (REST access for blocks is unaffected.)
 *
 * @param bool   $use  Whether to use the block editor.
 * @param string $type Post type being edited.
 * @return bool
 */
if ( ! function_exists( 'bpbtb_testimonial_classic_editor' ) ) {
function bpbtb_testimonial_classic_editor( $use, $type ) {
	return 'testimonial' === $type ? false : $use;
}
}
add_filter( 'use_block_editor_for_post_type', 'bpbtb_testimonial_classic_editor', 10, 2 );

/**
 * Register the details meta box.
 */
if ( ! function_exists( 'bpbtb_testimonial_meta_box' ) ) {
function bpbtb_testimonial_meta_box() {
	add_meta_box(
		'bpbtb_testimonial_details',
		__( 'Testimonial Details', 'b-testimonials-block' ),
		'bpbtb_testimonial_meta_box_cb',
		'testimonial',
		'side',
		'high'
	);
}
}
add_action( 'add_meta_boxes', 'bpbtb_testimonial_meta_box' );

/**
 * Render the details meta box.
 *
 * @param WP_Post $post Current post.
 */
if ( ! function_exists( 'bpbtb_testimonial_meta_box_cb' ) ) {
function bpbtb_testimonial_meta_box_cb( $post ) {
	wp_nonce_field( 'bpbtb_save_testimonial', 'bpbtb_testimonial_nonce' );

	$rating      = (float) get_post_meta( $post->ID, 'bpbtb_rating', true );
	$designation = (string) get_post_meta( $post->ID, 'bpbtb_designation', true );
	$company     = (string) get_post_meta( $post->ID, 'bpbtb_company', true );
	$rating      = $rating ? $rating : 5;
	?>
	<p>
		<label for="bpbtb_rating"><strong><?php esc_html_e( 'Rating (0–5)', 'b-testimonials-block' ); ?></strong></label>
		<input type="number" min="0" max="5" step="0.1" id="bpbtb_rating" name="bpbtb_rating" value="<?php echo esc_attr( $rating ); ?>" style="width:100%;" />
	</p>
	<p>
		<label for="bpbtb_designation"><strong><?php esc_html_e( 'Designation', 'b-testimonials-block' ); ?></strong></label>
		<input type="text" id="bpbtb_designation" name="bpbtb_designation" value="<?php echo esc_attr( $designation ); ?>" style="width:100%;" />
	</p>
	<p>
		<label for="bpbtb_company"><strong><?php esc_html_e( 'Company', 'b-testimonials-block' ); ?></strong></label>
		<input type="text" id="bpbtb_company" name="bpbtb_company" value="<?php echo esc_attr( $company ); ?>" style="width:100%;" />
	</p>
	<p class="description"><?php esc_html_e( 'Use the title for the person\'s name, the content for the review, and the featured image for their photo.', 'b-testimonials-block' ); ?></p>
	<?php
}
}

/**
 * Save the details meta box.
 *
 * @param int $post_id Post ID.
 */
if ( ! function_exists( 'bpbtb_save_testimonial_meta' ) ) {
function bpbtb_save_testimonial_meta( $post_id ) {
	if ( ! isset( $_POST['bpbtb_testimonial_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['bpbtb_testimonial_nonce'] ) ), 'bpbtb_save_testimonial' ) ) {
		return;
	}

	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['bpbtb_rating'] ) ) {
		// Clamping happens in bpbtb_sanitize_rating(), which the registered meta
		// runs on every write -- from here and from the importer alike.
		update_post_meta( $post_id, 'bpbtb_rating', wp_unslash( $_POST['bpbtb_rating'] ) ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput.InputNotSanitized -- sanitised by the registered callback.
	}

	if ( isset( $_POST['bpbtb_designation'] ) ) {
		update_post_meta( $post_id, 'bpbtb_designation', sanitize_text_field( wp_unslash( $_POST['bpbtb_designation'] ) ) );
	}

	if ( isset( $_POST['bpbtb_company'] ) ) {
		update_post_meta( $post_id, 'bpbtb_company', sanitize_text_field( wp_unslash( $_POST['bpbtb_company'] ) ) );
	}
}
}
add_action( 'save_post_testimonial', 'bpbtb_save_testimonial_meta' );

/**
 * Add admin list columns for quick scanning.
 *
 * @param array $cols Columns.
 * @return array
 */
if ( ! function_exists( 'bpbtb_testimonial_columns' ) ) {
function bpbtb_testimonial_columns( $cols ) {
	$new = [];
	foreach ( $cols as $key => $label ) {
		if ( 'date' === $key ) {
			// "Classic", not the generic "Shortcode": this list and Testimonials
			// -> Shortcode both have a Shortcode column, for two different
			// things -- named after the editor each screen actually uses
			// (bpbtb_testimonial_classic_editor() forces classic here; the
			// other list's post type forces the block editor), since that is
			// the one thing a user has just experienced firsthand on either
			// screen, unlike "review" vs "layout" which they have to be told.
			$new['bpbtb_shortcode'] = __( 'Classic Shortcode', 'b-testimonials-block' );
		}

		$new[ $key ] = $label;
		if ( 'title' === $key ) {
			$new['bpbtb_designation'] = __( 'Designation', 'b-testimonials-block' );
			$new['bpbtb_rating']      = __( 'Rating', 'b-testimonials-block' );
		}
	}
	return $new;
}
}
add_filter( 'manage_testimonial_posts_columns', 'bpbtb_testimonial_columns' );

/**
 * Render admin column values.
 *
 * @param string $col     Column key.
 * @param int    $post_id Post ID.
 */
if ( ! function_exists( 'bpbtb_testimonial_column_content' ) ) {
function bpbtb_testimonial_column_content( $col, $post_id ) {
	if ( 'bpbtb_rating' === $col ) {
		$rating = (float) get_post_meta( $post_id, 'bpbtb_rating', true );
		echo esc_html( str_repeat( '★', max( 0, min( 5, $rating ) ) ) );
	} elseif ( 'bpbtb_designation' === $col ) {
		echo esc_html( (string) get_post_meta( $post_id, 'bpbtb_designation', true ) );
	} elseif ( 'bpbtb_shortcode' === $col ) {
		$shortcode = '[testimonial id=' . absint( $post_id ) . ']';
		?>
		<div class="bPlAdminShortcode" id="bPlAdminShortcode-<?php echo esc_attr( $post_id ); ?>">
			<input
				type="text"
				readonly="readonly"
				value="<?php echo esc_attr( $shortcode ); ?>"
				onclick="copyBPlAdminShortcode(<?php echo (int) $post_id; ?>)"
			/>
			<span class="tooltip"><?php esc_html_e( 'Copy To Clipboard', 'b-testimonials-block' ); ?></span>
		</div>
		<?php
	}
}
}
add_action( 'manage_testimonial_posts_custom_column', 'bpbtb_testimonial_column_content', 10, 2 );

/**
 * Enqueue the Shortcode column's click-to-copy script/styles.
 *
 * @param string $hook Current admin page hook suffix.
 */
if ( ! function_exists( 'bpbtb_testimonial_admin_enqueue' ) ) {
function bpbtb_testimonial_admin_enqueue( $hook ) {
	global $typenow;

	if ( 'testimonial' !== $typenow || 'edit.php' !== $hook ) {
		return;
	}

	$asset_file = __DIR__ . '/../build/admin/post.asset.php';
	$asset      = file_exists( $asset_file ) ? require $asset_file : [ 'dependencies' => [ 'wp-i18n' ], 'version' => BPBTB_PLUGIN_VERSION ];

	wp_enqueue_script(
		'bpbtb-admin-post',
		plugin_dir_url( __DIR__ ) . 'build/admin/post.js',
		$asset['dependencies'],
		$asset['version'],
		true
	);
	wp_set_script_translations( 'bpbtb-admin-post', 'b-testimonials-block', plugin_dir_path( __DIR__ ) . 'languages' );

	wp_enqueue_style(
		'bpbtb-admin-post',
		plugin_dir_url( __DIR__ ) . 'build/admin/post.css',
		[],
		$asset['version']
	);
}
}
add_action( 'admin_enqueue_scripts', 'bpbtb_testimonial_admin_enqueue' );

/**
 * Query testimonials and map them to the block item shape used by the front end.
 *
 * @param array $q Query options: number, orderBy, order.
 * @return array
 */
if ( ! function_exists( 'bpbtb_get_testimonial_items' ) ) {
function bpbtb_get_testimonial_items( $q = [] ) {
	$number   = isset( $q['number'] ) ? absint( $q['number'] ) : 6;
	$order_by = isset( $q['orderBy'] ) ? sanitize_key( $q['orderBy'] ) : 'date';
	$order    = isset( $q['order'] ) && 'asc' === strtolower( $q['order'] ) ? 'ASC' : 'DESC';

	$allowed_orderby = [ 'date', 'title', 'rand', 'menu_order', 'modified' ];
	if ( ! in_array( $order_by, $allowed_orderby, true ) ) {
		$order_by = 'date';
	}

	$args = [
		'post_type'        => 'testimonial',
		'post_status'      => 'publish',
		'posts_per_page'   => $number ? $number : 6,
		'orderby'          => $order_by,
		'order'            => $order,
		'suppress_filters' => false,
	];

	/*
	 * A specific testimonial or set of them, by ID -- used by the `[testimonial
	 * id=N]` shortcode (see bpbtb_testimonial_shortcode()) to pull exactly one
	 * review rather than the latest few. `post_status` is widened to 'any'
	 * because the shortcode has already checked the caller can see that post
	 * (published, or private/pending/draft with the right capability) before
	 * it ever gets here -- the default 'publish' above would otherwise hide a
	 * pending testimonial from someone who was just cleared to preview it.
	 */
	if ( ! empty( $q['include'] ) && is_array( $q['include'] ) ) {
		$args['post__in']   = array_map( 'absint', $q['include'] );
		$args['orderby']    = 'post__in';
		$args['post_status'] = 'any';
	}

	/*
	 * Narrowing by category here rather than in the browser, when the block is
	 * set to one group: the front-end filter bar hides what it does not want,
	 * but a block pinned to "Enterprise" should never send the others down the
	 * wire in the first place.
	 */
	$category = isset( $q['category'] ) ? sanitize_title( (string) $q['category'] ) : '';

	if ( '' !== $category ) {
		$args['tax_query'] = [
			[
				'taxonomy' => 'testimonial_category',
				'field'    => 'slug',
				'terms'    => $category,
			],
		];
	}

	$posts = get_posts( $args );

	$items = [];
	foreach ( $posts as $post ) {
		$terms = get_the_terms( $post->ID, 'testimonial_category' );

		$items[] = [
			'img'        => [ 'url' => (string) get_the_post_thumbnail_url( $post->ID, 'medium' ) ],
			'name'       => get_the_title( $post ),
			'deg'        => (string) get_post_meta( $post->ID, 'bpbtb_designation', true ),
			'company'    => (string) get_post_meta( $post->ID, 'bpbtb_company', true ),
			'reviewText' => wp_kses_post( $post->post_content ),
			'rating'     => (float) get_post_meta( $post->ID, 'bpbtb_rating', true ) ?: 5,
			// Slug and name both: the filter bar matches on the slug and labels
			// itself with the name.
			'categories' => is_array( $terms ) ? array_map(
				static function ( $term ) {
					return [
						'slug' => $term->slug,
						'name' => $term->name,
					];
				},
				$terms
			) : [],
		];
	}

	return $items;
}
}

/**
 * `[testimonial id=N]` -- embed one testimonial anywhere a shortcode runs.
 *
 * Reuses the `bptmb/b-testimonials` block's own "Content Source: Testimonials"
 * path (`dataSource: 'cpt'`) rather than hand-rolling a second markup and
 * stylesheet for a single review: `render.php` already calls
 * bpbtb_prepare_block_items() for that data source, which calls
 * bpbtb_get_testimonial_items() with this shortcode's `query.include` -- the
 * same themeing, layout and CSS every other testimonial on the site gets.
 *
 * @param array $atts Shortcode attributes.
 * @return string
 */
if ( ! function_exists( 'bpbtb_testimonial_shortcode' ) ) {
function bpbtb_testimonial_shortcode( $atts ) {
	$atts = shortcode_atts( [ 'id' => 0 ], $atts, 'testimonial' );

	$post_id = absint( $atts['id'] );
	if ( ! $post_id ) {
		return '';
	}

	$post = get_post( $post_id );
	if ( ! $post || 'testimonial' !== $post->post_type ) {
		return '';
	}

	if ( post_password_required( $post ) ) {
		return get_the_password_form( $post );
	}

	switch ( $post->post_status ) {
		case 'publish':
			break;

		case 'private':
			if ( ! current_user_can( 'read_private_posts' ) ) {
				return '';
			}
			break;

		case 'draft':
		case 'pending':
		case 'future':
			if ( ! current_user_can( 'edit_post', $post_id ) ) {
				return '';
			}
			break;

		default:
			return '';
	}

	$block = [
		'blockName'    => 'bptmb/b-testimonials',
		'attrs'        => [
			'cId'        => 'shortcode-' . $post_id,
			'dataSource' => 'cpt',
			'query'      => [ 'include' => [ $post_id ] ],
		],
		'innerBlocks'  => [],
		'innerHTML'    => '',
		'innerContent' => [],
	];

	return render_block( $block );
}
}
add_shortcode( 'testimonial', 'bpbtb_testimonial_shortcode' );

/**
 * Resolve a block's data before it is handed to the front-end renderer.
 *
 * Two independent jobs, both of which every block's render.php wants and none
 * of which it can do itself:
 *
 *   - Swap in testimonials from the CPT when the data source is set to "cpt".
 *   - Fill in the platform's published rating on a review badge whose Rating
 *     Source is Live (see includes/review-sources.php).
 *
 * All forty render.php files already called this one function, which is why the
 * live-rating step is bolted on here rather than repeated in six of them.
 *
 * @param array $attributes Block attributes.
 * @return array
 */
if ( ! function_exists( 'bpbtb_prepare_block_items' ) ) {
function bpbtb_prepare_block_items( $attributes ) {
	$source = isset( $attributes['dataSource'] ) ? $attributes['dataSource'] : 'manual';

	if ( 'cpt' === $source ) {
		$query               = isset( $attributes['query'] ) && is_array( $attributes['query'] ) ? $attributes['query'] : [];
		$attributes['items'] = bpbtb_get_testimonial_items( $query );
	}

	if ( function_exists( 'bpbtb_apply_live_review_data' ) ) {
		$attributes = bpbtb_apply_live_review_data( $attributes );
	}

	return $attributes;
}
}
