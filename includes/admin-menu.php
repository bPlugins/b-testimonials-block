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

	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_action( 'wp_ajax_bpbtbSaveUninstallOption', [ $this, 'save_uninstall_option' ] );
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
				// Base for the live block previews on the Demos route. Taken
				// from home_url() rather than assembled in JS so the previews
				// follow the site's real address -- subdirectory installs, a
				// custom domain or a changed scheme included.
				'demoBase'              => home_url( '/' ),
				'deleteDataOnUninstall' => (bool) get_option( self::UNINSTALL_OPTION, false ),
				'uninstallNonce'        => wp_create_nonce( self::NONCE_ACTION ),
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
}

new BPBTB_Admin_Menu();
}
