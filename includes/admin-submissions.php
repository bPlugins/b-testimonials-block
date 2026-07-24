<?php
/**
 * Admin Submissions Management Page for Customer Testimonials & Feedback.
 *
 * Provides a dedicated modern dashboard for site admins to review, approve,
 * reject, or delete customer submissions collected via frontend form blocks.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get count of pending customer submissions.
 *
 * @return int
 */
function bpbtb_get_pending_submissions_count() {
	$count_posts = wp_count_posts( 'testimonial' );
	return isset( $count_posts->pending ) ? (int) $count_posts->pending : 0;
}

/**
 * Add "Submissions" submenu item under Testimonials in the WP admin menu.
 */
function bpbtb_register_admin_submissions_menu() {
	$pending_count = bpbtb_get_pending_submissions_count();
	$badge         = '';

	if ( $pending_count > 0 ) {
		$badge = sprintf(
			' <span class="awaiting-mod count-%1$d"><span class="pending-count">%1$d</span></span>',
			$pending_count
		);
	}

	add_submenu_page(
		'edit.php?post_type=testimonial',
		__( 'User Submissions', 'b-testimonials-block' ),
		__( 'Submissions', 'b-testimonials-block' ) . $badge,
		'manage_options',
		'bpbtb-submissions',
		'bpbtb_render_admin_submissions_page'
	);
}
add_action( 'admin_menu', 'bpbtb_register_admin_submissions_menu' );

/**
 * Display top dashboard notice when there are pending customer submissions.
 */
function bpbtb_pending_submissions_notice() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$screen = get_current_screen();
	if ( $screen && 'testimonial_page_bpbtb-submissions' === $screen->id ) {
		return; // Already on the submissions page.
	}

	$pending_count = bpbtb_get_pending_submissions_count();
	if ( $pending_count > 0 ) {
		$url = admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions' );
		?>
		<div class="notice notice-warning is-dismissible" style="border-left-color: #5b34c9; padding: 12px 16px; border-radius: 8px;">
			<p style="margin: 0; font-size: 14px; display: flex; align-items: center; justify-content: space-between;">
				<span>
					<strong style="color: #4527a4;"><?php esc_html_e( 'B Testimonials Block:', 'b-testimonials-block' ); ?></strong>
					<?php
					printf(
						/* translators: %d: number of pending submissions */
						esc_html( _n( 'You have %d pending customer submission awaiting review.', 'You have %d pending customer submissions awaiting review.', $pending_count, 'b-testimonials-block' ) ),
						(int) $pending_count
					);
					?>
				</span>
				<a href="<?php echo esc_url( $url ); ?>" class="button button-primary" style="background: linear-gradient(135deg, #5b34c9, #4527a4); border: none; border-radius: 6px; font-weight: 600;">
					<?php esc_html_e( 'View Submissions', 'b-testimonials-block' ); ?> &rarr;
				</a>
			</p>
		</div>
		<?php
	}
}
add_action( 'admin_notices', 'bpbtb_pending_submissions_notice' );

/**
 * Handle submission action GET requests (Approve, Trash, Delete).
 */
