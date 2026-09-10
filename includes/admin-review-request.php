<?php
/**
 * The one-time "how are we doing?" notice.
 *
 * The plugin has no ratings on WordPress.org, and the directory's search ranking
 * leans on them heavily -- an unrated plugin is close to invisible next to a
 * competitor with six hundred reviews. Asking is the only way that changes.
 *
 * Asking badly, though, is worse than not asking. The rules this notice keeps
 * to, which are also the directory's guidelines:
 *
 *   - Ask once the plugin has actually been used, not on activation.
 *   - Ask on our own screens, never across the whole admin.
 *   - Ask the person who can act on it, not every subscriber.
 *   - Take no for an answer, permanently.
 *   - Offer a way to reach support instead, because someone about to leave two
 *     stars would rather be helped than published.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Review request notice.
 */
if ( ! class_exists( 'BPBTB_Review_Request' ) ) {
class BPBTB_Review_Request {

	const INSTALLED_OPTION = 'bpbtb_first_seen';
	const STATE_OPTION     = 'bpbtb_review_state';
	const NONCE            = 'bpbtb_review_notice';
	const REVIEW_URL       = 'https://wordpress.org/support/plugin/b-testimonials-block/reviews/#new-post';
	const SUPPORT_URL      = 'https://bplugins.com/support/';

	/**
	 * Days of use before the question is asked at all.
	 */
	const DAYS_BEFORE_ASKING = 7;

	/**
	 * Days added by "maybe later".
	 */
	const SNOOZE_DAYS = 14;

	/**
	 * Hook up.
	 */
	public static function init() {
		add_action( 'admin_init', [ __CLASS__, 'remember_first_seen' ] );
		add_action( 'admin_notices', [ __CLASS__, 'maybe_render' ] );
		add_action( 'wp_ajax_bpbtb_review_respond', [ __CLASS__, 'handle_response' ] );
	}

	/**
	 * Record when this site first saw the plugin.
	 *
	 * Done lazily here rather than on activation so that sites which already had
	 * the plugin before this release get a clock too -- starting now, which errs
	 * towards asking later rather than ambushing someone on upgrade day.
	 */
	public static function remember_first_seen() {
		if ( ! get_option( self::INSTALLED_OPTION ) ) {
			update_option( self::INSTALLED_OPTION, time(), false );
		}
	}

	/**
	 * Screens the notice is allowed to appear on.
	 *
	 * Our own pages, the testimonial post type, and the plugins list -- which is
	 * where someone is already thinking about the plugins they run.
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

		if ( 'plugins' === $screen->base ) {
			return true;
		}

		if ( isset( $screen->post_type ) && 'testimonial' === $screen->post_type ) {
			return true;
		}

		return false !== strpos( (string) $screen->id, 'b-testimonials-block' )
			|| false !== strpos( (string) $screen->id, 'bpbtb' );
	}

	/**
	 * Whether the plugin has actually been put to work.
	 *
	 * Two signals, either of which is enough: a testimonial has been entered, or
	 * a block has been saved into a published page. Someone who activated the
	 * plugin and never came back has no opinion worth asking for.
	 *
	 * Cached for a day -- a LIKE across post_content is not something to run on
	 * every admin page load.
	 *
	 * @return bool
	 */
	private static function has_been_used() {
		$cached = get_transient( 'bpbtb_usage_signal' );

		if ( false !== $cached ) {
			return (bool) $cached;
		}

		$used = (bool) wp_count_posts( 'testimonial' )->publish;

		if ( ! $used ) {
			global $wpdb;

			$like = '%' . $wpdb->esc_like( 'wp:bptmb/' ) . '%';

			// phpcs:ignore WordPress.DB.DirectDatabaseQuery.DirectQuery, WordPress.DB.DirectDatabaseQuery.NoCaching -- cached in the transient below.
			$used = (bool) $wpdb->get_var(
				$wpdb->prepare(
					"SELECT ID FROM {$wpdb->posts} WHERE post_status = 'publish' AND post_content LIKE %s LIMIT 1",
					$like
				)
			);
		}

		set_transient( 'bpbtb_usage_signal', $used ? 1 : 0, DAY_IN_SECONDS );

		return $used;
	}

	/**
	 * Whether to show the notice on this request.
	 *
	 * @return bool
	 */
	private static function should_ask() {
		if ( ! current_user_can( 'manage_options' ) || ! self::on_our_screen() ) {
			return false;
		}

		$state = get_option( self::STATE_OPTION, '' );

		// 'done' covers both "reviewed" and "no thanks". Neither is asked again.
		if ( 'done' === $state ) {
			return false;
		}

		// A snooze is stored as the timestamp it expires at.
		if ( is_numeric( $state ) && time() < (int) $state ) {
			return false;
		}

		$first_seen = (int) get_option( self::INSTALLED_OPTION, 0 );

		if ( ! $first_seen || time() - $first_seen < self::DAYS_BEFORE_ASKING * DAY_IN_SECONDS ) {
			return false;
		}

		return self::has_been_used();
	}

	/**
	 * Print the notice.
	 */
	public static function maybe_render() {
		if ( ! self::should_ask() ) {
			return;
		}

		$nonce = wp_create_nonce( self::NONCE );
		?>
		<div class="notice notice-info is-dismissible bpbtb-review-notice" data-nonce="<?php echo esc_attr( $nonce ); ?>">
			<p>
				<strong><?php esc_html_e( 'Enjoying Testimonials Block?', 'b-testimonials-block' ); ?></strong>
			</p>
			<p>
				<?php esc_html_e( 'It is built and supported by a small team, and a rating on WordPress.org is the single most useful thing you can do for it. It takes about a minute.', 'b-testimonials-block' ); ?>
			</p>
			<p>
				<a href="<?php echo esc_url( self::REVIEW_URL ); ?>" class="button button-primary" target="_blank" rel="noopener noreferrer" data-bpbtb-review="done">
					<?php esc_html_e( 'Sure, leave a review', 'b-testimonials-block' ); ?>
				</a>
				<a href="#" class="button" data-bpbtb-review="later">
					<?php esc_html_e( 'Maybe later', 'b-testimonials-block' ); ?>
				</a>
				<a href="<?php echo esc_url( self::SUPPORT_URL ); ?>" class="button" target="_blank" rel="noopener noreferrer" data-bpbtb-review="done">
					<?php esc_html_e( 'I need help first', 'b-testimonials-block' ); ?>
				</a>
				<a href="#" class="button-link" data-bpbtb-review="done" style="margin-left:8px;">
					<?php esc_html_e( 'No thanks', 'b-testimonials-block' ); ?>
				</a>
			</p>
		</div>
		<script>
		( function () {
			var notice = document.querySelector( '.bpbtb-review-notice' );

			if ( ! notice ) {
				return;
			}

			function respond( answer ) {
				var body = new FormData();
				body.append( 'action', 'bpbtb_review_respond' );
				body.append( 'answer', answer );
				body.append( 'nonce', notice.dataset.nonce );

				/*
				 * keepalive so the answer still reaches the server when the
				 * click also navigates this tab away -- which is exactly what
				 * the "leave a review" button does.
				 */
				window.fetch( <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>, {
					method: 'POST',
					credentials: 'same-origin',
					keepalive: true,
					body: body
				} );
			}

			notice.addEventListener( 'click', function ( e ) {
				var target = e.target.closest( '[data-bpbtb-review]' );

				if ( ! target ) {
					return;
				}

				respond( target.dataset.bpbtbReview );

				// Only swallow the click for the in-place answers; the two real
				// links must still open.
				if ( ! target.getAttribute( 'href' ) || '#' === target.getAttribute( 'href' ) ) {
					e.preventDefault();
				}

				notice.parentNode.removeChild( notice );
			} );

			// The core dismiss cross counts as "maybe later", not as a refusal.
			notice.addEventListener( 'click', function ( e ) {
				if ( e.target.classList.contains( 'notice-dismiss' ) ) {
					respond( 'later' );
				}
			} );
		}() );
		</script>
		<?php
	}

	/**
	 * Record the answer.
	 */
	public static function handle_response() {
		check_ajax_referer( self::NONCE, 'nonce' );

		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( null, 403 );
		}

		$answer = isset( $_POST['answer'] ) ? sanitize_key( wp_unslash( $_POST['answer'] ) ) : '';

		if ( 'later' === $answer ) {
			update_option( self::STATE_OPTION, time() + self::SNOOZE_DAYS * DAY_IN_SECONDS, false );
		} else {
			update_option( self::STATE_OPTION, 'done', false );
		}

		wp_send_json_success();
	}
}
}

BPBTB_Review_Request::init();
