<?php
/**
 * Plugin Name: Testimonials
 * Description: Boost your website's credibility with Testimonials, effortlessly showcasing customer ratings and reviews.
 * Version: 1.0.4
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
            define( 'BPBTB_PLUGIN_VERSION', $is_local ? time() : '1.0.4' );
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

		// Blocks an administrator has switched off on the All Blocks page.
		//
		// Skipped here rather than unregistered afterwards: an unregistered block
		// has already had its editor script and stylesheet enqueued, so the only
		// thing switching one off would have saved is the inserter entry.
		//
		// A block already used on a page still renders -- its markup and its
		// render.php are untouched -- but the editor no longer knows the type, so
		// it shows the "not supported" placeholder there. That is the same trade
		// every block-toggle screen makes, and it is why the page says so.
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

	/**
	 * Load the editor bundle the forty blocks share.
	 *
	 * They used to have one `editorScript` each, which compiled the same shared
	 * code -- the Edit component, every settings panel, bpl-tools and its 3.3 MB
	 * icon library -- forty times over, and came to 137 MB of build output. They
	 * now compile to one bundle; see src/blocks/index.js for why.
	 *
	 * Enqueued here rather than named in each block.json, because a file named in
	 * forty of them is registered under forty handles: the editor printed a
	 * <script> tag for each, the browser ran the same bundle forty times, and
	 * every run after the first re-registered blocks the first had already
	 * registered. One handle, one tag, one execution.
	 *
	 * Only the script. `editorStyle` stays in block.json: a stylesheet linked
	 * forty times costs a tag and no behaviour, and it is how the editor gets CSS
	 * into the iframed canvas -- worth forty duplicate <link>s to keep that path
	 * exactly as it was.
	 *
	 * The blocks are still registered from their own block.json in onInit(), so
	 * `render.php`, `viewScript` and the front-end styles are untouched -- a
	 * visitor still loads only what the page actually uses.
	 */
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

		// register_block_type() did this from block.json's `textdomain` while the
		// scripts were named there. Nothing else would now.
		wp_set_script_translations( 'bpbtb-blocks-editor', 'b-testimonials-block', __DIR__ . '/languages' );

		/*
		 * The stylesheet as well, deliberately alongside block.json's
		 * `editorStyle`.
		 *
		 * The two reach different places and neither covers the other on its own.
		 * `editorStyle` is how a stylesheet gets into the iframed canvas, and it is
		 * bulk-enqueued for every registered block by core -- but that bulk enqueue
		 * is skipped entirely when a site loads block assets separately, which a
		 * block theme does. This request is where the inspector lives, and the
		 * inspector is the plugin's whole settings UI, so it is enqueued outright
		 * rather than left to depend on how the theme is built.
		 *
		 * The cost is one more <link> to a file the page already has.
		 */
		wp_enqueue_style(
			'bpbtb-blocks-editor',
			plugin_dir_url( __FILE__ ) . 'build/blocks/index.css',
			[],
			$asset['version']
		);
	}

	/**
	 * The registered name a built block directory declares.
	 *
	 * Read from block.json rather than derived from the folder, because the two
	 * do not always match: `build/blocks/testimonials` registers
	 * `bptmb/b-testimonials`.
	 *
	 * @param string $dir Block directory.
	 * @return string Block name, or '' when it cannot be read.
	 */
	private function block_name( $dir ) {
		$metadata = wp_json_file_decode( $dir . '/block.json', [ 'associative' => true ] );

		return isset( $metadata['name'] ) ? (string) $metadata['name'] : '';
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
