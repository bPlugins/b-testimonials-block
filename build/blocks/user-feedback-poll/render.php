<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound



if ( function_exists( 'bpbtb_prepare_block_items' ) ) {
	$attributes = bpbtb_prepare_block_items( $attributes );
}

// The view script used to guess the route from `window.wpApiSettings`, which
// only exists in wp-admin, and fall back to a hard-coded `/wp-json/...` that a
// plain-permalink or subdirectory install does not answer on. Both values are
// per-request, so they travel in the rendered payload rather than as attributes.
$attributes['pollEndpoint']  = rest_url( 'bptmb/v1/submit-nps' );
$attributes['pollRestNonce'] = wp_create_nonce( 'wp_rest' );

$btb_align     = $attributes['align'] ?? 'wide';
$btb_c_id      = $attributes['cId'] ?? '';
$btb_extra_cls = $attributes['className'] ?? '';
$btb_classes   = trim( 'bTestimonials wp-block-bptmb-user-feedback-poll ' . $btb_extra_cls . ' align' . $btb_align );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialsDir-<?php echo esc_attr( $btb_c_id ); ?>" data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"></div>
