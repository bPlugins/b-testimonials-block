import { __ } from "@wordpress/i18n";

/**
 * Which layouts expose icon controls, and what each icon slot is called.
 *
 * Third-party review-badge logos (Google, Capterra, Facebook, Trustpilot, G2)
 * are deliberately absent: they are other companies' trademarks and a swapped
 * or recoloured logo stops working as a recognisable review badge.
 *
 * Rating stars are absent too — they already have their own `starIconColor`.
 */
export const ICON_LAYOUTS = {
  "verified-buyer-badge": {
    size: 36,
    slots: [{ key: "badge", label: __("Badge Icon", "b-testimonials-block") }],
  },
  "review-badge-widget": {
    size: 36,
    slots: [{ key: "badge", label: __("Badge Icon", "b-testimonials-block") }],
  },
  "trust-badges": {
    size: 32,
    slots: [
      { key: "trust0", label: __("Badge 1 Icon", "b-testimonials-block") },
      { key: "trust1", label: __("Badge 2 Icon", "b-testimonials-block") },
      { key: "trust2", label: __("Badge 3 Icon", "b-testimonials-block") },
      { key: "trust3", label: __("Badge 4 Icon", "b-testimonials-block") },
    ],
  },
  "audio-testimonials": {
    size: 40,
    slots: [{ key: "play", label: __("Play Icon", "b-testimonials-block") }],
  },
  "video-testimonials": {
    size: 26,
    slots: [{ key: "play", label: __("Play Icon", "b-testimonials-block") }],
  },
};

/** Whether a layout has any icon to configure. */
export const hasIconControls = (layout) => Boolean(ICON_LAYOUTS[layout]);

/** Read one icon slot off the `customIcons` attribute. */
export const getIcon = (attributes = {}, slot) =>
  (attributes?.customIcons || {})[slot] || {};
