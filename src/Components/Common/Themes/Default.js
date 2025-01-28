
import { getStar } from '../../../utils/functions';
import Image from '../Image';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const Default = ({ item, index, itemEls, attributes, activeIndex, setActiveIndex, isBackend, }) => {

    const { starIconColor } = attributes;
    const { img, reviewText, rating } = item;

    return <div className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

        <div className="top">
            <Image attributes={attributes} img={img}>{itemEls.img}</Image>

            <div className='info'>
                {itemEls.name}
                {itemEls.deg}
            </div>
        </div>

        <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
        <div className="body">
            <ReviewText attributes={attributes} itemEls={itemEls} isBackend={isBackend} reviewText={reviewText} />
        </div>
    </div>
}
export default Default;