import { __, sprintf } from "@wordpress/i18n";

/**
 * Which layouts expose icon controls, and what each icon slot is called.
 *
 * Third-party review-badge logos (Google, Capterra, Facebook, Trustpilot, G2)
 * are deliberately absent: they are other companies' trademarks and a swapped
 * or recoloured logo stops working as a recognisable review badge.
 *
 * Rating stars are absent too — they already have their own `starIconColor`.
 *
 * `size` is the layout's default icon box and the reset value behind the Icon
 * Size control. It is absent on trust-badges alone: that block grew a
 * block-level Icon Size of its own, and with both controls live the per-slot
 * one silently won, so there the box belongs to the block and not the slot.
 *
 * `slots` is either an array or a function of the attributes, for the layouts
 * whose icons come from a repeater -- see resolveIconSlots().
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
    // The only layout whose icons are a repeater rather than a fixed set, so
    // its slots are derived instead of listed: the Badges panel adds badges
    // without limit, and four hardcoded slots both ran out past the fourth
    // badge and offered pickers for badges that did not exist. With no badges
    // at all the block still renders its four-badge fallback, so four is the
    // right count then.
    slots: ({ items = [] } = {}) =>
      (items.length ? items : Array.from({ length: 4 })).map((item, i) => ({
        key: `trust${i}`,
        // Names the badge, not the control: the panel shows one slot at a time
        // behind a row of these, so this is the chip and the heading above the
        // icon controls rather than a label beside one.
        label:
          item?.title ||
          // translators: %d is the badge's position, starting at 1.
          sprintf(__("Badge %d", "b-testimonials-block"), i + 1),
        // A badge with an uploaded image never reaches its icon slot, so say so
        // rather than leaving a picker that quietly does nothing.
        note: item?.img?.url
          ? __(
              "This badge shows its uploaded image, so the icon below is unused until that image is removed.",
              "b-testimonials-block",
            )
          : "",
      })),
    // Adding a badge is what creates the next slot, so the Badges panel's Add
    // button is repeated here -- otherwise picking an icon for a fifth badge
    // means leaving this panel to make the badge first.
    add: {
      attribute: "items",
      newItem: { img: { url: "" }, title: "", subtitle: "" },
      label: __("Add New Badge", "b-testimonials-block"),
    },
    // Singular noun for the chips. Same word the Badges panel numbers its own
    // cards with, so the two panels agree on what "Badge 2" means.
    itemLabel: __("Badge", "b-testimonials-block"),
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

/**
 * The icon slots a block currently has.
 *
 * @param {Object} config     An ICON_LAYOUTS entry.
 * @param {Object} attributes Block attributes.
 * @return {Array} Slots: { key, label, note }.
 */
export const resolveIconSlots = (config, attributes = {}) =>
  "function" === typeof config?.slots
    ? config.slots(attributes)
    : config?.slots || [];

/** Whether a layout has any icon to configure. */
export const hasIconControls = (layout) => Boolean(ICON_LAYOUTS[layout]);

/** Read one icon slot off the `customIcons` attribute. */
export const getIcon = (attributes = {}, slot) =>
  (attributes?.customIcons || {})[slot] || {};
