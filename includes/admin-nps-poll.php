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
	$msg          = isset( $_GET['msg'] ) ? sanitize_key( wp_unslash( $_GET['msg'] ) ) : '';
	$btb_max_mark = isset( $stats['max_mark'] ) ? (int) $stats['max_mark'] : 10;
	?>

	<div class="bpbtb-admin-page">

		<div class="bpbtb-admin-main">
			<div class="bpbtb-admin-wrap">
				<?php if ( 'deleted' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Poll response entry deleted.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'cleared' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'All poll response entries cleared.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'categories_saved' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Category settings saved. Existing responses were re-sorted into the new bands.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'categories_reset' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Category settings restored to the NPS defaults.', 'b-testimonials-block' ); ?></p></div>
				<?php endif; ?>

				<header class="bpbtb-hero">
					<span class="bpbtb-eyebrow"><?php esc_html_e( 'Feedback Poll', 'b-testimonials-block' ); ?></span>
					<h1><?php esc_html_e( 'Feedback & NPS Poll', 'b-testimonials-block' ); ?></h1>
					<p><?php esc_html_e( 'Track and analyze all visitor Net Promoter Score (NPS) marks submitted on your site.', 'b-testimonials-block' ); ?></p>
				</header>

				<div class="bpbtb-stats-row">
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo esc_html( $stats['nps_score'] ); ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Net Promoter Score', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo esc_html( $stats['total'] ); ?></div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Total Marks Selected', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<div class="bpbtb-stat-num"><?php echo esc_html( $stats['avg'] ); ?> / 10</div>
						<div class="bpbtb-stat-label"><?php esc_html_e( 'Average Selected Mark', 'b-testimonials-block' ); ?></div>
					</div>
					<div class="bpbtb-stat-box">
						<?php // The one number that keeps its own colour: it counts a band the user named and coloured. ?>
						<div class="bpbtb-stat-num" style="color: <?php echo esc_attr( $cats['colors']['promoter'] ); ?>;"><?php echo esc_html( $stats['promoter_pct'] ); ?>%</div>
						<div class="bpbtb-stat-label">
							<?php
							printf(
								/* translators: 1: promoter label, 2: lowest promoter mark, 3: highest mark on the scale */
								esc_html__( '%1$s (Marks %2$d-%3$d)', 'b-testimonials-block' ),
								esc_html( $cats['labels']['promoter'] ),
								(int) $cats['promoter_min'],
								(int) max( 10, $btb_max_mark )
							);
							?>
						</div>
					</div>
				</div>

				<?php // Same bar as the Submissions screen: what the page is showing on the left, the one action on the right. ?>
				<div class="bpbtb-nav-toolbar">
					<span class="bpbtb-toolbar-note">
						<?php
						printf(
							/* translators: %s: number of poll responses recorded. */
							esc_html( _n( '%s response recorded', '%s responses recorded', count( $votes ), 'b-testimonials-block' ) ),
							'<strong>' . esc_html( number_format_i18n( count( $votes ) ) ) . '</strong>'
						);
						?>
					</span>

					<?php if ( ! empty( $votes ) ) : ?>
						<div class="bpbtb-toolbar-actions">
							<a
								href="<?php echo esc_url( wp_nonce_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&action=clear_all' ), 'bpbtb_clear_all_nps_votes' ) ); ?>"
								class="bpbtb-btn is-danger"
								onclick="return confirm('<?php esc_attr_e( 'Are you sure you want to clear all poll responses?', 'b-testimonials-block' ); ?>');"
							>
								<?php esc_html_e( 'Clear All Responses', 'b-testimonials-block' ); ?>
							</a>
						</div>
					<?php endif; ?>
				</div>

				<div class="bpbtb-card">
					<div class="bpbtb-section-head">
						<h3><?php esc_html_e( 'Selected Marks Breakdown', 'b-testimonials-block' ); ?></h3>
						<p><?php esc_html_e( 'Number of times each specific mark score was selected by visitors.', 'b-testimonials-block' ); ?></p>
					</div>

					<div class="bpbtb-marks-list">
						<?php
						for ( $m = $btb_max_mark; $m >= 0; $m-- ) :
							$count = isset( $stats['counts'][ $m ] ) ? $stats['counts'][ $m ] : 0;
							$pct   = $stats['total'] > 0 ? round( ( $count / $stats['total'] ) * 100 ) : 0;
							$band  = bpbtb_get_nps_category_for_mark( $m );
							?>
							<div class="bpbtb-mark-row">
								<?php
								/*
								 * The band's colour fills the pill only for marks that were
								 * actually picked. Colouring all eleven turned the column
								 * into a traffic-light gradient in which the marks with
								 * votes were no easier to find than the ones without.
								 */
								?>
								<span
									class="bpbtb-mark-pill<?php echo $count > 0 ? ' has-votes' : ''; ?>"
									<?php echo $count > 0 ? 'style="background: ' . esc_attr( $band['color'] ) . ';"' : ''; ?>
								><?php echo esc_html( $m ); ?></span>

								<div class="bpbtb-mark-track">
									<div class="bpbtb-mark-fill" style="width: <?php echo esc_attr( $pct ); ?>%; background: <?php echo esc_attr( $band['color'] ); ?>;"></div>
								</div>

								<div class="bpbtb-mark-count">
									<?php
									printf(
										/* translators: 1: vote count, 2: share of all votes as a percentage. */
										esc_html( _n( '%1$s vote (%2$s%%)', '%1$s votes (%2$s%%)', $count, 'b-testimonials-block' ) ),
										'<strong>' . esc_html( number_format_i18n( $count ) ) . '</strong>',
										esc_html( number_format_i18n( $pct ) )
									);
									?>
								</div>
							</div>
						<?php endfor; ?>
					</div>
				</div>

				<div class="bpbtb-card">
					<div class="bpbtb-section-head">
						<h3><?php esc_html_e( 'Category Settings', 'b-testimonials-block' ); ?></h3>
						<p><?php esc_html_e( 'A response is sorted into a category by the mark the visitor picked — the category is not stored on the response, so changing these re-sorts every existing entry as well as new ones.', 'b-testimonials-block' ); ?></p>
					</div>

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

									<label class="bpbtb-cat-cell">
										<span><?php esc_html_e( 'Color', 'b-testimonials-block' ); ?></span>
										<input type="color" name="color_<?php echo esc_attr( $key ); ?>" value="<?php echo esc_attr( $cats['colors'][ $key ] ); ?>" />
									</label>

									<label class="bpbtb-cat-cell">
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
							<button type="submit" name="bpbtb_save_nps_categories" value="1" class="bpbtb-btn">
								<?php esc_html_e( 'Save Categories', 'b-testimonials-block' ); ?>
							</button>
							<button type="submit" name="bpbtb_reset_nps_categories" value="1" class="bpbtb-btn is-ghost">
								<?php esc_html_e( 'Reset to NPS defaults', 'b-testimonials-block' ); ?>
							</button>
							<span class="bpbtb-cat-note">
								<?php esc_html_e( 'Defaults (9 and 7) are the standard NPS bands — change them only if this poll is not a Net Promoter Score, or the number stops being comparable to anyone else’s.', 'b-testimonials-block' ); ?>
							</span>
						</p>
					</form>
				</div>

				<div class="bpbtb-nps-table-card">
					<div class="bpbtb-section-head">
						<h3><?php esc_html_e( 'Individual Submissions Log', 'b-testimonials-block' ); ?></h3>
						<p><?php esc_html_e( 'The 50 most recent marks, newest first.', 'b-testimonials-block' ); ?></p>
					</div>

					<?php
					/*
					 * The same table class the Submissions screen uses, rather than core's
					 * `wp-list-table widefat striped`: one table style for both screens, and
					 * the phone layout comes from the shared `data-label` rules -- which is
					 * why the cells below carry `data-label` and not core's `data-colname`.
					 */
					?>
					<table class="bpbtb-modern-table">
						<thead>
							<tr>
								<th style="width: 90px;"><?php esc_html_e( 'Mark', 'b-testimonials-block' ); ?></th>
								<th style="width: 140px;"><?php esc_html_e( 'Category', 'b-testimonials-block' ); ?></th>
								<th><?php esc_html_e( 'Page / Source', 'b-testimonials-block' ); ?></th>
								<th style="width: 200px;"><?php esc_html_e( 'Submitted Date', 'b-testimonials-block' ); ?></th>
								<th style="width: 90px; text-align: right;"><?php esc_html_e( 'Actions', 'b-testimonials-block' ); ?></th>
							</tr>
						</thead>
						<tbody>
							<?php if ( empty( $votes ) ) : ?>
								<tr>
									<td colspan="5">
										<div class="bpbtb-empty">
											<span class="dashicons dashicons-chart-bar"></span>
											<h3><?php esc_html_e( 'No poll marks submitted yet.', 'b-testimonials-block' ); ?></h3>
											<p><?php esc_html_e( 'Marks visitors pick in the Feedback & NPS Poll block will show up here.', 'b-testimonials-block' ); ?></p>
										</div>
									</td>
								</tr>
							<?php else : ?>
								<?php
								foreach ( array_slice( $votes, 0, 50 ) as $vote ) :
									$mk        = isset( $vote['mark'] ) ? (int) $vote['mark'] : 0;
									$band      = bpbtb_get_nps_category_for_mark( $mk );
									$del_nonce = wp_create_nonce( 'bpbtb_delete_nps_vote_' . $vote['id'] );
									?>
									<tr>
										<td data-label="<?php esc_attr_e( 'Mark', 'b-testimonials-block' ); ?>">
											<span class="bpbtb-log-mark" style="background: <?php echo esc_attr( $band['color'] ); ?>;">
												<?php echo esc_html( $mk ); ?>
											</span>
										</td>
										<td data-label="<?php esc_attr_e( 'Category', 'b-testimonials-block' ); ?>">
											<span class="bpbtb-log-cat" style="color: <?php echo esc_attr( $band['color'] ); ?>;">
												<?php echo esc_html( $band['label'] ); ?>
											</span>
										</td>
										<td data-label="<?php esc_attr_e( 'Page / Source', 'b-testimonials-block' ); ?>">
											<?php if ( ! empty( $vote['page_url'] ) ) : ?>
												<a href="<?php echo esc_url( $vote['page_url'] ); ?>" target="_blank" rel="noopener">
													<?php echo esc_html( ! empty( $vote['page_title'] ) ? $vote['page_title'] : $vote['page_url'] ); ?>
												</a>
											<?php else : ?>
												<em class="bpbtb-cell-sub"><?php esc_html_e( 'N/A', 'b-testimonials-block' ); ?></em>
											<?php endif; ?>
										</td>
										<td data-label="<?php esc_attr_e( 'Submitted Date', 'b-testimonials-block' ); ?>" class="bpbtb-cell-meta">
											<?php echo esc_html( isset( $vote['date'] ) ? $vote['date'] : '—' ); ?>
										</td>
										<td data-label="<?php esc_attr_e( 'Actions', 'b-testimonials-block' ); ?>" class="bpbtb-cell-actions">
											<a
												href="<?php echo esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-nps-poll&action=delete_vote&vote_id=' . $vote['id'] . '&_wpnonce=' . $del_nonce ) ); ?>"
												class="bpbtb-row-action is-delete"
												onclick="return confirm('<?php esc_attr_e( 'Delete this vote entry?', 'b-testimonials-block' ); ?>');"
											>
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
		</div>
	</div>
	<?php
}
}
