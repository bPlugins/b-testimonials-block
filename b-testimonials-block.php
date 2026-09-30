<?php
/**
 * Plugin Name: Testimonials Block
 * Description: Boost your website's credibility with Testimonials Block, effortlessly showcasing customer ratings and reviews.
 * Version: 1.0.6
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Author: bPlugins
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
        add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_editor_bundle' ] );

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

    public function maybe_redirect_after_activation() {
        if ( ! get_option( 'bpbtb_activation_redirect', false ) ) {
            return;
        }

        delete_option( 'bpbtb_activation_redirect' );

        $activate_multi = isset( $_GET['activate-multi'] ) ? sanitize_text_field( wp_unslash( $_GET['activate-multi'] ) ) : '';
        if ( wp_doing_ajax() || ( defined( 'WP_CLI' ) && WP_CLI ) || ! empty( $activate_multi ) ) {
            return;
        }

        wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-dashboard' ) );
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
        $host_only = strtok( $http_host, ':' );
        $is_local  = in_array( $host_only, array( 'localhost', '127.0.0.1', '::1' ), true )
            || ( '' !== $host_only && str_ends_with( $host_only, '.local' ) );

        // Constant
        if ( ! defined( 'BPBTB_PLUGIN_VERSION' ) ) {
            define( 'BPBTB_PLUGIN_VERSION', $is_local ? time() : '1.0.6' );
        }
        if ( ! defined( 'BPBTB_DISPLAY_VERSION' ) ) {
            define( 'BPBTB_DISPLAY_VERSION', '1.0.6' );
        }
        if ( ! defined( 'BPBTB_ASSETS_DIR' ) ) {
            define( 'BPBTB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );
        }
        if ( ! defined( 'BPBTB_DIR' ) ) {
            define( 'BPBTB_DIR', plugin_dir_url( __FILE__ ) );
        }
    }

    private function load_classes() {
        require_once __DIR__ . '/includes/samples.php';
        require_once __DIR__ . '/includes/cpt.php';
        require_once __DIR__ . '/includes/display-cpt.php';
        require_once __DIR__ . '/includes/schema.php';
        require_once __DIR__ . '/includes/patterns.php';
        require_once __DIR__ . '/includes/form-security.php';
        require_once __DIR__ . '/includes/form.php';
        require_once __DIR__ . '/includes/admin-submissions.php';
        require_once __DIR__ . '/includes/admin-nps-poll.php';
        require_once __DIR__ . '/includes/admin-menu.php';
        require_once __DIR__ . '/includes/admin-review-request.php';
        require_once __DIR__ . '/includes/import-sources.php';
        require_once __DIR__ . '/includes/admin-import-export.php';
        require_once __DIR__ . '/includes/review-sources.php';
        require_once __DIR__ . '/includes/admin-review-sources.php';
        require_once __DIR__ . '/includes/admin-source-health.php';
        require_once __DIR__ . '/includes/admin-facebook-connect.php';
        require_once __DIR__ . '/includes/review-import.php';
        require_once __DIR__ . '/includes/demo-preview.php';
    }

    public function onInit(){
		$blocks_dir = __DIR__ . '/build/blocks';
		$disabled = class_exists( 'BPBTB_Admin_Menu' )
			? BPBTB_Admin_Menu::disabled_blocks()
			: [];

		if ( is_dir( $blocks_dir ) ) {
			foreach ( glob( $blocks_dir . '/*', GLOB_ONLYDIR ) as $block ) {
				if ( file_exists( $block . '/block.json' ) ) {
					if ( $disabled && in_array( $this->block_name( $block ), $disabled, true ) ) {
						continue;
					}

					register_block_type( $block );
				}
			}
		} elseif ( file_exists( __DIR__ . '/build/block.json' ) ) {
			// Fallback for the legacy single-block build layout.
			register_block_type( __DIR__ . '/build' );
		}
	}

	
	public function enqueue_editor_bundle() {
		$asset_file = __DIR__ . '/build/blocks/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'bpbtb-blocks-editor',
			plugin_dir_url( __FILE__ ) . 'build/blocks/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_set_script_translations( 'bpbtb-blocks-editor', 'b-testimonials-block', __DIR__ . '/languages' );

		wp_enqueue_style(
			'bpbtb-blocks-editor',
			plugin_dir_url( __FILE__ ) . 'build/blocks/index.css',
			[],
			$asset['version']
		);
	}

	private function block_name( $dir ) {
		$metadata = wp_json_file_decode( $dir . '/block.json', [ 'associative' => true ] );

		return isset( $metadata['name'] ) ? (string) $metadata['name'] : '';
	}

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
