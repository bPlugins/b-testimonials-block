

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import { getStar } from '../../utils/functions';
import Designation from '../Designation';
import Image from '../Image';
import Name from '../Name';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const MasonryLayout = ({ ToolbarButton, MediaUpload, MediaUploadCheck, attributes, activeIndex, setActiveIndex, updateItem, isBackend, __, RichText }) => {
    const { items, columnGap, rowGap, starIconColor, columns } = attributes;
    const { desktop, tablet, mobile } = columns;
    return <ResponsiveMasonry columnsCountBreakPoints={{ 0: mobile, 576: tablet, 768: desktop }}>
        <Masonry columnsCount={3} gutter={`${rowGap} ${columnGap}`}>
            {items.map((item, index) => {
                const { img, name, deg, reviewText, rating } = item;

                return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

                    <div className="top">
                        <ReviewText attributes={attributes} isBackend={isBackend} RichText={RichText} reviewText={reviewText} updateItem={updateItem} __={__} />

                    </div>

                    <div className="bottom">
                        <Image attributes={attributes} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={isBackend} img={img} updateItem={updateItem} />
                        <div className='info'>
                            <Name attributes={attributes} isBackend={isBackend} RichText={RichText} updateItem={updateItem} __={__} name={name} />
                            <Designation attributes={attributes} isBackend={isBackend} RichText={RichText} deg={deg} updateItem={updateItem} __={__} />

                            <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
                        </div>
                    </div>
                </div>
            })}
        </Masonry>
    </ResponsiveMasonry>
}
export default MasonryLayout;