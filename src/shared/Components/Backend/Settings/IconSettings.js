import { __, sprintf } from "@wordpress/i18n";
import { useState } from "react";
import {
  Button,
  Dashicon,
  PanelBody,
  RangeControl,
} from "@wordpress/components";

import IconLibrary from "../../../../../../bpl-tools/Components/IconLibrary/IconLibrary";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { ICON_LAYOUTS, resolveIconSlots } from "../../../utils/blockIcons";
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
 * Size is offered only where the layout declares a default box for it. Trust
 * Badges declares none: it has a block-level Icon Size in the Badge Icon panel,
 * and with both live the per-slot value silently outranked it -- BlockIcon
 * writes width and height inline off the slot -- so the block-level control
 * looked dead. One pixel, one control, and there it is the block's.
 *
 * A layout whose icons come from a repeater shows one slot at a time behind a
 * row of chips, the shape ItemCards gives the Badges panel, plus that panel's
 * Add button. Stacked, four badges ran to three pickers and six colour controls
 * before the fourth was reachable.
 *
 * The chips are built here rather than by using ItemCards, which drives all of
 * its chrome from the array it edits. Two things do not fit that: the slots are
 * not the array -- with no badges added the block still renders its four-badge
 * fallback, so there are four slots and an empty array -- and Remove and
 * Duplicate belong to the Badges panel, which is the one place a badge is
 * created or destroyed. Its class names are reused so both panels look alike.
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
  const [activeSlot, setActiveSlot] = useState(0);

  if (!config) {
    return null;
  }

  const slots = resolveIconSlots(config, attributes);

  // Clamped on read rather than reset in an effect: removing the last badge, or
  // moving to a block whose repeater is shorter, would otherwise leave the
  // selection past the end and the panel showing no controls at all.
  const index = Math.min(activeSlot, Math.max(0, slots.length - 1));
  const slot = slots[index];

  const setIcon = (key, patch) =>
    setAttributes({
      customIcons: {
        ...customIcons,
        [key]: { ...(customIcons[key] || {}), ...patch },
      },
    });

  // Appends to the repeater this layout draws its slots from, so the new slot
  // appears in this panel the moment the badge exists -- and is selected, since
  // adding one is how you say which icon you came here to pick.
  const addItem = () => {
    const list = attributes[config.add.attribute];
    const next = Array.isArray(list) ? list : [];

    setAttributes({
      [config.add.attribute]: [...next, { ...config.add.newItem }],
    });
    setActiveSlot(next.length);
  };

  const icon = slot ? customIcons[slot.key] || {} : {};

  // One slot's controls. The picker's own label is "Icon" whenever the chips
  // above already name which one -- otherwise the single-slot layouts, whose
  // label is the whole identification ("Play Icon"), would lose it.
  const iconFields = (
    <>
      {slot?.note && <p className="description">{slot.note}</p>}

      <IconLibrary
        label={
          config.add ? __("Icon", "b-testimonials-block") : slot?.label || ""
        }
        value={icon.svg || ""}
        onChange={(svg) => setIcon(slot.key, { svg })}
      />

      <ColorControl
        label={__("Icon Color", "b-testimonials-block")}
        value={icon.color || BRAND_COLOR}
        onChange={(color) => setIcon(slot.key, { color })}
        defaultColor={BRAND_COLOR}
      />

      {/* Left unset rather than seeded with the fill colour: an icon
          with no stroke of its own would gain one at SVG's initial
          1px width the moment this panel opened. Clearing it back to
          empty removes the stroke again. */}
      <ColorControl
        label={__("Icon Stroke Color", "b-testimonials-block")}
        value={icon.strokeColor || ""}
        onChange={(strokeColor) => setIcon(slot.key, { strokeColor })}
      />

      {config.size && (
        <RangeControl
          label={__("Icon Size", "b-testimonials-block")}
          value={icon.size ?? config.size}
          onChange={(size) => setIcon(slot.key, { size })}
          min={12}
          max={160}
          allowReset={true}
          resetFallbackValue={config.size}
        />
      )}
    </>
  );

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Icon", "b-testimonials-block")}
      initialOpen={initialOpen}>
      {1 < slots.length && (
        <div className="btb-card-selector-list mb15">
          {slots.map((it, i) => (
            <Button
              key={it.key}
              variant={index === i ? "primary" : "secondary"}
              isSmall
              onClick={() => setActiveSlot(i)}>
              {/* translators: %1$s is a noun such as Badge, %2$d its number. */}
              {sprintf(
                __("%1$s %2$d", "b-testimonials-block"),
                config.itemLabel || __("Icon", "b-testimonials-block"),
                i + 1,
              )}
            </Button>
          ))}
        </div>
      )}

      {slot && (
        <div className="btb-icon-slot">
          {config.add && (
            <h3 className="bplItemTitle">
              {/* translators: %s names the item, e.g. a badge title. */}
              {sprintf(__("%s:", "b-testimonials-block"), slot.label)}
            </h3>
          )}

          {iconFields}
        </div>
      )}

      {config.add && (
        <div className="addItem">
          <Button label={config.add.label} onClick={addItem}>
            <Dashicon icon="plus" size={23} />
            {config.add.label}
          </Button>
        </div>
      )}
    </PanelBody>
  );
};

export default IconSettings;
