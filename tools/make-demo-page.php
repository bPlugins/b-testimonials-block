<?php
/**
 * Dev-only: build a local page holding every block, ready to copy to a live demo page.
 *
 * Run it with:
 *
 *     studio wp eval-file tools/make-demo-page.php
 *
 * The Demo & Help screen previews one block per iframe, which is right for
 * browsing but gives you nothing to copy: each preview is a page this plugin
 * assembles at request time, behind an `edit_posts` check, and its markup never
 * exists as post content anywhere. This writes that same demo content into a real
 * page instead, so the block markup can be selected in the editor (Options >
 * Code editor) and pasted into a live site.
 *
 * It reuses `includes/demo-preview.php`'s builders rather than inventing its own
 * sample content, so the page shows exactly what the dashboard previews show.
 * Only overrides are serialised into each block comment -- everything else comes
 * from block.json defaults at render time, so the page cannot pin stale defaults.
 *
 * Not shipped: `npm run zip` packages only b-testimonials-block.php, includes,
 * assets, build, languages and readme.txt.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once WP_PLUGIN_DIR . '/b-testimonials-block/includes/demo-preview.php';

$bpbtb_page_slug  = 'bptmb-all-blocks-demo';
$bpbtb_page_title = 'B Testimonials Block - All Blocks Demo';

/*
 * Order, grouping and labels are the Demo & Help screen's own, from
 * src/admin/utils/data.js (`demoGroups`), so this page and that screen list the
 * blocks the same way round. Kept as a copy on purpose -- the list lives in a JS
 * bundle, and this is a CLI script. Any drift between the two is reported at the
 * end of the run rather than passing silently.
 */
$bpbtb_groups = [
	[
		'Grids & Lists',
		[
			// `bptmb/b-testimonials`, not `bptmb/testimonials` -- the one block
			// whose registered name differs from its directory.
			[ 'b-testimonials', 'B Testimonials Block' ],
			[ 'testimonials-grid-2', 'Centered Cards Grid' ],
			[ 'testimonials-grid-3', 'Gradient Border Grid' ],
			[ 'testimonials-grid-minimal', 'Minimalist Reviews Grid' ],
			[ 'testimonials-list', 'Testimonials List' ],
			[ 'testimonials-compact', 'Compact Reviews List' ],
			[ 'testimonials-avatar-list', 'Avatar Reviews List' ],
		],
	],
	[
		'Masonry & Stacks',
		[
			[ 'testimonials-masonry', 'Testimonials Masonry' ],
			[ 'testimonials-card-stack', 'Stacked Review Cards' ],
			[ 'testimonials-floating-bubble', 'Floating Avatar Bubbles' ],
		],
	],
	[
		'Sliders & Carousels',
		[
			[ 'testimonials-slider', 'Testimonials Slider' ],
			[ 'testimonials-carousel-2', 'Coverflow Carousel' ],
			[ 'testimonials-slider-3d', '3D Flip Perspective Carousel' ],
		],
	],
	[
		'Marquee & Toasts',
		[
			[ 'testimonials-marquee', 'Testimonials Marquee' ],
			[ 'social-proof-toast', 'Social Proof Toast' ],
		],
	],
	[
		'Spotlight & Story',
		[
			[ 'testimonials-hero', 'Hero Testimonial Spotlight' ],
			[ 'testimonials-quote-box', 'Quote Box Showcase' ],
			[ 'testimonials-speech-bubble', 'Speech Bubble Cards' ],
			[ 'testimonials-timeline', 'Customer Journey Timeline' ],
			[ 'case-study-card', 'Customer Case Study' ],
		],
	],
	[
		'Video & Audio',
		[
			[ 'video-testimonials', 'Video Testimonials' ],
			[ 'audio-testimonials', 'Audio Testimonials' ],
			[ 'before-after', 'Before / After' ],
		],
	],
	[
		'Ratings & Stats',
		[
			[ 'rating-summary', 'Rating Summary' ],
			[ 'star-rating-bars', 'Star Rating Progress Bars' ],
			[ 'testimonial-stats', 'Testimonial Stats' ],
			[ 'comparison-testimonial-table', 'Comparison Review Table' ],
		],
	],
	[
		'Badges & Trust',
		[
			[ 'google-review-badge', 'Google Reviews Badge' ],
			[ 'facebook-review-badge', 'Facebook Recommendation Badge' ],
			[ 'g2-review-badge', 'G2 Review Badge' ],
			[ 'capterra-review-badge', 'Capterra Score Badge' ],
			[ 'trustpilot-review-badge', 'Trustpilot Score Badge' ],
			[ 'review-badge-widget', 'Floating Review Badge' ],
			[ 'verified-buyer-badge', 'Verified Buyer Trust Seal' ],
			[ 'trust-badges', 'Trust Badges' ],
			[ 'client-logos', 'Client Logos' ],
		],
	],
	[
		'Feedback & Forms',
		[
			[ 'testimonial-form', 'Testimonial Form' ],
			[ 'user-feedback-poll', 'Feedback & NPS Poll' ],
			[ 'faq-testimonial-accordion', 'FAQ Review Accordion' ],
			[ 'testimonials-popup-modal', 'Popup Modal Review Trigger' ],
		],
	],
];

