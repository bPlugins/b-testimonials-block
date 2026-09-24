<?php
/**
 * Testimonials → Review Sources: where the badges get their real numbers.
 *
 * One screen for all five platforms rather than credential fields in each
 * block's inspector. Two reasons, and the second is the important one:
 *
 *   A site has one Google listing and one Trustpilot profile. Asking for them
 *   again in every badge is asking the same question twenty times.
 *
 *   Block attributes are saved into post content. An API key typed into an
 *   inspector is stored in `wp_posts`, served in the REST response for that
 *   post, and kept in every revision. A key belongs in an option that only
 *   `manage_options` can read.
 *
 * Secrets are write-only here. A stored key is never printed back into the
 * form -- the field renders empty with a masked hint, an empty submission keeps
 * what is stored, and there is a checkbox to remove one deliberately.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Tags and attributes allowed in a platform's embed-code field.
 *
 * The one field on this screen not run through sanitize_text_field(). G2's
 * Badge and Trustpilot's TrustBox are official third-party snippets that need
 * a live `<script>` tag to render -- wp_kses_post() strips that outright
 * (it is meant for post content, not a site owner's own trusted markup), and
 * sanitize_text_field() would strip every tag, mangling the snippet into
 * plain text. This is therefore a deliberate, capability-gated exception --
 * see the `unfiltered_html` check around its one call site, in
 * bpbtb_handle_review_sources_actions() -- and what it saves is later echoed
 * to every visitor of every page carrying that badge, the same trust level as
 * a "Custom HTML" block or a header/footer-scripts field, not a lower one.
 *
 * @param bool $scripts Whether to allow `<script>`/`<iframe>`. False for a
 *                       saving user who lacks `unfiltered_html` -- manage_options
 *                       alone is not that capability (e.g. a Multisite site
 *                       admin can have one without the other), and the badge
 *                       still renders without them: only the "own script tag
 *                       loads a widget's live data" half of the snippet is
 *                       lost, not the whole field.
 * @return array
 */
if ( ! function_exists( 'bpbtb_embed_code_allowed_html' ) ) {
function bpbtb_embed_code_allowed_html( $scripts = true ) {
	$common = [
		'class' => true,
		'id'    => true,
		'style' => true,
		'title' => true,
		'data-*' => true,
	];

	$allowed = [
		'div'      => $common,
		'span'     => $common,
		'p'        => $common,
		'a'        => array_merge( $common, [ 'href' => true, 'target' => true, 'rel' => true ] ),
		'img'      => array_merge( $common, [ 'src' => true, 'alt' => true, 'width' => true, 'height' => true, 'loading' => true ] ),
	];

	if ( ! $scripts ) {
		return $allowed;
	}

	$allowed['iframe']   = array_merge( $common, [ 'src' => true, 'width' => true, 'height' => true, 'frameborder' => true, 'scrolling' => true, 'allow' => true, 'allowtransparency' => true ] );
	$allowed['noscript'] = [];
	$allowed['script']   = [
		'src'   => true,
		'async' => true,
		'defer' => true,
		'type'  => true,
		'id'    => true,
		'class' => true,
	];

	return $allowed;
}
}

/**
 * Register the submenu page.
 */
if ( ! function_exists( 'bpbtb_register_review_sources_menu' ) ) {
function bpbtb_register_review_sources_menu() {
	add_submenu_page(
		'edit.php?post_type=testimonial',
		__( 'Review Sources', 'b-testimonials-block' ),
		__( 'Review Sources', 'b-testimonials-block' ),
		'manage_options',
		'bpbtb-review-sources',
		'bpbtb_render_review_sources_page'
	);
}
}
add_action( 'admin_menu', 'bpbtb_register_review_sources_menu' );

/**
 * The screen's own URL, with an optional message key.
 *
 * @param string $msg Message key to append.
 * @return string
 */
