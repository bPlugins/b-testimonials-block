import { getBoxValue } from "../../../../../bpl-tools/utils/functions";
import {
  getBorderCSS,
  getBoxCSS,
  getShadowCSS,
  getTypoCSS,
} from "../../../../../bpl-tools/utils/getCSS";
import {
  mobileBreakpoint,
  tabBreakpoint,
} from "../../../../../bpl-tools/utils/data";
import { getPaletteCSS } from "../../utils/visualControls";
import { ownBoxForDevice } from "../../utils/responsiveBox";
import { resolveArrangement } from "../../utils/layoutFeatures";

const Style = ({ attributes = {}, clientId }) => {
  const {
    layout = "default",
    ratingColor = "",
    columnGap = "30px",
    rowGap = "40px",
    background = "#0000",
    padding = {},
    border = {},
    shadow = {},
    image = { width: 50, height: 50 },
    imgBorder = {},
    nameTypo = {},
    nameColor = "#000",
    degTypo = {},
    degColor = "#7B7B7B",
    textTypo = {},
    textColor = "#000",
    expandedTypo = {},
    expandColor = "",
    expandHoverColor = "",
    grid2Bg = "#f9f8f8",
    grid2Padding = {},
    grid2Border = {},
    starIconColor = "#FF8C02",
    slider = {},
    blockWidth = {},
    cardHeight = {},
    cardMargin = {},
    blockMargin = {},
    blockAlign = "",
    degDivider = {},
    labelTypo = {},
    labelColor = "",
    inputTypo = {},
    inputColor = "",
    placeholderColor = "",
    inputFocusColor = "",
    inputRadius = "",
    inputPadding = {},
    textareaHeight = "",
    btnBg = "",
    btnHoverBg = "",
    btnColor = "",
    btnHoverColor = "",
    btnTypo = {},
    btnPadding = {},
    btnRadius = "",
    btnWidth = "auto",
    btnAlign = "start",
    pollTitleTypo = {},
    pollDescTypo = {},
    pollLabelTypo = {},
    pollBtnTypo = {},
    pollBtnColor = "",
    pollBtnActiveColor = "",
    pollBtnSize = "",
    pollBtnRadius = "",
    pollBtnGap = "",
    pollPadding = {},
    pollShadow = {},
    pollBtnShadow = {},
    pollRadius = "",
    gradientBorder = false,
    gradientFrom = "#0575e6",
    gradientTo = "#7b2ff7",
    gradientAngle = 135,
    gradientWidth = 3,
    showStarBadge = false,
    starBadgeBg = "",
    starBadgeColor = "",
    starBadgePosition = "top-right",
    starBadgeSize = "",
    starBadgeRadius = "",
    headerWash = true,
    headerWashStrength = 100,
    bubbleTail = true,
    bubbleTailSize = 12,
    bubbleTailOffset = 30,
    bubbleTailAlign = "left",
    bubbleTailFill = "",
    bubbleTailLine = "",
    badgeScoreTypo = {},
    badgeStarsSize = "",
    badgeLogoSize = "",
    starSize = "",
    modalOverlayColor = "",
    modalOverlayBlur = "",
    modalBg = "",
    modalWidth = "",
    modalPadding = {},
    modalRadius = "",
    modalCloseSize = "",
    modalCloseColor = "",
    modalAvatarSize = "",
    modalNameSize = "",
    modalDegSize = "",
    modalStarsSize = "",
    cardWash = true,
    cardWashStrength = 100,
    cardWashColor = "",
    avatarRing = true,
    avatarRingWidth = 3,
    avatarRingColor = "",
    faqRadius = "",
    faqRowGap = "",
    faqBg = "",
    faqShadow = {},
    faqQuestionPadding = {},
    faqAnswerPadding = {},
    cardHoverBg = "",
    cardHoverBorderColor = "",
    cardHoverShadow = {},
    cardHoverLift = "",
    badgeTitleTypo = {},
    badgeSubtitleTypo = {},
    badgeIconSize = "",
    badgeIconGap = "",
    badgePadding = {},
    badgeRadius = "",
    badgeShadow = {},
    modalReviewSize = "",
  } = attributes || {};

  // Declared here rather than beside the first thing that used it.
  //
  // It is a `const`, so every use above its old declaration sat in the temporal
  // dead zone -- and `isSet` is the natural helper to reach for when adding a
  // rule, which made that an easy trap to fall into. One that took the whole
  // editor down rather than the block being worked on: Style renders inside every
  // block, so a throw here put all of them behind "This block has encountered an
  // error and cannot be previewed". It depends on nothing, so the top is where it
  // belongs.
  //
  // 0, and an empty box side, are real values -- only absent ones are skipped.
  const isSet = (value) =>
    undefined !== value && null !== value && "" !== value;

  const cId = clientId || attributes?.cId || "";
  const mainEl = cId ? `#btbTestimonialsDir-${cId}` : ".bTestimonials";

  // Block Width has to outrank the theme's own layout rule.
  //
  // A block-theme emits `.is-layout-constrained > .alignwide { max-width: ... }`,
  // and every block here is aligned wide by default -- two classes beat the one
  // in the `.bTestimonials` fallback, so on a block with no `cId` the width was
  // set and then overruled, measured in the browser rather than guessed. The ID
  // selector already wins where a `cId` exists; doubling the class evens the
  // score for the fallback, and being emitted from the body wins the tie.
  const widthEl = cId ? mainEl : ".bTestimonials.bTestimonials";

  // Slider arrow navigation.
  //
  // Colour and side offset go through Swiper's own custom properties. Size does
  // too, but the variable alone is not enough: Swiper makes the arrow a
  // `size/44 * 27` by `size` rectangle with a glyph as tall as the whole box, so
  // raising it grows a tall sliver rather than a bigger button, and any
  // background painted on it reads as a pill. So whenever the arrow is styled at
  // all, the box is squared off here and the glyph scaled to fit inside it.
  //
  // The vertical centring still comes from Swiper's own
  // `margin-top: calc(0px - size/2)`, which is why the height stays tied to the
  // variable instead of being written as a plain pixel value.
  const {
    navSize,
    navOffset,
    navColor,
    navHoverColor,
    navBg,
    navHoverBg,
    navBorder,
    navShadow,
    sideOpacity,
  } = slider && "object" === typeof slider ? slider : {};

  const arrowEl = `${mainEl} .swiper-button-prev, ${mainEl} .swiper-button-next`;
  const arrowAfterEl = `${mainEl} .swiper-button-prev::after, ${mainEl} .swiper-button-next::after`;
  const navBox = "var(--swiper-navigation-size, 44px)";

  // Any one of these means the user has taken over the arrow's appearance.
  const isArrowStyled = !!(navSize || navBg || navBorder || navShadow);

  const navVars = [
    navColor ? `--swiper-navigation-color: ${navColor};` : "",
    navSize ? `--swiper-navigation-size: ${navSize}px;` : "",
    // A 0 offset is a real choice -- it pins the arrows to the edge.
    undefined === navOffset || null === navOffset || "" === navOffset
      ? ""
      : `--swiper-navigation-sides-offset: ${navOffset}px;`,
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  const arrowBox = isArrowStyled
    ? [
        `width: ${navBox};`,
        `height: ${navBox};`,
        // Centres the glyph in the squared box; Swiper leaves it top-left.
        "display: flex;",
        "align-items: center;",
        "justify-content: center;",
        "box-sizing: border-box;",
        navBg ? `background: ${navBg};` : "",
        navBorder ? getBorderCSS(navBorder) : "",
        // The stylesheet gives the arrow a raised drop shadow by default; this is
        // how an author flattens it or deepens it. Emitted only when set, so an
        // untouched block keeps the shipped shadow.
        // getShadowCSS returns the value only, not the property -- unlike
        // getBorderCSS above, which returns whole declarations.
        navShadow ? `box-shadow: ${getShadowCSS(navShadow)};` : "",
      ]
        .filter(Boolean)
        .join("\n\t\t\t")
    : "";

  // Swiper sizes the glyph at 100% of the box, which overflows a square button.
  const arrowGlyph = isArrowStyled
    ? `font-size: calc(${navBox} * 0.45);\n\t\t\tline-height: 1;`
    : "";

  const arrowHover = [
    navHoverColor ? `color: ${navHoverColor};` : "",
    navHoverBg ? `background: ${navHoverBg};` : "",
    // The default arrow darkens on hover with an inset wash, so that it works
    // over the accent, a theme's own accent, or an Arrow Background, none of
    // which CSS can darken through a custom property. An explicit Arrow Hover
    // Background is a chosen colour rather than a starting point, so the wash is
    // dropped here and only the lift shadow is kept -- otherwise the colour
    // picked in the sidebar would render 14% darker than it was picked.
    navHoverBg ? "box-shadow: 0 8px 18px rgba(15, 23, 42, 0.26);" : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  // How far back the cards either side of the active one fade.
  //
  // The flat slider dims its neighbours to 0.75 in the stylesheet; coverflow and
  // the 3D slider deliberately do not, because washing out the side cards is
  // most of what made them read as grey slivers. That left the two 3D
  // arrangements with no way to dim at all, which is the opposite problem on a
  // pale card over a pale page -- there the rotation alone does not separate the
  // active card from its neighbours.
  //
  // Restricted to `.swiper-slide-visible` on purpose. The cull rule that hides
  // the far slides is `opacity: 0` at class specificity, and this rule is
  // ID-scoped, so without that qualifier it would outrank the cull and bring the
  // whole track back into view. Swiper maintains the class on every update under
  // `watchSlidesProgress`, which the 3D arrangements set.
  //
  // 100 is the shipped look, so it emits nothing: no rule at all is one fewer
  // thing to outrank, and it keeps a block saved before this control rendering
  // exactly as it did.
  const arrangement = resolveArrangement(attributes);
  const is3DArrangement = ["slider-3d", "coverflow"].includes(arrangement);

  // Written out rather than through the `isSet` helper below, which is declared
  // further down the body and so is not in scope yet.
  const hasSideOpacity =
    undefined !== sideOpacity && null !== sideOpacity && "" !== sideOpacity;

  const sideOpacityCSS =
    is3DArrangement && hasSideOpacity && 100 !== Number(sideOpacity)
      ? `${mainEl} .swiper-slide.swiper-slide-visible:not(.swiper-slide-active) {
			opacity: ${Number(sideOpacity) / 100};
		}`
      : "";

  // Block width and card height, per device.
  //
  // `max-width` rather than `width`, so a value wider than its container still
  // fits on a narrow screen, and `min-height` rather than `height`, so a card
  // with more review text than the rest grows instead of clipping it. Both are
  // empty until set, which is what keeps an untouched block deferring to the
  // theme's layout.
  // getBoxCSS rather than getBoxValue: it orders the sides, fills a side left
  // blank with 0, and returns nothing at all when every side is empty. Passing
  // an untouched `{ top: '', right: '', ... }` through getBoxValue would emit a
  // bare `margin: ;` instead.
  //
  // `ownBoxForDevice` rather than the value itself: Padding, Card Margin and
  // Block Margin are per device now, and the desktop entry is what the base rule
  // wants. A block saved before that shape existed reads as desktop-only, so it
  // renders unchanged. See utils/responsiveBox.js.
  const cardMarginCSS = getBoxCSS(ownBoxForDevice(cardMargin, "desktop"));

  // Every per-card element across the layouts.
  //
  // The background/padding/border/shadow rule further down only names `.single`
  // and a few widgets, so on the twelve layouts that build their card out of
  // something else -- timeline, hero, audio, logos, videos, badges, stats, FAQ
  // and friends -- a margin set here reached nothing at all. Margin gets its own
  // rule rather than widening that one, because widening it would retroactively
  // drop the default background, padding, border and shadow onto layouts that
  // have never carried them.
  const cardSelectors = [
    ".layoutSection .single",
    ".btb-audio-card",
    ".btb-timeline-card",
    ".btb-hero-card",
    ".btb-popup-modal-card-trigger",
    ".btb-bubble-item",
    ".btb-faq-item",
    ".btb-star-rating-bars",
    ".btb-avatar-list-wrapper",
    ".btb-badge-card",
    ".btb-stat-card",
    ".btb-toast-card",
    // Layout.js and the bespoke editors disagree on the prefix for these four,
    // so both spellings are listed.
    ".btb-logo-item",
    ".logo-item",
    ".btb-trust-item",
    ".badge-item",
    ".video-item",
    ".stat-item",
    // The seven blocks that build a card out of none of the above. Each was
    // checked in the browser rather than read off the source: with the list as
    // it stood, setting Margin on these changed the computed style of nothing
    // inside the block.
    //
    // For the single-widget blocks the whole widget is the card, so the margin
    // goes on its outer box; for case-study it is the repeated tile inside the
    // grid, and for card-stack the stacked card itself -- every card in the
    // stack shifts by the same amount, so the stack stays square.
    ".ba-wrap",
    ".btb-case-study",
    ".btb-comparison-table",
    ".btb-rating-summary",
    // `.btb-form-wrapper` was the form's old front-end-only markup; the form is
    // one component now and renders `.btb-tform` in both places. The old name
    // stays listed so a page served from cache before the change still moves.
    ".btb-form-wrapper",
    ".btb-tform",
    ".btb-stacked-card",
    ".btb-poll-wrapper",
  ];
  const cardMarginEl = cardSelectors
    .map((selector) => `${mainEl} ${selector}`)
    .join(",\n\t\t");

  // Card Height needs the card itself, which is not always what Margin wants.
  //
  // Several layouts wrap their card in a positioning div and put the visible
  // card inside it -- the hero spotlight is the clearest: `.btb-hero-card` only
  // carries a bottom margin, and the box a reader sees is the `.single` within
  // it. A margin on the wrapper still moves the card, so the list above is right
  // for margin; a min-height on the wrapper just grows an invisible box while
  // the card keeps its own height, which is why Card Height appeared to do
  // nothing there. Hero's secondary cards sit in `.btb-hero-grid`, which is not
  // a `.layoutSection` either, so they matched no height selector at all.
  //
  // Naming `.single` on its own reaches the card in every one of those layouts;
  // the widget classes stay because those blocks have no `.single`.
  const cardHeightEl = cardSelectors
    .map((selector) =>
      ".layoutSection .single" === selector ? ".single" : selector,
    )
    .map((selector) => `${mainEl} ${selector}`)
    .join(",\n\t\t");

  // Which element the Card panel's background, padding, border and shadow land
  // on.
  //
  // For nearly every layout that is `.single`, the themed card itself. Two build
  // a painted box *around* the themed card and put the card inside it -- the
  // audio player's `.btb-audio-card` and the swipeable `.btb-stacked-card`, both
  // of which carry their own surface, border, radius, padding and shadow in the
  // stylesheet. On those two the panel was painting the inner box while the card
  // a reader sees ignored every control: measured on the front end, setting the
  // Card background to red left `.btb-audio-card` computing `rgb(255,255,255)`
  // and reddened only the quote inside it.
  //
  // So on those two the outer box is the target, and their block.json defaults
  // now carry the values the stylesheet used to hardcode, which is what keeps an
  // untouched block rendering as it always did. Every other layout is unchanged.
  // `shadow: false` on the stack is deliberate. Its depth is the layered
  // shadows -- `.is-top` carries a stronger one than the cards behind it, which
  // is what makes it read as a stack rather than a stack of flat rectangles --
  // and an ID-scoped `box-shadow` here outranks the `.is-top` rule and flattens
  // all of them to one value. The audio card's shadow is a plain drop shadow
  // with no such state, so it comes across as a default instead.
  const CARD_BOX_OVERRIDE = {
    "audio-testimonials": { selector: ".btb-audio-card", shadow: true },
    "testimonials-card-stack": { selector: ".btb-stacked-card", shadow: false },
  };
  const cardBox = CARD_BOX_OVERRIDE[layout];
  const cardBoxEl = `${mainEl} ${cardBox?.selector || ".single"}`;
  const cardBoxShadowCSS =
    cardBox && !cardBox.shadow ? "" : `box-shadow: ${getShadowCSS(shadow)};`;

  // The widgets that build their card out of neither `.single` nor a wrapper
  // around one. The Card panel's surface rule has always named them; the corner
  // wash and the hover state did not, so both were dead on every one of them --
  // toast, the seven review badges, the star bars, the avatar panel, the case
  // study tile and the comparison table. The wash in particular is a
  // background-image layered over that rule's background-color, so any element
  // in one list and not the other gets a control that moves half its box.
  const CARD_WIDGETS = [
    ".btb-star-rating-bars",
    ".btb-badge-card",
    ".btb-stat-card",
    ".btb-toast-card",
    ".btb-avatar-detail",
    ".btb-trust-badges-grid",
    ".btb-case-study",
    ".btb-comparison-table",
  ];
  const scopeAll = (selectors, suffix = "") =>
    selectors.map((sel) => `${mainEl} ${sel}${suffix}`).join(",\n\t\t");

  // Surface, padding, border and shadow, and the hover state of the same box.
  const cardPaintEl = scopeAll([cardBox?.selector || ".single", ...CARD_WIDGETS]);
  const cardPaintHoverEl = scopeAll(
    [cardBox?.selector || ".single", ...CARD_WIDGETS],
    ":hover",
  );

  // The card's hover state.
  //
  // frontend.scss already lifts the card and deepens its wash on hover, and its
  // own comment records why it stops there: "the Card panel owns both
  // `box-shadow` and `border-color` at ID specificity and a hover rule here
  // would lose to them". True of the stylesheet, not of this file -- emitted
  // here the hover rule carries the same ID and, coming later, wins. So the
  // three the stylesheet had to leave alone get controls.
  //
  // Every part is conditional and the whole rule is dropped when nothing is set,
  // so a card nobody has touched keeps the lift-and-wash it has today.
  //
  // `background-color` rather than the `background` shorthand, for the reason the
  // resting rule gives: the shorthand also resets `background-image`, which is
  // the wash -- so a hover colour would flatten the very gradient the hover state
  // is built on.
  //
  // A lift of 0 is a real choice: it holds the card still, which is the only way
  // to turn the movement off, so only an absent value is skipped.
  const cardHoverShadowCSS = getShadowCSS(cardHoverShadow);

  const cardHoverCSS = [
    cardHoverBg ? `background-color: ${cardHoverBg};` : "",
    cardHoverBorderColor ? `border-color: ${cardHoverBorderColor};` : "",
    cardHoverShadowCSS ? `box-shadow: ${cardHoverShadowCSS};` : "",
    isSet(cardHoverLift)
      ? `transform: translateY(-${cardHoverLift}px);`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  // The Top panel (Style tab) paints the card's header strip -- avatar, name and
  // designation -- and is shown for Theme 2 or the masonry arrangement.
  //
  // The masonry half used to target a bare `.masonry`, which Layout.js has never
  // emitted: the arrangement adds `masonry-layout` and, when the block's own
  // layout names it too, `btb-masonry-layout`. So the panel opened, the controls
  // moved and the header stayed transparent -- measured, not inferred. Both
  // spellings are listed because the two classes arrive by different routes.
  //
  // A companion rule tinting `.masonry .single .top::after` went with it. There
  // is no notch on a masonry card -- the only `.top::after` in the stylesheet
  // belongs to theme_6, and it is drawn with `border-bottom`, not the
  // `border-right` that rule set -- so it could never have coloured anything.

  // The short rule under the designation on Theme 1.
  //
  // These were written as `border-width` / `border-color` because the stylesheet
  // drew the divider as a hairline: a 1px #cccccc border, 30px wide. It is not
  // drawn that way any more -- frontend.scss paints a short accent bar instead,
  // `width: 34px; height: 3px; border: 0; background: var(--btb-accent)`, in the
  // `.theme_1 .single .footer .deg::after` rule. Against that markup
  // `border-color` coloured an edge no `border-style` ever showed and
  // `border-width` widened the same absent edge, so Color and Thickness moved
  // nothing on any Theme 1 layout -- the 3D Flip Perspective Carousel included.
  // Length kept working, because `width` is still `width`.
  //
  // Each property now names what the bar actually uses: its fill, its height and
  // its width. Colour is only emitted once one is picked, so an untouched divider
  // still follows the Accent role the stylesheet defers to.
  //
  // 0 is a real choice for both thickness and length -- either one removes the
  // rule -- so only an absent value is skipped.

  /*
   * An untouched `degDivider` arrives as `[]`, not `{}`.
   *
   * block.json declares `"default": {}`, but that default round-trips through
   * PHP on its way to the client: `json_decode` turns an empty JSON object into
   * an empty PHP array, and `wp_json_encode` sends an empty PHP array back out as
   * `[]`. Measured on a fresh block -- `Array.isArray( attributes.degDivider )`
   * is true.
   *
   * An array has a real `length`, and it is 0. So `isSet( degDivider.length )`
   * was true on every untouched block and emitted `width: 0px`, which collapsed
   * the bar the stylesheet draws at 34px -- the divider was invisible from the
   * start, on every Theme 1 layout. Setting Color or Thickness then changed the
   * colour and height of something with no width, which is why the panel looked
   * like it did nothing at all.
   *
   * `color` and `width` never collided with an array property, so only `length`
   * was affected; normalising the whole value keeps the next reader out of the
   * same trap.
   */
  const divider = Array.isArray(degDivider) ? {} : degDivider || {};

  const degDividerCSS = [
    isSet(divider.width) ? `height: ${divider.width}px;` : "",
    divider.color ? `background: ${divider.color};` : "",
    isSet(divider.length) ? `width: ${divider.length}px;` : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  // Space around the whole block, which is a different thing from Card Margin.
  //
  // Card Margin moves the card *inside* the block -- each testimonial in a grid,
  // the slider inside the before/after block -- so it can never separate one
  // block from the next. Nothing targeted the block's own box, which is why
  // there was no way to space the child blocks of a B Testimonials parent apart.
  //
  // Only the sides actually filled in are emitted: the Block Width rule centres
  // the block with `margin-left/right: auto`, and writing a blanket `margin`
  // here -- 0 on the sides left empty, as getBoxCSS would -- would silently undo
  // that centring for anyone who only wanted room above and below.
  // The side margins need `!important`, which nothing else here does.
  //
  // A block theme's constrained layout emits
  // `margin-left: auto !important; margin-right: auto !important` for its
  // children, and no selector -- ID or otherwise -- outranks an `!important`
  // declaration. Measured on this site: a block asking for 43px on all four
  // sides rendered 43px top and bottom and 281.5px either side, which is the
  // theme's auto centring, not the value asked for.
  //
  // Top and bottom face no such rule, so they stay plain. Only a side the author
  // actually filled in is emitted, so the centring survives untouched for
  // everyone who only wanted room above and below.
  const blockMarginSides = (box) =>
    ["top", "right", "bottom", "left"]
      .map((side) => {
        if (!isSet(box?.[side])) {
          return "";
        }
        const beatsTheme = "left" === side || "right" === side;
        return `margin-${side}: ${box[side]}${beatsTheme ? " !important" : ""};`;
      })
      .filter(Boolean)
      .join("\n\t\t\t");

  const blockMarginCSS = blockMarginSides(ownBoxForDevice(blockMargin, "desktop"));

  // Where a shrink-to-fit widget sits in its column.
  //
  // Only the badges and the toast are offered this -- their card is narrower
  // than the column and so had nowhere to go but the left edge, while every
  // other layout fills its column and would be unmoved by it. The panel gates
  // it; see SHRINK_TO_FIT_LAYOUTS.
  //
  // A flex container on the block's own box, rather than `text-align` or auto
  // margins. `text-align: center` would centre the badge's own lines of text
  // along with it, and auto margins do nothing to `.btb-badge-card`, which is
  // `display: inline-flex`. Making the box a flex row centres whatever width
  // the widget turns out to have, which is the point: the right value differs
  // per badge and none of them should have to be measured.
  //
  // Nothing is emitted while the value is empty, so a block nobody has aligned
  // keeps the block layout it has today.
  const BLOCK_ALIGN_JUSTIFY = { center: "center", right: "flex-end" };
  const blockAlignCSS = BLOCK_ALIGN_JUSTIFY[blockAlign]
    ? `${widthEl} {\n\t\t\tdisplay: flex;\n\t\t\tjustify-content: ${BLOCK_ALIGN_JUSTIFY[blockAlign]};\n\t\t}`
    : "";

  // Block Margin's per-device rules cannot ride along in sizeCSS the way Padding
  // and Card Margin do.
  //
  // The base Block Margin rule is emitted last on purpose, so an explicit side
  // beats the auto-centring the Block Width rules apply -- including the ones
  // inside the media queries. That also puts it after anything sizeCSS writes,
  // at equal specificity, so a tablet margin written there simply lost: measured
  // at 900px with tablet set to 25px, the block still rendered the desktop 50px.
  // Emitting these after the base rule instead is what makes the override stick.
  const blockMarginBreakpoints = [
    [tabBreakpoint, "tablet"],
    [mobileBreakpoint, "mobile"],
  ]
    .map(([query, device]) => {
      const sides = blockMarginSides(ownBoxForDevice(blockMargin, device));
      return sides
        ? `${query} {\n\t\t\t${widthEl} {\n\t\t\t\t${sides}\n\t\t\t}\n\t\t}`
        : "";
    })
    .filter(Boolean)
    .join("\n\t\t");

  // Let the Colors panel outrank the classic Style panels.
  //
  // The Colors panel writes CSS custom properties that the stylesheets read as
  // `var(--btb-surface, #fff)` and friends. These rules are emitted at ID
  // specificity with values that always exist -- `background` defaults to
  // `#0000`, `nameColor` to `#000`, the border to whatever block.json says -- so
  // they beat the stylesheet every time and 62 of the Colors controls changed
  // nothing at all. Measured across all 31 layouts, not inferred: a badge card
  // asked for a surface colour still computed `rgba(0, 0, 0, 0)`.
  //
  // Wrapping the classic value as the var's fallback settles it in the right
  // order without touching anything else. A block whose author has not opened
  // the Colors panel has no custom property declared, so the fallback applies
  // and it renders exactly as it did before; once a role is set, it wins.
  const withRole = (cssVar, value) => `var(${cssVar}, ${value})`;

  // The layouts whose stylesheet spends one border side on a brand stripe.
  //
  // The badges draw `border-left: 4px solid var(--btb-accent)` and the quote box
  // `border-left: 5px solid var(--btb-accent)`, on the same element the Card
  // panel's border lands on. The Card border is emitted per side at ID
  // specificity from a block.json default that is never empty, so it claimed the
  // left side on every one of them and the Accent control painted nothing --
  // measured on the front end, a Capterra badge with Accent set computed
  // `border-left: 9px solid rgb(7, 8, 9)`, the Border Color, while `--btb-accent`
  // sat declared and unused.
  //
  // Leaving that side to the stylesheet gives both controls something to do: the
  // Card border still draws the other three sides, and the stripe follows
  // Accent. It also matches what the side is for -- the brand bar is what makes
  // a Google badge look like a Google badge, so the Card panel taking it over
  // was never the intent.
  const ACCENT_STRIPE_SIDE = {
    "google-review-badge": "left",
    "capterra-review-badge": "left",
    "facebook-review-badge": "left",
    "trustpilot-review-badge": "left",
    "g2-review-badge": "left",
    "verified-buyer-badge": "left",
    "review-badge-widget": "left",
    "testimonials-quote-box": "left",
  };

  // getBorderCSS builds the shorthand from a plain width and colour, so the
  // palette has to be woven in rather than wrapped around the result. Emitting
  // nothing when the width is absent is deliberate and matches getBorderCSS:
  // with no rule here the stylesheet's own `var()` border applies untouched,
  // which is why the layouts with no border default already worked.
  const paletteBorderCSS = (value) => {
    const {
      width = "",
      style = "solid",
      color = "",
      side = "all",
      radius = "",
    } = value || {};

    const wanted = (s) => {
      const bSide = side?.toLowerCase();
      if (ACCENT_STRIPE_SIDE[layout] === s) {
        return false;
      }
      return bSide?.includes("all") || bSide?.includes(s);
    };

    const sides =
      !width || 0 === parseInt(width, 10)
        ? ""
        : ["top", "right", "bottom", "left"]
            .map((s) =>
              wanted(s)
                ? `border-${s}: ${withRole(
                    "--btb-border-width",
                    width,
                  )} ${style} ${withRole("--btb-border", color)};`
                : "",
            )
            .join("");

    return [sides, radius ? `border-radius: ${radius};` : ""]
      .filter(Boolean)
      .join("\n\t\t\t");
  };

  // Every class each card part is rendered with, across all the layouts.
  //
  // The bespoke layouts name their parts themselves -- `.btb-cs-name` for a case
  // study's customer, `.btb-faq-question` for an accordion's headline -- so a
  // rule that only knew `.single .name` never reached them and the stylesheet's
  // own font size was the only value that ever applied. That is why those
  // controls read as dead: not specificity (these rules are ID-scoped and win
  // every time) but a selector that names nothing on the page.
  //
  // Grouped by role rather than by block, since the roles line up with what the
  // Colors panel already paints: name/title, designation/muted, review/body.
  const NAME_PARTS = [
    ".single .name",
    ".btb-avatar-name",
    ".btb-cs-name",
    ".btb-toast-text",
    ".btb-faq-question",
    ".btb-ct-title",
    ".btb-srb-title",
    // The video card's caption. Its editor is bespoke, so nothing ever named
    // these two and the stylesheet's 17px/14px were the only values in play.
    ".video-item .name",
    // The seven review badges' heading -- "Google Reviews", "Trustpilot Score",
    // "100% Verified Reviews" and so on.
    //
    // `layoutControls.js` gave these blocks `cardBox` alone, so the Name,
    // Designation and Review Text panels were all hidden and none of their text
    // was named here either: the stylesheet's 17px/700 was the only value in
    // play. Their `nameTypo` defaults now carry that value, so an untouched
    // badge renders exactly as it did and the control owns it from there.
    ".btb-badge-title",
  ];

  const DEG_PARTS = [
    ".single .deg",
    ".btb-avatar-deg",
    ".btb-cs-deg",
    ".btb-toast-meta",
    ".btb-faq-author",
    ".btb-srb-count",
    ".video-item .deg",
    // The badges' secondary line, which is one of two things depending on the
    // block: the Verified Buyer seal renders a sentence of description, the
    // other six a review count beside the score. Both sit at the stylesheet's
    // 13px in the muted colour, which is the Designation role exactly, so they
    // share one control rather than growing two that would always be set alike.
    ".btb-badge-desc",
    ".btb-badge-rating .count",
  ];

  const TEXT_PARTS = [
    ".single .reviewText",
    ".btb-avatar-review",
    ".btb-cs-body p",
    ".btb-bubble-content p",
    ".btb-faq-answer",
    ".btb-ct-table td",
    ".btb-srb-label",
  ];

  // A floating bubble's name is painted with the accent colour rather than the
  // title colour, so it takes the Name typography without joining the Name
  // colour rule -- adding it there would repaint it and change how the layout
  // looks for anyone who has never opened the panel.
  const NAME_TYPO_ONLY = [".btb-bubble-name"];

  // The avatar box. Same story: four layouts draw their own and pinned the size
  // in the stylesheet, so the Image width and height moved nothing. Both the
  // case-study wrapper and the image inside it are named -- the wrapper anchors
  // the editor's upload overlay, the image is what a reader sees.
  const IMAGE_PARTS = [
    ".single .img",
    ".btb-avatar-thumb",
    ".btb-cs-avatar-wrap",
    ".btb-cs-avatar",
    ".btb-bubble-avatar",
    ".btb-toast-avatar",
  ];

  const selectorList = (parts) =>
    parts.map((part) => `${mainEl} ${part}`).join(",\n\t\t");

  // The star-rating-bars parts keep their own colour rules further down: each
  // carries a different fallback from the shared one, and folding them in would
  // repaint the widget for anyone who has not set a colour. Typography they do
  // take from the shared groups.
  const COLOR_EXCLUDE = [".btb-srb-title", ".btb-srb-label", ".btb-srb-count"];
  const colorParts = (parts) =>
    parts.filter((part) => !COLOR_EXCLUDE.includes(part));

  // Avatar size, per device.
  //
  // `image.width` and `image.height` were single numbers, so one avatar size had
  // to serve every screen -- a 300px portrait that suits a desktop hero card
  // fills a phone. Each is now either a plain number, as every block saved so
  // far holds it, or a `{ desktop, tablet, mobile }` object.
  //
  // A device left empty emits nothing and simply inherits the wider one, which
  // is what keeps the tablet and mobile fields optional rather than something
  // that must be filled in before the block looks right.
  const imageFor = (value, device) => {
    if (value && "object" === typeof value) {
      return value[device];
    }

    return "desktop" === device ? value : undefined;
  };

  const imageCSS = (device) => {
    const width = imageFor(image?.width, device);
    const height = imageFor(image?.height, device);
    const fallback = "desktop" === device ? 50 : undefined;

    const declarations = [
      isSet(width) ? `width: ${width}px;` : isSet(fallback) ? `width: ${fallback}px;` : "",
      isSet(height)
        ? `height: ${height}px;`
        : isSet(fallback)
          ? `height: ${fallback}px;`
          : "",
    ]
      .filter(Boolean)
      .join("\n\t\t\t");

    return declarations
      ? `${selectorList(IMAGE_PARTS)} {\n\t\t\t${declarations}\n\t\t}`
      : "";
  };

  const sizeCSS = (device) => {
    const width = blockWidth?.[device];
    const height = cardHeight?.[device];
    // The desktop boxes are already written by the base rules further down, so
    // only the two breakpoints add anything here.
    const isBase = "desktop" === device;
    const devicePadding = isBase
      ? ""
      : getBoxValue(ownBoxForDevice(padding, device) || {});
    const deviceCardMargin = isBase
      ? ""
      : getBoxCSS(ownBoxForDevice(cardMargin, device));

    return [
      imageCSS(device),
      // Centred once narrowed, otherwise it would sit against the left edge.
      width
        ? `${widthEl} {\n\t\t\tmax-width: ${width};\n\t\t\tmargin-left: auto;\n\t\t\tmargin-right: auto;\n\t\t}`
        : "",
      // `.layoutSection .single` alone reached none of the layouts that build
      // their card out of something else, so Card Height silently did nothing on
      // timeline, hero, audio, logos, badges, stats and the rest.
      height ? `${cardHeightEl} {\n\t\t\tmin-height: ${height};\n\t\t}` : "",
      // Padding, Card Margin and Block Margin, for the devices that set one of
      // their own. `ownBoxForDevice` returns nothing when a device inherits, so
      // a media query is only written where there is something to override --
      // repeating the desktop value here would freeze it in place instead.
      //
      // Each targets the same element its desktop rule does, so a value set for
      // one device behaves exactly like the value set for another.
      devicePadding ? `${cardBoxEl} {\n\t\t\tpadding: ${devicePadding};\n\t\t}` : "",
      deviceCardMargin
        ? `${cardMarginEl} {\n\t\t\tmargin: ${deviceCardMargin};\n\t\t}`
        : "",
      // Block Margin is deliberately not here -- see blockMarginBreakpoints.
    ]
      .filter(Boolean)
      .join("\n\t\t");
  };

  const tabletSize = sizeCSS("tablet");
  const mobileSize = sizeCSS("mobile");

  // The Testimonial Form's labels and inputs.
  //
  // Neither had a control of any kind. form.scss pinned a label at
  // `font-weight: 600; font-size: 14px` with an inherited colour, and gave the
  // inputs a background and a border read from the palette and nothing else --
  // no text colour, no typography, no placeholder, no radius, no padding, no
  // focus state. So the one layout built almost entirely out of form fields had
  // the least say over how those fields look.
  //
  // Scoped to `.bTestimonialForm` rather than hung off `mainEl` alone: that is
  // what the form component wraps itself in, and naming it keeps these rules
  // ahead of form.scss even on a block saved without a `cId`, where `mainEl`
  // falls back to a single class and would otherwise lose to the stylesheet's
  // own two-class selectors.
  //
  // Every declaration below is conditional, so a form nobody has styled emits an
  // empty string here and renders exactly as it always has.
  const formEl = `${mainEl} .bTestimonialForm`;
  const labelEl = `${formEl} .btb-tform-field label`;
  const inputParts = ["input", "textarea", "select"];
  const inputEl = inputParts
    .map((part) => `${formEl} .btb-tform-field ${part}`)
    .join(",\n\t\t");
  // A rule of its own rather than joining the one above: a pseudo-element in a
  // selector list would drop the whole list on a browser that cannot parse it.
  const placeholderEl = inputParts
    .map((part) => `${formEl} .btb-tform-field ${part}::placeholder`)
    .join(",\n\t\t");
  const focusEl = inputParts
    .map((part) => `${formEl} .btb-tform-field ${part}:focus`)
    .join(",\n\t\t");

  const inputPaddingCSS = getBoxCSS(inputPadding);

  const inputBoxCSS = [
    inputColor ? `color: ${inputColor};` : "",
    inputRadius ? `border-radius: ${inputRadius};` : "",
    inputPaddingCSS ? `padding: ${inputPaddingCSS};` : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  // getTypoCSS always returns a ruleset, empty braces and two empty media
  // queries included, so an untouched typography object would add dead rules to
  // all 35 blocks rather than only to a form somebody has styled.
  const typoCSS = (selector, typo) =>
    Object.keys(typo || {}).length ? getTypoCSS(selector, typo)?.styles || "" : "";

  const formCSS = [
    labelColor ? `${labelEl} {\n\t\t\tcolor: ${labelColor};\n\t\t}` : "",
    typoCSS(labelEl, labelTypo),
    inputBoxCSS ? `${inputEl} {\n\t\t\t${inputBoxCSS}\n\t\t}` : "",
    typoCSS(inputEl, inputTypo),
    placeholderColor
      ? `${placeholderEl} {\n\t\t\tcolor: ${placeholderColor};\n\t\t}`
      : "",
    // `outline-color` alongside the border, so the browser's own focus ring
    // follows the chosen colour instead of contradicting it.
    inputFocusColor
      ? `${focusEl} {\n\t\t\tborder-color: ${inputFocusColor};\n\t\t\toutline-color: ${inputFocusColor};\n\t\t}`
      : "",
    // min-height, so a longer review grows the box rather than scrolling inside
    // a fixed one.
    textareaHeight
      ? `${formEl} .btb-tform-field textarea {\n\t\t\tmin-height: ${textareaHeight};\n\t\t}`
      : "",
    // The submit button.
    //
    // It used to carry exactly one control -- its label -- with the colour,
    // padding, radius, weight and size all pinned in form.scss, so the one
    // element on the form a visitor is meant to click was the only one that
    // could not be styled at all.
    //
    // `background-color` rather than the `background` shorthand, matching the
    // card rule: the shorthand resets a background image, and that is exactly
    // what silently killed the masonry header wash earlier.
    //
    // An empty Background falls through to the accent, so a form whose Accent is
    // set gets a matching button without anyone picking the same colour twice.
    `${formEl} .btb-tform-submit {
			background-color: ${btnBg || "var(--btb-accent, #146ef5)"};
			color: ${btnColor || "#ffffff"};
			padding: ${getBoxValue(btnPadding)};
			border-radius: ${btnRadius || "6px"};
			justify-self: ${"full" === btnWidth ? "stretch" : btnAlign || "start"};
			width: ${"full" === btnWidth ? "100%" : "auto"};
			transition: background-color 0.2s ease, color 0.2s ease;
		}`,
    getTypoCSS(`${formEl} .btb-tform-submit`, btnTypo)?.styles || "",
    // Only emitted when asked for. With no hover colours chosen the button keeps
    // its base ones rather than being handed an invented darker shade, which is
    // the same rule the slider arrows follow.
    btnHoverBg || btnHoverColor
      ? `${formEl} .btb-tform-submit:hover {
			${
        btnHoverBg
          ? // `!important` is unavoidable here, and only here. The button's base
            // background is an inline style written by TestimonialForm.js so that
            // Accent applies in the editor preview too, and an inline style beats
            // every stylesheet rule regardless of specificity -- measured, the
            // hover colour computed as the base green with the rule in place.
            // Matching specificity cannot win against inline; this can.
            `background-color: ${btnHoverBg} !important;`
          : ""
      }
			${btnHoverColor ? `color: ${btnHoverColor};` : ""}
		}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\t\t");

  // The Feedback & NPS Poll's text, scale buttons and box.
  //
  // This is the layout layoutControls.js gives an empty entry -- no shared panel
  // reaches it -- so every size it renders was pinned in frontend.scss: an
  // 18px/700 question, a 13px description, 12px scale labels, a 38x38 button at
  // radius 8, a 32px box at radius 16. The button's two text colours were worse
  // than fixed sizes: idle it inherited, and once picked it was a literal `#fff`
  // over the accent, so an author who set a pale accent got white on near-white
  // with nothing to fix it.
  //
  // The colours a `--btb-*` role already paints stay with the Colors panel, so
  // only what no role covers is emitted here.
  const pollEl = `${mainEl} .btb-poll-wrapper`;
  const pollBtnEl = `${pollEl} .btb-poll-num-btn`;
  // Hover and selected are one state as far as the stylesheet is concerned --
  // both paint the accent behind a white number -- so they take one control.
  const pollBtnActiveEl = `${pollBtnEl}:hover,\n\t\t${pollBtnEl}.is-selected`;

  const pollPaddingCSS = getBoxCSS(pollPadding);

  const pollBoxCSS = [
    pollPaddingCSS ? `padding: ${pollPaddingCSS};` : "",
    pollRadius ? `border-radius: ${pollRadius};` : "",
    // The box is a flat bordered panel in the stylesheet with no shadow of its
    // own, so this adds one rather than overriding one, and an untouched poll is
    // unchanged. getShadowCSS returns the value only, not the whole declaration.
    getShadowCSS(pollShadow) ? `box-shadow: ${getShadowCSS(pollShadow)};` : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  // Square: `width` and `height` from one value, so the button cannot end up a
  // rectangle with a radius meant for a square.
  const pollBtnBoxCSS = [
    isSet(pollBtnSize) ? `width: ${pollBtnSize}px;` : "",
    isSet(pollBtnSize) ? `height: ${pollBtnSize}px;` : "",
    pollBtnRadius ? `border-radius: ${pollBtnRadius};` : "",
    pollBtnColor ? `color: ${pollBtnColor};` : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  const pollCSS = [
    pollBoxCSS ? `${pollEl} {\n\t\t\t${pollBoxCSS}\n\t\t}` : "",
    typoCSS(`${pollEl} .btb-poll-title`, pollTitleTypo),
    typoCSS(`${pollEl} .btb-poll-desc`, pollDescTypo),
    typoCSS(
      `${pollEl} .btb-poll-label-low,\n\t\t${pollEl} .btb-poll-label-high`,
      pollLabelTypo,
    ),
    // 0 is a real gap -- it butts the buttons together into one strip.
    isSet(pollBtnGap)
      ? `${pollEl} .btb-poll-buttons {\n\t\t\tgap: ${pollBtnGap}px;\n\t\t}`
      : "",
    pollBtnBoxCSS ? `${pollBtnEl} {\n\t\t\t${pollBtnBoxCSS}\n\t\t}` : "",
    // Idle buttons only, and its own rule rather than joining pollBtnBoxCSS
    // above.
    //
    // The stylesheet gives the picked button a lift of its own --
    // `box-shadow: 0 4px 12px rgba(#146ef5, 0.3)` on `.is-selected`, alongside
    // the accent fill and the 1.1 scale -- and that rule is class specificity,
    // so a shadow emitted flat on `.btb-poll-num-btn` from an ID selector would
    // outrank it and quietly delete the one thing marking which number the
    // reader picked. Excluding the selected button leaves that lift standing, so
    // the control styles the buttons it is actually about.
    getShadowCSS(pollBtnShadow)
      ? `${pollBtnEl}:not(.is-selected) {\n\t\t\tbox-shadow: ${getShadowCSS(
          pollBtnShadow,
        )};\n\t\t}`
      : "",
    typoCSS(pollBtnEl, pollBtnTypo),
    // After the idle rule above, so the picked state wins the colour.
    pollBtnActiveColor
      ? `${pollBtnActiveEl} {\n\t\t\tcolor: ${pollBtnActiveColor};\n\t\t}`
      : "",
  ]
    .filter(Boolean)
    .join("\n\t\t");

  // The Gradient Border Grid's ring and score pill.
  //
  // `gradientBorder` defaults to false here and is declared only by that block,
  // so every other layout emits nothing at all -- including the coverflow
  // carousel, which renders the same theme_2 card and must keep its flat border.
  //
  // The ring is a masked pseudo-element. `inset` pulls it out past the card by
  // its own width so it reads as a border rather than eating into the padding,
  // and the two masks cancel over the content box, leaving only the ring itself
  // painted. `border-radius: inherit` keeps it following whatever radius the
  // Card panel sets.
  //
  // The @supports guard matters: without mask compositing the same rule paints a
  // solid gradient slab over the whole card, so a browser that cannot do this
  // gets the card's ordinary border instead of a broken one.
  const gradientRingCSS = gradientBorder
    ? `@supports ((-webkit-mask-composite: xor) or (mask-composite: exclude)) {
			${mainEl} .single::before {
				content: "";
				position: absolute;
				inset: -${gradientWidth}px;
				padding: ${gradientWidth}px;
				border-radius: inherit;
				background: linear-gradient(${gradientAngle}deg, ${gradientFrom}, ${gradientTo});
				-webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
				-webkit-mask-composite: xor;
				mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
				mask-composite: exclude;
				pointer-events: none;
			}
		}`
    : "";

  const starBadgeVars = [
    starBadgeBg ? `--btb-star-badge-bg: ${starBadgeBg};` : "",
    starBadgeColor ? `--btb-star-badge-color: ${starBadgeColor};` : "",
    // The pill's star tracks the card's own star row rather than growing a third
    // control for one glyph. Only emitted where the badge exists, so no other
    // block picks up the variable.
    showStarBadge && starIconColor
      ? `--btb-star-badge-icon: ${starIconColor};`
      : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  // Which corner the score pill sits in, and how big it is.
  //
  // The stylesheet pins it `top: 12px; right: 12px` at a 12px font on a fully
  // rounded pill, and there was nothing in the sidebar to move it -- so on a
  // theme_2 card whose header already carries something in that corner the badge
  // landed on top of it with no way out.
  //
  // All four insets are written on every branch, `auto` included: the shipped
  // rule sets top and right, so a bottom-left badge that only added its own two
  // would keep the old pair as well and stretch the pill across the card.
  const BADGE_INSETS = {
    "top-right": ["12px", "12px", "auto", "auto"],
    "top-left": ["12px", "auto", "auto", "12px"],
    "bottom-right": ["auto", "12px", "12px", "auto"],
    "bottom-left": ["auto", "auto", "12px", "12px"],
  };

  const [badgeTop, badgeRight, badgeBottom, badgeLeft] =
    BADGE_INSETS[starBadgePosition] || BADGE_INSETS["top-right"];

  const starBadgeBox = showStarBadge
    ? [
        `top: ${badgeTop};`,
        `right: ${badgeRight};`,
        `bottom: ${badgeBottom};`,
        `left: ${badgeLeft};`,
        isSet(starBadgeSize) ? `font-size: ${starBadgeSize}px;` : "",
        // 999px is the shipped value and means "fully rounded"; 0 squares the
        // pill off, which is a real choice, so only an absent value is skipped.
        isSet(starBadgeRadius) ? `border-radius: ${starBadgeRadius}px;` : "",
      ]
        .filter(Boolean)
        .join("\n\t\t\t")
    : "";

  // The star glyph ships one pixel under the score text (11px against 12px).
  // Scaling it with the pill rather than leaving it at 11px keeps that
  // relationship at any size, so a 20px badge does not end up with a tiny star.
  const starBadgeIconCSS =
    showStarBadge && isSet(starBadgeSize)
      ? `${mainEl} .single > .btb-star-badge .btb-star-badge-icon {
			font-size: ${Math.max(1, Number(starBadgeSize) - 1)}px;
		}`
      : "";

  const gradientCSS = [
    gradientRingCSS,
    starBadgeVars
      ? `${mainEl} .single {\n\t\t\t${starBadgeVars}\n\t\t}`
      : "",
    starBadgeBox
      ? `${mainEl} .single > .btb-star-badge {\n\t\t\t${starBadgeBox}\n\t\t}`
      : "",
    starBadgeIconCSS,
  ]
    .filter(Boolean)
    .join("\n\t\t");

  // The theme_2 header wash.
  //
  // The strip above the review is painted twice: the Top panel's Background
  // Color underneath, and a translucent gradient of the accent over it. Only the
  // colour had a control, so the wash itself could be neither softened nor taken
  // off -- an author who set a header colour got it tinted whatever they chose.
  //
  // `color-mix` with no fallback on purpose. A browser without it drops the
  // declaration and keeps the stylesheet's own wash, which is the right thing to
  // fall back to; the alternative is resolving the accent to a literal here,
  // where it may be a palette variable rather than a colour.
  // Gated on the block declaring `headerWash`, which is now every block that can
  // paint the strip -- that is, every one that declares `grid2Bg`.
  //
  // It used to be gated on `gradientBorder`, so the Gradient Border Grid was the
  // only layout whose wash could be softened or switched off. Everywhere else --
  // the coverflow carousel, the masonry arrangement, every block a reader can
  // switch to Theme 2 -- the wash was fixed, which is what made the strip look
  // like it had no colour control at all: the Background Color underneath moved,
  // and the accent tint over it did not.
  //
  // All three selectors the stylesheet's own wash uses, or turning it off would
  // leave the masonry arrangement still washed.
  const paintsHeaderStrip = undefined !== attributes?.headerWash;
  const washPct = (base) =>
    Math.round(base * (Number(headerWashStrength) || 0)) / 100;

  const headerWashCSS = paintsHeaderStrip
    ? `${mainEl} .theme_2 .single .top,
		${mainEl} .masonry-layout .single .top,
		${mainEl} .btb-masonry-layout .single .top {
			background-image: ${
        headerWash
          ? `linear-gradient(
				180deg,
				color-mix(in srgb, var(--btb-accent, #0575e6) ${washPct(16)}%, transparent) 0%,
				color-mix(in srgb, var(--btb-accent, #0575e6) ${washPct(8)}%, transparent) 100%
			)`
          : "none"
      };
		}`
    : "";

  // The popup modal's box and text sizes.
  //
  // Written as custom properties on the overlay rather than as declarations on
  // each part, so one rule feeds the stylesheet's nine `var()` fallbacks and
  // anything left untouched keeps the value it shipped with. Emitted only where
  // something is actually set, which is what keeps every other block -- none of
  // which declares these -- from carrying a dead ruleset.
  //
  // Scoped by ID like everything else here: the overlay is rendered inside the
  // block wrapper (it is `position: fixed`, not reparented), so two popup blocks
  // on one page cannot style each other.
  const modalPaddingCSS = getBoxCSS(modalPadding);

  const modalVars = [
    modalOverlayColor ? `--btb-modal-overlay: ${modalOverlayColor};` : "",
    // 0 is a real choice -- it turns the frosting off and leaves a flat wash.
    isSet(modalOverlayBlur) ? `--btb-modal-blur: ${modalOverlayBlur}px;` : "",
    modalBg ? `--btb-modal-bg: ${modalBg};` : "",
    isSet(modalWidth) ? `--btb-modal-width: ${modalWidth}px;` : "",
    // getBoxCSS orders the sides and fills a blank one with 0, and returns
    // nothing at all when every side is empty -- unlike getBoxValue, which would
    // join an untouched `{ top: '', ... }` into a bare set of spaces.
    modalPaddingCSS ? `--btb-modal-padding: ${modalPaddingCSS};` : "",
    isSet(modalRadius) ? `--btb-modal-radius: ${modalRadius}px;` : "",
    isSet(modalCloseSize) ? `--btb-modal-close-size: ${modalCloseSize}px;` : "",
    modalCloseColor ? `--btb-modal-close-color: ${modalCloseColor};` : "",
    isSet(modalAvatarSize) ? `--btb-modal-avatar: ${modalAvatarSize}px;` : "",
    isSet(modalNameSize) ? `--btb-modal-name-size: ${modalNameSize}px;` : "",
    isSet(modalDegSize) ? `--btb-modal-deg-size: ${modalDegSize}px;` : "",
    isSet(modalStarsSize) ? `--btb-modal-stars-size: ${modalStarsSize}px;` : "",
    isSet(modalReviewSize)
      ? `--btb-modal-review-size: ${modalReviewSize}px;`
      : "",
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

  const modalCSS = modalVars
    ? `${mainEl} .btb-modal-overlay {\n\t\t\t${modalVars}\n\t\t}`
    : "";

  // The rating star's size.
  //
  // `getStar` renders an inline SVG with `width="15px" height="15px"` on the
  // element, so the one dimension of a rating that an author is most likely to
  // want was fixed in the icon markup -- the Review Text panel offered a colour
  // and nothing else. Presentation attributes lose to CSS, so a rule here takes
  // it over without touching the icon.
  //
  // Left unset by default and emitting nothing at all: the layouts do not agree
  // on a star size to begin with (the compact card sizes its own at 14px), so a
  // default here would quietly resize several of them. Untouched blocks keep
  // whatever they render today.
  // The compact card's star colour.
  //
  // Every layout draws its stars through getStar, which writes the colour as
  // a fill ATTRIBUTE on the <svg>. The compact card is the only one whose
  // stylesheet also declares `fill` on `.rating svg` -- and a declaration
  // beats an attribute, so on that layout alone the Review Text panel's Rating
  // Icon Color moved nothing at all and only the palette role did. Measured:
  // the star computed #f59e0b with the control set to red.
  //
  // Restating it here at ID specificity, after that rule, hands the star back
  // -- the same fix the comparison table's rating cell needed further down,
  // and for the same reason. Scoped to the one layout that has the problem so
  // no other card's stars are repainted by a rule they never had.
  const compactStarCSS =
    "testimonials-compact" === layout
      ? `${mainEl} .btb-testimonials-compact-layout .rating svg {
			fill: ${withRole("--btb-star", starIconColor)};
		}`
      : "";
  const starSizeCSS = isSet(starSize)
    ? `${mainEl} .btbStar svg,
		${mainEl} .rating svg {
			width: ${starSize}px;
			height: ${starSize}px;
		}`
    : "";

  // The Speech Bubble card's tail.
  //
  // The tail is two CSS triangles under the card, and its colours could not come
  // from the stylesheet alone. It painted `var(--btb-surface, #ffffff)`, but the
  // card itself paints `var(--btb-surface, <Card panel Background>)` from the
  // rule further up -- so a card coloured through the Card panel rather than the
  // palette's Surface role got a white tail hanging off a coloured bubble. The
  // fill is resolved here instead, where both values are in scope.
  //
  // `#0000` is this block's shipped Background default, which means "not set"
  // rather than a transparent bubble, so it falls through to white the same way
  // the stylesheet always did.
  //
  // The outline follows the Card border. A border confined to sides that exclude
  // the bottom leaves the tail unoutlined rather than drawing an edge the card
  // above it does not have.
  const bubbleSide = (border?.side || "all").toLowerCase();
  const bubbleLineWidth =
    bubbleSide.includes("all") || bubbleSide.includes("bottom")
      ? border?.width || "0px"
      : "0px";

  // Where the tail sits along the bottom edge, as the fill triangle's `left`.
  //
  // Size and offset were fixed in the stylesheet at 12px and 30px, so the one
  // part that makes this layout a speech bubble rather than a plain card was the
  // one part with nothing in the sidebar to change. All three are attributes
  // now, and `--btb-bubble-x` is the single value the stylesheet positions both
  // triangles from -- see the note beside its declaration there for why the
  // outline takes the same value less one border width.
  //
  // The triangle is `2 * size` wide, which is why centre subtracts one size and
  // right subtracts two: `left` alone can express every position, so no rule
  // here has to reach for `right` and unset the stylesheet's `left`.
  const bubbleX = (side) => {
    if ("center" === side) {
      return `calc(50% - ${bubbleTailSize}px)`;
    }

    if ("right" === side) {
      return `calc(100% - ${bubbleTailOffset}px - ${bubbleTailSize * 2}px)`;
    }

    return `${bubbleTailOffset}px`;
  };

  // "Alternate" is the chat-transcript look: the tail hangs off the left of one
  // card and the right of the next, so a column of bubbles reads as a
  // back-and-forth rather than as one speaker. Every other value is a single
  // position for all of them.
  const isAlternating = "alternate" === bubbleTailAlign;

  const bubbleVars = [
    `--btb-bubble-size: ${bubbleTailSize}px;`,
    `--btb-bubble-offset: ${bubbleTailOffset}px;`,
    `--btb-bubble-x: ${bubbleX(isAlternating ? "left" : bubbleTailAlign)};`,
    // The fill still follows the Card panel's Background and the palette's
    // Surface role unless the Tail panel names a colour of its own, so a tail
    // left alone stays part of the bubble it hangs from.
    `--btb-bubble-fill: ${
      bubbleTailFill
        ? bubbleTailFill
        : withRole(
            "--btb-surface",
            !isSet(background) || "#0000" === background
              ? "#ffffff"
              : background,
          )
    };`,
    `--btb-bubble-line: ${
      bubbleTailLine
        ? bubbleTailLine
        : withRole("--btb-border", border?.color || "transparent")
    };`,
    `--btb-bubble-line-w: ${withRole("--btb-border-width", bubbleLineWidth)};`,
  ].join("\n\t\t\t");

  const bubbleEl = `${mainEl} .btb-testimonials-speech-bubble-layout .single`;

  const bubbleCSS =
    "testimonials-speech-bubble" === layout
      ? [
          `${bubbleEl} {\n\t\t\t${bubbleVars}\n\t\t}`,
          isAlternating
            ? `${bubbleEl}:nth-child(even) {\n\t\t\t--btb-bubble-x: ${bubbleX(
                "right",
              )};\n\t\t}`
            : "",
          // Both pseudo-elements, or the outline is left hanging on its own.
          // `content` rather than `display` so nothing else on the card shifts:
          // the tail is absolutely positioned and out of flow either way.
          //
          // A size of 0 counts as off as well. The fill triangle collapses to
          // nothing at 0 but the outline behind it is a border-width bigger, so
          // it would survive as a couple of stray pixels in the border colour.
          !bubbleTail || 0 === Number(bubbleTailSize)
            ? `${bubbleEl}::before,\n\t\t${bubbleEl}::after {\n\t\t\tcontent: none;\n\t\t}`
            : "",
        ]
          .filter(Boolean)
          .join("\n\n\t\t")
      : "";

  // The card's corner wash.
  //
  // frontend.scss paints `.layoutSection .single` with
  // `radial-gradient(115% 90% at 0% 0%, var(--btb-wash) 0%, transparent 58%)` --
  // a tint of the Accent strongest at the top-left corner, deepening to
  // `--btb-wash-strong` on hover. Neither state had a control, so the corner
  // could be neither recoloured nor removed, and because it only deepens under
  // the pointer it reads as a hover effect stuck on.
  //
  // Written as `background-image` on the card rather than by redefining
  // `--btb-wash`: those two variables also feed the header strip's own gradient,
  // and moving them here would tie two separate controls back together.
  //
  // `.single` rather than `cardBoxEl`. The audio and card-stack overrides point
  // that at their outer box, which is not the element the stylesheet washes --
  // washing the wrapper would leave the themed card inside it carrying the
  // stylesheet's own wash as well, so the card would end up with two.
  //
  // The widgets are named alongside it. Without them the toggle opened on a
  // review badge, the toast, the star bars, the avatar panel, the case study and
  // the comparison table and moved nothing at all, which is what made the
  // control look broken on some cards and not others. Those blocks default the
  // toggle off, so none of them gains a tint it never had -- see their
  // block.json.
  const cardWashEl = scopeAll([".single", ...CARD_WIDGETS]);
  const cardWashHoverEl = scopeAll([".single", ...CARD_WIDGETS], ":hover");
  const cardWashPct = (base) =>
    Math.round(base * (Number(cardWashStrength) || 0)) / 100;
  const cardWashTint = (pct) =>
    `color-mix(in srgb, ${cardWashColor || "var(--btb-accent, #0575e6)"} ${pct}%, transparent)`;

  // Both states, or turning it off would leave the hover wash arriving on a card
  // that has none at rest.
  const cardWashCSS =
    undefined !== attributes?.cardWash
      ? `${cardWashEl} {
			background-image: ${
        cardWash
          ? `radial-gradient(115% 90% at 0% 0%, ${cardWashTint(
              cardWashPct(8),
            )} 0%, transparent 58%)`
          : "none"
      };
		}

		${cardWashHoverEl} {
			background-image: ${
        cardWash
          ? `radial-gradient(115% 90% at 0% 0%, ${cardWashTint(
              cardWashPct(16),
            )} 0%, transparent 62%)`
          : "none"
      };
		}`
      : "";

  // The avatar's tinted ring.
  //
  // frontend.scss draws it as `box-shadow: 0 0 0 3px var(--btb-ring)` on
  // `.single .authorImg .img`, and its own comment explains why it is a shadow
  // and not a border: "the Image Border control owns the border on this element,
  // and the ring has to sit outside whatever that is set to". Sound -- but it
  // left the ring itself with no control of any kind. Not its colour, which is
  // the Accent at a fixed 18% alpha, not its width, and no way to remove it. It
  // reads as a soft halo, which is why it looks like a hover effect that cannot
  // be turned off; there is no hover rule on the avatar anywhere.
  //
  // Emitted only where the block declares `avatarRing`, so the three layouts that
  // draw their own avatar -- case study, toast, avatar list -- are untouched, the
  // same set the Image Border control already skips.
  //
  // An empty colour keeps `--btb-ring`, so a ring nobody has recoloured still
  // follows the Accent role the way it always has.
  const avatarRingCSS =
    undefined !== attributes?.avatarRing
      ? `${mainEl} .single .authorImg .img {
			box-shadow: ${
        avatarRing
          ? `0 0 0 ${isSet(avatarRingWidth) ? avatarRingWidth : 3}px ${
              avatarRingColor || "var(--btb-ring)"
            }`
          : "none"
      };
		}`
      : "";

  // The FAQ Review Accordion's row box.
  //
  // layoutControls.js withholds the Card panel from this layout so the sidebar
  // cannot outrank `.btb-faq-item[open] { border-color: var(--btb-accent) }`,
  // which is what marks the expanded row. That is right for the border and only
  // for the border -- radius, background, shadow, row gap and the two paddings
  // were pinned in frontend.scss with nothing to reach them, so withholding one
  // control had withheld six.
  //
  // Nothing here writes `border-color` or `border-width`, so the open row keeps
  // its accent and the Colors panel keeps both.
  const faqItemEl = `${mainEl} .btb-faq-item`;

  const faqBoxCSS = [
    faqRadius ? `border-radius: ${faqRadius};` : "",
    // 0 is a real gap: it butts the rows into one block.
    isSet(faqRowGap) ? `margin-bottom: ${faqRowGap}px;` : "",
    faqBg ? `background-color: ${faqBg};` : "",
    getShadowCSS(faqShadow) ? `box-shadow: ${getShadowCSS(faqShadow)};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const faqQuestionPaddingCSS = getBoxCSS(faqQuestionPadding);
  const faqAnswerPaddingCSS = getBoxCSS(faqAnswerPadding);

  const faqCSS =
    "faq-testimonial-accordion" === layout
      ? [
          faqBoxCSS
            ? `${faqItemEl} {
			${faqBoxCSS}
		}`
            : "",
          faqQuestionPaddingCSS
            ? `${faqItemEl} .btb-faq-question {
			padding: ${faqQuestionPaddingCSS};
		}`
            : "",
          faqAnswerPaddingCSS
            ? `${faqItemEl} .btb-faq-answer {
			padding: ${faqAnswerPaddingCSS};
		}`
            : "",
        ]
          .filter(Boolean)
          .join(`

		`)
      : "";

  // The Trust Badges grid.
  //
  // This block registers its own editor, and that editor renders the Colors
  // panel and Width & Height and nothing else -- no Card panel, no typography
  // panels. So every size in trust-badges.scss was final: a 16px/700 title, a
  // 14px subtitle, a 44px icon at a 14px gap, an 18px by 20px box at radius 10
  // with no shadow, and the icon always beside the text.
  //
  // The Card panel would not have helped even if it were offered. Its box rule
  // names `.btb-trust-badges-grid`, which is the wrapper of the four-badge
  // fallback shown before any badge is added, and the grid rather than a badge
  // in it -- so nothing in it reaches `.badge-item`, which is what both the
  // editor and the published page render once the repeater has content.
  //
  // The fallback is styled alongside it, so it keeps up with the repeater.
  const badgeItemEl = `${mainEl} .badge-item`;
  const badgeFallbackEl = `${mainEl} .btb-trust-item`;

  const badgePaddingCSS = getBoxCSS(badgePadding);

  // Joined with spaces rather than newlines: these are declarations inside one
  // rule, and CSS does not care which whitespace separates them.
  const badgeVars = [
    isSet(badgeIconSize) ? `--btb-badge-icon: ${badgeIconSize}px;` : "",
    isSet(badgeIconGap) ? `--btb-badge-gap: ${badgeIconGap}px;` : "",
    badgePaddingCSS ? `--btb-badge-padding: ${badgePaddingCSS};` : "",
    badgeRadius ? `--btb-badge-radius: ${badgeRadius};` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const badgeShadowCSS = getShadowCSS(badgeShadow);

  const trustBadgeCSS =
    "trust-badges" === layout
      ? [
          badgeVars
            ? `${mainEl} {
			${badgeVars}
		}`
            : "",
          // The badge ships flat, so this adds a shadow rather than replacing
          // one, and an untouched block stays flat.
          badgeShadowCSS
            ? `${badgeItemEl},
		${badgeFallbackEl} {
			box-shadow: ${badgeShadowCSS};
		}`
            : "",
          // On the fallback the label is the item's own text, so the title
          // typography lands on the item there rather than on a child of it.
          typoCSS(
            `${badgeItemEl} .badge-title,
		${badgeFallbackEl}`,
            badgeTitleTypo,
          ),
          typoCSS(`${badgeItemEl} .badge-subtitle`, badgeSubtitleTypo),
        ]
          .filter(Boolean)
          .join(`

		`)
      : "";

  // These are `@import url(...)` statements, and CSS drops any @import that
  // follows a style rule -- an empty ruleset counts as a rule. So they have to
  // be emitted before everything else below, or every block silently loses its
  // font family and falls back to the generic category. Collected here so the
  // constraint survives reformatting instead of depending on line order.
  const fontImports = [
    nameTypo,
    degTypo,
    textTypo,
    expandedTypo,
    labelTypo,
    inputTypo,
    pollTitleTypo,
    pollDescTypo,
    pollLabelTypo,
    pollBtnTypo,
    badgeScoreTypo,
    badgeTitleTypo,
    badgeSubtitleTypo,
  ]
    .map((typo) => getTypoCSS("", typo)?.googleFontLink || "")
    .filter(Boolean)
    .join("\n");
  // Every rule below names `.single` on its own rather than
  // `.layoutSection .single`.
  //
  // The hero spotlight renders its card straight inside `.btb-hero-card`, with
  // no `.layoutSection` anywhere, so the narrower selector missed it and the
  // whole Style tab slid off that block: the avatar ignored the Image width and
  // height and rendered at its natural 589px -- inflating the card to 860px, at
  // which point Card Height had nothing left to do -- and the card took none of
  // the background, padding, border, shadow, colours or typography set for it.
  // Measured against a grid block on the same page, not inferred.
  //
  // The hero card therefore now carries the same Card defaults as every other
  // layout, in place of the flat 28px padding its stylesheet used to give it.
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
		${fontImports}

	
		
		${
      getTypoCSS(
        selectorList([...NAME_PARTS, ...NAME_TYPO_ONLY]),
        nameTypo,
      )?.styles || ""
    }
		${getTypoCSS(selectorList(DEG_PARTS), degTypo)?.styles || ""}
		${getTypoCSS(selectorList(TEXT_PARTS), textTypo)?.styles || ""}
		${getTypoCSS(`${mainEl} .expandBtn`, expandedTypo)?.styles || ""}

		${/* The badge's score, and the star row beside it.
		     Neither maps onto a shared role: the score is a bold number the
		     stylesheet sets at 18px/800, and the stars are five glyphs whose only
		     real question is how big they are. Both were literals with nothing in
		     the sidebar to change them.

		     Their colours are not touched here -- the score already reads
		     `--btb-title` and the stars `--btb-star`, so the Colors panel's Title
		     and Rating Stars roles reach both, and painting them again from a
		     second control would only give an author two ways to set one
		     pixel. */ ""}
		${getTypoCSS(`${mainEl} .btb-badge-rating .score`, badgeScoreTypo)?.styles || ""}
		${
      isSet(badgeStarsSize)
        ? `${mainEl} .btb-badge-rating .stars {\n\t\t\tfont-size: ${badgeStarsSize}px;\n\t\t}`
        : ""
    }

		${/* The brand mark's box. Google, Capterra, Facebook, Trustpilot and G2
		     each draw their own logo at a hardcoded 36px in Layout.js, and the
		     icon controls skip them on purpose -- the marks are other companies'
		     trademarks -- which left the size with no control either.

		     A rule rather than a prop: the SVG's own `width` and `height` are
		     presentation attributes, and any selector naming the element beats
		     them, so nothing in Layout.js has to change.

		     The other two badges carry the same class but are not offered the
		     control: their logo is a real icon slot, so its size is the Icon
		     panel's Icon Size. With no control the attribute stays unset and no
		     rule is written, which is what keeps the two from having two ways to
		     set one pixel. */ ""}
		${
      isSet(badgeLogoSize)
        ? `${mainEl} .btb-badge-brand-logo {\n\t\t\twidth: ${badgeLogoSize}px;\n\t\t\theight: ${badgeLogoSize}px;\n\t\t}`
        : ""
    }
 
		
		${mainEl} .slider-layout .swiper-slide {
			
		}

		${mainEl} {
			${getPaletteCSS(attributes, layout)}
		}

		${mainEl} .layoutSection {
			grid-gap: ${rowGap} ${columnGap};
		}

		${/* The bubble layout is the one bespoke wrapper where a gap is a real
		     question: it is a wrapping flex row of several bubbles, spaced by a
		     `gap` of its own. Every other layout without `.layoutSection` either
		     holds a single widget -- where there is nothing to space it from --
		     or stacks its items with a margin. Its own rule rather than joining
		     the selector above, because `grid-gap` is the legacy grid alias and
		     this one is flex. */ ""}
		${mainEl} .btb-floating-bubble-layout {
			gap: ${rowGap} ${columnGap};
		}

		${mainEl} .theme_2 .single .top,
		${mainEl} .masonry-layout .single .top,
		${mainEl} .btb-masonry-layout .single .top {
			background-color:${grid2Bg};
			padding:${getBoxValue(grid2Padding)};
			${getBorderCSS(grid2Border)};
		}

		${mainEl} .theme_4 .single .bottom{
			border-top:${border?.width || "0px"} ${border?.style || "solid"} ${
        border?.color || "transparent"
      };
		}

		${mainEl} .theme_4 .single .info {
			border-left: ${border?.width || "0px"} ${border?.style || "solid"} ${
        border?.color || "transparent"
      };
		}

		${/* The card box. `.btb-avatar-detail` in place of
		     `.btb-avatar-list-wrapper`: the wrapper is a transparent container
		     and the box a reader sees is the panel inside it, which carried its
		     own background, padding, border and shadow in the stylesheet -- so
		     the Card panel painted something invisible while the visible box
		     ignored it. The wrapper stays in the margin list, which is the one
		     thing it is the right element for.

		     The last two build their card out of neither `.single` nor any of
		     the widget classes, so the Card panel reached nothing on them at
		     all. Their stylesheet values now live in each block's defaults.

		     `.btb-faq-item` is deliberately absent: the stylesheet recolours its
		     border on `[open]` to mark the expanded row, and an ID-scoped border
		     from here would outrank that. */ ""}
		${cardPaintEl} {
			${/* `background-color`, not the `background` shorthand. The shorthand
			     also resets `background-image`, which erased the quote box's
			     `linear-gradient(135deg, var(--btb-surface), var(--btb-track))`
			     -- so its Card Gradient End control painted nothing and the card
			     rendered flat. Measured: `background-image` computed `none` with
			     the gradient's own rule matching. Every other layout paints its
			     card with a plain colour, so dropping the shorthand changes
			     nothing for them. */ ""}
			background-color:${withRole("--btb-surface", background)};
			padding:${getBoxValue(ownBoxForDevice(padding, "desktop"))};
			${paletteBorderCSS(border)};
			${cardBoxShadowCSS}
		}

		${/* Hover, straight after the resting rule it has to beat. Same ID, same
		     element, later in the sheet -- which is exactly what the stylesheet's
		     own hover rule could not manage. */ ""}
		${cardHoverCSS ? `${cardPaintHoverEl} {
			${cardHoverCSS}
		}` : ""}

		${cardMarginCSS ? `${cardMarginEl} {\n\t\t\tmargin: ${cardMarginCSS};\n\t\t}` : ""}
 
		${mainEl} .single .img{
			${/* Width and height are emitted per device by sizeCSS below. A fixed
			     px avatar is wider than the card on a narrow screen, so it is
			     capped here rather than allowed to push out of the card. */ ""}
			max-width: 100%;
			${getBorderCSS(imgBorder)};
		}

		${selectorList(colorParts(NAME_PARTS))} {
			color:${withRole("--btb-title", nameColor)};
		}

		${selectorList(colorParts(DEG_PARTS))} {
			color:${withRole("--btb-muted", degColor)};
		}

		${
      degDividerCSS
        ? `${mainEl} .theme_1 .single .footer .deg::after {\n\t\t\t${degDividerCSS}\n\t\t}`
        : ""
    }

		${selectorList(colorParts(TEXT_PARTS))} {
			color:${withRole("--btb-body", textColor)};
		}

		${/* The rating cell is inside `.btb-ct-table td`, so the Body Text rule
		     above -- ID-scoped, and therefore stronger than the stylesheet's
		     `.btb-ct-rating { color: var(--btb-star) }` -- was repainting the
		     stars with the body colour and leaving Rating Stars dead. Restating
		     it here at the same specificity, after that rule, hands the cell
		     back. Measured: the stars computed the body colour while
		     `--btb-star` sat declared and unused. */ ""}
		${mainEl} .btb-ct-table .btb-ct-rating {
			color:${withRole("--btb-star", starIconColor)};
		}

		${mainEl} .btb-srb-title {
			color: ${withRole("--btb-title", nameColor || "#1e293b")};
		}

		${/* Split from the label: the stylesheet paints the count with
		     --btb-muted and the label with --btb-body, so grouping them meant
		     Secondary Text had nothing left to colour on this layout. */ ""}
		${mainEl} .btb-srb-label {
			color: ${withRole("--btb-body", textColor || "#334155")};
		}

		${/* The per-star count is the Designation role -- that is where its
		     typography comes from, and `--btb-muted` is the palette role beside
		     it. It read `textColor` here, so the Designation panel's colour
		     control had no target on this layout while its typography worked. */ ""}
		${mainEl} .btb-srb-count {
			color: ${withRole("--btb-muted", degColor || "#334155")};
		}

		${expandColor ? `${mainEl} .expandBtn { color: ${expandColor}; }` : ""}

		${
      expandHoverColor
        ? `${mainEl} .expandBtn:hover, ${mainEl} .expandBtn:focus-visible { color: ${expandHoverColor}; }`
        : ""
    }

		${mainEl} .btb-srb-fill {
			background: ${ratingColor || starIconColor || "#f59e0b"};
		}

		${navVars ? `${mainEl} .swiper {\n\t\t\t${navVars}\n\t\t}` : ""}

		${arrowBox ? `${arrowEl} {\n\t\t\t${arrowBox}\n\t\t}` : ""}

		${arrowGlyph ? `${arrowAfterEl} {\n\t\t\t${arrowGlyph}\n\t\t}` : ""}

		${
      arrowHover
        ? `${mainEl} .swiper-button-prev:hover, ${mainEl} .swiper-button-next:hover {\n\t\t\t${arrowHover}\n\t\t}`
        : ""
    }

		${/* The Testimonial Form's labels and inputs. After the shared colour and
		     typography rules above, which name none of these elements, and before
		     the size rules, which carry their own media queries. */ ""}
		${formCSS}

		${/* The poll's text, scale buttons and box, on the same terms. */ ""}
		${pollCSS}

		${/* The Gradient Border Grid's ring and score pill. After the card box rule
		     above, whose `background-color` the ring has to sit on top of. */ ""}
		${gradientCSS}

		${/* Its header wash, after the `.theme_2 .single .top` rule above that
		     paints the colour underneath it. */ ""}
		${headerWashCSS}

		${/* The Speech Bubble tail: geometry, position, fill and outline. */ ""}
		${bubbleCSS}

		${/* The Trust Badges box, icon and text. */ ""}
		${trustBadgeCSS}

		${/* The FAQ accordion's row box. */ ""}
		${faqCSS}

		${/* The avatar ring. */ ""}
		${avatarRingCSS}

		${/* The card's corner wash, at rest and on hover. */ ""}
		${cardWashCSS}

		${/* The 3D arrangements' side-card fade. */ ""}
		${sideOpacityCSS}

		${/* The popup modal's box and text sizes, and the rating star's size. */ ""}
		${modalCSS}

		${starSizeCSS}

		${compactStarCSS}

		${sizeCSS("desktop")}

		${tabletSize ? `${tabBreakpoint} {\n\t\t${tabletSize}\n\t\t}` : ""}

		${mobileSize ? `${mobileBreakpoint} {\n\t\t${mobileSize}\n\t\t}` : ""}

		${/* Last, so an explicit side beats the auto centring the per-device Block
		     Width rules above apply -- including the ones inside the media queries. */ ""}
		${blockMarginCSS ? `${widthEl} {\n\t\t\t${blockMarginCSS}\n\t\t}` : ""}

		${blockAlignCSS}

		${blockMarginBreakpoints}
	`,
      }}
    />
  );
};

export default Style;
