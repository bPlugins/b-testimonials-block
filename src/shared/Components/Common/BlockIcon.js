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
 * Stroke colour is deliberately opt-in rather than defaulted to the fill.
 * Font Awesome and Bootstrap glyphs are solid shapes carrying no stroke at all,
 * and SVG's initial `stroke-width` is 1 -- so painting a stroke unconditionally
 * would thicken every one of those icons the moment the control existed. The
 * class only goes on once the author picks a colour, which keeps an untouched
 * block rendering exactly as before.
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
  const strokeColor = icon?.strokeColor;
  const strokeClass = strokeColor ? " btb-icon-stroke" : "";
  const strokeVar = strokeColor ? { "--btb-icon-stroke": strokeColor } : {};

  if (!svg) {
    const fallback = renderFallback
      ? renderFallback(resolveIconColor(icon, defaultColor))
      : null;

    if (!fallback || !strokeColor) {
      return fallback;
    }

    // The built-in artwork is rendered by the caller, so the stroke reaches it
    // through a wrapper instead of a prop -- otherwise the control would look
    // dead until the author had picked an icon, and every call site would need
    // the same two lines. `display: contents` keeps the wrapper out of the
    // layout while custom properties and descendant selectors pass through it.
    return (
      <span className="btb-icon-stroke" style={strokeVar}>
        {fallback}
      </span>
    );
  }

  const box = `${icon.size || size}px`;

  return (
    <span
      className={`btb-custom-icon${strokeClass} ${className}`.trim()}
      style={{
        color: resolveIconColor(icon, defaultColor),
        width: box,
        height: box,
        ...strokeVar,
      }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};

export default BlockIcon;
