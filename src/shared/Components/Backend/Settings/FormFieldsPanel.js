import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import Typography from "../../../../../../bpl-tools/Components/Typography/Typography";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import {
  emUnit,
  perUnit,
  pxUnit,
  remUnit,
} from "../../../../../../bpl-tools/utils/options";

/**
 * Field label and input styling for the Testimonial Form block.
 *
 * The form had no control over either. A label's colour and size were fixed in
 * form.scss at `font-weight: 600; font-size: 14px` and an inherited colour, and
 * the inputs took nothing but a background and a border from the Colors panel --
 * no text colour, no typography, no placeholder colour, no radius, no padding
 * and no focus state. So the one block in the plugin that is mostly inputs was
 * the one with the least say over how they look.
 *
 * Background, Border color and Border width are the same `surfaceColor`,
 * `borderColor` and `borderWidth` roles the Colors panel offers, moved here
 * rather than copied: on this layout `--btb-surface` and `--btb-border` are read
 * by nothing except the inputs, so this is where they belong, and the block's
 * editor excludes them from the Colors panel so one pixel still keeps one
 * control. The attribute names are unchanged, so a form saved before this panel
 * existed keeps its colours.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const FormFieldsPanel = ({ attributes = {}, setAttributes }) => {
  const {
    labelColor,
    labelTypo = {},
    inputColor,
    inputTypo = {},
    placeholderColor,
    inputFocusColor,
    inputRadius,
    inputPadding = {},
    textareaHeight,
    surfaceColor,
    borderColor,
    borderWidth,
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Field Labels", "b-testimonials-block")}
        initialOpen={false}>
        <Typography
          className="mt10"
          label={__("Typography", "b-testimonials-block")}
          value={labelTypo}
          onChange={set("labelTypo")}
        />

        <ColorControl
          className="mt20"
          label={__("Color", "b-testimonials-block")}
          value={labelColor}
          onChange={set("labelColor")}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Input Fields", "b-testimonials-block")}
        initialOpen={false}>
        <Typography
          className="mt10"
          label={__("Typography", "b-testimonials-block")}
          value={inputTypo}
          onChange={set("inputTypo")}
        />

        <ColorControl
          className="mt20"
          label={__("Text Color", "b-testimonials-block")}
          value={inputColor}
          onChange={set("inputColor")}
        />

        <ColorControl
          className="mb10"
          label={__("Placeholder Color", "b-testimonials-block")}
          value={placeholderColor}
          onChange={set("placeholderColor")}
        />

        <ColorControl
          className="mb10"
          label={__("Background", "b-testimonials-block")}
          value={surfaceColor}
          onChange={set("surfaceColor")}
        />

        <ColorControl
          className="mb10"
          label={__("Border Color", "b-testimonials-block")}
          value={borderColor}
          onChange={set("borderColor")}
        />

        {/* The focused field's border, which had no control at all -- a form is
            filled in one field at a time and nothing marked which one. */}
        <ColorControl
          className="mb10"
          label={__("Focus Border Color", "b-testimonials-block")}
          value={inputFocusColor}
          onChange={set("inputFocusColor")}
        />

        <RangeControl
          className="mb10"
          label={__("Border Width", "b-testimonials-block")}
          value={borderWidth}
          onChange={set("borderWidth")}
          min={0}
          max={12}
          step={1}
          allowReset
        />

        <UnitControl
          className="mt20"
          label={__("Corner Radius:", "b-testimonials-block")}
          labelPosition="left"
          value={inputRadius}
          onChange={set("inputRadius")}
          units={[pxUnit(6), perUnit(2), emUnit(1), remUnit(1)]}
          isResetValueOnUnitChange={true}
        />

        {/* min-height, so a longer review still grows the box instead of
            scrolling inside a fixed one. */}
        <UnitControl
          className="mt20"
          label={__("Review Box Height:", "b-testimonials-block")}
          labelPosition="left"
          value={textareaHeight}
          onChange={set("textareaHeight")}
          units={[pxUnit(120), emUnit(8), remUnit(8)]}
          isResetValueOnUnitChange={true}
          help={__(
            "Minimum height of the multi-line Review field.",
            "b-testimonials-block",
          )}
        />

        <BoxControl
          className="mt20"
          label={__("Padding", "b-testimonials-block")}
          values={inputPadding}
          onChange={set("inputPadding")}
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />
        <p className="description">
          {__("Space inside each field.", "b-testimonials-block")}
        </p>
      </PanelBody>
    </>
  );
};

export default FormFieldsPanel;
