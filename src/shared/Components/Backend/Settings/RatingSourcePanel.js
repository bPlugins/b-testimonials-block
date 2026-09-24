import { __, _n, sprintf } from "@wordpress/i18n";
import {
  Button,
  RangeControl,
  SelectControl,
  Spinner,
  TextControl,
  TextareaControl,
  ToggleControl,
} from "@wordpress/components";
import { useSelect } from "@wordpress/data";

import Label from "../../../../../../bpl-tools/Components/Label/Label";
import { InlineDetailMediaUpload } from "../../../../../../bpl-tools/Components/MediaControl/MediaControl";
import {
  GENERIC_BADGE_LAYOUT,
  REVIEW_PLATFORM_OPTIONS,
  platformSupportsQuotes,
  platformSupportsEmbed,
} from "../../../utils/reviewSources";
import ItemCards from "./ItemCards";
import ReviewPicker from "./ReviewPicker";

/**
 * How long ago, in words, without pulling in a date library.
 *
 * @param {number} timestamp Unix seconds. 0 means never.
 * @return {string}
 */
const timeAgo = (timestamp) => {
  if (!timestamp) {
    return __("never", "b-testimonials-block");
  }

  const seconds = Math.max(0, Math.floor(Date.now() / 1000) - timestamp);

  if (seconds < 90) {
    return __("just now", "b-testimonials-block");
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    /* translators: %d: number of minutes */
    return sprintf(
      _n("%d minute ago", "%d minutes ago", minutes, "b-testimonials-block"),
      minutes,
    );
  }

  const hours = Math.round(minutes / 60);
  if (hours < 48) {
    /* translators: %d: number of hours */
    return sprintf(
      _n("%d hour ago", "%d hours ago", hours, "b-testimonials-block"),
      hours,
    );
  }

  const days = Math.round(hours / 24);

  /* translators: %d: number of days */
  return sprintf(
    _n("%d day ago", "%d days ago", days, "b-testimonials-block"),
    days,
  );
};

/**
 * Where this badge's score comes from.
 *
 * The five platform badges each print another company's logo next to a number.
 * That number used to be whatever was typed in below -- which is fine as a
 * placeholder and indefensible as a claim, since nothing tied it to the platform
 * whose mark it sat beside. Live reads the figure the platform itself publishes,
 * fetched server-side and shared by every badge on the site.
 *
 * The credentials are not here on purpose. They belong to the site, not to one
 * block, and block attributes are saved into post content -- so an API key typed
 * into an inspector would end up in `wp_posts`, in the REST response for that
 * post and in every revision of it. This panel links to the screen that owns
 * them instead.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {string}   props.layout        Layout key.
 * @param {string}   props.platform      Resolved platform slug, '' when none.
 * @param {Object}   props.liveReview    State from useReviewSource.
 */
