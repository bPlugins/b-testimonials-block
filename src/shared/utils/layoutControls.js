/**
 * Which inspector controls each layout can actually act on.
 *
 * All 40 child blocks share one Settings component and one Style component, and
 * the sidebar was gated almost entirely on `isSingleItemBlock` -- "does this
 * layout show more than one testimonial". That is a different question from
 * "does this layout paint the thing this control sets", so the two answers
 * diverged in both directions: a timeline offered a Columns range it renders as
 * a single file, a social proof toast offered a Theme select whose attribute it
 * does not even register, every layout offered the Card panel even where its CSS
 * reaches nothing, and the card stack -- which does render themed cards -- was
 * denied the Elements and Theme controls that work on it.
 *
 * Each entry below is read off two places rather than guessed:
 *
 *   Layout.js  -- what the layout renders, and through which component. Anything
 *                 built from a Themes/* card honours the Elements toggles, the
 *                 Theme select and the inline rating colour; bespoke markup does
 *                 not.
 *   Style.js   -- which selector the control's CSS lands on. The card, image,
 *                 name, designation and review-text rules are all scoped to
 *                 `.layoutSection .single`, and the grid-gap rule to
 *                 `.layoutSection`, so a layout that builds its own wrapper gets
 *                 none of them however it renders its cards.
 *
 * A control is offered only where both agree it moves a pixel.
 */

/**
 * The card parts a Themes/* component renders, each behind its Elements toggle.
 */
const CARD_PARTS = ["img", "name", "deg", "reviewText", "icon"];

/**
 * What a layout gets for handing its items to a Themes/* component.
 *
 * These three are component-level rather than CSS-level -- the toggles drop the
 * markup, the theme picks the component, and the rating colour is written inline
 * by getStar -- so they work regardless of which wrapper the layout builds.
 */
const THEMED = {
  elements: CARD_PARTS,
  theme: true,
  ratingIcon: true,
};

/**
 * What a layout gets for wrapping its cards in `.layoutSection`.
 *
 * Everything here is a Style.js rule scoped to that wrapper or to
 * `.layoutSection .single`, plus the column classes the wrapper's grid reads.
 */
const SECTIONED = {
  columns: true,
  gaps: true,
  cardBox: true,
  image: true,
  nameStyle: true,
  degStyle: true,
  textStyle: true,
  topStrip: true,
};

const FULL = { ...THEMED, ...SECTIONED };

/**
 * The single-widget blocks whose whole widget is `.btb-badge-card`, which is one
 * of the seven selectors the Card panel's background/padding/border/shadow rule
 * names. Nothing else in the sidebar reaches them.
 */
const BADGE = { cardBox: true };

export const LAYOUT_CONTROLS = {
  // -- Themed cards in `.layoutSection` -------------------------------------
  // The five interchangeable arrangements, the slider variants, and the three
  // CSS-only variations of the default card list.
  default: FULL,
  list: FULL,
  masonry: FULL,
  marquee: FULL,
  slider: FULL,
  "slider-3d": FULL,
  coverflow: FULL,
  "testimonials-quote-box": FULL,
  "testimonials-speech-bubble": FULL,
  "testimonials-compact": FULL,
  // Both build their own wrapper but keep `layoutSection` and the theme class
  // on it, so they read every rule the arrangements do.
  "audio-testimonials": FULL,
  "testimonials-popup-modal": FULL,

  // -- Themed cards in a bespoke wrapper ------------------------------------
  // `.btb-timeline-card`, `.btb-hero-card` and `.btb-stacked-card` hold a real
  // `.single`, so the Elements toggles, the Theme select and the rating colour
  // all apply -- but no `.layoutSection` sits above them, so the Card, Image,
  // Name, Designation, Review Text and Top panels reach nothing, and neither
  // does the grid-gap rule.
  "testimonials-timeline": { ...THEMED },
  // The one exception: the secondary grid below the hero card carries the
  // `columns-*` classes, which are global rather than scoped.
  "testimonials-hero": { ...THEMED, columns: true },
  "testimonials-card-stack": { ...THEMED },

  // -- Bespoke markup ------------------------------------------------------
  // Renders its own `.btb-avatar-*` parts, which Style.js names alongside the
  // `.single` ones for exactly this reason, and `.btb-avatar-list-wrapper` is
  // in the Card rule. Its three parts are always rendered, so no toggle for
  // them would do anything.
  "testimonials-avatar-list": {
    cardBox: true,
    nameStyle: true,
    degStyle: true,
    textStyle: true,
  },
  // `.btb-toast-card` and `.btb-star-rating-bars` are in the Card rule; the
  // text inside both is styled by the stylesheet through the palette
  // variables, which the Colors panel already exposes.
  "social-proof-toast": { cardBox: true },
  "star-rating-bars": { cardBox: true },
  // `.btb-case-study-grid` takes its track count from the global `columns-*`
  // classes, but its gap is the stylesheet's own.
  "case-study-card": { columns: true },
  // These three print the review text through `itemsEls`, so that one toggle
  // -- and the excerpt controls with it -- is honoured. Everything else in
  // their markup is unconditional.
  "testimonials-floating-bubble": { elements: ["reviewText"] },
  "comparison-testimonial-table": { elements: ["reviewText"] },
  "faq-testimonial-accordion": { elements: ["reviewText"] },
  // Nothing in the sidebar's shared panels reaches the poll.
  "user-feedback-poll": {},

  "google-review-badge": BADGE,
  "capterra-review-badge": BADGE,
  "facebook-review-badge": BADGE,
  "trustpilot-review-badge": BADGE,
  "g2-review-badge": BADGE,
  "verified-buyer-badge": BADGE,
  "review-badge-widget": BADGE,

  // -- The blocks that ship their own editor --------------------------------
  // These do not render the shared Settings tab, so nothing reads the entries
  // below today. They are listed so the registry stays a complete answer to
  // "what can this layout be styled with", and so a block moved onto the
  // shared panels later starts from a checked answer rather than the FULL
  // fallback.
  "before-after": {},
  "rating-summary": {},
  "testimonial-form": {},
  "client-logos": { columns: true, gaps: true },
  "video-testimonials": { columns: true, gaps: true },
  "testimonial-stats": { columns: true, gaps: true, cardBox: true },
  "trust-badges": { columns: true, gaps: true, cardBox: true },
};

const NONE = {
  elements: [],
  theme: false,
  ratingIcon: false,
  columns: false,
  gaps: false,
  cardBox: false,
  image: false,
  nameStyle: false,
  degStyle: false,
  textStyle: false,
  topStrip: false,
};

/**
 * The controls a layout supports.
 *
 * An unlisted layout falls back to the full set: that is what the classic parent
 * block and the `single` / `testimonials-single` layouts are, and it keeps a
 * newly added layout visible rather than silently stripped.
 *
 * @param {string} layout Current layout name.
 * @return {Object} One flag per control group, plus `elements` as the list of
 *                  card parts whose toggle is honoured.
 */
export const getLayoutControls = (layout) => ({
  ...NONE,
  ...(LAYOUT_CONTROLS[layout] || FULL),
});
