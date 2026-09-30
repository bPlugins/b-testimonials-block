import { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import {
  useBlockProps,
  InspectorControls,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  Button,
  PanelBody,
  RangeControl,
  TextControl,
  ToggleControl,
  PanelRow,
  SandBox,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
import { produce } from "immer";
import BlockSwitcher from "../../shared/Components/Common/BlockSwitcher";
import SettingsTabs from "../../shared/Components/Backend/Settings/SettingsTabs";
import ItemCards from "../../shared/Components/Backend/Settings/ItemCards";
import { InlineDetailMediaUpload } from "../../../../bpl-tools/Components/MediaControl/MediaControl";
import usePreviewDevice, {
  colsForDevice,
  useDeviceKey,
} from "../../shared/utils/usePreviewDevice";
import Label from "../../../../bpl-tools/Components/Label/Label";
import Device from "../../../../bpl-tools/Components/Device/Device";
import { emUnit, perUnit, pxUnit } from "../../../../bpl-tools/utils/options";
import ColorsPanel from "../../shared/Components/Backend/Settings/ColorsPanel";
import SizeSpacingPanel from "../../shared/Components/Backend/Settings/SizeSpacingPanel";
import Style from "../../shared/Components/Common/Style";
import Typography from "../../../../bpl-tools/Components/Typography/Typography";
import VideoCard from "../../shared/Components/Common/VideoCard";
import { ColorControl } from "../../../../bpl-tools/Components/ColorControl/ColorControl";
import IconSettings from "../../shared/Components/Backend/Settings/IconSettings";
import { getIcon } from "../../shared/utils/blockIcons";

import "./edit.scss";
import "../../shared/styles/video.scss";

const COLUMN_MAX = { desktop: 5, tablet: 4, mobile: 2 };

const gridVars = ({ columns, columnGap, rowGap, accentColor }) => ({
  "--cols-d": columns?.desktop || 3,
  "--cols-t": columns?.tablet || 2,
  "--cols-m": columns?.mobile || 1,
  "--col-gap": columnGap,
  "--row-gap": rowGap,
  "--accent": accentColor,
});

const Edit = ({ attributes, setAttributes, clientId }) => {
  const {
    items = [],
    columns,
    columnGap,
    rowGap,
    accentColor,
    nameTypo,
    nameColor,
    degTypo,
    degColor,
    videoAutoplay,
    videoLoop,
    videoMuted,
    videoControls,
  } = attributes;

  // The device switch below is the editor's own preview device, so picking a
  // device there resizes the canvas and every other panel follows it. It used
  // to be local state, which let the switch say Tablet while the canvas stayed
  // on Desktop -- so the control edited a value the preview was not showing.
  //
  // That preview only becomes a real viewport when the canvas is iframed, which
  // one apiVersion 2 block anywhere on the site disables, which is why
  // colsForDevice below still resolves the column count by hand.
  const device = useDeviceKey();
  const previewDevice = usePreviewDevice();

  useEffect(() => {
    clientId && setAttributes({ cId: clientId.substring(0, 10) });
  }, [clientId, setAttributes]);

  const setColumn = (device, val) =>
    setAttributes({ columns: { ...columns, [device]: val } });

  return (
    <>
      <InspectorControls>
        <SettingsTabs
          general={
            <>
              <BlockSwitcher clientId={clientId} />
              <IconSettings
                attributes={attributes}
                setAttributes={setAttributes}
              />
              <PanelBody
                className="bPlPanelBody"
                title={__("Layout", "b-testimonials-block")}>
                {/* One responsive control behind the bpl-tools device switch, as the
      					    shared Settings panel does, instead of three stacked ranges. */}
                <PanelRow>
                  <Label mt="0">{__("Device:", "b-testimonials-block")}</Label>
                  <Device className="" />
                </PanelRow>
                <RangeControl
                  label={__("Columns:", "b-testimonials-block")}
                  value={columns?.[device]}
                  onChange={(val) => setColumn(device, val)}
                  min={1}
                  max={COLUMN_MAX[device]}
                  step={1}
                  beforeIcon="grid-view"
                />
                <UnitControl
                  className="mt20"
                  label={__("Column Gap:", "b-testimonials-block")}
                  labelPosition="left"
                  value={columnGap}
                  onChange={(val) => setAttributes({ columnGap: val })}
                  units={[pxUnit(30), perUnit(3), emUnit(2)]}
                  isResetValueOnUnitChange={true}
                />
                <UnitControl
                  className="mt20"
                  label={__("Row Gap:", "b-testimonials-block")}
                  labelPosition="left"
                  value={rowGap}
                  onChange={(val) => setAttributes({ rowGap: val })}
                  units={[pxUnit(40), perUnit(3), emUnit(2.5)]}
                  isResetValueOnUnitChange={true}
                />
              </PanelBody>
              <PanelBody
                className="bPlPanelBody"
                title={__("Playback", "b-testimonials-block")}
                initialOpen={false}>
                <ToggleControl
                  label={__("Autoplay on click", "b-testimonials-block")}
                  help={__(
                    "Start the video as soon as the poster is clicked.",
                    "b-testimonials-block"
                  )}
                  checked={videoAutoplay}
                  onChange={(val) => setAttributes({ videoAutoplay: val })}
                />
                <ToggleControl
                  label={__("Loop", "b-testimonials-block")}
                  checked={videoLoop}
                  onChange={(val) => setAttributes({ videoLoop: val })}
                />
                <ToggleControl
                  label={__("Muted", "b-testimonials-block")}
                  checked={videoMuted}
                  onChange={(val) => setAttributes({ videoMuted: val })}
                />
                <ToggleControl
                  label={__("Show controls", "b-testimonials-block")}
                  checked={videoControls}
                  onChange={(val) => setAttributes({ videoControls: val })}
                />
              </PanelBody>
              <PanelBody
                className="bPlPanelBody"
                title={__("Videos", "b-testimonials-block")}
                initialOpen={false}>
                {/* One video at a time, chosen from the chips -- the same editor
                    the testimonial cards have. Every item used to be expanded at
                    once, which at four videos ran past a screen of sidebar. */}
                <ItemCards
                  items={items}
                  onChange={(next) => setAttributes({ items: next })}
                  newItem={{
                    videoUrl: "",
                    poster: { url: "" },
                    name: "",
                    deg: "",
                    company: "",
                  }}
                  itemLabel={__("Video", "b-testimonials-block")}
                  addLabel={__("Add New Video", "b-testimonials-block")}>
                  {(item, index, update) => (
                    <>
                      {/*
                        A plain TextControl until now, on the reading that the
                        field is for YouTube and Vimeo links, where the media
                        library has nothing to offer. It also takes an .mp4,
                        though, and a self-hosted one lives in the library --
                        so the only way to use your own file was to open the
                        library in another tab and copy the URL across.

                        Laid out as InlineDetailMediaUpload does it (its Label +
                        .bPlInlineMediaUpload row), so this matches the Poster
                        image field below rather than resembling it. Not that
                        component itself: it hands back the whole attachment
                        object, and videoUrl is a plain string that render.php and
                        every already-saved block read as one. Writing only
                        media.url keeps that shape, so no deprecation is needed
                        and existing content is untouched.
                      */}
                      <Label className="mb5">
                        {__("Video URL", "b-testimonials-block")}
                      </Label>
                      <PanelRow className="bPlInlineMediaUpload">
                        <TextControl
                          placeholder="YouTube / Vimeo / .mp4"
                          value={item?.videoUrl || ""}
                          onChange={(val) => update("videoUrl", val)}
                        />

                        <MediaUploadCheck>
                          <MediaUpload
                            allowedTypes={["video"]}
                            onSelect={({ url }) => update("videoUrl", url)}
                            render={({ open }) => (
                              <Button
                                className="button button-primary"
                                icon="upload"
                                onClick={open}
                                /* Icon-only, so it needs a name of its own --
                                   the Label above belongs to the text field. */
                                label={__(
                                  "Choose a video from the media library",
                                  "b-testimonials-block"
                                )}
                                showTooltip
                              />
                            )}
                          />
                        </MediaUploadCheck>
                      </PanelRow>
                      <InlineDetailMediaUpload
                        label={__("Poster image", "b-testimonials-block")}
                        value={item?.poster}
                        onChange={(val) => update("poster", val)}
                      />
                      <TextControl
                        label={__("Video Name", "b-testimonials-block")}
                        value={item?.name || ""}
                        onChange={(val) => update("name", val)}
                      />
                      <TextControl
                        label={__("Video Designation", "b-testimonials-block")}
                        value={item?.deg || ""}
                        onChange={(val) => update("deg", val)}
                      />
                      <TextControl
                        label={__("Company", "b-testimonials-block")}
                        value={item?.company || ""}
                        onChange={(val) => update("company", val)}
                      />
                    </>
                  )}
                </ItemCards>
              </PanelBody>
            </>
          }
          style={
            <>
              <ColorsPanel
                attributes={attributes}
                setAttributes={setAttributes}
              />
              <SizeSpacingPanel
                attributes={attributes}
                setAttributes={setAttributes}
              />
              <PanelBody
                className="bPlPanelBody"
                title={__("Video Colors", "b-testimonials-block")}
                initialOpen={false}>
                <ColorControl
                  label={__("Play button", "b-testimonials-block")}
                  value={accentColor}
                  onChange={(val) => setAttributes({ accentColor: val })}
                />
              </PanelBody>
              {/* The caption under each video. Style.js now names
      				     `.video-item .name` and `.video-item .deg`, but this block
      				     renders its own editor, so nothing offered the controls --
      				     the stylesheet's 17px and 14px were the only values a user
      				     could ever get. Defaults match those, so an untouched block
      				     is unchanged. */}
              <PanelBody
                className="bPlPanelBody"
                title={__("Video Name", "b-testimonials-block")}
                initialOpen={false}>
                <Typography
                  className="mt10"
                  label={__("Typography", "b-testimonials-block")}
                  value={nameTypo}
                  onChange={(val) => setAttributes({ nameTypo: val })}
                  produce={produce}
                />
                <ColorControl
                  className="mb10"
                  label={__("Video Colors", "b-testimonials-block")}
                  value={nameColor}
                  onChange={(val) => setAttributes({ nameColor: val })}
                />
              </PanelBody>
              <PanelBody
                className="bPlPanelBody"
                title={__("Video Designation", "b-testimonials-block")}
                initialOpen={false}>
                <Typography
                  className="mt10"
                  label={__("Typography", "b-testimonials-block")}
                  value={degTypo}
                  onChange={(val) => setAttributes({ degTypo: val })}
                  produce={produce}
                />
                <ColorControl
                  className="mb10"
                  label={__("Video Colors", "b-testimonials-block")}
                  value={degColor}
                  onChange={(val) => setAttributes({ degColor: val })}
                />
              </PanelBody>
            </>
          }
        />
      </InspectorControls>

      <div
        {...useBlockProps({ className: "bVideoTestimonials" })}
        id={`btbTestimonialsDir-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <div
          className="videos-grid"
          style={{
            ...gridVars(attributes),
            "--cols-d": colsForDevice(attributes.columns, previewDevice, 3),
          }}>
          {/* The same component the front end renders. This was a
					     hand-written copy of the markup with no state and no click
					     handler, so the play button did nothing while editing --
					     there was no way to check a video URL without previewing
					     the page.

					     SandBox is passed here and from the shared Edit, never on
					     the front end: the editor canvas is a `blob:` document
					     that sends no Referer, which YouTube answers with Error
					     153 and no player. See VideoCard.js. */}
          {items.map((item, index) => (
            <VideoCard
              key={index}
              item={item}
              accentColor={accentColor}
              playIcon={getIcon(attributes, "play")}
              autoplay={videoAutoplay}
              loop={videoLoop}
              muted={videoMuted}
              controls={videoControls}
              SandBox={SandBox}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Edit;
