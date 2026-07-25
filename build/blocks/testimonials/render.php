<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}



$is_classic = ! empty( $attributes['useClassicEditor'] ) || ! empty( $attributes['isLegacyBlock'] );

if ( ! $is_classic && ! empty( $content ) ) {
	$inner_content = trim( preg_replace( '/^<div[^>]*>(.*)<\/div>$/ss', '$1', trim( $content ) ) );
	if ( ! empty( $inner_content ) ) {
		echo $content;
		return;
	}
}

if ( function_exists( 'bpbtb_prepare_block_items' ) ) {
	$attributes = bpbtb_prepare_block_items( $attributes );
}

$btb_c_id = $attributes['cId'] ?? '';
if ( empty( $btb_c_id ) ) {
	$btb_c_id = 'legacy-' . substr( md5( wp_json_encode( $attributes ) ), 0, 8 );
	$attributes['cId'] = $btb_c_id;
}

$btb_align     = $attributes['align'] ?? 'wide';
$btb_extra_cls = $attributes['className'] ?? '';
$btb_classes   = trim( 'bTestimonials wp-block-bptmb-testimonials wp-block-bptmb-b-testimonials ' . $btb_extra_cls . ' align' . $btb_align );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialsDir-<?php echo esc_attr( $btb_c_id ); ?>" data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"></div>

