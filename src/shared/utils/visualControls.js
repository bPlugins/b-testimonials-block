import { __ } from '@wordpress/i18n';

/**
 * Registry of the visual roles each layout paints with.
 *
 * The bespoke layouts (badges, stats, timeline, card stack, ...) were styled
 * with fixed hex values in SCSS, so nothing they render could be recoloured
 * from the inspector -- the Style tab only ever reached the classic card, name,
 * designation and review text. Rather than one control per declaration, the
 * stylesheets reuse the same handful of roles, so each role becomes a single
 * CSS custom property that both the inspector and the stylesheets agree on.
 *
 * Every value stays optional. Style.js only emits a custom property once the
 * author actually picks one, and each SCSS declaration keeps its original
 * literal as the var() fallback, so an untouched block renders exactly as
 * before.
 */

export const ROLES = {
	brandColor: { cssVar: '--btb-accent', label: __( 'Accent', 'b-testimonials-block' ) },
	surfaceColor: { cssVar: '--btb-surface', label: __( 'Card Surface', 'b-testimonials-block' ) },

	// Outlines and separators were one role, so restyling a card's outline also
	// restyled every table rule and section divider. They are independent now,
	// each with its own width.
	borderColor: { cssVar: '--btb-border', label: __( 'Border Color', 'b-testimonials-block' ) },
	borderWidth: { cssVar: '--btb-border-width', label: __( 'Border Width', 'b-testimonials-block' ), type: 'width' },
	dividerColor: { cssVar: '--btb-divider', label: __( 'Divider Color', 'b-testimonials-block' ) },
	dividerWidth: { cssVar: '--btb-divider-width', label: __( 'Divider Width', 'b-testimonials-block' ), type: 'width' },

	titleColor: { cssVar: '--btb-title', label: __( 'Headings', 'b-testimonials-block' ) },
	bodyColor: { cssVar: '--btb-body', label: __( 'Body Text', 'b-testimonials-block' ) },
	mutedColor: { cssVar: '--btb-muted', label: __( 'Secondary Text', 'b-testimonials-block' ) },

	// Separate from the classic `starIconColor`, which the Review Text panel
	// owns and which these single-item layouts never show a control for.
	ratingColor: { cssVar: '--btb-star', label: __( 'Rating Stars', 'b-testimonials-block' ) },
	trackColor: { cssVar: '--btb-track', label: __( 'Bars & Tracks', 'b-testimonials-block' ) },

	successColor: { cssVar: '--btb-success', label: __( 'Thank-you Message', 'b-testimonials-block' ) },

	// The testimonial form's own result banners. form.scss has always read these
	// four custom properties, and the block has always declared the attributes,
	// but no layout claimed the roles -- so the banners were stuck on their
	// literals and three of the attributes were unreachable dead weight.
	successBg: { cssVar: '--btb-success-bg', label: __( 'Thank-you Background', 'b-testimonials-block' ) },
	errorColor: { cssVar: '--btb-error', label: __( 'Error Message', 'b-testimonials-block' ) },
	errorBg: { cssVar: '--btb-error-bg', label: __( 'Error Background', 'b-testimonials-block' ) },

	// The before/after slider's drag handle already follows `accentColor`; only
	// its two corner labels were stuck on a fixed translucent black.
	labelBgColor: { cssVar: '--btb-ba-label-bg', label: __( 'Label Background', 'b-testimonials-block' ) },
	labelTextColor: { cssVar: '--btb-ba-label-color', label: __( 'Label Text', 'b-testimonials-block' ) },
	gripIconColor: { cssVar: '--btb-ba-grip', label: __( 'Handle Arrow', 'b-testimonials-block' ) },
};

/**
 * The roles each layout's stylesheet actually reads.
 *
 * Derived from the compiled selectors rather than guessed: a layout is offered
 * a control only where it paints something. Showing all of them everywhere
 * would recreate the exact problem this registry exists to fix -- a video block
 * has no headings, and a client-logo strip has no rating stars.
 *
 * The last four have no branch in Layout.js (they are CSS-only variations of
 * the default rendering), so their roles come from their own stylesheet block.
 */
