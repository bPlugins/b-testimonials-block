<?php
/**
 * Schema.org structured data (JSON-LD) for testimonial blocks.
 *
 * Review / AggregateRating markup is what Google reads for rich results, and it
 * is the one thing every paid competitor in this niche leads with. This emits it
 * for all forty blocks without touching a single render.php or any saved block
 * markup, so existing content keeps validating.
 *
 * How it works: `render_block` collects reviews from every testimonial block on
 * the page into one bucket, and `wp_footer` prints a single consolidated
 * JSON-LD document at the end. One document rather than one per block is
 * deliberate -- a page with a grid and a slider on it would otherwise publish
 * two competing aggregateRatings for the same site, which Google treats as a
 * markup error rather than as two ratings.
 *
 * @package b-testimonials-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Whether JSON-LD output is enabled.
 *
 * Sites that already emit review markup from an SEO plugin can turn it off:
 *
 *     add_filter( 'bpbtb_schema_enabled', '__return_false' );
 *
 * @return bool
 */
if ( ! function_exists( 'bpbtb_schema_enabled' ) ) {
function bpbtb_schema_enabled() {
	if ( is_admin() || is_feed() ) {
		return false;
	}

	// The editor renders blocks through the REST block-renderer. Nothing is
	// crawled there, and wp_footer never fires, so there is nothing to collect.
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		return false;
	}

	return (bool) apply_filters( 'bpbtb_schema_enabled', true );
}
}

/**
 * Blocks whose `items` attribute is NOT genuine review content.
 *
 * Every block in the plugin inherits the same `items` attribute from the shared
 * schema, but for these it is unused boilerplate (the badge blocks show a
 * third-party score, not reviews of their own) or it holds something that is not
 * a review at all (logos, stat counters, poll options). Publishing those as
 * Review markup would be fabricating reviews, so they are skipped.
 *
 * A denylist rather than an allowlist so that a new testimonial block added
 * later is covered the day it ships, without anyone remembering to list it.
 *
 * @return string[]
 */
if ( ! function_exists( 'bpbtb_schema_excluded_blocks' ) ) {
function bpbtb_schema_excluded_blocks() {
	return (array) apply_filters(
		'bpbtb_schema_excluded_blocks',
		[
			'bptmb/capterra-review-badge',
			'bptmb/facebook-review-badge',
			'bptmb/g2-review-badge',
			'bptmb/google-review-badge',
			'bptmb/trustpilot-review-badge',
			'bptmb/review-badge-widget',
			'bptmb/verified-buyer-badge',
			'bptmb/trust-badges',
			'bptmb/client-logos',
			'bptmb/before-after',
			'bptmb/testimonial-form',
			'bptmb/testimonial-stats',
			'bptmb/star-rating-bars',
			'bptmb/user-feedback-poll',
		]
	);
}
}

/**
 * Whether a review body is sample content rather than a customer's words.
 *
 * Two kinds of sample reach a published page: the demo testimonial every block
 * ships as its default, and the testimonials a bundled pattern brings with it.
 * Publishing either as review markup would tell Google that a person who does
 * not exist left a real review -- precisely the fabricated-review case that gets
 * structured data penalised.
 *
 * Matched on the review body, because that is the field an author always
 * rewrites and never re-types by accident. Compared on a prefix so that a body
 * an author has extended -- keeping the sample opening and adding to it -- is
 * still treated as a sample; the surrounding whitespace and case are ignored
 * because a paste rarely preserves them exactly.
 *
 * @param string $body Review body.
 * @return bool
 */
if ( ! function_exists( 'bpbtb_schema_is_sample_body' ) ) {
function bpbtb_schema_is_sample_body( $body ) {
	$body = strtolower( trim( $body ) );

	if ( '' === $body ) {
		return false;
	}

	$samples = function_exists( 'bpbtb_sample_review_bodies' ) ? bpbtb_sample_review_bodies() : [];

	foreach ( $samples as $sample ) {
		$sample = strtolower( trim( (string) $sample ) );

		if ( '' !== $sample && 0 === strpos( $body, $sample ) ) {
			return true;
		}
	}

	return false;
}
}

/**
 * The page-wide review bucket.
 *
 * @param array|null $add Review to append, or null to read the bucket.
 * @return array
 */
if ( ! function_exists( 'bpbtb_schema_bucket' ) ) {
function bpbtb_schema_bucket( $add = null ) {
	static $reviews = [];

	if ( null !== $add ) {
		$reviews[] = $add;
	}

	return $reviews;
}
}

/**
 * The explicit aggregate a Rating Summary block declares, if one is on the page.
 *
 * That block states the average and the review count outright (typically copied
 * from Google or Trustpilot), which is more accurate than averaging whatever
 * handful of testimonials happen to be displayed. When present it wins.
 *
 * @param array|null $set Aggregate to store, or null to read.
 * @return array|null
 */
