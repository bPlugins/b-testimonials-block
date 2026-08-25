/**
 * Accessibility helpers for non-native interactive elements.
 *
 * Several layouts need a clickable wrapper that can't be a real <button>
 * (they contain headings, paragraphs and images, which a button may not).
 * These helpers spread the full button contract onto such elements so they
 * stay keyboard reachable and are announced correctly.
 */

/**
 * Props that turn a plain element into a keyboard-operable button.
 *
 * @param {Function} onActivate Called on click, Enter or Space.
 * @param {string}   label      Optional accessible name.
 * @return {Object} Props to spread onto the element.
 */
export const clickable = ( onActivate, label ) => ( {
	role: 'button',
	tabIndex: 0,
	onClick: onActivate,
	onKeyDown: ( e ) => {
		if ( 'Enter' === e.key || ' ' === e.key ) {
			e.preventDefault();
			onActivate( e );
		}
	},
	...( label ? { 'aria-label': label } : {} ),
} );

/**
 * Same as clickable(), but only while the block is rendered in the editor.
 *
 * The theme cards are selectable only in the backend, so on the frontend they
 * must stay non-interactive rather than advertising a button that does nothing.
 *
 * @param {boolean}  isBackend  Whether the block is rendering inside the editor.
 * @param {Function} onActivate Called on click, Enter or Space.
 * @param {string}   label      Optional accessible name.
 * @return {Object} Props to spread onto the element.
 */
export const editorClickable = ( isBackend, onActivate, label ) =>
	isBackend ? clickable( onActivate, label ) : {};
