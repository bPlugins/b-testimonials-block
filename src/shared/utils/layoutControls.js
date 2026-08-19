import { __ } from "@wordpress/i18n";

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
  imageBorder: true,
  nameStyle: true,
  degStyle: true,
  textStyle: true,
  topStrip: true,
};

const FULL = { ...THEMED, ...SECTIONED };

/**
 * The card-level half of SECTIONED: everything Style.js writes against `.single`
 * itself, with none of the rules that need the `.layoutSection` wrapper (the
 * column tracks and the grid gap).
 */
const CARD_STYLE = {
  cardBox: true,
  image: true,
  imageBorder: true,
  nameStyle: true,
  degStyle: true,
  textStyle: true,
};

/**
 * The single-widget blocks whose whole widget is `.btb-badge-card`, which is one
 * of the seven selectors the Card panel's background/padding/border/shadow rule
 * names.
 *
 * The Card panel used to be all they had, which left every font size in them a
 * stylesheet literal: the heading at 17px/700, the secondary line at 13px, the
 * score at 18px/800 and the star row at 16px, none of them reachable from the
 * sidebar. Two of those four map onto shared roles -- Style.js names
 * `.btb-badge-title` alongside the other Name parts and `.btb-badge-desc` /
 * `.btb-badge-rating .count` alongside the Designation ones -- so those two
 * panels are offered here. The score and the stars have no shared role and get
 * their own panel instead.
 *
 * No `textStyle`: nothing in a badge is a review paragraph, so the Review Text
 * panel would open onto a selector list that names none of this markup.
 */
const BADGE = { cardBox: true, nameStyle: true, degStyle: true };

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
  // `.single` with no `.layoutSection` above it. That used to cost them the
  // Card, Image, Name, Designation and Review Text panels, because every rule
  // behind those panels was scoped to `.layoutSection .single` and so reached
  // nothing here -- the hero card's avatar in particular ignored the Image
  // width and height entirely and rendered at its natural size.
  //
  // Style.js names `.single` on its own now, so all five reach these three. The
  // grid-gap rule is still scoped to `.layoutSection`, which is why `gaps` stays
  // off.
  "testimonials-timeline": { ...THEMED, ...CARD_STYLE },
  // The secondary grid below the hero card carries the `columns-*` classes,
  // which are global rather than scoped.
  "testimonials-hero": { ...THEMED, ...CARD_STYLE, columns: true },
  "testimonials-card-stack": { ...THEMED, ...CARD_STYLE },

  // -- Bespoke markup ------------------------------------------------------
  // Renders its own `.btb-avatar-*` parts, which Style.js names alongside the
  // `.single` ones for exactly this reason, and `.btb-avatar-list-wrapper` is
  // in the Card rule. Its three parts are always rendered, so no toggle for
  // them would do anything.
  // Every entry below gained controls when Style.js stopped naming only
  // `.single .name` and friends and started naming each layout's own classes as
  // well. Before that the stylesheet's hardcoded font sizes and avatar sizes
  // were the only values in play, which is what made the panels look dead; those
  // values now live in each block's attribute defaults, so an untouched block
  // renders as it always did and the control owns the property from there.
  //
  // None of the four below sets `imageBorder`. Avatar *size* reaches their own
  // classes, but the border rule is still scoped to `.single .img`, so the Image
  // panel's Border control moved nothing on them -- measured on each. Widening
  // that rule would repaint rings these layouts define themselves (the avatar
  // list's `--btb-border` ring, the bubble's accent ring), so the control is
  // hidden rather than left half-working.
  "testimonials-avatar-list": {
    cardBox: true,
    image: true,
    nameStyle: true,
    degStyle: true,
    textStyle: true,
  },
  // `.btb-toast-text` and `.btb-toast-meta` are the message and its byline, and
  // `.btb-toast-avatar` the photo beside them.
  "social-proof-toast": {
    cardBox: true,
    image: true,
    nameStyle: true,
    degStyle: true,
  },
  // Title, per-star label and count map onto Name, Review Text and Designation
  // -- the same three roles the Colors panel already paints them with.
  "star-rating-bars": {
    cardBox: true,
    nameStyle: true,
    degStyle: true,
    textStyle: true,
  },
  // `.btb-case-study-grid` takes its track count from the global `columns-*`
  // classes, but its gap is the stylesheet's own.
  "case-study-card": {
    columns: true,
    cardBox: true,
    image: true,
    nameStyle: true,
    degStyle: true,
    textStyle: true,
  },
  // These three print the review text through `itemsEls`, so that one toggle
  // -- and the excerpt controls with it -- is honoured. Everything else in
  // their markup is unconditional.
  //
  // The bubble's name is accent-coloured by design, so it takes the Name
  // typography without the Name colour; no Designation part is rendered.
  //
  // `gaps` is on despite the missing `.layoutSection`: the bubbles sit in a
  // wrapping flex row spaced by a gap, so both controls have something real to
  // move, and Style.js names that wrapper directly. The block's own gap
  // defaults were lowered to the 20px the stylesheet had been using, so an
  // untouched block renders exactly as it did before the control existed.
  "testimonials-floating-bubble": {
    elements: ["reviewText"],
    gaps: true,
    image: true,
    nameStyle: true,
    textStyle: true,
  },
  // Table title is the Name role, the review cells the Review Text role. The
  // column headers keep the stylesheet's own styling -- they are chrome rather
  // than a card part.
  "comparison-testimonial-table": {
    elements: ["reviewText"],
    cardBox: true,
    nameStyle: true,
    textStyle: true,
  },
  // Question / answer / author map onto Name, Review Text and Designation.
  //
  // No Card panel: `.btb-faq-item` is where it would land, and the stylesheet
  // recolours that border on `[open]` to mark the expanded row. An ID-scoped
  // border from the Card panel outranks the `[open]` rule, so offering it would
  // trade the open-state indicator for a box control.
  "faq-testimonial-accordion": {
    elements: ["reviewText"],
    nameStyle: true,
    degStyle: true,
    textStyle: true,
  },
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

