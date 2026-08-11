import { getBoxValue } from "../../../../../bpl-tools/utils/functions";
import {
  getBorderCSS,
  getShadowCSS,
  getTypoCSS,
} from "../../../../../bpl-tools/utils/getCSS";
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
  } = attributes || {};

  const cId = clientId || attributes?.cId || "";
  const mainEl = cId ? `#btbTestimonialsDir-${cId}` : ".bTestimonials";

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
	`,
      }}
    />
  );
};

export default Style;
