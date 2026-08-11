import { __ } from "@wordpress/i18n";
import { PanelBody, RangeControl } from "@wordpress/components";

import IconLibrary from "../../../../../../bpl-tools/Components/IconLibrary/IconLibrary";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { ICON_LAYOUTS } from "../../../utils/blockIcons";
import { BRAND_COLOR } from "../../../utils/icons";

/**
 * Icon + colour controls for the layouts that render a configurable icon.
 *
 * Uses bpl-tools' IconLibrary, which stores the chosen icon as inline SVG
 * markup (Font Awesome / Bootstrap / Lucid). That needs no icon webfont on the
 * front end, so the picked glyph ships with the markup itself.
 *
 * IconLibrary only picks the icon, so size and colour get their own controls
 * alongside it.
 *
 * Renders nothing for layouts without an icon, so it is safe to drop into any
 * block's InspectorControls unconditionally.
 *
 * @param {Object}   props
 * @param {Object}   props.attributes
 * @param {Function} props.setAttributes
 * @param {boolean}  props.initialOpen
 */
const IconSettings = ({
  attributes = {},
  setAttributes,
  initialOpen = false,
}) => {
  const { layout = "default", customIcons = {} } = attributes || {};
  const config = ICON_LAYOUTS[layout];

  if (!config) {
    return null;
  }

  const setIcon = (slot, patch) =>
    setAttributes({
      customIcons: {
        ...customIcons,
        [slot]: { ...(customIcons[slot] || {}), ...patch },
      },
    });

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Icon", "b-testimonials-block")}
      initialOpen={initialOpen}>
      {config.slots.map((slot) => {
        const icon = customIcons[slot.key] || {};

        return (
          <div key={slot.key} className="btb-icon-slot">
            <IconLibrary
              label={slot.label}
              value={icon.svg || ""}
              onChange={(svg) => setIcon(slot.key, { svg })}
            />

            <ColorControl
              label={__("Icon Color", "b-testimonials-block")}
              value={icon.color || BRAND_COLOR}
              onChange={(color) => setIcon(slot.key, { color })}
              defaultColor={BRAND_COLOR}
            />

            <RangeControl
              label={__("Icon Size", "b-testimonials-block")}
              value={icon.size ?? config.size}
              onChange={(size) => setIcon(slot.key, { size })}
              min={12}
              max={160}
              allowReset={true}
              resetFallbackValue={config.size}
            />
          </div>
        );
      })}
    </PanelBody>
  );
};

export default IconSettings;
