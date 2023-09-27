
import { useState } from 'react';
import { leftQuote, rightQuote } from '../utils/icons';

const ReviewText = ({ isBackend, RichText, reviewText, updateItem, __, attributes }) => {
    const { options, nameColor, quoteIcon, layout, textLength } = attributes

    const [expanded, setExpanded] = useState(false);
    const length = reviewText.length;
    const showText = expanded ? reviewText : reviewText.slice(0, textLength);

    return options.reviewText && <> {isBackend ? <RichText tagName="p" className='reviewText' value={reviewText} onChange={(val) => updateItem("reviewText", val)} placeholder={__('Enter your review', 'b-testimonials')} inlineToolbar /> : reviewText && <>
        {layout === 'grid_5' && leftQuote(nameColor, quoteIcon.size)}
        {(layout === "masonry" || layout === "grid_4") ?
            <p className='reviewText' dangerouslySetInnerHTML={{ __html: reviewText }} /> :
            <p className='reviewText' dangerouslySetInnerHTML={{ __html: showText }} />}

        {layout === 'grid_5' && rightQuote(nameColor, quoteIcon.size)}

        {((layout != 'masonry' && layout != 'grid_4') && length > textLength) &&
            <button className='expandedBtn' type="button" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "Show More"}
            </button>
        }
    </>}</>
}
export default ReviewText;