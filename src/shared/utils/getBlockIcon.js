import { cloneElement } from 'react';
import { CHILD_BLOCKS_LIST } from './childBlocks';
import { getLayoutSvgIcon, blockIcon, BRAND_COLOR } from './icons';

/**
 * Build the inserter icon for a block from its switcher icon key.
 *
 * Every block used to register the same speech-bubble `blockIcon`, which made
 * all 40 of them indistinguishable in the inserter even though the switcher
 * modal already had a distinct icon for each. Both now read from the same
 * source of truth, so a block only ever needs its icon defined in one place.
 *
 * @param {string} name Full block name, e.g. 'bptmb/testimonials-slider'.
 * @return {Object} A block icon descriptor for registerBlockType.
 */
export const getBlockIcon = ( name ) => {
	const entry = CHILD_BLOCKS_LIST.find( ( block ) => block.name === name );

	if ( ! entry?.icon ) {
		// The parent container block isn't in the switcher list; it keeps the
		// generic icon, as does anything added without a list entry.
		return blockIcon;
	}

	const icon = getLayoutSvgIcon( entry.icon, 24 );

	// The inserter applies `fill: currentColor` to block icons. Most of this set
	// is stroke-drawn with fill="none", and that rule turns every closed path
	// into a solid blob. Restating the icon's own fill as an inline style wins
	// over the stylesheet, and keeps the genuinely filled icons (star, brand
	// logos) looking right.
	return {
		src: cloneElement( icon, {
			className: 'btb-inserter-icon',
			style: { fill: icon.props?.fill ?? 'none' },
		} ),
		foreground: BRAND_COLOR,
	};
};

export default getBlockIcon;
