import { useCallback, useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";
import { addQueryArgs } from "@wordpress/url";

/**
 * One platform's live review figures, for the editor.
 *
 * The front end never needs this: render.php has already put the numbers into
 * the block's `data-attributes` by the time the view script runs. The editor has
 * no render.php, so it asks the same server-side cache over REST -- which means
 * the score in the canvas is the score the published page will show, rather than
 * a second guess at it.
 *
 * `refresh()` spends a real API call and the route only honours it for
 * `manage_options`, so it is offered as a button rather than run on mount.
 *
 * @param {string}  platform Platform slug, or "" to fetch nothing.
 * @param {boolean} enabled  Whether the block is actually asking for live data.
 * @return {Object} { data, loading, error, refresh, refreshing }
 */
const useReviewSource = (platform, enabled = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  // Bumped by refresh() to re-run the effect. A counter rather than calling
  // apiFetch from the callback, so both paths share one place that writes state
  // and one guard against a response landing after the block is deselected.
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!platform || !enabled) {
      setData(null);
      setError("");

      return undefined;
    }

    let active = true;
    const forced = tick > 0;

    setLoading(true);

    apiFetch({
      path: addQueryArgs(`/bptmb/v1/review-sources/${platform}`, forced ? { refresh: 1 } : {}),
    })
      .then((result) => {
        if (active) {
          setData(result);
          setError(result?.error || "");
        }
      })
      .catch((err) => {
        if (active) {
          setData(null);
          setError(err?.message || "");
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      });

    return () => {
      active = false;
    };
  }, [platform, enabled, tick]);

  const refresh = useCallback(() => {
    setRefreshing(true);
    setTick((n) => n + 1);
  }, []);

  return { data, loading, error, refresh, refreshing };
};

/**
 * Fold a fetched platform state into a copy of the block's attributes.
 *
 * A copy, and never through setAttributes: these blocks save their attributes
 * into post content, so a stored `liveScore` would freeze this afternoon's
 * rating into the page. The editor draws from the copy; the published page gets
 * the same fields from render.php on every request.
 *
 * @param {Object} attributes Block attributes.
 * @param {Object} state      REST response from useReviewSource.
 * @return {Object} Attributes for rendering.
 */
/**
 * The `live*` keys this function (and render.php's PHP counterpart,
 * bpbtb_apply_live_review_data()) is the only writer of. None of the six is a
 * registered block attribute (see the docblock above), which is also why
 * neither writer can trust one already present on the `attributes` handed in:
 * an unregistered key in a block's own saved markup reaches here completely
 * unvalidated. `liveEmbedCode` is the one actually rendered as raw HTML
 * (EmbedWidget's dangerouslySetInnerHTML in Layout.js), so LIVE_KEYS is
 * stripped from `attributes` before anything is spread from it below --
 * every return path either re-populates a key from this REST response or
 * leaves it absent, never carries one through from the caller.
 */
const LIVE_KEYS = [
  "liveScore",
  "liveCount",
  "liveTitle",
  "liveUrl",
  "liveReviews",
  "liveEmbedCode",
];

export const withLiveReview = (attributes, state) => {
  const clean = { ...attributes };
  LIVE_KEYS.forEach((key) => delete clean[key]);

  if (!state) {
    return clean;
  }

  const hasScore =
    state.connected && state.score !== null && state.score !== undefined;
  // An embed widget (G2 Badge, Trustpilot TrustBox) needs no score at all --
  // it is a self-contained snippet pasted under Review Sources, so it can be
  // shown whether or not that platform's API is also connected.
  const hasEmbed = !!state.embedCode;

  return {
    ...clean,
    ...(hasScore
      ? {
          liveScore: state.score,
          liveCount:
            state.count === null || state.count === undefined
              ? undefined
              : state.count,
          liveTitle: state.title || "",
          liveUrl: state.url || "",
          liveReviews: Array.isArray(state.reviews) ? state.reviews : [],
        }
      : {}),
    ...(hasEmbed ? { liveEmbedCode: state.embedCode } : {}),
  };
};

export default useReviewSource;
