import { __ } from "@wordpress/i18n";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TabPanel,
} from "@wordpress/components";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";

/**
 * Style tab panel for the filter bar's category buttons. The search box has a
 * panel of its own, SearchBoxPanel, keeping its values in the same object.
 *
 * Every value is optional. Style.js turns each one that is set into a
 * --btb-filter-* or --btb-search-* custom property, and frontend.scss falls
 * back to the original look for the rest, so an untouched block is unchanged.
 * Everything is kept in the one filterStyle object, so adding a control here
 * never needs a new block attribute.
 *
 * @param {Object}   props.filterStyle   The block's filterStyle attribute.
 * @param {boolean}  props.showFilter    Whether the category buttons are on.
 * @param {boolean}  props.showSearch    Whether the search box is on.
 * @param {Function} props.setAttributes Attribute setter.
 */
const FilterBarPanel = ({
  filterStyle = {},
  showFilter = false,
  showSearch = false,
  setAttributes,
}) => {
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
      title={__("Filter Bar", "b-testimonials-block")}
      initialOpen={false}>
      {showFilter && (
        <>
          {heading(__("Button Colors", "b-testimonials-block"))}

          <TabPanel
            className="btbStateTabs"
            tabs={[
              { name: "normal", title: __("Normal", "b-testimonials-block") },
              { name: "hover", title: __("Hover", "b-testimonials-block") },
              { name: "active", title: __("Selected", "b-testimonials-block") },
            ]}>
            {(tab) => (
              <div className="btbStateTabBody">
                {"normal" === tab.name && (
                  <>
                    {color(__("Text Color:", "b-testimonials-block"), "color", "")}
                    {color(__("Background:", "b-testimonials-block"), "bg")}
                    {color(__("Border Color:", "b-testimonials-block"), "borderColor")}
                  </>
                )}

                {"hover" === tab.name && (
                  <>
                    {color(__("Text Color:", "b-testimonials-block"), "hoverColor", "")}
                    {color(__("Background:", "b-testimonials-block"), "hoverBg")}
                    {color(__("Border Color:", "b-testimonials-block"), "hoverBorder")}
                  </>
                )}

                {"active" === tab.name && (
                  <>
                    {color(__("Text Color:", "b-testimonials-block"), "activeColor", "")}
                    {color(__("Background:", "b-testimonials-block"), "activeBg")}
                    {color(__("Border Color:", "b-testimonials-block"), "activeBorder")}
                    <p className="btbHint">
                      {__(
                        "This is the button the visitor just clicked. If you leave it alone, it uses the accent color with white text.",
                        "b-testimonials-block",
                      )}
                    </p>
                  </>
                )}
              </div>
            )}
          </TabPanel>

          {heading(__("Button Text", "b-testimonials-block"))}

          {range(
            __("Font Size (px)", "b-testimonials-block"),
            "fontSize",
            10,
            32,
          )}

          <SelectControl
            label={__("Font Weight", "b-testimonials-block")}
            value={style.fontWeight || ""}
            onChange={(val) => update("fontWeight", val)}
            options={[
              { label: __("Default", "b-testimonials-block"), value: "" },
              { label: __("Light (300)", "b-testimonials-block"), value: "300" },
              { label: __("Normal (400)", "b-testimonials-block"), value: "400" },
              { label: __("Medium (500)", "b-testimonials-block"), value: "500" },
              { label: __("Semi Bold (600)", "b-testimonials-block"), value: "600" },
              { label: __("Bold (700)", "b-testimonials-block"), value: "700" },
            ]}
          />

          <SelectControl
            label={__("Letter Case", "b-testimonials-block")}
            value={style.textTransform || ""}
            onChange={(val) => update("textTransform", val)}
            options={[
              { label: __("As typed", "b-testimonials-block"), value: "" },
              { label: __("UPPERCASE", "b-testimonials-block"), value: "uppercase" },
              { label: __("lowercase", "b-testimonials-block"), value: "lowercase" },
              { label: __("Capitalize Each Word", "b-testimonials-block"), value: "capitalize" },
            ]}
          />

          {range(
            __("Letter Spacing (px)", "b-testimonials-block"),
            "letterSpacing",
            0,
            6,
          )}

          {heading(__("Button Shape", "b-testimonials-block"))}

          {range(
            __("Padding Top and Bottom (px)", "b-testimonials-block"),
            "padY",
            0,
            30,
          )}

          {range(
            __("Padding Left and Right (px)", "b-testimonials-block"),
            "padX",
            0,
            60,
          )}

          {range(
            __("Border Width (px)", "b-testimonials-block"),
            "borderWidth",
            0,
            6,
            __("Set to 0 and the outline disappears.", "b-testimonials-block"),
          )}

          {range(
            __("Roundness (px)", "b-testimonials-block"),
            "radius",
            0,
            40,
            __(
              "0 is square. Leave it empty and the buttons are fully round.",
              "b-testimonials-block",
            ),
          )}

          {heading(__("Button Layout", "b-testimonials-block"))}

          <SelectControl
            label={__("Alignment", "b-testimonials-block")}
            value={style.align || ""}
            onChange={(val) => update("align", val)}
            options={[
              { label: __("Default (Left)", "b-testimonials-block"), value: "" },
              { label: __("Left", "b-testimonials-block"), value: "left" },
              { label: __("Center", "b-testimonials-block"), value: "center" },
              { label: __("Right", "b-testimonials-block"), value: "right" },
            ]}
          />

          {range(
            __("Space Between Buttons (px)", "b-testimonials-block"),
            "gap",
            0,
            40,
          )}
        </>
      )}

      {showSearch && (
        <p className="btbHint">
          {__(
            "Looking for the search box options? They are in the Search Box panel below.",
            "b-testimonials-block",
          )}
        </p>
      )}

      {heading(__("Spacing", "b-testimonials-block"))}

      {range(
        __("Space Below the Bar (px)", "b-testimonials-block"),
        "spaceBelow",
        0,
        100,
        __(
          "How far the testimonials sit below the buttons.",
          "b-testimonials-block",
        ),
      )}

      <p className="btbHint">
        {__(
          "You do not have to set everything. Whatever you skip keeps the normal look.",
          "b-testimonials-block",
        )}
      </p>
    </PanelBody>
  );
};

export default FilterBarPanel;
