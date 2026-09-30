import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  __experimentalBoxControl as BoxControl,
} from "@wordpress/components";

import Label from "../../../../../../bpl-tools/Components/Label/Label";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { emUnit, pxUnit } from "../../../../../../bpl-tools/utils/options";

/**
 * The Popup Modal Review Trigger's popup.
 *
 * The block renders a grid of cards that open a full review in a modal, and the
 * modal was built entirely out of inline styles -- overlay colour and blur,
 * panel background, width, padding, radius, the close button, the avatar and all
 * four text sizes. Inline styles outrank even the ID-scoped rules Style.js
 * emits, so every panel on the Style tab reached the trigger cards and stopped
 * at the overlay: the one thing a reader actually opens could not be styled at
 * all, and its hardcoded white panel meant a dark palette opened a white popup
 * out of a dark card.
 *
 * Everything is CSS now, so this panel is a set of custom properties rather than
 * a special case. Each control is empty until touched and emits nothing, which
 * is what keeps the popup rendering exactly as it shipped.
 *
 * Colours for the four text parts are deliberately absent: they read the palette
 * roles, so the Colors panel's Title, Muted Text, Body Text and Rating Stars
 * already reach inside the popup.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const PopupModalPanel = ({ attributes = {}, setAttributes }) => {
  const {
    modalOverlayColor,
    modalOverlayBlur,
    modalBg,
    modalWidth,
    modalPadding = {},
    modalRadius,
    modalCloseSize,
    modalCloseColor,
    modalAvatarSize,
    modalNameSize,
    modalDegSize,
    modalStarsSize,
    modalReviewSize,
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Popup", "b-testimonials-block")}
      initialOpen={false}>
      <ColorControl
        className="mb10"
        label={__("Overlay Color", "b-testimonials-block")}
        value={modalOverlayColor}
        onChange={set("modalOverlayColor")}
      />

      {/* 0 is a real choice -- it turns the frosting off and leaves the overlay
          a flat wash, which is what a page with busy imagery behind it wants. */}
      <RangeControl
        className="mb10"
        label={__("Overlay Blur (px)", "b-testimonials-block")}
        value={modalOverlayBlur}
        onChange={set("modalOverlayBlur")}
        min={0}
        max={20}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <ColorControl
        className="mt20 mb10"
        label={__("Panel Background", "b-testimonials-block")}
        value={modalBg}
        onChange={set("modalBg")}
        help={__(
          "Left empty, the popup follows the Colors panel's Card Surface.",
          "b-testimonials-block",
        )}
      />

      <RangeControl
        className="mb10"
        label={__("Max Width (px)", "b-testimonials-block")}
        value={modalWidth}
        onChange={set("modalWidth")}
        min={280}
        max={1200}
        step={10}
        allowReset
        resetFallbackValue={undefined}
      />

      <BoxControl
        label={__("Panel Padding", "b-testimonials-block")}
        values={modalPadding}
        onChange={set("modalPadding")}
        units={[pxUnit(3), emUnit(2)]}
      />

      <RangeControl
        className="mb10"
        label={__("Panel Radius (px)", "b-testimonials-block")}
        value={modalRadius}
        onChange={set("modalRadius")}
        min={0}
        max={60}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <Label className="mt20">{__("Close Button", "b-testimonials-block")}</Label>

      <RangeControl
        className="mb10"
        label={__("Size (px)", "b-testimonials-block")}
        value={modalCloseSize}
        onChange={set("modalCloseSize")}
        min={12}
        max={48}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <ColorControl
        className="mb10"
        label={__("Color", "b-testimonials-block")}
        value={modalCloseColor}
        onChange={set("modalCloseColor")}
      />

      {/* The popup's own sizes rather than the Name / Designation / Review Text
          panels, which style the trigger card behind it. The popup is meant to
          be the larger presentation of the same testimonial -- 18px against the
          card's 16px, an italic 15px review against a plain one -- and sharing
          one control would collapse that the moment either was touched. */}
      <Label className="mt20">{__("Popup Text", "b-testimonials-block")}</Label>

      <RangeControl
        className="mb10"
        label={__("Avatar Size (px)", "b-testimonials-block")}
        value={modalAvatarSize}
        onChange={set("modalAvatarSize")}
        min={24}
        max={160}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <RangeControl
        className="mb10"
        label={__("Name Size (px)", "b-testimonials-block")}
        value={modalNameSize}
        onChange={set("modalNameSize")}
        min={10}
        max={48}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <RangeControl
        className="mb10"
        label={__("Designation Size (px)", "b-testimonials-block")}
        value={modalDegSize}
        onChange={set("modalDegSize")}
        min={8}
        max={32}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <RangeControl
        className="mb10"
        label={__("Stars Size (px)", "b-testimonials-block")}
        value={modalStarsSize}
        onChange={set("modalStarsSize")}
        min={8}
        max={48}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />

      <RangeControl
        className="mb10"
        label={__("Review Size (px)", "b-testimonials-block")}
        value={modalReviewSize}
        onChange={set("modalReviewSize")}
        min={10}
        max={40}
        step={1}
        allowReset
        resetFallbackValue={undefined}
      />
    </PanelBody>
  );
};

export default PopupModalPanel;