/**
 * One core/heading block.
 *
 * Built through serialize_block() rather than by writing the comment by hand:
 * that is the same function core's own serialiser uses, so the attribute JSON is
 * escaped exactly the way the editor expects to read it back.
 */
$bpbtb_heading = function ( $text, $level ) {
	$tag  = 'h' . (int) $level;
	$html = "\n" . '<' . $tag . ' class="wp-block-heading">' . esc_html( $text ) . '</' . $tag . '>' . "\n";

	return serialize_block(
		[
			'blockName'    => 'core/heading',
			// h2 is core/heading's default level, so it carries no attribute.
			'attrs'        => 2 === (int) $level ? [] : [ 'level' => (int) $level ],
			'innerBlocks'  => [],
			'innerHTML'    => $html,
			'innerContent' => [ $html ],
		]
	);
};

/**
 * One of this plugin's blocks: every block here is dynamic, so it serialises as
 * a self-closing comment with no saved HTML.
 */
$bpbtb_block = function ( $name, $attrs ) {
	return serialize_block(
		[
			'blockName'    => $name,
			'attrs'        => $attrs,
			'innerBlocks'  => [],
			'innerHTML'    => '',
			'innerContent' => [],
		]
	);
};

/**
 * Make a block's demo attributes portable to another site.
 *
 * The avatars, logos, wordmarks and video posters are already self-contained
 * data URIs, so they travel as-is. The audio clips do not: the preview points
 * them at `?bpbtb_demo_audio=N` on this install, which is both a localhost URL
 * and behind an `edit_posts` check -- pasted onto a live page it would fail for
 * every visitor. The bytes are inlined instead, which is why the Audio
 * Testimonials block is by far the largest thing on this page.
 */
