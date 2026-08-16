<?php
/**
 * Standalone preview page for a single block, used by the Demo & Help screen.
 *
 * The Demos route used to point every card at an external demo site. That host
 * (b-testimonials.bplugins.com) has no DNS record, so all of its previews opened
 * an unreachable page -- and even a working external site would drift out of
 * step with the blocks as they change.
 *
 * This renders the real block from this install instead: the preview is live and
 * interactive (sliders slide, the poll takes a click, the marquee scrolls), it
 * cannot go stale, and it needs no network at all.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Query var that triggers the preview.
 */
if ( ! defined( 'BPBTB_DEMO_QUERY_VAR' ) ) {
	define( 'BPBTB_DEMO_QUERY_VAR', 'bpbtb_demo' );
}

/**
 * Query var that streams a generated clip for the Audio Testimonials preview.
 */
if ( ! defined( 'BPBTB_DEMO_AUDIO_QUERY_VAR' ) ) {
	define( 'BPBTB_DEMO_AUDIO_QUERY_VAR', 'bpbtb_demo_audio' );
}

/**
 * The blocks that may be previewed: this plugin's own, straight from the
 * registry, so the list cannot drift from what is actually registered.
 *
 * Keyed by the part of the block name after the `bptmb/` prefix. Most match
 * their directory, but not all -- `src/blocks/testimonials` registers
 * `bptmb/b-testimonials` -- which is why the registry is the source of truth
 * rather than a hand-kept list.
 *
 * @return array<string, string> preview slug => full block name.
 */
if ( ! function_exists( 'bpbtb_demo_previewable_blocks' ) ) {
function bpbtb_demo_previewable_blocks() {
	$blocks = [];

	if ( ! class_exists( 'WP_Block_Type_Registry' ) ) {
		return $blocks;
	}

	foreach ( WP_Block_Type_Registry::get_instance()->get_all_registered() as $name => $type ) {
		if ( 0 === strpos( $name, 'bptmb/' ) ) {
			$blocks[ substr( $name, strlen( 'bptmb/' ) ) ] = $name;
		}
	}

	return $blocks;
}
}

/**
 * Attributes a block needs before it will render anything worth showing.
 *
 * Nearly every block previews correctly on its defaults. The exception is the
 * headline `bptmb/b-testimonials`, which is a picker: with no child block chosen
 * and classic mode never set, its render.php deliberately returns nothing, so
 * that an unfinished block in a draft does not publish a placeholder
 * testimonial. Asking for classic mode is what the editor's own "Switch to
 * Classic Single Block Mode" link does, and it is the only way to see that block
 * render at all.
 *
 * @param string $slug Preview slug.
 * @return array Attributes to set on the previewed block, possibly empty.
 */
if ( ! function_exists( 'bpbtb_demo_preview_attributes' ) ) {
function bpbtb_demo_preview_attributes( $slug ) {
	$attributes = [];

	if ( 'b-testimonials' === $slug ) {
		$attributes['useClassicEditor'] = true;
	}

	if ( in_array( $slug, bpbtb_demo_multi_item_blocks(), true ) ) {
		$attributes['items'] = bpbtb_demo_items();
	}

	if ( 'client-logos' === $slug ) {
		$attributes['logos'] = bpbtb_demo_logos();
	}

	if ( 'case-study-card' === $slug ) {
		$attributes['items'] = bpbtb_demo_case_studies();
	}

	if ( 'video-testimonials' === $slug ) {
		$attributes['items'] = bpbtb_demo_videos();
	}

	if ( 'audio-testimonials' === $slug ) {
		$attributes['items'] = bpbtb_demo_audio_items();
	}

	if ( 'before-after' === $slug ) {
		$attributes['beforeImg'] = [ 'url' => bpbtb_demo_compare_image( 'BEFORE', '#64748b', '#334155', '#94a3b8' ) ];
		$attributes['afterImg']  = [ 'url' => bpbtb_demo_compare_image( 'AFTER', '#146ef5', '#0b3f9e', '#7cc0ff' ) ];
	}

	return $attributes;
}
}

