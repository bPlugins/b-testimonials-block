<?php
/**
 * Connecting a Facebook Page in one click, instead of pasting a token.
 *
 * The Page access token field on the Review Sources screen asks for something
 * most people cannot easily get. Facebook's Graph API Explorer hands out a
 * SHORT-LIVED token by default, and pasting one of those in produces a badge
 * that works for an hour or two and then quietly stops -- which is exactly what
 * happened on the development site: the token expired overnight and the badge
 * carried on showing five stars and a made-up count under the Facebook logo.
 *
 * A long-lived Page token takes three steps nobody should have to know about:
 *
 *   1. a User token with pages_read_engagement and pages_show_list
 *   2. exchanged for a long-lived one via grant_type=fb_exchange_token
 *   3. traded at /me/accounts for the token of a Page you administer
 *
 * A Page token obtained that way does not expire. This file gets one, by handing
 * the OAuth dance to the bridge bPlugins already runs for Business Reviews:
 *
 *   popup   https://api.bplugins.com/facebook-auth/?state=<state>
 *   result  https://api.bplugins.com/wp-json/facebook/v1/get-token?state=<state>
 *
 * The bridge holds the Facebook app credentials, so this plugin ships no app id
 * and no app secret, and the site owner registers nothing with Facebook.
 *
 * ---------------------------------------------------------------------------
 * Where this deliberately differs from the Business Reviews implementation.
 *
 * The state is minted HERE, server-side, and remembered in a transient bound to
 * the user who asked for it. Business Reviews generates it in the browser and
 * accepts whatever comes back, which means an authenticated request carrying an
 * arbitrary `state` can ask the bridge for whatever it is holding under that
 * key. Issuing the value ourselves and refusing any we did not issue closes
 * that: a state is single-use, expires in fifteen minutes, and belongs to one
 * user.
 *
 * The token never reaches the browser. Business Reviews echoes the bridge's
 * response body straight out to JavaScript, so the Page access token passes
 * through the DOM, the network panel, and anything watching either. Here the
 * exchange happens entirely in PHP; the browser is told the Page name and
 * nothing else.
 * ---------------------------------------------------------------------------
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Facebook_Connect' ) ) {

class BPBTB_Facebook_Connect {

	/**
	 * Where the user logs in. Opened in a popup.
	 */
	const BRIDGE_AUTH = 'https://api.bplugins.com/facebook-auth/';

	/**
	 * Where the result is collected, server to server.
	 */
	const BRIDGE_TOKEN = 'https://api.bplugins.com/wp-json/facebook/v1/get-token';

	/**
	 * Transient prefix for an issued state.
	 */
	const STATE_PREFIX = 'bpbtb_fb_state_';

	/**
	 * How long an issued state stays usable.
	 *
	 * Long enough to log in, pick a Page and grant permissions without being
	 * hurried; short enough that an abandoned attempt does not leave a usable
	 * key lying about.
	 */
	const STATE_TTL = 900;

	/**
	 * Hook it up.
	 */
	public static function init() {
		add_action( 'bpbtb_review_source_actions', [ __CLASS__, 'button' ], 10, 2 );
		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'assets' ] );
		add_action( 'wp_ajax_bpbtb_facebook_state', [ __CLASS__, 'issue_state' ] );
		add_action( 'wp_ajax_bpbtb_facebook_token', [ __CLASS__, 'collect' ] );
		add_action( 'admin_post_bpbtb_facebook_disconnect', [ __CLASS__, 'disconnect' ] );
	}

	/**
	 * Is Facebook currently connected?
	 *
	 * @return bool
	 */
	private static function connected() {
		return class_exists( 'BPBTB_Review_Sources' )
			&& BPBTB_Review_Sources::is_connected( 'facebook' );
	}

	/**
	 * Did the last read of Facebook fail?
	 *
	 * Read out of the cached result, never fetched -- BPBTB_Review_Sources::get_data()
	 * makes an HTTP request when is_admin() is true, and this runs while the
	 * settings screen is being drawn.
	 *
	 * This is what turns a dead token into one click instead of two. A token that
	 * has expired still fills both fields, so the card reads as "connected" and
	 * used to offer nothing but Disconnect -- leaving the person who came here to
	 * fix it to disconnect first and reconnect after, for no reason.
	 *
	 * @return bool
	 */
	private static function failing() {
		if ( ! class_exists( 'BPBTB_Review_Sources' ) || ! self::connected() ) {
			return false;
		}

		$cache = get_option( BPBTB_Review_Sources::CACHE, [] );
		$cache = is_array( $cache ) ? $cache : [];

		return ! empty( $cache['facebook']['error'] );
	}

	/**
	 * The button on Facebook's card.
	 *
	 * @param string $slug     Platform slug.
	 * @param array  $platform Platform definition.
	 */
	public static function button( $slug, $platform ) {
		if ( 'facebook' !== $slug || ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$connected = self::connected();

		// Connected and working: the only thing left to offer is undoing it.
		if ( $connected && ! self::failing() ) {
			?>
			<a class="bpbtb-btn is-ghost" href="<?php echo esc_url( self::disconnect_url() ); ?>">
				<?php esc_html_e( 'Disconnect Facebook', 'b-testimonials-block' ); ?>
			</a>
			<?php
			return;
		}
		?>
		<button type="button" class="bpbtb-btn is-ghost" id="bpbtb-fb-connect">
			<?php
			echo esc_html(
				$connected
					? __( 'Reconnect with Facebook', 'b-testimonials-block' )
					: __( 'Connect with Facebook', 'b-testimonials-block' )
			);
			?>
		</button>
		<?php if ( $connected ) : ?>
			<a class="bpbtb-cat-note" href="<?php echo esc_url( self::disconnect_url() ); ?>">
				<?php esc_html_e( 'or disconnect', 'b-testimonials-block' ); ?>
			</a>
		<?php endif; ?>
		<span class="bpbtb-cat-note" id="bpbtb-fb-status" role="status" aria-live="polite"></span>
		<?php
	}

	/**
	 * The nonced disconnect link.
	 *
	 * @return string
	 */
	private static function disconnect_url() {
		return wp_nonce_url(
			add_query_arg( 'action', 'bpbtb_facebook_disconnect', admin_url( 'admin-post.php' ) ),
			'bpbtb_facebook_disconnect'
		);
	}

	/**
	 * The popup-and-collect script, on the Review Sources screen only.
	 *
	 * @param string $hook Current admin page hook.
	 */
	public static function assets( $hook ) {
		if ( false === strpos( (string) $hook, 'bpbtb-review-sources' ) ) {
			return;
		}

		// Loaded when there is a button to drive: no connection yet, or one that
		// has stopped working and needs replacing.
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( self::connected() && ! self::failing() ) {
			return;
		}

		/*
		 * A handle of its own, with no file behind it, printed in the footer.
		 *
		 * Not hung off `jquery`: nothing here uses jQuery, and jQuery is printed
		 * in the admin <head> -- so an inline script attached to it would run
		 * document.getElementById() before the button it is looking for has been
		 * parsed, and the button would silently never work.
		 */
		wp_register_script( 'bpbtb-facebook-connect', '', [], BPBTB_PLUGIN_VERSION, true );
		wp_enqueue_script( 'bpbtb-facebook-connect' );

		$data = wp_json_encode(
			[
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'bpbtb_facebook_connect' ),
				'i18n'    => [
					'opening'  => __( 'Opening Facebook…', 'b-testimonials-block' ),
					'waiting'  => __( 'Waiting for Facebook…', 'b-testimonials-block' ),
					'finishing' => __( 'Finishing up…', 'b-testimonials-block' ),
					'blocked'  => __( 'The popup was blocked. Allow popups for this site and try again.', 'b-testimonials-block' ),
					'failed'   => __( 'Could not connect.', 'b-testimonials-block' ),
					'done'     => __( 'Connected. Reloading…', 'b-testimonials-block' ),
				],
			]
		);

		/*
		 * The state is not generated here. It is asked for, so that the value
		 * the popup carries is one the server minted and will recognise -- see
		 * the note at the top of this file.
		 */
		$js = <<<JS
( function () {
	var cfg = {$data};
	var btn = document.getElementById( 'bpbtb-fb-connect' );
	var out = document.getElementById( 'bpbtb-fb-status' );

	if ( ! btn ) {
		return;
	}

	function say( text ) {
		if ( out ) {
			out.textContent = text;
		}
	}

	function post( action, body ) {
		body = body || {};
		body.action = action;
		body.nonce = cfg.nonce;

		return window.fetch( cfg.ajaxUrl, {
			method: 'POST',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams( body ).toString()
		} ).then( function ( r ) {
			return r.json();
		} );
	}

	btn.addEventListener( 'click', function () {
		btn.disabled = true;
		say( cfg.i18n.opening );

		post( 'bpbtb_facebook_state' ).then( function ( res ) {
			if ( ! res || ! res.success ) {
				throw new Error( ( res && res.data && res.data.message ) || cfg.i18n.failed );
			}

			var width = 670;
			var height = 560;
			var left = Math.max( 0, ( window.screen.width - width ) / 2 );
			var top = Math.max( 0, ( window.screen.height - height ) / 2 );

			var win = window.open(
				res.data.url,
				'bpbtb_facebook_login',
				'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left + ',resizable=yes,scrollbars=yes'
			);

			if ( ! win ) {
				throw new Error( cfg.i18n.blocked );
			}

			say( cfg.i18n.waiting );

			// Polling for the popup to close is the only signal available:
			// the bridge is on another origin, so it cannot postMessage back
			// and its document cannot be read from here.
			var poll = window.setInterval( function () {
				if ( ! win.closed ) {
					return;
				}

				window.clearInterval( poll );
				say( cfg.i18n.finishing );

				post( 'bpbtb_facebook_token', { state: res.data.state } ).then( function ( done ) {
					if ( done && done.success ) {
						say( cfg.i18n.done );
						window.location.reload();
						return;
					}

					btn.disabled = false;
					say( ( done && done.data && done.data.message ) || cfg.i18n.failed );
				} ).catch( function () {
					btn.disabled = false;
					say( cfg.i18n.failed );
				} );
			}, 500 );
		} ).catch( function ( e ) {
			btn.disabled = false;
			say( e.message || cfg.i18n.failed );
		} );
	} );
}() );
JS;

		wp_add_inline_script( 'bpbtb-facebook-connect', $js );
	}

	/**
	 * Mint a state, remember whose it is, and hand back the popup URL.
	 */
	public static function issue_state() {
		self::guard();

		// 32 characters from wp_generate_password()'s alphanumeric set. Not
		// Math.random() in a browser: this value is the only thing standing
		// between a request and whatever the bridge is holding.
		$state = wp_generate_password( 32, false, false );

		set_transient( self::STATE_PREFIX . $state, get_current_user_id(), self::STATE_TTL );

		wp_send_json_success(
			[
				'state' => $state,
				'url'   => add_query_arg( 'state', $state, self::BRIDGE_AUTH ),
			]
		);
	}

	/**
	 * Collect the token from the bridge and store it.
	 */
	public static function collect() {
		self::guard();

		$state = isset( $_POST['state'] ) ? sanitize_text_field( wp_unslash( $_POST['state'] ) ) : '';
		$key   = self::STATE_PREFIX . $state;
		$owner = $state ? get_transient( $key ) : false;

		// A state we did not issue, one that has expired, or one belonging to
		// somebody else. All three are the same answer.
		if ( ! $owner || (int) $owner !== get_current_user_id() ) {
			wp_send_json_error(
				[ 'message' => __( 'That login attempt has expired. Press Connect and try again.', 'b-testimonials-block' ) ],
				400
			);
		}

		// Single use, whatever happens next.
		delete_transient( $key );

		$response = wp_remote_get(
			add_query_arg( 'state', $state, self::BRIDGE_TOKEN ),
			[ 'timeout' => 20 ]
		);

		if ( is_wp_error( $response ) ) {
			wp_send_json_error(
				[
					'message' => sprintf(
						/* translators: %s: transport error */
						__( 'Could not reach the authorisation service: %s', 'b-testimonials-block' ),
						$response->get_error_message()
					),
				],
				502
			);
		}

		$body = json_decode( wp_remote_retrieve_body( $response ), true );

		if ( ! is_array( $body ) ) {
			wp_send_json_error(
				[ 'message' => __( 'The authorisation service returned something unreadable.', 'b-testimonials-block' ) ],
				502
			);
		}

		// The bridge reports its own failures in a `message`, and Facebook's in
		// an `error` object. Either is more useful than a status code.
		if ( isset( $body['error'] ) ) {
			$message = is_array( $body['error'] ) && ! empty( $body['error']['message'] )
				? (string) $body['error']['message']
				: __( 'Facebook rejected the request.', 'b-testimonials-block' );

			wp_send_json_error( [ 'message' => $message ], 400 );
		}

		$token = trim( (string) ( $body['page_access_token'] ?? '' ) );
		$page  = trim( (string) ( $body['page_id'] ?? '' ) );

		if ( '' === $token || '' === $page ) {
			wp_send_json_error(
				[
					'message' => __( 'Facebook did not return a Page. The account you logged in with needs to administer at least one Page, and the Page needs recommendations switched on.', 'b-testimonials-block' ),
				],
				400
			);
		}

		self::store( $page, $token );

		// The name is the one thing worth telling the browser -- it confirms the
		// right Page was picked. The token stays on the server.
		wp_send_json_success(
			[ 'page' => sanitize_text_field( (string) ( $body['page_name'] ?? '' ) ) ]
		);
	}

	/**
	 * Write the credentials into the Review Sources option.
	 *
	 * Merged rather than replaced: this option holds every platform's fields,
	 * and connecting Facebook must not disturb a Google key sitting beside it.
	 *
	 * @param string $page_id Page id.
	 * @param string $token   Page access token.
	 */
	private static function store( $page_id, $token ) {
		if ( ! class_exists( 'BPBTB_Review_Sources' ) ) {
			return;
		}

		$stored = get_option( BPBTB_Review_Sources::OPTION, [] );
		$stored = is_array( $stored ) ? $stored : [];

		$facebook = isset( $stored['facebook'] ) && is_array( $stored['facebook'] ) ? $stored['facebook'] : [];

		$facebook['page_id']      = sanitize_text_field( $page_id );
		$facebook['access_token'] = sanitize_text_field( $token );

		$stored['facebook'] = $facebook;

		update_option( BPBTB_Review_Sources::OPTION, $stored );

		// The badge is holding the old failure. Drop it so the card on this
		// screen shows the new figure rather than yesterday's error.
		BPBTB_Review_Sources::flush_cache();
		delete_transient( 'bpbtb_imported_reviews_facebook' );

		if ( class_exists( 'BPBTB_Review_Import' ) ) {
			BPBTB_Review_Import::remember_error( 'facebook', '' );
		}
	}

	/**
	 * Clear Facebook's credentials.
	 */
	public static function disconnect() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do that.', 'b-testimonials-block' ), '', [ 'response' => 403 ] );
		}

		check_admin_referer( 'bpbtb_facebook_disconnect' );

		if ( class_exists( 'BPBTB_Review_Sources' ) ) {
			$stored = get_option( BPBTB_Review_Sources::OPTION, [] );
			$stored = is_array( $stored ) ? $stored : [];

			$stored['facebook'] = [ 'page_id' => '', 'access_token' => '' ];

			update_option( BPBTB_Review_Sources::OPTION, $stored );
			BPBTB_Review_Sources::flush_cache();
		}

		delete_transient( 'bpbtb_imported_reviews_facebook' );

		if ( class_exists( 'BPBTB_Review_Import' ) ) {
			BPBTB_Review_Import::remember_error( 'facebook', '' );
		}

		wp_safe_redirect( admin_url( 'edit.php?post_type=testimonial&page=bpbtb-review-sources&msg=saved' ) );
		exit;
	}

	/**
	 * Capability and nonce, for both AJAX endpoints.
	 *
	 * Registered on `wp_ajax_` only, never `wp_ajax_nopriv_` -- there is no
	 * version of this that a logged-out visitor has any business calling.
	 */
	private static function guard() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( [ 'message' => __( 'You are not allowed to do that.', 'b-testimonials-block' ) ], 403 );
		}

		$nonce = isset( $_POST['nonce'] ) ? sanitize_text_field( wp_unslash( $_POST['nonce'] ) ) : '';

		if ( ! wp_verify_nonce( $nonce, 'bpbtb_facebook_connect' ) ) {
			wp_send_json_error( [ 'message' => __( 'This page has been open too long. Reload it and try again.', 'b-testimonials-block' ) ], 403 );
		}
	}
}

BPBTB_Facebook_Connect::init();
}