if ( ! function_exists( 'bpbtb_schema_declared_aggregate' ) ) {
function bpbtb_schema_declared_aggregate( $set = null ) {
	static $aggregate = null;

	if ( null !== $set ) {
		$aggregate = $set;
	}

	return $aggregate;
}
}

/**
 * Normalise one block item into the review shape used below.
 *
 * @param array $item Block item.
 * @return array|null Review, or null when the item carries nothing to publish.
 */
if ( ! function_exists( 'bpbtb_schema_normalise_item' ) ) {
function bpbtb_schema_normalise_item( $item ) {
	if ( ! is_array( $item ) ) {
		return null;
	}

	$str = static function ( $value ) {
		return is_scalar( $value ) ? wp_strip_all_tags( (string) $value ) : '';
	};

	$body = trim( $str( $item['reviewText'] ?? '' ) );
	$name = trim( $str( $item['name'] ?? '' ) );

	// Demo or pattern sample content -- see bpbtb_schema_is_sample_body().
	if ( bpbtb_schema_is_sample_body( $body ) ) {
		return null;
	}

	$rating = isset( $item['rating'] ) && is_numeric( $item['rating'] ) ? (float) $item['rating'] : 0;

	/*
	 * A Review needs something reviewed. An item with only a name attached --
	 * a video testimonial with no transcript, a logo row -- is an author and
	 * nothing else, and Google rejects those rather than ignoring them.
	 */
	if ( '' === $body && $rating <= 0 ) {
		return null;
	}

	return [
		'name'        => $name,
		'body'        => $body,
		'designation' => trim( $str( $item['deg'] ?? '' ) ),
		'company'     => trim( $str( $item['company'] ?? '' ) ),
		'rating'      => $rating,
		'date'        => trim( $str( $item['date'] ?? '' ) ),
	];
}
}

/**
 * Collect reviews from each testimonial block as it renders.
 *
 * @param string $block_content Rendered block HTML.
 * @param array  $block         Parsed block.
 * @return string Unchanged; this filter only observes.
 */
if ( ! function_exists( 'bpbtb_schema_collect_block' ) ) {
function bpbtb_schema_collect_block( $block_content, $block ) {
	$name = $block['blockName'] ?? '';

	if ( ! $name || 0 !== strpos( $name, 'bptmb/' ) ) {
		return $block_content;
	}

	if ( ! bpbtb_schema_enabled() ) {
		return $block_content;
	}

	if ( in_array( $name, bpbtb_schema_excluded_blocks(), true ) ) {
		return $block_content;
	}

	$attrs = isset( $block['attrs'] ) && is_array( $block['attrs'] ) ? $block['attrs'] : [];

	// A Rating Summary carrying a real average declares the page aggregate.
	if ( 'bptmb/rating-summary' === $name ) {
		$declared_rating = isset( $attrs['rating'] ) && is_numeric( $attrs['rating'] ) ? (float) $attrs['rating'] : 0;
		$declared_count  = isset( $attrs['count'] ) && is_numeric( $attrs['count'] ) ? (int) $attrs['count'] : 0;

		if ( $declared_rating > 0 && $declared_count > 0 ) {
			bpbtb_schema_declared_aggregate(
				[
					'rating' => min( 5, $declared_rating ),
					'count'  => $declared_count,
				]
			);
		}
	}

	/*
	 * Resolve the CPT the same way the block itself does, so a block reading
	 * from Testimonials publishes the testimonials it actually shows. Attribute
	 * defaults are not filled in for us here -- render_block hands over only
	 * what the block comment stored -- which is exactly what we want: a block
	 * nobody has edited has no `items` key at all and contributes nothing.
	 */
	if ( 'cpt' === ( $attrs['dataSource'] ?? 'manual' ) && function_exists( 'bpbtb_get_testimonial_items' ) ) {
		$query = isset( $attrs['query'] ) && is_array( $attrs['query'] ) ? $attrs['query'] : [];
		$items = bpbtb_get_testimonial_items( $query );
	} else {
		$items = isset( $attrs['items'] ) && is_array( $attrs['items'] ) ? $attrs['items'] : [];
	}

	foreach ( $items as $item ) {
		$review = bpbtb_schema_normalise_item( $item );

		if ( $review ) {
			bpbtb_schema_bucket( $review );
		}
	}

	return $block_content;
}
}
add_filter( 'render_block', 'bpbtb_schema_collect_block', 10, 2 );

/**
 * Build the JSON-LD document from the collected reviews.
 *
 * @param array $reviews Normalised reviews.
 * @return array|null
 */
