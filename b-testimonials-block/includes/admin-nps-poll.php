<?php
/**
 * Admin Management & REST Endpoint for Feedback & NPS Poll.
 *
 * Provides REST API submission handling for NPS poll votes and an
 * Admin Submenu dashboard page under Testimonials -> Feedback & NPS Poll.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register REST API route for NPS Poll submissions.
 */
if ( ! function_exists( 'bpbtb_register_nps_poll_route' ) ) {
function bpbtb_register_nps_poll_route() {
	register_rest_route(
		'bptmb/v1',
		'/submit-nps',
		[
			'methods'             => 'POST',
			'callback'            => 'bpbtb_handle_nps_poll_submit',
			'permission_callback' => '__return_true', // Public poll.
		]
	);
}
}
add_action( 'rest_api_init', 'bpbtb_register_nps_poll_route' );

/**
 * Get all saved NPS poll votes.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_get_nps_poll_votes' ) ) {
function bpbtb_get_nps_poll_votes() {
	$votes = get_option( 'bpbtb_nps_poll_votes', [] );
	return is_array( $votes ) ? $votes : [];
}
}

/**
 * Calculate NPS poll analytics.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_get_nps_poll_stats' ) ) {
function bpbtb_get_nps_poll_stats() {
	$votes = bpbtb_get_nps_poll_votes();
	$total = count( $votes );

	$max_mark = 10;
	foreach ( $votes as $v ) {
		if ( isset( $v['mark'] ) && (int) $v['mark'] > $max_mark ) {
			$max_mark = (int) $v['mark'];
		}
	}

	$counts = array_fill( 0, $max_mark + 1, 0 );
	$sum    = 0;

	$promoters  = 0;
	$passives   = 0;
	$detractors = 0;

	foreach ( $votes as $vote ) {
		$mark = isset( $vote['mark'] ) ? max( 0, (int) $vote['mark'] ) : 0;
		if ( isset( $counts[ $mark ] ) ) {
			$counts[ $mark ]++;
		} else {
			$counts[ $mark ] = 1;
		}
		$sum += $mark;

		if ( $mark >= 9 ) {
			$promoters++;
		} elseif ( $mark >= 7 ) {
			$passives++;
		} else {
			$detractors++;
		}
	}

	$avg = $total > 0 ? round( $sum / $total, 1 ) : 0;

	$promoter_pct  = $total > 0 ? round( ( $promoters / $total ) * 100 ) : 0;
	$detractor_pct = $total > 0 ? round( ( $detractors / $total ) * 100 ) : 0;
	$passive_pct   = $total > 0 ? round( ( $passives / $total ) * 100 ) : 0;
	$nps_score     = $promoter_pct - $detractor_pct;

	return [
		'total'         => $total,
		'max_mark'      => $max_mark,
		'counts'        => $counts,
		'avg'           => $avg,
		'promoters'     => $promoters,
		'passives'      => $passives,
		'detractors'    => $detractors,
		'promoter_pct'  => $promoter_pct,
		'passive_pct'   => $passive_pct,
		'detractor_pct' => $detractor_pct,
		'nps_score'     => $nps_score,
	];
}
}

/**
 * Handle REST API submission for NPS Poll.
 *
 * @param WP_REST_Request $request
 * @return WP_REST_Response
 */
