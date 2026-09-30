import { useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import {
  PanelBody,
  RangeControl,
  TextControl,
  PanelRow,
  __experimentalUnitControl as UnitControl,
} from "@wordpress/components";
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
import TrustBadgePanel from "../../shared/Components/Backend/Settings/TrustBadgePanel";
import Style from "../../shared/Components/Common/Style";
import IconSettings from "../../shared/Components/Backend/Settings/IconSettings";
import BlockIcon from "../../shared/Components/Common/BlockIcon";
import { getIcon } from "../../shared/utils/blockIcons";
import { getTrustBadgeArt } from "../../shared/utils/trustBadgeArt";

import "./edit.scss";
import "../../shared/styles/trust-badges.scss";

const COLUMN_MAX = { desktop: 6, tablet: 4, mobile: 2 };

const gridVars = ({ columns, columnGap, rowGap }) => ({
  "--cols-d": columns?.desktop || 3,
  "--cols-t": columns?.tablet || 3,
  "--cols-m": columns?.mobile || 1,
  "--col-gap": columnGap,
  "--row-gap": rowGap,
});

const Edit = ({ attributes, setAttributes, clientId }) => {
  const {
    items = [],
    columns,
    columnGap,
    rowGap,
    badgeIconSize,
    badgeIconPosition = "left",
  } = attributes;

  // The icon size reaches a picked icon through BlockIcon's own prop rather
  // than through CSS: BlockIcon writes width and height inline, which no
  // selector can outrank. `lockSize` below is what makes this the one that
  // lands: BlockIcon otherwise prefers the slot's own size, and on this block
  // alone the Icons panel offers none, so an old saved value would override a
  // control it can no longer be cleared from.
  const iconBox = badgeIconSize || 32;

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
                  onChange={(v) => setColumn(device, v)}
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
                  onChange={(v) => setAttributes({ columnGap: v })}
                  units={[pxUnit(30), perUnit(3), emUnit(2)]}
                  isResetValueOnUnitChange={true}
                />
                <UnitControl
                  className="mt20"
                  label={__("Row Gap:", "b-testimonials-block")}
                  labelPosition="left"
                  value={rowGap}
                  onChange={(v) => setAttributes({ rowGap: v })}
                  units={[pxUnit(40), perUnit(3), emUnit(2.5)]}
                  isResetValueOnUnitChange={true}
                />
              </PanelBody>

              <PanelBody
                className="bPlPanelBody"
                title={__("Badges", "b-testimonials-block")}
                initialOpen={false}>
                {/* One badge at a time, matching the testimonial card editor. */}
                <ItemCards
                  items={items}
                  onChange={(next) => setAttributes({ items: next })}
                  newItem={{ img: { url: "" }, title: "", subtitle: "" }}
                  itemLabel={__("Badge", "b-testimonials-block")}
                  addLabel={__("Add New Badge", "b-testimonials-block")}>
                  {(item, i, update) => (
                    <>
                      <InlineDetailMediaUpload
                        label={__("Icon", "b-testimonials-block")}
                        value={item?.img}
                        onChange={(val) => update("img", val)}
                      />
                      <TextControl
                        label={__("Title", "b-testimonials-block")}
                        value={item?.title || ""}
                        onChange={(v) => update("title", v)}
                      />
                      <TextControl
                        label={__("Subtitle", "b-testimonials-block")}
                        value={item?.subtitle || ""}
                        onChange={(v) => update("subtitle", v)}
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
              <TrustBadgePanel
                attributes={attributes}
                setAttributes={setAttributes}
              />
            </>
          }
        />
      </InspectorControls>

      <div
        {...useBlockProps({ className: "bTrustBadges" })}
        id={`btbTestimonialsDir-${clientId}`}>
        <Style attributes={attributes} clientId={clientId} />
        <div
          className="badges-grid"
          style={{
            ...gridVars(attributes),
            "--cols-d": colsForDevice(attributes.columns, previewDevice, 3),
          }}>
          {items.map((item, i) => (
            <div
              className={`badge-item${
                "top" === badgeIconPosition ? " is-icon-top" : ""
              }`}
              key={i}>
              {/* Falls back to the Icons panel, as the front end does, so a
							    badge with no image of its own still shows its icon here.

							    The built-in drawing and its colour come from the shared
							    list for the same reason. This preview used to draw the
							    shield for every badge in the brand colour, so a block
							    that published as a shield, a tick and an amber star was
							    three identical blue shields while you were editing it. */}
              {item?.img?.url ? (
                <img
                  className="badge-icon"
                  src={item.img.url}
                  alt={item?.img?.alt || ""}
                />
              ) : (
                <BlockIcon
                  icon={getIcon(attributes, `trust${i}`)}
                  size={iconBox}
                  lockSize
                  defaultColor={getTrustBadgeArt(i).color}
                  renderFallback={(color) => (
                    <svg
                      className="badge-icon"
                      viewBox="0 0 24 24"
                      width={iconBox}
                      height={iconBox}>
                      <path fill={color} d={getTrustBadgeArt(i).d} />
                    </svg>
                  )}
                />
              )}
              <div className="badge-text">
                {item?.title && <h4 className="badge-title">{item.title}</h4>}
                {item?.subtitle && (
                  <p className="badge-subtitle">{item.subtitle}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Edit;
