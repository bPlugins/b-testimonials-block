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
 * The bands a mark is sorted into, and what each one is called.
 *
 * The 9/7 cut-offs were written out three times -- once in the stats, once per
 * row of the log, and once more in the "Promoters (Marks 9-10)" card label --
 * so moving a boundary meant finding all three or leaving the summary
 * contradicting the table it summarises. They come from here now.
 *
 * The defaults are the NPS standard, and the metric is only comparable to
 * anyone else's while they stay that way; the settings exist for polls that
 * are not really NPS (a 1-5 satisfaction scale, say) rather than for tuning
 * the score upward.
 *
 * @return array {
 *     @type int    $promoter_min  Lowest mark counted as a promoter.
 *     @type int    $passive_min   Lowest mark counted as a passive.
 *     @type array  $labels        Label per band key.
 *     @type array  $colors        Hex colour per band key.
 * }
 */
if ( ! function_exists( 'bpbtb_get_nps_categories' ) ) {
function bpbtb_get_nps_categories() {
	$defaults = [
		'promoter_min' => 9,
		'passive_min'  => 7,
		'labels'       => [
			'promoter'  => __( 'Promoter', 'b-testimonials-block' ),
			'passive'   => __( 'Passive', 'b-testimonials-block' ),
			'detractor' => __( 'Detractor', 'b-testimonials-block' ),
		],
		'colors'       => [
			'promoter'  => '#10b981',
			'passive'   => '#f59e0b',
			'detractor' => '#ef4444',
		],
	];

	$saved    = get_option( 'bpbtb_nps_categories', [] );
	$settings = is_array( $saved ) ? array_merge( $defaults, $saved ) : $defaults;

	// Merged one level deeper so a saved partial set of labels or colours does
	// not drop the keys it left out.
	$settings['labels'] = array_merge( $defaults['labels'], (array) ( $settings['labels'] ?? [] ) );
	$settings['colors'] = array_merge( $defaults['colors'], (array) ( $settings['colors'] ?? [] ) );

	// A passive floor at or above the promoter floor would leave the middle
	// band unreachable, so the stored pair is clamped on the way out as well as
	// on the way in -- a filter can return anything.
	$settings['promoter_min'] = max( 1, min( 10, (int) $settings['promoter_min'] ) );
	$settings['passive_min']  = max( 0, min( $settings['promoter_min'] - 1, (int) $settings['passive_min'] ) );

	/**
	 * Filters the NPS category bands.
	 *
	 * @param array $settings Thresholds, labels and colours.
	 */
	return apply_filters( 'bpbtb_nps_categories', $settings );
}
}

/**
 * Which band a single mark falls in.
 *
 * @param int $mark Selected mark.
 * @return array { @type string $key, @type string $label, @type string $color }
 */
