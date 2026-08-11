import { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  TextControl,
  Button,
} from "@wordpress/components";
import BlockSwitcher from "../../shared/Components/Common/BlockSwitcher";
import ColorsPanel from "../../shared/Components/Backend/Settings/ColorsPanel";
import Style from "../../shared/Components/Common/Style";
import { ColorControl } from "../../../../bpl-tools/Components/ColorControl/ColorControl";

import BeforeAfterSlider from "../../shared/Components/Common/BeforeAfterSlider";
import "../../shared/styles/before-after.scss";

const Edit = ({ attributes, setAttributes, clientId }) => {
  const {
    beforeImg,
    afterImg,
    beforeLabel,
    afterLabel,
    startPosition,
    accentColor,
  } = attributes;

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId, setAttributes]);

  const pickButton = (label, value, key) => (
    <MediaUploadCheck>
      <MediaUpload
        allowedTypes={["image"]}
        value={value}
        onSelect={(m) =>
          setAttributes({ [key]: { id: m.id, url: m.url, alt: m.alt } })
        }
        render={({ open }) => (
          <Button variant="secondary" onClick={open}>
            {value?.url
              ? `${__("Change", "b-testimonials-block")} ${label}`
              : `${__("Set", "b-testimonials-block")} ${label}`}
          </Button>
        )}
      />
    </MediaUploadCheck>
  );

  return (
    <>
      <InspectorControls>
        <BlockSwitcher clientId={clientId} />
        <ColorsPanel attributes={attributes} setAttributes={setAttributes} />
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
          <RangeControl
            label={__("Start position (%)", "b-testimonials-block")}
            value={startPosition}
            onChange={(v) => setAttributes({ startPosition: v })}
            min={0}
            max={100}
          />
        </PanelBody>

        <PanelBody className="bPlPanelBody" title={__("Color", "b-testimonials-block")} initialOpen={false}>
          <ColorControl
            label={__("Handle color", "b-testimonials-block")}
            value={accentColor}
            onChange={(v) => setAttributes({ accentColor: v })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps({ id: `btbTestimonialsDir-${clientId}` })}>
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
