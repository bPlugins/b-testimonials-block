
import { getStar } from '../../../utils/functions';
import Image from '../Image';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const ThemeSix = ({ itemEls, item, index, attributes, activeIndex, setActiveIndex, isBackend }) => {
    const { starIconColor } = attributes;
    const { img, reviewText, rating } = item;

    return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

        <div className="top">
            <ReviewText attributes={attributes} itemEls={itemEls} isBackend={isBackend} reviewText={reviewText} />
        </div>

        <div className="bottom">
            <Image attributes={attributes} img={img}>{itemEls.img}</Image>
            <div className='info'>
                {itemEls.name}
                {itemEls.deg}

                <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
            </div>
        </div>
    </div>
}
export default ThemeSix;