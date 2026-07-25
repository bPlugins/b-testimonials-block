<?php
/**
 * Frontend testimonial submission — REST endpoint.
 *
 * The Testimonial Form block posts here. Submissions are stored as `pending`
 * testimonials so an admin can review them before they appear anywhere.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the submission route.
 */
function bpbtb_register_form_route() {
	register_rest_route(
		'bptmb/v1',
		'/submit',
		[
			'methods'             => 'POST',
			'callback'            => 'bpbtb_handle_form_submit',
			'permission_callback' => '__return_true', // Public form.
		]
	);
}
add_action( 'rest_api_init', 'bpbtb_register_form_route' );

/**
 * Nonce action string used to protect the public form.
 *
 * @return string
 */
function bpbtb_form_nonce_action() {
	return 'bpbtb_testimonial_submit';
}

/**
 * Handle a testimonial submission.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
function bpbtb_handle_form_submit( $request ) {
	$params = $request->get_params();

	$name   = isset( $params['name'] ) ? sanitize_text_field( $params['name'] ) : '';
	$review = isset( $params['review'] ) ? sanitize_textarea_field( $params['review'] ) : '';

	if ( '' === $name || '' === $review ) {
		return new WP_REST_Response(
			[
				'success' => false,
				'message' => __( 'Please provide your name and a review.', 'b-testimonials-block' ),
			],
			400
		);
	}

	$nonce        = isset( $params['nonce'] ) ? sanitize_text_field( wp_unslash( $params['nonce'] ) ) : '';
	$header_nonce = isset( $_SERVER['HTTP_X_WP_NONCE'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_X_WP_NONCE'] ) ) : '';

	$valid_nonce = wp_verify_nonce( $nonce, bpbtb_form_nonce_action() )
		|| wp_verify_nonce( $nonce, 'wp_rest' )
		|| ( ! empty( $header_nonce ) && wp_verify_nonce( $header_nonce, 'wp_rest' ) );

	if ( ! $valid_nonce ) {
		return new WP_REST_Response(
			[
				'success' => false,
				'message' => __( 'Security check failed. Please refresh the page and try again.', 'b-testimonials-block' ),
			],
			403
		);
	}

	$post_id = wp_insert_post(
		[
			'post_type'    => 'testimonial',
			'post_status'  => 'pending',
			'post_title'   => $name,
			'post_content' => $review,
		],
		true
	);

	if ( is_wp_error( $post_id ) ) {
		return new WP_REST_Response(
			[
				'success' => false,
				'message' => __( 'Could not save your testimonial. Please try again later.', 'b-testimonials-block' ),
			],
			500
		);
	}

	$rating = isset( $params['rating'] ) ? min( 5, max( 1, absint( $params['rating'] ) ) ) : 5;
	update_post_meta( $post_id, 'bpbtb_rating', $rating );

	if ( ! empty( $params['designation'] ) ) {
		update_post_meta( $post_id, 'bpbtb_designation', sanitize_text_field( $params['designation'] ) );
	}

	if ( ! empty( $params['company'] ) ) {
		update_post_meta( $post_id, 'bpbtb_company', sanitize_text_field( $params['company'] ) );
	}

	if ( ! empty( $params['email'] ) ) {
		update_post_meta( $post_id, 'bpbtb_email', sanitize_email( $params['email'] ) );
	}

	// Optional photo upload — restricted to a small set of image types.
	$files = $request->get_file_params();
	if ( ! empty( $files['image'] ) && ! empty( $files['image']['name'] ) ) {
		require_once ABSPATH . 'wp-admin/includes/file.php';
		require_once ABSPATH . 'wp-admin/includes/media.php';
		require_once ABSPATH . 'wp-admin/includes/image.php';

		$overrides = [
			'test_form' => false,
			'mimes'     => [
				'jpg|jpeg' => 'image/jpeg',
				'png'      => 'image/png',
				'gif'      => 'image/gif',
				'webp'     => 'image/webp',
			],
		];

		$attach_id = media_handle_upload( 'image', $post_id, [], $overrides );
		if ( ! is_wp_error( $attach_id ) ) {
			set_post_thumbnail( $post_id, $attach_id );
		}
	}

	/**
	 * Fires after a testimonial is submitted from the frontend form.
	 *
	 * @param int $post_id New (pending) testimonial ID.
	 */
	do_action( 'bpbtb_testimonial_submitted', $post_id );

	return new WP_REST_Response(
		[
			'success' => true,
			'message' => __( 'Thank you! Your testimonial has been submitted and is awaiting review.', 'b-testimonials-block' ),
		],
		200
	);
}
