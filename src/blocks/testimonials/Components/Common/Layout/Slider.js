
import { useState, useEffect } from 'react';
import { Navigation, A11y, Autoplay, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Default from '../Themes/Default';
import ThemeOne from '../Themes/ThemeOne';
import ThemeTwo from '../Themes/ThemeTwo';
import ThemeThree from '../Themes/ThemeThree';
import ThemeFour from '../Themes/ThemeFour';
import ThemeFive from '../Themes/ThemeFive';
import ThemeSix from '../Themes/ThemeSix';

const Slider = ({ attributes, itemsEls, itemProps }) => {
    const { items, slider, columnGap, theme, columns } = attributes;
    const { desktop, tablet, mobile } = columns;
    const { autoPlay, mouseWheel, navigation } = slider;
    const [rendered, setRendered] = useState(true);

    const SwiperEl = () => <Swiper modules={[Navigation, A11y, Autoplay, Mousewheel]} spaceBetween={columnGap} slidesPerView={mobile} breakpoints={{ 576: { slidesPerView: tablet }, 768: { slidesPerView: desktop } }} autoplay={autoPlay} mousewheel={mouseWheel} navigation={navigation} pagination={true} scrollbar={{ draggable: true }}  >

        {items.map((item, index) => {
            const itemProp = { item, index, itemEls: itemsEls[index], ...itemProps }

            switch (theme) {
                case 'default':
                    return <SwiperSlide key={index}>
                        <Default {...itemProp} />
                    </SwiperSlide>;
                case 'theme_1':
                    return <SwiperSlide key={index}>
                        <ThemeOne {...itemProp} />
                    </SwiperSlide>;
                case 'theme_2':
                    return <SwiperSlide key={index}>
                        <ThemeTwo {...itemProp} />
                    </SwiperSlide>;
                case 'theme_3':
                    return <SwiperSlide key={index}>
                        <ThemeThree {...itemProp} />
                    </SwiperSlide>;
                case 'theme_4':
                    return <SwiperSlide key={index}>
                        <ThemeFour {...itemProp} />
                    </SwiperSlide>;
                case 'theme_5':
                    return <SwiperSlide key={index}>
                        <ThemeFive {...itemProp} />
                    </SwiperSlide>;
                case 'theme_6':
                    return <SwiperSlide key={index}>
                        <ThemeSix {...itemProp} />
                    </SwiperSlide>;
                default:
                    return null;
            }
        })}
    </Swiper>

    useEffect(() => {
        setRendered(!rendered);
    }, [items, slider, columnGap, theme, columns]);

    return <SwiperEl />
}
export default Slider;