$bpbtb_portable = function ( $attrs ) {
	if ( empty( $attrs['items'] ) || ! is_array( $attrs['items'] ) ) {
		return $attrs;
	}

	foreach ( $attrs['items'] as $index => $item ) {
		if ( empty( $item['audio']['url'] ) ) {
			continue;
		}

		$attrs['items'][ $index ]['audio']['url'] = 'data:audio/wav;base64,'
			. base64_encode( bpbtb_demo_audio_wav( $index ) ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_encode
	}

	return $attrs;
};

$bpbtb_registered = bpbtb_demo_previewable_blocks();
$bpbtb_parts      = [];
$bpbtb_listed     = [];
$bpbtb_missing    = [];
$bpbtb_count      = 0;

foreach ( $bpbtb_groups as $bpbtb_group ) {
	list( $bpbtb_group_title, $bpbtb_group_blocks ) = $bpbtb_group;

	$bpbtb_section = [];

	foreach ( $bpbtb_group_blocks as $bpbtb_entry ) {
		list( $bpbtb_slug, $bpbtb_label ) = $bpbtb_entry;

		$bpbtb_listed[] = $bpbtb_slug;

		if ( ! isset( $bpbtb_registered[ $bpbtb_slug ] ) ) {
			$bpbtb_missing[] = $bpbtb_slug;
			continue;
		}

		$bpbtb_attrs = $bpbtb_portable( bpbtb_demo_preview_attributes( $bpbtb_slug ) );

		// The editor overwrites cId with its own clientId as soon as the block is
		// loaded, so this only has to be unique on this page; derived from the
		// slug so re-running the script produces byte-identical content.
		$bpbtb_attrs['cId'] = substr( md5( $bpbtb_slug ), 0, 10 );

		$bpbtb_section[] = $bpbtb_heading( $bpbtb_label, 3 );
		$bpbtb_section[] = $bpbtb_block( $bpbtb_registered[ $bpbtb_slug ], $bpbtb_attrs );

		++$bpbtb_count;
	}

	if ( $bpbtb_section ) {
		array_unshift( $bpbtb_section, $bpbtb_heading( $bpbtb_group_title, 2 ) );
		$bpbtb_parts[] = implode( "\n\n", $bpbtb_section );
	}
}

// Registered but not in the list above -- a block added since, which would
// otherwise be silently left off the page.
$bpbtb_extra = array_diff( array_keys( $bpbtb_registered ), $bpbtb_listed );

if ( $bpbtb_extra ) {
	$bpbtb_section = [ $bpbtb_heading( 'Uncategorised', 2 ) ];

	foreach ( $bpbtb_extra as $bpbtb_slug ) {
		$bpbtb_type  = WP_Block_Type_Registry::get_instance()->get_registered( $bpbtb_registered[ $bpbtb_slug ] );
		$bpbtb_label = ( $bpbtb_type && ! empty( $bpbtb_type->title ) ) ? $bpbtb_type->title : $bpbtb_slug;

		$bpbtb_attrs        = $bpbtb_portable( bpbtb_demo_preview_attributes( $bpbtb_slug ) );
		$bpbtb_attrs['cId'] = substr( md5( $bpbtb_slug ), 0, 10 );

		$bpbtb_section[] = $bpbtb_heading( $bpbtb_label, 3 );
		$bpbtb_section[] = $bpbtb_block( $bpbtb_registered[ $bpbtb_slug ], $bpbtb_attrs );

		++$bpbtb_count;
	}

	$bpbtb_parts[] = implode( "\n\n", $bpbtb_section );
}

$bpbtb_content = implode( "\n\n", $bpbtb_parts );

/*
 * Save as an administrator. With no current user, kses_init_filters() hooks
 * wp_filter_post_kses onto the content, which rewrites the markup on the way
 * into the database -- the data URIs and block comments are not something to
 * hand to a filter that is there to sanitise untrusted input.
 */
$bpbtb_admins = get_users(
	[
		'role'    => 'administrator',
		'number'  => 1,
		'orderby' => 'ID',
		'fields'  => 'ID',
	]
);

if ( ! $bpbtb_admins ) {
	WP_CLI::error( 'No administrator account to save the page as.' );
}

$bpbtb_author = (int) $bpbtb_admins[0];
wp_set_current_user( $bpbtb_author );

$bpbtb_existing = get_posts(
	[
		'post_type'   => 'page',
		'name'        => $bpbtb_page_slug,
		'post_status' => 'any',
		'numberposts' => 1,
	]
);

$bpbtb_postarr = [
	'post_title'   => $bpbtb_page_title,
	'post_name'    => $bpbtb_page_slug,
	'post_content' => $bpbtb_content,
	'post_status'  => 'publish',
	'post_type'    => 'page',
	'post_author'  => $bpbtb_author,
];

if ( $bpbtb_existing ) {
	$bpbtb_postarr['ID'] = $bpbtb_existing[0]->ID;
	$bpbtb_page_id       = wp_update_post( $bpbtb_postarr, true );
	$bpbtb_action        = 'Updated';
} else {
	$bpbtb_page_id = wp_insert_post( $bpbtb_postarr, true );
	$bpbtb_action  = 'Created';
}

if ( is_wp_error( $bpbtb_page_id ) ) {
	WP_CLI::error( $bpbtb_page_id->get_error_message() );
}

// A plain copy of the markup as well, for pasting without opening the editor.
$bpbtb_dump = WP_PLUGIN_DIR . '/b-testimonials-block/tools/all-blocks-demo.html';
file_put_contents( $bpbtb_dump, $bpbtb_content ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_system_operations_file_put_contents

WP_CLI::line( $bpbtb_action . ' page ' . $bpbtb_page_id . ' with ' . $bpbtb_count . ' blocks, ' . size_format( strlen( $bpbtb_content ) ) . ' of markup.' );
WP_CLI::line( '  View:  ' . get_permalink( $bpbtb_page_id ) );
WP_CLI::line( '  Edit:  ' . admin_url( 'post.php?post=' . $bpbtb_page_id . '&action=edit' ) );
WP_CLI::line( '  Copy:  ' . $bpbtb_dump );

// Saved content is not necessarily the content handed to wp_insert_post.
$bpbtb_saved = get_post( $bpbtb_page_id )->post_content;

if ( $bpbtb_saved !== $bpbtb_content ) {
	WP_CLI::warning( 'Saved content differs from the generated markup by ' . abs( strlen( $bpbtb_saved ) - strlen( $bpbtb_content ) ) . ' bytes -- something filtered it on save.' );
}

if ( $bpbtb_missing ) {
	WP_CLI::warning( 'Listed but not registered, so left off the page: ' . implode( ', ', $bpbtb_missing ) );
}

if ( $bpbtb_extra ) {
	WP_CLI::warning( 'Registered but missing from the group list in this script (added under "Uncategorised"): ' . implode( ', ', $bpbtb_extra ) );
}
