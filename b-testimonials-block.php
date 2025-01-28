<?php
/**
 * Plugin Name: B Testimonials Block
 * Description: Boost your website's credibility with b testimonials block, effortlessly showcasing customer ratings and reviews..
 * Version: 1.0.0
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
        define( 'BTB_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
        define( 'BTB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );
        define( 'BTB_DIR', plugin_dir_url( __FILE__ ) );
    }

    private function load_classes() {
    }

    public function onInit(){
		register_block_type( __DIR__ . '/build' );
	}
     
}
BPBTB_Testimonials_Block::get_instance();
