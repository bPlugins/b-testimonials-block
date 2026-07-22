
const ReviewText = ({ attributes, itemEls }) => {

    const { elements } = attributes
    return elements.reviewText && itemEls?.reviewText;
}
export default ReviewText;