if ( ! function_exists( 'bpbtb_handle_nps_poll_submit' ) ) {
function bpbtb_handle_nps_poll_submit( $request ) {
	$params = $request->get_params();

	if ( ! isset( $params['mark'] ) ) {
		return new WP_REST_Response(
			[
				'success' => false,
				'message' => __( 'No mark selected.', 'b-testimonials-block' ),
			],
			400
		);
	}

	$mark      = min( 10, max( 0, (int) $params['mark'] ) );
	$page_url  = isset( $params['page_url'] ) ? esc_url_raw( $params['page_url'] ) : '';
	$page_title = isset( $params['page_title'] ) ? sanitize_text_field( $params['page_title'] ) : '';

	$votes = bpbtb_get_nps_poll_votes();

	$new_vote = [
		'id'         => uniqid( 'nps_' ),
		'mark'       => $mark,
		'page_url'   => $page_url,
		'page_title' => $page_title,
		'date'       => current_time( 'mysql' ),
		'user_ip'    => isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '',
	];

	array_unshift( $votes, $new_vote );
	update_option( 'bpbtb_nps_poll_votes', array_slice( $votes, 0, 5000 ) );

	return new WP_REST_Response(
		[
			'success' => true,
			/* translators: %d: rating score selected by user */
			'message' => sprintf( __( 'Thank you for your feedback! You selected mark %d.', 'b-testimonials-block' ), $mark ),
			'mark'    => $mark,
		],
		200
	);
}
}

/**
 * Register "Feedback & NPS Poll" admin submenu under Testimonials.
 */
if ( ! function_exists( 'bpbtb_register_nps_poll_admin_menu' ) ) {
function bpbtb_register_nps_poll_admin_menu() {
	$stats = bpbtb_get_nps_poll_stats();
	$badge = '';

	if ( $stats['total'] > 0 ) {
		$badge = sprintf(
			' <span class="awaiting-mod count-%1$d"><span class="pending-count">%1$d</span></span>',
			$stats['total']
		);
	}

	add_submenu_page(
		'edit.php?post_type=testimonial',
		__( 'Feedback & NPS Poll', 'b-testimonials-block' ),
		__( 'Feedback & NPS Poll', 'b-testimonials-block' ) . $badge,
		'manage_options',
		'bpbtb-nps-poll',
		'bpbtb_render_nps_poll_admin_page'
	);
}
}
add_action( 'admin_menu', 'bpbtb_register_nps_poll_admin_menu' );

/**
 * Handle Admin Actions (Delete entry, Clear all).
 */
if ( ! function_exists( 'bpbtb_handle_nps_poll_admin_actions' ) ) {
function bpbtb_handle_nps_poll_admin_actions() {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';
	if ( 'bpbtb-nps-poll' !== $page || ! current_user_can( 'manage_options' ) ) {
		return;
	}

	if ( isset( $_GET['action'] ) && isset( $_GET['_wpnonce'] ) ) {
		$action = sanitize_key( wp_unslash( $_GET['action'] ) );
		$nonce  = sanitize_text_field( wp_unslash( $_GET['_wpnonce'] ) );

		if ( 'delete_vote' === $action && isset( $_GET['vote_id'] ) ) {
			$vote_id = sanitize_key( wp_unslash( $_GET['vote_id'] ) );
			if ( wp_verify_nonce( $nonce, 'bpbtb_delete_nps_vote_' . $vote_id ) ) {
				$votes = bpbtb_get_nps_poll_votes();
				$votes = array_filter( $votes, function( $v ) use ( $vote_id ) {
					return isset( $v['id'] ) && $v['id'] !== $vote_id;
				} );
				update_option( 'bpbtb_nps_poll_votes', array_values( $votes ) );
				wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&msg=deleted' ) );
				exit;
			}
		} elseif ( 'clear_all' === $action ) {
			if ( wp_verify_nonce( $nonce, 'bpbtb_clear_all_nps_votes' ) ) {
				update_option( 'bpbtb_nps_poll_votes', [] );
				wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&msg=cleared' ) );
				exit;
			}
		}
	}
}
}
add_action( 'admin_init', 'bpbtb_handle_nps_poll_admin_actions' );

/**
 * Render Feedback & NPS Poll Admin Dashboard Page.
 */
