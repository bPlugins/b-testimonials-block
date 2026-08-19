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
import BadgeScorePanel from "./BadgeScorePanel";
import BadgeLogoPanel from "./BadgeLogoPanel";
import ColorsPanel from "./ColorsPanel";
import FaqStylePanel from "./FaqStylePanel";
import GradientBorderPanel from "./GradientBorderPanel";
import ItemCards from "./ItemCards";
import PollStylePanel from "./PollStylePanel";
import PopupModalPanel from "./PopupModalPanel";
import SizeSpacingPanel from "./SizeSpacingPanel";
import SpeechBubblePanel from "./SpeechBubblePanel";
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
import {
  getLayoutControls,
  SCORED_BADGE_LAYOUTS,
  BRAND_LOGO_LAYOUTS,
  TYPO_PANEL_LABELS,
} from "../../../utils/layoutControls";
import { getVisualControls, ROLE_LABELS } from "../../../utils/visualControls";
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
    // Not `degDivider` directly: an untouched value arrives as `[]` rather than
    // `{}` -- block.json's empty-object default becomes an empty PHP array on the
    // way to the client and re-encodes as an array. `[].length` is 0, so the
    // Length slider read itself as 0 while the divider was drawing at the
    // stylesheet's 34px. Normalised where it is read, as Style.js does before
    // emitting the rule.
    degDivider: degDividerRaw = {},
    marquee = {},
    toast = {},
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
    starSize,
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

  // See the note on the destructured name above.
  const degDivider = Array.isArray(degDividerRaw) ? {} : degDividerRaw || {};

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

  const { speed: toastSpeed = 4, pauseOnHover: toastPauseOnHover = false } =
    toast && "object" === typeof toast ? toast : {};

  const {
    autoPlay = true,
    autoPlayDelay = 3,
    mouseWheel = true,
    navigation = true,
    loop = true,
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
    navShadow,
    // The three that were fixed in Slider.js and the stylesheet: how far apart
    // the coverflow pushes its cards, whether Swiper paints its own depth
    // shadows, and how far the side cards fade. All undefined until touched, so
    // each arrangement keeps the look it ships with.
    coverStretch,
    slideShadows = false,
    sideOpacity,
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

  // The Name and Designation panels are two shared roles rather than two card
  // parts, so on the review badges -- where they style a badge heading and a
  // review count -- they are titled for what they actually move. Every other
  // layout falls through to the card's own wording.
  const typoLabels = TYPO_PANEL_LABELS[layout] || {};
  const nameLabel = typoLabels.name || __("Name", "b-testimonials-block");
  const degLabel = typoLabels.deg || __("Designation", "b-testimonials-block");

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
  // Mirroring the two came first and fixed the losing, but two dials over one
  // value is its own problem: clearing from the Colors panel read as a broken
  // reset, and every doc page had to explain both names for one colour. So where
  // this panel renders a Card box the Card control is now the only control --
  // `cardRoles` below is handed to the Colors panel to drop. It still reads the
  // palette role, so it shows what is on screen, and still writes both, so old
  // posts that only carry `background` keep painting and the palette keeps
  // reaching the extra elements the Card rule alone cannot (that thumb ring,
  // those nav buttons).
  //
  // Blocks with their own editor render the Colors panel without a Card panel --
  // the play button on the video block, the before/after labels -- so nothing is
  // excluded there and the palette stays the only home.
  //
  // Border style, side and radius have no palette role at all and stay purely
  // the Card panel's.
  const paletteControls = getVisualControls(layout, attributes);
  const paletteRoles = paletteControls.map((c) => c.attr);
  const ownsSurface = paletteRoles.includes("surfaceColor");
  const ownsBorderColor = paletteRoles.includes("borderColor");
  const ownsBorderWidth = paletteRoles.includes("borderWidth");

  const cardRoles = controls.cardBox
    ? ["surfaceColor", "borderColor", "borderWidth"]
    : [];

  // A role can be named for what it paints on this layout -- the quote box's
  // surface is the start of a gradient, not a flat card back. Taking over the
  // control means taking over that name too, or consolidating would cost the
  // accuracy the palette labels were written for.
  const cardBackgroundLabel =
    ROLE_LABELS[layout]?.surfaceColor ||
    __("Background Color", "b-testimonials-block");

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
      ownsSurface
        ? { background: val, surfaceColor: val }
        : { background: val },
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

  // The palette stores a bare number of pixels; the Border control a CSS length.
  // `parseInt` was reading "2em" as 2 -- and now that this is the only control,
  // a value it mis-parses has nothing left to correct it -- so only a genuine
  // px (or unitless) length syncs.
  const pxLengthOf = (length) => {
    const match = /^\s*(-?[\d.]+)\s*(?:px)?\s*$/.exec(String(length ?? ""));
    return match ? Math.round(parseFloat(match[1])) : null;
  };

  const setCardBorder = (val) => {
    const next = { border: val };

    if (ownsBorderColor) {
      next.borderColor = val?.color;
    }
    if (ownsBorderWidth) {
      // Switching to em clears the palette width rather than leaving the last px
      // figure behind it: a stale `--btb-border-width` would paint the elements
      // only the palette reaches at a width the author has moved off.
      const px = pxLengthOf(val?.width);
      next.borderWidth = null === px ? undefined : px;
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

  // The same consolidation the Card box got, for the four text roles.
  //
  // The Colors panel's Headings, Secondary Text, Body Text and Rating Stars
  // paint the same four elements the Name, Designation and Review Text panels
  // do, and Style.js writes each as `color: var(--btb-title, <nameColor>)` --
  // the role is the value, the panel's own attribute only the fallback. So
  // wherever both were offered the panel's picker was dead from the moment the
  // role had a value, with nothing on screen to say why. Measured on one block
  // with both set: the role won all four, and 17 blocks offered at least one
  // such pair.
  //
  // Resolved the way the card was -- the panel keeps the control, the role is
  // dropped from the Colors panel, and the control writes both. Writing both is
  // what keeps the variable reaching the elements no per-part rule names, and
  // what keeps a post saved with only the old attribute painting.
  //
  // Each pair is taken over only where the panel is actually on screen AND the
  // layout offers the role; otherwise the Colors panel stays its only home, the
  // same way it does for a block with its own editor and no Card panel.
  const textRoleOwners = [
    {
      role: "titleColor",
      attr: "nameColor",
      shown: controls.nameStyle && rendersPart("name"),
    },
    {
      role: "mutedColor",
      attr: "degColor",
      shown: controls.degStyle && rendersPart("deg"),
    },
    { role: "bodyColor", attr: "textColor", shown: hasTextStyle },
    { role: "ratingColor", attr: "starIconColor", shown: hasRatingColor },
  ].filter((pair) => pair.shown && paletteRoles.includes(pair.role));

  const textRoles = textRoleOwners.map((pair) => pair.role);
  const ownsRole = (role) => textRoles.includes(role);

  // Reads the role while it has a value, so the control shows what is actually
  // on screen; falls back to the panel's own attribute for posts saved before
  // the role existed, and for layouts where the role was never offered.
  const textColorValue = (role, own) =>
    ownsRole(role) && isSet(attributes[role]) ? attributes[role] : own;

  const setTextColor = (role, attr) => (val) =>
    setAttributes(
      ownsRole(role) ? { [attr]: val, [role]: val } : { [attr]: val },
    );

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
  const showColumnGap =
    controls.gaps && !COLUMN_GAP_INERT.includes(arrangement);
  const showRowGap = controls.gaps && !ROW_GAP_INERT.includes(arrangement);

  // The Layout panel is empty unless at least one of its four controls applies.
  // The three grid controls are counted as what the arrangement can actually
  // use, so a layout left with none of them and no Arrangement or Theme select
  // gets no empty panel.
  const hasLayoutPanel =
    canArrange || controls.theme || showColumns || showColumnGap || showRowGap;

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
    const perDevice =
      value && "object" === typeof value ? value : { desktop: value };

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
                        onChange={(val) =>
                          setAttributes({
                            dataSource: val,
                          })
                        }
                      />

                      {"cpt" === dataSource && (
                        <>
                          <RangeControl
                            label={__("Number", "b-testimonials-block")}
                            value={query?.number || 6}
                            onChange={(val) =>
                              setAttributes({
                                query: {
                                  ...query,
                                  number: val,
                                },
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
                                query: {
                                  ...query,
                                  orderBy: val,
                                },
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
                              setAttributes({
                                query: {
                                  ...query,
                                  order: val,
                                },
                              })
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

                    // Every control below carries an `mt*` class on purpose.
                    //
                    // bpl-tools sets `.components-base-control { margin-bottom:
                    // 0 !important }`, so a WordPress control contributes no
                    // spacing of its own here and each call site has to supply
                    // its own top margin. The layout-specific rows under each
                    // panel asked for `mt5`, half the `mt10` the rest of this
                    // file uses -- and a control with no `help` line has nothing
                    // else to space it, so a field and the next field's label
                    // ended up 5px apart while the ones with help looked fine.
                    // The poll's Low and High Scale Label pair was the clearest
                    // case. `mt10` throughout, so the rhythm does not depend on
                    // whether a given field happens to carry help text.

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
                              setAttributes({
                                badgeTitle: val,
                              })
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
                              setAttributes({
                                badgeDesc: val,
                              })
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
                              setAttributes({
                                badgeScore: val,
                              })
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
                              setAttributes({
                                badgeCount: val,
                              })
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
                              className="mt10"
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
                              className="mt10"
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
                              className="mt10"
                              label={__(
                                "Low Scale Label",
                                "b-testimonials-block",
                              )}
                              value={attributes.lowLabel ?? "Not likely"}
                              onChange={(val) =>
                                setAttributes({
                                  lowLabel: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__(
                                "High Scale Label",
                                "b-testimonials-block",
                              )}
                              value={attributes.highLabel ?? "Very likely"}
                              onChange={(val) =>
                                setAttributes({
                                  highLabel: val,
                                })
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
                              className="mt10"
                              label={__("5-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star5Count ?? ""}
                              onChange={(val) =>
                                setAttributes({
                                  star5Count: val,
                                })
                              }
                              help={__(
                                "Overrides automatic count from items",
                                "b-testimonials-block",
                              )}
                            />
                            <TextControl
                              className="mt10"
                              label={__("4-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star4Count ?? ""}
                              onChange={(val) =>
                                setAttributes({
                                  star4Count: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__("3-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star3Count ?? ""}
                              onChange={(val) =>
                                setAttributes({
                                  star3Count: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__("2-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star2Count ?? ""}
                              onChange={(val) =>
                                setAttributes({
                                  star2Count: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__("1-Star Count", "b-testimonials-block")}
                              type="number"
                              value={attributes.star1Count ?? ""}
                              onChange={(val) =>
                                setAttributes({
                                  star1Count: val,
                                })
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
                              className="mt10"
                              label={__(
                                "Column 1 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col1Header ?? "Customer"}
                              onChange={(val) =>
                                setAttributes({
                                  col1Header: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__(
                                "Column 2 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col2Header ?? "Rating"}
                              onChange={(val) =>
                                setAttributes({
                                  col2Header: val,
                                })
                              }
                            />
                            <TextControl
                              className="mt10"
                              label={__(
                                "Column 3 Header",
                                "b-testimonials-block",
                              )}
                              value={attributes.col3Header ?? "Review"}
                              onChange={(val) =>
                                setAttributes({
                                  col3Header: val,
                                })
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
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "4px",
                                    }}>
                                    <Button
                                      isSmall
                                      variant="secondary"
                                      onClick={() => {
                                        const newItems = [
                                          ...items.slice(0, rowIdx + 1),
                                          {
                                            ...items[rowIdx],
                                          },
                                          ...items.slice(rowIdx + 1),
                                        ];
                                        setAttributes({
                                          items: newItems,
                                        });
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
                                          setAttributes({
                                            items: newItems,
                                          });
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
                                  className="mt10"
                                  label={__(
                                    "Customer Name",
                                    "b-testimonials-block",
                                  )}
                                  value={rowItem.name ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[rowIdx].name = val;
                                    });
                                    setAttributes({
                                      items: newItems,
                                    });
                                  }}
                                />

                                <NumberControl
                                  className="mt10"
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
                                    setAttributes({
                                      items: newItems,
                                    });
                                  }}
                                  min={1}
                                  max={5}
                                />

                                <TextareaControl
                                  className="mt10"
                                  label={__(
                                    "Review / Content",
                                    "b-testimonials-block",
                                  )}
                                  value={rowItem.reviewText ?? ""}
                                  onChange={(val) => {
                                    const newItems = produce(items, (draft) => {
                                      draft[rowIdx].reviewText = val;
                                    });
                                    setAttributes({
                                      items: newItems,
                                    });
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
                                setAttributes({
                                  items: newItems,
                                });
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
                            {/* Was one expanded box per question. A FAQ block is
                                the one most likely to run to a dozen entries, so
                                it gained the most from the selector. */}
                            <ItemCards
                              items={items}
                              onChange={(next) =>
                                setAttributes({
                                  items: next,
                                })
                              }
                              newItem={{
                                name: "What is your refund policy?",
                                reviewText:
                                  "We offer a 30-day money-back guarantee with no questions asked.",
                                deg: "Customer Support",
                              }}
                              itemLabel={__("FAQ", "b-testimonials-block")}
                              label={__(
                                "FAQ Questions & Answers:",
                                "b-testimonials-block",
                              )}
                              addLabel={__(
                                "Add New Question",
                                "b-testimonials-block",
                              )}>
                              {(faqItem, faqIdx, update) => (
                                <>
                                  <TextControl
                                    label={__(
                                      "Question Text",
                                      "b-testimonials-block",
                                    )}
                                    value={faqItem.name ?? ""}
                                    onChange={(val) => update("name", val)}
                                  />
                                  <TextareaControl
                                    label={__(
                                      "Answer Content",
                                      "b-testimonials-block",
                                    )}
                                    value={faqItem.reviewText ?? ""}
                                    onChange={(val) =>
                                      update("reviewText", val)
                                    }
                                  />
                                  <TextControl
                                    label={__(
                                      "Author / Subtext (Optional)",
                                      "b-testimonials-block",
                                    )}
                                    value={faqItem.deg ?? ""}
                                    onChange={(val) => update("deg", val)}
                                  />
                                </>
                              )}
                            </ItemCards>
                          </>
                        )}
                        {/*
                          The avatar list had a second editor here -- "Avatar
                          Testimonial Items", every item expanded, with its own
                          Add and Remove. It edited the same `items` array, with
                          the same four fields, as the "Add or Remove Testimonial
                          Cards" panel above: that block is not in
                          singleItemBlocks, so it always got both. Two editors for
                          one array, and the one below drew a fifth Add button on a
                          panel that already had one.

                          Removed rather than kept in sync. Nothing is lost -- the
                          panel above edits image, name, designation and review
                          text through the card selector, which is the same UI in
                          less space.
                        */}
                        {/*
                          The stacked cards' own editor stood here and never once
                          rendered. It sits inside the panel that returns null
                          unless `fieldLabels[layout]` exists, and
                          testimonials-card-stack is the one entry in
                          singleItemBlocks with no fieldLabels entry -- so the
                          panel bailed before reaching it. Measured on the block:
                          the sidebar offered Select / Switch Block, Elements,
                          Excerpt & Expand, Layout, Autoplay and Advanced, and
                          nothing at all for adding, removing or editing a card.

                          Dropping the block from singleItemBlocks hands it the
                          shared card panel instead, which is the right editor for
                          it: the fields there are gated by rendersPart, so it
                          shows name, designation and review text and leaves out
                          the parts this layout does not draw. A stack of
                          testimonials was never a single-item block.
                        */}
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
                          <div className="btb-card-selector-list mb15">
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
                                  {__("Audio File:", "b-testimonials-block")}
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
                              label={__("Name", "b-testimonials-block")}
                              value={name}
                              onChange={(val) => updateItem("name", val)}
                            />

                            <TextControl
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
                                          ? {
                                              ...sec,
                                              [field]: val,
                                            }
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
                                      {
                                        title: "New Section",
                                        content: "",
                                      },
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
                                            className="mt10"
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
                                            className="mt10"
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
                              <PanelRow className="itemAction mb15">
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
                            label={__("Excerpt length", "b-testimonials-block")}
                            value={textLength}
                            onChange={(val) =>
                              setAttributes({
                                textLength: val,
                              })
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
                              setAttributes({
                                arrangement: val,
                              })
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
                                columns: {
                                  ...columns,
                                  [device]: val,
                                },
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
                          onChange={(val) =>
                            setAttributes({
                              columnGap: val,
                            })
                          }
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
                          onChange={(val) =>
                            setAttributes({
                              rowGap: val,
                            })
                          }
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
                            setAttributes({
                              pauseInEditor: val,
                            })
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

                      {/* Looping was hardcoded on in Slider.js with no way to
                            turn it off. On by default, so an existing block is
                            unchanged. */}
                      <ToggleControl
                        className="mt10"
                        label={__("Loop", "b-testimonials-block")}
                        labelPosition="left"
                        checked={loop}
                        help={__(
                          "Runs the slider in a continuous circle. Off shows each review once and rewinds to the first, and the arrows dim at each end.",
                          "b-testimonials-block",
                        )}
                        onChange={(val) => updateObject("slider", "loop", val)}
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

                          {/* The arrow is a raised surface button by default --
                              it carries a drop shadow so it reads as a control
                              floating over the card edge it overlaps. That shadow
                              was the one part of it with no control, so an author
                              who wanted a flat arrow had no way to ask for one.
                              Left undefined until touched, like the rest of these,
                              so the stylesheet's own shadow stands. */}
                          <ShadowControl
                            className="mt20"
                            label={__("Arrow Shadow:", "b-testimonials-block")}
                            value={navShadow}
                            onChange={(val) =>
                              updateObject("slider", "navShadow", val)
                            }
                            produce={produce}
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

                          {/* Column Gap is hidden for these two arrangements --
                              a real gap holds the side cards away from the
                              centre one and flattens the effect -- so this is
                              the spacing control a coverflow actually has.
                              Swiper applies it along the track before the
                              rotation, which moves the cards apart without
                              breaking the overlap the effect is made of. It was
                              fixed at 0. */}
                          <RangeControl
                            className="mt20"
                            label={__("Card Spread", "b-testimonials-block")}
                            value={coverStretch}
                            onChange={(val) =>
                              updateObject("slider", "coverStretch", val)
                            }
                            min={-120}
                            max={200}
                            step={5}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "Pushes the side cards outward. Negative values stack them tighter.",
                              "b-testimonials-block",
                            )}
                          />

                          {/* The stylesheet dims the flat slider's neighbours
                              to 75% but deliberately leaves these two alone,
                              because washing out a rotated card is most of what
                              made the side cards read as grey slivers. That
                              left no way to dim them at all, which is the wrong
                              answer on a pale card over a pale page. */}
                          <RangeControl
                            label={__(
                              "Side Card Opacity (%)",
                              "b-testimonials-block",
                            )}
                            value={sideOpacity}
                            onChange={(val) =>
                              updateObject("slider", "sideOpacity", val)
                            }
                            min={10}
                            max={100}
                            step={5}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "Fades the cards either side of the active one. 100% leaves them solid.",
                              "b-testimonials-block",
                            )}
                          />

                          {/* Swiper's own coverflow shading, which used to be
                              hardcoded off: it fills the whole slide box, and
                              on Theme 1 and Theme 4 the slide is taller than
                              the card so the shadow showed above it as a grey
                              rectangle. The stylesheet insets the overlay by
                              that headroom now, so the option can be offered.
                              Still off by default -- the cards carry their own
                              shadow from the Card panel. */}
                          <ToggleControl
                            className="mt20"
                            label={__("Slide shadows", "b-testimonials-block")}
                            checked={!!slideShadows}
                            onChange={(val) =>
                              updateObject("slider", "slideShadows", val)
                            }
                            help={__(
                              "Shades the side cards as they rotate away, on top of the card's own shadow.",
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
                          setAttributes({
                            pauseInEditor: val,
                          })
                        }
                        help={__(
                          "Editor only, so cards hold still while you style them. The marquee keeps scrolling on your site.",
                          "b-testimonials-block",
                        )}
                      />
                    </PanelBody>
                  )}

                  {/* The toast rotates through the reviews on a timer, and that
                      timer was a bare 4000 in Layout.js -- the one setting a
                      live-notification block is really made of. */}
                  {"social-proof-toast" === layout && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Notification", "b-testimonials-block")}
                      initialOpen={false}>
                      <RangeControl
                        label={__(
                          "Rotation Interval (seconds)",
                          "b-testimonials-block",
                        )}
                        value={toastSpeed}
                        onChange={(val) => updateObject("toast", "speed", val)}
                        min={1}
                        max={60}
                        step={1}
                        allowReset
                        resetFallbackValue={4}
                        help={__(
                          "How long each review stays up before the next one.",
                          "b-testimonials-block",
                        )}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Pause on hover", "b-testimonials-block")}
                        labelPosition="left"
                        checked={toastPauseOnHover}
                        onChange={(val) =>
                          updateObject("toast", "pauseOnHover", val)
                        }
                        help={__(
                          "Holds the current review while the pointer is over it, so it can be read.",
                          "b-testimonials-block",
                        )}
                      />

                      {/* The same escape hatch the Slider and Marquee panels
                          offer. The rotation now runs on the canvas, which is
                          what the block is; this is for styling one particular
                          review without it cycling away mid-edit. Selecting a
                          card in the Reviews panel also jumps the preview to it. */}
                      <ToggleControl
                        className="mt10"
                        label={__("Pause while editing", "b-testimonials-block")}
                        labelPosition="left"
                        checked={pauseInEditor}
                        onChange={(val) =>
                          setAttributes({
                            pauseInEditor: val,
                          })
                        }
                        help={__(
                          "Holds the notification on the card you have selected, on the canvas only. The published page keeps cycling.",
                          "b-testimonials-block",
                        )}
                      />
                    </PanelBody>
                  )}

                  {/* Both of these are what a reader expects an accordion to do,
                      and neither existed: the rows were plain `<details>` with no
                      group and no initial state, so every one could be open at
                      once and none opened on load. */}
                  {"faq-testimonial-accordion" === layout && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Accordion", "b-testimonials-block")}
                      initialOpen={false}>
                      <ToggleControl
                        label={__("One at a time", "b-testimonials-block")}
                        labelPosition="left"
                        checked={!!attributes.faqExclusive}
                        onChange={(val) =>
                          setAttributes({
                            faqExclusive: val,
                          })
                        }
                        help={__(
                          "Opening a row closes the others. Uses the browser's own accordion grouping, so an older browser simply leaves them independent.",
                          "b-testimonials-block",
                        )}
                      />

                      <ToggleControl
                        className="mt10"
                        label={__("Open first row", "b-testimonials-block")}
                        labelPosition="left"
                        checked={!!attributes.faqFirstOpen}
                        onChange={(val) =>
                          setAttributes({
                            faqFirstOpen: val,
                          })
                        }
                        help={__(
                          "The first answer starts expanded. A reader can still close it.",
                          "b-testimonials-block",
                        )}
                      />
                    </PanelBody>
                  )}

                  {/* The stack had next/prev buttons, dots and drag-to-swipe, but
                      no way to advance on its own -- the only multi-item layout
                      that moves and had no autoplay. */}
                  {"testimonials-card-stack" === layout && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={__("Autoplay", "b-testimonials-block")}
                      initialOpen={false}>
                      <ToggleControl
                        label={__("Autoplay", "b-testimonials-block")}
                        labelPosition="left"
                        checked={!!attributes.stackAutoPlay}
                        onChange={(val) =>
                          setAttributes({
                            stackAutoPlay: val,
                          })
                        }
                        help={__(
                          "Advances the deck on its own, and pauses while the pointer is over it. Editor stays still so you can style it.",
                          "b-testimonials-block",
                        )}
                      />

                      {attributes.stackAutoPlay && (
                        <RangeControl
                          className="mt20"
                          label={__("Delay (seconds)", "b-testimonials-block")}
                          value={attributes.stackAutoPlayDelay}
                          onChange={(val) =>
                            setAttributes({
                              stackAutoPlayDelay: val,
                            })
                          }
                          min={1}
                          max={30}
                          step={1}
                          allowReset
                          resetFallbackValue={5}
                        />
                      )}
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
                    exclude={[...cardRoles, ...textRoles]}
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

                  {/* The poll is the layout `layoutControls.js` gives an empty
                      entry -- no shared panel below reaches it -- so every size
                      it renders was fixed in the stylesheet with nothing in the
                      sidebar to change it. */}
                  {"user-feedback-poll" === layout && (
                    <PollStylePanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

                  {/* The FAQ layout is denied the Card panel so the [open] row
                      keeps its accent border -- which had also withheld the
                      radius, background, shadow, gap and padding that border
                      colour has nothing to do with. */}
                  {"faq-testimonial-accordion" === layout && (
                    <FaqStylePanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

                  {/* Gated on the attribute rather than on the layout: the
                      Gradient Border Grid's layout is `default`, the same value
                      the plain grid carries, so there is nothing in `layout` to
                      tell them apart. Only that block declares this one. */}
                  {undefined !== attributes.gradientBorder && (
                    <GradientBorderPanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

                  {/* The tail's size, position and colours. Gated on the
                      attribute on the same terms as the panel above -- the
                      Speech Bubble Cards block is the only one that declares
                      it, and no other layout draws a tail for it to move. */}
                  {undefined !== attributes.bubbleTail && (
                    <SpeechBubblePanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

                  {/* The popup a trigger card opens. Everything else on this tab
                      styles the cards in the grid; until the modal's inline
                      styles were moved into the stylesheet, nothing reached the
                      popup itself. */}
                  {"testimonials-popup-modal" === layout && (
                    <PopupModalPanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

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
                        label={cardBackgroundLabel}
                        value={cardBackgroundValue}
                        onChange={setCardBackground}
                      />
                      {/* The corner tint over that colour.
                          A radial gradient of the Accent at the top-left, which
                          deepens on hover -- so it reads as a hover effect that
                          cannot be switched off. It had no control of any kind:
                          not the colour, not the strength, and no way to remove
                          it and leave the flat Background Color above. */}
                      <ToggleControl
                        label={__("Corner wash", "b-testimonials-block")}
                        checked={!!attributes.cardWash}
                        onChange={(val) => setAttributes({ cardWash: val })}
                        help={__(
                          "A tint in the card's top-left corner that deepens on hover. Off leaves the Background Color flat.",
                          "b-testimonials-block",
                        )}
                      />

                      {attributes.cardWash && (
                        <>
                          <RangeControl
                            className="mt10"
                            label={__("Wash Strength (%)", "b-testimonials-block")}
                            value={attributes.cardWashStrength}
                            onChange={(val) =>
                              setAttributes({ cardWashStrength: val })
                            }
                            min={0}
                            max={300}
                            step={5}
                            allowReset
                            resetFallbackValue={100}
                          />

                          {/* Empty follows the Accent colour, which is what the
                              wash has always been mixed from. */}
                          <ColorControl
                            className="mt10 mb10"
                            label={__("Wash Color", "b-testimonials-block")}
                            value={attributes.cardWashColor}
                            onChange={(val) =>
                              setAttributes({ cardWashColor: val })
                            }
                          />
                        </>
                      )}

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
                        onChange={(val) =>
                          setAttributes({
                            shadow: val,
                          })
                        }
                        produce={produce}
                      />

                      {/* Hover.
                          The cards already lift and deepen their wash on hover,
                          but none of it could be changed: the wash is derived
                          from Accent, and the stylesheet could not offer a hover
                          background, border or shadow at all -- as the comment on
                          that rule says, the Card panel emits all three at ID
                          specificity, so a `:hover` rule in frontend.scss lost to
                          the resting state every time. Emitted from Style.js
                          instead, where it wins.

                          Every one is empty until set, so a card nobody has
                          touched keeps exactly the lift-and-wash it has today. */}
                      <hr />

                      <Label>{__("Hover:", "b-testimonials-block")}</Label>

                      <ColorControl
                        className="mt10 mb10"
                        label={__("Background Color", "b-testimonials-block")}
                        value={attributes.cardHoverBg}
                        onChange={(val) => setAttributes({ cardHoverBg: val })}
                      />

                      {/* Colour only. Width, style and radius would have to match
                          the resting border to avoid the card resizing under the
                          pointer, so they stay the Border control's above. */}
                      <ColorControl
                        className="mb10"
                        label={__("Border Color", "b-testimonials-block")}
                        value={attributes.cardHoverBorderColor}
                        onChange={(val) =>
                          setAttributes({ cardHoverBorderColor: val })
                        }
                      />

                      <ShadowControl
                        label={__("Shadow:", "b-testimonials-block")}
                        value={attributes.cardHoverShadow}
                        onChange={(val) =>
                          setAttributes({ cardHoverShadow: val })
                        }
                        produce={produce}
                      />

                      {/* 0 is a real choice -- it holds the card still, which is
                          the only way to turn the lift off. */}
                      <RangeControl
                        className="mt10"
                        label={__("Lift (px)", "b-testimonials-block")}
                        value={attributes.cardHoverLift}
                        onChange={(val) => setAttributes({ cardHoverLift: val })}
                        min={0}
                        max={24}
                        step={1}
                        allowReset
                        resetFallbackValue={3}
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
                          onChange={(val) =>
                            setAttributes({
                              imgBorder: val,
                            })
                          }
                        />
                      )}
                      {/* The tinted halo outside the border above.
                          It is a `box-shadow`, not a border -- the Border control
                          owns that -- and it had no control at all: a fixed 3px
                          of the Accent at 18% alpha, with no way to recolour,
                          resize or remove it. Same gate as the Border, since the
                          rule behind it names the same element. */}
                      {controls.imageBorder && (
                        <>
                          <ToggleControl
                            className="mt10"
                            label={__("Outer ring", "b-testimonials-block")}
                            checked={!!attributes.avatarRing}
                            onChange={(val) =>
                              setAttributes({ avatarRing: val })
                            }
                            help={__(
                              "A soft halo just outside the avatar's border.",
                              "b-testimonials-block",
                            )}
                          />

                          {attributes.avatarRing && (
                            <>
                              <RangeControl
                                className="mt10"
                                label={__("Ring Width (px)", "b-testimonials-block")}
                                value={attributes.avatarRingWidth}
                                onChange={(val) =>
                                  setAttributes({ avatarRingWidth: val })
                                }
                                min={0}
                                max={20}
                                step={1}
                                allowReset
                                resetFallbackValue={3}
                              />

                              {/* Empty follows the Accent colour at the alpha it
                                  ships with, which is what it has always done. */}
                              <ColorControl
                                className="mt10 mb10"
                                label={__("Ring Color", "b-testimonials-block")}
                                value={attributes.avatarRingColor}
                                onChange={(val) =>
                                  setAttributes({ avatarRingColor: val })
                                }
                              />
                            </>
                          )}
                        </>
                      )}
                    </PanelBody>
                  )}

                  {controls.nameStyle && rendersPart("name") && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={nameLabel}
                      initialOpen={false}>
                      <Typography
                        className="mt10"
                        label={__("Typography", "b-testimonials-block")}
                        value={nameTypo}
                        onChange={(val) =>
                          setAttributes({
                            nameTypo: val,
                          })
                        }
                        produce={produce}
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Color", "b-testimonials-block")}
                        value={textColorValue("titleColor", nameColor)}
                        onChange={setTextColor("titleColor", "nameColor")}
                      />
                    </PanelBody>
                  )}

                  {controls.degStyle && rendersPart("deg") && (
                    <PanelBody
                      className="bPlPanelBody"
                      title={degLabel}
                      initialOpen={false}>
                      <Typography
                        className="mt10"
                        label={__("Typography", "b-testimonials-block")}
                        value={degTypo}
                        onChange={(val) =>
                          setAttributes({
                            degTypo: val,
                          })
                        }
                        produce={produce}
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Color", "b-testimonials-block")}
                        value={textColorValue("mutedColor", degColor)}
                        onChange={setTextColor("mutedColor", "degColor")}
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
                                degDivider: {
                                  ...degDivider,
                                  color: val,
                                },
                              })
                            }
                          />

                          <RangeControl
                            label={__("Thickness", "b-testimonials-block")}
                            value={degDivider?.width}
                            onChange={(val) =>
                              setAttributes({
                                degDivider: {
                                  ...degDivider,
                                  width: val,
                                },
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
                                degDivider: {
                                  ...degDivider,
                                  length: val,
                                },
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

                  {/* Straight after Badge Title and Review Count, which are the
                      other two lines of the same widget. Absent on the Verified
                      Buyer seal, the one badge that renders no score. */}
                  {SCORED_BADGE_LAYOUTS.includes(layout) && (
                    <BadgeScorePanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
                  )}

                  {/* Only the five whose mark is a fixed trademark. The other
                      two badges draw a real icon slot, so their size is the
                      Icon panel's Icon Size. */}
                  {BRAND_LOGO_LAYOUTS.includes(layout) && (
                    <BadgeLogoPanel
                      attributes={attributes}
                      setAttributes={setAttributes}
                    />
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
                            onChange={(val) =>
                              setAttributes({
                                textTypo: val,
                              })
                            }
                            produce={produce}
                          />

                          <ColorControl
                            className="mb10"
                            label={__("Color", "b-testimonials-block")}
                            value={textColorValue("bodyColor", textColor)}
                            onChange={setTextColor("bodyColor", "textColor")}
                          />
                        </>
                      )}

                      {hasRatingColor && (
                        <>
                          <ColorControl
                            className="mb10"
                            label={__(
                              "Rating Icon Color",
                              "b-testimonials-block",
                            )}
                            value={textColorValue("ratingColor", starIconColor)}
                            onChange={setTextColor(
                              "ratingColor",
                              "starIconColor",
                            )}
                          />

                          {/* The colour has always been here; the size never
                              was. `getStar` renders the star as an inline SVG
                              with `width="15px" height="15px"` written on the
                              element, so the size lived in the icon markup
                              rather than in any attribute -- the one dimension
                              of a rating an author is most likely to want.

                              Left empty rather than defaulted to 15: the layouts
                              do not agree on a star size to begin with (the
                              compact card sizes its own at 14px), so a default
                              here would quietly resize several of them. */}
                          <RangeControl
                            className="mb10"
                            label={__(
                              "Rating Icon Size (px)",
                              "b-testimonials-block",
                            )}
                            value={starSize}
                            onChange={(val) =>
                              setAttributes({
                                starSize: val,
                              })
                            }
                            min={8}
                            max={48}
                            step={1}
                            allowReset
                            resetFallbackValue={undefined}
                            help={__(
                              "Leave empty to keep each layout's own star size.",
                              "b-testimonials-block",
                            )}
                          />
                        </>
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
                        onChange={(val) =>
                          setAttributes({
                            expandedTypo: val,
                          })
                        }
                        produce={produce}
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Color", "b-testimonials-block")}
                        value={expandColor}
                        onChange={(val) =>
                          setAttributes({
                            expandColor: val,
                          })
                        }
                      />

                      <ColorControl
                        className="mb10"
                        label={__("Hover Color", "b-testimonials-block")}
                        value={expandHoverColor}
                        onChange={(val) =>
                          setAttributes({
                            expandHoverColor: val,
                          })
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
                        title={__("Header Strip", "b-testimonials-block")}
                        initialOpen={false}>
                        <ColorControl
                          className="mb10"
                          label={__("Background Color", "b-testimonials-block")}
                          value={grid2Bg}
                          onChange={(val) =>
                            setAttributes({
                              grid2Bg: val,
                            })
                          }
                        />

                        <BoxControl
                          label={__("Padding", "b-testimonials-block")}
                          values={grid2Padding}
                          onChange={(val) =>
                            setAttributes({
                              grid2Padding: val,
                            })
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
                            setAttributes({
                              grid2Border: val,
                            })
                          }
                        />

                        {/* The wash painted over the colour above.
                            Without these two the Background Color moved and the
                            accent tint on top of it did not, so the strip read as
                            though it had no colour control at all. They used to
                            live in the Gradient Border Grid's own panel, which
                            left every other Theme 2 layout -- the coverflow
                            carousel among them -- with a fixed wash. */}
                        <ToggleControl
                          className="mt10"
                          label={__("Accent wash", "b-testimonials-block")}
                          checked={!!attributes.headerWash}
                          onChange={(val) =>
                            setAttributes({ headerWash: val })
                          }
                          help={__(
                            "A gradient of the Accent color over the strip. Off leaves the Background Color on its own.",
                            "b-testimonials-block",
                          )}
                        />

                        {attributes.headerWash && (
                          <RangeControl
                            className="mt10"
                            label={__("Wash Strength (%)", "b-testimonials-block")}
                            value={attributes.headerWashStrength}
                            onChange={(val) =>
                              setAttributes({ headerWashStrength: val })
                            }
                            min={0}
                            max={300}
                            step={5}
                            allowReset
                            resetFallbackValue={100}
                            help={__(
                              "100% is the shipped tint. Lower lets the Background Color through; higher deepens it.",
                              "b-testimonials-block",
                            )}
                          />
                        )}
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
