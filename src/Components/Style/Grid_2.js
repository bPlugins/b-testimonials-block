

import { getStar } from '../../utils/functions';
import { symbol } from '../../utils/icons';
import Designation from '../Designation';
import Image from '../Image';
import Name from '../Name';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const Grid_2 = ({ ToolbarButton, MediaUpload, MediaUploadCheck, attributes, activeIndex, setActiveIndex, updateItem, isBackend, __, RichText }) => {
    const { items, starIconColor, grid2Bg } = attributes;

    return items.map((item, index) => {
        const { img, name, deg, reviewText, rating } = item;

        return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

            <div className="top">
                <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
                <ReviewText attributes={attributes} isBackend={isBackend} RichText={RichText} reviewText={reviewText} updateItem={updateItem} __={__} />
                <div className="icon">
                    {symbol(grid2Bg)}
                </div>
            </div>

            <div className="bottom">
                <Image attributes={attributes} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={isBackend} img={img} updateItem={updateItem} />
                <div className='info'>
                    <Name attributes={attributes} isBackend={isBackend} RichText={RichText} updateItem={updateItem} __={__} name={name} />
                    <Designation attributes={attributes} isBackend={isBackend} RichText={RichText} deg={deg} updateItem={updateItem} __={__} />
                </div>
            </div>
        </div>
    });

}
export default Grid_2;