if ( ! function_exists( 'bpbtb_render_nps_poll_admin_page' ) ) {
function bpbtb_render_nps_poll_admin_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$stats = bpbtb_get_nps_poll_stats();
	$votes = bpbtb_get_nps_poll_votes();

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$msg = isset( $_GET['msg'] ) ? sanitize_key( wp_unslash( $_GET['msg'] ) ) : '';
	?>
	<style>
		.bpbtb-nps-wrap {
			max-width: 1280px;
			margin: 24px 20px 40px 0;
			font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		}

		.bpbtb-nps-hero {
			background: linear-gradient(135deg, #1b2d4b 0%, #2e4d7f 40%, #146ef5 100%);
			border-radius: 16px;
			padding: 28px 32px;
			color: #ffffff;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-shadow: 0 10px 25px -5px rgba(20, 110, 245, 0.25);
			margin-bottom: 24px;
		}

		.bpbtb-nps-hero-title {
			margin: 0 0 6px 0;
			font-size: 24px;
			font-weight: 800;
			color: #ffffff;
			display: flex;
			align-items: center;
			gap: 10px;
		}

		.bpbtb-nps-hero-desc {
			margin: 0;
			font-size: 14px;
			color: rgba(255, 255, 255, 0.8);
		}

		/* `auto-fit` rather than a hard `repeat(4, 1fr)`: four fixed columns
		   forced each card down to ~70px inside a phone-width admin area and
		   pushed the last two off the screen. This drops to 2 columns and
		   then 1 on its own, with no breakpoint to keep in sync. */
		.bpbtb-nps-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
			gap: 16px;
			margin-bottom: 24px;
		}

		.bpbtb-nps-card {
			background: #ffffff;
			border: 1px solid #e2e8f0;
			border-radius: 14px;
			padding: 20px 24px;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
			text-align: center;
		}

		.bpbtb-nps-card .nps-val {
			font-size: 32px;
			font-weight: 800;
			color: #146ef5;
			margin: 4px 0;
		}

		.bpbtb-nps-card .nps-lbl {
			font-size: 13px;
			font-weight: 600;
			color: #64748b;
		}

		.bpbtb-nps-marks-box {
			background: #ffffff;
			border: 1px solid #e2e8f0;
			border-radius: 16px;
			padding: 28px;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
			margin-bottom: 28px;
		}

		.bpbtb-nps-marks-box h3 {
			margin: 0 0 8px 0;
			font-size: 18px;
			font-weight: 700;
			color: #1e293b;
		}

		.bpbtb-nps-marks-box p {
			margin: 0 0 20px 0;
			font-size: 13px;
			color: #64748b;
		}

		.bpbtb-marks-list {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		.bpbtb-mark-row {
			display: flex;
			align-items: center;
			gap: 14px;
			font-size: 13px;
		}

		.bpbtb-mark-badge {
			width: 64px;
			font-weight: 700;
			color: #1e293b;
			display: flex;
			align-items: center;
			gap: 6px;
		}

		.bpbtb-mark-pill {
			width: 28px;
			height: 28px;
			border-radius: 6px;
			background: #146ef5;
			color: #ffffff;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			font-weight: 700;
			font-size: 13px;
		}

		.bpbtb-mark-track {
			flex: 1;
			height: 12px;
			background: #f1f5f9;
			border-radius: 6px;
			overflow: hidden;
		}

		.bpbtb-mark-fill {
			height: 100%;
			border-radius: 6px;
			transition: width 0.4s ease;
		}

		.bpbtb-mark-fill.promoter { background: #10b981; }
		.bpbtb-mark-fill.passive { background: #f59e0b; }
		.bpbtb-mark-fill.detractor { background: #ef4444; }

		.bpbtb-mark-count {
			width: 90px;
			text-align: right;
			font-weight: 600;
			color: #475569;
		}

		.bpbtb-nps-table-card {
			background: #ffffff;
			border: 1px solid #e2e8f0;
			border-radius: 16px;
			padding: 24px;
			box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
		}

		.bpbtb-table-hdr {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 16px;
		}

		.bpbtb-table-hdr h3 {
			margin: 0;
			font-size: 18px;
			font-weight: 700;
			color: #1e293b;
		}

		/* ---------------------------------------------------------------
		   Responsive.

		   Same story as the Submissions page: no media queries at all, so
		   at 380px this page was 495px wide with the last two stat cards
		   off the edge. The 960px and 782px points below are the ones
		   WordPress already uses for the admin menu and touch sizing.
		   --------------------------------------------------------------- */

		@media screen and (max-width: 960px) {
			.bpbtb-nps-hero {
				flex-direction: column;
				align-items: flex-start;
				gap: 16px;
				padding: 24px;
			}
		}

		@media screen and (max-width: 782px) {
			.bpbtb-nps-wrap {
				margin-top: 12px;
				padding: 0 12px;
			}

			.bpbtb-nps-hero-title {
				font-size: 20px;
			}

			.bpbtb-nps-marks-box,
			.bpbtb-nps-table-card {
				padding: 20px 16px;
			}

			/* The vote count moves under its bar; keeping it in the row left
			   the bar about 40px wide and unreadable. */
			.bpbtb-mark-row {
				flex-wrap: wrap;
				gap: 8px 12px;
			}

			.bpbtb-mark-badge {
				width: auto;
			}

			.bpbtb-mark-track {
				flex: 1 1 120px;
			}

			.bpbtb-mark-count {
				width: auto;
				text-align: left;
				font-size: 12px;
			}

			/* Stacked cards, one labelled line per column.

			   Core's own mobile list-table rules hide every column after
			   `.column-primary` behind an expand toggle. This table has no
			   primary column and no toggle button, so core would leave five
			   columns fighting over a phone's width; these rules take the
			   layout over completely instead. */
			.bpbtb-nps-log-table,
			.bpbtb-nps-log-table tbody,
			.bpbtb-nps-log-table tr,
			.bpbtb-nps-log-table td {
				display: block;
				width: auto;
			}

			.bpbtb-nps-log-table thead {
				display: none;
			}

			.bpbtb-nps-log-table tr {
				padding: 10px 0;
				border-bottom: 1px solid #e2e8f0;
			}

			.bpbtb-nps-log-table tr:last-child {
				border-bottom: none;
			}

			.bpbtb-nps-log-table td {
				padding: 5px 12px !important;
				text-align: left !important;
				border: none;
			}

			.bpbtb-nps-log-table td[data-colname]::before {
				content: attr(data-colname);
				display: block;
				margin-bottom: 2px;
				font-size: 11px;
				font-weight: 700;
				text-transform: uppercase;
				letter-spacing: 0.5px;
				color: #94a3b8;
				/* Core absolutely positions this label into a left gutter;
				   in a stacked card it belongs above its value. */
				position: static;
				width: auto;
			}
		}
	</style>

	<div class="bpbtb-nps-wrap">
		<?php if ( 'deleted' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Poll response entry deleted.', 'b-testimonials-block' ); ?></p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'All poll response entries cleared.', 'b-testimonials-block' ); ?></p></div>
		<?php endif; ?>

		<div class="bpbtb-nps-hero">
			<div>
				<h1 class="bpbtb-nps-hero-title">
					<span class="dashicons dashicons-chart-pie" style="font-size: 28px; width: 28px; height: 28px;"></span>
					<?php esc_html_e( 'Feedback & NPS Poll', 'b-testimonials-block' ); ?>
				</h1>
				<p class="bpbtb-nps-hero-desc">
					<?php esc_html_e( 'Track and analyze all visitor Net Promoter Score (NPS) marks submitted on your site.', 'b-testimonials-block' ); ?>
				</p>
			</div>
			<?php if ( ! empty( $votes ) ) : ?>
				<a href="<?php echo esc_url( wp_nonce_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&action=clear_all' ), 'bpbtb_clear_all_nps_votes' ) ); ?>" class="button button-secondary" onclick="return confirm('<?php esc_attr_e( 'Are you sure you want to clear all poll responses?', 'b-testimonials-block' ); ?>');" style="background: rgba(255,255,255,0.15); color: #fff; border-color: rgba(255,255,255,0.3);">
					<?php esc_html_e( 'Clear All Responses', 'b-testimonials-block' ); ?>
				</a>
			<?php endif; ?>
		</div>

		<!-- Summary Stat Cards -->
		<div class="bpbtb-nps-grid">
			<div class="bpbtb-nps-card">
				<div class="nps-val"><?php echo esc_html( $stats['nps_score'] ); ?></div>
				<div class="nps-lbl"><?php esc_html_e( 'Net Promoter Score (NPS)', 'b-testimonials-block' ); ?></div>
			</div>
			<div class="bpbtb-nps-card">
				<div class="nps-val"><?php echo esc_html( $stats['total'] ); ?></div>
				<div class="nps-lbl"><?php esc_html_e( 'Total Marks Selected', 'b-testimonials-block' ); ?></div>
			</div>
			<div class="bpbtb-nps-card">
				<div class="nps-val"><?php echo esc_html( $stats['avg'] ); ?> / 10</div>
				<div class="nps-lbl"><?php esc_html_e( 'Average Selected Mark', 'b-testimonials-block' ); ?></div>
			</div>
			<div class="bpbtb-nps-card">
				<div class="nps-val" style="color: #10b981;"><?php echo esc_html( $stats['promoter_pct'] ); ?>%</div>
				<div class="nps-lbl"><?php esc_html_e( 'Promoters (Marks 9-10)', 'b-testimonials-block' ); ?></div>
			</div>
		</div>

		<!-- Selected Marks Breakdown -->
		<div class="bpbtb-nps-marks-box">
			<h3><?php esc_html_e( 'Selected Marks Breakdown', 'b-testimonials-block' ); ?></h3>
			<p><?php esc_html_e( 'Number of times each specific mark score was selected by visitors.', 'b-testimonials-block' ); ?></p>

			<div class="bpbtb-marks-list">
				<?php
				$max_m = isset( $stats['max_mark'] ) ? $stats['max_mark'] : 10;
				for ( $m = $max_m; $m >= 0; $m-- ) :
					$count = isset( $stats['counts'][ $m ] ) ? $stats['counts'][ $m ] : 0;
					$pct   = $stats['total'] > 0 ? round( ( $count / $stats['total'] ) * 100 ) : 0;
					$cls   = $m >= 9 ? 'promoter' : ( $m >= 7 ? 'passive' : 'detractor' );
					?>
					<div class="bpbtb-mark-row">
						<div class="bpbtb-mark-badge">
							<span class="bpbtb-mark-pill <?php echo esc_attr( $cls ); ?>"><?php echo esc_html( $m ); ?></span>
						</div>
						<div class="bpbtb-mark-track">
							<div class="bpbtb-mark-fill <?php echo esc_attr( $cls ); ?>" style="width: <?php echo esc_attr( $pct ); ?>%;"></div>
						</div>
						<div class="bpbtb-mark-count">
							<strong><?php echo esc_html( $count ); ?></strong> <?php esc_html_e( 'votes', 'b-testimonials-block' ); ?> (<?php echo esc_html( $pct ); ?>%)
						</div>
					</div>
				<?php endfor; ?>
			</div>
		</div>

		<!-- Recent Submissions Table -->
		<div class="bpbtb-nps-table-card">
			<div class="bpbtb-table-hdr">
				<h3><?php esc_html_e( 'Individual Submissions Log', 'b-testimonials-block' ); ?></h3>
			</div>

			<?php // `fixed` dropped: equal-width columns squeezed the Page / Source link to nothing long before the phone breakpoint. ?>
			<table class="wp-list-table widefat striped bpbtb-nps-log-table">
				<thead>
					<tr>
						<th style="width: 100px;"><?php esc_html_e( 'Mark', 'b-testimonials-block' ); ?></th>
						<th><?php esc_html_e( 'Category', 'b-testimonials-block' ); ?></th>
						<th><?php esc_html_e( 'Page / Source', 'b-testimonials-block' ); ?></th>
						<th><?php esc_html_e( 'Submitted Date', 'b-testimonials-block' ); ?></th>
						<th style="width: 80px; text-align: right;"><?php esc_html_e( 'Actions', 'b-testimonials-block' ); ?></th>
					</tr>
				</thead>
				<tbody>
					<?php if ( empty( $votes ) ) : ?>
						<tr>
							<td colspan="5" style="text-align: center; padding: 24px; color: #64748b;">
								<?php esc_html_e( 'No Feedback & NPS Poll marks submitted yet.', 'b-testimonials-block' ); ?>
							</td>
						</tr>
					<?php else : ?>
						<?php foreach ( array_slice( $votes, 0, 50 ) as $vote ) :
							$mk = isset( $vote['mark'] ) ? (int) $vote['mark'] : 0;
							$cat_lbl = $mk >= 9 ? __( 'Promoter', 'b-testimonials-block' ) : ( $mk >= 7 ? __( 'Passive', 'b-testimonials-block' ) : __( 'Detractor', 'b-testimonials-block' ) );
							$cat_clr = $mk >= 9 ? '#10b981' : ( $mk >= 7 ? '#f59e0b' : '#ef4444' );
							$del_nonce = wp_create_nonce( 'bpbtb_delete_nps_vote_' . $vote['id'] );
							?>
							<tr>
								<td data-colname="<?php esc_attr_e( 'Mark', 'b-testimonials-block' ); ?>">
									<span style="display: inline-flex; width: 28px; height: 28px; border-radius: 50%; background: #146ef5; color: #fff; font-weight: 700; align-items: center; justify-content: center;">
										<?php echo esc_html( $mk ); ?>
									</span>
								</td>
								<td data-colname="<?php esc_attr_e( 'Category', 'b-testimonials-block' ); ?>">
									<strong style="color: <?php echo esc_attr( $cat_clr ); ?>;">
										<?php echo esc_html( $cat_lbl ); ?>
									</strong>
								</td>
								<td data-colname="<?php esc_attr_e( 'Page / Source', 'b-testimonials-block' ); ?>">
									<?php if ( ! empty( $vote['page_url'] ) ) : ?>
										<a href="<?php echo esc_url( $vote['page_url'] ); ?>" target="_blank" rel="noopener">
											<?php echo esc_html( ! empty( $vote['page_title'] ) ? $vote['page_title'] : $vote['page_url'] ); ?>
										</a>
									<?php else : ?>
										<em><?php esc_html_e( 'N/A', 'b-testimonials-block' ); ?></em>
									<?php endif; ?>
								</td>
								<td data-colname="<?php esc_attr_e( 'Submitted Date', 'b-testimonials-block' ); ?>"><?php echo esc_html( isset( $vote['date'] ) ? $vote['date'] : '—' ); ?></td>
								<td data-colname="<?php esc_attr_e( 'Actions', 'b-testimonials-block' ); ?>" style="text-align: right;">
									<a href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&action=delete_vote&vote_id=' . $vote['id'] . '&_wpnonce=' . $del_nonce ) ); ?>" style="color: #ef4444;" onclick="return confirm('<?php esc_attr_e( 'Delete this vote entry?', 'b-testimonials-block' ); ?>');">
										<?php esc_html_e( 'Delete', 'b-testimonials-block' ); ?>
									</a>
								</td>
							</tr>
						<?php endforeach; ?>
					<?php endif; ?>
				</tbody>
			</table>
		</div>
	</div>
	<?php
}
}
