/**
 * Demo links for the editor's two block pickers.
 *
 * The URLs are resolved in PHP by `bpbtb_demo_url()` and handed over on
 * `window.bpbtbDemos` -- see includes/demo-preview.php. Nothing is assembled
 * here on purpose: the demos are served by this install today and will be moved
 * to a hosted site later, and that move can change the shape of the URL and not
 * only its host. A base plus a pattern written in JavaScript could not follow
 * that; a resolved map can.
 *
 * Both helpers return an empty string when there is nothing to link to, so the
 * caller renders no link rather than a dead one. That is the honest answer for a
 * block that is switched off (it has no entry) and for any editor served without
 * the inline script.
 */

/**
 * The live demo for one block.
 *
 * @param {string} blockName Registered name, with or without the `bptmb/` prefix.
 * @return {string} Absolute URL, or '' if this block has no demo.
 */
export const getDemoUrl = ( blockName = '' ) => {
	const slug = blockName.replace( /^bptmb\//, '' );

	return window.bpbtbDemos?.urls?.[ slug ] || '';
};

/**
 * Where the whole collection is browsed.
 *
 * @return {string} Absolute URL, or '' if none was supplied.
 */
export const getDemoIndexUrl = () => window.bpbtbDemos?.index || '';
