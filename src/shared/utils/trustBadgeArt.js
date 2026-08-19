import { BRAND_COLOR } from "./icons";

/**
 * The built-in artwork behind each Trust Badges slot.
 *
 * A badge with no uploaded image and no icon picked falls back to one of these,
 * chosen by its position: a shield, a tick, a star and a verified circle.
 *
 * Shared because the block draws itself twice. Layout.js renders the published
 * page, `src/blocks/trust-badges/edit.js` renders the editor preview, and only
 * the first had this list -- the editor drew the shield for every badge, in the
 * brand colour, whatever position it sat in. So a three-badge block showed three
 * identical blue shields while editing and a shield, a tick and an amber star
 * once published.
 *
 * The star keeps its own amber; the rest use the brand colour.
 */
export const TRUST_BADGE_ART = [
  {
    slot: "trust0",
    color: BRAND_COLOR,
    d: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  },
  {
    slot: "trust1",
    color: BRAND_COLOR,
    d: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  },
  {
    slot: "trust2",
    color: "#FF9D28",
    d: "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  },
  {
    slot: "trust3",
    color: BRAND_COLOR,
    d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  },
];

/**
 * The artwork for one badge position.
 *
 * There are four drawings and no limit on badges, so a fifth badge and beyond
 * repeats the first rather than rendering nothing -- which is what the page has
 * always done.
 *
 * @param {number} index Badge position, from 0.
 * @return {{slot: string, color: string, d: string}} Slot key, colour and path.
 */
export const getTrustBadgeArt = (index) =>
  TRUST_BADGE_ART[index] || TRUST_BADGE_ART[0];
