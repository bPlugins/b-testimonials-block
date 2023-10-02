
import Image from '../Image';
import ReviewText from '../ReviewText';
import { rightQuote } from '../../utils/icons';

const ThemeFour = ({ itemEls, item, index, attributes, activeIndex, setActiveIndex, isBackend }) => {
    const { nameColor, quoteIcon } = attributes;
    const { img, reviewText } = item;

    return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

        <div className="top">
            <Image attributes={attributes} img={img}>{itemEls.img}</Image>
        </div>

        <div className="body">
            <ReviewText attributes={attributes} itemEls={itemEls} isBackend={isBackend} reviewText={reviewText} />
        </div>

        <div className="bottom">
            <div className="rightQuote">
                {rightQuote(nameColor, quoteIcon?.size)}
            </div>
            <div className='info'>
                {itemEls.name}
                {itemEls.deg}
            </div>
        </div>
    </div>
}
export default ThemeFour;