/**
 * Controls whose target only exists at certain item counts.
 *
 * now. The hero spotlight is the case: it spends the first testimonial on the
 * A layout can support a control and still have nothing for it to act on right
 * big card, so Columns only lays out the row beneath, and that row is clamped to
 * the number of cards in it so a four-column setting cannot leave three tracks
 * empty. Measured across item counts:
 *
 *   1 testimonial  -> no follower row is rendered at all; Columns is inert
 *   2              -> one follower, clamped to one track; Columns is inert
 *   3              -> two followers; Columns moves between 1 and 2
 *   5              -> four followers; Columns moves between 1 and 4
 *
 * So the control is offered from three testimonials up, which is the first count
 * at which changing it changes the page.
 *
 * Each predicate takes the block's attributes and returns whether the control
 * has something to act on.
 */
export const CONTROL_CONDITIONS = {
  "testimonials-hero": {
    columns: (attributes) => (attributes?.items?.length || 0) > 2,
  },
};

/**
 * Per-layout titles for the shared typography panels.
 *
 * The Name, Designation and Review Text panels are three roles shared by forty
 * blocks, so their default titles have to describe a testimonial card. On the
 * review badges they do not: the Name panel styles a heading like "Google
 * Reviews", and the Designation panel a review count or a line of description.
 * Offering the control under the card's name would leave an author guessing
 * which of the two lines in front of them it moves.
 *
 * Only the badges are listed. Every other layout keeps the default titles, so
 * this renames nothing that reads correctly today.
 *
 * @see ROLE_LABELS in visualControls.js, which does the same for the Colors
 *      panel's per-role labels.
 */
const BADGE_TITLE_LABEL = __("Badge Title", "b-testimonials-block");
const REVIEW_COUNT_LABEL = __("Review Count", "b-testimonials-block");

export const TYPO_PANEL_LABELS = {
  "google-review-badge": { name: BADGE_TITLE_LABEL, deg: REVIEW_COUNT_LABEL },
  "capterra-review-badge": { name: BADGE_TITLE_LABEL, deg: REVIEW_COUNT_LABEL },
  "facebook-review-badge": { name: BADGE_TITLE_LABEL, deg: REVIEW_COUNT_LABEL },
  "trustpilot-review-badge": {
    name: BADGE_TITLE_LABEL,
    deg: REVIEW_COUNT_LABEL,
  },
  "g2-review-badge": { name: BADGE_TITLE_LABEL, deg: REVIEW_COUNT_LABEL },
  "review-badge-widget": { name: BADGE_TITLE_LABEL, deg: REVIEW_COUNT_LABEL },
  // The only badge that renders a sentence rather than a count.
  "verified-buyer-badge": {
    name: BADGE_TITLE_LABEL,
    deg: __("Description", "b-testimonials-block"),
  },
};

/**
 * The badges that render a score and a star row, and so have something for the
 * Badge Score panel to act on.
 *
 * The Verified Buyer seal is the one that does not -- it renders a heading and a
 * line of description and nothing else -- so it is absent rather than shown a
 * panel that moves nothing.
 */
export const SCORED_BADGE_LAYOUTS = [
  "google-review-badge",
  "capterra-review-badge",
  "facebook-review-badge",
  "trustpilot-review-badge",
  "g2-review-badge",
  "review-badge-widget",
];

/**
 * The badges whose logo is a fixed third-party mark.
 *
 * Google, Capterra, Facebook, Trustpilot and G2 draw their own wordmark or
 * glyph, and blockIcons.js deliberately keeps them out of the icon controls:
 * they are other companies' trademarks, and a swapped or recoloured logo stops
 * working as a recognisable review badge.
 *
 * Size is not that. Making the mark bigger or smaller leaves it the same mark,
 * and it was the one thing about these five with no control at all -- a 36px
 * literal in Layout.js, whatever the badge sat next to. The other two badges are
 * absent because their logo is a real icon slot, so its size belongs to the Icon
 * panel and a second control here would set the same pixel twice.
 */
export const BRAND_LOGO_LAYOUTS = [
  "google-review-badge",
  "capterra-review-badge",
  "facebook-review-badge",
  "trustpilot-review-badge",
  "g2-review-badge",
];

const NONE = {
  elements: [],
  theme: false,
  ratingIcon: false,
  columns: false,
  gaps: false,
  cardBox: false,
  image: false,
  imageBorder: false,
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
 * @param {string} layout     Current layout name.
 * @param {Object} attributes Block attributes, for the item-count conditions in
 *                            CONTROL_CONDITIONS. Omit to skip those checks.
 * @return {Object} One flag per control group, plus `elements` as the list of
 *                  card parts whose toggle is honoured.
 */
export const getLayoutControls = (layout, attributes) => {
  const controls = { ...NONE, ...(LAYOUT_CONTROLS[layout] || FULL) };

  if (!attributes) {
    return controls;
  }

  for (const [name, condition] of Object.entries(
    CONTROL_CONDITIONS[layout] || {},
  )) {
    if (controls[name] && !condition(attributes)) {
      controls[name] = false;
    }
  }

  return controls;
};