if ( ! function_exists( 'bpbtb_schema_build' ) ) {
function bpbtb_schema_build( $reviews ) {
	/*
	 * The same testimonial often appears twice on a page -- a grid above the
	 * fold and a slider below it, both reading the same CPT. Publishing it twice
	 * would double its weight in the average and inflate reviewCount.
	 */
	$seen      = [];
	$deduped   = [];
	foreach ( $reviews as $review ) {
		$key = md5( strtolower( $review['name'] . '|' . $review['body'] ) );

		if ( isset( $seen[ $key ] ) ) {
			continue;
		}

		$seen[ $key ] = true;
		$deduped[]    = $review;
	}

	/**
	 * Cap on how many reviews go into one document. Google reads a sample; a
	 * wall-of-love page with 400 testimonials would otherwise add hundreds of
	 * kilobytes to every page load for no additional benefit.
	 *
	 * @param int $max Maximum reviews.
	 */
	$max     = (int) apply_filters( 'bpbtb_schema_max_reviews', 50 );
	$deduped = $max > 0 ? array_slice( $deduped, 0, $max ) : $deduped;

	if ( empty( $deduped ) ) {
		return null;
	}

	$structured = [];
	$rated      = [];

	foreach ( $deduped as $review ) {
		$author = [
			'@type' => 'Person',
			'name'  => '' !== $review['name'] ? $review['name'] : __( 'Anonymous', 'b-testimonials-block' ),
		];

		if ( '' !== $review['designation'] ) {
			$author['jobTitle'] = $review['designation'];
		}

		if ( '' !== $review['company'] ) {
			$author['worksFor'] = [
				'@type' => 'Organization',
				'name'  => $review['company'],
			];
		}

		$entry = [
			'@type'  => 'Review',
			'author' => $author,
		];

		if ( '' !== $review['body'] ) {
			$entry['reviewBody'] = $review['body'];
		}

		if ( '' !== $review['date'] ) {
			$timestamp = strtotime( $review['date'] );

			if ( $timestamp ) {
				$entry['datePublished'] = gmdate( 'Y-m-d', $timestamp );
			}
		}

		if ( $review['rating'] > 0 && $review['rating'] <= 5 ) {
			$rated[]               = $review['rating'];
			$entry['reviewRating'] = [
				'@type'       => 'Rating',
				'ratingValue' => round( $review['rating'], 1 ),
				'bestRating'  => 5,
				'worstRating' => 1,
			];
		}

		$structured[] = $entry;
	}

	$item_name = wp_strip_all_tags( (string) get_bloginfo( 'name' ) );

	/**
	 * The thing being reviewed.
	 *
	 * Defaults to the site name. A shop showing testimonials on a product page
	 * will want the product's name instead.
	 *
	 * @param string $item_name Name of the reviewed item.
	 */
	$item_name = (string) apply_filters( 'bpbtb_schema_item_name', $item_name );

	/**
	 * The schema.org type wrapping the reviews.
	 *
	 * Product by default, because that is the type Google grants review rich
	 * results to. Note that Google does not show rich results for reviews an
	 * organisation writes about itself, so a site using this on an Organization
	 * or LocalBusiness type will see valid markup and no stars.
	 *
	 * @param string $type Schema.org type.
	 */
	$type = (string) apply_filters( 'bpbtb_schema_item_type', 'Product' );

	$data = [
		'@context' => 'https://schema.org',
		'@type'    => $type,
		'name'     => '' !== $item_name ? $item_name : __( 'Our service', 'b-testimonials-block' ),
		'review'   => $structured,
	];

	$declared = bpbtb_schema_declared_aggregate();

	if ( $declared ) {
		$data['aggregateRating'] = [
			'@type'       => 'AggregateRating',
			'ratingValue' => round( $declared['rating'], 1 ),
			'reviewCount' => $declared['count'],
			'bestRating'  => 5,
			'worstRating' => 1,
		];
	} elseif ( ! empty( $rated ) ) {
		// Only when something was actually rated -- Google rejects an
		// aggregateRating with no ratings behind it.
		$data['aggregateRating'] = [
			'@type'       => 'AggregateRating',
			'ratingValue' => round( array_sum( $rated ) / count( $rated ), 1 ),
			'reviewCount' => count( $rated ),
			'bestRating'  => 5,
			'worstRating' => 1,
		];
	}

	/**
	 * The finished JSON-LD document, before encoding.
	 *
	 * @param array $data    Structured data.
	 * @param array $reviews Reviews it was built from.
	 */
	return (array) apply_filters( 'bpbtb_schema_data', $data, $deduped );
}
}

/**
 * Print the consolidated JSON-LD once, at the end of the page.
 */
if ( ! function_exists( 'bpbtb_schema_print' ) ) {
function bpbtb_schema_print() {
	if ( ! bpbtb_schema_enabled() ) {
		return;
	}

	$data = bpbtb_schema_build( bpbtb_schema_bucket() );

	if ( ! $data ) {
		return;
	}

	/*
	 * Slashes stay escaped. A testimonial containing the literal text
	 * "</script>" would otherwise close this tag and turn review text into
	 * markup; `<\/script>` inside JSON is both safe and read identically by
	 * every parser.
	 */
	$json = wp_json_encode( $data, JSON_UNESCAPED_UNICODE );

	if ( ! $json ) {
		return;
	}

	echo '<script type="application/ld+json">' . $json . '</script>' . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wp_json_encode output, slashes escaped above.
}
}
add_action( 'wp_footer', 'bpbtb_schema_print', 20 );
