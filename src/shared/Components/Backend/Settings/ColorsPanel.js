import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { getVisualControls } from "../../../utils/visualControls";

/**
 * Colour controls for whatever the current layout's stylesheet actually paints.
 *
 * Shared so the blocks that register their own editor get the same panel the
 * shared Settings renders, instead of each growing its own partial copy.
 *
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {string}   props.layout        Layout override, when the block does
 *                                       not keep it in `attributes.layout`.
 */
const ColorsPanel = ({ attributes = {}, setAttributes, layout }) => {
  const controls = getVisualControls(layout ?? attributes.layout);

  if (!controls.length) {
    return null;
  }

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Colors", "b-testimonials-block")}
      initialOpen={false}>
      {controls.map(({ attr, label, type }) =>
        "width" === type ? (
          <RangeControl
            key={attr}
            className="mb10"
            label={label}
            value={attributes[attr]}
            onChange={(val) => setAttributes({ [attr]: val })}
            min={0}
            max={12}
            step={1}
            allowReset
          />
        ) : (
          <ColorControl
            key={attr}
            className="mb10"
            label={label}
            value={attributes[attr]}
            onChange={(val) => setAttributes({ [attr]: val })}
          />
        ),
      )}
    </PanelBody>
  );
};

export default ColorsPanel;
