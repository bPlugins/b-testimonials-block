<?php
/**
 * Sample testimonial content, in one place.
 *
 * Two features need to agree on this list and they pull in opposite directions:
 * the block patterns want sample testimonials that read like real ones, so a
 * freshly inserted pattern looks like a finished section rather than lorem
 * ipsum -- and the JSON-LD builder must never publish those same samples to
 * Google as genuine customer reviews.
 *
 * Keeping both on one list is what makes that safe. A pattern draws its
 * testimonials from here; the schema builder skips any review body it finds
 * here. The moment an author rewrites the text -- which is the whole point of
 * inserting a pattern -- it stops matching and starts counting.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sample testimonials used by the bundled block patterns.
 *
 * Deliberately not translated. These strings are matched against saved block
 * content to decide whether a testimonial is still a sample, and a translated
 * string would stop matching the English one already saved in a page -- which
 * would quietly start publishing sample reviews as real ones on any site that
 * changed its language.
 *
 * @return array[]
 */
if ( ! function_exists( 'bpbtb_sample_testimonials' ) ) {
function bpbtb_sample_testimonials() {
	return [
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Amara Okafor',
			'deg'        => 'Head of Marketing',
			'company'    => 'Northwind Studio',
			'reviewText' => 'We replaced three separate tools with this one. Setup took an afternoon and the team never asked me how to use it.',
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Daniel Reyes',
			'deg'        => 'Founder',
			'company'    => 'Bright Harbour',
			'reviewText' => 'Support replied on a Sunday evening with a fix, not a ticket number. That is the reason we renewed.',
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Yuki Tanaka',
			'deg'        => 'Product Designer',
			'company'    => 'Foldpath',
			'reviewText' => 'It matched our brand out of the box, which never happens. I spent my time on copy instead of fighting CSS.',
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Priya Sharma',
			'deg'        => 'Operations Lead',
			'company'    => 'Cedarline',
			'reviewText' => 'Our conversion rate on the pricing page moved within a fortnight of adding customer quotes above the fold.',
			'rating'     => 4,
		],
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Tom Becker',
			'deg'        => 'Agency Owner',
			'company'    => 'Meridian',
			'reviewText' => 'I have shipped this on eleven client sites now. Not one of them has come back with a layout problem.',
			'rating'     => 5,
		],
		[
			'img'        => [ 'url' => '' ],
			'name'       => 'Sofia Marchetti',
			'deg'        => 'E-commerce Manager',
			'company'    => 'Vellum & Co',
			'reviewText' => 'Shoppers see real names and real photos next to the buy button. Returns went down, which I did not expect.',
			'rating'     => 5,
		],
	];
}
}

/**
 * Review bodies that are sample content rather than a customer's words.
 *
 * @return string[]
 */
if ( ! function_exists( 'bpbtb_sample_review_bodies' ) ) {
function bpbtb_sample_review_bodies() {
	$bodies = wp_list_pluck( bpbtb_sample_testimonials(), 'reviewText' );

	/*
	 * The demo testimonial every block still ships as its `items` default. A
	 * block dragged in from the inserter and left alone renders this, and it
	 * predates the pattern samples above, so it is listed separately rather
	 * than folded into them.
	 */
	$bodies[] = 'It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout';

	/**
	 * Review bodies treated as sample content and kept out of structured data.
	 *
	 * @param string[] $bodies Sample review bodies.
	 */
	return (array) apply_filters( 'bpbtb_sample_review_bodies', $bodies );
}
}
