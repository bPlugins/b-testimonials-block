<?php
/**
 * Plugin Name: B Testimonials Block
 * Description: Boost your website's credibility with B Testimonials Block, effortlessly showcasing customer ratings and reviews..
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-testimonials-block
 */

// ABS PATH
if (!defined('ABSPATH')) {exit;}

// Constant
if ('localhost' === $_SERVER['HTTP_HOST']) {
    $plugin_version = time();
} else {
    $plugin_version = '1.0.0';
}
define('BTB_PLUGIN_VERSION', $plugin_version);

// define('BTB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST']  time() : '1.0.0');
define('BTB_ASSETS_DIR', plugin_dir_url(__FILE__) . 'assets/');
define('BTB_DIR', plugin_dir_url(__FILE__));

// B Testimonials Block
class btb_Testimonials
{
    public function __construct()
    {
        add_action('enqueue_block_assets', [$this, 'enqueueBlockAssets']);
        add_action('init', [$this, 'onInit']);
    }

    public function enqueueBlockAssets()
    {
        wp_register_style('btb-testimonials-style', plugins_url('dist/style.css', __FILE__), [], BTB_PLUGIN_VERSION);
        wp_register_script('btb-testimonials-script', BTB_DIR . 'dist/script.js', ['react', 'react-dom'], BTB_PLUGIN_VERSION);
    }

    public function onInit()
    {
        wp_register_style('btb-b-testimonials-editor-style', plugins_url('dist/editor.css', __FILE__), ['btb-testimonials-style'], BTB_PLUGIN_VERSION); // Backend Style

        register_block_type(__DIR__, [
            'editor_style' => 'btb-b-testimonials-editor-style',
            'render_callback' => [$this, 'render'],
        ]); // Register Block

        wp_set_script_translations('btb-b-testimonials-editor-script', 'b-testimonials-block', plugin_dir_path(__FILE__) . 'languages'); // Translate
    }

    public function render($attributes)
    {
        extract($attributes);

        $className = $className ?? '';
        $btbBlockClassName = 'wp-block-bptmb-b-testimonials ' . $className . ' align' . $align;

        wp_enqueue_style('btb-testimonials-style');
        wp_enqueue_script('btb-testimonials-script');

        ob_start();?>
		<div class='<?php echo esc_attr($btbBlockClassName); ?>' id='btbTestimonialsDir-<?php echo esc_attr($cId) ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'></div>

		<?php return ob_get_clean();
    } // Render
}
new btb_Testimonials();