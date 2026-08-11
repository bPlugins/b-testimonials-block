
import Image from '../Image';
import ReviewText from '../ReviewText';
import RatingIcon from '../RatingIcon';
import { getStar } from '../../../utils/functions';
import { editorClickable } from '../../../utils/a11y';

const ThemeFive = ({ itemEls = {}, item = {}, index, attributes = {}, activeIndex, setActiveIndex, isBackend }) => {
    const { starIconColor } = attributes || {};
    const { img = {}, reviewText = '', rating = 5 } = item || {};

    return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} {...editorClickable(isBackend, () => setActiveIndex(index))}>

        <div className="top">
            <Image attributes={attributes} img={img}>{itemEls?.img}</Image>

            <div className="right">
                <ReviewText attributes={attributes} itemEls={itemEls} isBackend={isBackend} reviewText={reviewText} />
            </div>
        </div>

        <div className="bottom">
            <div className='info'>
                {itemEls?.name}
                {itemEls?.deg}
            </div>
            <RatingIcon attributes={attributes} getStar={getStar} rating={rating} starIconColor={starIconColor} />
        </div>
    </div>
}
export default ThemeFive;