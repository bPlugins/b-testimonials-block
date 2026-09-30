import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";

/**
 * The size of a review badge's brand mark.
 *
 * Google, Capterra, Facebook, Trustpilot and G2 each draw their own logo, and
 * Layout.js drew all five at a hardcoded 36px. Nothing in the sidebar moved it:
 * these badges are excluded from the icon controls on purpose -- the marks are
 * other companies' trademarks, so swapping or recolouring one stops it working
 * as a review badge -- and the exclusion took the size with it.
 *
 * Size is the part that is safe to change: a bigger Facebook mark is still the
 * Facebook mark. So it gets a control and the picker and the colour do not.
 *
 * Reaches the logo through CSS rather than the SVG's own `width` and `height`,
 * which are presentation attributes and lose to any rule that names the element.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const BadgeLogoPanel = ({ attributes = {}, setAttributes }) => {
  const { badgeLogoSize } = attributes;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Badge Logo", "b-testimonials-block")}
      initialOpen={false}>
      <RangeControl
        className="mt10 mb10"
        label={__("Logo Size (px)", "b-testimonials-block")}
        value={badgeLogoSize}
        onChange={(val) => setAttributes({ badgeLogoSize: val })}
        min={16}
        max={120}
        step={1}
        allowReset
        resetFallbackValue={36}
        help={__(
          "The brand mark beside the badge title.",
          "b-testimonials-block",
        )}
      />

      <p className="description">
        {__(
          "This logo cannot be replaced or recoloured: it is the review platform's own trademark, and a changed mark stops working as a badge for that platform.",
          "b-testimonials-block",
        )}
      </p>
    </PanelBody>
  );
};

export default BadgeLogoPanel;
