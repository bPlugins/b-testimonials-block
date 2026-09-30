import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl, SelectControl } from "@wordpress/components";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";

/**
 * Style tab panel for the "Show more" button.
 *
 * The look lives in the same showMore object as the behaviour, so no new
 * attribute was needed. Every value is optional. Style.js turns each one that
 * is set into a --btb-more-* custom property, and frontend.scss falls back to
 * the original outline pill for the rest.
 *
 * @param {Object}   props.showMore      The block's showMore attribute.
 * @param {Function} props.setAttributes Attribute setter.
 */
const ShowMoreStylePanel = ({ showMore = {}, setAttributes }) => {
  const value = showMore && "object" === typeof showMore ? showMore : {};

  const update = (key, val) =>
    setAttributes({ showMore: { ...value, [key]: val } });

  return (
    <PanelBody 
      className="bPlPanelBody"
      title={__("Show More Button", "b-testimonials-block")}
      initialOpen={false}>
      <ColorControl
        label={__("Text Color:", "b-testimonials-block")}
        value={value.color || ""}
        onChange={(val) => update("color", val)}
      />

      <ColorControl
        className="mt10"
        label={__("Background:", "b-testimonials-block")}
        value={value.bg || ""}
        onChange={(val) => update("bg", val)}
      />

      <ColorControl
        className="mt10"
        label={__("Border Color:", "b-testimonials-block")}
        value={value.borderColor || ""}
        onChange={(val) => update("borderColor", val)}
      />

      <ColorControl
        className="mt10"
        label={__("Hover Text Color:", "b-testimonials-block")}
        value={value.hoverColor || ""}
        onChange={(val) => update("hoverColor", val)}
      />

      <ColorControl
        className="mt10"
        label={__("Hover Background:", "b-testimonials-block")}
        value={value.hoverBg || ""}
        onChange={(val) => update("hoverBg", val)}
      />

      <RangeControl
        className="mt20"
        label={__("Font Size (px)", "b-testimonials-block")}
        value={value.fontSize}
        onChange={(val) => update("fontSize", val)}
        min={10}
        max={32}
        allowReset
        help={__("Normally just under the size of your page text.", "b-testimonials-block")}
      />

      <RangeControl
        label={__("Roundness (px)", "b-testimonials-block")}
        value={value.radius}
        onChange={(val) => update("radius", val)}
        min={0}
        max={40}
        allowReset
        help={__(
          "Try 0 for sharp corners. Clear it to get the full pill shape back.",
          "b-testimonials-block",
        )}
      />

      <RangeControl
        label={__("Border Width (px)", "b-testimonials-block")}
        value={value.borderWidth}
        onChange={(val) => update("borderWidth", val)}
        min={0}
        max={10}
        allowReset
      />

      <RangeControl
        label={__("Button Width (px)", "b-testimonials-block")}
        value={value.width}
        onChange={(val) => update("width", val)}
        min={80}
        max={600}
        allowReset
        help={__(
          "No width set means the button is only as wide as its text.",
          "b-testimonials-block",
        )}
      />

      <RangeControl
        label={__("Space Above (px)", "b-testimonials-block")}
        value={value.gap}
        onChange={(val) => update("gap", val)}
        min={0}
        max={120}
        allowReset
      />

      <SelectControl
        label={__("Alignment", "b-testimonials-block")}
        value={value.align || ""}
        onChange={(val) => update("align", val)}
        options={[
          { label: __("Default (Center)", "b-testimonials-block"), value: "" },
          { label: __("Left", "b-testimonials-block"), value: "left" },
          { label: __("Center", "b-testimonials-block"), value: "center" },
          { label: __("Right", "b-testimonials-block"), value: "right" },
        ]}
      />
    </PanelBody>
  );
};

export default ShowMoreStylePanel;
