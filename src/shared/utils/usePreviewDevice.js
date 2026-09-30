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
 * The same device, as the key the responsive attributes are stored under.
 *
 * Every responsive attribute in this plugin is shaped `{ desktop, tablet,
 * mobile }`, so a panel editing one needs the lowercase key rather than the
 * store's capitalised label.
 *
 * This is what the device switches in the sidebar read. They used to carry a
 * `useState` each, which is a second source of truth: the switch said Tablet
 * while the canvas stayed at Desktop, so the panel edited a value the preview
 * was not showing, and two panels could sit on different devices at once.
 * Reading the editor's own device instead means picking a device in any panel
 * resizes the canvas, every panel agrees, and the top toolbar's buttons move
 * them all.
 *
 * @return {string} 'desktop', 'tablet' or 'mobile'.
 */
export const useDeviceKey = () => usePreviewDevice().toLowerCase();

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
