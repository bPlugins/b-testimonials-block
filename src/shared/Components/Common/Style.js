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
    starIconColor = "#FF8C02",
    slider = {},
    blockWidth = {},
    cardHeight = {},
    cardMargin = {},
  } = attributes || {};

  const cId = clientId || attributes?.cId || "";
  const mainEl = cId ? `#btbTestimonialsDir-${cId}` : ".bTestimonials";

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
  const cardEl = `${mainEl} .layoutSection .single`;

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
  ];
  const cardMarginEl = cardSelectors
    .map((selector) => `${mainEl} ${selector}`)
    .join(",\n\t\t");

  const sizeCSS = (device) => {
    const width = blockWidth?.[device];
    const height = cardHeight?.[device];

    return [
      // Centred once narrowed, otherwise it would sit against the left edge.
      width
        ? `${mainEl} {\n\t\t\tmax-width: ${width};\n\t\t\tmargin-left: auto;\n\t\t\tmargin-right: auto;\n\t\t}`
        : "",
      height ? `${cardEl} {\n\t\t\tmin-height: ${height};\n\t\t}` : "",
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

		${mainEl} .theme_2 .single .top, ${mainEl} .masonry .single .top {
			background:${grid2Bg};
			padding:${getBoxValue(grid2Padding)};
		}

		${mainEl} .masonry .single .top::after {
			border-right: 27px solid ${grid2Bg};
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
			background:${background};
			padding:${getBoxValue(padding)};
			${getBorderCSS(border)};
			box-shadow: ${getShadowCSS(shadow)};
		}

		${
      cardMarginCSS
        ? `${cardMarginEl} {\n\t\t\tmargin: ${cardMarginCSS};\n\t\t}`
        : ""
    }
 
		${mainEl} .layoutSection .single .img{
			width:${image?.width || 50}px;
			height:${image?.height || 50}px;
			${getBorderCSS(imgBorder)};
		}

		${mainEl} .layoutSection .single .name,
		${mainEl} .btb-avatar-name {
			color:${nameColor};
		}

		${mainEl} .layoutSection .single .deg,
		${mainEl} .btb-avatar-deg {
			color:${degColor};
		}

		${mainEl} .layoutSection .single .reviewText,
		${mainEl} .btb-avatar-review {
			color:${textColor};
		}

		${mainEl} .btb-srb-title {
			color: ${nameColor || "#1e293b"};
		}

		${mainEl} .btb-srb-label,
		${mainEl} .btb-srb-count {
			color: ${textColor || "#334155"};
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
	`,
      }}
    />
  );
};

export default Style;
