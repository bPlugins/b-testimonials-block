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
if ( ! function_exists( 'bpbtb_get_pending_submissions_count' ) ) {
function bpbtb_get_pending_submissions_count() {
	$count_posts = wp_count_posts( 'testimonial' );
	return isset( $count_posts->pending ) ? (int) $count_posts->pending : 0;
}
}

/**
 * Add "Submissions" submenu item under Testimonials in the WP admin menu.
 */
if ( ! function_exists( 'bpbtb_register_admin_submissions_menu' ) ) {
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
}
add_action( 'admin_menu', 'bpbtb_register_admin_submissions_menu' );

/**
 * Display top dashboard notice when there are pending customer submissions.
 */
if ( ! function_exists( 'bpbtb_pending_submissions_notice' ) ) {
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
		<div class="notice notice-warning is-dismissible" style="border-left-color: #146ef5; padding: 12px 16px; border-radius: 8px;">
			<p style="margin: 0; font-size: 14px; display: flex; align-items: center; justify-content: space-between;">
				<span>
					<strong style="color: #0f57c4;"><?php esc_html_e( 'B Testimonials Block:', 'b-testimonials-block' ); ?></strong>
					<?php
					printf(
						/* translators: %d: number of pending submissions */
						esc_html( _n( 'You have %d pending customer submission awaiting review.', 'You have %d pending customer submissions awaiting review.', $pending_count, 'b-testimonials-block' ) ),
						(int) $pending_count
					);
					?>
				</span>
				<a href="<?php echo esc_url( $url ); ?>" class="button button-primary" style="background: linear-gradient(135deg, #146ef5, #0f57c4); border: none; border-radius: 6px; font-weight: 600;">
					<?php esc_html_e( 'View Submissions', 'b-testimonials-block' ); ?> &rarr;
				</a>
			</p>
		</div>
		<?php
	}
}
}
add_action( 'admin_notices', 'bpbtb_pending_submissions_notice' );

/**
 * Handle submission action GET requests (Approve, Trash, Delete).
 */
if ( ! function_exists( 'bpbtb_handle_admin_submission_actions' ) ) {
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
}
add_action( 'admin_init', 'bpbtb_handle_admin_submission_actions' );

/**
 * Render the Ultra-Modern Admin Submissions Dashboard Page.
 */
