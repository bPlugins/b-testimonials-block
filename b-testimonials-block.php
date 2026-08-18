<?php
/**
 * Plugin Name: Testimonials
 * Description: Boost your website's credibility with b testimonials block, effortlessly showcasing customer ratings and reviews.
 * Version: 1.0.3
 * Author: bPlugins
 * Author URI: http://bplugins.com
 * Requires at least: 6.5
 * Requires PHP: 7.2
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-testimonials-block
 */

// ABS PATH
if ( ! defined('ABSPATH') ) { exit; }

if ( ! class_exists( 'BPBTB_Testimonials_Block' ) ) {

class BPBTB_Testimonials_Block{

    private static $instance;

    private function __construct()
    {
        $this->define_constants();
        $this->load_classes();

        add_action('init', [$this, 'onInit']);
        add_filter('block_categories_all', [$this, 'register_block_category']);
        add_filter('block_type_metadata', [$this, 'set_block_asset_version']);

        // Redirect to Demo & Help page on first activation.
        register_activation_hook( __FILE__, [ $this, 'on_activation' ] );
        add_action( 'admin_init', [ $this, 'maybe_redirect_after_activation' ] );
    }

    /**
     * Set a flag so we know a redirect is needed on the next admin page load.
     */
    public function on_activation() {
        update_option( 'bpbtb_activation_redirect', true );
    }

    /**
     * Redirect to the Demo & Help dashboard page once after activation.
     */
    public function maybe_redirect_after_activation() {
        if ( ! get_option( 'bpbtb_activation_redirect', false ) ) {
            return;
        }

        delete_option( 'bpbtb_activation_redirect' );

        // Don't redirect on bulk activate or WP-CLI.
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $activate_multi = isset( $_GET['activate-multi'] ) ? sanitize_text_field( wp_unslash( $_GET['activate-multi'] ) ) : '';
        if ( wp_doing_ajax() || ( defined( 'WP_CLI' ) && WP_CLI ) || ! empty( $activate_multi ) ) {
            return;
        }

        wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial' ) );
        exit;
    }

    public static function get_instance() {

        if( self::$instance ) {
            return self::$instance;
        }

        self::$instance = new self();
        return self::$instance;
    }

    private function define_constants() {
        $http_host = isset( $_SERVER['HTTP_HOST'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_HOST'] ) ) : '';
        // Local dev is usually served on a port (Studio uses localhost:PORT), so
        // match the host prefix rather than the bare string -- otherwise assets
        // are cached under a fixed version and rebuilds never reach the browser.
        $host_only = strtok( $http_host, ':' );
        $is_local  = in_array( $host_only, array( 'localhost', '127.0.0.1', '::1' ), true )
            || ( '' !== $host_only && str_ends_with( $host_only, '.local' ) );

        // Constant
        if ( ! defined( 'BPBTB_PLUGIN_VERSION' ) ) {
            define( 'BPBTB_PLUGIN_VERSION', $is_local ? time() : '1.0.3' );
        }
        if ( ! defined( 'BTB_PLUGIN_VERSION' ) ) {
            define( 'BTB_PLUGIN_VERSION', BPBTB_PLUGIN_VERSION );
        }
        if ( ! defined( 'BPBTB_ASSETS_DIR' ) ) {
            define( 'BPBTB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );
        }
        if ( ! defined( 'BTB_ASSETS_DIR' ) ) {
            define( 'BTB_ASSETS_DIR', BPBTB_ASSETS_DIR );
        }
        if ( ! defined( 'BPBTB_DIR' ) ) {
            define( 'BPBTB_DIR', plugin_dir_url( __FILE__ ) );
        }
        if ( ! defined( 'BTB_DIR' ) ) {
            define( 'BTB_DIR', BPBTB_DIR );
        }
    }

    private function load_classes() {
        require_once __DIR__ . '/includes/cpt.php';
        require_once __DIR__ . '/includes/form.php';
        require_once __DIR__ . '/includes/admin-submissions.php';
        require_once __DIR__ . '/includes/admin-nps-poll.php';
        require_once __DIR__ . '/includes/admin-menu.php';
        require_once __DIR__ . '/includes/demo-preview.php';
    }

    public function onInit(){
		// Register every block found under build/blocks/*.
		// Each sub-block lives in src/blocks/<name>/ and is compiled to build/blocks/<name>/.
		$blocks_dir = __DIR__ . '/build/blocks';

		if ( is_dir( $blocks_dir ) ) {
			foreach ( glob( $blocks_dir . '/*', GLOB_ONLYDIR ) as $block ) {
				if ( file_exists( $block . '/block.json' ) ) {
					register_block_type( $block );
				}
			}
		} elseif ( file_exists( __DIR__ . '/build/block.json' ) ) {
			// Fallback for the legacy single-block build layout.
			register_block_type( __DIR__ . '/build' );
		}
	}

	/**
	 * Give our blocks' scripts and styles a real ?ver= stamp.
	 *
	 * Without a `version` in block.json, WordPress registers block assets with
	 * $version = false and falls back to the WordPress core version, so the
	 * asset URL never changes between plugin builds and browsers serve stale
	 * CSS/JS. Tying it to BPBTB_PLUGIN_VERSION busts the cache on every local
	 * rebuild and on every released version.
	 *
	 * @param array $metadata Parsed block.json metadata.
	 * @return array
	 */
	public function set_block_asset_version( $metadata ) {
		if ( isset( $metadata['name'] ) && str_starts_with( $metadata['name'], 'bptmb/' ) && empty( $metadata['version'] ) ) {
			$metadata['version'] = (string) BPBTB_PLUGIN_VERSION;
		}

		return $metadata;
	}

	// Group all bPlugins testimonial blocks under one category in the inserter.
	public function register_block_category( $categories ) {
		foreach ( $categories as $category ) {
			if ( isset( $category['slug'] ) && 'bplugins' === $category['slug'] ) {
				return $categories;
			}
		}

		array_unshift( $categories, [
			'slug'  => 'bplugins',
			'title' => __( 'bPlugins', 'b-testimonials-block' ),
			'icon'  => null,
		] );

		return $categories;
	}
     
}
BPBTB_Testimonials_Block::get_instance();
}
