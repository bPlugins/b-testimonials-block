import { Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import Default from '../Themes/Default';
import ThemeOne from '../Themes/ThemeOne';
import ThemeTwo from '../Themes/ThemeTwo';
import ThemeThree from '../Themes/ThemeThree';
import ThemeFour from '../Themes/ThemeFour';
import ThemeFive from '../Themes/ThemeFive';
import ThemeSix from '../Themes/ThemeSix';

const Slider = ({ attributes = {}, itemsEls = [], itemProps = {} }) => {
	const { items = [], slider = {}, columnGap = '30px', theme = 'default', columns = {}, layout } = attributes || {};
	const { desktop = 3, tablet = 2, mobile = 1 } = (columns && typeof columns === 'object') ? columns : { desktop: 3, tablet: 2, mobile: 1 };
	const { autoPlay = true, mouseWheel = true, navigation = true } = (slider && typeof slider === 'object') ? slider : { autoPlay: true, mouseWheel: true, navigation: true };

	const is3D = layout === 'slider-3d';
	const isCoverflow = layout === 'coverflow' || is3D;
	const spaceBetweenVal = parseInt( columnGap, 10 ) || 30;

	return (
		<Swiper
			key={ `${ layout }-${ theme }-${ items.length }-${ spaceBetweenVal }` }
			modules={ [ Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow ] }
			effect={ isCoverflow ? 'coverflow' : undefined }
			coverflowEffect={ isCoverflow ? {
				rotate: is3D ? 50 : 35,
				stretch: 0,
				depth: is3D ? 150 : 100,
				modifier: 1,
				slideShadows: true,
			} : undefined }
			centeredSlides={ isCoverflow }
			grabCursor={ true }
			loop={ items.length > 2 }
			spaceBetween={ spaceBetweenVal }
			slidesPerView={ mobile }
			breakpoints={ { 576: { slidesPerView: tablet }, 768: { slidesPerView: desktop } } }
			autoplay={ autoPlay ? { delay: 3000, disableOnInteraction: false } : false }
			mousewheel={ mouseWheel }
			navigation={ navigation }
			pagination={ { clickable: true } }
		>
			{ items.map( ( item, index ) => {
				const itemProp = { item, index, itemEls: itemsEls?.[ index ] || {}, ...itemProps };

				let content;
				switch ( theme ) {
					case 'theme_1':
						content = <ThemeOne { ...itemProp } />;
						break;
					case 'theme_2':
						content = <ThemeTwo { ...itemProp } />;
						break;
					case 'theme_3':
						content = <ThemeThree { ...itemProp } />;
						break;
					case 'theme_4':
						content = <ThemeFour { ...itemProp } />;
						break;
					case 'theme_5':
						content = <ThemeFive { ...itemProp } />;
						break;
					case 'theme_6':
						content = <ThemeSix { ...itemProp } />;
						break;
					default:
						content = <Default { ...itemProp } />;
						break;
				}

				return (
					<SwiperSlide key={ index }>
						{ content }
					</SwiperSlide>
				);
			} ) }
		</Swiper>
	);
};

export default Slider;