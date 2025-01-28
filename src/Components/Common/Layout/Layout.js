
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


import Default from '../Themes/Default';
import ThemeOne from '../Themes/ThemeOne';
import ThemeTwo from '../Themes/ThemeTwo';
import ThemeThree from '../Themes/ThemeThree';
import ThemeFour from '../Themes/ThemeFour';
import ThemeFive from '../Themes/ThemeFive';
import ThemeSix from '../Themes/ThemeSix';
import Slider from './Slider';

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