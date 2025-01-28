
import { getStar } from '../../../utils/functions';
import Image from '../Image';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const ThemeOne = ({ attributes, itemEls, item, index, activeIndex, setActiveIndex, isBackend }) => {
    const { starIconColor } = attributes;
    const { img, reviewText, rating } = item;

    return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

        <div className="top">
            <Image attributes={attributes} img={img}>{itemEls.img}</Image>
        </div>

        <div className="body">
            <ReviewText itemEls={itemEls} attributes={attributes} isBackend={isBackend} reviewText={reviewText} />
        </div>

        <div className="footer">
            <div className='info'>
                {itemEls.name}
                {itemEls.deg}
            </div>
            <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
        </div>
    </div>
}
export default ThemeOne;