import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { produce } from "immer";

import ShadowControl from "../../../../../../bpl-tools/Components/Deprecated/ShadowControl/ShadowControl";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import {
  emUnit,
  perUnit,
  pxUnit,
  remUnit,
} from "../../../../../../bpl-tools/utils/options";

/**
 * The FAQ Review Accordion's row box.
 *
 * This layout is deliberately denied the Card panel -- see layoutControls.js:
 * the panel's border lands on `.btb-faq-item`, and the stylesheet recolours that
 * border on `[open]` to mark the expanded row, so an ID-scoped border from the
 * sidebar would outrank the `[open]` rule and trade the open-state indicator for
 * a box control.
 *
 * That reasoning covers the border, and nothing else. Corner radius, background,
 * shadow, row gap and the question and answer padding are all independent of
 * `border-color`, and every one of them was pinned in frontend.scss -- a 10px
 * radius, no background, no shadow, an 8px gap, `14px 18px` and `0 18px 14px` --
 * with no way to reach any of it. Withholding one control had quietly withheld
 * six.
 *
 * Border colour and width stay where they are: the Colors panel offers both, and
 * the `[open]` accent is left to win.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const FaqStylePanel = ({ attributes = {}, setAttributes }) => {
  const {
    faqRadius,
    faqRowGap,
    faqBg,
    faqShadow,
    faqQuestionPadding = {},
    faqAnswerPadding = {},
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Accordion Rows", "b-testimonials-block")}
      initialOpen={false}>
      <UnitControl
        label={__("Corner Radius:", "b-testimonials-block")}
        labelPosition="left"
        value={faqRadius}
        onChange={set("faqRadius")}
        units={[pxUnit(10), perUnit(2), emUnit(1), remUnit(1)]}
        isResetValueOnUnitChange={true}
      />

      {/* 0 is a real choice -- it butts the rows together into one block. */}
      <RangeControl
        className="mt10"
        label={__("Row Gap (px)", "b-testimonials-block")}
        value={faqRowGap}
        onChange={set("faqRowGap")}
        min={0}
        max={40}
        step={1}
        allowReset
        resetFallbackValue={8}
      />

      {/* The row ships transparent, so this adds a fill rather than replacing
          one and an untouched accordion is unchanged. */}
      <ColorControl
        className="mt10 mb10"
        label={__("Row Background", "b-testimonials-block")}
        value={faqBg}
        onChange={set("faqBg")}
      />

      <ShadowControl
        label={__("Shadow:", "b-testimonials-block")}
        value={faqShadow}
        onChange={set("faqShadow")}
        produce={produce}
      />

      <BoxControl
        className="mt10"
        label={__("Question Padding", "b-testimonials-block")}
        values={faqQuestionPadding}
        onChange={set("faqQuestionPadding")}
        resetValues={{ top: "", right: "", bottom: "", left: "" }}
        units={[pxUnit(3), emUnit(2), perUnit(2)]}
      />

      {/* Its own control rather than sharing the question's: the answer ships
          with no top padding, so that it sits against the question it belongs
          to rather than floating in the middle of the row. */}
      <BoxControl
        className="mt10"
        label={__("Answer Padding", "b-testimonials-block")}
        values={faqAnswerPadding}
        onChange={set("faqAnswerPadding")}
        resetValues={{ top: "", right: "", bottom: "", left: "" }}
        units={[pxUnit(3), emUnit(2), perUnit(2)]}
      />

      <p className="description">
        {__(
          "Border color and width are in the Colors panel. The expanded row keeps its accent border.",
          "b-testimonials-block",
        )}
      </p>
    </PanelBody>
  );
};

export default FaqStylePanel;
