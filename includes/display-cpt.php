<?php
/**
 * "Testimonials Block" display post type + `[testimonials_block id=N]` shortcode.
 *
 * `testimonial` (see includes/cpt.php) is one person's review; this is a
 * different thing -- one saved instance of the Testimonials block (whichever
 * of its forty layouts an editor picked), so it can be placed outside the
 * block editor too: a shortcode, a widget, a page-builder row, a classic-
 * editor page, or a PHP template.
 *
 * Reached from Testimonials -> Shortcode, a nested submenu rather than a top
 * level menu of its own: it is a way of getting a shortcode out of a layout,
 * not a separate feature area.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the `testimonials-block` post type.
 *
 * Locked to a single `bptmb/b-testimonials` block, exactly like the CPT holds
 * one gallery in the Image Gallery and Video Gallery plugins: the block
 * itself is what lets an editor switch between all forty layouts (see
 * BlockSwitcher in shared/Components/Backend/Edit.js), so one root block is
 * all the template needs to allow.
 */
if ( ! function_exists( 'bpbtb_register_display_cpt' ) ) {
function bpbtb_register_display_cpt() {
	$labels = [
		'name'               => __( 'Testimonials Block', 'b-testimonials-block' ),
		'singular_name'      => __( 'Testimonials Block', 'b-testimonials-block' ),
		'add_new'            => __( 'Add New', 'b-testimonials-block' ),
		'add_new_item'       => __( 'Add New Testimonials Block', 'b-testimonials-block' ),
		'edit_item'          => __( 'Edit Testimonials Block', 'b-testimonials-block' ),
		'new_item'           => __( 'New Testimonials Block', 'b-testimonials-block' ),
		'view_item'          => __( 'View Testimonials Block', 'b-testimonials-block' ),
		'view_items'         => __( 'View Testimonials Block', 'b-testimonials-block' ),
		'search_items'       => __( 'Search Testimonials Block', 'b-testimonials-block' ),
		'not_found'          => __( 'No Testimonials Block found.', 'b-testimonials-block' ),
		'not_found_in_trash' => __( 'No Testimonials Block found in Trash.', 'b-testimonials-block' ),
		// What actually shows in the sidebar: _add_post_type_submenus() (core)
		// uses labels->all_items as the submenu's title when show_in_menu is a
		// parent slug rather than `true`.
		'all_items'          => __( 'Shortcode', 'b-testimonials-block' ),
		'menu_name'          => __( 'Shortcode', 'b-testimonials-block' ),
	];

	register_post_type(
		'testimonials-block',
		[
			'label'               => __( 'Testimonials Block', 'b-testimonials-block' ),
			'labels'              => $labels,
			'show_in_rest'        => true,
			/*
			 * Admin-only, same reasoning as Video Gallery's own CPT: this is a
			 * piece of configuration placed with a shortcode, not a page of its
			 * own, so it must not turn up in search results or resolve to a
			 * front-end URL of its own.
			 */
			'public'              => false,
			'show_ui'             => true,
			// Nested under Testimonials -> Shortcode rather than its own top
			// level menu: see labels->all_items above for the visible title.
			'show_in_menu'        => 'edit.php?post_type=testimonial',
			'publicly_queryable'  => false,
			'exclude_from_search' => true,
			'show_in_nav_menus'   => false,
			'has_archive'         => false,
			'rewrite'             => false,
			'query_var'           => false,
			// 'editor' is required here, not just decorative: core's own
			// use_block_editor_for_post_type() returns false before ever
			// calling the use_block_editor_for_post_type filter below when a
			// post type lacks 'editor' support, so without this the block
			// editor could never be forced on -- the filter simply never runs.
			'supports'            => [ 'title', 'editor' ],
			'template'            => [ [ 'bptmb/b-testimonials' ] ],
			'template_lock'       => 'all',
		]
	);
}
}
add_action( 'init', 'bpbtb_register_display_cpt' );

require_once __DIR__ . '/display-block-editor.php';

