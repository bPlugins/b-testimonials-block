import { __, sprintf } from '@wordpress/i18n';

/**
 * The star row shown on a testimonial.
 *
 * The stars themselves are decorative SVG with no text in them, so to a screen
 * reader this element used to be silent -- the single most load-bearing piece of
 * information on a testimonial simply did not exist for anyone not looking at
 * it. `role="img"` collapses the whole row into one node and the label speaks
 * the score, which is what a sighted reader takes from it at a glance.
 */
const RatingIcon = ( { attributes = {}, getStar, rating = 5, starIconColor = '#FF8C02' } ) => {
	const { elements = {} } = attributes || {};
	const showIcon = elements?.icon ?? true;

	if ( ! showIcon ) {
		return null;
	}

	const value = Number( rating );
	const hasScore = Number.isFinite( value ) && value > 0;

	// Trailing ".0" reads badly out loud: "four point zero out of five".
	const spoken = hasScore ? String( Math.round( value * 10 ) / 10 ) : '';

	// No score to announce means the row is decoration, and is hidden rather
	// than read out as a meaningless list of images.
	const a11yProps = hasScore
		? {
			role: 'img',
			'aria-label': sprintf(
				/* translators: %s: rating out of five, e.g. 4.5 */
				__( 'Rated %s out of 5', 'b-testimonials-block' ),
				spoken
			),
		}
		: { 'aria-hidden': 'true' };

	return (
		<div className="rating" { ...a11yProps }>
			{ typeof getStar === 'function' ? getStar( rating, starIconColor ) : null }
		</div>
	);
};

export default RatingIcon;
