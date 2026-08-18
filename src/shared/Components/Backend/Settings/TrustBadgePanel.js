import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";
import { produce } from "immer";

import Typography from "../../../../../../bpl-tools/Components/Typography/Typography";
import ShadowControl from "../../../../../../bpl-tools/Components/Deprecated/ShadowControl/ShadowControl";
import {
  emUnit,
  perUnit,
  pxUnit,
  remUnit,
} from "../../../../../../bpl-tools/utils/options";

/**
 * Box, icon and text controls for the Trust Badges block.
 *
 * The block registers its own editor, and that editor's Style tab was the Colors
 * panel and Width & Height -- nothing else. No Card panel, no typography panels.
 * So every size in trust-badges.scss was final: a 16px/700 title, a 14px
 * subtitle, a 44px icon at a 14px gap, an 18px by 20px box at radius 10 with no
 * shadow, and the icon always beside the text rather than above it.
 *
 * The Card panel would not have covered it even if this editor rendered one. Its
 * box rule names `.btb-trust-badges-grid` -- the wrapper of the four-badge
 * fallback shown before any badge is added, and the grid rather than a badge in
 * it -- so nothing in it reaches the `.badge-item` both the editor and the
 * published page render once the repeater has content.
 *
 * Colours stay with the Colors panel, as they do on the poll: Card Surface for
 * the badge background, Border Color and Width for its edge, Body Text for the
 * title and Secondary Text for the subtitle. That last one was missing from the
 * layout's roles while the stylesheet had always painted the subtitle with it,
 * so the variable was declared by nothing -- see visualControls.js.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const TrustBadgePanel = ({ attributes = {}, setAttributes }) => {
  const {
    badgeTitleTypo = {},
    badgeSubtitleTypo = {},
    badgeIconSize,
    badgeIconGap,
    badgeIconPosition = "left",
    badgePadding = {},
    badgeRadius,
    badgeShadow,
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Badge Box", "b-testimonials-block")}
        initialOpen={false}>
        <BoxControl
          label={__("Padding", "b-testimonials-block")}
          values={badgePadding}
          onChange={set("badgePadding")}
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />

        <UnitControl
          className="mt20"
          label={__("Corner Radius:", "b-testimonials-block")}
          labelPosition="left"
          value={badgeRadius}
          onChange={set("badgeRadius")}
          units={[pxUnit(10), perUnit(2), emUnit(1), remUnit(1)]}
          isResetValueOnUnitChange={true}
        />

        {/* The badge ships flat, so this adds a shadow rather than replacing
            one -- an untouched block stays flat. */}
        <ShadowControl
          className="mt20"
          label={__("Shadow:", "b-testimonials-block")}
          value={badgeShadow}
          onChange={set("badgeShadow")}
          produce={produce}
        />

        <p className="description">
          {__(
            "Background and border are in the Colors panel: Card Surface, Border Color and Border Width.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Badge Icon", "b-testimonials-block")}
        initialOpen={false}>
        {/* The icon was locked beside the text. The fallback rendering shown
            before any badge is added stacks and centres, so the repeater could
            not be made to match the layout it replaces. */}
        <SelectControl
          label={__("Position", "b-testimonials-block")}
          value={badgeIconPosition}
          onChange={set("badgeIconPosition")}
          options={[
            { label: __("Beside the text", "b-testimonials-block"), value: "left" },
            { label: __("Above the text", "b-testimonials-block"), value: "top" },
          ]}
        />

        <RangeControl
          className="mt20 mb10"
          label={__("Icon Size (px)", "b-testimonials-block")}
          value={badgeIconSize}
          onChange={set("badgeIconSize")}
          min={16}
          max={120}
          step={1}
          allowReset
          help={__(
            "Applies to an uploaded image and to a picked icon. A per-badge size in the Icons panel still wins.",
            "b-testimonials-block",
          )}
        />

        <RangeControl
          className="mb10"
          label={__("Gap (px)", "b-testimonials-block")}
          value={badgeIconGap}
          onChange={set("badgeIconGap")}
          min={0}
          max={60}
          step={1}
          allowReset
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Badge Text", "b-testimonials-block")}
        initialOpen={false}>
        <Typography
          className="mt10"
          label={__("Title", "b-testimonials-block")}
          value={badgeTitleTypo}
          onChange={set("badgeTitleTypo")}
        />

        <Typography
          className="mt20"
          label={__("Subtitle", "b-testimonials-block")}
          value={badgeSubtitleTypo}
          onChange={set("badgeSubtitleTypo")}
        />

        <p className="description">
          {__(
            "Colors are in the Colors panel: Body Text for the title, Secondary Text for the subtitle.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>
    </>
  );
};

export default TrustBadgePanel;
