const RatingIcon = ({ attributes = {}, getStar, rating = 5, starIconColor = '#FF8C02' }) => {
	const { elements = {} } = attributes || {};
	const showIcon = elements?.icon ?? true;

	return showIcon ? (
		<div className="rating">
			{typeof getStar === 'function' ? getStar(rating, starIconColor) : null}
		</div>
	) : null;
};

export default RatingIcon;