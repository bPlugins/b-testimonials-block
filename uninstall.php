<?php
/**
 * Uninstall routine.
 *
 * Runs only when the plugin is deleted, and only when the Settings page's
 * "delete data on uninstall" toggle was switched on. Deactivating changes
 * nothing, which is what the toggle's copy promises.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit;
}

/**
 * Remove every trace of the plugin from one site.
 */
function bpbtb_uninstall_site_data() {
	$testimonials = get_posts(
		[
			'post_type'        => 'testimonial',
			'post_status'      => 'any',
			'numberposts'      => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);

	$trashed = get_posts(
		[
			'post_type'        => 'testimonial',
			'post_status'      => 'trash',
			'numberposts'      => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);

	foreach ( array_unique( array_merge( $testimonials, $trashed ) ) as $post_id ) {
		$attachments = get_posts(
			[
				'post_type'   => 'attachment',
				'post_parent' => $post_id,
				'numberposts' => -1,
				'fields'      => 'ids',
			]
		);

		foreach ( $attachments as $attachment_id ) {
			wp_delete_attachment( $attachment_id, true );
		}

		// `true` skips the trash and takes the post meta with it.
		wp_delete_post( $post_id, true );
	}

	$displays = get_posts(
		[
			'post_type'        => 'testimonials-block',
			'post_status'      => 'any',
			'numberposts'      => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);
	$displays_trashed = get_posts(
		[
			'post_type'        => 'testimonials-block',
			'post_status'      => 'trash',
			'numberposts'      => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);

	foreach ( array_unique( array_merge( $displays, $displays_trashed ) ) as $post_id ) {
		wp_delete_post( $post_id, true );
	}

	delete_option( 'bpbtb_nps_poll_votes' );
	delete_option( 'bpbtb_nps_categories' );
	delete_option( 'bpbtb_disabled_blocks' );
	delete_option( 'bpbtb_first_seen' );
	delete_option( 'bpbtb_review_state' );
	delete_transient( 'bpbtb_usage_signal' );
	delete_metadata( 'user', 0, 'bpbtb_dismissed_source_errors', '', true );
	delete_option( 'bpbtb_delete_data_on_uninstall' );
}


function bpbtb_uninstall_credentials() {
	delete_option( 'bpbtb_review_sources' );
	delete_option( 'bpbtb_review_sources_cache' );
	wp_clear_scheduled_hook( 'bpbtb_refresh_review_sources' );

	foreach ( [ 'google', 'facebook', 'trustpilot', 'g2', 'capterra' ] as $bpbtb_platform ) {
		delete_transient( 'bpbtb_review_lock_' . $bpbtb_platform );
	}

	delete_option( 'bpbtb_review_import_errors' );
	delete_option( 'bpbtb_google_endpoint' );
	delete_option( 'bpbtb_google_endpoint_state' );

	foreach ( [ 'google', 'facebook' ] as $bpbtb_platform ) {
		delete_transient( 'bpbtb_imported_reviews_' . $bpbtb_platform );
	}
}

if ( is_multisite() ) {
	$bpbtb_sites = get_sites( [ 'fields' => 'ids', 'number' => 0 ] );

	foreach ( $bpbtb_sites as $bpbtb_site_id ) {
		switch_to_blog( $bpbtb_site_id );

		if ( get_option( 'bpbtb_delete_data_on_uninstall', false ) ) {
			bpbtb_uninstall_site_data();
		}

		bpbtb_uninstall_credentials();
		restore_current_blog();
	}
} else {
	if ( get_option( 'bpbtb_delete_data_on_uninstall', false ) ) {
		bpbtb_uninstall_site_data();
	}

	bpbtb_uninstall_credentials();
}
