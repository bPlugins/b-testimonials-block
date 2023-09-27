
import Default from './Components/Style/Default';
import Grid_1 from './Components/Style/Grid_1';
import Grid_2 from './Components/Style/Grid_2';
import Grid_3 from './Components/Style/Grid_3';
import Grid_4 from './Components/Style/Grid_4';
import Grid_5 from './Components/Style/Grid_5';
import MasonryLayout from './Components/Style/MasonryLayout';

const Layout = ({ ToolbarButton, MediaUpload, MediaUploadCheck, attributes, setActiveIndex, activeIndex, updateItem, isBackend, __, RichText }) => {
    const { layout, columns } = attributes;

    return <div className={`layoutSection ${layout} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
        {(() => {
            switch (layout) {
                case 'default':
                    return <Default attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'grid_1':
                    return <Grid_1 attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'grid_2':
                    return <Grid_2 attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'grid_3':
                    return <Grid_3 attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'grid_4':
                    return <Grid_4 attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'grid_5':
                    return <Grid_5 attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                case 'masonry':
                    return <MasonryLayout attributes={attributes} setActiveIndex={setActiveIndex} activeIndex={activeIndex} updateItem={updateItem} isBackend={isBackend} __={__} RichText={RichText} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} ToolbarButton={ToolbarButton} />;
                default:
                    return null;
            }
        })()}</div>
}
export default Layout;