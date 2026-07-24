const ExpandButton = ({ attributes = {}, expanded = false, onChange }) => {
	const { elements = {} } = attributes || {};
	const { expandBtn = false, expandText = 'Expand', collapseText = 'Less' } = elements || {};

	return (
		expandBtn && (
			<span className="expandBtn" type="button" onClick={onChange}>
				{expanded ? collapseText : expandText}
			</span>
		)
	);
};

export default ExpandButton;