import { BRAND_COLOR } from "../../utils/icons";

/**
 * Resolve the colour for an icon slot, used by the built-in SVG fallbacks too.
 *
 * @param {Object} icon     Icon slot value: { svg, color, size }.
 * @param {string} fallback Colour to use when nothing is set.
 * @return {string} A CSS colour.
 */
export const resolveIconColor = (icon = {}, fallback = BRAND_COLOR) => {
  const { color } = icon || {};

  return color && "inherit" !== color ? color : fallback;
};

/**
 * Renders a user-picked icon, or the block's original artwork.
 *
 * The picked icon is inline SVG markup stored by bpl-tools' IconLibrary, so it
 * needs no icon font on the front end. Colour is applied via `color` and the
 * `fill: currentColor` rule on `.btb-custom-icon svg`: fill inherits, so paths
 * carrying their own fill (Lucid's `fill="none"` outlines) keep it while the
 * Font Awesome and Bootstrap paths, which declare no fill, pick up the colour.
 *
 * When no icon has been picked the `renderFallback` render-prop is used and
 * handed the resolved colour, so the colour control still works on the built-in
 * artwork without the user having to choose an icon first.
 *
 * @param {Object}   props
 * @param {Object}   props.icon           Icon slot value.
 * @param {number}   props.size           Default size in px.
 * @param {string}   props.className      Extra classes for the wrapper.
 * @param {string}   props.defaultColor   Colour the fallback uses when none is set.
 * @param {Function} props.renderFallback (color) => node, used when no icon is picked.
 */
const BlockIcon = ({
  icon = {},
  size = 36,
  className = "",
  defaultColor = BRAND_COLOR,
  renderFallback,
}) => {
  const svg = icon?.svg;

  if (!svg) {
    return renderFallback
      ? renderFallback(resolveIconColor(icon, defaultColor))
      : null;
  }

  const box = `${icon.size || size}px`;

  return (
    <span
      className={`btb-custom-icon ${className}`.trim()}
      style={{
        color: resolveIconColor(icon, defaultColor),
        width: box,
        height: box,
      }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default BlockIcon;
