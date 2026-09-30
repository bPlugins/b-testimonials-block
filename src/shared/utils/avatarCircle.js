/**
 * The four layouts that draw their own avatar, and what their circle looks
 * like before anyone touches it.
 *
 * `selector` is the element that is the circle. `lineWidth` is the line the
 * stylesheet already gives it, so the control can show the real starting value
 * and a colour alone recolours that line rather than adding a new one.
 * The avatar list names only the faces that are not selected: the selected
 * face keeps its accent outline and shadow, which is how a visitor tells which
 * review is showing.
 */
export const AVATAR_CIRCLE_LAYOUTS = {
  "testimonials-avatar-list": { selector: ".btb-avatar-thumb:not(.active)", lineWidth: 2 },
  "testimonials-floating-bubble": { selector: ".btb-bubble-avatar", lineWidth: 2 },
  "social-proof-toast": { selector: ".btb-toast-avatar", lineWidth: 0 },
  "case-study-card": { selector: ".btb-cs-avatar", lineWidth: 0 },
};

const isSet = (val) =>
  val !== undefined && val !== null && val !== "" && Number(val) >= 0;

/**
 * CSS for the avatarCircle attribute, or "" when nothing is set.
 *
 * @param {string} mainEl       The block's root selector.
 * @param {string} layout       Current layout.
 * @param {Object} avatarCircle The block's avatarCircle attribute.
 * @return {string}
 */
export const avatarCircleCSS = (mainEl, layout, avatarCircle) => {
  const target = AVATAR_CIRCLE_LAYOUTS[layout];
  const c =
    avatarCircle && "object" === typeof avatarCircle && !Array.isArray(avatarCircle)
      ? avatarCircle
      : {};

  if (!target) {
    return "";
  }

  const rules = [];

  if (isSet(c.lineWidth)) {
    rules.push(
      Number(c.lineWidth) > 0
        ? `border-width: ${Number(c.lineWidth)}px; border-style: solid;`
        : "border-width: 0;",
    );
  }

  if (c.lineColor) {
    rules.push(`border-color: ${c.lineColor};`);
  }

  if (isSet(c.ringWidth)) {
    rules.push(
      Number(c.ringWidth) > 0
        ? `box-shadow: 0 0 0 ${Number(c.ringWidth)}px ${
            c.ringColor ||
            "color-mix(in srgb, var(--btb-accent, #146ef5) 18%, transparent)"
          };`
        : "box-shadow: none;",
    );
  }

  return rules.length
    ? `${mainEl} ${target.selector} { ${rules.join(" ")} }`
    : "";
};
