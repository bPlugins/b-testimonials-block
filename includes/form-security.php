<?php
/**
 * Guards on the public testimonial submission endpoint.
 *
 * `bptmb/v1/submit` has `permission_callback => __return_true`, which it must:
 * the whole point is that a stranger can leave a review. That makes it the one
 * place in the plugin where an anonymous request creates a database row, and it
 * had nothing in front of it but a nonce -- which any visitor can read off the
 * page. Measured before this file existed: six scripted submissions in a row,
 * all accepted, in under a second.
 *
 * A nonce stops a third-party site posting on a visitor's behalf. It does not
 * stop a script that has read the page, and that is the threat here, so the
 * defences are the ones that cost a bot something:
 *
 *   Honeypot     A field a person never sees and a form-filler always fills.
 *   Time gate    A signed mint-time; nobody reads a form and writes a review
 *                in under three seconds.
 *   Link cap     Paid-link spam is the reason this endpoint gets attacked.
 *   Rate limit   Per IP per hour, so a determined script gets a handful of
 *                rows rather than a filled disk.
 *   Duplicates   The same text twice from the same address is a retry loop.
 *   Length caps  post_content was unbounded.
 *   Upload gate  An upload was accepted even when the block had switched the
 *                photo field off, which is every block by default.
 *
 * No CAPTCHA, deliberately. It is the one measure that costs the honest
 * submitter more than the bot, and this form exists to be filled in.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'BPBTB_Form_Security' ) ) {

class BPBTB_Form_Security {

	/**
	 * The honeypot's field name.
	 *
	 * Plausible enough that a form-filler wants to complete it, and not a name
	 * the real form uses anywhere.
	 */
	const HONEYPOT = 'btb_url';

	/**
	 * Seconds a form must have been on screen before a submission is believable.
	 */
	const MIN_AGE = 3;

	/**
	 * Seconds after which a form's token is stale. A tab left open all day is
	 * legitimate; a token replayed a week later is not.
	 */
	const MAX_AGE = 43200; // 12 hours.

	/**
	 * Submissions allowed from one IP per hour.
	 */
	const RATE_LIMIT = 5;

	/**
	 * Links tolerated in a review body.
	 */
	const MAX_LINKS = 2;

	/**
	 * Largest photo accepted, in bytes.
	 */
	const MAX_IMAGE_BYTES = 2097152; // 2 MB.

	/**
	 * Field length caps, in characters.
	 *
	 * @return array<string,int>
	 */
	public static function limits() {
		return (array) apply_filters(
			'bpbtb_form_field_limits',
			[
				'name'        => 100,
				'review'      => 5000,
				'designation' => 100,
				'company'     => 100,
				'email'       => 254, // The longest a valid address can be.
			]
		);
	}

	/**
	 * Mint the signed token a rendered form carries.
	 *
	 * It states when the form was drawn and whether that form offered a photo
	 * field. Both are things the server needs to trust and the browser must not
	 * be able to change, so they are signed with the site's salts rather than
	 * sent as plain values -- `wp_hash()` on a payload the client cannot forge
	 * without knowing them.
	 *
	 * @param bool $allow_image Whether this form renders a photo field.
	 * @return string
	 */
	public static function mint_token( $allow_image = false ) {
		$payload = wp_json_encode(
			[
				't'   => time(),
				'img' => $allow_image ? 1 : 0,
			]
		);

		// URL-safe base64, so the token survives a form post untouched.
		$body = rtrim( strtr( base64_encode( $payload ), '+/', '-_' ), '=' );

		return $body . '.' . wp_hash( $body );
	}

	/**
	 * Read a token back, or false if it was not minted here.
	 *
	 * @param string $token Token as posted.
	 * @return array|false
	 */
	private static function read_token( $token ) {
		$token = is_scalar( $token ) ? (string) $token : '';

		if ( ! $token || false === strpos( $token, '.' ) ) {
			return false;
		}

		list( $body, $signature ) = explode( '.', $token, 2 );

		// hash_equals, not ===, so a wrong signature takes the same time to
		// reject as a right one and cannot be guessed a byte at a time.
		if ( ! hash_equals( wp_hash( $body ), $signature ) ) {
			return false;
		}

		$json = base64_decode( strtr( $body, '-_', '+/' ), true );

		if ( ! $json ) {
			return false;
		}

		$data = json_decode( $json, true );

		return is_array( $data ) && isset( $data['t'] ) ? $data : false;
	}

	/**
	 * The submitter's address, as far as it can be known.
	 *
	 * Only REMOTE_ADDR. The forwarding headers a reverse proxy sets are also
	 * the headers a client can invent, so trusting them would hand any script
	 * an unlimited supply of fresh rate-limit buckets. Sites behind a proxy that
	 * rewrites REMOTE_ADDR can correct this through the filter.
	 *
	 * @return string
	 */
	private static function client_ip() {
		$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';

		return (string) apply_filters( 'bpbtb_form_client_ip', $ip );
	}

	/**
	 * Transient key for one client, keyed by a hash rather than the address.
	 *
	 * An IP is personal data; a submission counter does not need to store one
	 * to do its job.
	 *
	 * @param string $suffix Bucket name.
	 * @return string
	 */
	private static function bucket( $suffix ) {
		return 'bpbtb_fs_' . $suffix . '_' . substr( md5( self::client_ip() . wp_salt() ), 0, 16 );
	}

	/**
	 * Count the links in a body, however they are written.
	 *
	 * Bare hostnames count: spam that has learnt to drop the scheme is still
	 * spam, and a genuine review rarely names three domains.
	 *
	 * @param string $text Review body.
	 * @return int
	 */
	private static function count_links( $text ) {
		$patterns = [
			'#https?://#i',
			'#\[url[\s=\]]#i',
			'#<a\s#i',
			'#\bwww\.[a-z0-9-]+\.[a-z]{2,}#i',
		];

		$total = 0;

		foreach ( $patterns as $pattern ) {
			$total += preg_match_all( $pattern, $text );
		}

		return $total;
	}

	/**
	 * Trim a field to its cap, without splitting a multibyte character.
	 *
	 * mb_substr where it exists: cutting a Bangla, Arabic or emoji string at a
	 * byte offset leaves a broken character behind, which is both wrong and a
	 * way to smuggle malformed input past a later check.
	 *
	 * @param string $value Field value.
	 * @param int    $limit Characters allowed.
	 * @return string
	 */
	public static function cap( $value, $limit ) {
		$value = (string) $value;

		if ( function_exists( 'mb_substr' ) ) {
			return mb_substr( $value, 0, $limit );
		}

		return substr( $value, 0, $limit );
	}

	/**
	 * A general per-client throttle, for the other public endpoints.
	 *
	 * The submission form is not the only route in this plugin an anonymous
	 * request can write through, and each of them wants the same counter with a
	 * different name and allowance rather than its own copy of this.
	 *
	 * Consumes one unit when it allows the request, so the caller does not have
	 * to remember to.
	 *
	 * @param string $name   Bucket name, e.g. 'nps'.
	 * @param int    $max    Requests allowed per window.
	 * @param int    $window Window length in seconds.
	 * @return bool True when the request is within its allowance.
	 */
	public static function throttle( $name, $max, $window = HOUR_IN_SECONDS ) {
		$key   = self::bucket( sanitize_key( $name ) );
		$count = (int) get_transient( $key );

		if ( $count >= (int) $max ) {
			return false;
		}

		set_transient( $key, $count + 1, (int) $window );

		return true;
	}

	/**
	 * Run every guard against a submission.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return true|WP_Error True when the submission may proceed.
	 */
	public static function check( $request ) {
		$params = $request->get_params();

		/**
		 * Skip the guards entirely.
		 *
		 * For a site that has put its own protection in front of this route, or
		 * an integration posting from trusted server-side code.
		 *
		 * @param bool            $bypass  Whether to skip the checks.
		 * @param WP_REST_Request $request The request.
		 */
		if ( apply_filters( 'bpbtb_form_skip_security', false, $request ) ) {
			return true;
		}

		// 1. Honeypot. A person cannot fill a field they cannot see.
		if ( ! empty( $params[ self::HONEYPOT ] ) ) {
			return new WP_Error(
				'bpbtb_spam',
				__( 'Your submission looked automated. Please try again.', 'b-testimonials-block' )
			);
		}

		// 2. The signed token, and how long the form was on screen.
		$token = self::read_token( $params['bpbtb_token'] ?? '' );

		if ( ! $token ) {
			return new WP_Error(
				'bpbtb_bad_token',
				__( 'This form has expired. Please refresh the page and try again.', 'b-testimonials-block' )
			);
		}

		$age = time() - (int) $token['t'];

		if ( $age < self::MIN_AGE ) {
			return new WP_Error(
				'bpbtb_too_fast',
				__( 'That was submitted too quickly. Please try again.', 'b-testimonials-block' )
			);
		}

		if ( $age > self::MAX_AGE ) {
			return new WP_Error(
				'bpbtb_stale',
				__( 'This form has expired. Please refresh the page and try again.', 'b-testimonials-block' )
			);
		}

		// 3. Link spam.
		$review = isset( $params['review'] ) ? (string) $params['review'] : '';

		if ( self::count_links( $review ) > self::MAX_LINKS ) {
			return new WP_Error(
				'bpbtb_links',
				__( 'Please remove the links from your review.', 'b-testimonials-block' )
			);
		}

		// 4. Rate limit. Counted before the duplicate check so a retry loop
		// still burns its allowance.
		$rate_key = self::bucket( 'rate' );
		$count    = (int) get_transient( $rate_key );

		if ( $count >= self::RATE_LIMIT ) {
			return new WP_Error(
				'bpbtb_rate_limited',
				__( 'You have already submitted several reviews. Please try again later.', 'b-testimonials-block' )
			);
		}

		// 5. The same text twice from the same place.
		$dupe_key = self::bucket( 'dupe' );
		$digest   = md5( strtolower( trim( wp_strip_all_tags( $review ) ) ) );

		if ( $digest === get_transient( $dupe_key ) ) {
			return new WP_Error(
				'bpbtb_duplicate',
				__( 'That review has already been submitted. Thank you.', 'b-testimonials-block' )
			);
		}

		set_transient( $rate_key, $count + 1, HOUR_IN_SECONDS );
		set_transient( $dupe_key, $digest, HOUR_IN_SECONDS );

		return true;
	}

	/**
	 * Whether a submission may carry a photo, and whether this one is usable.
	 *
	 * @param WP_REST_Request $request Request.
	 * @return bool
	 */
	public static function may_upload( $request ) {
		$token = self::read_token( $request->get_param( 'bpbtb_token' ) );

		// The form that was rendered did not offer a photo field, so no upload
		// is expected from it -- whatever the request says it is carrying.
		if ( ! $token || empty( $token['img'] ) ) {
			return false;
		}

		$files = $request->get_file_params();

		if ( empty( $files['image']['name'] ) || empty( $files['image']['tmp_name'] ) ) {
			return false;
		}

		if ( (int) ( $files['image']['size'] ?? 0 ) > self::MAX_IMAGE_BYTES ) {
			return false;
		}

		// The bytes must actually be an image, not merely be named like one.
		// media_handle_upload() checks the mime as well; this rejects it before
		// anything is written to the uploads directory.
		$check = wp_check_filetype_and_ext(
			$files['image']['tmp_name'],
			(string) $files['image']['name'],
			[
				'jpg|jpeg' => 'image/jpeg',
				'png'      => 'image/png',
				'gif'      => 'image/gif',
				'webp'     => 'image/webp',
			]
		);

		return ! empty( $check['ext'] ) && ! empty( $check['type'] );
	}
}
}
