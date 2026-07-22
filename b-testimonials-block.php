<?php
/**
 * Plugin Name: B Testimonials Block
 * Description: Boost your website's credibility with b testimonials block, effortlessly showcasing customer ratings and reviews..
 * Version: 1.0.2
 * Author: bPlugins
 * Author URI: http://bplugins.com
 * Requires at least: 6.5
 * Requires PHP: 7.1
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-testimonials-block
 */

// ABS PATH
if ( ! defined('ABSPATH') ) { exit; }

class BPBTB_Testimonials_Block{

    private static $instance;

    private function __construct()
    {
        $this->define_constants();
        $this->load_classes();

        add_action('init', [$this, 'onInit']);
        add_filter('block_categories_all', [$this, 'register_block_category']);
    }

    public static function get_instance() {

        if( self::$instance ) {
            return self::$instance;
        }

        self::$instance = new self();
        return self::$instance;
    }

    private function define_constants() {
        // Constant
        define( 'BPBTB_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.2' );
        define( 'BPBTB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );
        define( 'BPBTB_DIR', plugin_dir_url( __FILE__ ) );
    }

    private function load_classes() {
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
