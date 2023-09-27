

import { getStar } from '../../utils/functions';
import Image from '../Image';
import Name from '../Name';
import Designation from '../Designation';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const Default = ({ ToolbarButton, MediaUpload, MediaUploadCheck, attributes, activeIndex, setActiveIndex, updateItem, isBackend, __, RichText }) => {
    const { items, starIconColor } = attributes;

    return items.map((item, index) => {
        const { img, name, deg, reviewText, rating } = item;

        return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

            <div className="top">
                <Image attributes={attributes} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={isBackend} img={img} updateItem={updateItem} />

                <div className='info'>
                    <Name attributes={attributes} isBackend={isBackend} RichText={RichText} updateItem={updateItem} __={__} name={name} />
                    <Designation attributes={attributes} isBackend={isBackend} RichText={RichText} deg={deg} updateItem={updateItem} __={__} />
                </div>
            </div>

            <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />

            <div className="body">
                <ReviewText isBackend={isBackend} RichText={RichText} reviewText={reviewText} updateItem={updateItem} __={__} attributes={attributes} />
            </div>
        </div>
    });

}
export default Default;