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
export const withLiveReview = (attributes, state) => {
  if (!state || !state.connected || state.score === null || state.score === undefined) {
    return attributes;
  }

  return {
    ...attributes,
    liveScore: state.score,
    liveCount: state.count === null || state.count === undefined ? undefined : state.count,
    liveTitle: state.title || "",
    liveUrl: state.url || "",
  };
};

export default useReviewSource;
