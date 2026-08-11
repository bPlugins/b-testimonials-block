import { useSelect } from '@wordpress/data';

/**
 * The device the editor's preview buttons are set to.
 *
 * Needed because those buttons only create a real viewport when the canvas is
 * iframed, and WordPress iframes it only when every registered block is
 * apiVersion 3 -- a single v2 block from any other active plugin turns iframing
 * off for the whole editor. Without it, @media keeps measuring the browser
 * window, so responsive rules never fire whichever device is selected.
 *
 * The store this lives in moved between WordPress versions, so each known
 * location is tried rather than pinning a minimum version.
 *
 * @return {string} 'Desktop', 'Tablet' or 'Mobile'.
 */
const usePreviewDevice = () =>
	useSelect(
		( select ) =>
			select( 'core/editor' )?.getDeviceType?.() ||
			select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.() ||
			select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.() ||
			'Desktop',
		[]
	);

/**
 * Resolve a responsive value for the device currently previewed.
 *
 * @param {Object} columns Shape { desktop, tablet, mobile }.
 * @param {string} device  Device from usePreviewDevice().
 * @param {number} rest    Value to use when nothing is set.
 * @return {number} The count to render at the base size.
 */
export const colsForDevice = ( columns = {}, device = 'Desktop', rest = 3 ) => {
	if ( 'Tablet' === device ) {
		return columns?.tablet || rest;
	}
	if ( 'Mobile' === device ) {
		return columns?.mobile || rest;
	}
	return columns?.desktop || rest;
};

export default usePreviewDevice;
