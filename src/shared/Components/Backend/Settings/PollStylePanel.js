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
 * Text, scale buttons and box for the Feedback & NPS Poll block.
 *
 * The poll is the one layout `layoutControls.js` gives an empty entry -- none of
 * the sidebar's shared panels reach it -- so the whole Style tab was the Colors
 * panel plus Width & Height. Every size in frontend.scss was fixed: an 18px/700
 * title, a 13px description, 12px scale labels, a 38x38px button at radius 8
 * with weight 700, a 32px box padding at radius 16. None of it could be changed,
 * and the two button text colours (inherited when idle, `#fff` once picked) had
 * no control at all.
 *
 * Colours that a `--btb-*` role already paints are deliberately absent: the
 * Colors panel above owns the title (Headings), the description and scale labels
 * (Secondary Text), the button background (Number Button Background), its border
 * (Border Color/Width), the selected background (Accent) and the box background
 * (Poll Box Background). This panel adds what no role covers -- typography,
 * geometry, and the button's own two text colours -- so one pixel still keeps
 * one control.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const PollStylePanel = ({ attributes = {}, setAttributes }) => {
  const {
    pollTitleTypo = {},
    pollDescTypo = {},
    pollLabelTypo = {},
    pollBtnTypo = {},
    pollBtnColor,
    pollBtnActiveColor,
    pollBtnSize,
    pollBtnRadius,
    pollBtnGap,
    pollPadding = {},
    pollRadius,
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Poll Text", "b-testimonials-block")}
        initialOpen={false}>
        <Typography
          className="mt10"
          label={__("Question", "b-testimonials-block")}
          value={pollTitleTypo}
          onChange={set("pollTitleTypo")}
        />

        <Typography
          className="mt20"
          label={__("Description", "b-testimonials-block")}
          value={pollDescTypo}
          onChange={set("pollDescTypo")}
        />

        {/* The "Not likely" / "Very likely" pair either side of the scale. */}
        <Typography
          className="mt20"
          label={__("Scale Labels", "b-testimonials-block")}
          value={pollLabelTypo}
          onChange={set("pollLabelTypo")}
        />

        <p className="description">
          {__(
            "Colors for all three are in the Colors panel: Headings for the question, Secondary Text for the description and scale labels.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Scale Buttons", "b-testimonials-block")}
        initialOpen={false}>
        <Typography
          className="mt10"
          label={__("Typography", "b-testimonials-block")}
          value={pollBtnTypo}
          onChange={set("pollBtnTypo")}
        />

        <ColorControl
          className="mt20"
          label={__("Number Color", "b-testimonials-block")}
          value={pollBtnColor}
          onChange={set("pollBtnColor")}
        />

        {/* The picked and hovered states share one colour, as the stylesheet
            already does -- it painted both `#fff` over the accent. */}
        <ColorControl
          className="mb10"
          label={__("Selected Number Color", "b-testimonials-block")}
          value={pollBtnActiveColor}
          onChange={set("pollBtnActiveColor")}
        />

        {/* Square, so one control is the whole button rather than a width and a
            height that only ever look right when they match. */}
        <RangeControl
          className="mb10"
          label={__("Button Size (px)", "b-testimonials-block")}
          value={pollBtnSize}
          onChange={set("pollBtnSize")}
          min={24}
          max={80}
          step={1}
          allowReset
        />

        <RangeControl
          className="mb10"
          label={__("Button Gap (px)", "b-testimonials-block")}
          value={pollBtnGap}
          onChange={set("pollBtnGap")}
          min={0}
          max={30}
          step={1}
          allowReset
        />

        <UnitControl
          className="mt20"
          label={__("Corner Radius:", "b-testimonials-block")}
          labelPosition="left"
          value={pollBtnRadius}
          onChange={set("pollBtnRadius")}
          units={[pxUnit(8), perUnit(50), emUnit(1), remUnit(1)]}
          isResetValueOnUnitChange={true}
          help={__(
            "50% makes the buttons round.",
            "b-testimonials-block",
          )}
        />

        <p className="description">
          {__(
            "Button colors are in the Colors panel: Number Button Background, Border Color and Accent for the selected button.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Poll Box", "b-testimonials-block")}
        initialOpen={false}>
        {/* The Card panel is not offered on this layout -- its rules land on
            `.single`, which the poll does not render -- so the box had no
            padding or radius control of any kind. */}
        <BoxControl
          label={__("Padding", "b-testimonials-block")}
          values={pollPadding}
          onChange={set("pollPadding")}
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />

        <UnitControl
          className="mt20"
          label={__("Corner Radius:", "b-testimonials-block")}
          labelPosition="left"
          value={pollRadius}
          onChange={set("pollRadius")}
          units={[pxUnit(16), perUnit(2), emUnit(1), remUnit(1)]}
          isResetValueOnUnitChange={true}
        />

        <p className="description">
          {__(
            "The box background is Poll Box Background in the Colors panel.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>
    </>
  );
};

export default PollStylePanel;
