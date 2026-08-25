import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
  SelectControl,
  __experimentalUnitControl as UnitControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import Label from "../../../../../../bpl-tools/Components/Label/Label";
import Device from "../../../../../../bpl-tools/Components/Device/Device";
import {
  emUnit,
  perUnit,
  pxUnit,
  vhUnit,
  vwUnit,
} from "../../../../../../bpl-tools/utils/options";
import { useDeviceKey } from "../../../utils/usePreviewDevice";
import { boxForDevice, setBoxForDevice } from "../../../utils/responsiveBox";
import { SHRINK_TO_FIT_LAYOUTS } from "../../../utils/layoutControls";

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
 * Alignment is the exception to that: it is only offered on the layouts whose
 * widget is narrower than its column, because those are the only ones it can
 * move. See SHRINK_TO_FIT_LAYOUTS.
 *
 * The device switch no longer takes a `device` / `setDevice` pair. It reads the
 * editor's own preview device, which every other switch in the sidebar now does
 * too, so they cannot disagree and there is nothing left to pass between them.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const SizeSpacingPanel = ({ attributes = {}, setAttributes }) => {
  const {
    blockWidth = {},
    cardHeight = {},
    cardMargin = {},
    blockMargin = {},
    blockAlign = "",
    layout = "default",
  } = attributes;

  // Alignment only has somewhere to move a block that is narrower than its
  // column, and that happens two ways: a badge widget is narrower by nature
  // (SHRINK_TO_FIT_LAYOUTS), and any layout is once it has been given a Block
  // Width. It used to be offered for the first case only, so on every other
  // layout a narrowed block could be centred and nothing else -- the width
  // rule's own `margin-left: auto; margin-right: auto` was the only answer
  // available. Offered in both cases now, and still hidden otherwise rather
  // than shown as a control that quietly does nothing.
  const hasWidth = Object.values(blockWidth || {}).some(Boolean);
  const canAlign = SHRINK_TO_FIT_LAYOUTS.includes(layout) || hasWidth;

  const device = useDeviceKey();

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
          <Device className="" />
        </PanelRow>

        <p className="description">
          {__(
            "Saved per device. Tablet and mobile inherit desktop until set.",
            "b-testimonials-block",
          )}
        </p>

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
            "Maximum width of the block. Empty uses the theme width.",
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
            "Minimum height for each card. Longer content still expands.",
            "b-testimonials-block",
          )}
        />

        {/* Not per device. A widget is the same width on a phone as on a
            desktop, so an alignment that changed with the viewport would be a
            setting to keep in step rather than one to use. */}
        {/* "" is kept as its own option rather than folded into Left, because
            it does not mean the same thing everywhere: a badge with no
            alignment lands left, while a block narrowed by Block Width is
            centred by that rule's auto margins. Making "" mean left would have
            moved every already-narrowed block on save. */}
        {canAlign && (
          <SelectControl
            className="mt20"
            label={__("Alignment", "b-testimonials-block")}
            value={blockAlign}
            onChange={(val) => setAttributes({ blockAlign: val })}
            options={[
              { label: __("Default", "b-testimonials-block"), value: "" },
              { label: __("Left", "b-testimonials-block"), value: "left" },
              { label: __("Center", "b-testimonials-block"), value: "center" },
              { label: __("Right", "b-testimonials-block"), value: "right" },
            ]}
            help={__(
              "Where the block sits in its column. Only does something once the block is narrower than the column -- either a Block Width above, or a badge, which is narrower on its own. Default leaves it where it lands: centred when a Block Width is set, left otherwise.",
              "b-testimonials-block",
            )}
          />
        )}
      </PanelBody>

      <PanelBody
        className="bPlPanelBody"
        title={__("Spacing", "b-testimonials-block")}
        initialOpen={false}>
        <PanelRow>
          <Label mt="0">{__("Device:", "b-testimonials-block")}</Label>
          <Device className="" />
        </PanelRow>

        <p className="description">
          {__(
            "Saved per device. For space inside a card use Card → Padding, and for the gap between cards use Layout → Column and Row Gap.",
            "b-testimonials-block",
          )}
        </p>

        {/* Space around the whole block. This is the one that separates this
            block from the one above or below it -- Card Margin below moves the
            card inside the block and cannot do that.

            The per-control notes are `<p>`s rather than a `help` prop: BoxControl
            takes no `help`, so passing one renders nothing at all. */}
        <BoxControl
          label={__("Block Margin", "b-testimonials-block")}
          values={boxForDevice(blockMargin, device)}
          onChange={(val) =>
            setAttributes({
              blockMargin: setBoxForDevice(blockMargin, device, val),
            })
          }
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />
        <p className="description">
          {__(
            "Space outside the whole block.",
            "b-testimonials-block",
          )}
        </p>

        {/* Resets to nothing rather than to a value of ours: the gap between
            cards is already set by Column/Row Gap, so a default margin here
            would fight it. This is for nudging cards, not spacing them. */}
        <BoxControl
          className="mt20"
          label={__("Card Margin", "b-testimonials-block")}
          values={boxForDevice(cardMargin, device)}
          onChange={(val) =>
            setAttributes({
              cardMargin: setBoxForDevice(cardMargin, device, val),
            })
          }
          resetValues={{ top: "", right: "", bottom: "", left: "" }}
          units={[pxUnit(3), emUnit(2), perUnit(2)]}
        />
        <p className="description">
          {__(
            "Space around each card, added to the gap.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>
    </>
  );
};

export default SizeSpacingPanel;