const RatingSourcePanel = ({
  attributes = {},
  setAttributes,
  layout,
  platform,
  liveReview = {},
}) => {
  const { ratingSource = "live", showLiveLink = true, displayMode = "badge" } = attributes;
  const { data, loading, refresh, refreshing } = liveReview;

  const isLiveMode = "manual" !== ratingSource;
  const isGeneric = GENERIC_BADGE_LAYOUT === layout;
  // Not generic-only: a fixed single-platform badge (google-review-badge) has
  // just as real a platform as the generic widget does once one is picked --
  // only the Platform select itself (below) is generic-only, since a fixed
  // badge has nothing to pick.
  const supportsQuotes = platformSupportsQuotes(platform);
  // Live quotes are Google-only (supportsQuotes) -- no other platform's API
  // hands over review text, and nothing here can change that (see
  // PLATFORMS_WITH_REVIEWS). Manual quotes need no such API: they are typed
  // in by hand, so any platform can offer them once Manual is picked --
  // that's the "Recommended by..." card someone copies off Facebook, G2,
  // Trustpilot or Capterra themselves and retypes here.
  const isManualQuotesCapable = !isLiveMode;
  const isQuotesMode =
    "quotes" === displayMode && (supportsQuotes || isManualQuotesCapable);
  const supportsEmbed = platformSupportsEmbed(platform);
  const isEmbedMode = supportsEmbed && "embed" === displayMode;

  // Forcing a refresh spends an API call, and the REST route only honours the
  // request for a user who owns the settings screen. Asking core the same
  // question keeps the button from appearing to an editor it would do nothing
  // for.
  const canRefresh = useSelect(
    (select) => !!select("core").canUser("update", "settings"),
    [],
  );

  const settingsUrl = window?.bpbtbReviewSources?.settingsUrl || "";
  const platformLabel =
    REVIEW_PLATFORM_OPTIONS.find((o) => o.value === platform)?.label || "";

  const status = () => {
    if (!isLiveMode) {
      return (
        <p className="btbLiveNote">
          {isQuotesMode
            ? __(
                "Showing the quotes typed in below.",
                "b-testimonials-block",
              )
            : __(
                "Showing the score and count typed below.",
                "b-testimonials-block",
              )}
        </p>
      );
    }

    if (!platform) {
      return (
        <p className="btbLiveNote is-warn">
          {__(
            "Pick a platform above to read a live rating.",
            "b-testimonials-block",
          )}
        </p>
      );
    }

    if (loading && !data) {
      return (
        <p className="btbLiveNote">
          <Spinner />
          {__("Checking…", "b-testimonials-block")}
        </p>
      );
    }

    // An embed widget needs no score, no count and no API connection -- it is
    // a snippet pasted once under Review Sources -- so its status is judged
    // on whether that snippet exists, not on `data.connected`.
    if (isEmbedMode) {
      if (!data?.embedCode) {
        return (
          <p className="btbLiveNote is-warn">
            {sprintf(
              /* translators: %s: platform name, e.g. G2 */
              __(
                "Paste %s's embed widget code under Testimonials → Review Sources to show it here.",
                "b-testimonials-block",
              ),
              platformLabel,
            )}
            {settingsUrl && (
              <>
                {" "}
                <a href={settingsUrl} target="_blank" rel="noreferrer">
                  {__("Open Review Sources ↗", "b-testimonials-block")}
                </a>
              </>
            )}
          </p>
        );
      }

      return (
        <p className="btbLiveNote">
          {sprintf(
            /* translators: %s: platform name, e.g. G2 */
            __("Showing %s's official embed widget.", "b-testimonials-block"),
            platformLabel,
          )}
          {settingsUrl && (
            <>
              {" "}
              <a href={settingsUrl} target="_blank" rel="noreferrer">
                {__("Change it in Review Sources ↗", "b-testimonials-block")}
              </a>
            </>
          )}
        </p>
      );
    }

    if (!data || !data.connected) {
      return (
        <p className="btbLiveNote is-warn">
          {sprintf(
            /* translators: %s: platform name, e.g. Google */
            __(
              "%s is not set up yet, so this badge is showing demo figures. Set it up once and every badge for it follows.",
              "b-testimonials-block",
            ),
            platformLabel,
          )}
          {settingsUrl && (
            <>
              {" "}
              <a href={settingsUrl} target="_blank" rel="noreferrer">
                {__("Open Review Sources ↗", "b-testimonials-block")}
              </a>
            </>
          )}
        </p>
      );
    }

    return (
      <div className="btbLiveStatus">
        {null !== data.score && undefined !== data.score ? (
          <p className="btbLiveFigures">
            <strong>{Number(data.score).toFixed(1)}</strong>
            {null !== data.count && undefined !== data.count && (
              <span>
                {sprintf(
                  /* translators: %s: review count */
                  _n(
                    "%s review",
                    "%s reviews",
                    data.count,
                    "b-testimonials-block",
                  ),
                  Number(data.count).toLocaleString(),
                )}
              </span>
            )}
          </p>
        ) : (
          <p className="btbLiveNote is-warn">
            {__("Connected, but nothing fetched yet.", "b-testimonials-block")}
          </p>
        )}

        <p className="btbLiveNote">
          {data.title ? `${data.title} · ` : ""}
          {sprintf(
            /* translators: %s: how long ago, e.g. "2 hours ago" */
            data.live
              ? __("fetched %s", "b-testimonials-block")
              : __("last checked %s", "b-testimonials-block"),
            timeAgo(data.fetched),
          )}
        </p>

        {/* Where the figure came from. For Capterra, and for G2 without an API
            token, being entered by hand is the normal state and not a fault, so
            it reads as a plain note. A configured API that could not be read is
            worth an amber one.

            The full diagnosis behind a fallback is deliberately NOT shown here.
            It runs to a paragraph, this panel is a 280px column, and the reason
            is only actionable on the Review Sources screen anyway -- which the
            link below points at. */}
        {!!data.note && !data.error && (
          <p
            className={
              data.api && !data.live ? "btbLiveNote is-warn" : "btbLiveNote"
            }>
            {data.note}
          </p>
        )}

        {!!data.error && <p className="btbLiveNote is-error">{data.error}</p>}

        {/* Retrying only means something where there is an API to retry. */}
        {canRefresh && data.api && (
          <Button
            variant="secondary"
            size="small"
            isBusy={refreshing}
            disabled={refreshing}
            onClick={refresh}>
            {refreshing
              ? __("Refreshing…", "b-testimonials-block")
              : __("Refresh now", "b-testimonials-block")}
          </Button>
        )}

        {settingsUrl && (
          <p className="btbLiveNote">
            <a href={settingsUrl} target="_blank" rel="noreferrer">
              {data.api && !data.live
                ? __("Why, and how to fix it ↗", "b-testimonials-block")
                : __("Change it in Review Sources ↗", "b-testimonials-block")}
            </a>
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <Label>{__("Rating Source", "b-testimonials-block")}</Label>

      <SelectControl
        className="mt10"
        value={ratingSource}
        options={[
          {
            label: platformLabel
              ? sprintf(
                  /* translators: %s: platform name, e.g. Google */
                  __("Live from %s", "b-testimonials-block"),
                  platformLabel,
                )
              : __("Live from the platform", "b-testimonials-block"),
            value: "live",
          },
          {
            label: __("Manual (this block only)", "b-testimonials-block"),
            value: "manual",
          },
        ]}
        onChange={(val) => setAttributes({ ratingSource: val })}
        help={__(
          "Live uses the site-wide figure for this platform, set under Testimonials → Review Sources, and falls back to the fields below when there is none. Manual always uses the fields below.",
          "b-testimonials-block",
        )}
      />

      {isGeneric && isLiveMode && (
        <SelectControl
          className="mt10"
          label={__("Platform", "b-testimonials-block")}
          value={attributes.ratingPlatform || ""}
          options={[
            { label: __("— Select —", "b-testimonials-block"), value: "" },
            ...REVIEW_PLATFORM_OPTIONS,
          ]}
          onChange={(val) => setAttributes({ ratingPlatform: val })}
          help={__(
            "This badge is not tied to one platform, so it asks which of the five to read.",
            "b-testimonials-block",
          )}
        />
      )}

      {/* Manual quotes need no live API, so they are offered for any platform
          once Manual is picked and a platform is known -- not gated to
          supportsQuotes/supportsEmbed the way the live options are. */}
      {(supportsQuotes ||
        supportsEmbed ||
        (isManualQuotesCapable && !!platform)) && (
        <SelectControl
          className="mt10"
          label={__("Display as", "b-testimonials-block")}
          value={displayMode}
          options={[
            { label: __("Rating badge", "b-testimonials-block"), value: "badge" },
            ...(supportsQuotes || isManualQuotesCapable
              ? [{ label: __("Review quotes", "b-testimonials-block"), value: "quotes" }]
              : []),
            ...(supportsEmbed && isLiveMode
              ? [
                  {
                    label: __("Official embed widget", "b-testimonials-block"),
                    value: "embed",
                  },
                ]
              : []),
          ]}
          onChange={(val) => setAttributes({ displayMode: val })}
          help={
            isQuotesMode && !supportsQuotes
              ? __(
                  "This platform's API doesn't hand over review text, so type the ones you want to show below by hand.",
                  "b-testimonials-block",
                )
              : supportsEmbed && isLiveMode
              ? sprintf(
                  /* translators: %s: platform name, e.g. G2 */
                  __(
                    "%s's own widget, pasted once under Testimonials → Review Sources, in place of the badge above — no API token needed. Falls back to the badge if nothing is pasted yet.",
                    "b-testimonials-block",
                  ),
                  platformLabel,
                )
              : __(
                  "Review quotes shows the actual words customers left, where the platform hands them over. Falls back to the badge if none is available yet.",
                  "b-testimonials-block",
                )
          }
        />
      )}

      <div className="mt10">{status()}</div>

      {/* Shared by both the live picker below and the manual typed-in list
          further down -- how a quote card looks is the same question whether
          the words came from an API or a keyboard. */}
      {isQuotesMode && (
        <div className="mt10">
          <ToggleControl
            label={__("Show reviewer avatar", "b-testimonials-block")}
            checked={false !== attributes.showQuoteAvatar}
            onChange={(val) => setAttributes({ showQuoteAvatar: val })}
            help={
              isLiveMode
                ? __(
                    "Uses the reviewer's Google profile photo when there is one, otherwise their initial.",
                    "b-testimonials-block",
                  )
                : __(
                    "Uses the photo set on each quote below when there is one, otherwise their initial.",
                    "b-testimonials-block",
                  )
            }
          />

          <ToggleControl
            label={__("Wrap the text in quotation marks", "b-testimonials-block")}
            checked={false !== attributes.showQuoteMarks}
            onChange={(val) => setAttributes({ showQuoteMarks: val })}
          />

          <RangeControl
            label={__("Quote text length", "b-testimonials-block")}
            value={Number(attributes.quoteTextLength) || 150}
            onChange={(val) => setAttributes({ quoteTextLength: val })}
            min={40}
            max={1000}
            step={10}
            help={__(
              "Longer reviews are cut to this many characters with a Read more link, so cards in the same row stay the same height.",
              "b-testimonials-block",
            )}
          />
        </div>
      )}

      {isQuotesMode && isLiveMode && !!data?.connected && (
        <div className="mt10">
          <RangeControl
            label={__("Reviews to show", "b-testimonials-block")}
            value={Number(attributes.quoteCount) || 3}
            onChange={(val) => setAttributes({ quoteCount: val })}
            min={1}
            max={5}
            help={__(
              "Used only when nothing is picked below.",
              "b-testimonials-block",
            )}
          />

          <RangeControl
            label={__("Minimum rating to include", "b-testimonials-block")}
            value={Number(attributes.quoteMinRating) || 0}
            onChange={(val) => setAttributes({ quoteMinRating: val })}
            min={0}
            max={5}
            help={__("0 includes every star rating.", "b-testimonials-block")}
          />

          <Label>{__("Choose which to show", "b-testimonials-block")}</Label>
          <ReviewPicker
            reviews={Array.isArray(data.reviews) ? data.reviews : []}
            selectedIds={
              Array.isArray(attributes.quoteReviewIds)
                ? attributes.quoteReviewIds
                : []
            }
            onChange={(ids) => setAttributes({ quoteReviewIds: ids })}
          />
        </div>
      )}

      {isQuotesMode && !isLiveMode && (
        <div className="mt10">
          <ItemCards
            items={
              Array.isArray(attributes.manualQuotes)
                ? attributes.manualQuotes
                : []
            }
            onChange={(next) => setAttributes({ manualQuotes: next })}
            newItem={{
              name: "",
              avatarUrl: "",
              rating: 5,
              text: "",
              time: "",
            }}
            itemLabel={__("Quote", "b-testimonials-block")}
            label={sprintf(
              /* translators: %s: platform name, e.g. Facebook */
              __("%s reviews, typed in by hand:", "b-testimonials-block"),
              platformLabel,
            )}
            addLabel={__("Add New Quote", "b-testimonials-block")}
            minItems={0}>
            {(quote, quoteIdx, update) => (
              <>
                <Label>
                  {__("Reviewer Photo (optional):", "b-testimonials-block")}
                </Label>
                <InlineDetailMediaUpload
                  value={{ url: quote.avatarUrl || "" }}
                  type={["image"]}
                  onChange={(val) => update("avatarUrl", val?.url || "")}
                  placeholder={__(
                    "Enter Image URL",
                    "b-testimonials-block",
                  )}
                />

                <TextControl
                  label={__("Reviewer Name", "b-testimonials-block")}
                  value={quote.name ?? ""}
                  onChange={(val) => update("name", val)}
                />

                <RangeControl
                  label={__("Rating", "b-testimonials-block")}
                  value={Number(quote.rating) || 0}
                  onChange={(val) => update("rating", val)}
                  min={0}
                  max={5}
                />

                <TextareaControl
                  label={__("Review Text", "b-testimonials-block")}
                  value={quote.text ?? ""}
                  onChange={(val) => update("text", val)}
                />

                <TextControl
                  label={__(
                    "When (optional, shown as typed)",
                    "b-testimonials-block",
                  )}
                  value={quote.time ?? ""}
                  onChange={(val) => update("time", val)}
                  help={__(
                    "Free text, e.g. \"2 weeks ago\" or a date — copy it from the real review rather than guessing.",
                    "b-testimonials-block",
                  )}
                />
              </>
            )}
          </ItemCards>
        </div>
      )}

      {isLiveMode && !isEmbedMode && !!data?.url && (
        <ToggleControl
          className="mt10"
          label={
            isQuotesMode
              ? __(
                  "Link \"See more reviews\" to the profile",
                  "b-testimonials-block",
                )
              : __("Link the title to the profile", "b-testimonials-block")
          }
          checked={false !== showLiveLink}
          onChange={(val) => setAttributes({ showLiveLink: val })}
          help={
            isQuotesMode
              ? __(
                  "Opens the platform's own review page in a new tab from the \"See more reviews on…\" link below the quotes. Front end only.",
                  "b-testimonials-block",
                )
              : __(
                  "Opens the platform's own review page in a new tab, so a visitor can check the score. Front end only.",
                  "b-testimonials-block",
                )
          }
        />
      )}

      <hr style={{ margin: "15px 0", borderColor: "#e2e8f0" }} />
    </>
  );
};

export default RatingSourcePanel;
