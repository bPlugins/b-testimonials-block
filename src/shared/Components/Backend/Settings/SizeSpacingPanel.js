import { useState } from "react";
import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import Label from "../../../../../../bpl-tools/Components/Label/Label";
import BDevice from "../../../../../../bpl-tools/Components/Deprecated/BDevice/BDevice";
import {
  emUnit,
  perUnit,
  pxUnit,
  vhUnit,
  vwUnit,
} from "../../../../../../bpl-tools/utils/options";

/**
 * Block Width, Card Height, Block Margin and Card Margin.
 *
 * The seven blocks that ship their own editor -- before/after, client logos,
 * rating summary, testimonial form, stats, trust badges and video testimonials
 * -- all declare `blockWidth`, `cardHeight` and `cardMargin`, and Style.js has
 * always emitted CSS for them. None of those editors rendered a control for
 * them, so the three attributes could never be set: the panel below is the
 * missing half, kept in one place so the bespoke editors and the shared
 * Settings tab cannot drift apart again.
 *
 * All four reach every layout. Block Width and Block Margin are written on the
 * block's own box, and Card Height and Card Margin share the long selector list
 * in Style.js that names each layout's card whatever it is built from -- which
 * is why this panel is never gated by utils/layoutControls.js the way the Card,
 * Image and typography panels are.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {string}   props.device        Device to edit. Pass this with
 *                                       `setDevice` to share the switch with
 *                                       another panel, so the device being
 *                                       edited cannot silently differ between
 *                                       the two; omit both for a local one.
 * @param {Function} props.setDevice     Setter for the shared device.
 */
const SizeSpacingPanel = ({
  attributes = {},
  setAttributes,
  device: sharedDevice,
  setDevice: setSharedDevice,
}) => {
  const {
    blockWidth = {},
    cardHeight = {},
    cardMargin = {},
    blockMargin = {},
  } = attributes;

  const [localDevice, setLocalDevice] = useState("desktop");
  const device = sharedDevice ?? localDevice;
  const setDevice = setSharedDevice ?? setLocalDevice;

  const updateObject = (key, prop, val) =>
    setAttributes({ [key]: { ...(attributes[key] || {}), [prop]: val } });

  return (
    <>
      <PanelBody
        className="bPlPanelBody"
        title={__("Width & Height", "b-testimonials-block")}
        initialOpen={false}>
        <PanelRow>
          <Label mt="0">{__("Device:", "b-testimonials-block")}</Label>
          <BDevice device={device} onChange={(val) => setDevice(val)} />
        </PanelRow>

        {/* max-width, not width: a hard width would overflow a container
            narrower than the value on small screens. */}
        <UnitControl
          className="mt20"
          label={__("Block Width:", "b-testimonials-block")}
          labelPosition="left"
          value={blockWidth?.[device] || ""}
          onChange={(val) => updateObject("blockWidth", device, val)}
          units={[pxUnit(1200), perUnit(100), emUnit(60), vwUnit(100)]}
          isResetValueOnUnitChange={true}
          help={__(
            "Maximum width. Leave empty to follow the theme.",
            "b-testimonials-block",
          )}
        />

        {/* min-height, so a card that needs more room still grows rather than
            clipping its content. */}
        <UnitControl
          className="mt20"
          label={__("Card Height:", "b-testimonials-block")}
          labelPosition="left"
          value={cardHeight?.[device] || ""}
          onChange={(val) => updateObject("cardHeight", device, val)}
          units={[pxUnit(320), emUnit(20), vhUnit(50)]}
          isResetValueOnUnitChange={true}
          help={__(
            "Minimum height, for evening up ragged cards.",
            "b-testimonials-block",
          )}
        />
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Spacing", "b-testimonials-block")}
        initialOpen={false}>
        {/* Space around the whole block. This is the one that separates this
            block from the one above or below it -- Card Margin below moves the
            card inside the block and cannot do that. */}
        <BoxControl
          label={__("Block Margin", "b-testimonials-block")}
          values={blockMargin}
          onChange={(val) => setAttributes({ blockMargin: val })}
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />

        {/* Resets to nothing rather than to a value of ours: the gap between
            cards is already set by Column/Row Gap, so a default margin here
            would fight it. This is for nudging cards, not spacing them. */}
        <BoxControl
          label={__("Card Margin", "b-testimonials-block")}
          values={cardMargin}
          onChange={(val) => setAttributes({ cardMargin: val })}
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />
      </PanelBody>
    </>
  );
};

export default SizeSpacingPanel;
