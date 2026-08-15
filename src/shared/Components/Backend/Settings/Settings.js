import { __ } from "@wordpress/i18n";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";
import {
  PanelBody,
  PanelRow,
  TabPanel,
  TextControl,
  SelectControl,
  RangeControl,
  __experimentalUnitControl as UnitControl,
  __experimentalNumberControl as NumberControl,
  Button,
  Dashicon,
  ToolbarGroup,
  ToolbarButton,
  TextareaControl,
  __experimentalBoxControl as BoxControl,
  ToggleControl,
} from "@wordpress/components";
import { produce } from "immer";

// Settings Components
import IconSettings from "./IconSettings";
import ColorsPanel from "./ColorsPanel";
import SizeSpacingPanel from "./SizeSpacingPanel";
import Label from "../../../../../../bpl-tools/Components/Label/Label";
import { ColorControl } from "../../../../../../bpl-tools/Components/ColorControl/ColorControl";
import { InlineDetailMediaUpload } from "../../../../../../bpl-tools/Components/MediaControl/MediaControl";
import Typography from "../../../../../../bpl-tools/Components/Typography/Typography";
import Device from "../../../../../../bpl-tools/Components/Device/Device";
import BorderControl from "../../../../../../bpl-tools/Components/Deprecated/BorderControl/BorderControl";
import ShadowControl from "../../../../../../bpl-tools/Components/Deprecated/ShadowControl/ShadowControl";

import { gearIcon } from "../../../../../../bpl-tools/utils/icons";
import { tabController } from "../../../../../../bpl-tools/utils/functions";
import {
  emUnit,
  perUnit,
  pxUnit,
} from "../../../../../../bpl-tools/utils/options";

import { checkTheme } from "../../.././utils/functions";
import { useDeviceKey } from "../../../utils/usePreviewDevice";
import {
  rendersReviewText,
  resolveArrangement,
  supportsArrangement,
} from "../../../utils/layoutFeatures";
import { getLayoutControls } from "../../../utils/layoutControls";
import { getVisualControls } from "../../../utils/visualControls";
import { boxForDevice, setBoxForDevice } from "../../../utils/responsiveBox";
import {
  arrangementOpt,
  generalStyleTabs,
  themeOpt,
} from "./../../../utils/options";
import BlockSwitcher from "../../Common/BlockSwitcher";

