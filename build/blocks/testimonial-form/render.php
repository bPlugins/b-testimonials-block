<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound



if ( function_exists( 'bpbtb_prepare_block_items' ) ) {
	$attributes = bpbtb_prepare_block_items( $attributes );
}

// The form posts to the REST route in includes/form.php. Both values are
// per-request -- a nonce especially must not be stored in post content -- so they
// travel in the rendered payload rather than as block attributes.
if ( function_exists( 'bpbtb_form_nonce_action' ) ) {
	$attributes['formEndpoint'] = rest_url( 'bptmb/v1/submit' );
	$attributes['formNonce']    = wp_create_nonce( bpbtb_form_nonce_action() );
}

$btb_align     = $attributes['align'] ?? 'wide';
$btb_c_id      = $attributes['cId'] ?? '';
$btb_extra_cls = $attributes['className'] ?? '';
$btb_classes   = trim( 'bTestimonials wp-block-bptmb-testimonial-form ' . $btb_extra_cls . ' align' . $btb_align );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialsDir-<?php echo esc_attr( $btb_c_id ); ?>" data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"></div>