/**
 * `[testimonials_block id=N]` -- render one Testimonials Block post's content.
 *
 * @param array $atts Shortcode attributes.
 * @return string
 */
if ( ! function_exists( 'bpbtb_display_shortcode' ) ) {
function bpbtb_display_shortcode( $atts ) {
	$atts = shortcode_atts( [ 'id' => 0 ], $atts, 'testimonials_block' );

	$post_id = absint( $atts['id'] );
	if ( ! $post_id ) {
		return '';
	}

	$post = get_post( $post_id );
	if ( ! $post || 'testimonials-block' !== $post->post_type ) {
		return '';
	}

	if ( post_password_required( $post ) ) {
		return get_the_password_form( $post );
	}

	switch ( $post->post_status ) {
		case 'publish':
			return bpbtb_display_content( $post );

		case 'private':
			return current_user_can( 'read_private_posts' ) ? bpbtb_display_content( $post ) : '';

		case 'draft':
		case 'pending':
		case 'future':
			return current_user_can( 'edit_post', $post_id ) ? bpbtb_display_content( $post ) : '';

		default:
			return '';
	}
}
}
add_shortcode( 'testimonials_block', 'bpbtb_display_shortcode' );

/**
 * Render the `bptmb/b-testimonials` block a Testimonials Block post holds.
 *
 * The block name is checked and `render_block()` used directly, the same way
 * as Image Gallery and Video Gallery's own shortcodes -- not `wp_kses_post()`,
 * which cannot make this any safer (the block declares `html: false`, and
 * render.php escapes its own output) but would strip a review badge's
 * `<script type="application/ld+json">` SEO markup outright.
 *
 * @param WP_Post $post Post to render.
 * @return string
 */
if ( ! function_exists( 'bpbtb_display_content' ) ) {
function bpbtb_display_content( $post ) {
	$blocks = parse_blocks( $post->post_content );

	if ( empty( $blocks[0]['blockName'] ) || 'bptmb/b-testimonials' !== $blocks[0]['blockName'] ) {
		return '';
	}

	return render_block( $blocks[0] );
}
}

/**
 * Add a "Shortcode" column to the Testimonials Block list table.
 *
 * @param array $cols Columns.
 * @return array
 */
if ( ! function_exists( 'bpbtb_display_columns' ) ) {
function bpbtb_display_columns( $cols ) {
	$new = [];
	foreach ( $cols as $key => $label ) {
		if ( 'date' === $key ) {
			// "Block", not the generic "Shortcode": see the matching comment
			// in cpt.php's bpbtb_testimonial_columns() for why.
			$new['bpbtb_shortcode'] = __( 'Block Shortcode', 'b-testimonials-block' );
		}
		$new[ $key ] = $label;
	}
	return $new;
}
}
add_filter( 'manage_testimonials-block_posts_columns', 'bpbtb_display_columns' );

/**
 * Render the Shortcode column: a click-to-copy `[testimonials_block id=N]`.
 *
 * @param string $col     Column key.
 * @param int    $post_id Post ID.
 */
if ( ! function_exists( 'bpbtb_display_column_content' ) ) {
function bpbtb_display_column_content( $col, $post_id ) {
	if ( 'bpbtb_shortcode' !== $col ) {
		return;
	}

	$shortcode = '[testimonials_block id=' . absint( $post_id ) . ']';
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
add_action( 'manage_testimonials-block_posts_custom_column', 'bpbtb_display_column_content', 10, 2 );

/**
 * Enqueue the Shortcode column's click-to-copy script/styles.
 *
 * @param string $hook Current admin page hook suffix.
 */
if ( ! function_exists( 'bpbtb_display_admin_enqueue' ) ) {
function bpbtb_display_admin_enqueue( $hook ) {
	global $typenow;

	if ( 'testimonials-block' !== $typenow ) {
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
add_action( 'admin_enqueue_scripts', 'bpbtb_display_admin_enqueue' );