/**
 * A flat initials avatar, inline as a data URI.
 *
 * The blocks' own placeholder avatar is hosted on templates.bplugins.com. That
 * is fine as a block default, but it made the previews depend on a third-party
 * host: measured at 1.5s to fetch, which held the demo modal's loading spinner
 * up until it arrived, and would leave a broken image on a site with no outbound
 * access. Drawing the avatar here keeps a preview entirely local.
 *
 * @param string $initials Two letters.
 * @param string $bg       Circle fill.
 * @return string data: URI.
 */
if ( ! function_exists( 'bpbtb_demo_avatar' ) ) {
function bpbtb_demo_avatar( $initials, $bg ) {
	$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">'
		. '<circle cx="60" cy="60" r="60" fill="' . esc_attr( $bg ) . '"/>'
		. '<text x="60" y="62" text-anchor="middle" dominant-baseline="central"'
		. ' font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"'
		. ' font-size="44" font-weight="600" fill="#ffffff">' . esc_html( $initials ) . '</text>'
		. '</svg>';

	// Base64 rather than raw: the markup travels through a JSON block comment
	// and a `data-attributes` HTML attribute, and `#` in a colour would end the
	// URI early if it were left unencoded.
	return 'data:image/svg+xml;base64,' . base64_encode( $svg ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
}
}

/**
 * A simple wordmark, for the Client Logos preview.
 *
 * The block ships four grey "Logo" placeholders, which show the grid but not
 * what the block is for. These are wordmarks for the same invented companies the
 * sample reviews come from, so the demo reads as one coherent set. Invented on
 * purpose -- shipping real companies' marks in a plugin would be using their
 * trademarks without permission.
 *
 * @param string $text Company name.
 * @param string $fg   Text colour.
 * @return string data: URI.
 */
if ( ! function_exists( 'bpbtb_demo_logo' ) ) {
function bpbtb_demo_logo( $text, $fg ) {
	$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="64" viewBox="0 0 200 64">'
		. '<circle cx="26" cy="32" r="13" fill="' . esc_attr( $fg ) . '"/>'
		. '<circle cx="26" cy="32" r="5.5" fill="#ffffff"/>'
		. '<text x="50" y="33" dominant-baseline="central"'
		. ' font-family="-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"'
		. ' font-size="19" font-weight="700" letter-spacing="-0.4"'
		. ' fill="' . esc_attr( $fg ) . '">' . esc_html( $text ) . '</text>'
		. '</svg>';

	return 'data:image/svg+xml;base64,' . base64_encode( $svg ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
}
}

/**
 * Five wordmarks for the Client Logos preview.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_demo_logos' ) ) {
function bpbtb_demo_logos() {
	$brands = [
		[ 'Northwind', '#146ef5' ],
		[ 'Blue Harbour', '#0f57c4' ],
		[ 'Lumen', '#1e293b' ],
		[ 'Vantage', '#475569' ],
	];

	$logos = [];
	foreach ( $brands as $brand ) {
		$logos[] = [
			'img'  => [ 'url' => bpbtb_demo_logo( $brand[0], $brand[1] ) ],
			'link' => '',
		];
	}

	return $logos;
}
}

/**
 * A pair of visibly different images for the Before / After preview.
 *
 * Both `beforeImg` and `afterImg` default to an empty URL, and the component
 * then falls back to the same placeholder photo for each side -- so dragging the
 * handle revealed an identical image and the block appeared to do nothing. These
 * two differ in colour and label, which is the whole point of the comparison.
 *
 * @param string $label  Names the pair; only used to key the gradient id.
 * @param string $from   Gradient start.
 * @param string $to     Gradient end.
 * @param string $accent Colour of the shapes.
 * @return string data: URI.
 */
if ( ! function_exists( 'bpbtb_demo_compare_image' ) ) {
function bpbtb_demo_compare_image( $label, $from, $to, $accent ) {
	$id  = 'g' . substr( md5( $label ), 0, 6 );
	$svg = '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">'
		. '<defs><linearGradient id="' . $id . '" x1="0" y1="0" x2="1" y2="1">'
		. '<stop offset="0" stop-color="' . esc_attr( $from ) . '"/>'
		. '<stop offset="1" stop-color="' . esc_attr( $to ) . '"/>'
		. '</linearGradient></defs>'
		. '<rect width="800" height="500" fill="url(#' . $id . ')"/>'
		. '<circle cx="250" cy="185" r="86" fill="' . esc_attr( $accent ) . '" opacity="0.9"/>'
		. '<rect x="400" y="120" width="270" height="130" rx="18" fill="' . esc_attr( $accent ) . '" opacity="0.65"/>'
		. '<path d="M0 500 L230 300 L420 420 L620 270 L800 380 L800 500 Z" fill="' . esc_attr( $accent ) . '" opacity="0.45"/>'
		// No caption drawn into the image: the block already renders its own
		// Before and After labels, and a second pair inside the artwork met at
		// the divider and overprinted each other ("BEFCER").
		. '</svg>';

	return 'data:image/svg+xml;base64,' . base64_encode( $svg ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
}
}

/**
 * Three sample reviews for the layouts that show more than one.
 *
 * Every block ships a single "John Doe" placeholder, which is the right default
 * for authoring but makes a poor demo: a grid, slider or masonry wall rendered
 * with one card is mostly empty space, and nothing about the layout is visible.
 * Only the preview uses these -- block defaults are untouched.
 *
 * The shape matches the `items` default in block.json exactly: img.url, name,
 * deg, reviewText, rating.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_demo_items' ) ) {
function bpbtb_demo_items() {
	return [
		[
			'img'        => [ 'url' => bpbtb_demo_avatar( 'AH', '#146ef5' ) ],
			'name'       => __( 'Amelia Hartwell', 'b-testimonials-block' ),
			'deg'        => __( 'Head of Product, Northwind', 'b-testimonials-block' ),
			'reviewText' => __( 'Setting this up took an afternoon, not a sprint. The layouts matched our brand straight away and support answered within the hour every time we asked.', 'b-testimonials-block' ),
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => bpbtb_demo_avatar( 'RM', '#0f57c4' ) ],
			'name'       => __( 'Rajesh Menon', 'b-testimonials-block' ),
			'deg'        => __( 'Engineering Manager, Blue Harbour', 'b-testimonials-block' ),
			'reviewText' => __( 'We replaced three separate plugins with this one. Page weight went down and the reviews finally look like part of the site rather than bolted on.', 'b-testimonials-block' ),
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => bpbtb_demo_avatar( 'SA', '#4d90f8' ) ],
			'name'       => __( 'Sofia Almeida', 'b-testimonials-block' ),
			'deg'        => __( 'Marketing Director, Lumen', 'b-testimonials-block' ),
			'reviewText' => __( 'The whole team picked it up without training. Being able to switch layout without rebuilding the section is the part we use most.', 'b-testimonials-block' ),
			'rating'     => 4,
		],
	];
}
}

/**
 * Three case studies, in that block's own richer item shape.
 *
 * Case Study is excluded from the shared sample reviews because its items carry
 * `challenge`/`solution`/`result` and a `sections` array; handing it plain
 * reviews would have emptied those out. Its grid is three columns wide, so a
 * single default item left one card in the first column with two empty columns
 * beside it -- which is why the demo looked stuck to the left rather than
 * centred. Three items fill the grid the way the block is meant to be used.
 *
 * `sections` mirrors the three titled blocks, matching the default exactly.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_demo_case_studies' ) ) {
function bpbtb_demo_case_studies() {
	$studies = [
		[
			'AH',
			'#146ef5',
			__( 'Amelia Hartwell', 'b-testimonials-block' ),
			__( 'Head of Product, Northwind', 'b-testimonials-block' ),
			__( 'Reviews were scattered across three tools and none of them matched the site.', 'b-testimonials-block' ),
			__( 'Collected everything through one form and published it with the grid layout.', 'b-testimonials-block' ),
			__( 'Review volume up 60% in the first quarter.', 'b-testimonials-block' ),
		],
		[
			'RM',
			'#0f57c4',
			__( 'Rajesh Menon', 'b-testimonials-block' ),
			__( 'Engineering Manager, Blue Harbour', 'b-testimonials-block' ),
			__( 'Three review plugins between them added 400KB to every page.', 'b-testimonials-block' ),
			__( 'Replaced all three with one block and dropped the rest.', 'b-testimonials-block' ),
			__( 'Page weight down 38%, largest paint under a second.', 'b-testimonials-block' ),
		],
		[
			'SA',
			'#4d90f8',
			__( 'Sofia Almeida', 'b-testimonials-block' ),
			__( 'Marketing Director, Lumen', 'b-testimonials-block' ),
			__( 'Every campaign needed a developer to restyle the testimonial section.', 'b-testimonials-block' ),
			__( 'Marketing switches layout and colours from the sidebar themselves.', 'b-testimonials-block' ),
			__( 'Landing pages ship the same week they are briefed.', 'b-testimonials-block' ),
		],
	];

	$items = [];

	foreach ( $studies as $s ) {
		list( $initials, $colour, $name, $deg, $challenge, $solution, $result ) = $s;

		$items[] = [
			'img'            => [ 'url' => bpbtb_demo_avatar( $initials, $colour ) ],
			'name'           => $name,
			'deg'            => $deg,
			'reviewText'     => $solution,
			'challengeTitle' => __( 'Challenge', 'b-testimonials-block' ),
			'challenge'      => $challenge,
			'solutionTitle'  => __( 'Solution', 'b-testimonials-block' ),
			'solution'       => $solution,
			'resultTitle'    => __( 'Result', 'b-testimonials-block' ),
			'result'         => $result,
			'sections'       => [
				[
					'title'   => __( 'Challenge', 'b-testimonials-block' ),
					'content' => $challenge,
				],
				[
					'title'   => __( 'Solution', 'b-testimonials-block' ),
					'content' => $solution,
				],
				[
					'title'   => __( 'Result', 'b-testimonials-block' ),
					'content' => $result,
				],
			],
			'rating'         => 5,
		];
	}

	return $items;
}
}

/**
 * Three video testimonials, in that block's own item shape.
 *
 * Same story as the case studies: a three-column grid holding one item put a
 * single card in the first column, which read as "stuck to the left". Its items
 * carry `videoUrl`, `poster` and `company`, so it cannot take the shared sample
 * reviews.
 *
 * The URLs are the block's own default clip, which is a Blender open-movie
 * trailer -- a real, embeddable video rather than a made-up ID that would show a
 * player error.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_demo_videos' ) ) {
function bpbtb_demo_videos() {
	$people = [
		[ __( 'Amelia Hartwell', 'b-testimonials-block' ), __( 'Head of Product', 'b-testimonials-block' ), __( 'Northwind', 'b-testimonials-block' ) ],
		[ __( 'Rajesh Menon', 'b-testimonials-block' ), __( 'Engineering Manager', 'b-testimonials-block' ), __( 'Blue Harbour', 'b-testimonials-block' ) ],
		[ __( 'Sofia Almeida', 'b-testimonials-block' ), __( 'Marketing Director', 'b-testimonials-block' ), __( 'Lumen', 'b-testimonials-block' ) ],
	];

	$items = [];

	foreach ( $people as $person ) {
		$items[] = [
			'videoUrl' => 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
			'poster'   => [ 'url' => '' ],
			'name'     => $person[0],
			'deg'      => $person[1],
			'company'  => $person[2],
		];
	}

	return $items;
}
}

/**
 * The three sample reviews, each with a playable clip attached.
 *
 * Audio Testimonials was previewing with no sound at all: its player takes
 * `item.audio.url`, the shared sample reviews carry only img/name/deg/
 * reviewText/rating, so every card rendered in its empty state -- play button
 * disabled, no duration, and in the editor the "Add an audio file in the
 * sidebar" hint. The block itself is fine; nothing was ever handing it a file.
 *
 * The clips are synthesised on request rather than shipped, so the plugin gains
 * no binary payload and the preview still needs no network. They are short tones,
 * not speech: this is a demo of the player -- scrub bar, timer, one-at-a-time
 * playback -- and a real voice recording would have to come from a real person
 * whose permission we do not have.
 *
 * @return array
 */
if ( ! function_exists( 'bpbtb_demo_audio_items' ) ) {
function bpbtb_demo_audio_items() {
	$items = bpbtb_demo_items();

	foreach ( $items as $index => $item ) {
		$items[ $index ]['audio'] = [
			'url' => add_query_arg( BPBTB_DEMO_AUDIO_QUERY_VAR, $index, home_url( '/' ) ),
		];
	}

	return $items;
}
}

/**
 * The clips behind those items: length in seconds, and the notes to sound.
 *
 * Different lengths on purpose -- three identical durations in a row would read
 * as one file repeated rather than three separate voice notes.
 *
 * @return array<int, array{seconds: float, notes: float[]}>
 */
if ( ! function_exists( 'bpbtb_demo_audio_clips' ) ) {
function bpbtb_demo_audio_clips() {
	return [
		[
			'seconds' => 6.0,
			'notes'   => [ 392.00, 523.25, 659.25, 523.25 ],
		],
		[
			'seconds' => 9.0,
			'notes'   => [ 349.23, 440.00, 587.33, 440.00, 349.23, 587.33 ],
		],
		[
			'seconds' => 7.5,
			'notes'   => [ 293.66, 440.00, 523.25, 392.00, 293.66 ],
		],
	];
}
}

/**
 * Build one clip as a complete WAV file, in memory.
 *
 * 8-bit unsigned mono at 8kHz. That is telephone quality and deliberately so:
 * the longest clip lands around 72KB, small enough to serve on every preview
 * load, and the player only needs something with an honest duration to scrub
 * through. Each note gets an attack/release envelope and a quiet second harmonic,
 * so it fades in and out instead of clicking at the segment joins, and the whole
 * thing sits at roughly a fifth of full scale -- a demo should not be the loudest
 * thing on the machine.
 *
 * @param int $index Clip index.
 * @return string Raw WAV bytes.
 */
if ( ! function_exists( 'bpbtb_demo_audio_wav' ) ) {
function bpbtb_demo_audio_wav( $index ) {
	$clips = bpbtb_demo_audio_clips();
	$clip  = isset( $clips[ $index ] ) ? $clips[ $index ] : $clips[0];

	$rate      = 8000;
	$amplitude = 0.20;
	$total     = (int) round( $clip['seconds'] * $rate );
	$notes     = $clip['notes'];
	$per_note  = (int) ceil( $total / count( $notes ) );

	$samples = '';

	for ( $i = 0; $i < $total; $i++ ) {
		$note     = min( count( $notes ) - 1, (int) floor( $i / $per_note ) );
		$position = ( $i % $per_note ) / $per_note;
		$freq     = $notes[ $note ];

		// Envelope: 12% fade in, then a long fall to silence by the note's end.
		$envelope = $position < 0.12 ? ( $position / 0.12 ) : ( 1 - ( ( $position - 0.12 ) / 0.88 ) );
		$envelope = max( 0, $envelope );
		$envelope = $envelope * $envelope;

		$phase = 2 * M_PI * $freq * ( $i / $rate );
		$value = ( sin( $phase ) + 0.3 * sin( 2 * $phase ) ) / 1.3;

		// 8-bit PCM is unsigned, so silence is 128 rather than 0.
		$sample   = (int) round( 128 + ( 127 * $amplitude * $envelope * $value ) );
		$samples .= chr( max( 0, min( 255, $sample ) ) );
	}

	$length = strlen( $samples );

	return 'RIFF' . pack( 'V', 36 + $length ) . 'WAVE'
		. 'fmt ' . pack( 'V', 16 )
		. pack( 'v', 1 )      // PCM.
		. pack( 'v', 1 )      // Mono.
		. pack( 'V', $rate )
		. pack( 'V', $rate )  // Byte rate: rate x channels x bytes per sample.
		. pack( 'v', 1 )      // Block align.
		. pack( 'v', 8 )      // Bits per sample.
		. 'data' . pack( 'V', $length )
		. $samples;
}
}

/**
 * Serve a clip and stop, when the query var asks for one.
 *
 * Shares the preview's capability check: the clips are only ever requested by an
 * `<audio>` element inside a preview page, which is already behind that check.
 *
 * @return void
 */
if ( ! function_exists( 'bpbtb_render_demo_audio' ) ) {
function bpbtb_render_demo_audio() {
	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only, generates no state.
	if ( ! isset( $_GET[ BPBTB_DEMO_AUDIO_QUERY_VAR ] ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die(
			esc_html__( 'You do not have permission to preview blocks.', 'b-testimonials-block' ),
			esc_html__( 'Preview unavailable', 'b-testimonials-block' ),
			[ 'response' => 403 ]
		);
	}

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only, generates no state.
	$index = absint( wp_unslash( $_GET[ BPBTB_DEMO_AUDIO_QUERY_VAR ] ) );
	$wav   = bpbtb_demo_audio_wav( $index );
	$size  = strlen( $wav );

	$start = 0;
	$end   = $size - 1;

	// Range support is what makes the waveform scrubbable. Without it, a click
	// two thirds along the bars asked Chrome to seek into audio it had not
	// buffered, it could not fetch just that part, and playback landed near the
	// start instead -- measured at 0.44s for a seek to 7.2s.
	$range = isset( $_SERVER['HTTP_RANGE'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_RANGE'] ) ) : '';

	if ( $range && preg_match( '/^bytes=(\d*)-(\d*)$/', $range, $matches ) ) {
		$req_start = '' === $matches[1] ? null : (int) $matches[1];
		$req_end   = '' === $matches[2] ? null : (int) $matches[2];

		if ( null === $req_start ) {
			// `bytes=-500` means the last 500 bytes, not "up to byte 500".
			$start = null === $req_end ? 0 : max( 0, $size - $req_end );
		} else {
			$start = $req_start;
			$end   = null === $req_end ? $end : min( $end, $req_end );
		}

		if ( $start > $end || $start >= $size ) {
			status_header( 416 );
			header( 'Content-Range: bytes */' . $size );
			exit;
		}

		status_header( 206 );
		header( 'Content-Range: bytes ' . $start . '-' . $end . '/' . $size );
	} else {
		status_header( 200 );
	}

	header( 'Content-Type: audio/wav' );
	header( 'Accept-Ranges: bytes' );
	header( 'Content-Length: ' . ( $end - $start + 1 ) );
	// Private and short: the bytes are deterministic, and re-synthesising them on
	// every play of every card would be pure waste.
	header( 'Cache-Control: private, max-age=3600' );

	echo substr( $wav, $start, $end - $start + 1 ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Binary audio, not markup.
	exit;
}
}

/**
 * Blocks whose demo should show several reviews rather than one.
 *
 * Two groups are left out deliberately.
 *
 * The badges -- Google, G2, Capterra, Trustpilot, verified buyer -- are single
 * summary widgets, so a second review would misrepresent what they do.
 *
 * Case Study, Video and Audio Testimonials are excluded because their items carry
 * block-specific fields (`challenge`/`solution`/`result`/`sections`,
 * `videoUrl`/`poster`/`company`, and `audio`). Replacing `items` wholesale would
 * drop those, leaving a case study with no sections and video and audio cards
 * with nothing to play; each has its own builder above instead. Every block
 * listed below was checked to have items of exactly
 * img/name/deg/reviewText/rating, which is the shape built above.
 *
 * @return string[]
 */
if ( ! function_exists( 'bpbtb_demo_multi_item_blocks' ) ) {
function bpbtb_demo_multi_item_blocks() {
	return [
		'b-testimonials',
		'testimonials-grid-2',
		'testimonials-grid-3',
		'testimonials-grid-minimal',
		'testimonials-list',
		'testimonials-compact',
		'testimonials-avatar-list',
		'testimonials-masonry',
		'testimonials-card-stack',
		'testimonials-floating-bubble',
		'testimonials-slider',
		'testimonials-carousel-2',
		'testimonials-slider-3d',
		'testimonials-marquee',
		'testimonials-speech-bubble',
		'testimonials-timeline',
		'testimonials-quote-box',
		'testimonials-popup-modal',
		'testimonials-hero',
		'faq-testimonial-accordion',
		'social-proof-toast',
	];
}
}

/**
 * Blocks that render one compact widget and so need centring in the stage.
 *
 * Painted width was measured for all 40 previews in a 1100px stage. Everything
 * listed fills roughly a quarter to a third of it -- the Google badge is 280px,
 * the toast 380px -- so without centring each sat against the left edge with a
 * wide empty area beside it.
 *
 * Only blocks whose content has an intrinsic width belong here. Shrink-to-fit is
 * what centres them, and anything sized from its container instead collapses:
 * Video Testimonials, added here briefly, squeezed its aspect-ratio video box
 * from 338px down to 93px. Case Study and Video are both three-column grids that
 * merely looked off-centre while holding one item, and are fixed by giving them
 * three items above, not by centring.
 *
 * The centring is `justify-content` on the stage, so only the block's outer box
 * moves; nothing inside it is re-aligned. The card layouts are left out because
 * they already fill the stage.
 *
 * @return string[]
 */
if ( ! function_exists( 'bpbtb_demo_compact_blocks' ) ) {
function bpbtb_demo_compact_blocks() {
	return [
		'google-review-badge',
		'capterra-review-badge',
		'g2-review-badge',
		'trustpilot-review-badge',
		'facebook-review-badge',
		'verified-buyer-badge',
		'review-badge-widget',
		'social-proof-toast',
	];
}
}

/**
 * Render the preview and stop, when the query var names a block of ours.
 *
 * Runs on `template_redirect` so the block's `viewScript` and styles enqueue
 * through the normal `wp_head()` / `wp_footer()` path -- a preview assembled
 * any earlier would render the markup without the scripts that drive it.
 */
if ( ! function_exists( 'bpbtb_render_demo_preview' ) ) {
function bpbtb_render_demo_preview() {
	// Checked first: the Audio Testimonials cards request their clips from this
	// same front-page URL, and those requests carry no preview slug.
	bpbtb_render_demo_audio();

	// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Read-only preview, no state is changed.
	$slug = isset( $_GET[ BPBTB_DEMO_QUERY_VAR ] ) ? sanitize_key( wp_unslash( $_GET[ BPBTB_DEMO_QUERY_VAR ] ) ) : '';

	if ( '' === $slug ) {
		return;
	}

	// The Demo & Help screen this serves is behind `manage_options`, and a
	// preview is only ever loaded from there, so it is not left open to the
	// public.
	if ( ! current_user_can( 'edit_posts' ) ) {
		wp_die(
			esc_html__( 'You do not have permission to preview blocks.', 'b-testimonials-block' ),
			esc_html__( 'Preview unavailable', 'b-testimonials-block' ),
			[ 'response' => 403 ]
		);
	}

	$blocks = bpbtb_demo_previewable_blocks();

	if ( ! isset( $blocks[ $slug ] ) ) {
		wp_die(
			esc_html__( 'That block does not exist.', 'b-testimonials-block' ),
			esc_html__( 'Preview unavailable', 'b-testimonials-block' ),
			[ 'response' => 404 ]
		);
	}

	// Built from the registry entry above, never from the raw request, so the
	// only thing that reaches do_blocks() is a block name this plugin registered.
	$attributes = bpbtb_demo_preview_attributes( $slug );
	$comment    = '<!-- wp:' . $blocks[ $slug ]
		. ( $attributes ? ' ' . wp_json_encode( $attributes ) : '' )
		. ' /-->';

	$markup = do_blocks( $comment );

	// The viewer is a logged-in editor, so wp_footer() would otherwise drop the
	// admin toolbar across the top of every demo.
	add_filter( 'show_admin_bar', '__return_false' );

	status_header( 200 );
	nocache_headers();

	?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?php echo esc_html( bpbtb_demo_preview_title( $slug ) ); ?></title>
	<?php wp_head(); ?>
	<style>
		/* Preview chrome only -- deliberately plain so the block, not the page
		   around it, is what the demo shows. */
		html,
		body.bpbtb-demo-preview {
			margin: 0;
			padding: 0;
			background: #f6f7f9;
		}

		body.bpbtb-demo-preview {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
			box-sizing: border-box;
			padding: 40px 24px;
			-webkit-font-smoothing: antialiased;
		}

		/*
		 * A definite width, deliberately.
		 *
		 * This was briefly `fit-content` to centre the narrow badge blocks, and
		 * that broke every layout that measures its own container in JS: masonry
		 * reads the container width to work out its columns, and against an
		 * indefinite width it collapsed to a single narrow column with all three
		 * cards drawn on top of each other. Compact blocks are centred through
		 * `.is-compact` below instead, which leaves the width alone.
		 */
		.bpbtb-demo-stage {
			width: 100%;
			max-width: 1100px;
			margin: 0 auto;
		}

		/*
		 * The badges are inline-level widgets inside a full-width wrapper, so
		 * without this they sit against the left edge with a large empty area
		 * beside them -- measured at 280px of painted content in a 1100px stage.
		 *
		 * Flex rather than `text-align: center`: this centres the badge's box
		 * and leaves the alignment of the text inside it exactly as the block
		 * renders it on a real page.
		 */
		.bpbtb-demo-stage.is-compact {
			display: flex;
			justify-content: center;
		}

		/* Blocks default to `alignwide`/`alignfull`, which rely on a theme
		   layout wrapper that is not present here. */
		.bpbtb-demo-stage .alignwide,
		.bpbtb-demo-stage .alignfull {
			max-width: 100%;
			margin-left: auto;
			margin-right: auto;
		}

		@media (max-width: 782px) {
			body.bpbtb-demo-preview {
				padding: 20px 12px;
			}
		}
	</style>
</head>
<body class="bpbtb-demo-preview wp-site-blocks">
	<div class="bpbtb-demo-stage<?php echo in_array( $slug, bpbtb_demo_compact_blocks(), true ) ? ' is-compact' : ''; ?>">
		<?php
		// Output of do_blocks() on markup this file built itself; escaping it
		// would print the block's HTML rather than render it.
		echo $markup; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	</div>
	<?php wp_footer(); ?>
</body>
</html>
	<?php
	exit;
}
}
add_action( 'template_redirect', 'bpbtb_render_demo_preview' );

/**
 * Human-readable title for a preview slug, taken from the registered block.
 *
 * @param string $slug Preview slug.
 * @return string
 */
if ( ! function_exists( 'bpbtb_demo_preview_title' ) ) {
function bpbtb_demo_preview_title( $slug ) {
	$blocks = bpbtb_demo_previewable_blocks();

	if ( isset( $blocks[ $slug ] ) ) {
		$type = WP_Block_Type_Registry::get_instance()->get_registered( $blocks[ $slug ] );
		if ( $type && ! empty( $type->title ) ) {
			return $type->title;
		}
	}

	return __( 'Block preview', 'b-testimonials-block' );
}
}