if ( ! function_exists( 'bpbtb_review_sources_url' ) ) {
function bpbtb_review_sources_url( $msg = '' ) {
	$url = admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources' );

	return $msg ? add_query_arg( 'msg', $msg, $url ) : $url;
}
}

/**
 * Handle the screen's three form actions before anything renders.
 */
if ( ! function_exists( 'bpbtb_handle_review_sources_actions' ) ) {
function bpbtb_handle_review_sources_actions() {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$page = isset( $_GET['page'] ) ? sanitize_key( wp_unslash( $_GET['page'] ) ) : '';

	if ( 'bpbtb-review-sources' !== $page || ! current_user_can( 'manage_options' ) ) {
		return;
	}

	// Both buttons submit the whole form, so both paths save first; Test only
	// adds a fetch on top of that.
	if ( ! isset( $_POST['bpbtb_save_review_sources'] ) && ! isset( $_POST['bpbtb_test_review_source'] ) ) {
		return;
	}

	check_admin_referer( 'bpbtb_review_sources', 'bpbtb_review_sources_nonce' );

	$platforms = BPBTB_Review_Sources::platforms();
	$existing  = BPBTB_Review_Sources::get_settings();
	$saved     = [
		'cache_hours' => isset( $_POST['cache_hours'] )
			? max( 1, min( 168, absint( wp_unslash( $_POST['cache_hours'] ) ) ) )
			: BPBTB_Review_Sources::DEFAULT_CACHE_HOURS,
	];

	foreach ( $platforms as $slug => $platform ) {
		$saved[ $slug ] = [];

		foreach ( $platform['fields'] as $key => $field ) {
			$input_name = $slug . '_' . $key;
			$raw        = isset( $_POST[ $input_name ] ) ? trim( (string) wp_unslash( $_POST[ $input_name ] ) ) : '';

			if ( ! empty( $field['secret'] ) ) {
				// Write-only. An explicit Remove wins; an empty box means "leave
				// it alone", because that is what the form shows a stored key as.
				if ( ! empty( $_POST[ $input_name . '_clear' ] ) ) {
					$saved[ $slug ][ $key ] = '';
				} elseif ( '' === $raw ) {
					$saved[ $slug ][ $key ] = $existing[ $slug ][ $key ];
				} else {
					$saved[ $slug ][ $key ] = sanitize_text_field( $raw );
				}

				continue;
			}

			$type = isset( $field['type'] ) ? $field['type'] : 'text';

			if ( 'textarea' === $type ) {
				// The one field on this screen not run through
				// sanitize_text_field() -- see bpbtb_embed_code_allowed_html().
				// manage_options (this whole screen's gate) is not the same
				// capability as unfiltered_html -- a Multisite site admin can
				// have the first without the second -- so a script/iframe tag
				// only survives for a saving user who actually holds it.
				$saved[ $slug ][ $key ] = wp_kses( $raw, bpbtb_embed_code_allowed_html( current_user_can( 'unfiltered_html' ) ) );
			} elseif ( 'url' === $type ) {
				$saved[ $slug ][ $key ] = esc_url_raw( $raw );
			} elseif ( 'number' === $type ) {
				// Empty stays empty -- that is how "no rating entered" is
				// stored, and (float) '' would turn it into a real 0.0 and make
				// the platform look connected with a zero-star rating.
				$saved[ $slug ][ $key ] = '' === $raw
					? ''
					: (string) max( 0, min( 5, round( (float) $raw, 2 ) ) );
			} elseif ( 'integer' === $type ) {
				$saved[ $slug ][ $key ] = '' === $raw ? '' : (string) absint( $raw );
			} else {
				$saved[ $slug ][ $key ] = sanitize_text_field( $raw );
			}
		}
	}

	$changed = false;
	foreach ( $platforms as $slug => $platform ) {
		if ( $saved[ $slug ] !== $existing[ $slug ] ) {
			$changed = true;
			break;
		}
	}

	update_option( BPBTB_Review_Sources::OPTION, $saved );

	// Credentials that changed invalidate what was fetched with the old ones,
	// so the next read is a real fetch rather than yesterday's answer for a
	// different account.
	if ( $changed ) {
		BPBTB_Review_Sources::flush_cache();
	}

	BPBTB_Review_Sources::maybe_schedule();

	// "Test & fetch now" for one platform: saving first is deliberate, so the
	// key just typed is the one being tested.
	if ( isset( $_POST['bpbtb_test_review_source'] ) ) {
		$platform = sanitize_key( wp_unslash( $_POST['bpbtb_test_review_source'] ) );

		if ( BPBTB_Review_Sources::is_platform( $platform ) ) {
			$result = BPBTB_Review_Sources::get_data( $platform, true );

			/*
			 * Three outcomes, not two.
			 *
			 * A fallback is neither a success nor a failure: nothing is broken,
			 * the badge has a figure -- but nothing was fetched either, and
			 * saying "Connected" over the top of that was the same overclaim the
			 * pill used to make. An empty `error` is not enough to earn it;
			 * `live` is.
			 */
			if ( '' !== $result['error'] ) {
				$msg = 'test_failed';
			} elseif ( empty( $result['live'] ) ) {
				$msg = 'tested_fallback';
			} else {
				$msg = 'tested';
			}

			wp_safe_redirect( add_query_arg( 'tested', $platform, bpbtb_review_sources_url( $msg ) ) );
			exit;
		}
	}

	wp_safe_redirect( bpbtb_review_sources_url( 'saved' ) );
	exit;
}
}
add_action( 'admin_init', 'bpbtb_handle_review_sources_actions' );

