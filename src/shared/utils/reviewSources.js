import { __, _n, sprintf } from "@wordpress/i18n";

/**
 * Where a review badge's score and count come from.
 *
 * The six badges each used to work this out inline, and all six did it the same
 * way with different literals: the sidebar's `badgeScore`, else the average of
 * the local testimonials, else a number written into Layout.js. Only the first
 * of those is even a claim about the platform whose logo is printed beside it.
 *
 * A fourth source sits above all three now: the platform's own figure, resolved
 * server-side by includes/review-sources.php from one site-wide setting. Google,
 * Facebook and Trustpilot fetch it from their official APIs; G2 and Capterra
 * cannot be fetched at all -- they answer every server-side request with 403 --
 * so theirs is entered once on that screen rather than once per block, which is
 * the part that was actually broken about those two.
 *
 * The precedence has moved here so it is decided once. `resolveBadge()` is the
 * whole public surface; the presets below are the per-platform wording that used
 * to be scattered through Layout.js's six branches.
 */

/**
 * The layout key each platform badge registers, mapped to its platform.
 *
 * The mirror of BPBTB_Review_Sources::LAYOUT_PLATFORMS. One decides what gets
 * fetched, the other what gets drawn, so they have to agree.
 */
export const BADGE_PLATFORMS = {
  "google-review-badge": "google",
  "capterra-review-badge": "capterra",
  "facebook-review-badge": "facebook",
  "trustpilot-review-badge": "trustpilot",
  "g2-review-badge": "g2",
};

/**
 * The generic badge, which is bound to no platform by its own identity and
 * picks one in the inspector instead.
 */
export const GENERIC_BADGE_LAYOUT = "review-badge-widget";

/**
 * The five platforms, for the inspector's select.
 */
export const REVIEW_PLATFORM_OPTIONS = [
  { label: __("Google", "b-testimonials-block"), value: "google" },
  { label: __("Facebook", "b-testimonials-block"), value: "facebook" },
  { label: __("Trustpilot", "b-testimonials-block"), value: "trustpilot" },
  { label: __("G2", "b-testimonials-block"), value: "g2" },
  { label: __("Capterra", "b-testimonials-block"), value: "capterra" },
];

/**
 * Which platform a block is asking for, or "" when it is not a review badge.
 *
 * @param {string} layout     The block's layout attribute.
 * @param {Object} attributes Block attributes.
 * @return {string} Platform slug.
 */
export const getBadgePlatform = (layout, attributes = {}) => {
  if (BADGE_PLATFORMS[layout]) {
    return BADGE_PLATFORMS[layout];
  }

  if (GENERIC_BADGE_LAYOUT === layout) {
    const picked = attributes?.ratingPlatform || "";

    return REVIEW_PLATFORM_OPTIONS.some((o) => o.value === picked) ? picked : "";
  }

  return "";
};

/**
 * A rating as one decimal place, in the site's locale.
 *
 * @param {number} value Rating.
 * @return {string}
 */
