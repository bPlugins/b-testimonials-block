<?php
/**
 * Bundled block patterns.
 *
 * Forty blocks is a lot to choose between on an empty page, and a block dragged
 * in from the inserter arrives as one demo testimonial in a default theme --
 * which is a long way from the sections people actually came here to build.
 * These patterns are those sections, ready made: insert one, rewrite the words,
 * done.
 *
 * The testimonials come from bpbtb_sample_testimonials(), which the JSON-LD
 * builder also reads, so a pattern that has not been rewritten yet is kept out
 * of structured data. See includes/samples.php.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Serialise one of our blocks into block markup.
 *
 * @param string $name  Block name without the `bptmb/` prefix.
 * @param array  $attrs Block attributes.
 * @return string
 */
if ( ! function_exists( 'bpbtb_pattern_block' ) ) {
function bpbtb_pattern_block( $name, $attrs = [] ) {
	// Self-closing block comments: every block here renders from render.php and
	// stores nothing between its delimiters.
	$json = $attrs ? ' ' . wp_json_encode( $attrs, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) : '';

	return '<!-- wp:bptmb/' . $name . $json . ' /-->';
}
}

/**
 * A core heading, centred, for the patterns that open with one.
 *
 * @param string $text  Heading text.
 * @param int    $level Heading level.
 * @return string
 */
if ( ! function_exists( 'bpbtb_pattern_heading' ) ) {
function bpbtb_pattern_heading( $text, $level = 2 ) {
	return '<!-- wp:heading {"textAlign":"center","level":' . (int) $level . '} -->'
		. '<h' . (int) $level . ' class="wp-block-heading has-text-align-center">' . esc_html( $text ) . '</h' . (int) $level . '>'
		. '<!-- /wp:heading -->';
}
}

/**
 * A core paragraph, centred and muted, for pattern sub-headings.
 *
 * @param string $text Paragraph text.
 * @return string
 */
if ( ! function_exists( 'bpbtb_pattern_subheading' ) ) {
function bpbtb_pattern_subheading( $text ) {
	return '<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.05rem"}}} -->'
		. '<p class="has-text-align-center" style="font-size:1.05rem">' . esc_html( $text ) . '</p>'
		. '<!-- /wp:paragraph -->';
}
}

/**
 * The first N sample testimonials.
 *
 * @param int $count How many.
 * @return array[]
 */
if ( ! function_exists( 'bpbtb_pattern_items' ) ) {
function bpbtb_pattern_items( $count ) {
	return array_slice( bpbtb_sample_testimonials(), 0, max( 1, (int) $count ) );
}
}

/**
 * Register the pattern category and the patterns themselves.
 */
