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

const Slider = ({ attributes = {}, itemsEls = [], itemProps = {}, isBackend = false, previewCols = 0, arrangement = '' }) => {
	const { items = [], slider = {}, columnGap = '30px', theme = 'default', columns = {}, layout } = attributes || {};
	const { desktop = 3, tablet = 2, mobile = 1 } = (columns && typeof columns === 'object') ? columns : { desktop: 3, tablet: 2, mobile: 1 };
	const { autoPlay = true, mouseWheel = true, navigation = true } = (slider && typeof slider === 'object') ? slider : { autoPlay: true, mouseWheel: true, navigation: true };

	// Read from the arrangement, so a slider-3d block set to a plain slider gets
	// a plain slider instead of keeping the coverflow effect from its layout.
	const effective = arrangement || layout;
	const is3D = effective === 'slider-3d';
	const isCoverflow = effective === 'coverflow' || is3D;
	const spaceBetweenVal = parseInt( columnGap, 10 ) || 30;

	return (
		<Swiper
			// previewCols is part of the key so switching device in the editor
			// remounts Swiper: it caches resolved breakpoint params internally and
			// would otherwise keep the previous slidesPerView.
			key={ `${ layout }-${ theme }-${ items.length }-${ spaceBetweenVal }-${ previewCols }` }
			modules={ [ Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow ] }
			effect={ isCoverflow ? 'coverflow' : undefined }
			// Both arrangements run Swiper's coverflow engine, but they are two
			// different looks rather than two settings of one look. They used to
			// differ only by rotate 50/35 and depth 150/100, which reads as noise:
			// picking 3D Slider over Coverflow appeared to do nothing.
			//
			// Coverflow keeps the classic angled fan. 3D Slider drops the rotation
			// entirely and leans on depth and scale instead, so the side slides
			// recede straight back rather than tilting -- a distinct silhouette
			// from the same module, with no extra effect to bundle.
			coverflowEffect={ isCoverflow ? ( is3D ? {
				rotate: 0,
				stretch: 0,
				depth: 300,
				scale: 0.85,
				modifier: 2,
				slideShadows: true,
			} : {
				rotate: 50,
				stretch: 0,
				depth: 100,
				scale: 1,
				modifier: 1,
				slideShadows: true,
			} ) : undefined }
			centeredSlides={ isCoverflow }
			grabCursor={ true }
			loop={ items.length > 2 }
			// Coverflow overlaps its slides on purpose -- that overlap is the
			// effect. A gap between them holds the side slides away from the
			// centre one and flattens it into a plain slider that happens to be
			// rotated, so the column gap is not applied here.
			spaceBetween={ isCoverflow ? 0 : spaceBetweenVal }
			// In the editor follow the device buttons directly: Swiper's
			// breakpoints measure the window by default, so inside a non-iframed
			// canvas they report the desktop width whichever device is picked.
			slidesPerView={ isBackend ? ( previewCols || desktop ) : mobile }
			// min-width breakpoints, so these are the CSS max-widths in
			// _devices.scss plus one -- keeps the slider in step with the grids.
			breakpoints={ isBackend ? undefined : { 641: { slidesPerView: tablet }, 1025: { slidesPerView: desktop } } }
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