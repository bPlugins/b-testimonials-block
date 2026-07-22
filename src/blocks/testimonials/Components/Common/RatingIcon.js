
const RatingIcon = ({ attributes, getStar, rating, starIconColor }) => {
    const { elements } = attributes;
    return elements?.icon && <div className="rating">
        {getStar(rating, starIconColor)}
    </div>
}
export default RatingIcon;