if ( ! function_exists( 'bpbtb_render_admin_submissions_page' ) ) {
function bpbtb_render_admin_submissions_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$raw_status    = isset( $_GET['status'] ) ? sanitize_key( wp_unslash( $_GET['status'] ) ) : 'pending';
	$status_filter = in_array( $raw_status, [ 'pending', 'publish', 'trash', 'all' ], true ) ? $raw_status : 'pending';

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
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
			background: linear-gradient(135deg, #1b2d4b 0%, #2e4d7f 40%, #146ef5 100%);
			border-radius: 16px;
			padding: 28px 32px;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 10px 25px -5px rgba(20, 110, 245, 0.25);
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
			color: #1b2d4b;
			background: #f1f5f9;
		}

		.bpbtb-tab-link.is-active {
			background: #146ef5;
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
			background: linear-gradient(135deg, #4d90f8, #146ef5);
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: center;
			font-weight: 800;
			font-size: 17px;
			box-shadow: 0 2px 4px rgba(20, 110, 245, 0.25);
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

		/* ---------------------------------------------------------------
		   Responsive.

		   This page had no media queries at all, so nothing here ever gave
		   way: the hero kept its stat pills beside the title, the toolbar
		   kept four tabs and the bulk controls on one line, and the table
		   kept all eight columns. Measured at 380px the page was 498px
		   wide -- the stats alone hung 279px past the edge, and the last
		   four table columns were simply unreachable.

		   WordPress collapses its own admin menu at 960px and switches to
		   touch sizing at 782px, so those are the two points used below
		   rather than inventing new ones.
		   --------------------------------------------------------------- */

		@media screen and (max-width: 960px) {
			.bpbtb-hero-banner {
				flex-direction: column;
				align-items: flex-start;
				gap: 20px;
				padding: 24px;
			}

			/* The pills share the full width once they are on their own row
			   instead of keeping their 90px minimum and overflowing. */
			.bpbtb-hero-stats {
				width: 100%;
			}

			.bpbtb-stat-box {
				flex: 1;
				min-width: 0;
			}

			/* Full column set kept here -- the card scrolls sideways on its
			   own so the page itself never does. */
			.bpbtb-modern-table-card {
				overflow-x: auto;
			}

			.bpbtb-modern-table {
				min-width: 860px;
			}
		}

		@media screen and (max-width: 782px) {
			.bpbtb-admin-wrap {
				margin-top: 12px;
				padding: 0 12px;
			}

			.bpbtb-hero-title {
				font-size: 19px;
			}

			.bpbtb-nav-toolbar {
				align-items: stretch;
			}

			.bpbtb-tabs {
				flex-wrap: wrap;
			}

			.bpbtb-tab-link {
				flex: 1 0 auto;
				justify-content: center;
			}

			.bpbtb-bulk-wrap {
				width: 100%;
			}

			.bpbtb-bulk-select {
				flex: 1;
				min-width: 0;
			}

			/* Eight columns cannot be read side by side on a phone, so each
			   row becomes a card and every cell names itself from its
			   `data-label`. This is what core does for `.wp-list-table`,
			   which this table is not, so it is spelled out here. */
			.bpbtb-modern-table,
			.bpbtb-modern-table tbody,
			.bpbtb-modern-table tr,
			.bpbtb-modern-table td {
				display: block;
				width: auto;
				box-sizing: border-box;
			}

			.bpbtb-modern-table {
				min-width: 0;
			}

			.bpbtb-modern-table thead {
				display: none;
			}

			/* `overflow` contains the floated checkbox and avatar below. */
			.bpbtb-modern-table tr {
				overflow: hidden;
				border-bottom: 1px solid #e2e8f0;
				padding: 10px 4px 16px;
			}

			.bpbtb-modern-table tr:last-child {
				border-bottom: none;
			}

			.bpbtb-modern-table td {
				border-bottom: none;
				padding: 6px 16px;
				text-align: left !important;
			}

			/* Everything with a heading starts a fresh line under the
			   floated checkbox and avatar rather than wrapping around them. */
			.bpbtb-modern-table td[data-label] {
				clear: both;
			}

			.bpbtb-modern-table td[data-label]::before {
				content: attr(data-label);
				display: block;
				margin-bottom: 3px;
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: #94a3b8;
			}

			/* Cells the row has no data for carry no label, so they are not
			   worth a blank line of their own. */
			.bpbtb-modern-table td:not([data-label]):not([colspan]):not(.bpbtb-cell-check):not(.bpbtb-cell-photo):not(.bpbtb-cell-name) {
				display: none;
			}

			/* Checkbox and avatar read as part of the name, not as two more
			   labelled rows above it. */
			.bpbtb-modern-table td.bpbtb-cell-check,
			.bpbtb-modern-table td.bpbtb-cell-photo {
				float: left;
				width: auto;
				padding: 6px 10px 6px 16px;
			}

			.bpbtb-modern-table td.bpbtb-cell-check {
				padding-top: 22px;
			}

			.bpbtb-modern-table td.bpbtb-cell-name {
				overflow: hidden;
				padding-top: 14px;
			}

			.bpbtb-action-approve,
			.bpbtb-action-reject {
				margin: 2px 4px 2px 0;
			}
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

		<?php
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		if ( isset( $_GET['msg'] ) ) :
		?>
			<div class="notice notice-success is-dismissible" style="border-radius: 8px; margin-bottom: 20px;">
				<p>
					<?php
					// phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$msg = sanitize_key( wp_unslash( $_GET['msg'] ) );
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
									<td class="bpbtb-cell-check">
										<input type="checkbox" name="post_ids[]" value="<?php echo esc_attr( $pid ); ?>">
									</td>
									<td class="bpbtb-cell-photo">
										<?php if ( $thumb_url ) : ?>
											<img src="<?php echo esc_url( $thumb_url ); ?>" class="bpbtb-avatar-box" alt="">
										<?php else : ?>
											<div class="bpbtb-avatar-placeholder">
												<?php echo esc_html( strtoupper( substr( get_the_title(), 0, 1 ) ) ); ?>
											</div>
										<?php endif; ?>
									</td>
									<td class="bpbtb-cell-name">
										<div style="font-weight: 700; color: #0f172a; font-size: 14px;">
											<a href="<?php echo esc_url( get_edit_post_link( $pid ) ); ?>" style="text-decoration: none; color: #0f172a;"><?php the_title(); ?></a>
										</div>
										<?php if ( 'pending' === $p_status ) : ?>
											<span class="bpbtb-badge-pending"><?php esc_html_e( 'Pending Review', 'b-testimonials-block' ); ?></span>
										<?php elseif ( 'publish' === $p_status ) : ?>
											<span class="bpbtb-badge-approved"><?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?></span>
										<?php endif; ?>
									</td>
									<td data-label="<?php esc_attr_e( 'Rating', 'b-testimonials-block' ); ?>">
										<div class="bpbtb-stars-wrap">
											<?php echo esc_html( str_repeat( '★', max( 1, min( 5, $rating ) ) ) ); ?>
										</div>
									</td>
									<?php // No label when the row has neither, so the stacked card skips the cell entirely. ?>
									<td <?php echo ( $designation || $company || $email ) ? 'data-label="' . esc_attr__( 'Designation / Email', 'b-testimonials-block' ) . '"' : ''; ?>>
										<?php if ( $designation || $company ) : ?>
											<div style="font-weight: 600; color: #334155;"><?php echo esc_html( trim( $designation . ( $company ? ' (' . $company . ')' : '' ) ) ); ?></div>
										<?php endif; ?>
										<?php if ( $email ) : ?>
											<div style="font-size: 12px; color: #64748b; margin-top: 2px;"><?php echo esc_html( $email ); ?></div>
										<?php endif; ?>
									</td>
									<td data-label="<?php esc_attr_e( 'Feedback Content', 'b-testimonials-block' ); ?>">
										<div style="max-height: 75px; overflow: hidden; color: #475569; line-height: 1.45;">
											<?php the_content(); ?>
										</div>
									</td>
									<td data-label="<?php esc_attr_e( 'Date', 'b-testimonials-block' ); ?>" style="color: #64748b; font-size: 12px;">
										<?php echo esc_html( get_the_date( 'M j, Y' ) ); ?>
										<div style="font-size: 11px; color: #94a3b8;"><?php echo esc_html( get_the_date( 'g:i a' ) ); ?></div>
									</td>
									<td data-label="<?php esc_attr_e( 'Actions', 'b-testimonials-block' ); ?>" style="text-align: right;">
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
}
