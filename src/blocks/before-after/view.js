import '@shared/styles/frontend.scss';
import '@shared/view';
import '@shared/styles/before-after.scss';

const clamp = ( n, min, max ) => Math.max( min, Math.min( max, n ) );

const initBeforeAfter = () => {
	document.querySelectorAll( '.bBeforeAfter .ba-wrap' ).forEach( ( wrap ) => {
		if ( wrap.dataset.bound ) {
			return;
		}
		wrap.dataset.bound = '1';

		let dragging = false;

		const setPos = ( clientX ) => {
			const rect = wrap.getBoundingClientRect();
			if ( ! rect.width ) {
				return;
			}
			const pct = clamp( ( ( clientX - rect.left ) / rect.width ) * 100, 0, 100 );
			wrap.style.setProperty( '--pos', `${ pct }%` );
		};

		const pointX = ( e ) => ( e.touches && e.touches[ 0 ] ? e.touches[ 0 ].clientX : e.clientX );

		const start = ( e ) => { dragging = true; setPos( pointX( e ) ); };
		const move = ( e ) => { if ( dragging ) { setPos( pointX( e ) ); } };
		const end = () => { dragging = false; };

		const handle = wrap.querySelector( '.ba-handle' );
		( handle || wrap ).addEventListener( 'mousedown', start );
		( handle || wrap ).addEventListener( 'touchstart', start, { passive: true } );
		window.addEventListener( 'mousemove', move );
		window.addEventListener( 'touchmove', move, { passive: true } );
		window.addEventListener( 'mouseup', end );
		window.addEventListener( 'touchend', end );

		// Keyboard support on the handle.
		if ( handle ) {
			handle.tabIndex = 0;
			handle.addEventListener( 'keydown', ( e ) => {
				const current = parseFloat( wrap.style.getPropertyValue( '--pos' ) ) || 50;
				if ( 'ArrowLeft' === e.key ) {
					wrap.style.setProperty( '--pos', `${ clamp( current - 2, 0, 100 ) }%` );
				} else if ( 'ArrowRight' === e.key ) {
					wrap.style.setProperty( '--pos', `${ clamp( current + 2, 0, 100 ) }%` );
				}
			} );
		}
	} );
};

document.addEventListener( 'DOMContentLoaded', initBeforeAfter );
