import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  TextControl,
  ToggleControl,
} from "@wordpress/components";

/**
 * General tab panel for the "Show more" button under a stacked card list.
 *
 * Only offered where supportsShowMore() is true (grid, list and masonry
 * arrangements, plus the timeline, audio and video lists). TestimonialsView
 * does the trimming, after the filter and search have run.
 *
 * @param {Object}   props.showMore      The block's showMore attribute.
 * @param {string}   props.dataSource    "manual" or "cpt".
 * @param {Function} props.setAttributes Attribute setter.
 */
const ShowMorePanel = ({ showMore = {}, dataSource = "manual", setAttributes }) => {
  const value = showMore && "object" === typeof showMore ? showMore : {};
  const update = (key, val) =>
    setAttributes({ showMore: { ...value, [key]: val } });

  const firstCount = parseInt(value.initial, 10) || 6;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Show More", "b-testimonials-block")}
      initialOpen={false}>
      <ToggleControl
        label={__("Show more button", "b-testimonials-block")}
        checked={!!value.enabled}
        onChange={(val) => update("enabled", val)}
        help={__(
          "Good for long lists. Visitors see a few testimonials first and click the button for more.",
          "b-testimonials-block",
        )}
      />

      {!!value.enabled && (
        <>
          <RangeControl
            label={__("Show at first", "b-testimonials-block")}
            value={firstCount}
            onChange={(val) => update("initial", val)}
            min={1}
            max={50}
          />

          <RangeControl
            label={__("Show per click", "b-testimonials-block")}
            value={parseInt(value.step, 10) || firstCount}
            onChange={(val) => update("step", val)}
            min={1}
            max={50}
          />

          <TextControl
            label={__("Button text", "b-testimonials-block")}
            value={value.label || ""}
            placeholder={__("Show more", "b-testimonials-block")}
            onChange={(val) => update("label", val)}
          />

          <p className="btbHint">
            {"cpt" === dataSource
              ? __(
                  "Heads up: the button can only show what the block has loaded. To offer 30 testimonials, set Number under Content Source to 30.",
                  "b-testimonials-block",
                )
              : __(
                  "Here in the editor all your cards stay visible so you can edit them. Visitors get the button on the live page.",
                  "b-testimonials-block",
                )}
          </p>

          <p className="btbHint">
            {__(
              "Want to change how the button looks? It has its own panel: Style tab, Show More Button.",
              "b-testimonials-block",
            )}
          </p>
        </>
      )}
    </PanelBody>
  );
};

export default ShowMorePanel;
