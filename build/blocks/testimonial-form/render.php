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
// The REST nonce travels alongside it. Without an `X-WP-Nonce` header WordPress
// treats a cookie-authenticated POST as anonymous -- it calls wp_set_current_user( 0 )
// before the route runs -- and the form nonce, minted for the logged-in user, then
// hashes to a different value and fails its own check.
if ( function_exists( 'bpbtb_form_nonce_action' ) ) {
	$attributes['formEndpoint']  = rest_url( 'bptmb/v1/submit' );
	$attributes['formNonce']     = wp_create_nonce( bpbtb_form_nonce_action() );
	$attributes['formRestNonce'] = wp_create_nonce( 'wp_rest' );
}

/*
 * The signed token the spam guards read: when this form was drawn, and whether
 * it offers a photo field. Minted here, per request, for the same reason the
 * nonce is -- a mint-time baked into post content would be the time the page
 * was saved, and would make the "too fast" check meaningless.
 */
if ( class_exists( 'BPBTB_Form_Security' ) ) {
	$btb_fields              = isset( $attributes['fields'] ) && is_array( $attributes['fields'] ) ? $attributes['fields'] : [];
	$attributes['formToken'] = BPBTB_Form_Security::mint_token( ! empty( $btb_fields['image'] ) );
	$attributes['formTrap']  = BPBTB_Form_Security::HONEYPOT;
}

$btb_align     = $attributes['align'] ?? 'wide';
$btb_c_id      = $attributes['cId'] ?? '';
$btb_extra_cls = $attributes['className'] ?? '';
$btb_classes   = trim( 'bTestimonials wp-block-bptmb-testimonial-form ' . $btb_extra_cls . ' align' . $btb_align );
?>

<div class="<?php echo esc_attr( $btb_classes ); ?>" id="btbTestimonialsDir-<?php echo esc_attr( $btb_c_id ); ?>" data-attributes="<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>"></div>
