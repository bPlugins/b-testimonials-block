
import Image from '../Image';
import Name from '../Name';
import Designation from '../Designation';
import ReviewText from '../ReviewText';
import { rightQuote } from '../../utils/icons';
const Grid_4 = ({ ToolbarButton, MediaUpload, MediaUploadCheck, attributes, activeIndex, setActiveIndex, updateItem, isBackend, __, RichText }) => {
    const { items, nameColor, quoteIcon } = attributes;

    return items.map((item, index) => {
        const { img, name, deg, reviewText } = item;

        return <div key={index} className={`single ${isBackend && index === activeIndex ? "btbNowEditing" : ""}`} onClick={() => isBackend && setActiveIndex(index)}>

            <div className="top">
                <Image attributes={attributes} ToolbarButton={ToolbarButton} MediaUpload={MediaUpload} MediaUploadCheck={MediaUploadCheck} isBackend={isBackend} img={img} updateItem={updateItem} />
            </div>

            <div className="body">
                <ReviewText attributes={attributes} isBackend={isBackend} RichText={RichText} reviewText={reviewText} updateItem={updateItem} __={__} />
            </div>

            <div className="bottom">
                <div className="rightQuote">
                    {rightQuote(nameColor, quoteIcon?.size)}
                </div>
                <div className='info'>
                    <Name attributes={attributes} isBackend={isBackend} RichText={RichText} updateItem={updateItem} __={__} name={name} />
                    <Designation attributes={attributes} isBackend={isBackend} RichText={RichText} deg={deg} updateItem={updateItem} __={__} />
                </div>
            </div>
        </div>
    });
}
export default Grid_4;