const Settings = ({
  attributes = {},
  setAttributes,
  updateItem,
  activeIndex,
  setActiveIndex,
  clientId,
  currentBlockName,
}) => {
  const {
    columns = { desktop: 3, tablet: 2, mobile: 1 },
    columnGap = "30px",
    rowGap = "40px",
    // Block Width, Card Height, Block Margin and Card Margin are read by
    // SizeSpacingPanel rather than here -- see the panel it renders below.
    degDivider = {},
    marquee = {},
    pauseInEditor = false,
    layout = "default",
    theme = "default",
    items = [],
    elements: rawElements = {},
    background = "#0000",
    padding = { top: "10px", right: "15px", bottom: "10px", left: "15px" },
    shadow = {},
    border = {
      width: "1px",
      style: "solid",
      color: "#0575e6",
      side: "all",
      radius: "3px",
    },
    image = { width: 50, height: 50 },
    imgBorder = {
      width: "1px",
      style: "solid",
      color: "#0575e6",
      side: "all",
      radius: "50%",
    },
    nameTypo = {},
    nameColor = "#000",
    degTypo = {},
    degColor = "#7B7B7B",
    textTypo = {},
    textColor = "#000",
    expandedTypo = {},
    expandColor = "",
    expandHoverColor = "",
    starIconColor = "#FF8C02",
    textLength = 120,
    grid2Bg = "#f9f8f8",
    grid2Padding = {},
    grid2Border = {},
    slider = {
      height: 500,
      autoPlay: true,
      mouseWheel: true,
      navigation: true,
    },
    dataSource = "manual",
    query = {},
  } = attributes || {};

  const elements = {
    img: true,
    name: true,
    deg: true,
    reviewText: true,
    icon: true,
    ...(rawElements || {}),
  };

  // The editor's own preview device, not a switch of our own. Every device
  // switch in the sidebar reads it, so they all agree with each other and with
  // the canvas -- the local `useState` this replaces let a panel say Tablet
  // while the preview stayed on Desktop, which meant the control was editing a
  // value the canvas was not showing.
  const device = useDeviceKey();
  const {
    speed: marqueeSpeed = 30,
    direction: marqueeDirection = "left",
    pauseOnHover: marqueePauseOnHover = true,
  } = marquee && "object" === typeof marquee ? marquee : {};

  const {
    autoPlay = true,
    autoPlayDelay = 3,
    mouseWheel = true,
    navigation = true,
    // Undefined until touched, so each arrangement keeps its own preset.
    coverRotate,
    coverDepth,
    coverScale,
    visibleSides = 1,
    cardWidth = "",
    // Arrow styling. Left undefined on purpose so Style.js emits nothing and
    // Swiper's own defaults stand until the user actually picks something.
    navSize,
    navOffset,
    navColor,
    navHoverColor,
    navBg,
    navHoverBg,
    navBorder,
  } = slider && typeof slider === "object" ? slider : {};

  const singleItemBlocks = [
    "verified-buyer-badge",
    "trust-badges",
    "testimonial-form",
    "user-feedback-poll",
    "google-review-badge",
    "capterra-review-badge",
    "facebook-review-badge",
    "trustpilot-review-badge",
    "g2-review-badge",
    "review-badge-widget",
    "rating-summary",
    "star-rating-bars",
    "before-after",
    "testimonial-stats",
    "comparison-testimonial-table",
    "faq-testimonial-accordion",
    "testimonials-card-stack",
  ];
  const isSingleTestimonial =
    layout === "single" || layout === "testimonials-single";
  const isSingleItemBlock =
    singleItemBlocks.includes(layout) || isSingleTestimonial;
  const isCaseStudy = layout === "case-study-card";
  // The only layout that plays a per-card media file, so the upload below is
  // scoped to it rather than added to every testimonial card.
  const isAudio = layout === "audio-testimonials";

  // Whether this block's card list can be rearranged, and which arrangement is
  // currently in effect (falling back to `layout` for posts saved before the
  // attribute existed).
  const canArrange = supportsArrangement(layout);
  const arrangement = resolveArrangement(attributes);
  const isSliderArrangement = ["slider", "slider-3d", "coverflow"].includes(
    arrangement,
  );
  // The two that run Swiper's coverflow engine and so have 3D numbers to tune.
  const is3DArrangement = ["slider-3d", "coverflow"].includes(arrangement);

  // The excerpt cut and the Expand/Less toggle belong to the review text, so
  // they follow whether the layout prints it -- not how many items it shows.
  const hasExcerpt =
    rendersReviewText(layout) && elements?.reviewText !== false;

  // Which of the shared panels this layout can actually act on. Everything
  // below reads this instead of asking `isSingleItemBlock` how many
  // testimonials the layout shows, which was never the same question -- see
  // utils/layoutControls.js for what each flag is derived from.
  // Attributes are passed so a control whose target depends on the item count
  // can be hidden while there is nothing for it to act on -- the hero's Columns
  // before a third testimonial exists. See utils/layoutControls.js.
  const controls = getLayoutControls(layout, attributes);

  // The Card panel's Background and Border, and the Colors panel's Card Surface
  // and Border Color, were two controls over one pixel.
  //
  // Style.js emits the Card values as the fallback inside `var(--btb-surface,
  // ...)` and `var(--btb-border, ...)`, so whenever the palette role was set the
  // Card control silently stopped doing anything. Measured across the 22 blocks
  // that offer both: on 14 the two land on the exact same element, and on the
  // rest the palette reaches that element and more (the avatar list's thumb
  // ring, the card stack's nav buttons, the poll's number buttons). So there was
  // never a pixel only the Card control could reach -- just a second control
  // that lost.
  //
  // Rather than hide one, they write the same value. The Card control reads the
  // palette role where the layout has one, so it always shows what is on screen,
  // and writes both, so editing from either panel moves the same pixel and the
  // two can never disagree. Where a layout offers no palette role for a
  // property -- the hero, popup modal and timeline have no Card Surface, the
  // quote box no Border Color -- the Card control keeps it to itself as before.
  //
  // Border style, side and radius have no palette role at all and stay purely
  // the Card panel's.
  const paletteRoles = getVisualControls(layout, attributes).map((c) => c.attr);
  const ownsSurface = paletteRoles.includes("surfaceColor");
  const ownsBorderColor = paletteRoles.includes("borderColor");
  const ownsBorderWidth = paletteRoles.includes("borderWidth");

  // Cleared from the Colors panel means unset, not "transparent": getPaletteCSS
  // skips an empty value, so the Card value is what paints again and is what
  // this control has to show.
  const isSet = (v) => undefined !== v && null !== v && "" !== v;

  const cardBackgroundValue =
    ownsSurface && isSet(attributes.surfaceColor)
      ? attributes.surfaceColor
      : background;

  const setCardBackground = (val) =>
    setAttributes(
      ownsSurface ? { background: val, surfaceColor: val } : { background: val },
    );

  const cardBorderValue = {
    ...border,
    ...(ownsBorderColor && isSet(attributes.borderColor)
      ? { color: attributes.borderColor }
      : {}),
    ...(ownsBorderWidth && isSet(attributes.borderWidth)
      ? { width: `${attributes.borderWidth}px` }
      : {}),
  };

  const setCardBorder = (val) => {
    const next = { border: val };

    if (ownsBorderColor) {
      next.borderColor = val?.color;
    }
    if (ownsBorderWidth) {
      // The palette stores a bare number of pixels; the Border control a CSS
      // length. An unparseable unit (em, %) leaves the palette alone rather than
      // writing NaN, and the Card value still applies through the var fallback.
      const px = parseInt(val?.width, 10);
      if (Number.isFinite(px)) {
        next.borderWidth = px;
      }
    }

    setAttributes(next);
  };

  // Whether a card part is rendered, for the style panel that goes with it.
  // A part switched off in the Elements panel needs no typography -- but only
  // where that toggle is honoured, otherwise the part is always on the page.
  const rendersPart = (part) =>
    !controls.elements.includes(part) || false !== elements?.[part];

  // The Review Text panel holds the rating colour too, and the two do not
  // always travel together: the timeline, hero and card stack draw their stars
  // inline (so the colour applies) while their review text is styled by the
  // stylesheet (so the typography does not reach it).
  const hasTextStyle = controls.textStyle && rendersPart("reviewText");
  // Of the seven card themes only Theme 4 renders no rating icon, so on that one
  // both the Elements toggle and the star colour have nothing to act on. Checked
  // across all seven components rather than assumed.
  const themeHasRating = "theme_4" !== theme;

  const hasRatingColor =
    controls.ratingIcon && rendersPart("icon") && themeHasRating;

  // Which of the Layout panel's three grid controls the current arrangement can
  // actually act on. The arrangement decides this, not the block: the same card
  // list becomes a grid, a single column, a scrolling row or a Swiper track, and
  // each of those reads a different thing.
  //
  // Every entry below was measured on the block at two column counts and two gap
  // values, not read off the source:
  //
  //   Columns    grid 595px -> 220px, masonry 2 tracks -> 5. Both keep it.
  //              list stayed 1220px (one flex column), marquee stayed 320px
  //              (`display: block`, so the `columns-N` class computes a
  //              `grid-template-columns` nothing reads), and 3D and coverflow
  //              take their slide count from Visible Side Cards / Card Width --
  //              Slider.js sets `isCoverflow` for both, which routes around
  //              `columns` entirely.
  //
  //   Column Gap marquee works through the inline `margin-right` Marquee.js puts
  //              on each item: item pitch 350px -> 440px at 120px. The plain
  //              slider passes it to Swiper's `spaceBetween`. list cannot use it
  //              -- `column-gap` on a single-column flex has no second column to
  //              separate, measured unchanged at 250px -- and Slider.js forces
  //              `spaceBetween: 0` for 3D and coverflow, so the rotation has no
  //              gap to work around.
  //
  //   Row Gap    list works (card pitch 178px -> 338px at 200px). The marquee has
  //              exactly one row, and a Swiper track one line of slides.
  const COLUMNS_INERT = ["list", "marquee", "slider-3d", "coverflow"];
  const COLUMN_GAP_INERT = ["list", "slider-3d", "coverflow"];
  const ROW_GAP_INERT = ["marquee", "slider", "slider-3d", "coverflow"];

  const showColumns = controls.columns && !COLUMNS_INERT.includes(arrangement);
  const showColumnGap = controls.gaps && !COLUMN_GAP_INERT.includes(arrangement);
  const showRowGap = controls.gaps && !ROW_GAP_INERT.includes(arrangement);

  // The Layout panel is empty unless at least one of its four controls applies.
  // The three grid controls are counted as what the arrangement can actually
  // use, so a layout left with none of them and no Arrangement or Theme select
  // gets no empty panel.
  const hasLayoutPanel =
    canArrange ||
    controls.theme ||
    showColumns ||
    showColumnGap ||
    showRowGap;

  const addItem = () => {
    setAttributes({
      items: [
        ...items,
        {
          img: {
            url: "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png",
          },
          name: "John Doe",
          deg: "Developer",
          reviewText:
            "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout",
          rating: 4,
        },
      ],
    });
    setActiveIndex(items.length);
  };

  const duplicateItem = (e) => {
    e.preventDefault();
    setAttributes({
      items: [
        ...items.slice(0, activeIndex),
        { ...items[activeIndex] },
        ...items.slice(activeIndex),
      ],
    });
    setActiveIndex(activeIndex + 1);
  };

  const removeItem = (e) => {
    e.preventDefault();
    setAttributes({
      items: [...items.slice(0, activeIndex), ...items.slice(activeIndex + 1)],
    });
    setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
  };

  // update object
  const updateObject = (attr, key, val) => {
    const newAttr = { ...attributes[attr] };
    newAttr[key] = val;
    setAttributes({ [attr]: newAttr });
  };

  // Avatar size, per device.
  //
  // `image.width` / `image.height` used to be single numbers, and every block
  // saved so far still holds them that way. Reading accepts either shape and
  // writing upgrades to `{ desktop, tablet, mobile }`, carrying the old number
  // over as the desktop value so nothing shifts on an existing block.
  //
  // Tablet and mobile show the size they inherit when empty, so the field is
  // never blank while the avatar plainly has a size on screen -- but the
  // inherited value is only shown, not stored, and editing tablet leaves mobile
  // following it.
  const imageSize = (key, forDevice) => {
    const value = image?.[key];
    const perDevice = value && "object" === typeof value ? value : { desktop: value };

    if ("mobile" === forDevice) {
      return perDevice.mobile ?? perDevice.tablet ?? perDevice.desktop;
    }
    if ("tablet" === forDevice) {
      return perDevice.tablet ?? perDevice.desktop;
    }
    return perDevice.desktop;
  };

  const setImageSize = (key, val) => {
    const value = image?.[key];
    const perDevice =
      value && "object" === typeof value ? { ...value } : { desktop: value };

    perDevice[device] = val;
    updateObject("image", key, perDevice);
  };
  const currentItem = items[activeIndex] || items[0] || {};
  const {
    img = {},
    name = "",
    reviewText = "",
    deg = "",
    rating = 5,
  } = currentItem;

  return (
    <>
      <InspectorControls>
        <TabPanel
          className="bPlTabPanel"
          activeClass="activeTab"
          tabs={generalStyleTabs}
          onSelect={tabController}>
          {(tab) => (
            <>
              {"general" === tab.name && (
                <>
                  <BlockSwitcher
                    clientId={clientId}
                    currentBlockName={currentBlockName}
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />

                  {(!isSingleItemBlock || isSingleTestimonial) && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Content Source", "b-testimonials-block")}>
                      <SelectControl
                        label={__("Source", "b-testimonials-block")}
                        value={dataSource}
                        options={[
                          {
                            label: __("Manual", "b-testimonials-block"),
                            value: "manual",
                          },
                          {
                            label: __(
                              "Testimonials (CPT)",
                              "b-testimonials-block",
                            ),
                            value: "cpt",
                          },
                        ]}
                        onChange={(val) => setAttributes({ dataSource: val })}
                      />

                      {"cpt" === dataSource && (
                        <>
                          <RangeControl
                            label={__("Number", "b-testimonials-block")}
                            value={query?.number || 6}
                            onChange={(val) =>
                              setAttributes({
                                query: { ...query, number: val },
                              })
                            }
                            min={1}
                            max={50}
                            step={1}
                          />

                          <SelectControl
                            label={__("Order By", "b-testimonials-block")}
                            value={query?.orderBy || "date"}
                            options={[
                              {
                                label: __("Date", "b-testimonials-block"),
                                value: "date",
                              },
                              {
                                label: __("Title", "b-testimonials-block"),
                                value: "title",
                              },
                              {
                                label: __("Menu Order", "b-testimonials-block"),
                                value: "menu_order",
                              },
                            ]}
                            onChange={(val) =>
                              setAttributes({
                                query: { ...query, orderBy: val },
                              })
                            }
                          />

                          <SelectControl
                            label={__("Order", "b-testimonials-block")}
                            value={query?.order || "desc"}
                            options={[
                              {
                                label: __("Descending", "b-testimonials-block"),
                                value: "desc",
                              },
                              {
                                label: __("Ascending", "b-testimonials-block"),
                                value: "asc",
                              },
                            ]}
                            onChange={(val) =>
                              setAttributes({ query: { ...query, order: val } })
                            }
                          />

                          <p className="description">
                            {__(
                              "Manage testimonials under the Testimonials menu.",
                              "b-testimonials-block",
                            )}
                          </p>
                        </>
                      )}
                    </PanelBody>
                  )}

                  {/* Context-aware Widget / Badge / Custom Block Settings */}
                  {(() => {
                    // Skip top panel for case-study-card (handled inside item cards)
                    if (layout === "case-study-card") return null;

                    // Define context-specific labels per layout type
                    const fieldLabels = {
                      "google-review-badge": {
                        panel: "Google Review Badge Settings",
                        title: "Badge Title",
                        score: "Rating Score",
                        count: "Review Count",
                        titleHelp: "Title for Google badge",
                        scoreHelp: "Rating score e.g. 4.9",
                        countHelp: "Total review count e.g. (128+ Reviews)",
                      },
                      "capterra-review-badge": {
                        panel: "Capterra Rating Badge Settings",
                        title: "Badge Title",
                        score: "Rating Score",
                        count: "Review Count / Text",
                        titleHelp: "Title for Capterra badge",
                        scoreHelp: "Rating score e.g. 4.8",
                        countHelp: "Subtext for Capterra badge",
                      },
                      "facebook-review-badge": {
                        panel: "Facebook Review Badge Settings",
                        title: "Badge Title",
                        score: "Rating Score",
                        count: "Recommendation Text",
                        titleHelp: "Title for Facebook badge",
                        scoreHelp: "Rating score e.g. 5.0",
                        countHelp: "Text e.g. Recommended by 250+ Customers",
                      },
                      "trustpilot-review-badge": {
                        panel: "Trustpilot Badge Settings",
                        title: "Badge Title",
                        score: "TrustScore",
                        count: "Review Count",
                        titleHelp: "Title for Trustpilot badge",
                        scoreHelp: "TrustScore e.g. 4.9 / 5",
                        countHelp: "Subtext e.g. TrustScore | 500+ Reviews",
                      },
                      "g2-review-badge": {
                        panel: "G2 Badge Settings",
                        title: "Badge Title",
                        score: "Rating Score",
                        count: "Category / Text",
                        titleHelp: "Title for G2 badge",
                        scoreHelp: "Rating score e.g. 4.8 / 5",
                        countHelp: "Subtext e.g. Leader Category 2026",
                      },
                      "verified-buyer-badge": {
                        panel: "Verified Buyer Badge Settings",
                        title: "Badge Title",
                        desc: "Description",
                        titleHelp: "Title for Verified badge",
                        descHelp:
                          "Subtext e.g. All customer testimonials are authenticated & verified.",
                      },
                      "review-badge-widget": {
                        panel: "Review Badge Widget Settings",
                        title: "Widget Title",
                        score: "Rating Score",
                        count: "Review Count",
                        titleHelp: "Title for review widget",
                        scoreHelp: "Rating score e.g. 4.9",
                        countHelp: "Subtext e.g. Based on 320+ reviews",
                      },
                      "rating-summary": {
                        panel: "Rating Summary Settings",
                        score: "Overall Rating Score",
                        count: "Review Count Text",
                        scoreHelp: "Average score e.g. 4.8",
                        countHelp: "Subtext e.g. Based on 256 reviews",
                      },
                      "before-after": {
                        panel: "Before & After Settings",
                        title: "Section Title",
                        desc: "",
                        score: "",
                        count: "",
                        titleHelp: "Main heading above the comparison",
                      },
                      "testimonial-form": {
                        panel: "Form Settings",
                        title: "Form Title",
                        desc: "",
                        score: "",
                        count: "Submit Button Text",
                        titleHelp: "Heading above the form",
                        countHelp: "Text shown on the submit button",
                      },
                      "user-feedback-poll": {
                        panel: "Poll Settings",
                        title: "Poll Question",
                        desc: "Poll Subtitle",
                        score: "",
                        count: "",
                        titleHelp: "The main question displayed to visitors",
                        descHelp: "Short description below the question",
                      },
                      "social-proof-toast": {
                        panel: "Toast Settings",
                        title: "Toast Message",
                        desc: "Time Label",
                        score: "",
                        count: "",
                        titleHelp: "Notification message text",
                        descHelp:
                          'Timestamp text (e.g. "Just now", "2 min ago")',
                      },
                      "testimonial-stats": {
                        panel: "Stats Settings",
                        title: "Stat 1 Label",
                        desc: "Stat 2 Label",
                        score: "Stat 1 Number",
                        count: "Stat 2 Number",
                        titleHelp: "Label for first stat card",
                        descHelp: "Label for second stat card",
                        scoreHelp: "Number for first stat card (e.g. 10K+)",
                        countHelp: "Number for second stat card (e.g. 98%)",
                      },
                      "star-rating-bars": {
                        panel: "Rating Bars Settings",
                        title: "Section Title",
                        desc: "",
                        score: "",
                        count: "",
                        titleHelp: "Heading above the rating breakdown",
                      },
                      "comparison-testimonial-table": {
                        panel: "Table Settings",
                        title: "Table Title",
                        desc: "",
                        score: "",
                        count: "",
                        titleHelp: "Heading above the comparison table",
                      },
                      "faq-testimonial-accordion": {
                        panel: "FAQ Settings",
                        title: "FAQ Title",
                        desc: "",
                        score: "",
                        count: "",
                        titleHelp: "Heading above the FAQ accordion",
                      },
                      "trust-badges": {
                        panel: "Trust Badges Settings",
                        title: "Badge 1 Text",
                        desc: "Badge 2 Text",
                        score: "Badge 3 Text",
                        count: "Badge 4 Text",
                        titleHelp: "Text for first trust badge",
                        descHelp: "Text for second trust badge",
                        scoreHelp: "Text for third trust badge",
                        countHelp: "Text for fourth trust badge",
                      },
                      "testimonials-avatar-list": {
                        panel: "Avatar Reviews List Settings",
                      },
                    };

                    const labels = fieldLabels[layout];
                    if (!labels) return null;

                    return (
                      <PanelBody
                        className="bPlPanelBody"
                        title={__(labels.panel, "b-testimonials-block")}
                        initialOpen={true}>
                        {labels.title && (
                          <TextControl
                            label={__(labels.title, "b-testimonials-block")}
                            value={attributes.badgeTitle ?? ""}
                            onChange={(val) =>
                              setAttributes({ badgeTitle: val })
                            }
                            help={
                              labels.titleHelp
                                ? __(labels.titleHelp, "b-testimonials-block")
                                : ""
                            }
                          />
                        )}
                        {labels.desc && (
                          <TextControl
                            label={__(labels.desc, "b-testimonials-block")}
                            value={attributes.badgeDesc ?? ""}
                            onChange={(val) =>
                              setAttributes({ badgeDesc: val })
                            }
                            help={
                              labels.descHelp
                                ? __(labels.descHelp, "b-testimonials-block")
                                : ""
                            }
                          />
                        )}
                        {labels.score && (
                          <TextControl
                            label={__(labels.score, "b-testimonials-block")}
                            value={attributes.badgeScore ?? ""}
                            onChange={(val) =>
                              setAttributes({ badgeScore: val })
                            }
                            help={
                              labels.scoreHelp
                                ? __(labels.scoreHelp, "b-testimonials-block")
                                : ""
                            }
                          />
                        )}
                        {labels.count && (
                          <TextControl
                            label={__(labels.count, "b-testimonials-block")}
                            value={attributes.badgeCount ?? ""}
                            onChange={(val) =>
                              setAttributes({ badgeCount: val })
                            }
                            help={
                              labels.countHelp
                                ? __(labels.countHelp, "b-testimonials-block")
                                : ""
                            }
                          />
                        )}
                        {layout === "user-feedback-poll" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Scale & Rating Marks Options:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            <TextControl
                              className="mt5"
                              label={__("Minimum Mark", "b-testimonials-block")}
                              type="number"
                              value={attributes.minScore ?? 0}
                              onChange={(val) =>
                                setAttributes({
                                  minScore: parseInt(val, 10) || 0,
                                })
                              }
                              help={__(
                                "Starting mark option (default: 0)",
                                "b-testimonials-block",
                              )}
                            />
                            <TextControl
                              className="mt5"
                              label={__("Maximum Mark", "b-testimonials-block")}
                              type="number"
                              value={attributes.maxScore ?? 10}
                              onChange={(val) =>
                                setAttributes({
                                  maxScore: parseInt(val, 10) || 10,
                                })
                              }
                              help={__(
                                "Ending mark option (e.g. 5, 10, 15, 20)",
                                "b-testimonials-block",
                              )}
                            />
                            <TextControl
                              className="mt5"
                              label={__(
                                "Low Scale Label",
                                "b-testimonials-block",
                              )}
                              value={attributes.lowLabel ?? "Not likely"}
                              onChange={(val) =>
                                setAttributes({ lowLabel: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__(
                                "High Scale Label",
                                "b-testimonials-block",
                              )}
                              value={attributes.highLabel ?? "Very likely"}
                              onChange={(val) =>
                                setAttributes({ highLabel: val })
                              }
                            />
                          </>
                        )}
                        {layout === "star-rating-bars" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Manual Star Counts (Optional Overrides):",
                                "b-testimonials-block",
                              )}
                            </Label>
                            <TextControl
                              className="mt5"
                              label={__("5-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star5Count ?? ""}
                              onChange={(val) =>
                                setAttributes({ star5Count: val })
                              }
                              help={__(
                                "Overrides automatic count from items",
                                "b-testimonials-block",
                              )}
                            />
                            <TextControl
                              className="mt5"
                              label={__("4-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star4Count ?? ""}
                              onChange={(val) =>
                                setAttributes({ star4Count: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__("3-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star3Count ?? ""}
                              onChange={(val) =>
                                setAttributes({ star3Count: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__("2-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star2Count ?? ""}
                              onChange={(val) =>
                                setAttributes({ star2Count: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__("1-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star1Count ?? ""}
                              onChange={(val) =>
                                setAttributes({ star1Count: val })
                              }
                            />
                          </>
                        )}
                        {layout === "comparison-testimonial-table" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Table Column Headers:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            <TextControl
                              className="mt5"
                              label={__(
                                "Column 1 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col1Header ?? "Customer"}
                              onChange={(val) =>
                                setAttributes({ col1Header: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__(
                                "Column 2 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col2Header ?? "Rating"}
                              onChange={(val) =>
                                setAttributes({ col2Header: val })
                              }
                            />
                            <TextControl
                              className="mt5"
                              label={__(
                                "Column 3 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col3Header ?? "Review"}
                              onChange={(val) =>
                                setAttributes({ col3Header: val })
                              }
                            />

                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Table Items / Rows:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            {items.map((rowItem, rowIdx) => (
                              <div
                                key={rowIdx}
                                className="mt10 btb-section-card"
                                style={{
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  padding: "12px",
                                  background: "#f8fafc",
                                }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}>
                                  <strong
                                    style={{
                                      fontSize: "12px",
                                      color: "#334155",
                                    }}>
                                    {__(
                                      `Row ${rowIdx + 1}`,
                                      "b-testimonials-block",
                                    )}
                                  </strong>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    <Button
                                      isSmall
                                      variant="secondary"
                                      onClick={() => {
                                        const newItems = [
                                          ...items.slice(0, rowIdx + 1),
                                          { ...items[rowIdx] },
                                          ...items.slice(rowIdx + 1),
                                        ];
                                        setAttributes({ items: newItems });
                                      }}
                                      title={__(
                                        "Duplicate Row",
                                        "b-testimonials-block",
                                      )}>
                                      <Dashicon icon="admin-page" />
                                    </Button>
                                    {items.length > 1 && (
                                      <Button
                                        isDestructive
                                        isSmall
                                        variant="tertiary"
                                        onClick={() => {
                                          const newItems = items.filter(
                                            (_, i) => i !== rowIdx,
                                          );
                                          setAttributes({ items: newItems });
                                        }}
                                        title={__(
                                          "Remove Row",
                                          "b-testimonials-block",
                                        )}>
                                        <Dashicon icon="no" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <TextControl
                                  className="mt5"
                                  label={__(
                                    "Customer Name",
                                    "b-testimonials-block",
                                  )}
                                  value={rowItem.name ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[rowIdx].name = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <NumberControl
                                  className="mt5"
                                  label={__(
                                    "Rating (1 - 5)",
                                    "b-testimonials-block",
                                  )}
                                  labelPosition="left"
                                  value={rowItem.rating ?? 5}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[rowIdx].rating =
                                        parseFloat(val) || 5;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                  min={1}
                                  max={5}
                                />

                                <TextareaControl
                                  className="mt5"
                                  label={__(
                                    "Review / Content",
                                    "b-testimonials-block",
                                  )}
                                  value={rowItem.reviewText ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[rowIdx].reviewText = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />
                              </div>
                            ))}

                            <Button
                              className="mt15"
                              variant="secondary"
                              onClick={() => {
                                const newItems = [
                                  ...items,
                                  {
                                    name: "Customer Name",
                                    rating: 5,
                                    reviewText:
                                      "Great product and excellent support!",
                                  },
                                ];
                                setAttributes({ items: newItems });
                              }}
                              style={{
                                width: "100%",
                                justifyContent: "center",
                              }}>
                              <Dashicon icon="plus" />
                              {__("Add New Row", "b-testimonials-block")}
                            </Button>
                          </>
                        )}
                        {layout === "faq-testimonial-accordion" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "FAQ Questions & Answers:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            {items.map((faqItem, faqIdx) => (
                              <div
                                key={faqIdx}
                                className="mt10 btb-section-card"
                                style={{
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  padding: "12px",
                                  background: "#f8fafc",
                                }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}>
                                  <strong
                                    style={{
                                      fontSize: "12px",
                                      color: "#334155",
                                    }}>
                                    {__(
                                      `FAQ ${faqIdx + 1}`,
                                      "b-testimonials-block",
                                    )}
                                  </strong>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    <Button
                                      isSmall
                                      variant="secondary"
                                      onClick={() => {
                                        const newItems = [
                                          ...items.slice(0, faqIdx + 1),
                                          { ...items[faqIdx] },
                                          ...items.slice(faqIdx + 1),
                                        ];
                                        setAttributes({ items: newItems });
                                      }}
                                      title={__(
                                        "Duplicate Question",
                                        "b-testimonials-block",
                                      )}>
                                      <Dashicon icon="admin-page" />
                                    </Button>
                                    {items.length > 1 && (
                                      <Button
                                        isDestructive
                                        isSmall
                                        variant="tertiary"
                                        onClick={() => {
                                          const newItems = items.filter(
                                            (_, i) => i !== faqIdx,
                                          );
                                          setAttributes({ items: newItems });
                                        }}
                                        title={__(
                                          "Remove Question",
                                          "b-testimonials-block",
                                        )}>
                                        <Dashicon icon="no" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <TextControl
                                  className="mt5"
                                  label={__(
                                    "Question Text",
                                    "b-testimonials-block",
                                  )}
                                  value={faqItem.name ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[faqIdx].name = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextareaControl
                                  className="mt5"
                                  label={__(
                                    "Answer Content",
                                    "b-testimonials-block",
                                  )}
                                  value={faqItem.reviewText ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[faqIdx].reviewText = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextControl
                                  className="mt5"
                                  label={__(
                                    "Author / Subtext (Optional)",
                                    "b-testimonials-block",
                                  )}
                                  value={faqItem.deg ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[faqIdx].deg = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />
                              </div>
                            ))}

                            <Button
                              className="mt15"
                              variant="secondary"
                              onClick={() => {
                                const newItems = [
                                  ...items,
                                  {
                                    name: "What is your refund policy?",
                                    reviewText:
                                      "We offer a 30-day money-back guarantee with no questions asked.",
                                    deg: "Customer Support",
                                  },
                                ];
                                setAttributes({ items: newItems });
                              }}
                              style={{
                                width: "100%",
                                justifyContent: "center",
                              }}>
                              <Dashicon icon="plus" />
                              {__("Add New Question", "b-testimonials-block")}
                            </Button>
                          </>
                        )}
                        {layout === "testimonials-avatar-list" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Avatar Testimonial Items:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            {items.map((avItem, avIdx) => (
                              <div
                                key={avIdx}
                                className="mt10 btb-section-card"
                                style={{
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  padding: "12px",
                                  background: "#f8fafc",
                                }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}>
                                  <strong
                                    style={{
                                      fontSize: "12px",
                                      color: "#334155",
                                    }}>
                                    {__(
                                      `Avatar ${avIdx + 1}`,
                                      "b-testimonials-block",
                                    )}
                                  </strong>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    <Button
                                      isSmall
                                      variant="secondary"
                                      onClick={() => {
                                        const newItems = [
                                          ...items.slice(0, avIdx + 1),
                                          { ...items[avIdx] },
                                          ...items.slice(avIdx + 1),
                                        ];
                                        setAttributes({ items: newItems });
                                      }}
                                      title={__(
                                        "Duplicate Avatar",
                                        "b-testimonials-block",
                                      )}>
                                      <Dashicon icon="admin-page" />
                                    </Button>
                                    {items.length > 1 && (
                                      <Button
                                        isDestructive
                                        isSmall
                                        variant="tertiary"
                                        onClick={() => {
                                          const newItems = items.filter(
                                            (_, i) => i !== avIdx,
                                          );
                                          setAttributes({ items: newItems });
                                        }}
                                        title={__(
                                          "Remove Avatar",
                                          "b-testimonials-block",
                                        )}>
                                        <Dashicon icon="no" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <Label className="mt5">
                                  {__("Avatar Image:", "b-testimonials-block")}
                                </Label>
                                <InlineDetailMediaUpload
                                  value={avItem.img || {}}
                                  type={["image"]}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[avIdx].img = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextControl
                                  className="mt5"
                                  label={__("Name", "b-testimonials-block")}
                                  value={avItem.name ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[avIdx].name = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextControl
                                  className="mt5"
                                  label={__(
                                    "Designation",
                                    "b-testimonials-block",
                                  )}
                                  value={avItem.deg ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[avIdx].deg = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextareaControl
                                  className="mt5"
                                  label={__(
                                    "Review Text",
                                    "b-testimonials-block",
                                  )}
                                  value={avItem.reviewText ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[avIdx].reviewText = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />
                              </div>
                            ))}

                            <Button
                              className="mt15"
                              variant="secondary"
                              onClick={() => {
                                const newItems = [
                                  ...items,
                                  {
                                    img: {
                                      url: "https://templates.bplugins.com/wp-content/uploads/2025/02/p-29.png",
                                    },
                                    name: "John Doe",
                                    deg: "Developer",
                                    reviewText:
                                      "Fantastic product and smooth experience.",
                                  },
                                ];
                                setAttributes({ items: newItems });
                              }}
                              style={{
                                width: "100%",
                                justifyContent: "center",
                              }}>
                              <Dashicon icon="plus" />
                              {__(
                                "Add New Avatar Item",
                                "b-testimonials-block",
                              )}
                            </Button>
                          </>
                        )}
                        {layout === "testimonials-card-stack" && (
                          <>
                            <hr
                              style={{
                                margin: "15px 0",
                                borderColor: "#e2e8f0",
                              }}
                            />
                            <Label>
                              {__(
                                "Stacked Cards Management:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            {items.map((stkItem, stkIdx) => (
                              <div
                                key={stkIdx}
                                className="mt10 btb-section-card"
                                style={{
                                  border: "1px solid #e2e8f0",
                                  borderRadius: "8px",
                                  padding: "12px",
                                  background: "#f8fafc",
                                }}>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}>
                                  <strong
                                    style={{
                                      fontSize: "12px",
                                      color: "#334155",
                                    }}>
                                    {__(
                                      `Card ${stkIdx + 1}`,
                                      "b-testimonials-block",
                                    )}
                                  </strong>
                                  <div style={{ display: "flex", gap: "4px" }}>
                                    <Button
                                      isSmall
                                      variant="secondary"
                                      onClick={() => {
                                        const newItems = [
                                          ...items.slice(0, stkIdx + 1),
                                          { ...items[stkIdx] },
                                          ...items.slice(stkIdx + 1),
                                        ];
                                        setAttributes({ items: newItems });
                                      }}
                                      title={__(
                                        "Duplicate Card",
                                        "b-testimonials-block",
                                      )}>
                                      <Dashicon icon="admin-page" />
                                    </Button>
                                    {items.length > 1 && (
                                      <Button
                                        isDestructive
                                        isSmall
                                        variant="tertiary"
                                        onClick={() => {
                                          const newItems = items.filter(
                                            (_, i) => i !== stkIdx,
                                          );
                                          setAttributes({ items: newItems });
                                        }}
                                        title={__(
                                          "Remove Card",
                                          "b-testimonials-block",
                                        )}>
                                        <Dashicon icon="no" />
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                <TextControl
                                  className="mt5"
                                  label={__("Name", "b-testimonials-block")}
                                  value={stkItem.name ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[stkIdx].name = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextControl
                                  className="mt5"
                                  label={__(
                                    "Designation",
                                    "b-testimonials-block",
                                  )}
                                  value={stkItem.deg ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[stkIdx].deg = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />

                                <TextareaControl
                                  className="mt5"
                                  label={__(
                                    "Review Text",
                                    "b-testimonials-block",
                                  )}
                                  value={stkItem.reviewText ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[stkIdx].reviewText = val;
                                    });
                                    setAttributes({ items: newItems });
                                  }}
                                />
                              </div>
                            ))}

                            <Button
                              className="mt15"
                              variant="secondary"
                              onClick={() => {
                                const newItems = [
                                  ...items,
                                  {
                                    name: "John Doe",
                                    deg: "Developer",
                                    reviewText:
                                      "Excellent service and top quality output.",
                                  },
                                ];
                                setAttributes({ items: newItems });
                              }}
                              style={{
                                width: "100%",
                                justifyContent: "center",
                              }}>
                              <Dashicon icon="plus" />
                              {__("Add New Stack Card", "b-testimonials-block")}
                            </Button>
                          </>
                        )}
                      </PanelBody>
                    );
                  })()}

                  {/* Hide Card Content Settings panel for single item review badges / widgets (except single testimonial block) */}
                  {(() => {
                    if ("manual" !== dataSource) return null;
                    if (isSingleItemBlock && !isSingleTestimonial) return null;

                    return (
                      <PanelBody
                        className="bPlPanelBody addRemoveItems editItem"
                        title={
                          isSingleTestimonial
                            ? __(
                                "Single Testimonial Settings",
                                "b-testimonials-block",
                              )
                            : isCaseStudy
                            ? __(
                                "Add or Remove Case Study Cards",
                                "b-testimonials-block",
                              )
                            : __(
                                "Add or Remove Testimonial Cards",
                                "b-testimonials-block",
                              )
                        }>
                        {!isSingleItemBlock && items?.length > 1 && (
                          <div
                            className="btb-card-selector-list mb15"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "6px",
                            }}>
                            {items.map((_, idx) => (
                              <Button
                                key={idx}
                                variant={
                                  activeIndex === idx ? "primary" : "secondary"
                                }
                                isSmall
                                onClick={() => setActiveIndex(idx)}>
                                {__(`Card ${idx + 1}`, "b-testimonials-block")}
                              </Button>
                            ))}
                          </div>
                        )}
                        {null !== activeIndex && (
                          <>
                            {!isSingleItemBlock && (
                              <h3 className="bplItemTitle">
                                {__(
                                  `Card ${activeIndex + 1}:`,
                                  "b-testimonials-block",
                                )}
                              </h3>
                            )}

                            <Label>
                              {__(
                                "Customer Image / Avatar:",
                                "b-testimonials-block",
                              )}
                            </Label>
                            <InlineDetailMediaUpload
                              value={img}
                              type={["image"]}
                              onChange={(val) => updateItem("img", val)}
                              placeholder={__(
                                "Enter Image URL",
                                "b-testimonials-block",
                              )}
                            />

                            {/* The Audio Testimonials card drew a play button
                                and a waveform with no audio behind either: no
                                field here, and no <audio> element in the
                                layout. `types` (not `type`) is the prop
                                InlineDetailMediaUpload reads -- the avatar
                                upload above only gets images because that is
                                also the default. */}
                            {isAudio && (
                              <>
                                <Label className="mt10">
                                  {__(
                                    "Audio File:",
                                    "b-testimonials-block",
                                  )}
                                </Label>
                                <InlineDetailMediaUpload
                                  value={currentItem?.audio || {}}
                                  types={["audio"]}
                                  onChange={(val) => updateItem("audio", val)}
                                  placeholder={__(
                                    "Enter Audio URL (mp3, m4a, ogg, wav)",
                                    "b-testimonials-block",
                                  )}
                                />
                              </>
                            )}

                            <TextControl
                              className="mt10"
                              label={__("Name", "b-testimonials-block")}
                              value={name}
                              onChange={(val) => updateItem("name", val)}
                            />

                            <TextControl
                              className="mt10"
                              label={__(
                                "Company / Designation",
                                "b-testimonials-block",
                              )}
                              value={deg}
                              onChange={(val) => updateItem("deg", val)}
                            />

                            {isCaseStudy ? (
                              <>
                                {(() => {
                                  const sections = currentItem.sections || [
                                    {
                                      title:
                                        currentItem.challengeTitle ??
                                        "Challenge",
                                      content:
                                        currentItem.challenge ??
                                        "The customer needed a reliable solution to improve their workflow.",
                                    },
                                    {
                                      title:
                                        currentItem.solutionTitle ?? "Solution",
                                      content:
                                        currentItem.solution ??
                                        reviewText ??
                                        "It is a long-established fact that a reader will be distracted by the readable content of a page when looking at its layout",
                                    },
                                    {
                                      title:
                                        currentItem.resultTitle ?? "Result",
                                      content:
                                        currentItem.result ??
                                        "95% improvement in efficiency and customer satisfaction.",
                                    },
                                  ];

                                  const updateSection = (
                                    secIdx,
                                    field,
                                    val,
                                  ) => {
                                    const newSections = sections.map(
                                      (sec, i) =>
                                        i === secIdx
                                          ? { ...sec, [field]: val }
                                          : sec,
                                    );
                                    updateItem("sections", newSections);
                                  };

                                  const removeSection = (secIdx) => {
                                    const newSections = sections.filter(
                                      (_, i) => i !== secIdx,
                                    );
                                    updateItem("sections", newSections);
                                  };

                                  const addSection = () => {
                                    const newSections = [
                                      ...sections,
                                      { title: "New Section", content: "" },
                                    ];
                                    updateItem("sections", newSections);
                                  };

                                  return (
                                    <div className="mt15 btb-case-study-sections">
                                      <Label>
                                        {__(
                                          "Case Study Sections:",
                                          "b-testimonials-block",
                                        )}
                                      </Label>
                                      {sections.map((sec, secIdx) => (
                                        <div
                                          key={secIdx}
                                          className="mt10 btb-section-card"
                                          style={{
                                            border: "1px dashed #cbd5e1",
                                            borderRadius: "6px",
                                            padding: "10px",
                                            background: "#f8fafc",
                                          }}>
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-between",
                                              alignItems: "center",
                                            }}>
                                            <strong
                                              style={{
                                                fontSize: "12px",
                                                color: "#475569",
                                              }}>
                                              {__(
                                                `Section ${secIdx + 1}`,
                                                "b-testimonials-block",
                                              )}
                                            </strong>
                                            {sections.length > 1 && (
                                              <Button
                                                isDestructive
                                                isSmall
                                                variant="tertiary"
                                                onClick={() =>
                                                  removeSection(secIdx)
                                                }
                                                title={__(
                                                  "Remove Section",
                                                  "b-testimonials-block",
                                                )}>
                                                <Dashicon icon="no" />
                                              </Button>
                                            )}
                                          </div>
                                          <TextControl
                                            className="mt5"
                                            label={__(
                                              "Section Title",
                                              "b-testimonials-block",
                                            )}
                                            value={sec.title ?? ""}
                                            onChange={(val) =>
                                              updateSection(
                                                secIdx,
                                                "title",
                                                val,
                                              )
                                            }
                                          />
                                          <TextareaControl
                                            className="mt5"
                                            label={__(
                                              "Section Content",
                                              "b-testimonials-block",
                                            )}
                                            value={sec.content ?? ""}
                                            onChange={(val) =>
                                              updateSection(
                                                secIdx,
                                                "content",
                                                val,
                                              )
                                            }
                                          />
                                        </div>
                                      ))}
                                      <Button
                                        className="mt10"
                                        variant="secondary"
                                        onClick={addSection}
                                        style={{
                                          width: "100%",
                                          justifyContent: "center",
                                        }}>
                                        <Dashicon icon="plus" />
                                        {__(
                                          "Add New Section",
                                          "b-testimonials-block",
                                        )}
                                      </Button>
                                    </div>
                                  );
                                })()}
                              </>
                            ) : (
                              <TextareaControl
                                className="mt10"
                                label={__(
                                  "Review / Quote Text",
                                  "b-testimonials-block",
                                )}
                                value={reviewText}
                                onChange={(val) =>
                                  updateItem("reviewText", val)
                                }
                              />
                            )}

                            {(!isSingleItemBlock || isSingleTestimonial) &&
                              !isCaseStudy && (
                                <NumberControl
                                  className="mt10"
                                  label={__("Rating:", "b-testimonials-block")}
                                  labelPosition="left"
                                  value={rating}
                                  onChange={(val) =>
                                    updateItem("rating", parseFloat(val))
                                  }
                                  min={0}
                                  max={5}
                                  step={0.1}
                                />
                              )}

                            {!isSingleItemBlock && (
                              <PanelRow className="itemAction mt10 mb15">
                                {1 < items?.length && (
                                  <Button
                                    className="removeItem"
                                    label={__("Remove", "b-testimonials-block")}
                                    onClick={removeItem}>
                                    <Dashicon icon="no" />
                                    {__("Remove", "b-testimonials-block")}
                                  </Button>
                                )}
                                <Button
                                  className="duplicateItem"
                                  label={__(
                                    "Duplicate",
                                    "b-testimonials-block",
                                  )}
                                  onClick={duplicateItem}>
                                  {gearIcon}
                                  {__("Duplicate", "b-testimonials-block")}
                                </Button>
                              </PanelRow>
                            )}
                          </>
                        )}

                        {!isSingleItemBlock && (
                          <div className="addItem">
                            <Button
                              label={
                                isCaseStudy
                                  ? __(
                                      "Add New Case Study Card",
                                      "b-testimonials-block",
                                    )
                                  : __("Add New Card", "b-testimonials-block")
                              }
                              onClick={addItem}>
                              <Dashicon icon="plus" size={23} />
                              {isCaseStudy
                                ? __(
                                    "Add New Case Study Card",
                                    "b-testimonials-block",
                                  )
                                : __("Add New Card", "b-testimonials-block")}
                            </Button>
                          </div>
                        )}
                      </PanelBody>
                    );
                  })()}

                  {/* One toggle per part the layout actually renders through a
                        Themes/* card or through `itemsEls`. The bespoke layouts
                        print their parts unconditionally, so a toggle there
                        switched an attribute nothing reads -- the avatar list
                        and the badges kept every part on screen whatever the
                        panel said. */}
                  {controls.elements.length > 0 && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Elements", "b-testimonials-block")}
                      initialOpen={false}>
                      {controls.elements.includes("img") && (
                        <ToggleControl
                          className="mt10"
                          label={__("Image", "b-testimonials-block")}
                          labelPosition="left"
                          checked={elements?.img}
                          onChange={(val) =>
                            updateObject("elements", "img", val)
                          }
                        />
                      )}

                      {controls.elements.includes("name") && (
                        <ToggleControl
                          className="mt10"
                          label={__("Name", "b-testimonials-block")}
                          labelPosition="left"
                          checked={elements?.name}
                          onChange={(val) =>
                            updateObject("elements", "name", val)
                          }
                        />
                      )}

                      {controls.elements.includes("deg") && (
                        <ToggleControl
                          className="mt10"
                          label={__("Designation", "b-testimonials-block")}
                          labelPosition="left"
                          checked={elements?.deg}
                          onChange={(val) =>
                            updateObject("elements", "deg", val)
                          }
                        />
                      )}

                      {controls.elements.includes("reviewText") && (
                        <ToggleControl
                          className="mt10"
                          label={__("Review Text", "b-testimonials-block")}
                          labelPosition="left"
                          checked={elements?.reviewText}
                          onChange={(val) =>
                            updateObject("elements", "reviewText", val)
                          }
                        />
                      )}

                      {/* Theme 4 is the one card that draws no stars at all, so
                          the toggle has nothing to switch there -- measured on
                          the masonry block, which ships with that theme: turning
                          Rating off changed nothing in the rendered card. */}
                      {controls.elements.includes("icon") && themeHasRating && (
                        <ToggleControl
                          className="mt10"
                          label={__("Rating", "b-testimonials-block")}
                          labelPosition="left"
                          checked={elements?.icon}
                          onChange={(val) =>
                            updateObject("elements", "icon", val)
                          }
                        />
                      )}
                    </PanelBody>
                  )}

                  {/* One panel for the whole excerpt story. These three used to
                        sit in three places -- the toggle under Elements, its
                        button labels in a panel called "Button", and the length
                        itself over in the Style tab. */}
                  {hasExcerpt && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Excerpt & Expand", "b-testimonials-block")}
                      initialOpen={false}>
                      {/* The toggle comes first because the length depends on it.
                          Both the editor preview and the front end cut the review
                          only when the Expand button is on -- `isCollapsible` in
                          Backend/Edit.js and ViewReviewText require it -- so on
                          the 25 blocks that ship with the button off, Excerpt
                          length moved nothing at all. Measured, not inferred:
                          setting it to 12 characters left every one of them
                          rendering the full review. */}
                      <ToggleControl
                        label={__(
                          "Expand / Less button",
                          "b-testimonials-block",
                        )}
                        labelPosition="left"
                        checked={!!elements?.expandBtn}
                        onChange={(val) =>
                          updateObject("elements", "expandBtn", val)
                        }
                        help={__(
                          "Cuts the review to the length below and adds a button to reveal the rest.",
                          "b-testimonials-block",
                        )}
                      />

                      {elements?.expandBtn && (
                        <>
                          <RangeControl
                            className="mt10"
                            label={__(
                              "Excerpt length",
                              "b-testimonials-block",
                            )}
                            value={textLength}
                            onChange={(val) =>
                              setAttributes({ textLength: val })
                            }
                            min={10}
                            max={1000}
                            step={1}
                            help={__(
                              "Characters shown before the review is cut.",
                              "b-testimonials-block",
                            )}
                          />

                          <TextControl
                            className="mt10"
                            label={__("Expand Text", "b-testimonials-block")}
                            value={elements?.expandText ?? "Expand"}
                            onChange={(val) =>
                              updateObject("elements", "expandText", val)
                            }
                          />

                          <TextControl
                            className="mt10"
                            label={__("Collapse Text", "b-testimonials-block")}
                            value={elements?.collapseText ?? "Less"}
                            onChange={(val) =>
                              updateObject("elements", "collapseText", val)
                            }
                          />
                        </>
                      )}
                    </PanelBody>
                  )}

                  <IconSettings
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />

                  {hasLayoutPanel && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Layout", "b-testimonials-block")}
                      initialOpen={false}>
                      {/* Writes `arrangement`, not `layout`. Setting `layout` here
                                used to swap the block's identity: on a quote box it
                                replaced the class its whole look depends on, and on a
                                timeline or hero it converted the block outright with no
                                way back, because those values are not even in the list.
                                Shown only for layouts that reach the arrangement switch
                                -- the rest return their own markup before it. */}
                      {canArrange && (
                        <PanelRow>
                          <Label className="mt0 mb0">
                            {__("Arrangement:", "b-testimonials-block")}
                          </Label>
                          <SelectControl
                            value={arrangement}
                            onChange={(val) =>
                              setAttributes({ arrangement: val })
                            }
                            options={arrangementOpt}
                          />
                        </PanelRow>
                      )}

                      {/* Only the layouts that hand their items to a Themes/*
                            component read this. The bespoke ones -- toast,
                            avatar list, case study, floating bubble, the badges
                            -- build their own markup and ignore it, and six of
                            them do not even register the attribute, so picking a
                            theme wrote a value WordPress then dropped. */}
                      {controls.theme && (
                        <PanelRow>
                          <Label className="mt0 mb0">
                            {__("Theme:", "b-testimonials-block")}
                          </Label>
                          <SelectControl
                            value={theme}
                            onChange={(val) =>
                              setAttributes({
                                theme: val,
                                ...checkTheme(val, border),
                              })
                            }
                            options={themeOpt}
                          />
                        </PanelRow>
                      )}

                      {showColumns && (
                        <>
                          <PanelRow>
                            <Label mt="0">
                              {__("Columns:", "b-testimonials-block")}
                            </Label>
                            <Device className="" />
                          </PanelRow>

                          {/* The hero layout spends its first testimonial on
                              the spotlight card, so Columns only reaches the
                              row beneath it. Layout.js clamps that row to the
                              number of cards in it rather than leaving empty
                              tracks, so asking for more columns than there are
                              follower cards changed nothing and read as a dead
                              control. The range stops at the last column that
                              can actually be filled, and the panel hides the
                              control entirely below three testimonials -- see
                              CONTROL_CONDITIONS in utils/layoutControls.js. */}
                          <RangeControl
                            value={columns[device]}
                            onChange={(val) => {
                              setAttributes({
                                columns: { ...columns, [device]: val },
                              });
                            }}
                            min={1}
                            max={
                              "testimonials-hero" === layout
                                ? Math.max(1, Math.min(6, items.length - 1))
                                : 6
                            }
                            step={1}
                            beforeIcon="grid-view"
                            help={
                              "testimonials-hero" === layout
                                ? __(
                                    "Lays out the cards below the spotlight, so it stops at one column per follower card.",
                                    "b-testimonials-block",
                                  )
                                : undefined
                            }
                          />
                        </>
                      )}

                      {/* The gap rule is scoped to `.layoutSection`, so these
                            two reach only the layouts that wrap their cards in
                            it. A timeline stacks its cards with a fixed margin
                            and a case study grid with a fixed gap; neither ever
                            moved. Which of the two the current arrangement can
                            use is worked out above. */}
                      {showColumnGap && (
                        <UnitControl
                          className="mt20"
                          label={__("Column Gap:", "b-testimonials-block")}
                          labelPosition="left"
                          value={columnGap}
                          onChange={(val) => setAttributes({ columnGap: val })}
                          units={[pxUnit(30), perUnit(3), emUnit(2)]}
                          isResetValueOnUnitChange={true}
                        />
                      )}

                      {showRowGap && (
                        <UnitControl
                          className="mt20"
                          label={__("Row Gap:", "b-testimonials-block")}
                          labelPosition="left"
                          value={rowGap}
                          onChange={(val) => setAttributes({ rowGap: val })}
                          units={[pxUnit(40), perUnit(3), emUnit(2.5)]}
                          isResetValueOnUnitChange={true}
                        />
                      )}
                    </PanelBody>
                  )}

                  {isSliderArrangement && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Slider", "b-testimonials-block")}
                      initialOpen={false}>
                      {/* Slider Height used to be commented out here, reading a
                            `height` variable that is no longer destructured. Card
                            Height in the Style tab covers it and works for grids
                            too, so it is gone rather than revived. */}
                      <ToggleControl
                        className="mt10"
                        label={__("AutoPlay", "b-testimonials-block")}
                        labelPosition="left"
                        checked={autoPlay}
                        onChange={(val) =>
                          updateObject("slider", "autoPlay", val)
                        }
                      />

                      {/* The delay was hardcoded at 3000ms, so how fast slides
                            advanced was not adjustable at all. */}
                      {autoPlay && (
                        <RangeControl
                          className="mt10"
                          label={__(
                            "Slide Every (seconds)",
                            "b-testimonials-block",
                          )}
                          value={autoPlayDelay}
                          onChange={(val) =>
                            updateObject("slider", "autoPlayDelay", val)
                          }
                          min={1}
                          max={15}
                          step={0.5}
                          allowReset
                          resetFallbackValue={3}
                        />
                      )}

                      {autoPlay && (
                        <ToggleControl
                          className="mt10"
                          label={__(
                            "Pause while editing",
                            "b-testimonials-block",
                          )}
                          labelPosition="left"
                          checked={pauseInEditor}
                          onChange={(val) =>
                            setAttributes({ pauseInEditor: val })
                          }
                          help={__(
                            "Editor only. The slider keeps playing on your site.",
                            "b-testimonials-block",
                          )}
                        />
                      )}

                      <ToggleControl
                        className="mt10"
                        label={__("MouseWheel", "b-testimonials-block")}
                        labelPosition="left"
                        checked={mouseWheel}
                        onChange={(val) =>
                          updateObject("slider", "mouseWheel", val)
                        }
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Navigation", "b-testimonials-block")}
                        labelPosition="left"
                        checked={navigation}
                        onChange={(val) =>
                          updateObject("slider", "navigation", val)
                        }
                      />

                      {/* Arrow styling. Hidden when navigation is off, since
                            there is no arrow to style. Every one of these is
                            reset-able back to Swiper's default rather than to a
                            value of ours, so "no opinion" stays expressible. */}
                      {navigation && (
                        <>
                          <RangeControl
                            className="mt20"
                            label={__("Arrow Size", "b-testimonials-block")}
                            value={navSize}
                            onChange={(val) =>
                              updateObject("slider", "navSize", val)
                            }
                            min={16}
                            max={80}
                            step={1}
                            allowReset
                            resetFallbackValue={undefined}
                          />

                          {/* Inset only. The slider clips its own overflow --
                                that is what keeps the off-screen slides hidden --
                                so an arrow pushed past the edge is cut in half
                                rather than sitting outside. */}
                          <RangeControl
                            label={__(
                              "Distance From Edge",
                              "b-testimonials-block",
                            )}
                            value={navOffset}
                            onChange={(val) =>
                              updateObject("slider", "navOffset", val)
                            }
                            min={0}
                            max={60}
                            step={1}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "Moves the arrows inward from the slider edge.",
                              "b-testimonials-block",
                            )}
                          />

                          <ColorControl
                            className="mt10"
                            label={__("Arrow Color:", "b-testimonials-block")}
                            value={navColor}
                            onChange={(val) =>
                              updateObject("slider", "navColor", val)
                            }
                          />

                          <ColorControl
                            className="mt10"
                            label={__(
                              "Arrow Hover Color:",
                              "b-testimonials-block",
                            )}
                            value={navHoverColor}
                            onChange={(val) =>
                              updateObject("slider", "navHoverColor", val)
                            }
                          />

                          <ColorControl
                            className="mt10"
                            label={__(
                              "Arrow Background:",
                              "b-testimonials-block",
                            )}
                            value={navBg}
                            onChange={(val) =>
                              updateObject("slider", "navBg", val)
                            }
                          />

                          <ColorControl
                            className="mt10"
                            label={__(
                              "Arrow Hover Background:",
                              "b-testimonials-block",
                            )}
                            value={navHoverBg}
                            onChange={(val) =>
                              updateObject("slider", "navHoverBg", val)
                            }
                          />

                          <BorderControl
                            className="mt20"
                            label={__("Arrow Border:", "b-testimonials-block")}
                            value={navBorder}
                            onChange={(val) =>
                              updateObject("slider", "navBorder", val)
                            }
                          />
                        </>
                      )}

                      {/* Coverflow and 3D Slider share one engine; these are the
                            numbers that separate them. Each resets to its own
                            arrangement's preset rather than to a fixed value, so
                            switching arrangement still moves between the two
                            looks. */}
                      {is3DArrangement && (
                        <>
                          {/* Each card sits further back and smaller than the
                                last, so past a few positions they collapse into an
                                unreadable heap at the edges. This sets how many
                                are kept; the rest fade out. */}
                          <RangeControl
                            label={__(
                              "Visible Side Cards",
                              "b-testimonials-block",
                            )}
                            value={"all" === visibleSides ? 3 : visibleSides}
                            onChange={(val) =>
                              updateObject("slider", "visibleSides", val)
                            }
                            min={0}
                            max={5}
                            step={1}
                            allowReset
                            resetFallbackValue={1}
                            help={
                              cardWidth
                                ? __(
                                    "Card Width is set, so how many fit follows from that.",
                                    "b-testimonials-block",
                                  )
                                : __(
                                    "Cards shown on each side of the active one. 0 shows the active card alone.",
                                    "b-testimonials-block",
                                  )
                            }
                          />

                          {/* Without this, card width is just 1 / (2n+1) of the
                                slider, so asking for more side cards necessarily
                                makes every card narrower. */}
                          <UnitControl
                            className="mt20"
                            label={__("Card Width:", "b-testimonials-block")}
                            labelPosition="left"
                            value={cardWidth}
                            onChange={(val) =>
                              updateObject("slider", "cardWidth", val)
                            }
                            units={[pxUnit(320), perUnit(40), emUnit(20)]}
                            isResetValueOnUnitChange={true}
                            help={__(
                              "Leave empty to divide the slider by the number of cards.",
                              "b-testimonials-block",
                            )}
                          />

                          <RangeControl
                            className="mt20"
                            label={__(
                              "3D Tilt (degrees)",
                              "b-testimonials-block",
                            )}
                            value={coverRotate}
                            onChange={(val) =>
                              updateObject("slider", "coverRotate", val)
                            }
                            min={0}
                            max={90}
                            step={1}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "0 removes the rotation, leaving depth alone.",
                              "b-testimonials-block",
                            )}
                          />

                          <RangeControl
                            label={__("3D Depth", "b-testimonials-block")}
                            value={coverDepth}
                            onChange={(val) =>
                              updateObject("slider", "coverDepth", val)
                            }
                            min={0}
                            max={500}
                            step={10}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "How far the side cards sit back.",
                              "b-testimonials-block",
                            )}
                          />

                          <RangeControl
                            label={__(
                              "Side Card Size (%)",
                              "b-testimonials-block",
                            )}
                            value={coverScale}
                            onChange={(val) =>
                              updateObject("slider", "coverScale", val)
                            }
                            min={50}
                            max={100}
                            step={1}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "Shrinks the cards either side of the active one.",
                              "b-testimonials-block",
                            )}
                          />
                        </>
                      )}
                    </PanelBody>
                  )}

                  {/* The marquee had no settings whatsoever: speed, direction and
                        pause-on-hover were all fixed in the stylesheet. */}
                  {"marquee" === arrangement && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Marquee", "b-testimonials-block")}
                      initialOpen={false}>
                      <RangeControl
                        label={__(
                          "Scroll Duration (seconds)",
                          "b-testimonials-block",
                        )}
                        value={marqueeSpeed}
                        onChange={(val) =>
                          updateObject("marquee", "speed", val)
                        }
                        min={5}
                        max={120}
                        step={1}
                        allowReset
                        resetFallbackValue={30}
                        help={__(
                          "Time for one full pass. Higher is slower.",
                          "b-testimonials-block",
                        )}
                      />

                      <PanelRow>
                        <Label className="mt0 mb0">
                          {__("Direction:", "b-testimonials-block")}
                        </Label>
                        <SelectControl
                          value={marqueeDirection}
                          onChange={(val) =>
                            updateObject("marquee", "direction", val)
                          }
                          options={[
                            {
                              label: __("Left", "b-testimonials-block"),
                              value: "left",
                            },
                            {
                              label: __("Right", "b-testimonials-block"),
                              value: "right",
                            },
                          ]}
                        />
                      </PanelRow>

                      <ToggleControl
                        className="mt10"
                        label={__("Pause on hover", "b-testimonials-block")}
                        labelPosition="left"
                        checked={marqueePauseOnHover}
                        onChange={(val) =>
                          updateObject("marquee", "pauseOnHover", val)
                        }
                      />

                      <ToggleControl
                        className="mt10"
                        label={__(
                          "Pause while editing",
                          "b-testimonials-block",
                        )}
                        labelPosition="left"
                        checked={pauseInEditor}
                        onChange={(val) =>
                          setAttributes({ pauseInEditor: val })
                        }
                        help={__(
                          "Editor only, so cards hold still while you style them. The marquee keeps scrolling on your site.",
                          "b-testimonials-block",
                        )}
                      />
                    </PanelBody>
                  )}
                </>
              )}

              {"style" === tab.name && (
                <>
                  <ColorsPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                    layout={layout}
                  />

                  {/* Block Width, Card Height, Block Margin and Card Margin, in
                      the same component the seven bespoke editors render, so the
                      two cannot drift apart. Card Margin used to sit in the Card
                      panel below, which meant gating that panel took it away
                      from the eight layouts whose card it does reach -- it
                      shares Card Height's selector list, not the Card panel's.
                      Its device switch needs nothing passed to it: every switch
                      now reads the editor's preview device, so this panel and
                      the Layout panel on the General tab are on the same one by
                      construction rather than by wiring. */}
                  <SizeSpacingPanel
                    attributes={attributes}
                    setAttributes={setAttributes}
                  />

                  {/* The four rules behind this panel name seven selectors:
                      `.layoutSection .single` and six widgets. On the layouts
                      that build their card out of anything else -- timeline,
                      hero, card stack, case study, poll, table, FAQ -- the panel
                      opened and moved nothing. Those layouts paint their card
                      through the palette variables instead, which the Colors
                      panel above already offers. */}
                  {controls.cardBox && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Card", "b-testimonials-block")}
                      initialOpen={false}>
                      <ColorControl
                        className="mb10"
                        label={__("Background Color", "b-testimonials-block")}
                        value={cardBackgroundValue}
                        onChange={setCardBackground}
                      />

                      {/* Per device, like Block Width and Card Height. The
                          padding that suits a three-column desktop grid is a lot
                          of room to give up on a phone, and this was one flat
                          value for every screen. The switch is the editor's own
                          preview device, so it is the same one the other panels
                          use. */}
                      <PanelRow>
                        <Label mt="0">
                          {__("Device:", "b-testimonials-block")}
                        </Label>
                        <Device className="" />
                      </PanelRow>

                      <BoxControl
                        label={__("Padding", "b-testimonials-block")}
                        values={boxForDevice(padding, device)}
                        onChange={(val) =>
                          setAttributes({
                            padding: setBoxForDevice(padding, device, val),
                          })
                        }
                        resetValues={{
                          top: "5px",
                          right: "10px",
                          bottom: "5px",
                          left: "10px",
                        }}
                        units={[pxUnit(3), emUnit(2)]}
                      />

                      <BorderControl
                        className=""
                        label={__("Border", "b-testimonials-block")}
                        value={cardBorderValue}
                        onChange={setCardBorder}
                      />

                      <ShadowControl
                        label={__("Shadow:", "sound-cloud")}
                        value={shadow}
                        onChange={(val) => setAttributes({ shadow: val })}
                        produce={produce}
                      />
                    </PanelBody>
                  )}

                  {controls.image && rendersPart("img") && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Image", "b-testimonials-block")}
                      initialOpen={false}>
                      {/* Shares the device switch with the Layout and Width &
                          Height panels, so the device being edited does not
                          differ between them. */}
                      <PanelRow>
                        <Label mt="0">
                          {__("Device:", "b-testimonials-block")}
                        </Label>
                        <Device className="" />
                      </PanelRow>

                      <PanelRow>
                        <NumberControl
                          className="mt10"
                          label={__("Width:", "b-testimonials-block")}
                          labelPosition="left"
                          value={imageSize("width", device)}
                          onChange={(val) => setImageSize("width", val)}
                        />

                        <NumberControl
                          className="mt10"
                          label={__("Height:", "b-testimonials-block")}
                          labelPosition="left"
                          value={imageSize("height", device)}
                          onChange={(val) => setImageSize("height", val)}
                        />
                      </PanelRow>

                      <p className="components-base-control__help">
                        {__(
                          "Leave tablet and mobile empty to follow the desktop size.",
                          "b-testimonials-block",
                        )}
                      </p>
                      {/* Size reaches every layout's avatar; the border rule is
                          still scoped to `.single .img`. On the three layouts
                          that draw their own avatar -- case study, toast, avatar
                          list -- it therefore moved nothing, and widening it
                          would repaint rings those layouts define themselves
                          (the avatar list's `--btb-border` ring, the toast's
                          circle). Hidden there rather than half-working. */}
                      {controls.imageBorder && (
                        <BorderControl
                          className=""
                          label={__("Border", "b-testimonials-block")}
                          value={imgBorder}
                          onChange={(val) => setAttributes({ imgBorder: val })}
                        />
                      )}
                    </PanelBody>
                  )}

                  {controls.nameStyle && rendersPart("name") && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Name", "b-testimonials-block")}
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
                        label={__("Color", "b-testimonials-block")}
                        value={nameColor}
                        onChange={(val) => setAttributes({ nameColor: val })}
                      />
                    </PanelBody>
                  )}

                  {controls.degStyle && rendersPart("deg") && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Designation", "b-testimonials-block")}
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
                        label={__("Color", "b-testimonials-block")}
                        value={degColor}
                        onChange={(val) => setAttributes({ degColor: val })}
                      />

                      {/* The short rule under the designation. Only Theme 1
                            draws one, so showing these anywhere else would be
                            three more controls that move nothing. */}
                      {"theme_1" === theme && (
                        <>
                          <Label className="mt20">
                            {__("Divider", "b-testimonials-block")}
                          </Label>

                          <ColorControl
                            className="mb10"
                            label={__("Color", "b-testimonials-block")}
                            value={degDivider?.color || ""}
                            onChange={(val) =>
                              setAttributes({
                                degDivider: { ...degDivider, color: val },
                              })
                            }
                          />

                          <RangeControl
                            label={__("Thickness", "b-testimonials-block")}
                            value={degDivider?.width}
                            onChange={(val) =>
                              setAttributes({
                                degDivider: { ...degDivider, width: val },
                              })
                            }
                            min={0}
                            max={10}
                            allowReset
                            help={__(
                              "0 removes the divider.",
                              "b-testimonials-block",
                            )}
                          />

                          <RangeControl
                            label={__("Length", "b-testimonials-block")}
                            value={degDivider?.length}
                            onChange={(val) =>
                              setAttributes({
                                degDivider: { ...degDivider, length: val },
                              })
                            }
                            min={0}
                            max={200}
                            allowReset
                          />
                        </>
                      )}
                    </PanelBody>
                  )}

                  {/* The rating colour is written inline by getStar rather than
                      through a selector, so it applies wherever a Themes/* card
                      draws the stars -- including the three layouts whose review
                      text this panel cannot reach. The panel is named for
                      whichever half is left. */}
                  {(hasTextStyle || hasRatingColor) && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={
                        hasTextStyle
                          ? __("Review Text", "b-testimonials-block")
                          : __("Rating", "b-testimonials-block")
                      }
                      initialOpen={false}>
                      {hasTextStyle && (
                        <>
                          <Typography
                            className="mt10"
                            label={__("Typography", "b-testimonials-block")}
                            value={textTypo}
                            onChange={(val) => setAttributes({ textTypo: val })}
                            produce={produce}
                          />

                          <ColorControl
                            className="mb10"
                            label={__("Color", "b-testimonials-block")}
                            value={textColor}
                            onChange={(val) =>
                              setAttributes({ textColor: val })
                            }
                          />
                        </>
                      )}

                      {hasRatingColor && (
                        <ColorControl
                          className="mb10"
                          label={__(
                            "Rating Icon Color",
                            "b-testimonials-block",
                          )}
                          value={starIconColor}
                          onChange={(val) =>
                            setAttributes({ starIconColor: val })
                          }
                        />
                      )}
                    </PanelBody>
                  )}

                  {/* `expandedTypo` was declared here and in Style.js but was
                        only ever used to emit a Google Font link -- nothing
                        selected the font, and nothing styled the button. */}
                  {hasExcerpt && elements?.expandBtn && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Expand / Less Button", "b-testimonials-block")}
                      initialOpen={false}>
                      <Typography
                        className="mt10"
                        label={__("Typography", "b-testimonials-block")}
                        value={expandedTypo}
                        onChange={(val) => setAttributes({ expandedTypo: val })}
                        produce={produce}
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Color", "b-testimonials-block")}
                        value={expandColor}
                        onChange={(val) => setAttributes({ expandColor: val })}
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Hover Color", "b-testimonials-block")}
                        value={expandHoverColor}
                        onChange={(val) =>
                          setAttributes({ expandHoverColor: val })
                        }
                      />
                    </PanelBody>
                  )}

                  {/* The header strip rule is scoped to `.theme_2 .single .top`
                      and the two masonry wrappers, so it needs the theme class
                      on the layout's own wrapper -- which only the layouts in
                      `.layoutSection` put there. */}
                  {controls.topStrip &&
                    (theme === "theme_2" || "masonry" === arrangement) && (
                      <PanelBody
                        className="bPlPanelBody"
                        title={__("Top", "b-testimonials-block")}
                        initialOpen={false}>
                        <ColorControl
                          className="mb10"
                          label={__("Background Color", "b-testimonials-block")}
                          value={grid2Bg}
                          onChange={(val) => setAttributes({ grid2Bg: val })}
                        />

                        <BoxControl
                          label={__("Padding", "b-testimonials-block")}
                          values={grid2Padding}
                          onChange={(val) =>
                            setAttributes({ grid2Padding: val })
                          }
                          resetValues={{
                            top: "10px",
                            right: "10px",
                            bottom: "10px",
                            left: "10px",
                          }}
                          units={[pxUnit(3), emUnit(2)]}
                        />

                        {/* `grid2Border` was declared by the parent block and read
                            by nothing: no control set it and no rule used it, so the
                            header strip could be tinted and padded but never
                            outlined. */}
                        <BorderControl
                          label={__("Border", "b-testimonials-block")}
                          value={grid2Border}
                          onChange={(val) =>
                            setAttributes({ grid2Border: val })
                          }
                        />
                      </PanelBody>
                    )}
                </>
              )}
            </>
          )}
        </TabPanel>
      </InspectorControls>

      {!isSingleItemBlock && (
        <BlockControls>
          <ToolbarGroup className="bPlToolbar">
            <ToolbarButton
              label={__("Add New Item", "b-blocks")}
              onClick={addItem}>
              <Dashicon icon="plus" size={23} />
            </ToolbarButton>
          </ToolbarGroup>
        </BlockControls>
      )}
    </>
  );
};
export default Settings;