if ( ! function_exists( 'bpbtb_register_patterns' ) ) {
function bpbtb_register_patterns() {
	if ( ! function_exists( 'register_block_pattern' ) ) {
		return;
	}

	register_block_pattern_category(
		'bpbtb-testimonials',
		[ 'label' => __( 'Testimonials & Social Proof', 'b-testimonials-block' ) ]
	);

	$category = [ 'bpbtb-testimonials' ];

	$patterns = [];

	// 1. Wall of Love -- the section this whole category exists for.
	$patterns['wall-of-love'] = [
		'title'       => __( 'Wall of Love', 'b-testimonials-block' ),
		'description' => __( 'A heading over a masonry wall of six customer testimonials.', 'b-testimonials-block' ),
		'keywords'    => [ 'wall of love', 'masonry', 'testimonials', 'reviews' ],
		'content'     => bpbtb_pattern_heading( __( 'Loved by teams everywhere', 'b-testimonials-block' ) )
			. bpbtb_pattern_subheading( __( 'What our customers say after living with us for a while.', 'b-testimonials-block' ) )
			. bpbtb_pattern_block(
				'testimonials-masonry',
				[
					'align'   => 'wide',
					'columns' => [
						'desktop' => 3,
						'tablet'  => 2,
						'mobile'  => 1,
					],
					'items'   => bpbtb_pattern_items( 6 ),
				]
			),
	];

	// 2. SaaS hero -- rating first, because that is the number people scan for.
	$patterns['saas-hero'] = [
		'title'       => __( 'SaaS Hero with Rating', 'b-testimonials-block' ),
		'description' => __( 'An aggregate rating above three featured testimonials and a row of client logos.', 'b-testimonials-block' ),
		'keywords'    => [ 'saas', 'hero', 'rating', 'logos' ],
		'content'     => bpbtb_pattern_block(
			'rating-summary',
			[
				'badgeTitle' => __( 'Rated by our customers', 'b-testimonials-block' ),
				'rating'     => 4.9,
				'count'      => 1240,
				'showCount'  => true,
			]
		)
			. bpbtb_pattern_heading( __( 'Teams ship faster with us', 'b-testimonials-block' ) )
			. bpbtb_pattern_block(
				'testimonials-hero',
				[
					'align'   => 'wide',
					'columns' => [
						'desktop' => 3,
						'tablet'  => 1,
						'mobile'  => 1,
					],
					'items'   => bpbtb_pattern_items( 3 ),
				]
			)
			. bpbtb_pattern_block( 'client-logos', [ 'align' => 'wide' ] ),
	];

	// 3. E-commerce -- proof next to the buy button.
	$patterns['ecommerce-social-proof'] = [
		'title'       => __( 'E-commerce Social Proof', 'b-testimonials-block' ),
		'description' => __( 'Verified buyer reviews with a trust badge row, for product and checkout pages.', 'b-testimonials-block' ),
		'keywords'    => [ 'ecommerce', 'woocommerce', 'product', 'verified buyer', 'trust' ],
		'content'     => bpbtb_pattern_heading( __( 'What buyers are saying', 'b-testimonials-block' ) )
			. bpbtb_pattern_block(
				'testimonials-grid-minimal',
				[
					'align'   => 'wide',
					'columns' => [
						'desktop' => 3,
						'tablet'  => 2,
						'mobile'  => 1,
					],
					'items'   => bpbtb_pattern_items( 3 ),
				]
			)
			. bpbtb_pattern_block( 'trust-badges', [ 'align' => 'wide' ] ),
	];

	// 4. Agency -- the numbers, then the words behind them.
	$patterns['agency-results'] = [
		'title'       => __( 'Agency Results & Testimonials', 'b-testimonials-block' ),
		'description' => __( 'Headline statistics above a testimonial slider, for agency and consultancy pages.', 'b-testimonials-block' ),
		'keywords'    => [ 'agency', 'stats', 'slider', 'results' ],
		'content'     => bpbtb_pattern_block( 'testimonial-stats', [ 'align' => 'wide' ] )
			. bpbtb_pattern_heading( __( 'The clients behind those numbers', 'b-testimonials-block' ) )
			. bpbtb_pattern_block(
				'testimonials-slider',
				[
					'align'   => 'wide',
					'columns' => [
						'desktop' => 2,
						'tablet'  => 1,
						'mobile'  => 1,
					],
					'items'   => bpbtb_pattern_items( 5 ),
				]
			),
	];

	// 5. Trust bar -- third-party scores, kept out of our own review markup.
	$patterns['review-trust-bar'] = [
		'title'       => __( 'Review Platform Trust Bar', 'b-testimonials-block' ),
		'description' => __( 'Google, Trustpilot and G2 rating badges side by side.', 'b-testimonials-block' ),
		'keywords'    => [ 'google', 'trustpilot', 'g2', 'badge', 'trust bar' ],
		'content'     => '<!-- wp:columns {"align":"wide"} --><div class="wp-block-columns alignwide">'
			. '<!-- wp:column --><div class="wp-block-column">'
			. bpbtb_pattern_block(
				'google-review-badge',
				[
					'badgeTitle' => __( 'Google Reviews', 'b-testimonials-block' ),
					'badgeScore' => '4.9',
					'badgeCount' => __( '312 reviews', 'b-testimonials-block' ),
				]
			)
			. '</div><!-- /wp:column -->'
			. '<!-- wp:column --><div class="wp-block-column">'
			. bpbtb_pattern_block(
				'trustpilot-review-badge',
				[
					'badgeTitle' => __( 'Trustpilot', 'b-testimonials-block' ),
					'badgeScore' => '4.8',
					'badgeCount' => __( '1,204 reviews', 'b-testimonials-block' ),
				]
			)
			. '</div><!-- /wp:column -->'
			. '<!-- wp:column --><div class="wp-block-column">'
			. bpbtb_pattern_block(
				'g2-review-badge',
				[
					'badgeTitle' => __( 'G2 Crowd', 'b-testimonials-block' ),
					'badgeScore' => '4.7',
					'badgeCount' => __( '486 reviews', 'b-testimonials-block' ),
				]
			)
			. '</div><!-- /wp:column -->'
			. '</div><!-- /wp:columns -->',
	];

	// 6. Marquee -- proof that keeps moving, for long landing pages.
	$patterns['scrolling-testimonials'] = [
		'title'       => __( 'Scrolling Testimonial Marquee', 'b-testimonials-block' ),
		'description' => __( 'A continuously scrolling row of testimonials under a short heading.', 'b-testimonials-block' ),
		'keywords'    => [ 'marquee', 'scrolling', 'ticker', 'landing page' ],
		'content'     => bpbtb_pattern_heading( __( 'Trusted by thousands', 'b-testimonials-block' ) )
			. bpbtb_pattern_block(
				'testimonials-marquee',
				[
					'align'   => 'full',
					'items'   => bpbtb_pattern_items( 6 ),
					'marquee' => [
						'speed'        => 30,
						'direction'    => 'left',
						'pauseOnHover' => true,
					],
				]
			),
	];

	// 7. Collect -- the form, next to the reviews it is asking people to join.
	$patterns['collect-reviews'] = [
		'title'       => __( 'Ask for a Review', 'b-testimonials-block' ),
		'description' => __( 'A submission form beside existing testimonials, for a dedicated review page.', 'b-testimonials-block' ),
		'keywords'    => [ 'form', 'collect', 'submit', 'review page' ],
		'content'     => bpbtb_pattern_heading( __( 'Tell us how we did', 'b-testimonials-block' ) )
			. bpbtb_pattern_subheading( __( 'Every review is read by a person and published once approved.', 'b-testimonials-block' ) )
			. '<!-- wp:columns {"align":"wide"} --><div class="wp-block-columns alignwide">'
			. '<!-- wp:column {"width":"55%"} --><div class="wp-block-column" style="flex-basis:55%">'
			. bpbtb_pattern_block(
				'testimonials-list',
				[
					'items' => bpbtb_pattern_items( 4 ),
				]
			)
			. '</div><!-- /wp:column -->'
			. '<!-- wp:column {"width":"45%"} --><div class="wp-block-column" style="flex-basis:45%">'
			. bpbtb_pattern_block( 'testimonial-form' )
			. '</div><!-- /wp:column -->'
			. '</div><!-- /wp:columns -->',
	];

	foreach ( $patterns as $slug => $pattern ) {
		register_block_pattern(
			'b-testimonials-block/' . $slug,
			[
				'title'       => $pattern['title'],
				'description' => $pattern['description'],
				'categories'  => $category,
				'keywords'    => $pattern['keywords'],
				'content'     => $pattern['content'],
			]
		);
	}
}
}

/*
 * Late on init: register_block_pattern() silently drops a pattern whose blocks
 * are not registered yet, and our blocks register on init at the default
 * priority.
 */
add_action( 'init', 'bpbtb_register_patterns', 20 );
