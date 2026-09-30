const ReviewText = ({ attributes = {}, itemEls = {} }) => {
  const { elements = {} } = attributes || {};
  return elements?.reviewText ?? true ? itemEls?.reviewText || null : null;
};

export default ReviewText;
