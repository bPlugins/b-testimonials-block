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
 * Platforms whose fetch also returns individual review text.
 *
 * Mirror of BPBTB_Review_Sources::PLATFORMS_WITH_REVIEWS. Facebook's own
 * `/ratings` edge hands over real reviews the same way Google does, once the
 * stored token has been traded for a Page token (PHP's
 * facebook_page_token()). Trustpilot and G2's badge scope never exposes
 * review bodies at all, and Capterra is typed in by hand -- those use Manual
 * Quotes instead of a live pick.
 */
export const PLATFORMS_WITH_QUOTES = ["google", "facebook"];

/**
 * Does this platform support the "Review quotes" display mode?
 *
 * @param {string} platform Platform slug.
 * @return {boolean}
 */
export const platformSupportsQuotes = (platform) =>
  PLATFORMS_WITH_QUOTES.includes(platform);

/**
 * Platforms that publish their own official embeddable widget (a badge or
 * TrustBox-style script, pasted once under Testimonials → Review Sources) as
 * an alternative to reading the score through an API.
 *
 * G2's badge and Trustpilot's TrustBox are both documented, self-contained
 * widgets that need no credentials -- the point of offering this mode at all
 * is a zero-maintenance option beside the token-based one, for a site that
 * would rather not manage a G2 API plan or a Trustpilot Business login.
 *
 * Mirror of BPBTB_Review_Sources::PLATFORMS_WITH_EMBED.
 */
export const PLATFORMS_WITH_EMBED = ["g2", "trustpilot"];

/**
 * Does this platform offer an official embed widget as an alternative to Live?
 *
 * @param {string} platform Platform slug.
 * @return {boolean}
 */
export const platformSupportsEmbed = (platform) =>
  PLATFORMS_WITH_EMBED.includes(platform);

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
 * @return {Object} { title, score, count, url, isLive, ratingValue }
 */
export const resolveBadge = (layout, attributes = {}, stats = {}) => {
  const preset = BADGE_PRESETS[layout];

  if (!preset) {
    return { title: "", score: "", count: "", url: "", isLive: false, ratingValue: 5 };
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

  // The stars drawn under the score, worked out once here rather than at each
  // of the six call sites -- see badgeStarsEl() in Layout.js. `score` above is
  // a display string ("4.4", "4.4 / 5", or free text typed into Badge Score),
  // so this keeps its own numeric line: the raw figure behind whichever branch
  // `score` took, on the same 0-5 scale every platform here reports on.
  let score;
  let ratingValue;
  if (isLive) {
    score = withScale(formatScore(liveScore));
    ratingValue = liveScore;
  } else if (manualScore) {
    score = manualScore;
    // parseFloat reads the leading number out of "4.5" or "4.5 / 5" alike, and
    // is NaN for a score typed as words -- caught by the fallback below.
    ratingValue = parseFloat(manualScore);
  } else if (total > 0 && localAvg) {
    score = withScale(formatScore(localAvg));
    ratingValue = Number(localAvg);
  } else {
    score = preset.demoScore;
    ratingValue = parseFloat(preset.demoScore);
  }

  // A manual score with no number in it (or any other surprise) falls back to
  // a full row rather than an empty or partial one -- the same five stars
  // this badge always showed before ratingValue existed.
  ratingValue = Number.isFinite(ratingValue)
    ? Math.min(5, Math.max(0, ratingValue))
    : 5;

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
    ratingValue,
  };
};

/**
 * Which fetched reviews a "Review quotes" badge should draw.
 *
 * Precedence:
 *
 *   1. A curated pick (`quoteReviewIds`) wins outright -- exactly those
 *      reviews, in the order Google returned them, and nothing else.
 *   2. With nothing curated yet, the platform's own reviews, filtered to
 *      `quoteMinRating` and capped at `quoteCount`.
 *
 * `liveReviews` is injected the same way `liveScore` is -- by render.php on
 * the front end and by Edit.js in the editor -- so it is never a registered,
 * saved attribute either; see withLiveReview().
 *
 * In Manual mode this reads `manualQuotes` instead -- a real, registered,
 * saved attribute, since there is no live fetch to inject it on every request.
 * It is a flat list, typed in by hand for a platform whose API never hands
 * over review text (Facebook, Trustpilot, G2, Capterra -- see
 * PLATFORMS_WITH_REVIEWS), so there is nothing to curate or cap: every quote
 * with text is shown, in the order the author put them in.
 *
 * @param {Object} attributes Block attributes, with `liveReviews` merged in.
 * @return {Array} Review objects with text: { id, author, rating, text, time, avatarUrl }.
 */
export const resolveQuotes = (attributes = {}) => {
  if ("manual" === (attributes.ratingSource || "live")) {
    return (
      Array.isArray(attributes.manualQuotes) ? attributes.manualQuotes : []
    )
      .filter((quote) => quote && quote.text)
      .map((quote, index) => ({
        id: quote.id || `manual-${index}`,
        author: quote.name || "",
        rating: Number(quote.rating) || 0,
        text: quote.text || "",
        time: quote.time || "",
        avatarUrl: quote.avatarUrl || "",
        authorUrl: "",
      }));
  }

  const withText = (
    Array.isArray(attributes.liveReviews) ? attributes.liveReviews : []
  ).filter((review) => review && review.text);

  const pickedIds = Array.isArray(attributes.quoteReviewIds)
    ? attributes.quoteReviewIds
    : [];

  if (pickedIds.length) {
    const picked = withText.filter((review) => pickedIds.includes(review.id));

    // A picked id is Google's own opaque id for one review at one place. It
    // stops matching anything the moment the site's Place ID changes to a
    // different business, or a refetch simply drops a review Google no longer
    // returns -- and unlike an ordinary "narrowed to zero" filter, there is no
    // way for a visitor (or the author, until they reopen the picker) to tell
    // that from a badge that just quietly stopped showing quotes. Falling back
    // to the automatic pick beats a card that looks like the feature broke.
    if (picked.length) {
      return picked;
    }
  }

  const minRating = Number(attributes.quoteMinRating) || 0;
  const count = Math.max(1, Number(attributes.quoteCount) || 3);

  return withText
    .filter((review) => !minRating || Number(review.rating) >= minRating)
    .slice(0, count);
};
