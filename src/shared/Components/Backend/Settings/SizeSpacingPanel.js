import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  PanelRow,
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
  } = attributes;

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
            "Both values below are saved per device, and switching device here also switches the editor preview. Desktop is the base: tablet and mobile inherit it until you give them a value of their own, and clearing a value hands that screen back to the one above it.",
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
            "How wide the whole block may get. It is a maximum, so a narrower screen still wins and the block shrinks to fit. Empty means the theme decides.",
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
            "A floor for every card, to even up a ragged row. Cards never get cut off: one with more text than the rest grows past this instead.",
            "b-testimonials-block",
          )}
        />
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
            "Two different boxes: Block Margin is the space outside the whole block, Card Margin the space around each card inside it. Neither is the gap between cards — that is Column Gap and Row Gap in the Layout panel. Both are margins, so they push from the outside; for space inside a card use Padding in the Card panel.",
            "b-testimonials-block",
          )}
        </p>

        <p className="description">
          {__(
            "Both are saved per device. Desktop is the base; tablet and mobile show what they inherit until you change them.",
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
            "Separates this block from whatever sits above or below it on the page.",
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
            "Nudges every card by the same amount. It adds to the grid gap rather than replacing it, so leave it empty unless a card needs shifting.",
            "b-testimonials-block",
          )}
        </p>
      </PanelBody>
    </>
  );
};

export default SizeSpacingPanel;
