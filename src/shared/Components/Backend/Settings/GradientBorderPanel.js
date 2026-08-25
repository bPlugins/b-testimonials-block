import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";

import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";

/**
 * The Gradient Border Grid's ring and corner score pill.
 *
 * The block was registered as "Gradient Border Grid" with the description
 * "Modern gradient border cards with star badges", and drew neither: its only
 * difference from the plain grid was the theme_2 card, its own edit.scss held a
 * placeholder comment, and nothing in frontend.scss put a gradient on a border
 * anywhere. Someone picking it out of the inserter for what it says it is got
 * the default grid with the card inverted.
 *
 * Rendered only where `gradientBorder` is declared, which is that block alone --
 * the coverflow carousel renders the same theme_2 card and must keep its flat
 * border, so the attribute gates both the panel and the CSS.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const GradientBorderPanel = ({ attributes = {}, setAttributes }) => {
  const {
    gradientBorder,
    gradientFrom,
    gradientTo,
    gradientAngle,
    gradientWidth,
    showStarBadge,
    starBadgeBg,
    starBadgeColor,
    starBadgePosition = "top-right",
    starBadgeSize = 12,
    starBadgeRadius = 999,
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Gradient Border", "b-testimonials-block")}
      initialOpen={false}>
      <ToggleControl
        label={__("Gradient border", "b-testimonials-block")}
        checked={!!gradientBorder}
        onChange={set("gradientBorder")}
        help={__(
          "Off leaves the card's own border from the Card panel.",
          "b-testimonials-block",
        )}
      />

      {gradientBorder && (
        <>
          <ColorControl
            className="mt20 mb10"
            label={__("Gradient Start", "b-testimonials-block")}
            value={gradientFrom}
            onChange={set("gradientFrom")}
          />

          <ColorControl
            className="mb10"
            label={__("Gradient End", "b-testimonials-block")}
            value={gradientTo}
            onChange={set("gradientTo")}
          />

          <RangeControl
            className="mb10"
            label={__("Angle (deg)", "b-testimonials-block")}
            value={gradientAngle}
            onChange={set("gradientAngle")}
            min={0}
            max={360}
            step={5}
            allowReset
          />

          {/* The ring is drawn outside the card, so widening it grows the card's
              footprint rather than eating into its padding. */}
          <RangeControl
            className="mb10"
            label={__("Border Width (px)", "b-testimonials-block")}
            value={gradientWidth}
            onChange={set("gradientWidth")}
            min={1}
            max={12}
            step={1}
            allowReset
          />
        </>
      )}

      <ToggleControl
        className="mt20"
        label={__("Star badge", "b-testimonials-block")}
        checked={!!showStarBadge}
        onChange={set("showStarBadge")}
        help={__(
          "A score pill in the card's top corner, from each review's rating.",
          "b-testimonials-block",
        )}
      />

      {showStarBadge && (
        <>
          {/* The pill was pinned to the top right corner, which is also where
              a theme_2 card's header art sits -- so on some cards it landed on
              top of something and there was no way to move it off. */}
          <SelectControl
            className="mt20"
            label={__("Badge Position", "b-testimonials-block")}
            value={starBadgePosition}
            onChange={set("starBadgePosition")}
            options={[
              {
                label: __("Top Right", "b-testimonials-block"),
                value: "top-right",
              },
              {
                label: __("Top Left", "b-testimonials-block"),
                value: "top-left",
              },
              {
                label: __("Bottom Right", "b-testimonials-block"),
                value: "bottom-right",
              },
              {
                label: __("Bottom Left", "b-testimonials-block"),
                value: "bottom-left",
              },
            ]}
          />

          {/* The star inside the pill scales with this, so the two keep the
              proportion they ship with instead of the glyph staying 11px on a
              badge twice the size. */}
          <RangeControl
            className="mt20 mb10"
            label={__("Badge Text Size (px)", "b-testimonials-block")}
            value={starBadgeSize}
            onChange={set("starBadgeSize")}
            min={8}
            max={28}
            step={1}
            allowReset
            resetFallbackValue={12}
          />

          <RangeControl
            className="mb10"
            label={__("Badge Radius (px)", "b-testimonials-block")}
            value={starBadgeRadius}
            onChange={set("starBadgeRadius")}
            min={0}
            max={999}
            step={1}
            allowReset
            resetFallbackValue={999}
            help={__(
              "999 is a fully rounded pill; 0 squares it off.",
              "b-testimonials-block",
            )}
          />

          <ColorControl
            className="mt20 mb10"
            label={__("Badge Background", "b-testimonials-block")}
            value={starBadgeBg}
            onChange={set("starBadgeBg")}
          />

          <ColorControl
            className="mb10"
            label={__("Badge Text", "b-testimonials-block")}
            value={starBadgeColor}
            onChange={set("starBadgeColor")}
          />

          {/* The star glyph itself follows the existing Rating Stars colour
              rather than growing a third control for one character. */}
          <p className="description">
            {__(
              "The star follows the Review Text panel's Star color.",
              "b-testimonials-block",
            )}
          </p>
        </>
      )}

      {/* The header wash moved to the shared Header Strip panel. It is not
          specific to this block: every Theme 2 layout and the masonry
          arrangement paint the same strip, and keeping the controls here left
          all of them with a wash that could not be softened or switched off. */}
    </PanelBody>
  );
};

export default GradientBorderPanel;
