<?php
/**
 * Modern React Admin Dashboard Menu Registration matching b-slider.
 *
 * Enqueues build/admin-dashboard.js and build/admin-dashboard.css to render
 * the React dashboard under Testimonials -> Demo & Help.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Admin_Menu' ) ) {
class BPBTB_Admin_Menu {

	/**
	 * Nonce action shared by the dashboard's ajax calls.
	 */
	const NONCE_ACTION = 'bpbtb_activation_nonce';

	/**
	 * Option the Settings page writes, and uninstall.php reads.
	 */
	const UNINSTALL_OPTION = 'bpbtb_delete_data_on_uninstall';

	/**
	 * Option holding the blocks an administrator has switched off.
	 *
	 * A list of full block names (`bptmb/testimonials-slider`). Absent means
	 * every block is on, which is what a site that never opens the All Blocks
	 * page gets.
	 *
	 * Stored as the blocks that are OFF rather than the blocks that are ON, so a
	 * block added in a later release arrives switched on without the option
	 * having to be migrated.
	 */
	const DISABLED_BLOCKS_OPTION = 'bpbtb_disabled_blocks';

	/**
	 * The one block that cannot be switched off.
	 *
	 * Every other block is its child -- `parent` in their block.json names it --
	 * so switching this off would take all forty with it and leave the All Blocks
	 * page unable to switch any of them back on.
	 */
	const PARENT_BLOCK = 'bptmb/b-testimonials';

	/**
	 * The blocks currently switched off.
	 *
	 * Read by the registration loop in the plugin's main file, so it is static:
	 * that runs on `init`, before this class has any part in the request.
	 *
	 * @return string[] Block names.
	 */
	public static function disabled_blocks() {
		$stored = get_option( self::DISABLED_BLOCKS_OPTION, [] );

		if ( ! is_array( $stored ) ) {
			return [];
		}

		// The parent is filtered on read as well as on write: an option edited
		// by hand, or left over from an earlier version, cannot lock the site
		// out of its own blocks.
		return array_values(
			array_filter(
				array_map( 'strval', $stored ),
				static function ( $name ) {
					return self::PARENT_BLOCK !== $name;
				}
			)
		);
	}

	/**
	 * The plugin's two PHP admin screens, by the tail of their hook suffix.
	 *
	 * They render in PHP rather than React but are styled to match the dashboard
	 * this class already loads assets for -- see assets/admin-pages.css -- so
	 * their stylesheet is registered here alongside it rather than in each page's
	 * own file, where it would have to be duplicated.
	 */
	const PAGE_SCREENS = [ 'bpbtb-submissions', 'bpbtb-nps-poll' ];

	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_filter( 'admin_body_class', [ $this, 'admin_body_class' ] );
		add_action( 'wp_ajax_bpbtbSaveUninstallOption', [ $this, 'save_uninstall_option' ] );
		add_action( 'wp_ajax_bpbtbSaveDisabledBlocks', [ $this, 'save_disabled_blocks' ] );
		add_action( 'enqueue_block_editor_assets', [ $this, 'editor_disabled_blocks' ] );
	}

	/**
	 * Tell the editor which blocks are switched off.
	 *
	 * All forty blocks share one editor bundle -- see src/blocks/index.js -- and
	 * that bundle registers every one of them on the client whatever this plugin
	 * registered on the server. Skipping a block in onInit() therefore no longer
	 * keeps it out of the inserter on its own, so the bundle unregisters the ones
	 * named here after its imports have run.
	 *
	 * Attached to `wp-blocks`, which every block editor screen loads and which
	 * the bundle itself depends on, so the list is on the page before the bundle
	 * reads it.
	 */
	public function editor_disabled_blocks() {
		wp_add_inline_script(
			'wp-blocks',
			'window.bpbtbDisabledBlocks = ' . wp_json_encode( self::disabled_blocks() ) . ';',
			'before'
		);
	}

	/**
	 * The dashboard's header, for the two screens that are rendered in PHP.
	 *
	 * Submissions and NPS Poll are the only pages under Testimonials that are
	 * not part of the React dashboard, and they were the only ones without its
	 * header -- so moving between them and Demo & Help felt like leaving the
	 * plugin and coming back.
	 *
	 * Written out here rather than reused, because the original is a React
	 * component in bpl-tools that these pages have no React to render. The class
	 * names are its class names, so bpl-tools' own compiled stylesheet lays this
	 * out -- nothing in bpl-tools is touched, and the two headers cannot drift
	 * apart in appearance.
	 *
	 * The nav points at the dashboard's routes. None of them is ever marked
	 * active: these two pages are not among them, and lighting one up would say
	 * the reader is somewhere they are not.
	 */
	public static function render_header() {
		$dashboard = admin_url( 'edit.php?post_type=testimonial&page=bpbtb-dashboard' );

		$nav = [
			'#/welcome'    => __( 'Welcome', 'b-testimonials-block' ),
			'#/all-blocks' => __( 'All Blocks', 'b-testimonials-block' ),
			'#/demos'      => __( 'Demos', 'b-testimonials-block' ),
			'#/settings'   => __( 'Settings', 'b-testimonials-block' ),
		];
		?>
		<div class="bPlDashboardHeader">
			<div class="pluginInfo">
				<img
					src="https://ps.w.org/b-testimonial/assets/icon-128x128.png"
					alt="<?php esc_attr_e( 'Testimonials', 'b-testimonials-block' ); ?>"
				/>
				<h1><?php esc_html_e( 'Testimonials', 'b-testimonials-block' ); ?></h1>
				<div class="pluginVersion">v<?php echo esc_html( BPBTB_PLUGIN_VERSION ); ?></div>
			</div>

			<?php // Toggled by the inline script in admin_enqueue_scripts(). ?>
			<button
				class="bplHamburger"
				type="button"
				aria-label="<?php esc_attr_e( 'Toggle navigation', 'b-testimonials-block' ); ?>"
				aria-expanded="false"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>

			<nav class="bPlDashboardNav">
				<?php foreach ( $nav as $route => $label ) : ?>
					<a class="navLink" href="<?php echo esc_url( $dashboard . $route ); ?>">
						<?php echo esc_html( $label ); ?>
					</a>
				<?php endforeach; ?>
			</nav>

			<?php
			/*
			 * The filled button, which is what bpl-tools' header shows for Our
			 * Plugins on a premium install; the free one gets a plain text link.
			 * The button is the better of the two here whatever the licence --
			 * these screens have no other action in their top-right corner, and
			 * a text link on its own reads as an afterthought.
			 *
			 * `bPlButton variant-primary` is exactly what bpl-tools' Button
			 * renders for it, so the gradient, the size and the icon rules all
			 * come from the stylesheet already loaded. The icon is its
			 * ourPluginsIcon, copied because a JSX constant cannot be read from
			 * PHP -- and it is a fixed glyph, so there is nothing here to drift.
			 */
			?>
			<div class="navButtons">
				<a class="bPlButton variant-primary" href="<?php echo esc_url( $dashboard . '#our-plugins' ); ?>">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" aria-hidden="true" focusable="false">
						<path d="M224 32C241.7 32 256 46.3 256 64L256 160L384 160L384 64C384 46.3 398.3 32 416 32C433.7 32 448 46.3 448 64L448 160L512 160C529.7 160 544 174.3 544 192C544 209.7 529.7 224 512 224L512 288C512 383.1 442.8 462.1 352 477.3L352 544C352 561.7 337.7 576 320 576C302.3 576 288 561.7 288 544L288 477.3C197.2 462.1 128 383.1 128 288L128 224C110.3 224 96 209.7 96 192C96 174.3 110.3 160 128 160L192 160L192 64C192 46.3 206.3 32 224 32z" />
					</svg>
					<?php esc_html_e( 'Our Plugins', 'b-testimonials-block' ); ?>
				</a>
			</div>
		</div>
		<?php
	}

	/**
	 * Is the screen currently loading one of the styled PHP pages?
	 *
	 * Matched on a substring the way the dashboard's own check is: the full hook
	 * is `testimonial_page_<slug>`, and that prefix follows the CPT that owns the
	 * submenu rather than anything this plugin controls.
	 *
	 * @param string $hook Current admin page hook suffix.
	 * @return bool
	 */
	private function is_styled_page( $hook ) {
		foreach ( self::PAGE_SCREENS as $slug ) {
			if ( false !== strpos( $hook, $slug ) ) {
				return true;
			}
		}

		return false;
	}

	/**
	 * Marks the two PHP pages on <body>.
	 *
	 * The stylesheet needs a handle outside its own wrapper to hide the notices
	 * core prints above the page -- a white strip above a full-bleed canvas reads
	 * as a rendering fault. The plugin's own messages are moved inside the
	 * wrapper by each page and styled there.
	 *
	 * @param string $classes Existing body classes.
	 * @return string
	 */
	public function admin_body_class( $classes ) {
		$screen = function_exists( 'get_current_screen' ) ? get_current_screen() : null;

		if ( $screen && $this->is_styled_page( $screen->id ) ) {
			$classes .= ' bpbtb-admin-page-host';
		}

		return $classes;
	}

	public function admin_enqueue_scripts( $hook ) {
		if ( false !== strpos( $hook, 'bpbtb-dashboard' ) ) {
			$asset_file = plugin_dir_path( __DIR__ ) . 'build/admin-dashboard.asset.php';
			$asset      = file_exists( $asset_file ) ? require $asset_file : [
				'dependencies' => [ 'react', 'react-dom', 'wp-data', 'wp-api', 'wp-util', 'wp-i18n' ],
				'version'      => BPBTB_PLUGIN_VERSION,
			];

			// Main admin-dashboard styles
			wp_enqueue_style( 'bpbtb-admin-dashboard', plugin_dir_url( __DIR__ ) . 'build/admin-dashboard.css', [], $asset['version'] );

			// bpl-tools extracted component styles (style-admin-dashboard.css)
			$style_css = plugin_dir_path( __DIR__ ) . 'build/style-admin-dashboard.css';
			if ( file_exists( $style_css ) ) {
				wp_enqueue_style( 'bpbtb-admin-dashboard-style', plugin_dir_url( __DIR__ ) . 'build/style-admin-dashboard.css', [], $asset['version'] );
			}

			// `wp-util` is not detected from the imports -- the Settings page
			// reaches `wp.ajax` through bpl-tools' useWPAjax hook rather than
			// importing it -- so without this the hook logs "Please use wp-util
			// as a dependency" and the toggle saves nothing.
			$dependencies = array_unique( array_merge( $asset['dependencies'], [ 'wp-util' ] ) );

			wp_enqueue_script(
				'bpbtb-admin-dashboard',
				plugin_dir_url( __DIR__ ) . 'build/admin-dashboard.js',
				$dependencies,
				$asset['version'],
				true
			);

			wp_set_script_translations( 'bpbtb-admin-dashboard', 'b-testimonials-block', plugin_dir_path( __DIR__ ) . 'languages' );
		}

		if ( $this->is_styled_page( $hook ) ) {
			// Roboto, the family bpl-tools' dashboard stylesheet sets on everything.
			// Not Lato: that is only used for the dashboard header's wordmark, and
			// these screens have no header. Enqueued rather than @imported so it
			// does not block the stylesheet behind it.
			wp_enqueue_style(
				'bpbtb-admin-fonts',
				'https://fonts.googleapis.com/css2?family=Roboto:wght@100..900&display=swap',
				[],
				null
			);

			// The dashboard's compiled stylesheet, for the header these pages
			// print in PHP -- see render_header(). Every rule in it is scoped to
			// a .bPl* or .bpbtb* class, so nothing of it reaches the rest of
			// these screens or the rest of wp-admin.
			wp_enqueue_style(
				'bpbtb-admin-dashboard',
				plugin_dir_url( __DIR__ ) . 'build/admin-dashboard.css',
				[ 'bpbtb-admin-fonts' ],
				BPBTB_PLUGIN_VERSION
			);

			// Lato, which the header's wordmark is set in. The dashboard page
			// gets it from bpl-tools' own stylesheet; these do not load that.
			wp_enqueue_style(
				'bpbtb-admin-wordmark-font',
				'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;800;900&display=swap',
				[],
				null
			);

			wp_enqueue_style(
				'bpbtb-admin-pages',
				plugin_dir_url( __DIR__ ) . 'assets/admin-pages.css',
				[ 'bpbtb-admin-fonts', 'bpbtb-admin-dashboard' ],
				BPBTB_PLUGIN_VERSION
			);

			// The header's nav collapses behind a hamburger once the header is
			// narrow, and bpl-tools' stylesheet shows the dropdown on an `open`
			// class. Its React header keeps that in state; here it is this much
			// script, which is the whole of the behaviour and not worth a build
			// step or a file of its own. Hung on a src-less handle rather than on
			// jQuery's, so it does not depend on what else the screen enqueues.
			wp_register_script( 'bpbtb-admin-header-nav', false, [], BPBTB_PLUGIN_VERSION, true );
			wp_enqueue_script( 'bpbtb-admin-header-nav' );
			wp_add_inline_script(
				'bpbtb-admin-header-nav',
				"document.addEventListener( 'click', function ( e ) {
	var header = document.querySelector( '.bPlDashboardHeader' );
	if ( ! header || ! e.target || ! e.target.closest ) { return; }

	var btn = header.querySelector( '.bplHamburger' );
	var nav = header.querySelector( '.bPlDashboardNav' );
	if ( ! btn || ! nav ) { return; }

	var setOpen = function ( open ) {
		btn.classList.toggle( 'open', open );
		nav.classList.toggle( 'open', open );
		btn.setAttribute( 'aria-expanded', open ? 'true' : 'false' );
	};

	if ( e.target.closest( '.bPlDashboardHeader .bplHamburger' ) ) {
		setOpen( ! nav.classList.contains( 'open' ) );
		return;
	}

	// Anywhere outside the menu puts it away again.
	if ( nav.classList.contains( 'open' ) && ! e.target.closest( '.bPlDashboardNav' ) ) {
		setOpen( false );
	}
} );"
			);
		}
	}

	public function admin_menu() {
		add_submenu_page(
			'edit.php?post_type=testimonial',
			__( 'Demo & Help', 'b-testimonials-block' ),
			__( 'Demo & Help', 'b-testimonials-block' ),
			'manage_options',
			'bpbtb-dashboard',
			[ $this, 'render_dashboard_page' ]
		);
	}

	public function render_dashboard_page() {
		?>
		<div
			id="bpbtbDashboard"
			data-info="<?php echo esc_attr( wp_json_encode( [
				'version'               => BPBTB_PLUGIN_VERSION,
				'adminUrl'              => admin_url(),
				// Base for the dashboard's own links back into wp-admin.
				// Taken from home_url() rather than assembled in JS so it
				// follows the site's real address -- subdirectory installs, a
				// custom domain or a changed scheme included.
				'demoBase'              => home_url( '/' ),
				// The demo links themselves, resolved rather than assembled
				// here: bpbtb_demo_url() is the one place that decides where a
				// demo lives, so pointing the plugin at a hosted demo site is a
				// filter rather than an edit in every screen that links to one.
				// Keyed by preview slug; a block switched off has no entry.
				'demoUrls'              => function_exists( 'bpbtb_demo_urls' ) ? bpbtb_demo_urls() : [],
				'demoIndex'             => function_exists( 'bpbtb_demo_index_url' ) ? bpbtb_demo_index_url() : '',
				'deleteDataOnUninstall' => (bool) get_option( self::UNINSTALL_OPTION, false ),
				'uninstallNonce'        => wp_create_nonce( self::NONCE_ACTION ),
				// The All Blocks page. Names of the blocks currently switched
				// off, so the page paints its switches without a round trip.
				'disabledBlocks'        => self::disabled_blocks(),
			] ) ); ?>"
		>
		</div>
		<?php
	}

	/**
	 * Persist the Settings page's uninstall toggle.
	 *
	 * Answers the `bpbtbSaveUninstallOption` ajax action that bpl-tools'
	 * Settings page posts through `wp.ajax`, which expects a JSON success body
	 * carrying the value that was stored.
	 */
	public function save_uninstall_option() {
		$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, self::NONCE_ACTION ) ) {
			wp_send_json_error( [ 'message' => __( 'Invalid security token.', 'b-testimonials-block' ) ] );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( [ 'message' => __( 'You do not have permission to perform this action.', 'b-testimonials-block' ) ] );
		}

		// The toggle sends the boolean as a string, so a bare cast would read
		// "false" as true.
		$raw     = isset( $_POST['enabled'] ) ? sanitize_text_field( wp_unslash( $_POST['enabled'] ) ) : '';
		$enabled = in_array( $raw, [ '1', 'true', 'on', 'yes' ], true );

		update_option( self::UNINSTALL_OPTION, $enabled );

		wp_send_json_success(
			[
				'enabled' => $enabled,
				'message' => $enabled
					? __( 'Plugin data will be deleted when the plugin is uninstalled.', 'b-testimonials-block' )
					: __( 'Plugin data will be kept when the plugin is uninstalled.', 'b-testimonials-block' ),
			]
		);
	}
	/**
	 * Persist the All Blocks page's switches.
	 *
	 * Takes the whole list rather than one block at a time: the page has Activate
	 * All and Deactivate All, and forty requests where one will do is forty
	 * chances to end up with a half-written list.
	 *
	 * Names are validated against what is actually registered, so the option
	 * cannot collect entries for blocks that do not exist.
	 */
	public function save_disabled_blocks() {
		$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, self::NONCE_ACTION ) ) {
			wp_send_json_error( [ 'message' => __( 'Invalid security token.', 'b-testimonials-block' ) ] );
		}

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( [ 'message' => __( 'You do not have permission to perform this action.', 'b-testimonials-block' ) ] );
		}

		$raw = isset( $_POST['disabled'] ) ? wp_unslash( $_POST['disabled'] ) : [];

		if ( ! is_array( $raw ) ) {
			$raw = [];
		}

		// Registered names are the only ones accepted -- but a block that is
		// currently switched off is not registered, so its own name would fail
		// that test and switch itself back on. The stored list is allowed
		// through alongside.
		$known = array_merge( $this->registered_block_names(), self::disabled_blocks() );

		$disabled = array_values(
			array_unique(
				array_filter(
					array_map( 'sanitize_text_field', $raw ),
					static function ( $name ) use ( $known ) {
						return self::PARENT_BLOCK !== $name && in_array( $name, $known, true );
					}
				)
			)
		);

		update_option( self::DISABLED_BLOCKS_OPTION, $disabled );

		wp_send_json_success(
			[
				'disabled' => $disabled,
				/* translators: %d is how many blocks are switched off. */
				'message'  => $disabled
					? sprintf( _n( '%d block switched off.', '%d blocks switched off.', count( $disabled ), 'b-testimonials-block' ), count( $disabled ) )
					: __( 'Every block is switched on.', 'b-testimonials-block' ),
			]
		);
	}

	/**
	 * This plugin's registered block names.
	 *
	 * @return string[]
	 */
	private function registered_block_names() {
		$names = [];

		foreach ( WP_Block_Type_Registry::get_instance()->get_all_registered() as $name => $type ) {
			if ( 0 === strpos( $name, 'bptmb/' ) ) {
				$names[] = $name;
			}
		}

		return $names;
	}
}

new BPBTB_Admin_Menu();
}
