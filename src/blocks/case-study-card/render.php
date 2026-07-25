<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



if ( function_exists( 'bpbtb_prepare_block_items' ) ) {
	$attributes = bpbtb_prepare_block_items( $attributes );
}

$btb_align     = $attributes['align'] ?? 'wide';
$btb_c_id      = $attributes['cId'] ?? '';
$btb_extra_cls = $attributes['className'] ?? '';
$btb_classes   = trim( 'bTestimonials wp-block-bptmb-case-study-card ' . $btb_extra_cls . ' align' . $btb_align );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialsDir-<?php echo esc_attr( $btb_c_id ); ?>" data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"></div>
