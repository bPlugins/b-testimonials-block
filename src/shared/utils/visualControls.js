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
	// Each role below was checked in the browser rather than read off the source:
	// with the block on a page, every CSS rule matching anything inside it was
	// scanned for the `var(--btb-*)` it references. A role no rule asks for is a
	// control that cannot move a pixel, so it is not offered -- see the removals
	// noted through this list, and ROLE_CONDITIONS for the ones that depend on
	// what the block is currently rendering.
	'google-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'capterra-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'facebook-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'trustpilot-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'g2-review-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	// No Rating Stars: this badge is a tick and a line of text, with no stars for
	// the role to colour.
	'verified-buyer-badge': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor' ],
	'review-badge-widget': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'ratingColor' ],
	'trust-badges': [ 'surfaceColor', 'borderColor', 'borderWidth', 'bodyColor' ],
	// No stars here -- the rating is a select -- so Rating Stars is not offered.
	'testimonial-form': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'successColor', 'successBg', 'errorColor', 'errorBg' ],
	'user-feedback-poll': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor', 'trackColor', 'successColor' ],
	'rating-summary': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor', 'ratingColor', 'trackColor' ],
	'star-rating-bars': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor', 'ratingColor', 'trackColor' ],
	'testimonial-stats': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'mutedColor' ],
	'social-proof-toast': [ 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'mutedColor' ],
	// No Accent: nothing in the table's stylesheet reads `--btb-accent`. Its
	// section colour comes from Headings, its rules from Divider.
	'comparison-testimonial-table': [ 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth', 'titleColor', 'bodyColor', 'ratingColor', 'trackColor' ],
	'faq-testimonial-accordion': [ 'brandColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'testimonials-avatar-list': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'testimonials-timeline': [ 'brandColor', 'borderColor', 'borderWidth', 'trackColor' ],
	'audio-testimonials': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth' ],
	'video-testimonials': [ 'surfaceColor', 'mutedColor' ],
	'before-after': [ 'labelBgColor', 'labelTextColor', 'gripIconColor' ],
	'case-study-card': [ 'brandColor', 'surfaceColor', 'borderColor', 'borderWidth', 'dividerColor', 'dividerWidth', 'titleColor', 'bodyColor', 'mutedColor' ],
	'client-logos': [ 'borderColor', 'borderWidth', 'trackColor' ],
	// No Accent for either: neither layout's stylesheet reads `--btb-accent`. The
	// hero is a themed card in a plain wrapper, and the popup's modal is styled
	// inline rather than through the palette.
	'testimonials-hero': [ 'borderColor', 'borderWidth' ],
	'testimonials-popup-modal': [ 'borderColor', 'borderWidth' ],
	// No Border Color or Width: the bubble's avatar ring is a fixed 2px in the
	// accent colour, and the bubble itself has no border at all.
	'testimonials-floating-bubble': [ 'brandColor', 'bodyColor', 'trackColor' ],
	// Accent and Bars & Tracks paint the prev/next buttons and the dots, which
	// only exist with more than one review -- see ROLE_CONDITIONS.
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
/**
 * Per-layout label overrides.
 *
 * A role is one CSS custom property shared by every stylesheet, so its default
 * label has to be generic -- but what it paints is not. On the video block
 * `--btb-surface` is the round play button and nothing else; calling that
 * control "Card Surface" describes a card the layout never draws. The same
 * happens to `--btb-track`, which is a bar track on the rating widgets but a
 * logo tile, a table header row, a chat bubble or a row of nav dots elsewhere.
 *
 * Each override below was read off the declaration that consumes the variable,
 * quoted beside it, so the label and the pixel cannot drift apart.
 */
export const ROLE_LABELS = {
	// video.scss: `.video-play { background: var(--btb-surface, #fff) }`
	'video-testimonials': {
		surfaceColor: __( 'Play Button', 'b-testimonials-block' ),
	},
	// logos.scss: `.logo-item { background: var(--btb-track, transparent) }`
	'client-logos': {
		trackColor: __( 'Logo Tile Background', 'b-testimonials-block' ),
	},
	// frontend.scss: `.btb-ct-table th { background: var(--btb-track, #f8fafc) }`
	'comparison-testimonial-table': {
		trackColor: __( 'Header Row', 'b-testimonials-block' ),
	},
	// frontend.scss: `.btb-bubble-content { background: var(--btb-track, #f1f5f9) }`
	'testimonials-floating-bubble': {
		trackColor: __( 'Bubble Background', 'b-testimonials-block' ),
	},
	// frontend.scss: `.btb-stack-dot { background: var(--btb-track) }`, and the
	// accent covers both the active dot and the prev/next buttons on hover.
	'testimonials-card-stack': {
		trackColor: __( 'Nav Dots', 'b-testimonials-block' ),
		brandColor: __( 'Nav Buttons & Active Dot', 'b-testimonials-block' ),
	},
	// frontend.scss: the card is
	// `linear-gradient(135deg, var(--btb-surface) 0%, var(--btb-track) 100%)`
	// with `border-left: 5px solid var(--btb-accent)`.
	'testimonials-quote-box': {
		surfaceColor: __( 'Card Gradient Start', 'b-testimonials-block' ),
		trackColor: __( 'Card Gradient End', 'b-testimonials-block' ),
		brandColor: __( 'Left Bar', 'b-testimonials-block' ),
	},
	// frontend.scss: the rail is
	// `linear-gradient(180deg, var(--btb-accent) 0%, var(--btb-track) 100%)`,
	// and the accent also fills the dots along it.
	'testimonials-timeline': {
		trackColor: __( 'Timeline Rail End', 'b-testimonials-block' ),
		brandColor: __( 'Timeline Rail Start & Dots', 'b-testimonials-block' ),
	},
};

/**
 * Roles whose element only exists in some states of the block.
 *
 * A layout can read a role and still have nothing to paint right now: the card
 * stack's prev/next buttons and dots are only rendered when there is more than
 * one review to move between, and the before/after slider is a one-line notice
 * until an image is picked. Offering those controls in that state is the same
 * dead-control problem as offering a role the stylesheet never reads, so they
 * are gated on what is actually on the page.
 *
 * Not applied to getPaletteCSS: a value set while the control was showing stays
 * declared, so adding the second review brings the colour back rather than
 * silently dropping it.
 *
 * Each predicate takes the block's attributes and returns whether the element
 * the role paints is currently rendered.
 */
const hasStackNav = ( attributes ) => ( attributes?.items?.length || 0 ) > 1;

// Matches the editor's own condition for rendering the slider rather than the
// "pick an image" notice.
const hasSliderImages = ( attributes ) =>
	!! ( attributes?.beforeImg?.url || attributes?.afterImg?.url );

export const ROLE_CONDITIONS = {
	'testimonials-card-stack': {
		brandColor: hasStackNav,
		trackColor: hasStackNav,
	},
	'before-after': {
		labelBgColor: hasSliderImages,
		labelTextColor: hasSliderImages,
		gripIconColor: hasSliderImages,
	},
};

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
 * two controls writing one attribute is its own kind of broken. So are roles
 * whose element the block is not rendering in its current state.
 *
 * @param {string} layout     Current layout name.
 * @param {Object} attributes Block attributes, for the state-dependent roles in
 *                            ROLE_CONDITIONS. Omit to offer them unconditionally.
 * @return {Array} Control descriptors, empty when the layout paints nothing the
 *                 registry reaches.
 */
export const getVisualControls = ( layout, attributes ) =>
	( LAYOUT_ROLES[ layout ] || [] )
		.filter( ( attr ) => ! aliasFor( layout, attr ) )
		.filter( ( attr ) => {
			const condition = ROLE_CONDITIONS[ layout ]?.[ attr ];
			if ( ! condition || ! attributes ) {
				return true;
			}

			// A role that already carries a value keeps its control even while the
			// element is absent, so a colour set earlier can still be changed or
			// cleared rather than being stranded behind a hidden control.
			const value = attributes[ aliasFor( layout, attr ) || attr ];
			const isSet = undefined !== value && null !== value && '' !== value;

			return condition( attributes ) || isSet;
		} )
		.map( ( attr ) => ( {
			attr,
			...ROLES[ attr ],
			// Named for what it paints on this layout, where that differs from the
			// role's generic name.
			...( ROLE_LABELS[ layout ]?.[ attr ]
				? { label: ROLE_LABELS[ layout ][ attr ] }
				: {} ),
		} ) );

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