export const LAYOUT_ROLES = {
	'google-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'capterra-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'facebook-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'trustpilot-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'g2-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'verified-buyer-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'review-badge-widget': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'trust-badges': [ 'surfaceColor', 'borderColor', 'borderWidth', 'bodyColor' ],
	// No stars here -- the rating is a select -- so Rating Stars is not offered.
	'testimonial-form': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'successColor', 'successBg', 'errorColor', 'errorBg' ],
	'user-feedback-poll': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'trackColor', 'successColor' ],
	'rating-summary': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor', 'ratingColor', 'trackColor' ],
	'star-rating-bars': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor', 'ratingColor', 'trackColor' ],
	'testimonial-stats': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'mutedColor' ],
	'social-proof-toast': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor' ],
	'comparison-testimonial-table': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth', 'titleColor', 'bodyColor', 'ratingColor', 'trackColor' ],
	'faq-testimonial-accordion': [ 'brandColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'testimonials-avatar-list': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'testimonials-timeline': [ 'brandColor', 'borderColor', 'borderWidth', 'trackColor' ],
	'audio-testimonials': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth' ],
	'video-testimonials': [ 'surfaceColor', 'mutedColor' ],
	'before-after': [ 'labelBgColor', 'labelTextColor', 'gripIconColor' ],
	'case-study-card': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'client-logos': [ 'borderColor', 'borderWidth', 'trackColor' ],
	'testimonials-hero': [ 'brandColor', 'borderColor', 'borderWidth' ],
	'testimonials-popup-modal': [ 'brandColor', 'borderColor', 'borderWidth' ],
	'testimonials-floating-bubble': [ 'brandColor', 'borderColor', 'borderWidth', 'bodyColor', 'trackColor' ],
	'testimonials-card-stack': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'trackColor' ],
	'testimonials-quote-box': [ 'brandColor', 'surfaceColor', 'trackColor' ],
	'testimonials-speech-bubble': [ 'surfaceColor', 'borderColor', 'borderWidth' ],
	'testimonials-compact': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor', 'ratingColor' ],
	'slider-3d': [ 'brandColor' ],
};

/**
 * Roles a block already has its own control for, mapped to that control's
 * attribute.
 *
 * These three blocks ship a bespoke editor with, for example, a "Star color"
 * picker, but nothing carried that value through to the front end -- the
 * attribute only ever styled the editor preview, so the published page kept the
 * stylesheet's literal. Pointing the role at the existing attribute fixes that
 * without adding a second control for the same pixel.
 */
export const PALETTE_ALIASES = {
	'rating-summary': { ratingColor: 'starColor' },
	'testimonial-form': { brandColor: 'accentColor' },
	'testimonial-stats': { brandColor: 'accentColor' },
};

const aliasFor = ( layout, attr ) => PALETTE_ALIASES[ layout ]?.[ attr ];

/**
 * The controls a given layout should show.
 *
 * Aliased roles are dropped: the block's own inspector already offers them, and
 * two controls writing one attribute is its own kind of broken.
 *
 * @param {string} layout Current layout name.
 * @return {Array} Control descriptors, empty when the layout paints nothing the
 *                 registry reaches.
 */
export const getVisualControls = ( layout ) =>
	( LAYOUT_ROLES[ layout ] || [] )
		.filter( ( attr ) => ! aliasFor( layout, attr ) )
		.map( ( attr ) => ( { attr, ...ROLES[ attr ] } ) );

/**
 * CSS custom property declarations for the values the author has set.
 *
 * @param {Object} attributes Block attributes.
 * @param {string} layout     Current layout name.
 * @return {string} Declarations for a style block, empty when nothing is set.
 */
export const getPaletteCSS = ( attributes = {}, layout = '' ) =>
	( LAYOUT_ROLES[ layout ] || [] )
		.map( ( attr ) => {
			const value = attributes[ aliasFor( layout, attr ) || attr ];

			// A width of 0 is a real choice -- it removes the border -- so only
			// an absent value falls back to the stylesheet's literal.
			if ( undefined === value || null === value || '' === value ) {
				return '';
			}

			const { cssVar, type } = ROLES[ attr ];
			return `${ cssVar }: ${ 'width' === type ? `${ value }px` : value };`;
		} )
		.filter( Boolean )
		.join( '\n\t\t' );
