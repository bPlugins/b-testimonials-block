import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";
import { produce } from "immer";

import Typography from "../../../../../../bpl-tools/Components/Typography/Typography";

/**
 * The review badges' score and star row.
 *
 * Six of the seven badges render `.btb-badge-rating`: a bold score, five star
 * glyphs and a review count. The count is the Designation role and the heading
 * above it the Name role, both of which reach the badges now -- but the score
 * and the stars map onto nothing shared, so they stayed at the stylesheet's
 * 18px/800 and 16px with no control at all.
 *
 * Typography for the score, a plain size for the stars. The stars are five
 * characters of text, so a font family or a weight on them would change the
 * glyph rather than style it; how big they are is the only question worth
 * asking, and it is the one that had no answer.
 *
 * Colours are deliberately absent. The score already reads `--btb-title` and the
 * stars `--btb-star`, so the Colors panel's Title and Rating Stars roles paint
 * both; a picker here would be a second control for the same pixel.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const BadgeScorePanel = ({ attributes = {}, setAttributes }) => {
  const { badgeScoreTypo = {}, badgeStarsSize = 16 } = attributes;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Badge Score", "b-testimonials-block")}
      initialOpen={false}>
      <Typography
        className="mt10"
        label={__("Score", "b-testimonials-block")}
        value={badgeScoreTypo}
        onChange={(val) => setAttributes({ badgeScoreTypo: val })}
        produce={produce}
      />

      <RangeControl
        className="mt20 mb10"
        label={__("Stars Size (px)", "b-testimonials-block")}
        value={badgeStarsSize}
        onChange={(val) => setAttributes({ badgeStarsSize: val })}
        min={8}
        max={48}
        step={1}
        allowReset
        resetFallbackValue={16}
        help={__(
          "The star row beside the score. Its colour is the Colors panel's Rating Stars.",
          "b-testimonials-block",
        )}
      />
    </PanelBody>
  );
};

export default BadgeScorePanel;
