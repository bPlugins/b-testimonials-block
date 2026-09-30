import { useState } from "react";
import { __, sprintf } from "@wordpress/i18n";
import { CheckboxControl, TextControl } from "@wordpress/components";

/**
 * Below this many reviews the search box is more clutter than help -- a
 * Google list (5 at most) never crosses it. Above it, a well-reviewed
 * Facebook Page can, and that is what the search box and the list's own
 * scroll (see editor.scss's .btbReviewPickerList) are for.
 */
const SEARCH_THRESHOLD = 8;

/**
 * Lets an author pick exactly which fetched reviews a "Review quotes" badge
 * shows, instead of always taking the top few by rating.
 *
 * Google hands over at most 5 reviews per place, so this used to be a pick
 * from a short list it already fetched -- never a search. Facebook's
 * `/ratings` edge has no such ceiling (fetch_facebook_ratings() asks for up
 * to 100), and a well-reviewed Page can fill this with far more checkboxes
 * than anyone wants to scroll past to find one name. The search box and the
 * list's own scroll below exist for that case; a short Google-sized list
 * just never needs either.
 *
 * See resolveQuotes() in utils/reviewSources.js for how the selection here
 * (or its absence) is turned into what actually renders.
 *
 * @param {Array}    props.reviews     Reviews from useReviewSource's REST data.
 * @param {string[]} props.selectedIds Currently picked review ids.
 * @param {Function} props.onChange    Called with the new id list.
 */
const ReviewPicker = ({ reviews = [], selectedIds = [], onChange }) => {
  const [search, setSearch] = useState("");
  const withText = reviews.filter((review) => review && review.text);

  if (!withText.length) {
    return (
      <p className="btbLiveNote">
        {__(
          "No review text has come back yet. Check again after the next refresh.",
          "b-testimonials-block",
        )}
      </p>
    );
  }

  const query = search.trim().toLowerCase();
  // Filters what's shown, never what's selectable -- a review checked before
  // typing a search stays checked once the box is cleared again, same as the
  // stale-pick fallback below still checks the full `withText`, not this.
  const shown = query
    ? withText.filter((review) =>
        `${review.author || ""} ${review.text}`.toLowerCase().includes(query),
      )
    : withText;

  const toggle = (id, checked) => {
    if (checked) {
      onChange([...selectedIds, id]);
    } else {
      onChange(selectedIds.filter((existing) => existing !== id));
    }
  };

  // Not `selectedIds.length`: a stored id stops matching anything once the
  // site's Place ID changes or a refetch drops that review, and counting the
  // raw array then claims "3 of 5 selected" over a list with nothing actually
  // checked. Counting the checkboxes that are really ticked keeps this line
  // truthful, and doubles as the tell that a stale pick just fell back to the
  // automatic selection -- see resolveQuotes() in utils/reviewSources.js.
  const selectedCount = withText.filter((review) =>
    selectedIds.includes(review.id),
  ).length;
  const hasStalePicks = selectedIds.length > 0 && selectedCount === 0;

  return (
    <div className="btbReviewPicker">
      <p className="btbLiveNote">
        {selectedCount
          ? sprintf(
              /* translators: 1: number picked, 2: number available */
              __(
                "%1$d of %2$d selected. Clear all to go back to showing the top few automatically.",
                "b-testimonials-block",
              ),
              selectedCount,
              withText.length,
            )
          : __(
              "Nothing picked — showing the top few automatically. Check any review to pick by hand.",
              "b-testimonials-block",
            )}
      </p>

      {hasStalePicks && (
        <p className="btbLiveNote is-warn">
          {__(
            "The reviews picked earlier are no longer in this list -- likely the Place ID changed, or Google stopped returning them. Showing the top few automatically until you pick again.",
            "b-testimonials-block",
          )}
        </p>
      )}

      {/* Google never had enough reviews for this to matter -- five at most.
          Facebook can hand back up to a hundred, so past this many the search
          box earns its place instead of sitting above a list short enough to
          just glance down. */}
      {withText.length > SEARCH_THRESHOLD && (
        <TextControl
          className="btbReviewPickerSearch mt10"
          placeholder={__("Search by name or text…", "b-testimonials-block")}
          value={search}
          onChange={setSearch}
        />
      )}

      <div className="btbReviewPickerList">
        {shown.length ? (
          shown.map((review) => (
            <CheckboxControl
              key={review.id}
              className="btbReviewPickerRow"
              checked={selectedIds.includes(review.id)}
              onChange={(checked) => toggle(review.id, checked)}
              label={
                <span className="btbReviewPickerLabel">
                  <strong>
                    {review.author || __("Anonymous", "b-testimonials-block")}
                  </strong>
                  {" — "}
                  <span className="btbReviewPickerSnippet">
                    {review.text.slice(0, 70)}
                    {review.text.length > 70 ? "…" : ""}
                  </span>
                </span>
              }
            />
          ))
        ) : (
          <p className="btbLiveNote">
            {__("No reviews match that search.", "b-testimonials-block")}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewPicker;
