<?php
/**
 * Telling the site owner when a review platform has quietly stopped answering.
 *
 * The badges are built to degrade rather than break: a platform that cannot be
 * read falls back to the last good figure, then to the average of the site's own
 * testimonials, then to the demo numbers. That is the right behaviour for a
 * visitor -- a badge that blanks out mid-page is worse than one showing
 * yesterday's score.
 *
 * It is the wrong behaviour for the owner, and this file exists because of a
 * real instance of it. A Facebook Page token expired overnight. The badge went
 * on drawing the Facebook logo, the words "Facebook Reviews", five stars and
 * "Recommended by 1 Customer" -- where the 1 was the block's own placeholder
 * item, counted because the site had no testimonials. Nothing was broken on the
 * page and nothing said anything was wrong. Without opening the Review Sources
 * screen there was no way to know, and a token can stay dead for a month.
 *
 * So: an admin notice on the plugin's own screens, and a Site Health test for
 * everywhere else.
 *
 * ---------------------------------------------------------------------------
 * Two things this deliberately does NOT do.
 *
 * It never fetches. Every function here reads the cached result option and
 * nothing else -- BPBTB_Review_Sources::get_data() fetches inline when is_admin()
 * is true, so calling it from `admin_notices` would put an outbound HTTP request
 * to Google and Facebook on the critical path of every wp-admin page load. The
 * hourly cron already refreshes; this only reports what it found.
 *
 * It never reports a platform that was never set up. "Not connected" is a
 * choice, not a fault, and nagging about the four platforms somebody chose not
 * to use is how a notice gets dismissed permanently and stops being read.
 * ---------------------------------------------------------------------------
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Source_Health' ) ) {

class BPBTB_Source_Health {

	/**
	 * User meta holding the error signatures this user has dismissed.
	 */
	const DISMISSED = 'bpbtb_dismissed_source_errors';

	/**
	 * Hook it up.
	 */
	public static function init() {
		add_action( 'admin_notices', [ __CLASS__, 'notice' ] );
		add_action( 'admin_post_bpbtb_dismiss_source_health', [ __CLASS__, 'dismiss' ] );
		add_filter( 'site_status_tests', [ __CLASS__, 'register_test' ] );
	}

	/**
	 * Every connected platform that reported a failure, read from cache only.
	 *
	 * @return array[] { platform, label, error, checked }
	 */
	public static function problems() {
		if ( ! class_exists( 'BPBTB_Review_Sources' ) ) {
			return [];
		}

		$cache = get_option( BPBTB_Review_Sources::CACHE, [] );
		$cache = is_array( $cache ) ? $cache : [];

		// Once, not once per platform: get_settings() rebuilds the whole
		// structure on every call.
		$settings = BPBTB_Review_Sources::get_settings();

		$out = [];

		foreach ( BPBTB_Review_Sources::platforms() as $slug => $platform ) {
			// Not set up is not a fault. See the note at the top.
			if ( ! BPBTB_Review_Sources::is_connected( $slug ) ) {
				continue;
			}

			// A platform whose figure is typed rather than fetched has no
			// credential to expire, so there is nothing here to go wrong.
			if ( ! BPBTB_Review_Sources::is_live_source( $slug ) ) {
				continue;
			}

			$stored = isset( $cache[ $slug ] ) && is_array( $cache[ $slug ] ) ? $cache[ $slug ] : [];
			$error  = isset( $stored['error'] ) ? trim( (string) $stored['error'] ) : '';

			if ( '' === $error ) {
				continue;
			}

			$typed = '' !== trim( (string) ( $settings[ $slug ]['score'] ?? '' ) );

			/*
			 * What the badge is drawing instead, which is the part a site owner
			 * actually needs to know. Three quite different situations:
			 *
			 *   stale  a real figure from this platform, just an old one
			 *   typed  the number entered by hand beside the credentials
			 *   local  the average of this site's own testimonials, or -- with
			 *          no testimonials -- the block's placeholder items
			 *
			 * Only the third is misleading under a platform logo, so only the
			 * third gets said in those terms.
			 */
			if ( isset( $stored['score'] ) && null !== $stored['score'] ) {
				$fallback = 'stale';
			} elseif ( $typed ) {
				$fallback = 'typed';
			} else {
				$fallback = 'local';
			}

			$out[] = [
				'platform' => $slug,
				'label'    => (string) $platform['label'],
				'error'    => self::trim_label( $error, (string) $platform['label'] ),
				'checked'  => isset( $stored['fetched'] ) ? (int) $stored['fetched'] : 0,
				'fallback' => $fallback,
				// Kept for readers of this array: true when a real, if old,
				// figure is still on the badge.
				'stale'    => 'stale' === $fallback,
			];
		}

		return $out;
	}

	/**
	 * Drop a platform name the message already begins with.
	 *
	 * BPBTB_Review_Sources::decode_json() prefixes its errors with the platform
	 * name so they read correctly on their own -- "Facebook: Error validating
	 * access token". Printing that under a "Facebook:" heading gives
	 * "Facebook: Facebook: Error validating...", which is how a notice starts
	 * looking machine-generated.
	 *
	 * @param string $error Message from the platform.
	 * @param string $label Platform name.
	 * @return string
	 */
	private static function trim_label( $error, $label ) {
		$prefix = $label . ': ';

		if ( 0 === stripos( $error, $prefix ) ) {
			return trim( substr( $error, strlen( $prefix ) ) );
		}

		return $error;
	}

	/**
	 * A signature for the current set of problems.
	 *
	 * Includes the messages, so that fixing one platform and breaking another --
	 * or the same platform failing for a new reason -- brings the notice back
	 * for somebody who dismissed the previous one. Dismissing means "I have read
	 * this", not "stop telling me about this plugin".
	 *
	 * @param array[] $problems Result of problems().
	 * @return string
	 */
	private static function signature( $problems ) {
		$parts = [];

		foreach ( $problems as $problem ) {
			$parts[] = $problem['platform'] . '|' . $problem['error'];
		}

		sort( $parts );

		return md5( implode( "\n", $parts ) );
	}

	/**
	 * Screens the notice may appear on.
	 *
	 * The same set the review request uses: our own pages, the testimonial post
	 * type and the plugins list. Not the whole of wp-admin -- a notice on every
	 * screen is a notice nobody reads.
	 *
	 * Excluding the Review Sources screen itself, where each platform already
	 * shows its own error beside its own fields, in context and in more detail.
	 *
	 * @return bool
	 */
	private static function on_our_screen() {
		if ( ! function_exists( 'get_current_screen' ) ) {
			return false;
		}

		$screen = get_current_screen();

		if ( ! $screen ) {
			return false;
		}

		if ( false !== strpos( (string) $screen->id, 'bpbtb-review-sources' ) ) {
			return false;
		}

		if ( 'plugins' === $screen->base || 'dashboard' === $screen->base ) {
			return true;
		}

		if ( isset( $screen->post_type ) && 'testimonial' === $screen->post_type ) {
			return true;
		}

		return false !== strpos( (string) $screen->id, 'b-testimonials-block' )
			|| false !== strpos( (string) $screen->id, 'bpbtb' );
	}

	/**
	 * The notice itself.
	 */
	public static function notice() {
		if ( ! current_user_can( 'manage_options' ) || ! self::on_our_screen() ) {
			return;
		}

		$problems = self::problems();

		if ( ! $problems ) {
			return;
		}

		$signature = self::signature( $problems );
		$dismissed = (array) get_user_meta( get_current_user_id(), self::DISMISSED, true );

		if ( in_array( $signature, $dismissed, true ) ) {
			return;
		}

		$settings = admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources' );

		// The lead line depends on how bad it actually is. A badge still showing
		// the platform's own figure from yesterday is a different sentence from
		// one showing a number the platform never gave.
		$inventing = false;
		foreach ( $problems as $problem ) {
			if ( 'local' === $problem['fallback'] ) {
				$inventing = true;
				break;
			}
		}
		?>
		<div class="notice notice-warning">
			<p>
				<strong><?php esc_html_e( 'Testimonials Block: a review platform stopped answering.', 'b-testimonials-block' ); ?></strong>
			</p>
			<p>
				<?php
				echo esc_html(
					$inventing
						? __( 'The badge is still drawing a number, but it is no longer the platform\'s own — it falls back to your site\'s own testimonials, or to its placeholder figures. Nothing looks broken to a visitor, which is exactly why this is worth saying out loud.', 'b-testimonials-block' )
						: __( 'Nothing on your pages is broken — the badge is showing the last figure it managed to fetch, or the one you entered by hand. It is just no longer current.', 'b-testimonials-block' )
				);
				?>
			</p>
			<ul style="list-style:disc;margin-left:2em;">
				<?php foreach ( $problems as $problem ) : ?>
					<li>
						<strong><?php echo esc_html( $problem['label'] ); ?>:</strong>
						<?php echo esc_html( $problem['error'] ); ?>
						<?php if ( 'stale' === $problem['fallback'] ) : ?>
							<em><?php esc_html_e( '(the badge is still showing the last figure that did arrive from this platform)', 'b-testimonials-block' ); ?></em>
						<?php elseif ( 'typed' === $problem['fallback'] ) : ?>
							<em><?php esc_html_e( '(the badge is showing the rating you entered by hand, which is the intended fallback)', 'b-testimonials-block' ); ?></em>
						<?php else : ?>
							<em><?php esc_html_e( '(this platform has never answered, so the badge is showing a figure worked out from your own site — under this platform\'s logo)', 'b-testimonials-block' ); ?></em>
						<?php endif; ?>
					</li>
				<?php endforeach; ?>
			</ul>
			<p>
				<a href="<?php echo esc_url( $settings ); ?>" class="button button-primary">
					<?php esc_html_e( 'Check Review Sources', 'b-testimonials-block' ); ?>
				</a>
				<a href="<?php echo esc_url( self::dismiss_url( $signature ) ); ?>" class="button">
					<?php esc_html_e( 'Dismiss', 'b-testimonials-block' ); ?>
				</a>
			</p>
		</div>
		<?php
	}

	/**
	 * The dismiss link, nonced against the signature being dismissed.
	 *
	 * @param string $signature Current problem signature.
	 * @return string
	 */
	private static function dismiss_url( $signature ) {
		return wp_nonce_url(
			add_query_arg(
				[
					'action'    => 'bpbtb_dismiss_source_health',
					'signature' => $signature,
					'redirect'  => rawurlencode( self::current_url() ),
				],
				admin_url( 'admin-post.php' )
			),
			'bpbtb_dismiss_source_health_' . $signature
		);
	}

	/**
	 * Where we are, so dismissing returns here rather than to the dashboard.
	 *
	 * @return string
	 */
	private static function current_url() {
		$uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';

		return $uri ? admin_url( ltrim( str_replace( parse_url( admin_url(), PHP_URL_PATH ), '', $uri ), '/' ) ) : admin_url();
	}

	/**
	 * Record that this user has read this particular set of problems.
	 */
	public static function dismiss() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'b-testimonials-block' ), '', [ 'response' => 403 ] );
		}

		$signature = isset( $_GET['signature'] ) ? sanitize_key( wp_unslash( $_GET['signature'] ) ) : '';

		check_admin_referer( 'bpbtb_dismiss_source_health_' . $signature );

		if ( $signature ) {
			$dismissed = (array) get_user_meta( get_current_user_id(), self::DISMISSED, true );
			$dismissed = array_values( array_filter( $dismissed, 'is_string' ) );

			$dismissed[] = $signature;

			// Only the last few are worth keeping. Signatures are of failures,
			// and a site that has produced a dozen distinct ones is not going to
			// see the thirteenth again by accident.
			update_user_meta( get_current_user_id(), self::DISMISSED, array_slice( array_unique( $dismissed ), -10 ) );
		}

		$redirect = isset( $_GET['redirect'] ) ? rawurldecode( wp_unslash( $_GET['redirect'] ) ) : '';

		wp_safe_redirect( $redirect ? $redirect : admin_url() );
		exit;
	}

	/**
	 * Add a Site Health test, for the screens the notice stays off.
	 *
	 * @param array $tests Registered tests.
	 * @return array
	 */
	public static function register_test( $tests ) {
		$tests['direct']['bpbtb_review_sources'] = [
			'label' => __( 'Testimonials Block review platforms', 'b-testimonials-block' ),
			'test'  => [ __CLASS__, 'site_status_test' ],
		];

		return $tests;
	}

	/**
	 * The Site Health result.
	 *
	 * @return array
	 */
	public static function site_status_test() {
		$result = [
			'label'       => __( 'Your review platforms are answering', 'b-testimonials-block' ),
			'status'      => 'good',
			'badge'       => [
				'label' => __( 'Testimonials', 'b-testimonials-block' ),
				'color' => 'blue',
			],
			'description' => '<p>' . esc_html__( 'Every review platform you have connected returned its rating on the last check.', 'b-testimonials-block' ) . '</p>',
			'actions'     => '',
			'test'        => 'bpbtb_review_sources',
		];

		$problems = self::problems();

		if ( ! $problems ) {
			if ( ! class_exists( 'BPBTB_Review_Sources' ) ) {
				return $result;
			}

			$any = false;
			foreach ( array_keys( BPBTB_Review_Sources::platforms() ) as $slug ) {
				if ( BPBTB_Review_Sources::is_connected( $slug ) && BPBTB_Review_Sources::is_live_source( $slug ) ) {
					$any = true;
					break;
				}
			}

			if ( ! $any ) {
				$result['label']       = __( 'No review platforms are connected', 'b-testimonials-block' );
				$result['description'] = '<p>' . esc_html__( 'Nothing to check. Rating badges are showing the figures you typed, or their placeholder ones. This is not a problem — it is only worth knowing if you expected a live score.', 'b-testimonials-block' ) . '</p>';
			}

			return $result;
		}

		$items    = '';
		$inventing = false;

		foreach ( $problems as $problem ) {
			if ( 'local' === $problem['fallback'] ) {
				$inventing = true;
			}

			$items .= '<li><strong>' . esc_html( $problem['label'] ) . ':</strong> ' . esc_html( $problem['error'] ) . '</li>';
		}

		// "recommended" rather than "critical": the site works, the pages render,
		// and only the accuracy of a number is affected. Critical is for things
		// that are actually down.
		$result['status']      = 'recommended';
		$result['label']       = __( 'A review platform is not answering', 'b-testimonials-block' );
		$result['description'] = '<p>' . esc_html(
			$inventing
				? __( 'A rating badge could not read its platform and is showing a figure worked out from your own site instead — under that platform\'s logo. Visitors still see a number, which is why this is easy to miss.', 'b-testimonials-block' )
				: __( 'A rating badge could not read its platform and is falling back to the last figure it had, or to the one you entered by hand. Nothing on the page is broken; the number is just not current.', 'b-testimonials-block' )
		) . '</p><ul>' . $items . '</ul>';
		$result['actions']     = sprintf(
			'<p><a href="%s" class="button button-primary">%s</a></p>',
			esc_url( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources' ) ),
			esc_html__( 'Check Review Sources', 'b-testimonials-block' )
		);

		return $result;
	}
}

BPBTB_Source_Health::init();
}
