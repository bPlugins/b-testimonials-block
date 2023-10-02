
import { getStar } from '../../utils/functions';
import { symbol } from '../../utils/icons';
import Image from '../Image';
import ReviewText from '../ReviewText';
import RatingIcon from '../ratingIcon';

const ThemeTwo = ({ attributes, itemEls, item, index, activeIndex, setActiveIndex, isBackend }) => {
    const { starIconColor, grid2Bg } = attributes;

    const { img, reviewText, rating } = item;

    return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

        <div className="top">
            <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
            <ReviewText attributes={attributes} itemEls={itemEls} isBackend={isBackend} reviewText={reviewText} />
            <div className="icon">
                {symbol(grid2Bg)}
            </div>
        </div>

        <div className="bottom">
            <Image attributes={attributes} img={img}>{itemEls.img}</Image>
            <div className='info'>
                {itemEls.name}
                {itemEls.deg}
            </div>
        </div>
    </div>
}
export default ThemeTwo;