import { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import BlockSwitcher from "../../shared/Components/Common/BlockSwitcher";
import { InlineDetailMediaUpload } from '../../../../bpl-tools/Components/MediaControl/MediaControl';
import ColorsPanel from "../../shared/Components/Backend/Settings/ColorsPanel";
import SizeSpacingPanel from "../../shared/Components/Backend/Settings/SizeSpacingPanel";
import Style from "../../shared/Components/Common/Style";
import { ColorControl } from "../../../../bpl-tools/Components/ColorControl/ColorControl";
import { emUnit, perUnit, pxUnit } from "../../../../bpl-tools/utils/options";

import BeforeAfterSlider from "../../shared/Components/Common/BeforeAfterSlider";
import "../../shared/styles/before-after.scss";

const RATIO_OPTIONS = [
  { label: __("Auto (image height)", "b-testimonials-block"), value: "auto" },
  { label: "21:9", value: "21:9" },
  { label: "16:9", value: "16:9" },
  { label: "3:2", value: "3:2" },
  { label: "4:3", value: "4:3" },
  { label: "1:1", value: "1:1" },
  { label: "4:5", value: "4:5" },
];

const Edit = ({ attributes, setAttributes, clientId }) => {
  const {
    beforeImg,
    afterImg,
    beforeLabel,
    afterLabel,
    startPosition,
    accentColor,
    orientation,
    interaction,
    aspectRatio,
    mediaRadius,
    dividerWidth,
    gripSize,
    showLabels,
    labelPosition,
    labelFontSize,
  } = attributes;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId, setAttributes]);

  // bpl-tools picker: same { id, url, alt } shape as before, and it accepts a
  // pasted URL as well as a library pick.
  const pickButton = (label, value, key) => (
    <InlineDetailMediaUpload
      label={label}
      value={value}
      onChange={(val) => setAttributes({ [key]: val })}
    />
  );

  return (
    <>
      <InspectorControls>
        <BlockSwitcher clientId={clientId} />
        <ColorsPanel attributes={attributes} setAttributes={setAttributes} />
        <SizeSpacingPanel attributes={attributes} setAttributes={setAttributes} />
        <PanelBody className="bPlPanelBody" title={__("Images", "b-testimonials-block")}>
          {pickButton(
            __("before image", "b-testimonials-block"),
            beforeImg,
            "beforeImg",
          )}
          {pickButton(
            __("after image", "b-testimonials-block"),
            afterImg,
            "afterImg",
          )}

          {/* Two images of different proportions cannot line up along the
              divider while each keeps its own height, so a fixed ratio is the
              fix for the most common complaint here. */}
          <SelectControl
            label={__("Aspect ratio", "b-testimonials-block")}
            value={aspectRatio}
            options={RATIO_OPTIONS}
            onChange={(v) => setAttributes({ aspectRatio: v })}
            help={__(
              "A fixed ratio crops both images to the same box.",
              "b-testimonials-block",
            )}
          />

          <UnitControl
            className="mt20"
            label={__("Corner radius:", "b-testimonials-block")}
            labelPosition="left"
            value={mediaRadius}
            onChange={(v) => setAttributes({ mediaRadius: v })}
            units={[pxUnit(8), perUnit(2), emUnit(1)]}
            isResetValueOnUnitChange={true}
          />
        </PanelBody>

        <PanelBody
          className="bPlPanelBody"
          title={__("Slider", "b-testimonials-block")}
          initialOpen={false}>
          <SelectControl
            label={__("Orientation", "b-testimonials-block")}
            value={orientation}
            options={[
              {
                label: __("Horizontal", "b-testimonials-block"),
                value: "horizontal",
              },
              {
                label: __("Vertical", "b-testimonials-block"),
                value: "vertical",
              },
            ]}
            onChange={(v) => setAttributes({ orientation: v })}
          />

          <SelectControl
            label={__("Reveal on", "b-testimonials-block")}
            value={interaction}
            options={[
              { label: __("Drag", "b-testimonials-block"), value: "drag" },
              { label: __("Hover", "b-testimonials-block"), value: "hover" },
            ]}
            onChange={(v) => setAttributes({ interaction: v })}
            help={__(
              "Hover still drags on touch devices, which have no hover.",
              "b-testimonials-block",
            )}
          />

          <RangeControl
            label={__("Start position (%)", "b-testimonials-block")}
            value={startPosition}
            onChange={(v) => setAttributes({ startPosition: v })}
            min={0}
            max={100}
          />

          <RangeControl
            label={__("Divider width (px)", "b-testimonials-block")}
            value={dividerWidth}
            onChange={(v) => setAttributes({ dividerWidth: v })}
            min={0}
            max={20}
          />

          <RangeControl
            label={__("Handle size (px)", "b-testimonials-block")}
            value={gripSize}
            onChange={(v) => setAttributes({ gripSize: v })}
            min={0}
            max={90}
          />

          <ColorControl
            label={__("Handle color", "b-testimonials-block")}
            value={accentColor}
            onChange={(v) => setAttributes({ accentColor: v })}
          />
        </PanelBody>

        <PanelBody
          className="bPlPanelBody"
          title={__("Labels", "b-testimonials-block")}
          initialOpen={false}>
          <ToggleControl
            label={__("Show labels", "b-testimonials-block")}
            checked={showLabels}
            onChange={(v) => setAttributes({ showLabels: v })}
          />

          {showLabels && (
            <>
              <TextControl
                label={__("Before label", "b-testimonials-block")}
                value={beforeLabel}
                onChange={(v) => setAttributes({ beforeLabel: v })}
              />
              <TextControl
                label={__("After label", "b-testimonials-block")}
                value={afterLabel}
                onChange={(v) => setAttributes({ afterLabel: v })}
              />
              <SelectControl
                label={__("Position", "b-testimonials-block")}
                value={labelPosition}
                options={[
                  { label: __("Bottom", "b-testimonials-block"), value: "bottom" },
                  { label: __("Top", "b-testimonials-block"), value: "top" },
                ]}
                onChange={(v) => setAttributes({ labelPosition: v })}
              />
              <RangeControl
                label={__("Font size (px)", "b-testimonials-block")}
                value={labelFontSize}
                onChange={(v) => setAttributes({ labelFontSize: v })}
                min={8}
                max={40}
              />
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <div { ...useBlockProps() } id={ `btbTestimonialsDir-${ clientId }` }>
        <Style attributes={attributes} clientId={clientId} />
        {beforeImg?.url || afterImg?.url ? (
          <BeforeAfterSlider attributes={attributes} />
        ) : (
          <p className="ba-empty">
            {__(
              "Select a before and after image in the block settings.",
              "b-testimonials-block",
            )}
          </p>
        )}
      </div>
    </>
  );
};

export default Edit;