function bpbtb_handle_admin_submission_actions() {
	$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
	if ( 'bpbtb-submissions' !== $page ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_GET['action'] ) && isset( $_GET['post_id'] ) && isset( $_GET['_wpnonce'] ) ) {
		$post_id = absint( wp_unslash( $_GET['post_id'] ) );
		$action  = sanitize_key( wp_unslash( $_GET['action'] ) );
		$nonce   = sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) );

		if ( ! wp_verify_nonce( $nonce, 'bpbtb_submission_action_' . $post_id ) ) {
			wp_die( esc_html__( 'Security check failed.', 'b-testimonials-block' ) );
		}

		if ( 'approve' === $action ) {
			wp_update_post(
				[
					'ID'          => $post_id,
					'post_status' => 'publish',
				]
			);
			wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=publish&msg=approved' ) );
			exit;
		} elseif ( 'reject' === $action ) {
			wp_trash_post( $post_id );
			wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=trash&msg=rejected' ) );
			exit;
		} elseif ( 'delete' === $action ) {
			wp_delete_post( $post_id, true );
			wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&msg=deleted' ) );
			exit;
		}
	}

	// Bulk Actions
	if ( isset( $_POST['bpbtb_bulk_action'] ) && isset( $_POST['post_ids'] ) && is_array( $_POST['post_ids'] ) ) {
		check_admin_referer( 'bpbtb_bulk_submissions_action', 'bpbtb_bulk_nonce' );

		$bulk_action = sanitize_key( wp_unslash( $_POST['bpbtb_bulk_action'] ) );
		$post_ids    = array_map( 'absint', wp_unslash( $_POST['post_ids'] ) );

		foreach ( $post_ids as $pid ) {
			if ( 'approve' === $bulk_action ) {
				wp_update_post( [ 'ID' => $pid, 'post_status' => 'publish' ] );
			} elseif ( 'trash' === $bulk_action ) {
				wp_trash_post( $pid );
			} elseif ( 'delete' === $bulk_action ) {
				wp_delete_post( $pid, true );
			}
		}

		wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&msg=bulk_updated' ) );
		exit;
	}
}
add_action( 'admin_init', 'bpbtb_handle_admin_submission_actions' );

/**
 * Render the Ultra-Modern Admin Submissions Dashboard Page.
 */
