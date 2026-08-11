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
		]
	);

	$auth = function () {
		return current_user_can( 'edit_posts' );
	};

	register_post_meta(
		'testimonial',
		'bpbtb_rating',
		[
			'type'              => 'integer',
			'single'            => true,
			'show_in_rest'      => true,
			'default'           => 5,
			'sanitize_callback' => 'absint',
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
		// Float, not absint() -- absint() truncated 4.5 to 4 and made fractional
		// ratings impossible to save. Casting still sanitises the input.
		$rating = round( min( 5, max( 0, (float) wp_unslash( $_POST['bpbtb_rating'] ) ) ), 1 );
		update_post_meta( $post_id, 'bpbtb_rating', $rating );
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
	}
}
}
add_action( 'manage_testimonial_posts_custom_column', 'bpbtb_testimonial_column_content', 10, 2 );

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

	$posts = get_posts(
		[
			'post_type'        => 'testimonial',
			'post_status'      => 'publish',
			'posts_per_page'   => $number ? $number : 6,
			'orderby'          => $order_by,
			'order'            => $order,
			'suppress_filters' => false,
		]
	);

	$items = [];
	foreach ( $posts as $post ) {
		$items[] = [
			'img'        => [ 'url' => (string) get_the_post_thumbnail_url( $post->ID, 'medium' ) ],
			'name'       => get_the_title( $post ),
			'deg'        => (string) get_post_meta( $post->ID, 'bpbtb_designation', true ),
			'reviewText' => wp_kses_post( $post->post_content ),
			'rating'     => (float) get_post_meta( $post->ID, 'bpbtb_rating', true ) ?: 5,
		];
	}

	return $items;
}
}

/**
 * Swap in testimonials from the CPT when a block's data source is set to "cpt".
 *
 * @param array $attributes Block attributes.
 * @return array
 */
if ( ! function_exists( 'bpbtb_prepare_block_items' ) ) {
function bpbtb_prepare_block_items( $attributes ) {
	$source = isset( $attributes['dataSource'] ) ? $attributes['dataSource'] : 'manual';

	if ( 'cpt' !== $source ) {
		return $attributes;
	}

	$query               = isset( $attributes['query'] ) && is_array( $attributes['query'] ) ? $attributes['query'] : [];
	$attributes['items'] = bpbtb_get_testimonial_items( $query );

	return $attributes;
}
}
