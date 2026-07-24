import { getBoxValue } from 'bpl-tools/utils/functions';
import { getBorderCSS, getShadowCSS, getTypoCSS } from 'bpl-tools/utils/getCSS';

const Style = ({ attributes = {}, clientId }) => {
	const {
		columnGap = '30px',
		rowGap = '40px',
		background = '#0000',
		padding = {},
		border = {},
		shadow = {},
		image = { width: 50, height: 50 },
		imgBorder = {},
		nameTypo = {},
		nameColor = '#000',
		degTypo = {},
		degColor = '#7B7B7B',
		textTypo = {},
		textColor = '#000',
		expandedTypo = {},
		grid2Bg = '#f9f8f8',
		grid2Padding = {},
	} = attributes || {};

	const mainEl = `#btbTestimonialsDir-${clientId}`;
	return (
		<style
			dangerouslySetInnerHTML={{
				__html: `
		${getTypoCSS('', nameTypo)?.googleFontLink || ''}
		${getTypoCSS('', degTypo)?.googleFontLink || ''}
		${getTypoCSS('', textTypo)?.googleFontLink || ''}
		${getTypoCSS('', expandedTypo)?.googleFontLink || ''}
		${getTypoCSS(`${mainEl} .layoutSection .single .name`, nameTypo)?.styles || ''}
		${getTypoCSS(`${mainEl} .layoutSection .single .deg`, degTypo)?.styles || ''}
		${getTypoCSS(`${mainEl} .layoutSection .single .reviewText`, textTypo)?.styles || ''}

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
			border-top:${border?.width || '0px'} ${border?.style || 'solid'} ${border?.color || 'transparent'};
		}

		${mainEl} .theme_4 .single .info {
			border-left: ${border?.width || '0px'} ${border?.style || 'solid'} ${border?.color || 'transparent'};
		}

		${mainEl} .layoutSection .single {
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

		${mainEl} .layoutSection .single .name{
			color:${nameColor};
		}

		${mainEl} .layoutSection .single .deg{
			color:${degColor};
		}

		${mainEl} .layoutSection .single .reviewText{
			color:${textColor};
		}

	`,
			}}
		/>
	);
};

export default Style;