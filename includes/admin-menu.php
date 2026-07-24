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

class BPBTB_Admin_Menu {

	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ] );
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
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

			wp_enqueue_script(
				'bpbtb-admin-dashboard',
				plugin_dir_url( __DIR__ ) . 'build/admin-dashboard.js',
				$asset['dependencies'],
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
				'version'  => BPBTB_PLUGIN_VERSION,
				'adminUrl' => admin_url(),
			] ) ); ?>"
		>
		</div>
		<?php
	}
}

new BPBTB_Admin_Menu();
