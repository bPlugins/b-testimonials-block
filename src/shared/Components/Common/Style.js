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
    degDivider = {},
  } = attributes || {};

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
  } = slider && "object" === typeof slider ? slider : {};

  const arrowEl = `${mainEl} .swiper-button-prev, ${mainEl} .swiper-button-next`;
  const arrowAfterEl = `${mainEl} .swiper-button-prev::after, ${mainEl} .swiper-button-next::after`;
  const navBox = "var(--swiper-navigation-size, 44px)";

  // Any one of these means the user has taken over the arrow's appearance.
  const isArrowStyled = !!(navSize || navBg || navBorder);

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
  ]
    .filter(Boolean)
    .join("\n\t\t\t");

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
  const cardMarginCSS = getBoxCSS(cardMargin);

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

  // The short rule under the designation on Theme 1, which had no control of any
  // kind -- the stylesheet fixed it at #cccccc, 1px, 30px wide.
  //
  // Written as `border-width` / `border-color` rather than the `border`
  // shorthand so the stylesheet keeps supplying `solid`, and so setting one of
  // the three leaves the other two exactly as they render today.
  //
  // 0 is a real choice for both thickness and length -- either one removes the
  // rule -- so only an absent value is skipped.
  const isSet = (value) =>
    undefined !== value && null !== value && "" !== value;

  const degDividerCSS = [
    isSet(degDivider?.width) ? `border-width: ${degDivider.width}px;` : "",
    degDivider?.color ? `border-color: ${degDivider.color};` : "",
    isSet(degDivider?.length) ? `width: ${degDivider.length}px;` : "",
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
  const blockMarginCSS = ["top", "right", "bottom", "left"]
    .map((side) =>
      isSet(blockMargin?.[side]) ? `margin-${side}: ${blockMargin[side]};` : "",
    )
    .filter(Boolean)
    .join("\n\t\t\t");

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

  const sizeCSS = (device) => {
    const width = blockWidth?.[device];
    const height = cardHeight?.[device];

    return [
      // Centred once narrowed, otherwise it would sit against the left edge.
      width
        ? `${widthEl} {\n\t\t\tmax-width: ${width};\n\t\t\tmargin-left: auto;\n\t\t\tmargin-right: auto;\n\t\t}`
        : "",
      // Same selector list as Margin, for the same reason: `.layoutSection
      // .single` alone reached none of the layouts that build their card out of
      // something else, so Card Height silently did nothing on timeline, hero,
      // audio, logos, badges, stats and the rest.
      height ? `${cardMarginEl} {\n\t\t\tmin-height: ${height};\n\t\t}` : "",
    ]
      .filter(Boolean)
      .join("\n\t\t");
  };

  const tabletSize = sizeCSS("tablet");
  const mobileSize = sizeCSS("mobile");

  // These are `@import url(...)` statements, and CSS drops any @import that
  // follows a style rule -- an empty ruleset counts as a rule. So they have to
  // be emitted before everything else below, or every block silently loses its
  // font family and falls back to the generic category. Collected here so the
  // constraint survives reformatting instead of depending on line order.
  const fontImports = [nameTypo, degTypo, textTypo, expandedTypo]
    .map((typo) => getTypoCSS("", typo)?.googleFontLink || "")
    .filter(Boolean)
    .join("\n");
  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
		${fontImports}

	
		
		${
      getTypoCSS(
        `${mainEl} .layoutSection .single .name, ${mainEl} .btb-avatar-name`,
        nameTypo,
      )?.styles || ""
    }
		${
      getTypoCSS(
        `${mainEl} .layoutSection .single .deg, ${mainEl} .btb-avatar-deg`,
        degTypo,
      )?.styles || ""
    }
		${
      getTypoCSS(
        `${mainEl} .layoutSection .single .reviewText, ${mainEl} .btb-avatar-review`,
        textTypo,
      )?.styles || ""
    }
		${getTypoCSS(`${mainEl} .expandBtn`, expandedTypo)?.styles || ""}
 
		
		${mainEl} .slider-layout .swiper-slide {
			
		}

		${mainEl} {
			${getPaletteCSS(attributes, layout)}
		}

		${mainEl} .layoutSection {
			grid-gap: ${rowGap} ${columnGap};
		}

		${mainEl} .theme_2 .single .top,
		${mainEl} .masonry-layout .single .top,
		${mainEl} .btb-masonry-layout .single .top {
			background:${grid2Bg};
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

		${mainEl} .layoutSection .single,
		${mainEl} .btb-star-rating-bars,
		${mainEl} .btb-badge-card,
		${mainEl} .btb-stat-card,
		${mainEl} .btb-toast-card,
		${mainEl} .btb-avatar-list-wrapper,
		${mainEl} .btb-trust-badges-grid {
			background:${withRole("--btb-surface", background)};
			padding:${getBoxValue(padding)};
			${paletteBorderCSS(border)};
			box-shadow: ${getShadowCSS(shadow)};
		}

		${cardMarginCSS ? `${cardMarginEl} {\n\t\t\tmargin: ${cardMarginCSS};\n\t\t}` : ""}
 
		${mainEl} .layoutSection .single .img{
			width:${image?.width || 50}px;
			height:${image?.height || 50}px;
			${getBorderCSS(imgBorder)};
		}

		${mainEl} .layoutSection .single .name,
		${mainEl} .btb-avatar-name {
			color:${withRole("--btb-title", nameColor)};
		}

		${mainEl} .layoutSection .single .deg,
		${mainEl} .btb-avatar-deg {
			color:${withRole("--btb-muted", degColor)};
		}

		${
      degDividerCSS
        ? `${mainEl} .theme_1 .single .footer .deg::after {\n\t\t\t${degDividerCSS}\n\t\t}`
        : ""
    }

		${mainEl} .layoutSection .single .reviewText,
		${mainEl} .btb-avatar-review {
			color:${withRole("--btb-body", textColor)};
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

		${mainEl} .btb-srb-count {
			color: ${withRole("--btb-muted", textColor || "#334155")};
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

		${sizeCSS("desktop")}

		${tabletSize ? `${tabBreakpoint} {\n\t\t${tabletSize}\n\t\t}` : ""}

		${mobileSize ? `${mobileBreakpoint} {\n\t\t${mobileSize}\n\t\t}` : ""}

		${/* Last, so an explicit side beats the auto centring the per-device Block
		     Width rules above apply -- including the ones inside the media queries. */ ""}
		${blockMarginCSS ? `${widthEl} {\n\t\t\t${blockMarginCSS}\n\t\t}` : ""}
	`,
      }}
    />
  );
};

export default Style;
