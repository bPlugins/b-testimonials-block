import { __ } from "@wordpress/i18n";
import {
  Button,
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";

import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";

/**
 * The Speech Bubble card's tail.
 *
 * The tail is the whole of what makes this layout a speech bubble rather than a
 * plain card, and it was the one part of it with nothing in the sidebar: the
 * stylesheet fixed it at 12px, 30px in from the left, pointing down, on every
 * card. Its two colours were resolved from the Card panel -- so they at least
 * followed the bubble -- but an author who wanted it centred, on the right, or
 * gone entirely had no way to ask.
 *
 * Rendered only where `bubbleTail` is declared, which is that block alone. The
 * gate is the attribute rather than the layout for the same reason the gradient
 * ring's is: it costs nothing here, and it keeps the panel from appearing on a
 * block that has no tail to move.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 */
const SpeechBubblePanel = ({ attributes = {}, setAttributes }) => {
  const {
    bubbleTail = true,
    bubbleTailSize = 12,
    bubbleTailOffset = 30,
    bubbleTailAlign = "left",
    bubbleTailFill,
    bubbleTailLine,
    surfaceColor,
    borderColor,
    background,
    border = {},
  } = attributes;

  const set = (key) => (val) => setAttributes({ [key]: val });

  // What the tail is painted with right now.
  //
  // Both pickers stay empty until an author sets one, which is what keeps the
  // tail following the card -- but an empty ColorControl paints its swatch
  // transparent, so the panel showed no colour at all while the tail on the
  // canvas was plainly blue. There was nothing to say where that blue came
  // from, or anything to nudge if you wanted it a shade off.
  //
  // So the swatch shows the resolved colour instead. It is resolved the way
  // Style.js resolves the two custom properties -- palette role first, then the
  // Card panel's own value -- and `#0000` is this block's shipped Background
  // default meaning "not set", which is why it falls through to white there
  // rather than reading as a transparent tail.
  const effectiveFill =
    surfaceColor || (background && "#0000" !== background ? background : "#ffffff");
  const effectiveLine = borderColor || border?.color || "transparent";

  const followsCard = ! bubbleTailFill && ! bubbleTailLine;

  // Centre puts the tail at the middle of the card's bottom edge, so there is
  // no edge left for an offset to measure from.
  const hasOffset = "center" !== bubbleTailAlign;

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Speech Bubble", "b-testimonials-block")}
      initialOpen={false}>
      <ToggleControl
        label={__("Tail", "b-testimonials-block")}
        checked={!!bubbleTail}
        onChange={set("bubbleTail")}
        help={__(
          "Off leaves the plain rounded card without a pointer.",
          "b-testimonials-block",
        )}
      />

      {bubbleTail && (
        <>
          {/* Alternating is `:nth-child(even)` on the card, so it counts cards
              that are siblings. In the Grid and List arrangements they are; a
              Slider puts each card in its own slide and Masonry in its own
              column, so there every card is the first of its parent and they all
              take the left. Said in the help text rather than hiding the option,
              since the arrangement is one click away on the General tab. */}
          <SelectControl
            className="mt20"
            label={__("Tail Position", "b-testimonials-block")}
            value={bubbleTailAlign}
            onChange={set("bubbleTailAlign")}
            options={[
              {
                label: __("Left", "b-testimonials-block"),
                value: "left",
              },
              {
                label: __("Center", "b-testimonials-block"),
                value: "center",
              },
              {
                label: __("Right", "b-testimonials-block"),
                value: "right",
              },
              {
                label: __("Alternate sides", "b-testimonials-block"),
                value: "alternate",
              },
            ]}
            help={
              "alternate" === bubbleTailAlign
                ? __(
                    "Left on one card and right on the next, so a column of them reads as a conversation. Needs the Grid or List arrangement.",
                    "b-testimonials-block",
                  )
                : undefined
            }
          />

          {/* Half the triangle's base, so the tail is twice this wide. */}
          <RangeControl
            className="mt20 mb10"
            label={__("Tail Size (px)", "b-testimonials-block")}
            value={bubbleTailSize}
            onChange={set("bubbleTailSize")}
            min={0}
            max={40}
            step={1}
            allowReset
            resetFallbackValue={12}
            help={__(
              "Half the tail's width, and how far it drops below the card.",
              "b-testimonials-block",
            )}
          />

          {hasOffset && (
            <RangeControl
              className="mb10"
              label={__("Tail Offset (px)", "b-testimonials-block")}
              value={bubbleTailOffset}
              onChange={set("bubbleTailOffset")}
              min={0}
              max={200}
              step={1}
              allowReset
              resetFallbackValue={30}
              help={__(
                "In from the card's edge. 0 pins the tail to the corner.",
                "b-testimonials-block",
              )}
            />
          )}

          {/* Seeded with what the tail is painted with, so the swatch shows a
              colour rather than an empty square -- but the attribute stays
              unset until one is picked, which is what keeps a tail nobody has
              touched following the card. Picking the same colour it already
              shows is a no-op on the canvas and a deliberate pin here: the tail
              stops following from that point on, and Follow the card below puts
              it back. */}
          <ColorControl
            className="mt20 mb10"
            label={__("Tail Color", "b-testimonials-block")}
            value={bubbleTailFill || effectiveFill}
            onChange={set("bubbleTailFill")}
          />

          <ColorControl
            className="mb10"
            label={__("Tail Outline", "b-testimonials-block")}
            value={bubbleTailLine || effectiveLine}
            onChange={set("bubbleTailLine")}
          />

          {followsCard ? (
            <p className="description">
              {__(
                "Following the Card panel's Background and Border. Pick a colour to pin the tail to it instead.",
                "b-testimonials-block",
              )}
            </p>
          ) : (
            <>
              {/* The only way back. ColorControl's own reset writes a colour,
                  so it cannot clear one; without this a picked tail could never
                  be handed back to the card. */}
              <Button
                variant="secondary"
                isSmall
                onClick={() =>
                  setAttributes({ bubbleTailFill: "", bubbleTailLine: "" })
                }>
                {__("Follow the card again", "b-testimonials-block")}
              </Button>

              <p className="description">
                {__(
                  "Pinned. The tail keeps these colours when the card's Background or Border changes.",
                  "b-testimonials-block",
                )}
              </p>
            </>
          )}
        </>
      )}
    </PanelBody>
  );
};

export default SpeechBubblePanel;
