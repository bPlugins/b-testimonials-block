
import { getBoxValue } from '../../../../bpl-tools/utils/functions';
import { getBorderCSS, getShadowCSS, getTypoCSS } from '../../../../bpl-tools/utils/getCSS';

const Style = ({ attributes, clientId }) => {
	const { columnGap, rowGap, background, padding, border, shadow, image, imgBorder, nameTypo, nameColor, degTypo, degColor, textTypo, textColor, expandedTypo, grid2Bg, grid2Padding } = attributes;

	const mainEl = `#btbTestimonialsDir-${clientId}`;
	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', nameTypo)?.googleFontLink}
		${getTypoCSS('', degTypo)?.googleFontLink}
		${getTypoCSS('', textTypo)?.googleFontLink}
		${getTypoCSS('', expandedTypo)?.googleFontLink}
		${getTypoCSS(`${mainEl} .layoutSection .single .name`, nameTypo)?.styles}
		${getTypoCSS(`${mainEl} .layoutSection .single .deg`, degTypo)?.styles}
		${getTypoCSS(`${mainEl} .layoutSection .single .reviewText`, textTypo)?.styles}

		${mainEl} .slider-layout .swiper-slide {
			 
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
			border-top:${border?.width} ${border?.style} ${border?.color};
		}

		${mainEl} .theme_4 .single .info {
			border-left: ${border?.width} ${border?.style} ${border?.color};
		}

		${mainEl} .layoutSection .single {
			background:${background};
			padding:${getBoxValue(padding)};
			${getBorderCSS(border)};
			box-shadow: ${getShadowCSS(shadow)};
		}
 
		${mainEl} .layoutSection .single .img{
			width:${image?.width}px;
			height:${image?.height}px;
			${getBorderCSS(imgBorder)};
		}

		${mainEl} .layoutSection .single .name{
			color:${nameColor};
		}

		${mainEl} .layoutSection .single .deg{
			color:${degColor};
		}

		${mainEl} .layoutSection .single .reviewText{
			color:${textColor};
		}

	`}} />;
}
export default Style;