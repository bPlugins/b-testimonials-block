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
		<?php // Square and flat: the plugin's own screens are, and wp-admin's notices are too, so the rounded corners this used to carry only ever singled it out. ?>
		<div class="notice notice-warning is-dismissible" style="border-left-color: #0b81ee; padding: 12px 16px;">
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
				<a href="<?php echo esc_url( $url ); ?>" class="button button-primary" style="background: #0b81ee; border-color: #0b81ee; border-radius: 0; font-weight: 600;">
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
	/*
	 * The page's own labels, so the hero, the count line and the empty state all
	 * name the same filter rather than each inventing a phrase for it.
	 */
	$btb_tabs = [
		'pending' => [
			'label'  => __( 'Pending Review', 'b-testimonials-block' ),
			'count'  => $pending_num,
			'accent' => '#d97706',
		],
		'publish' => [
			'label'  => __( 'Approved', 'b-testimonials-block' ),
			'count'  => $approved_num,
			'accent' => '#10b981',
		],
		'all'     => [
			'label'  => __( 'All Submissions', 'b-testimonials-block' ),
			'count'  => $total_num,
			'accent' => '#3b82f6',
		],
		'trash'   => [
			'label'  => __( 'Trash', 'b-testimonials-block' ),
			'count'  => $trash_num,
			'accent' => '#e11d48',
		],
	];

	$btb_shown = $query->post_count;
	?>

	<div class="bpbtb-admin-page">

		<div class="bpbtb-admin-main">
			<div class="bpbtb-admin-wrap">
				<?php
				// phpcs:ignore WordPress.Security.NonceVerification.Recommended
				if ( isset( $_GET['msg'] ) ) :
					?>
					<div class="notice notice-success is-dismissible">
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

				<header class="bpbtb-hero">
					<span class="bpbtb-eyebrow"><?php esc_html_e( 'Submissions', 'b-testimonials-block' ); ?></span>
					<h1><?php esc_html_e( 'Customer submissions & feedback', 'b-testimonials-block' ); ?></h1>
					<p><?php esc_html_e( 'Review, approve, and manage customer reviews submitted from your website frontend.', 'b-testimonials-block' ); ?></p>
				</header>

				<div class="bpbtb-stats-row">
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo (int) $pending_num; ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Pending', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo (int) $approved_num; ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo (int) $trash_num; ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'In Trash', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo (int) $total_num; ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Total', 'b-testimonials-block' ); ?></div>
					</div>
				</div>

				<form method="post" action="">
					<?php wp_nonce_field( 'bpbtb_bulk_submissions_action', 'bpbtb_bulk_nonce' ); ?>

					<div class="bpbtb-nav-toolbar">
						<div class="bpbtb-tabs">
							<?php foreach ( $btb_tabs as $btb_slug => $btb_tab ) : ?>
								<a
									href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&status=' . $btb_slug ) ); ?>"
									class="bpbtb-tab-link<?php echo $btb_slug === $status_filter ? ' is-active' : ''; ?>"
									style="--accent: <?php echo esc_attr( $btb_tab['accent'] ); ?>;"
								>
									<?php echo esc_html( $btb_tab['label'] ); ?>
									<span class="bpbtb-tab-count"><?php echo (int) $btb_tab['count']; ?></span>
								</a>
							<?php endforeach; ?>
						</div>

						<div class="bpbtb-bulk-wrap">
							<select name="bpbtb_bulk_action">
								<option value=""><?php esc_html_e( 'Bulk Actions', 'b-testimonials-block' ); ?></option>
								<?php if ( 'trash' !== $status_filter ) : ?>
									<option value="approve"><?php esc_html_e( 'Approve & Publish', 'b-testimonials-block' ); ?></option>
									<option value="trash"><?php esc_html_e( 'Move to Trash', 'b-testimonials-block' ); ?></option>
								<?php else : ?>
									<option value="delete"><?php esc_html_e( 'Delete Permanently', 'b-testimonials-block' ); ?></option>
								<?php endif; ?>
							</select>
							<button type="submit" class="bpbtb-btn is-ghost"><?php esc_html_e( 'Apply', 'b-testimonials-block' ); ?></button>
						</div>
					</div>

					<?php // Mirrors the Demos page's line under its toolbar: what the filter above currently adds up to. ?>
					<p class="bpbtb-count">
						<?php
						printf(
							/* translators: 1: number of submissions on this page, 2: name of the active filter. */
							esc_html( _n( '%1$s submission in %2$s', '%1$s submissions in %2$s', $btb_shown, 'b-testimonials-block' ) ),
							'<strong>' . esc_html( number_format_i18n( $btb_shown ) ) . '</strong>',
							esc_html( $btb_tabs[ $status_filter ]['label'] )
						);
						?>
					</p>

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
									<th style="width: 190px; text-align: right;"><?php esc_html_e( 'Actions', 'b-testimonials-block' ); ?></th>
								</tr>
							</thead>
							<tbody>
								<?php if ( $query->have_posts() ) : ?>
									<?php
									while ( $query->have_posts() ) :
										$query->the_post();
										$pid          = get_the_ID();
										$rating       = (float) get_post_meta( $pid, 'bpbtb_rating', true ) ?: 5;
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
												<div class="bpbtb-cell-title">
													<a href="<?php echo esc_url( get_edit_post_link( $pid ) ); ?>"><?php the_title(); ?></a>
												</div>
												<?php if ( 'pending' === $p_status ) : ?>
													<span class="bpbtb-badge bpbtb-badge-pending"><?php esc_html_e( 'Pending Review', 'b-testimonials-block' ); ?></span>
												<?php elseif ( 'publish' === $p_status ) : ?>
													<span class="bpbtb-badge bpbtb-badge-approved"><?php esc_html_e( 'Approved', 'b-testimonials-block' ); ?></span>
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
													<div class="bpbtb-cell-strong"><?php echo esc_html( trim( $designation . ( $company ? ' (' . $company . ')' : '' ) ) ); ?></div>
												<?php endif; ?>
												<?php if ( $email ) : ?>
													<div class="bpbtb-cell-sub"><?php echo esc_html( $email ); ?></div>
												<?php endif; ?>
											</td>
											<td data-label="<?php esc_attr_e( 'Feedback Content', 'b-testimonials-block' ); ?>">
												<div class="bpbtb-cell-body">
													<?php the_content(); ?>
												</div>
											</td>
											<td data-label="<?php esc_attr_e( 'Date', 'b-testimonials-block' ); ?>" class="bpbtb-cell-meta">
												<?php echo esc_html( get_the_date( 'M j, Y' ) ); ?>
												<div class="bpbtb-cell-sub"><?php echo esc_html( get_the_date( 'g:i a' ) ); ?></div>
											</td>
											<td data-label="<?php esc_attr_e( 'Actions', 'b-testimonials-block' ); ?>" class="bpbtb-cell-actions">
												<?php if ( 'publish' !== $p_status && 'trash' !== $p_status ) : ?>
													<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=approve&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-row-action is-approve">
														<?php esc_html_e( 'Approve', 'b-testimonials-block' ); ?>
													</a>
													<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=reject&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-row-action is-reject">
														<?php esc_html_e( 'Reject', 'b-testimonials-block' ); ?>
													</a>
												<?php elseif ( 'trash' === $p_status ) : ?>
													<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-submissions&action=delete&post_id=' . $pid . '&_wpnonce=' . $action_nonce ) ); ?>" class="bpbtb-row-action is-delete">
														<?php esc_html_e( 'Delete Permanently', 'b-testimonials-block' ); ?>
													</a>
												<?php else : ?>
													<span class="bpbtb-badge bpbtb-badge-approved"><?php esc_html_e( 'Published', 'b-testimonials-block' ); ?></span>
												<?php endif; ?>
											</td>
										</tr>
									<?php endwhile; ?>
									<?php wp_reset_postdata(); ?>
								<?php else : ?>
									<tr>
										<td colspan="8">
											<div class="bpbtb-empty">
												<span class="dashicons dashicons-testimonial"></span>
												<h3><?php esc_html_e( 'No customer submissions found.', 'b-testimonials-block' ); ?></h3>
												<p><?php esc_html_e( 'Submissions received from frontend form blocks will show up here.', 'b-testimonials-block' ); ?></p>
											</div>
										</td>
									</tr>
								<?php endif; ?>
							</tbody>
						</table>
					</div>
				</form>
			</div>
		</div>
	</div>
	<?php
}
}
