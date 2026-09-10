import { __, sprintf } from '@wordpress/i18n';

/**
 * The category tabs and keyword box that sit above a testimonial collection.
 *
 * Filtering happens in the browser, over the testimonials the block already
 * holds, so a click costs no request and works on a cached page. That is the
 * right trade at this size -- a block shows a few dozen testimonials at most,
 * and a round trip per tab would be slower and would break under page caching.
 * A block pinned to one category narrows server-side instead; see the category
 * argument in bpbtb_get_testimonial_items().
 *
 * Buttons rather than a `role="tablist"`. Tabs promise arrow-key navigation
 * between them and one tab stop for the group, which is a contract worth
 * keeping only when the panels really are alternative views of the same thing.
 * These are filters, so they are what they look like: a row of toggle buttons,
 * each reachable with Tab and each reporting whether it is on.
 */
const TestimonialFilter = ( {
	categories = [],
	active = '',
	search = '',
	onCategory,
	onSearch,
	showFilter = true,
	showSearch = true,
	allLabel = '',
	searchPlaceholder = '',
	resultCount = 0,
	inputId = 'btb-filter-search',
} ) => {
	if ( ! showFilter && ! showSearch ) {
		return null;
	}

	const all = allLabel || __( 'All', 'b-testimonials-block' );
	const hasCategories = showFilter && categories.length > 0;

	return (
		<div className="btb-filter-bar">
			{ hasCategories && (
				<div
					className="btb-filter-cats"
					role="group"
					aria-label={ __( 'Filter testimonials by category', 'b-testimonials-block' ) }
				>
					<button
						type="button"
						className={ `btb-filter-cat${ '' === active ? ' is-active' : '' }` }
						aria-pressed={ '' === active ? 'true' : 'false' }
						onClick={ () => onCategory( '' ) }
					>
						{ all }
					</button>

					{ categories.map( ( cat ) => (
						<button
							key={ cat.slug }
							type="button"
							className={ `btb-filter-cat${ cat.slug === active ? ' is-active' : '' }` }
							aria-pressed={ cat.slug === active ? 'true' : 'false' }
							onClick={ () => onCategory( cat.slug ) }
						>
							{ cat.name }
						</button>
					) ) }
				</div>
			) }

			{ showSearch && (
				<div className="btb-filter-search">
					{ /* A visible label would crowd a one-field bar, but the field
					     still needs a name -- so the label is there and hidden the
					     way core hides one, not removed. */ }
					<label className="screen-reader-text" htmlFor={ inputId }>
						{ __( 'Search testimonials', 'b-testimonials-block' ) }
					</label>
					<input
						id={ inputId }
						type="search"
						className="btb-filter-input"
						value={ search }
						placeholder={ searchPlaceholder || __( 'Search reviews…', 'b-testimonials-block' ) }
						onChange={ ( e ) => onSearch( e.target.value ) }
					/>
				</div>
			) }

			{ /* Filtering rearranges the page silently for anyone not watching it.
			     A polite live region says what happened, and only the count is in
			     here so it is not re-read every keystroke of an unchanged result. */ }
			<p className="screen-reader-text" role="status" aria-live="polite">
				{ sprintf(
					/* translators: %s: number of testimonials shown after filtering. */
					__( '%s testimonials shown', 'b-testimonials-block' ),
					String( resultCount )
				) }
			</p>
		</div>
	);
};

export default TestimonialFilter;
