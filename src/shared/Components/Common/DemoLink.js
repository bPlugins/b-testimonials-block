import { __, sprintf } from '@wordpress/i18n';
import { getLayoutSvgIcon } from '../../utils/icons';
import { getDemoUrl } from '../../utils/demoUrl';

/**
 * "Live Demo" on a picker card.
 *
 * Both pickers put this inside a card that is itself clickable -- clicking a
 * card inserts or switches to that block. A link nested in a click handler fires
 * both, so the click and the Enter/Space keypress are stopped here rather than
 * at each call site. The link stays a real <a>: it gets the browser's own
 * middle-click, open-in-new-tab and copy-address behaviour, which a div with an
 * onClick would not.
 *
 * Renders nothing when the block has no demo -- see utils/demoUrl.
 *
 * `label` may be empty, which leaves the icon alone. The switcher's cards use
 * that: the word beside it took enough of a 220px card that "Use This Layout"
 * broke onto two lines in every one of them, and the card's own action is the
 * one that should keep its room. The name is still carried by `title` and
 * `aria-label`, so nothing is lost to a screen reader or to a hovering pointer.
 *
 * @param {Object} props
 * @param {string} props.blockName Registered block name.
 * @param {string} props.title     The block's title, for the accessible name.
 * @param {string} props.className Class for the surrounding picker's styling.
 * @param {string} props.label     Visible text; '' for the icon on its own.
 * @param {number} props.iconSize  Icon size in px.
 */
const DemoLink = ( {
	blockName,
	title = '',
	className = 'btbDemoLink',
	label = __( 'Live Demo', 'b-testimonials-block' ),
	iconSize = 13,
} ) => {
	const url = getDemoUrl( blockName );

	if ( ! url ) {
		return null;
	}

	const stop = ( e ) => e.stopPropagation();

	/* translators: %s is the block's name. */
	const name = sprintf( __( 'Live demo of %s, opens in a new tab', 'b-testimonials-block' ), title );

	return (
		<a
			className={ className }
			href={ url }
			target="_blank"
			rel="noreferrer"
			onClick={ stop }
			onKeyDown={ stop }
			aria-label={ name }
			title={ name }
		>
			{ label }
			{ getLayoutSvgIcon( 'external', iconSize ) }
		</a>
	);
};

export default DemoLink;