const formatScore = (value) => {
  const num = Number(value);

  if (!Number.isFinite(num)) {
    return "";
  }

  return num.toLocaleString(undefined, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

/**
 * A review count with the locale's thousands separator.
 *
 * A real Google listing runs to five figures, and "12483 Reviews" reads as a
 * serial number rather than a quantity.
 *
 * @param {number} value Count.
 * @return {string}
 */
const formatCount = (value) => {
  const num = Number(value);

  return Number.isFinite(num) ? num.toLocaleString() : "";
};

/**
 * Per-badge wording.
 *
 * `title` and the two `demo*` strings are what the badge showed before any of
 * this existed, kept exactly so an unconnected badge looks the way it always
 * has. `live` and `local` are the templates for a real figure -- the difference
 * between them is that a live count is the platform's total while a local one
 * counts the testimonials on this site, so "500+" is honest in one and a lie in
 * the other.
 */
const BADGE_PRESETS = {
  "google-review-badge": {
    title: () => __("Google Reviews", "b-testimonials-block"),
    outOfFive: false,
    demoScore: "4.9",
    demoCount: () => __("(128+ Reviews)", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of reviews */
        _n("(%s Review)", "(%s Reviews)", count, "b-testimonials-block"),
        formatCount(count),
      ),
    local: (total) =>
      sprintf(
        /* translators: %s: number of testimonials on this site */
        _n("(%s Review)", "(%s Reviews)", total, "b-testimonials-block"),
        formatCount(total),
      ),
  },
  "capterra-review-badge": {
    title: () => __("Capterra Rating", "b-testimonials-block"),
    outOfFive: false,
    demoScore: "4.8",
    demoCount: () => __("Verified Software Reviews", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of reviews */
        _n("(%s Review)", "(%s Reviews)", count, "b-testimonials-block"),
        formatCount(count),
      ),
    local: (total) =>
      sprintf(
        /* translators: %s: number of testimonials on this site */
        _n("(%s Review)", "(%s Reviews)", total, "b-testimonials-block"),
        formatCount(total),
      ),
  },
  "facebook-review-badge": {
    title: () => __("Facebook Reviews", "b-testimonials-block"),
    outOfFive: false,
    demoScore: "5.0",
    demoCount: () =>
      __("Recommended by 250+ Customers", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of recommendations */
        _n(
          "Recommended by %s Customer",
          "Recommended by %s Customers",
          count,
          "b-testimonials-block",
        ),
        formatCount(count),
      ),
    local: (total) =>
      sprintf(
        /* translators: %s: number of testimonials on this site */
        _n(
          "Recommended by %s Customer",
          "Recommended by %s Customers",
          total,
          "b-testimonials-block",
        ),
        formatCount(total),
      ),
  },
  "trustpilot-review-badge": {
    title: () => __("Trustpilot Score", "b-testimonials-block"),
    outOfFive: true,
    demoScore: "4.9 / 5",
    demoCount: () => __("TrustScore | 500+ Reviews", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of reviews */
        _n(
          "TrustScore | %s Review",
          "TrustScore | %s Reviews",
          count,
          "b-testimonials-block",
        ),
        formatCount(count),
      ),
    local: (total) =>
      sprintf(
        /* translators: %s: number of testimonials on this site */
        _n(
          "TrustScore | %s Review",
          "TrustScore | %s Reviews",
          total,
          "b-testimonials-block",
        ),
        formatCount(total),
      ),
  },
  "g2-review-badge": {
    title: () => __("G2 High Performer", "b-testimonials-block"),
    outOfFive: true,
    demoScore: "4.8 / 5",
    demoCount: () => __("Leader Category 2026", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of reviews */
        _n("(%s Review)", "(%s Reviews)", count, "b-testimonials-block"),
        formatCount(count),
      ),
    // No local template on purpose. This badge's count field is a category
    // label ("Leader, Spring 2026"), not a number, so averaging the site's own
    // testimonials into it never meant anything -- and the demo string is what
    // it fell back to anyway.
    local: null,
  },
  "review-badge-widget": {
    title: () => __("Customer Reviews", "b-testimonials-block"),
    outOfFive: false,
    demoScore: "4.9",
    demoCount: () => __("Based on 320+ reviews", "b-testimonials-block"),
    live: (count) =>
      sprintf(
        /* translators: %s: number of reviews */
        _n(
          "Based on %s review",
          "Based on %s reviews",
          count,
          "b-testimonials-block",
        ),
        formatCount(count),
      ),
    local: (total) =>
      sprintf(
        /* translators: %s: number of testimonials on this site */
        _n(
          "Based on %s review",
          "Based on %s reviews",
          total,
          "b-testimonials-block",
        ),
        formatCount(total),
      ),
  },
};

/**
 * Is this layout one of the badges resolveBadge() knows?
 *
 * @param {string} layout Layout key.
 * @return {boolean}
 */
export const isReviewBadge = (layout) =>
  Object.prototype.hasOwnProperty.call(BADGE_PRESETS, layout);

/**
 * The title, score and count a review badge should draw.
 *
 * Precedence, highest first:
 *
 *   1. The platform's published figures, when Rating Source is Live and the
 *      platform is connected. `liveScore` / `liveCount` are injected by
 *      render.php on the front end and by Edit.js in the editor -- never
 *      saved into the block, so they cannot go stale in post content.
 *   2. Whatever the author typed into the inspector.
 *   3. The average of the testimonials this block is showing.
 *   4. The demo figures, which is what an unconnected badge has always shown.
 *
 * Note that 2 sits above 3 and 4 but below 1: a typed score is a deliberate
 * override of a guess, and the platform's own number is not a guess.
 *
 * @param {string} layout     Layout key.
 * @param {Object} attributes Block attributes, with any live values merged in.
 * @param {Object} stats      Computed local stats: { total, avg }.
 * @return {Object} { title, score, count, url, isLive }
 */
export const resolveBadge = (layout, attributes = {}, stats = {}) => {
  const preset = BADGE_PRESETS[layout];

  if (!preset) {
    return { title: "", score: "", count: "", url: "", isLive: false };
  }

  const manualTitle = attributes.badgeTitle || "";
  const manualScore = attributes.badgeScore || "";
  const manualCount = attributes.badgeCount || "";

  const total = Number(stats.total) || 0;
  const localAvg = stats.avg;

  // Live only when the block asked for it. `ratingSource` defaults to "live",
  // so an existing badge starts using its platform the moment one is connected
  // -- and shows exactly what it showed before until then.
  const wantsLive = (attributes.ratingSource || "live") === "live";
  const liveScore =
    wantsLive && attributes.liveScore !== undefined &&
    attributes.liveScore !== null &&
    attributes.liveScore !== ""
      ? Number(attributes.liveScore)
      : null;
  const isLive = Number.isFinite(liveScore) && liveScore > 0;

  const liveCount =
    isLive && attributes.liveCount !== undefined && attributes.liveCount !== null
      ? Number(attributes.liveCount)
      : null;

  const withScale = (formatted) =>
    preset.outOfFive
      ? sprintf(
          /* translators: %s: rating, e.g. 4.9 — the "/ 5" says which scale it is on */
          __("%s / 5", "b-testimonials-block"),
          formatted,
        )
      : formatted;

  let score;
  if (isLive) {
    score = withScale(formatScore(liveScore));
  } else if (manualScore) {
    score = manualScore;
  } else if (total > 0 && localAvg) {
    score = withScale(formatScore(localAvg));
  } else {
    score = preset.demoScore;
  }

  let count;
  if (isLive && Number.isFinite(liveCount) && liveCount > 0) {
    count = preset.live(liveCount);
  } else if (manualCount) {
    count = manualCount;
  } else if (total > 0 && preset.local) {
    count = preset.local(total);
  } else if (isLive) {
    /*
     * Deliberately empty rather than the demo string.
     *
     * This is the case where the score is real and the count is not known --
     * Facebook reports `overall_star_rating` without a `rating_count` on some
     * Pages, and a G2 or Capterra figure can be entered with the count left
     * blank. Falling through to the demo text would print a genuine 4.9 beside
     * an invented "128+ Reviews", which is a worse claim than either half of it
     * on its own, and precisely what this whole change exists to stop.
     *
     * Layout.js drops the element when this is empty, so the badge shows the
     * score and the stars and nothing it cannot stand behind.
     */
    count = "";
  } else {
    count = preset.demoCount();
  }

  return {
    title: manualTitle || preset.title(),
    score,
    count,
    // Only ever the platform's own profile URL, so a linked badge always points
    // at the page the score can be verified on.
    url: isLive ? attributes.liveUrl || "" : "",
    isLive,
  };
};
