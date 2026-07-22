<?php 
if ( ! defined( 'ABSPATH' ) ) exit;
extract($attributes);

$className = $className ?? '';
$btbBlockClassName = 'wp-block-bptmb-b-testimonials ' . $className . ' align' . $align;
?>

<div class='<?php echo esc_attr($btbBlockClassName); ?>' id='btbTestimonialsDir-<?php echo esc_attr($cId) ?>' data-attributes='<?php echo esc_attr(wp_json_encode($attributes)); ?>'></div>

 