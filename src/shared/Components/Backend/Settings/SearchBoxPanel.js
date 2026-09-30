import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TabPanel,
  ToggleControl,
} from "@wordpress/components";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";

/**
 * Style tab panel for the filter bar's search box.
 *
 * Its values share the filterStyle object with the Filter Bar panel, under
 * search* keys, so no new block attribute is needed. Every value is optional:
 * Style.js turns each one that is set into a --btb-search-* custom property
 * and frontend.scss falls back to the original look for the rest.
 *
 * @param {Object}   props.filterStyle   The block's filterStyle attribute.
 * @param {boolean}  props.showSpacing   Also offer the space under the bar,
 *                                       for when the Filter Bar panel (which
 *                                       normally holds it) is not shown.
 * @param {Function} props.setAttributes Attribute setter.
 */
const SearchBoxPanel = ({ filterStyle = {}, showSpacing = false, setAttributes }) => {
  const style = filterStyle && "object" === typeof filterStyle ? filterStyle : {};

  const update = (key, val) =>
    setAttributes({ filterStyle: { ...style, [key]: val } });

  const color = (label, key, className = "mt10") => (
    <ColorControl
      className={className}
      label={label}
      value={style[key] || ""}
      onChange={(val) => update(key, val)}
    />
  );

  const range = (label, key, min, max, help) => (
    <RangeControl
      label={label}
      value={style[key]}
      onChange={(val) => update(key, val)}
      min={min}
      max={max}
      allowReset
      help={help}
    />
  );

  const heading = (text) => (
    <p className="btbPanelHeading">
      <strong>{text}</strong>
    </p>
  );

  return (
    <PanelBody
      className="bPlPanelBody"
      title={__("Search Box", "b-testimonials-block")}
      initialOpen={false}>
      {heading(__("Colors", "b-testimonials-block"))}

      <TabPanel
        className="btbStateTabs"
        tabs={[
          { name: "normal", title: __("Normal", "b-testimonials-block") },
          { name: "focus", title: __("When Typing", "b-testimonials-block") },
        ]}>
        {(tab) => (
          <div className="btbStateTabBody">
            {"normal" === tab.name && (
              <>
                {color(__("Text Color:", "b-testimonials-block"), "searchColor", "")}
                {color(__("Placeholder Color:", "b-testimonials-block"), "searchPlaceholder")}
                {color(__("Background:", "b-testimonials-block"), "searchBg")}
                {color(__("Border Color:", "b-testimonials-block"), "searchBorder")}
              </>
            )}

            {"focus" === tab.name && (
              <>
                {color(__("Background:", "b-testimonials-block"), "searchFocusBg", "")}
                {color(__("Border Color:", "b-testimonials-block"), "searchFocusBorder")}
                <p className="btbHint">
                  {__(
                    "Applies once someone clicks into the box. Skip it and the border turns your accent color.",
                    "b-testimonials-block",
                  )}
                </p>
              </>
            )}
          </div>
        )}
      </TabPanel>

      {heading(__("Text and Shape", "b-testimonials-block"))}

      {range(
        __("Font Size (px)", "b-testimonials-block"),
        "searchSize",
        10,
        32,
      )}

      {range(
        __("Padding Top and Bottom (px)", "b-testimonials-block"),
        "searchPadY",
        0,
        30,
      )}

      {range(
        __("Padding Left and Right (px)", "b-testimonials-block"),
        "searchPadX",
        0,
        60,
      )}

      {range(
        __("Border Width (px)", "b-testimonials-block"),
        "searchBorderWidth",
        0,
        6,
        __("0 means no outline.", "b-testimonials-block"),
      )}

      {range(
        __("Roundness (px)", "b-testimonials-block"),
        "searchRadius",
        0,
        40,
        __(
          "Smaller numbers make it squarer. Clear it to go back to a pill shape.",
          "b-testimonials-block",
        ),
      )}

      {heading(__("Size and Position", "b-testimonials-block"))}

      <ToggleControl
        label={__("Full width", "b-testimonials-block")}
        checked={!!style.searchFull}
        onChange={(val) => update("searchFull", val)}
        help={__(
          "Makes the box as wide as the block, on a line of its own.",
          "b-testimonials-block",
        )}
      />

      {!style.searchFull && (
        <>
          {range(
            __("Width (px)", "b-testimonials-block"),
            "searchWidth",
            120,
            600,
            __("Not set? The box uses a comfortable default width.", "b-testimonials-block"),
          )}

          <SelectControl
            label={__("Position", "b-testimonials-block")}
            value={style.searchAlign || ""}
            onChange={(val) => update("searchAlign", val)}
            options={[
              {
                label: __("Default (next to the buttons)", "b-testimonials-block"),
                value: "",
              },
              { label: __("Own row, left", "b-testimonials-block"), value: "left" },
              { label: __("Own row, center", "b-testimonials-block"), value: "center" },
              { label: __("Own row, right", "b-testimonials-block"), value: "right" },
            ]}
          />
        </>
      )}

      {showSpacing && (
        <>
          {heading(__("Spacing", "b-testimonials-block"))}

          {range(
            __("Space Below the Box (px)", "b-testimonials-block"),
            "spaceBelow",
            0,
            100,
            __(
              "Room between the box and the first card.",
              "b-testimonials-block",
            ),
          )}
        </>
      )}

      <p className="btbHint">
        {__(
          "The hint text inside the box (the one that says Search reviews) is set on the General tab, under Filter & Search.",
          "b-testimonials-block",
        )}
      </p>
    </PanelBody>
  );
};

export default SearchBoxPanel;