/**
 * A short, human answer to "when was this fetched?".
 *
 * @param int $timestamp Unix time, 0 when never.
 * @return string
 */
if ( ! function_exists( 'bpbtb_review_source_age' ) ) {
function bpbtb_review_source_age( $timestamp ) {
	if ( ! $timestamp ) {
		return __( 'never', 'b-testimonials-block' );
	}

	/* translators: %s: human-readable time difference, e.g. "20 mins" */
	return sprintf( __( '%s ago', 'b-testimonials-block' ), human_time_diff( $timestamp, time() ) );
}
}

/**
 * Render the Review Sources screen.
 */
if ( ! function_exists( 'bpbtb_render_review_sources_page' ) ) {
function bpbtb_render_review_sources_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$platforms = BPBTB_Review_Sources::platforms();
	$settings  = BPBTB_Review_Sources::get_settings();

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$msg = isset( $_GET['msg'] ) ? sanitize_key( wp_unslash( $_GET['msg'] ) ) : '';
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended
	$tested = isset( $_GET['tested'] ) ? sanitize_key( wp_unslash( $_GET['tested'] ) ) : '';
	?>
	<div class="bpbtb-admin-page">

		<?php BPBTB_Admin_Menu::render_header(); ?>

		<div class="bpbtb-admin-main">
			<div class="bpbtb-admin-wrap">

				<?php if ( 'saved' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Review sources saved.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'tested' === $msg ) : ?>
					<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Connected. The figures on the card below were just fetched.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'tested_fallback' === $msg ) : ?>
					<div class="notice notice-warning is-dismissible"><p><?php esc_html_e( 'Saved, but nothing was fetched — the badge is showing the fallback rating. The reason is on the card below.', 'b-testimonials-block' ); ?></p></div>
				<?php elseif ( 'test_failed' === $msg ) : ?>
					<div class="notice notice-error is-dismissible"><p><?php esc_html_e( 'That source could not be read. The reason is on its card below.', 'b-testimonials-block' ); ?></p></div>
				<?php endif; ?>

				<header class="bpbtb-hero">
					<span class="bpbtb-eyebrow"><?php esc_html_e( 'Live Data', 'b-testimonials-block' ); ?></span>
					<h1><?php esc_html_e( 'Review Sources', 'b-testimonials-block' ); ?></h1>
					<p>
						<?php esc_html_e( 'Set a platform up once here and every badge for it on the site shows that figure, instead of a number typed into each block. Google, Facebook, Trustpilot and G2 are read from their official APIs and refresh themselves. Capterra has no public API and blocks automated reads, so its rating is entered below — still once for the whole site. A badge whose platform is not set up keeps showing exactly what it shows today.', 'b-testimonials-block' ); ?>
					</p>
				</header>

				<form method="post" class="bpbtb-sources-form">
					<?php wp_nonce_field( 'bpbtb_review_sources', 'bpbtb_review_sources_nonce' ); ?>

					<?php foreach ( $platforms as $slug => $platform ) : ?>
						<?php
						$state     = BPBTB_Review_Sources::get_public_state( $slug );
						$connected = $state['connected'];
						$has_data  = null !== $state['score'];
						$is_tested = ( $tested === $slug );
						// Whether this platform uses an API at all, and whether the
						// figure on show actually came from one. Two questions, and
						// conflating them is what made this card claim "Connected"
						// in green while quietly serving the typed fallback.
						$uses_api = ! empty( $state['api'] );
						$is_live  = ! empty( $state['live'] );

						/*
						 * Three states worth telling apart, so the pill never
						 * says more than is true:
						 *
						 *   Connected  the figure below was fetched just now
						 *   Fallback   an API is set up but could not be read,
						 *              so the typed rating is on show
						 *   In use     no API involved; the typed rating is the
						 *              intended source, which is all Capterra
						 *              can ever be
						 */
						if ( ! $uses_api ) {
							$pill_on  = __( 'In use', 'b-testimonials-block' );
							$pill_off = __( 'Not set', 'b-testimonials-block' );
							$pill_cls = 'is-on';
						} elseif ( $is_live ) {
							$pill_on  = __( 'Connected', 'b-testimonials-block' );
							$pill_off = __( 'Not connected', 'b-testimonials-block' );
							$pill_cls = 'is-on';
						} else {
							$pill_on  = __( 'Fallback', 'b-testimonials-block' );
							$pill_off = __( 'Not connected', 'b-testimonials-block' );
							$pill_cls = 'is-warn';
						}
						?>
						<div class="bpbtb-card bpbtb-source-card<?php echo $connected ? ( 'is-warn' === $pill_cls ? ' is-fallback' : ' is-connected' ) : ''; ?>">
							<div class="bpbtb-section-head">
								<h3>
									<?php echo esc_html( $platform['label'] ); ?>
									<span class="bpbtb-source-pill<?php echo $connected ? ' ' . esc_attr( $pill_cls ) : ''; ?>">
										<?php echo esc_html( $connected ? $pill_on : $pill_off ); ?>
									</span>
								</h3>
								<p><?php echo esc_html( $platform['note'] ); ?></p>
							</div>

							<div class="bpbtb-source-fields">
								<?php foreach ( $platform['fields'] as $key => $field ) : ?>
									<?php
									$input_name  = $slug . '_' . $key;
									$is_secret   = ! empty( $field['secret'] );
									$stored      = (string) $settings[ $slug ][ $key ];
									$has_stored  = '' !== $stored;
									$is_textarea = 'textarea' === ( isset( $field['type'] ) ? $field['type'] : 'text' );
									?>
									<label class="bpbtb-source-field<?php echo $is_textarea ? ' bpbtb-source-field-wide' : ''; ?>">
										<span class="bpbtb-source-label"><?php echo esc_html( $field['label'] ); ?></span>

										<?php if ( $is_secret ) : ?>
											<input
												type="password"
												name="<?php echo esc_attr( $input_name ); ?>"
												value=""
												autocomplete="new-password"
												spellcheck="false"
												placeholder="<?php echo $has_stored
													? esc_attr__( '•••••••• saved — leave blank to keep', 'b-testimonials-block' )
													: esc_attr__( 'Paste the key here', 'b-testimonials-block' ); ?>"
											/>
										<?php elseif ( $is_textarea ) : ?>
											<textarea
												name="<?php echo esc_attr( $input_name ); ?>"
												rows="5"
												spellcheck="false"
												class="bpbtb-source-embed-code"
												placeholder="<?php esc_attr_e( 'Paste the widget snippet here', 'b-testimonials-block' ); ?>"
											><?php echo esc_textarea( $stored ); ?></textarea>
										<?php else : ?>
											<?php
											$type = isset( $field['type'] ) ? $field['type'] : 'text';
											$attr = [
												'url'     => [ 'url', '' ],
												'number'  => [ 'number', 'min="0" max="5" step="0.01"' ],
												'integer' => [ 'number', 'min="0" step="1"' ],
											];
											$html_type  = isset( $attr[ $type ] ) ? $attr[ $type ][0] : 'text';
											$html_range = isset( $attr[ $type ] ) ? $attr[ $type ][1] : '';
											?>
											<input
												type="<?php echo esc_attr( $html_type ); ?>"
												name="<?php echo esc_attr( $input_name ); ?>"
												value="<?php echo esc_attr( $stored ); ?>"
												autocomplete="off"
												spellcheck="false"
												<?php echo $html_range; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- fixed attribute strings from the table above. ?>
											/>
										<?php endif; ?>

										<?php if ( ! empty( $field['help'] ) ) : ?>
											<em class="bpbtb-cat-note"><?php echo esc_html( $field['help'] ); ?></em>
										<?php endif; ?>

										<?php if ( $is_secret && $has_stored ) : ?>
											<span class="bpbtb-source-clear">
												<input type="checkbox" name="<?php echo esc_attr( $input_name ); ?>_clear" value="1" />
												<?php esc_html_e( 'Remove the saved key', 'b-testimonials-block' ); ?>
											</span>
										<?php endif; ?>
									</label>
								<?php endforeach; ?>
							</div>

							<div class="bpbtb-source-state">
								<?php if ( $has_data ) : ?>
									<div class="bpbtb-source-figures">
										<strong><?php echo esc_html( number_format_i18n( (float) $state['score'], 1 ) ); ?></strong>
										<span class="bpbtb-source-stars">★★★★★</span>
										<?php if ( null !== $state['count'] ) : ?>
											<span>
												<?php
												echo esc_html(
													sprintf(
														/* translators: %s: review count */
														_n( '%s review', '%s reviews', (int) $state['count'], 'b-testimonials-block' ),
														number_format_i18n( (int) $state['count'] )
													)
												);
												?>
											</span>
										<?php endif; ?>
									</div>

									<p class="bpbtb-cat-note">
										<?php if ( $state['title'] ) : ?>
											<strong><?php echo esc_html( $state['title'] ); ?></strong> &middot;
										<?php endif; ?>
										<?php
										printf(
											/* translators: %s: how long ago, e.g. "20 mins ago" */
											$is_live
												? esc_html__( 'fetched %s', 'b-testimonials-block' )
												: esc_html__( 'last checked %s', 'b-testimonials-block' ),
											esc_html( bpbtb_review_source_age( $state['fetched'] ) )
										);
										?>
										<?php if ( $state['url'] ) : ?>
											&middot; <a href="<?php echo esc_url( $state['url'] ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'view profile', 'b-testimonials-block' ); ?></a>
										<?php endif; ?>
									</p>
								<?php elseif ( $connected ) : ?>
									<p class="bpbtb-cat-note">
										<?php esc_html_e( 'Set up, but nothing has been read yet. Use the button below.', 'b-testimonials-block' ); ?>
									</p>
								<?php endif; ?>

								<?php if ( $state['note'] && ! $state['error'] ) : ?>
									<p class="bpbtb-cat-note"><?php echo esc_html( $state['note'] ); ?></p>
								<?php endif; ?>

								<?php // The full diagnosis. Kept out of the block inspector, which is too narrow to read a paragraph in. ?>
								<?php if ( ! empty( $state['detail'] ) && ! $state['error'] ) : ?>
									<p class="bpbtb-source-detail"><?php echo esc_html( $state['detail'] ); ?></p>
								<?php endif; ?>

								<?php if ( $state['error'] && ( $connected || $has_data ) ) : ?>
									<p class="bpbtb-source-error"><?php echo esc_html( $state['error'] ); ?></p>
								<?php endif; ?>

								<?php if ( $is_tested && ! $state['error'] ) : ?>
									<p class="bpbtb-source-ok"><?php esc_html_e( 'Test succeeded.', 'b-testimonials-block' ); ?></p>
								<?php endif; ?>
							</div>

							<p class="bpbtb-cat-actions">
								<button type="submit" name="bpbtb_save_review_sources" value="1" class="bpbtb-btn">
									<?php esc_html_e( 'Save', 'b-testimonials-block' ); ?>
								</button>
								<button type="submit" name="bpbtb_test_review_source" value="<?php echo esc_attr( $slug ); ?>" class="bpbtb-btn is-ghost">
									<?php echo esc_html( $uses_api
										? __( 'Test & fetch now', 'b-testimonials-block' )
										: __( 'Save & re-check', 'b-testimonials-block' ) ); ?>
								</button>
								<?php if ( ! empty( $platform['doc'] ) ) : ?>
									<a class="bpbtb-cat-note" href="<?php echo esc_url( $platform['doc'] ); ?>" target="_blank" rel="noopener noreferrer">
										<?php esc_html_e( 'How to get these details ↗', 'b-testimonials-block' ); ?>
									</a>
								<?php endif; ?>
								<?php
								/**
								 * Extra actions for one platform's card.
								 *
								 * A platform whose credentials can be obtained by
								 * something better than copy-and-paste hangs its
								 * button here. Facebook does; see
								 * includes/admin-facebook-connect.php.
								 *
								 * @param string $slug     Platform slug.
								 * @param array  $platform Platform definition.
								 */
								do_action( 'bpbtb_review_source_actions', $slug, $platform );
								?>
							</p>
						</div>
					<?php endforeach; ?>

					<div class="bpbtb-card">
						<div class="bpbtb-section-head">
							<h3><?php esc_html_e( 'Refresh Window', 'b-testimonials-block' ); ?></h3>
							<p><?php esc_html_e( 'How long a fetched rating is reused before it is fetched again. Nothing is fetched while a visitor waits: an expired rating is still served immediately and refreshed by WP-Cron in the background, so this number costs page speed nothing. It only trades API calls against how quickly a new review shows up. A rating that is typed in rather than fetched ignores this entirely.', 'b-testimonials-block' ); ?></p>
						</div>

						<label class="bpbtb-source-field bpbtb-source-field-narrow">
							<span class="bpbtb-source-label"><?php esc_html_e( 'Hours', 'b-testimonials-block' ); ?></span>
							<input type="number" min="1" max="168" name="cache_hours" value="<?php echo esc_attr( $settings['cache_hours'] ); ?>" />
							<em class="bpbtb-cat-note"><?php esc_html_e( 'Between 1 and 168 (a week). The default of 12 suits almost every site.', 'b-testimonials-block' ); ?></em>
						</label>

						<p class="bpbtb-cat-actions">
							<button type="submit" name="bpbtb_save_review_sources" value="1" class="bpbtb-btn">
								<?php esc_html_e( 'Save Settings', 'b-testimonials-block' ); ?>
							</button>
						</p>
					</div>
				</form>

				<div class="bpbtb-card">
					<div class="bpbtb-section-head">
						<h3><?php esc_html_e( 'Using this in a block', 'b-testimonials-block' ); ?></h3>
						<p><?php esc_html_e( 'Each badge block has a Rating Source setting in its inspector, set to Live by default. Live uses the figure above for that badge’s platform; Manual uses the score and count typed into that one block. The Review Badge Widget is not tied to one platform, so it also asks which of the five to read.', 'b-testimonials-block' ); ?></p>
					</div>
				</div>

			</div>
		</div>
	</div>
	<?php
}
}
