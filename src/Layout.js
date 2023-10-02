
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


import Default from './Components/Themes/Default';
import ThemeOne from './Components/Themes/ThemeOne';
import ThemeTwo from './Components/Themes/ThemeTwo';
import ThemeThree from './Components/Themes/ThemeThree';
import ThemeFour from './Components/Themes/ThemeFour';
import ThemeFive from './Components/Themes/ThemeFive';
import ThemeSix from './Components/Themes/ThemeSix';
import Slider from './Components/Layout/Slider';

const Layout = ({ itemsEls, ToolbarButton, MediaUpload, MediaUploadCheck, attributes, setActiveIndex, activeIndex, updateItem, isBackend = false, __, RichText }) => {
    const { items, columnGap, rowGap, layout, theme, columns } = attributes;
    const { desktop, tablet, mobile } = columns;

    const itemProps = { attributes, setActiveIndex, activeIndex, updateItem, isBackend, __, RichText, MediaUpload, MediaUploadCheck, ToolbarButton }

    const themeSelect = (item, index) => {
        const itemProp = { item, index, itemEls: itemsEls[index], ...itemProps }

        switch (theme) {
            case 'default':
                return <Default {...itemProp} />;
            case 'theme_1':
                return <ThemeOne {...itemProp} />;
            case 'theme_2':
                return <ThemeTwo {...itemProp} />;
            case 'theme_3':
                return <ThemeThree {...itemProp} />;
            case 'theme_4':
                return <ThemeFour {...itemProp} />;
            case 'theme_5':
                return <ThemeFive {...itemProp} />;
            case 'theme_6':
                return <ThemeSix {...itemProp} />;
            default:
                return null;
        }
    }

    return (
        <div className={`layoutSection ${layout}-layout ${theme} columns-${desktop} columns-tablet-${tablet} columns-mobile-${mobile}`}>
            {(() => {
                switch (layout) {
                    case 'masonry':
                        return (
                            <ResponsiveMasonry columnsCountBreakPoints={{ 0: mobile, 576: tablet, 768: desktop }}>
                                <Masonry columnsCount={3} gutter={`${rowGap} ${columnGap}`}>
                                    {items.map((item, index) => {
                                        return themeSelect(item, index);
                                    })}
                                </Masonry>
                            </ResponsiveMasonry>
                        );
                    case 'slider':
                        // return (
                        //     <Swiper modules={[Navigation, A11y, Autoplay, Mousewheel]} spaceBetween={columnGap} slidesPerView={mobile} breakpoints={{ 576: { slidesPerView: tablet }, 768: { slidesPerView: desktop } }} autoplay={{ delay: 2500, disableOnInteraction: false, }} mousewheel={true} navigation={true} pagination={true} scrollbar={{ draggable: true }}>

                        //         {items.map((item, index) => {
                        //             const itemProp = { item, index, itemEls: itemsEls[index], ...itemProps }

                        //             switch (theme) {
                        //                 case 'default':
                        //                     return <SwiperSlide key={index}>
                        //                         <Default {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_1':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeOne {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_2':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeTwo {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_3':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeThree {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_4':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeFour {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_5':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeFive {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 case 'theme_6':
                        //                     return <SwiperSlide key={index}>
                        //                         <ThemeSix {...itemProp} />
                        //                     </SwiperSlide>;
                        //                 default:
                        //                     return null;
                        //             }
                        //         })}
                        //     </Swiper>
                        // );
                        return <Slider attributes={attributes} itemsEls={itemsEls} itemProps={itemProps} />
                    case 'default':
                        return items.map((item, index) => {
                            return themeSelect(item, index);
                        })
                    default:
                        return null;
                }
            })()}
        </div>
    );

}
export default Layout;