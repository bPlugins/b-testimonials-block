<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound

$is_classic = ! empty( $attributes['useClassicEditor'] ) || ! empty( $attributes['isLegacyBlock'] );

$btb_inner_content = '';
if ( ! empty( $content ) ) {
	$btb_inner_content = trim( preg_replace( '/^<div[^>]*>(.*)<\/div>$/ss', '$1', trim( $content ) ) );
}

if ( ! $is_classic ) {
	// A child block was chosen -- render it and nothing else.
	if ( '' !== $btb_inner_content ) {
		echo wp_kses_post( $content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		return;
	}

	/*
	 * No child block, and classic mode was never chosen. This is the state where
	 * the editor shows the "Select Your Testimonial Block" picker, which is an
	 * authoring affordance with nothing to publish behind it. Without this guard
	 * the block falls through below and the front end renders the placeholder
	 * demo testimonial ("John Doe") that the user never asked for.
	 *
	 * The test mirrors Edit.js exactly so that anything showing the picker in the
	 * editor renders nothing publicly -- and, just as important, so a legacy block
	 * that predates the child-block system and holds real testimonials still
	 * renders.
	 */
	$btb_classic_off = isset( $attributes['useClassicEditor'] ) && false === $attributes['useClassicEditor'];

	$btb_items = ( isset( $attributes['items'] ) && is_array( $attributes['items'] ) ) ? $attributes['items'] : array();
	$btb_item  = ( 1 === count( $btb_items ) && is_array( $btb_items[0] ) ) ? $btb_items[0] : null;

	$btb_is_fresh_item = null !== $btb_item
		&& 'John Doe' === ( $btb_item['name'] ?? '' )
		&& 'Developer' === ( $btb_item['deg'] ?? '' )
		&& 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout' === ( $btb_item['reviewText'] ?? '' );

	$btb_is_fresh_block = $btb_is_fresh_item
		&& in_array( $attributes['theme'] ?? 'default', array( '', 'default' ), true )
		&& in_array( $attributes['layout'] ?? 'default', array( '', 'default' ), true )
		&& in_array( $attributes['dataSource'] ?? 'manual', array( '', 'manual' ), true );

	if ( $btb_classic_off || $btb_is_fresh_block ) {
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

