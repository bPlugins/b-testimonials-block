
const RatingIcon = ({ attributes, getStar, rating, starIconColor }) => {
    const { options } = attributes;
    return options?.icon && <div className="rating">
        {getStar(rating, starIconColor)}
    </div>
}
export default RatingIcon;