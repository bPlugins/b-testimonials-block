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
	// The testimonials themselves, whatever state they are in -- pending
	// submissions and trashed ones included, which a default WP_Query would
	// skip.
	$testimonials = get_posts(
		[
			'post_type'        => 'testimonial',
			'post_status'      => 'any',
			'numberposts'      => -1,
			'fields'           => 'ids',
			'suppress_filters' => false,
		]
	);

	// 'any' excludes trashed posts, so those are collected separately rather
	// than left behind as orphans.
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
		// Photos submitted through the frontend form are attachments parented
		// to the testimonial; deleting the post alone would orphan the files.
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

	delete_option( 'bpbtb_nps_poll_votes' );
	delete_option( 'bpbtb_nps_categories' );
	delete_option( 'bpbtb_delete_data_on_uninstall' );
}

if ( is_multisite() ) {
	$bpbtb_sites = get_sites( [ 'fields' => 'ids', 'number' => 0 ] );

	foreach ( $bpbtb_sites as $bpbtb_site_id ) {
		switch_to_blog( $bpbtb_site_id );

		// Checked per site: the toggle is a per-site option, so one site opting
		// in must not wipe another that did not.
		if ( get_option( 'bpbtb_delete_data_on_uninstall', false ) ) {
			bpbtb_uninstall_site_data();
		}

		restore_current_blog();
	}
} elseif ( get_option( 'bpbtb_delete_data_on_uninstall', false ) ) {
	bpbtb_uninstall_site_data();
}
