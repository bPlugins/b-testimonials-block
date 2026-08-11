/**
 * Which layouts render which parts, for gating the inspector.
 *
 * The excerpt and Expand/Less controls used to hang off `isSingleItemBlock`,
 * which is a different question -- it asks how many testimonials a layout
 * shows, not whether it prints their review text. The two sets nearly match,
 * and the gap went both ways: three layouts that do print review text hid the
 * controls, and three that print none offered them.
 */

/**
 * Layouts an excerpt cut and an Expand toggle cannot act on.
 *
 * Most render no review text at all. The last two do render it, but not as a
 * review paragraph: the avatar list styles its own `.btb-avatar-review` with a
 * separate editor path, and the case study only falls back to `reviewText` as
 * the body of its "Solution" section. Truncating either would be wrong, so they
 * stay out rather than showing a control that does nothing.
 */
export const NO_REVIEW_TEXT_LAYOUTS = [
  "google-review-badge",
  "capterra-review-badge",
  "facebook-review-badge",
  "trustpilot-review-badge",
  "g2-review-badge",
  "verified-buyer-badge",
  "review-badge-widget",
  "trust-badges",
  "testimonial-form",
  "user-feedback-poll",
  "rating-summary",
  "star-rating-bars",
  "testimonial-stats",
  "social-proof-toast",
  "video-testimonials",
  "before-after",
  "client-logos",
  "testimonials-avatar-list",
  "case-study-card",
];

/**
 * Whether a layout prints the review text.
 *
 * Everything not listed above either renders it directly or hands the item to
 * a theme component that does, including the classic layouts that fall through
 * Layout.js without a branch of their own.
 *
 * @param {string} layout Current layout name.
 * @return {boolean} True when the layout renders review text.
 */
export const rendersReviewText = (layout) =>
  !NO_REVIEW_TEXT_LAYOUTS.includes(layout);
