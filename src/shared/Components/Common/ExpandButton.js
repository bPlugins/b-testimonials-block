/**
 * The Read more / Less toggle under a long review.
 *
 * `aria-expanded` is what tells a screen reader that this button controls
 * something and which way it is currently pointing. Without it the button
 * announces only its label, which flips between "Expand" and "Less" with no
 * indication that anything happened -- the reader hears a different button
 * rather than the same one in a new state.
 */
const ExpandButton = ({ attributes = {}, expanded = false, onChange }) => {
	const { elements = {} } = attributes || {};
	const { expandBtn = false, expandText = 'Expand', collapseText = 'Less' } = elements || {};

	return (
		expandBtn && (
			<button
				className="expandBtn btb-expand-btn"
				type="button"
				aria-expanded={expanded ? 'true' : 'false'}
				onClick={onChange}
			>
				{expanded ? collapseText : expandText}
			</button>
		)
	);
};

export default ExpandButton;
