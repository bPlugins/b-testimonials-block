import { __ } from "@wordpress/i18n";
import { RangeControl } from "@wordpress/components";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { AVATAR_CIRCLE_LAYOUTS } from "../../../utils/avatarCircle";

/**
 * Avatar circle controls for the four layouts that draw their own avatar:
 * Avatar Reviews List, Social Proof Toast, Customer Case Study and Floating
 * Avatar Bubbles.
 *
 * The other layouts keep their circle in imgBorder and avatarRing. Those
 * attributes exist on these blocks too, but with defaults these layouts never
 * showed (a 1px blue line, a ring), so reading them here would restyle every
 * block already on a page. These controls write to avatarCircle instead, which
 * starts empty, so an untouched block looks exactly as it did.
 *
 * @param {string}   props.layout        Current layout.
 * @param {Object}   props.avatarCircle  The block's avatarCircle attribute.
 * @param {Function} props.setAttributes Attribute setter.
 */

const AvatarCircleControls = ({ layout, avatarCircle = {}, setAttributes }) => {
  const value =
    avatarCircle && "object" === typeof avatarCircle && !Array.isArray(avatarCircle)
      ? avatarCircle
      : {};
  const { lineWidth: defaultLine = 0 } = AVATAR_CIRCLE_LAYOUTS[layout] || {};

  const update = (patch) =>
    setAttributes({ avatarCircle: { ...value, ...patch } });

  const lineWidth = undefined !== value.lineWidth ? value.lineWidth : defaultLine;

  return (
    <>
      <p className="btbPanelHeading">
        <strong>{__("Avatar Circle", "b-testimonials-block")}</strong>
      </p>

      <RangeControl
        label={__("Circle Line Width (px)", "b-testimonials-block")}
        value={lineWidth}
        onChange={(val) => update({ lineWidth: val })}
        min={0}
        max={10}
        step={1}
        allowReset
        resetFallbackValue={defaultLine}
        help={
          defaultLine
            ? __(
                "The line right around the photo. 0 hides it.",
                "b-testimonials-block",
              )
            : __(
                "This layout has no line by default. Give it a width to add one.",
                "b-testimonials-block",
              )
        }
      />

      <ColorControl
        label={__("Circle Line Color", "b-testimonials-block")}
        value={value.lineColor || ""}
        onChange={(val) =>
          // A colour on a line with no width would show nothing, so picking
          // one on a layout with no line turns a 1px line on.
          update(
            lineWidth > 0 ? { lineColor: val } : { lineColor: val, lineWidth: 1 },
          )
        }
      />

      <RangeControl
        className="mt20"
        label={__("Outer Ring Width (px)", "b-testimonials-block")}
        value={value.ringWidth}
        onChange={(val) => update({ ringWidth: val })}
        min={0}
        max={20}
        step={1}
        allowReset
        help={__(
          "A softer circle outside the line. Leave it empty for no ring.",
          "b-testimonials-block",
        )}
      />

      <ColorControl
        label={__("Outer Ring Color", "b-testimonials-block")}
        value={value.ringColor || ""}
        onChange={(val) =>
          update(
            value.ringWidth > 0 ? { ringColor: val } : { ringColor: val, ringWidth: 3 },
          )
        }
      />
      <p className="btbHint">
        {"testimonials-avatar-list" === layout
          ? __(
              "The face that is selected keeps its accent outline, so visitors can still tell which review is open.",
              "b-testimonials-block",
            )
          : __(
              "No ring color picked? It uses a light tint of your accent color.",
              "b-testimonials-block",
            )}
      </p>
    </>
  );
};

export default AvatarCircleControls;