if ( ! function_exists( 'bpbtb_get_nps_category_for_mark' ) ) {
function bpbtb_get_nps_category_for_mark( $mark ) {
	$cats = bpbtb_get_nps_categories();
	$mark = (int) $mark;

	if ( $mark >= $cats['promoter_min'] ) {
		$key = 'promoter';
	} elseif ( $mark >= $cats['passive_min'] ) {
		$key = 'passive';
	} else {
		$key = 'detractor';
	}

	return [
		'key'   => $key,
		'label' => $cats['labels'][ $key ],
		'color' => $cats['colors'][ $key ],
	];
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

		$band = bpbtb_get_nps_category_for_mark( $mark );
		if ( 'promoter' === $band['key'] ) {
			$promoters++;
		} elseif ( 'passive' === $band['key'] ) {
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

	// Category bands. Saved before the page renders so the table below reflects
	// the new boundaries on the same load.
	if ( isset( $_POST['bpbtb_save_nps_categories'] ) ) {
		check_admin_referer( 'bpbtb_save_nps_categories', 'bpbtb_categories_nonce' );

		$promoter_min = isset( $_POST['promoter_min'] ) ? absint( wp_unslash( $_POST['promoter_min'] ) ) : 9;
		$passive_min  = isset( $_POST['passive_min'] ) ? absint( wp_unslash( $_POST['passive_min'] ) ) : 7;

		$promoter_min = max( 1, min( 10, $promoter_min ) );
		// Equal floors would erase the middle band entirely, so the passive one
		// is held one mark below rather than rejected with an error.
		$passive_min = max( 0, min( $promoter_min - 1, $passive_min ) );

		$labels = [];
		$colors = [];
		foreach ( [ 'promoter', 'passive', 'detractor' ] as $key ) {
			if ( ! empty( $_POST[ 'label_' . $key ] ) ) {
				$labels[ $key ] = sanitize_text_field( wp_unslash( $_POST[ 'label_' . $key ] ) );
			}
			if ( ! empty( $_POST[ 'color_' . $key ] ) ) {
				$color = sanitize_hex_color( wp_unslash( $_POST[ 'color_' . $key ] ) );
				if ( $color ) {
					$colors[ $key ] = $color;
				}
			}
		}

		update_option(
			'bpbtb_nps_categories',
			[
				'promoter_min' => $promoter_min,
				'passive_min'  => $passive_min,
				'labels'       => $labels,
				'colors'       => $colors,
			]
		);

		wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&msg=categories_saved' ) );
		exit;
	}

	if ( isset( $_POST['bpbtb_reset_nps_categories'] ) ) {
		check_admin_referer( 'bpbtb_save_nps_categories', 'bpbtb_categories_nonce' );
		delete_option( 'bpbtb_nps_categories' );
		wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&msg=categories_reset' ) );
		exit;
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
	$cats  = bpbtb_get_nps_categories();

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$msg = isset( $_GET['msg'] ) ? sanitize_key( wp_unslash( $_GET['msg'] ) ) : '';
	?>
	<style>
		.bpbtb-nps-wrap {
			max-width: 1280px;
			/* auto left/right centres the page in the admin content area; the
			   old `0` left margin pinned it to the edge on wide screens. */
			margin: 24px auto 40px;
			padding: 0 20px;
			box-sizing: border-box;
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

		/* Painted from the category settings so a custom colour reaches the
		   bars as well as the log's labels. */
		.bpbtb-mark-fill.promoter { background: <?php echo esc_html( $cats['colors']['promoter'] ); ?>; }
		.bpbtb-mark-fill.passive { background: <?php echo esc_html( $cats['colors']['passive'] ); ?>; }
		.bpbtb-mark-fill.detractor { background: <?php echo esc_html( $cats['colors']['detractor'] ); ?>; }

		.bpbtb-mark-count {
			width: 90px;
			text-align: right;
			font-weight: 600;
			color: #475569;
		}

		/* Category settings */
		.bpbtb-cat-grid {
			display: grid;
			gap: 10px;
			margin-top: 16px;
		}

		.bpbtb-cat-row {
			display: flex;
			align-items: flex-end;
			flex-wrap: wrap;
			gap: 12px;
			padding: 12px;
			border: 1px solid #e2e8f0;
			border-radius: 10px;
			background: #f8fafc;
		}

		.bpbtb-cat-swatch {
			width: 6px;
			align-self: stretch;
			border-radius: 3px;
			flex: none;
		}

		.bpbtb-cat-cell {
			display: flex;
			flex-direction: column;
			gap: 4px;
			flex: 1 1 160px;
			min-width: 0;
			font-size: 12px;
			font-weight: 600;
			color: #64748b;
		}

		.bpbtb-cat-cell-sm {
			flex: 0 1 130px;
		}

		.bpbtb-cat-cell input {
			width: 100%;
			box-sizing: border-box;
		}

		.bpbtb-cat-cell input[type="color"] {
			height: 32px;
			padding: 2px;
		}

		.bpbtb-cat-range {
			flex: 1 1 150px;
			font-size: 12px;
			color: #475569;
			padding-bottom: 6px;
		}

		.bpbtb-cat-note {
			font-size: 12px;
			color: #64748b;
			font-style: normal;
		}

		.bpbtb-cat-actions {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 10px;
			margin-top: 16px;
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
				/* Core absolutely positions this label into a left gutter,
				   where it lands on top of the value once the row is
				   stacked. `!important` rather than a longer selector
				   because core's own rule
				   `.wp-list-table tr:not(.inline-edit-row):not(.no-items)
				    td:not(.column-primary)::before`
				   scores higher than anything reasonable here, and matching
				   it exactly would leave the outcome resting on stylesheet
				   order. */
				position: static !important;
				width: auto !important;
				overflow: visible !important;
				white-space: normal !important;
			}
		}
	</style>

	<div class="bpbtb-nps-wrap">
		<?php if ( 'deleted' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Poll response entry deleted.', 'b-testimonials-block' ); ?></p></div>
		<?php elseif ( 'cleared' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'All poll response entries cleared.', 'b-testimonials-block' ); ?></p></div>
		<?php elseif ( 'categories_saved' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Category settings saved. Existing responses were re-sorted into the new bands.', 'b-testimonials-block' ); ?></p></div>
		<?php elseif ( 'categories_reset' === $msg ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Category settings restored to the NPS defaults.', 'b-testimonials-block' ); ?></p></div>
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
				<div class="nps-val" style="color: <?php echo esc_attr( $cats['colors']['promoter'] ); ?>;"><?php echo esc_html( $stats['promoter_pct'] ); ?>%</div>
				<div class="nps-lbl">
					<?php
					printf(
						/* translators: 1: promoter label, 2: lowest promoter mark, 3: highest mark on the scale */
						esc_html__( '%1$s (Marks %2$d-%3$d)', 'b-testimonials-block' ),
						esc_html( $cats['labels']['promoter'] ),
						(int) $cats['promoter_min'],
						(int) max( 10, $stats['max_mark'] )
					);
					?>
				</div>
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
					$cls   = bpbtb_get_nps_category_for_mark( $m )['key'];
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

		<!-- Category Bands -->
		<div class="bpbtb-nps-marks-box">
			<h3><?php esc_html_e( 'Category Settings', 'b-testimonials-block' ); ?></h3>
			<p>
				<?php esc_html_e( 'A response is sorted into a category by the mark the visitor picked — the category is not stored on the response, so changing these re-sorts every existing entry as well as new ones.', 'b-testimonials-block' ); ?>
			</p>

			<form method="post" class="bpbtb-cat-form">
				<?php wp_nonce_field( 'bpbtb_save_nps_categories', 'bpbtb_categories_nonce' ); ?>

				<div class="bpbtb-cat-grid">
					<?php
					$rows = [
						'promoter'  => [
							/* translators: %d: lowest mark in the band */
							'range' => sprintf( __( 'Marks %1$d and above', 'b-testimonials-block' ), $cats['promoter_min'] ),
							'field' => 'promoter_min',
						],
						'passive'   => [
							/* translators: 1: lowest mark in the band, 2: highest mark in the band */
							'range' => sprintf( __( 'Marks %1$d to %2$d', 'b-testimonials-block' ), $cats['passive_min'], $cats['promoter_min'] - 1 ),
							'field' => 'passive_min',
						],
						'detractor' => [
							/* translators: %d: highest mark in the band */
							'range' => sprintf( __( 'Marks 0 to %d', 'b-testimonials-block' ), max( 0, $cats['passive_min'] - 1 ) ),
							'field' => '',
						],
					];

					foreach ( $rows as $key => $row ) :
						?>
						<div class="bpbtb-cat-row">
							<div class="bpbtb-cat-swatch" style="background: <?php echo esc_attr( $cats['colors'][ $key ] ); ?>;"></div>

							<label class="bpbtb-cat-cell">
								<span><?php esc_html_e( 'Label', 'b-testimonials-block' ); ?></span>
								<input type="text" name="label_<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $cats['labels'][ $key ] ); ?>" />
							</label>

							<label class="bpbtb-cat-cell bpbtb-cat-cell-sm">
								<span><?php esc_html_e( 'Color', 'b-testimonials-block' ); ?></span>
								<input type="color" name="color_<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $cats['colors'][ $key ] ); ?>" />
							</label>

							<label class="bpbtb-cat-cell bpbtb-cat-cell-sm">
								<span><?php esc_html_e( 'Starts at mark', 'b-testimonials-block' ); ?></span>
								<?php if ( $row['field'] ) : ?>
									<input type="number" min="<?php echo 'promoter_min' === $row['field'] ? 1 : 0; ?>" max="10" name="<?php echo esc_attr( $row['field'] ); ?>" value="<?php echo esc_attr( 'promoter_min' === $row['field'] ? $cats['promoter_min'] : $cats['passive_min'] ); ?>" />
								<?php else : ?>
									<em class="bpbtb-cat-note"><?php esc_html_e( 'everything below', 'b-testimonials-block' ); ?></em>
								<?php endif; ?>
							</label>

							<span class="bpbtb-cat-range"><?php echo esc_html( $row['range'] ); ?></span>
						</div>
					<?php endforeach; ?>
				</div>

				<p class="bpbtb-cat-actions">
					<button type="submit" name="bpbtb_save_nps_categories" value="1" class="button button-primary">
						<?php esc_html_e( 'Save Categories', 'b-testimonials-block' ); ?>
					</button>
					<button type="submit" name="bpbtb_reset_nps_categories" value="1" class="button button-secondary">
						<?php esc_html_e( 'Reset to NPS defaults', 'b-testimonials-block' ); ?>
					</button>
					<span class="bpbtb-cat-note">
						<?php esc_html_e( 'Defaults (9 and 7) are the standard NPS bands — change them only if this poll is not a Net Promoter Score, or the number stops being comparable to anyone else’s.', 'b-testimonials-block' ); ?>
					</span>
				</p>
			</form>
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
							$band    = bpbtb_get_nps_category_for_mark( $mk );
							$cat_lbl = $band['label'];
							$cat_clr = $band['color'];
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
