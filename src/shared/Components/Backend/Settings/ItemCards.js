import { __, sprintf } from "@wordpress/i18n";
import { useEffect, useState } from "react";
import { Button, Dashicon, PanelRow } from "@wordpress/components";

import Label from "../../../../../../bpl-tools/Components/Label/Label";
import { gearIcon } from "../../../../../../bpl-tools/utils/icons";

/**
 * One card at a time, chosen from a row of numbered buttons.
 *
 * This is the shape the main testimonial card editor has always had -- Card 1 /
 * Card 2 chips, the fields for whichever is selected, then Remove, Duplicate and
 * a full-width Add -- lifted out so the rest of the plugin's repeaters can have
 * it too.
 *
 * The others each grew their own: a `.btb-section-card` box per item with every
 * item expanded at once. That reads fine at two items and badly past three --
 * measured, Video Testimonials at four items ran 1,180px of sidebar for one
 * panel, so reaching the last card meant scrolling past three you were not
 * editing. It also meant five separate implementations of remove/duplicate/add
 * drifting apart in wording, button order and spacing.
 *
 * Deliberately unaware of what a "card" holds: callers pass a render function
 * for the fields, so a testimonial, a logo, a trust badge and a table row all
 * get the same chrome without this component knowing anything about them.
 *
 * @param {Object}   props
 * @param {Array}    props.items      The array being edited.
 * @param {Function} props.onChange   Called with the next array.
 * @param {Object}   props.newItem    Template appended by Add.
 * @param {string}   props.itemLabel  Singular noun: "Card", "Logo", "Badge".
 * @param {string}   props.label      Optional heading above the chips.
 * @param {string}   props.addLabel   Optional override for the Add button.
 * @param {number}   props.minItems   Below this, Remove is hidden. Default 1.
 * @param {Function} props.children   (item, index, update) => fields.
 */
const ItemCards = ({
  items = [],
  onChange,
  newItem = {},
  itemLabel = __("Card", "b-testimonials-block"),
  label = "",
  addLabel = "",
  minItems = 1,
  children,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Removing the last card, or arriving at a block whose array is shorter than
  // the index left over from the previously selected block, would otherwise
  // leave the selection pointing past the end and render no fields at all.
  useEffect(() => {
    if (activeIndex > items.length - 1) {
      setActiveIndex(Math.max(0, items.length - 1));
    }
  }, [items.length, activeIndex]);

  const index = Math.min(activeIndex, Math.max(0, items.length - 1));
  const current = items[index];

  // One field of one item. Spread rather than mutated: an attribute array has to
  // be a new reference or the editor does not see the change.
  const update = (key, val) =>
    onChange(
      items.map((item, i) => (i === index ? { ...item, [key]: val } : item)),
    );

  const add = () => {
    onChange([...items, { ...newItem }]);
    setActiveIndex(items.length);
  };

  const duplicate = () => {
    onChange([
      ...items.slice(0, index + 1),
      { ...items[index] },
      ...items.slice(index + 1),
    ]);
    setActiveIndex(index + 1);
  };

  const remove = () => {
    onChange(items.filter((_, i) => i !== index));
    setActiveIndex(Math.max(0, index - 1));
  };

  return (
    <>
      {label && <Label>{label}</Label>}

      {1 < items.length && (
        <div className="btb-card-selector-list mb15">
          {items.map((_, i) => (
            <Button
              key={i}
              variant={index === i ? "primary" : "secondary"}
              isSmall
              onClick={() => setActiveIndex(i)}>
              {/* translators: %1$s is a noun such as Card or Logo, %2$d its number. */}
              {sprintf(
                __("%1$s %2$d", "b-testimonials-block"),
                itemLabel,
                i + 1,
              )}
            </Button>
          ))}
        </div>
      )}

      {current && (
        <>
          <h3 className="bplItemTitle">
            {/* translators: %1$s is a noun such as Card or Logo, %2$d its number. */}
            {sprintf(
              __("%1$s %2$d:", "b-testimonials-block"),
              itemLabel,
              index + 1,
            )}
          </h3>

          {children(current, index, update)}

          <PanelRow className="itemAction mt10 mb15">
            {minItems < items.length && (
              <Button
                className="removeItem"
                label={__("Remove", "b-testimonials-block")}
                onClick={remove}>
                <Dashicon icon="no" />
                {__("Remove", "b-testimonials-block")}
              </Button>
            )}
            <Button
              className="duplicateItem"
              label={__("Duplicate", "b-testimonials-block")}
              onClick={duplicate}>
              {gearIcon}
              {__("Duplicate", "b-testimonials-block")}
            </Button>
          </PanelRow>
        </>
      )}

      <div className="addItem">
        <Button
          label={
            addLabel ||
            sprintf(__("Add New %s", "b-testimonials-block"), itemLabel)
          }
          onClick={add}>
          <Dashicon icon="plus" size={23} />
          {addLabel ||
            sprintf(__("Add New %s", "b-testimonials-block"), itemLabel)}
        </Button>
      </div>
    </>
  );
};

export default ItemCards;
