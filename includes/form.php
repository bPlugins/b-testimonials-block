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
if ( ! function_exists( 'bpbtb_register_form_route' ) ) {
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
}
add_action( 'rest_api_init', 'bpbtb_register_form_route' );

/**
 * Nonce action string used to protect the public form.
 *
 * @return string
 */
if ( ! function_exists( 'bpbtb_form_nonce_action' ) ) {
function bpbtb_form_nonce_action() {
	return 'bpbtb_testimonial_submit';
}
}

/**
 * Handle a testimonial submission.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response
 */
if ( ! function_exists( 'bpbtb_handle_form_submit' ) ) {
function bpbtb_handle_form_submit( $request ) {
	$params = $request->get_params();

	// `btb_name` since the field was renamed off WordPress's `name` query var;
	// `name` stays accepted so a page cached with the older markup still posts.
	$raw_name = $params['btb_name'] ?? $params['name'] ?? '';

	$name   = sanitize_text_field( $raw_name );
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

	// Spam, rate and length guards. The nonce above proves the request came
	// from this site; these decide whether it came from a person. See
	// includes/form-security.php for what each one is for.
	if ( class_exists( 'BPBTB_Form_Security' ) ) {
		$guard = BPBTB_Form_Security::check( $request );

		if ( is_wp_error( $guard ) ) {
			return new WP_REST_Response(
				[
					'success' => false,
					'message' => $guard->get_error_message(),
				],
				// 429 for "slow down", 400 for "this looks wrong" -- the two
				// mean different things to a client and to a log.
				'bpbtb_rate_limited' === $guard->get_error_code() ? 429 : 400
			);
		}

		$limits = BPBTB_Form_Security::limits();
		$name   = BPBTB_Form_Security::cap( $name, $limits['name'] );
		$review = BPBTB_Form_Security::cap( $review, $limits['review'] );
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

	$bpbtb_limits = class_exists( 'BPBTB_Form_Security' ) ? BPBTB_Form_Security::limits() : [];
	$bpbtb_cap    = static function ( $value, $key ) use ( $bpbtb_limits ) {
		return isset( $bpbtb_limits[ $key ] ) && class_exists( 'BPBTB_Form_Security' )
			? BPBTB_Form_Security::cap( $value, $bpbtb_limits[ $key ] )
			: $value;
	};

	if ( ! empty( $params['designation'] ) ) {
		update_post_meta( $post_id, 'bpbtb_designation', $bpbtb_cap( sanitize_text_field( $params['designation'] ), 'designation' ) );
	}

	if ( ! empty( $params['company'] ) ) {
		update_post_meta( $post_id, 'bpbtb_company', $bpbtb_cap( sanitize_text_field( $params['company'] ), 'company' ) );
	}

	if ( ! empty( $params['email'] ) ) {
		update_post_meta( $post_id, 'bpbtb_email', $bpbtb_cap( sanitize_email( $params['email'] ), 'email' ) );
	}

	/*
	 * Optional photo upload.
	 *
	 * Gated on may_upload(), which reads the signed token to see whether the
	 * form that was drawn actually offered a photo field -- it defaults to off,
	 * and until this gate existed a site with the field switched off still
	 * accepted unauthenticated uploads into its media library. It also enforces
	 * the size cap and confirms the bytes are an image before anything is
	 * written to disk.
	 */
	if ( class_exists( 'BPBTB_Form_Security' ) && BPBTB_Form_Security::may_upload( $request ) ) {
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
}
