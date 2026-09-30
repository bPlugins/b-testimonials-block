/**
 * Per-device box values, for the spacing controls.
 *
 * Block Width and Card Height have always been `{ desktop, tablet, mobile }`,
 * but Padding, Block Margin and Card Margin were one flat
 * `{ top, right, bottom, left }` for every screen -- so the padding that suits a
 * three-column desktop grid was the same padding a phone got, with no way to
 * trim it. These helpers give the three box controls the same per-device shape
 * without breaking the blocks already saved with the flat one.
 *
 * A stored value is one of:
 *   { top, right, bottom, left }                     -- every device (old)
 *   { desktop: {...}, tablet: {...}, mobile: {...} } -- per device (new)
 *
 * Old values are read as the desktop entry, so an existing block keeps rendering
 * exactly as it did and only gains tablet and mobile once someone sets them.
 */

const DEVICES = ["desktop", "tablet", "mobile"];

/**
 * Whether a stored value is already in the per-device shape.
 *
 * Checked by key rather than by depth: a flat box carries only side names, so
 * the two shapes can never be confused.
 *
 * @param {Object} value Stored attribute value.
 * @return {boolean} True when the value is keyed by device.
 */
const isPerDevice = (value) =>
  !!value &&
  "object" === typeof value &&
  DEVICES.some((device) => device in value);

/**
 * The stored value as a `{ desktop, tablet, mobile }` map.
 *
 * @param {Object} value Stored attribute value.
 * @return {Object} Map of device to box.
 */
export const toPerDevice = (value) => {
  if (!value || "object" !== typeof value) {
    return {};
  }

  return isPerDevice(value) ? value : { desktop: value };
};

/**
 * The box a device renders with, following the inheritance the media queries
 * apply: mobile falls back to tablet, tablet to desktop.
 *
 * Use for the control's displayed value, so a device with nothing of its own
 * shows what it actually inherits rather than an empty field.
 *
 * @param {Object} value  Stored attribute value.
 * @param {string} device 'desktop', 'tablet' or 'mobile'.
 * @return {Object} The box for that device.
 */
export const boxForDevice = (value, device) => {
  const perDevice = toPerDevice(value);

  if ("mobile" === device) {
    return perDevice.mobile ?? perDevice.tablet ?? perDevice.desktop ?? {};
  }
  if ("tablet" === device) {
    return perDevice.tablet ?? perDevice.desktop ?? {};
  }

  return perDevice.desktop ?? {};
};

/**
 * The box a device has set *of its own*, with no inheritance.
 *
 * Use when emitting CSS: a tablet value that merely repeats the desktop one
 * would fill the media query with declarations that change nothing, and worse,
 * would freeze the desktop value in place for anyone who later edits it.
 *
 * @param {Object} value  Stored attribute value.
 * @param {string} device 'desktop', 'tablet' or 'mobile'.
 * @return {Object|undefined} The box, or undefined when that device sets none.
 */
export const ownBoxForDevice = (value, device) => toPerDevice(value)[device];

/**
 * The stored value with one device's box replaced.
 *
 * Upgrades a flat value on the way, carrying it over as the desktop entry so
 * editing tablet on an existing block does not drop what desktop already had.
 *
 * @param {Object} value  Stored attribute value.
 * @param {string} device 'desktop', 'tablet' or 'mobile'.
 * @param {Object} box    The new box for that device.
 * @return {Object} The value to store.
 */
export const setBoxForDevice = (value, device, box) => ({
  ...toPerDevice(value),
  [device]: box,
});
