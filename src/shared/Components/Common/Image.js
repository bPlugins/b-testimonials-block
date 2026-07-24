const Image = ({ attributes = {}, children, img = {} }) => {
	const { elements = {} } = attributes || {};

	return (
		(elements?.img ?? true) && (
			<div className="authorImg">
				<div className="img">
					<img src={img?.url || ''} alt={img?.title || img?.alt || ''} />
					{children}
				</div>
			</div>
		)
	);
};

export default Image;