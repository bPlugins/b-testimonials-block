import { useState, useEffect } from 'react';
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
	const [rendered, setRendered] = useState(true);

	const isCoverflow = layout === 'coverflow' || layout === 'slider-3d';

	const SwiperEl = () => (
		<Swiper
			modules={[Navigation, A11y, Autoplay, Mousewheel, Pagination, EffectCoverflow]}
			effect={isCoverflow ? 'coverflow' : undefined}
			coverflowEffect={isCoverflow ? {
				rotate: 35,
				stretch: 0,
				depth: 100,
				modifier: 1,
				slideShadows: true,
			} : undefined}
			centeredSlides={isCoverflow}
			grabCursor={true}
			loop={items.length > 2}
			spaceBetween={columnGap}
			slidesPerView={mobile}
			breakpoints={{ 576: { slidesPerView: tablet }, 768: { slidesPerView: desktop } }}
			autoplay={autoPlay ? { delay: 3000, disableOnInteraction: false } : false}
			mousewheel={mouseWheel}
			navigation={navigation}
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
		>
			{items.map((item, index) => {
				const itemProp = { item, index, itemEls: itemsEls?.[index] || {}, ...itemProps };

				switch (theme) {
					case 'default':
						return (
							<SwiperSlide key={index}>
								<Default {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_1':
						return (
							<SwiperSlide key={index}>
								<ThemeOne {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_2':
						return (
							<SwiperSlide key={index}>
								<ThemeTwo {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_3':
						return (
							<SwiperSlide key={index}>
								<ThemeThree {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_4':
						return (
							<SwiperSlide key={index}>
								<ThemeFour {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_5':
						return (
							<SwiperSlide key={index}>
								<ThemeFive {...itemProp} />
							</SwiperSlide>
						);
					case 'theme_6':
						return (
							<SwiperSlide key={index}>
								<ThemeSix {...itemProp} />
							</SwiperSlide>
						);
					default:
						return (
							<SwiperSlide key={index}>
								<Default {...itemProp} />
							</SwiperSlide>
						);
				}
			})}
		</Swiper>
	);

	useEffect(() => {
		setRendered(!rendered);
	}, [items, slider, columnGap, theme, columns]);

	return <SwiperEl />;
};

export default Slider;