function bpbtb_render_admin_submissions_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$raw_status    = isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : 'pending';
	$status_filter = in_array( $raw_status, [ 'pending', 'publish', 'trash', 'all' ], true ) ? $raw_status : 'pending';

	$paged = isset( $_GET['paged'] ) ? absint( wp_unslash( $_GET['paged'] ) ) : 1;
	$args  = [
		'post_type'      => 'testimonial',
		'posts_per_page' => 20,
		'paged'          => $paged > 0 ? $paged : 1,
	];

	if ( 'all' === $status_filter ) {
		$args['post_status'] = [ 'pending', 'publish' ];
	} else {
		$args['post_status'] = $status_filter;
	}

	$query = new WP_Query( $args );

	$counts        = wp_count_posts( 'testimonial' );
	$pending_num   = isset( $counts->pending ) ? (int) $counts->pending : 0;
	$approved_num  = isset( $counts->publish ) ? (int) $counts->publish : 0;
	$trash_num     = isset( $counts->trash ) ? (int) $counts->trash : 0;
	$total_num     = $pending_num + $approved_num;
	?>

	<!-- Custom Modern Dashboard Styles -->
	<style>
		.bpbtb-admin-wrap {
			max-width: 1280px;
			margin: 24px 20px 40px 0;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		}

		/* Modern Hero Header Banner */
		.bpbtb-hero-banner {
			background: linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%);
			border-radius: 16px;
			padding: 28px 32px;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 10px 25px -5px rgba(49, 46, 129, 0.25);
			margin-bottom: 24px;
			position: relative;
			overflow: hidden;
		}

		.bpbtb-hero-banner::before {
			content: '';
			position: absolute;
			top: -50%;
			right: -10%;
			width: 300px;
			height: 300px;
			background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%);
			border-radius: 50%;
		}

		.bpbtb-hero-title {
			margin: 0 0 6px 0;
			font-size: 24px;
			font-weight: 800;
			color: #ffffff;
			letter-spacing: -0.5px;
			display: flex;
			align-items: center;
			gap: 10px;
		}

		.bpbtb-hero-desc {
			margin: 0;
			font-size: 14px;
			color: rgba(255, 255, 255, 0.8);
		}

		/* Stat Counter Pills */
		.bpbtb-hero-stats {
			display: flex;
			gap: 12px;
		}

		.bpbtb-stat-box {
			background: rgba(255, 255, 255, 0.12);
			backdrop-filter: blur(10px);
			border: 1px solid rgba(255, 255, 255, 0.18);
			border-radius: 12px;
			padding: 12px 20px;
			text-align: center;
			min-width: 90px;
		}

		.bpbtb-stat-num {
			font-size: 22px;
			font-weight: 800;
			color: #ffffff;
			line-height: 1.1;
		}

		.bpbtb-stat-label {
			font-size: 11px;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: rgba(255, 255, 255, 0.75);
			margin-top: 2px;
		}

		/* Navigation Tabs */
		.bpbtb-nav-toolbar {
			display: flex;
			align-items: center;
			justify-content: space-between;
			background: #ffffff;
			padding: 8px;
			border-radius: 12px;
			border: 1px solid #e2e8f0;
			box-shadow: 0 1px 3px rgba(0,0,0,0.04);
			margin-bottom: 20px;
			flex-wrap: wrap;
			gap: 12px;
		}

		.bpbtb-tabs {
			display: flex;
			gap: 6px;
		}

		.bpbtb-tab-link {
			padding: 8px 16px;
			border-radius: 8px;
			font-size: 13px;
			font-weight: 600;
			color: #64748b;
			text-decoration: none;
			transition: all 0.2s ease;
			display: flex;
			align-items: center;
			gap: 6px;
		}

		.bpbtb-tab-link:hover {
			color: #1e1b4b;
			background: #f1f5f9;
		}

		.bpbtb-tab-link.is-active {
			background: #4338ca;
			color: #ffffff;
		}

		.bpbtb-tab-count {
			background: rgba(0, 0, 0, 0.08);
			padding: 2px 7px;
			border-radius: 10px;
			font-size: 11px;
		}

		.bpbtb-tab-link.is-active .bpbtb-tab-count {
			background: rgba(255, 255, 255, 0.25);
			color: #ffffff;
		}

		/* Bulk Action Controls */
		.bpbtb-bulk-wrap {
			display: flex;
			align-items: center;
			gap: 8px;
		}

		.bpbtb-bulk-select {
			border-radius: 8px !important;
			border: 1px solid #cbd5e1 !important;
			padding: 4px 10px !important;
			font-size: 13px !important;
		}

		.bpbtb-apply-btn {
			border-radius: 8px !important;
			background: #f1f5f9 !important;
			border: 1px solid #cbd5e1 !important;
			color: #334155 !important;
			font-weight: 600 !important;
			padding: 4px 14px !important;
		}

		.bpbtb-apply-btn:hover {
			background: #e2e8f0 !important;
			color: #0f172a !important;
		}

		/* Modern Submissions Table */
		.bpbtb-modern-table-card {
			background: #ffffff;
			border-radius: 14px;
			border: 1px solid #e2e8f0;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
			overflow: hidden;
		}

		.bpbtb-modern-table {
			width: 100%;
			border-collapse: collapse;
			text-align: left;
		}

		.bpbtb-modern-table th {
			background: #f8fafc;
			padding: 14px 16px;
			font-size: 12px;
			font-weight: 700;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			color: #475569;
			border-bottom: 1px solid #e2e8f0;
		}

		.bpbtb-modern-table td {
			padding: 16px;
			border-bottom: 1px solid #f1f5f9;
			vertical-align: top;
			font-size: 13px;
			color: #334155;
		}

		.bpbtb-modern-table tr:last-child td {
			border-bottom: none;
		}

		.bpbtb-modern-table tr:hover td {
			background: #f8fafc;
		}

		/* User Avatar Photo */
		.bpbtb-avatar-box {
			width: 46px;
			height: 46px;
			border-radius: 50%;
			object-fit: cover;
			border: 2px solid #e2e8f0;
			box-shadow: 0 2px 4px rgba(0,0,0,0.06);
		}

		.bpbtb-avatar-placeholder {
			width: 46px;
			height: 46px;
			border-radius: 50%;
			background: linear-gradient(135deg, #6366f1, #4f46e5);
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 800;
			font-size: 17px;
			box-shadow: 0 2px 4px rgba(99, 102, 241, 0.25);
		}

		/* Status Badges */
		.bpbtb-badge-pending {
			background: #fef3c7;
			color: #d97706;
			font-size: 10px;
			font-weight: 700;
			padding: 2px 8px;
			border-radius: 12px;
			text-transform: uppercase;
			letter-spacing: 0.3px;
			display: inline-block;
			margin-left: 6px;
		}

		.bpbtb-badge-approved {
			background: #dcfce7;
			color: #15803d;
			font-size: 10px;
			font-weight: 700;
			padding: 2px 8px;
			border-radius: 12px;
			text-transform: uppercase;
			letter-spacing: 0.3px;
			display: inline-block;
		}

		/* Star Rating Stars */
		.bpbtb-stars-wrap {
			color: #f59e0b;
			font-size: 15px;
			letter-spacing: 2px;
		}

		/* Action Buttons */
		.bpbtb-action-approve {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			background: #16a34a;
			color: #ffffff !important;
			font-weight: 600;
			font-size: 12px;
			padding: 6px 14px;
			border-radius: 6px;
			text-decoration: none;
			transition: all 0.2s ease;
			border: none;
		}

		.bpbtb-action-approve:hover {
			background: #15803d;
			transform: translateY(-1px);
			box-shadow: 0 4px 10px rgba(22, 163, 74, 0.25);
		}

		.bpbtb-action-reject {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			background: #fee2e2;
			color: #dc2626 !important;
			font-weight: 600;
			font-size: 12px;
			padding: 6px 12px;
			border-radius: 6px;
			text-decoration: none;
			transition: all 0.2s ease;
			margin-left: 4px;
		}

		.bpbtb-action-reject:hover {
			background: #fca5a5;
			color: #991b1b !important;
		}

		.bpbtb-action-delete {
			color: #dc2626 !important;
			font-weight: 600;
			font-size: 12px;
			text-decoration: none;
		}

		.bpbtb-action-delete:hover {
			text-decoration: underline;
		}
	</style>

	<div class="bpbtb-admin-wrap">
		<!-- Hero Header Banner -->
		<div class="bpbtb-hero-banner">
			<div>
				<h2 class="bpbtb-hero-title">
					<span class="dashicons dashicons-feedback" style="font-size: 26px; width: 26px; height: 26px;"></span>
					<?php esc_html_e( 'Customer Submissions & Feedback', 'b-testimonials-block' ); ?>
				</h2>
				<p class="bpbtb-hero-desc">
					<?php esc_html_e( 'Review, approve, and manage customer reviews submitted from your website frontend.', 'b-testimonials-block' ); ?>
				</p>
			</div>

			<div class="bpbtb-hero-stats">
				<div class="bpbtb-stat-box">
					<div class="bpbtb-stat-num"><?php echo (int) $pending_num; ?></div>
					<div class="bpbtb-stat-label"><?php esc_html_e( 'Pending', 'b-testimonials-block' ); ?></div>
				</div>
				<div class="bpbtb-stat-box">
					<div class="bpbtb-stat-num"><?php echo (int) $approved_num; ?></div>
					<div class="bpbtb-stat-label"><?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?></div>
				</div>
				<div class="bpbtb-stat-box">
					<div class="bpbtb-stat-num"><?php echo (int) $total_num; ?></div>
					<div class="bpbtb-stat-label"><?php esc_html_e( 'Total', 'b-testimonials-block' ); ?></div>
				</div>
			</div>
		</div>

		<?php if ( isset( $_GET['msg'] ) ) : ?>
			<div class="notice notice-success is-dismissible" style="border-radius: 8px; margin-bottom: 20px;">
				<p>
					<?php
					$msg = sanitize_key( $_GET['msg'] );
					if ( 'approved' === $msg ) {
						esc_html_e( 'Testimonial submission approved and published successfully!', 'b-testimonials-block' );
					} elseif ( 'rejected' === $msg ) {
						esc_html_e( 'Submission moved to trash.', 'b-testimonials-block' );
					} elseif ( 'deleted' === $msg ) {
						esc_html_e( 'Submission permanently deleted.', 'b-testimonials-block' );
					} elseif ( 'bulk_updated' === $msg ) {
						esc_html_e( 'Bulk action completed successfully.', 'b-testimonials-block' );
					}
					?>
				</p>
			</div>
		<?php endif; ?>

		<form method="post" action="">
			<?php wp_nonce_field( 'bpbtb_bulk_submissions_action', 'bpbtb_bulk_nonce' ); ?>

			<!-- Navigation Toolbar -->
			<div class="bpbtb-nav-toolbar">
				<div class="bpbtb-tabs">
					<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=pending' ) ); ?>" class="bpbtb-tab-link <?php echo 'pending' === $status_filter ? 'is-active' : ''; ?>">
						<?php esc_html_e( 'Pending Review', 'b-testimonials-block' ); ?>
						<span class="bpbtb-tab-count"><?php echo (int) $pending_num; ?></span>
					</a>
					<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=publish' ) ); ?>" class="bpbtb-tab-link <?php echo 'publish' === $status_filter ? 'is-active' : ''; ?>">
						<?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?>
						<span class="bpbtb-tab-count"><?php echo (int) $approved_num; ?></span>
					</a>
					<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=all' ) ); ?>" class="bpbtb-tab-link <?php echo 'all' === $status_filter ? 'is-active' : ''; ?>">
						<?php esc_html_e( 'All Submissions', 'b-testimonials-block' ); ?>
						<span class="bpbtb-tab-count"><?php echo (int) $total_num; ?></span>
					</a>
					<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=trash' ) ); ?>" class="bpbtb-tab-link <?php echo 'trash' === $status_filter ? 'is-active' : ''; ?>">
						<?php esc_html_e( 'Trash', 'b-testimonials-block' ); ?>
						<span class="bpbtb-tab-count"><?php echo (int) $trash_num; ?></span>
					</a>
				</div>

				<div class="bpbtb-bulk-wrap">
					<select name="bpbtb_bulk_action" class="bpbtb-bulk-select">
						<option value=""><?php esc_html_e( 'Bulk Actions', 'b-testimonials-block' ); ?></option>
						<?php if ( 'trash' !== $status_filter ) : ?>
							<option value="approve"><?php esc_html_e( 'Approve & Publish', 'b-testimonials-block' ); ?></option>
							<option value="trash"><?php esc_html_e( 'Move to Trash', 'b-testimonials-block' ); ?></option>
						<?php else : ?>
							<option value="delete"><?php esc_html_e( 'Delete Permanently', 'b-testimonials-block' ); ?></option>
						<?php endif; ?>
					</select>
					<button type="submit" class="button bpbtb-apply-btn"><?php esc_html_e( 'Apply', 'b-testimonials-block' ); ?></button>
				</div>
			</div>

			<!-- Modern Table Card Container -->
			<div class="bpbtb-modern-table-card">
				<table class="bpbtb-modern-table">
					<thead>
						<tr>
							<th style="width: 36px;"><input type="checkbox" id="cb-select-all-1"></th>
							<th style="width: 64px;"><?php esc_html_e( 'Photo', 'b-testimonials-block' ); ?></th>
							<th><?php esc_html_e( 'Customer', 'b-testimonials-block' ); ?></th>
							<th style="width: 120px;"><?php esc_html_e( 'Rating', 'b-testimonials-block' ); ?></th>
							<th><?php esc_html_e( 'Designation / Email', 'b-testimonials-block' ); ?></th>
							<th><?php esc_html_e( 'Feedback Content', 'b-testimonials-block' ); ?></th>
							<th style="width: 140px;"><?php esc_html_e( 'Date', 'b-testimonials-block' ); ?></th>
							<th style="width: 170px; text-align: right;"><?php esc_html_e( 'Actions', 'b-testimonials-block' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php if ( $query->have_posts() ) : ?>
							<?php while ( $query->have_posts() ) : $query->the_post();
								$pid          = get_the_ID();
								$rating       = (int) get_post_meta( $pid, 'bpbtb_rating', true ) ?: 5;
								$designation  = (string) get_post_meta( $pid, 'bpbtb_designation', true );
								$company      = (string) get_post_meta( $pid, 'bpbtb_company', true );
								$email        = (string) get_post_meta( $pid, 'bpbtb_email', true );
								$thumb_url    = get_the_post_thumbnail_url( $pid, 'thumbnail' );
								$p_status     = get_post_status( $pid );
								$action_nonce = wp_create_nonce( 'bpbtb_submission_action_' . $pid );
								?>
								<tr>
									<td>
										<input type="checkbox" name="post_ids[]" value="<?php echo esc_attr( $pid ); ?>">
									</td>
									<td>
										<?php if ( $thumb_url ) : ?>
											<img src="<?php echo esc_url( $thumb_url ); ?>" class="bpbtb-avatar-box" alt="">
										<?php else : ?>
											<div class="bpbtb-avatar-placeholder">
												<?php echo esc_html( strtoupper( substr( get_the_title(), 0, 1 ) ) ); ?>
											</div>
										<?php endif; ?>
									</td>
									<td>
										<div style="font-weight: 700; color: #0f172a; font-size: 14px;">
											<a href="<?php echo esc_url( get_edit_post_link( $pid ) ); ?>" style="text-decoration: none; color: #0f172a;"><?php the_title(); ?></a>
										</div>
										<?php if ( 'pending' === $p_status ) : ?>
											<span class="bpbtb-badge-pending"><?php esc_html_e( 'Pending Review', 'b-testimonials-block' ); ?></span>
										<?php elseif ( 'publish' === $p_status ) : ?>
											<span class="bpbtb-badge-approved"><?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?></span>
										<?php endif; ?>
									</td>
									<td>
										<div class="bpbtb-stars-wrap">
											<?php echo esc_html( str_repeat( '★', max( 1, min( 5, $rating ) ) ) ); ?>
										</div>
									</td>
									<td>
										<?php if ( $designation || $company ) : ?>
											<div style="font-weight: 600; color: #334155;"><?php echo esc_html( trim( $designation . ( $company ? ' (' . $company . ')' : '' ) ) ); ?></div>
										<?php endif; ?>
										<?php if ( $email ) : ?>
											<div style="font-size: 12px; color: #64748b; margin-top: 2px;"><?php echo esc_html( $email ); ?></div>
										<?php endif; ?>
									</td>
									<td>
										<div style="max-height: 75px; overflow: hidden; color: #475569; line-height: 1.45;">
											<?php the_content(); ?>
										</div>
									</td>
									<td style="color: #64748b; font-size: 12px;">
										<?php echo esc_html( get_the_date( 'M j, Y' ) ); ?>
										<div style="font-size: 11px; color: #94a3b8;"><?php echo esc_html( get_the_date( 'g:i a' ) ); ?></div>
									</td>
									<td style="text-align: right;">
										<?php if ( 'publish' !== $p_status && 'trash' !== $p_status ) : ?>
											<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=approve&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-action-approve">
												✓ <?php esc_html_e( 'Approve', 'b-testimonials-block' ); ?>
											</a>
											<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=reject&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-action-reject">
												&times; <?php esc_html_e( 'Reject', 'b-testimonials-block' ); ?>
											</a>
										<?php elseif ( 'trash' === $p_status ) : ?>
											<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=delete&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-action-delete">
												<?php esc_html_e( 'Delete Permanently', 'b-testimonials-block' ); ?>
											</a>
										<?php else : ?>
											<span class="bpbtb-badge-approved"><?php esc_html_e( '✓ Published', 'b-testimonials-block' ); ?></span>
										<?php endif; ?>
									</td>
								</tr>
							<?php endwhile; ?>
							<?php wp_reset_postdata(); ?>
						<?php else : ?>
							<tr>
								<td colspan="8" style="padding: 40px; text-align: center; color: #64748b;">
									<div className="dashicons dashicons-testimonial" style="font-size: 36px; width: 36px; height: 36px; color: #cbd5e1; margin-bottom: 8px;"></div>
									<div style="font-size: 15px; font-weight: 600; color: #334155;"><?php esc_html_e( 'No customer submissions found.', 'b-testimonials-block' ); ?></div>
									<div style="font-size: 13px; color: #94a3b8; margin-top: 4px;"><?php esc_html_e( 'Submissions received from frontend form blocks will show up here.', 'b-testimonials-block' ); ?></div>
								</td>
							</tr>
						<?php endif; ?>
					</tbody>
				</table>
			</div>
		</form>
	</div>
	<?php
}
