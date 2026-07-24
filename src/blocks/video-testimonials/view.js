import '@shared/styles/frontend.scss';
import '@shared/view';
import '@shared/styles/video.scss';

const initVideos = () => {
	document.querySelectorAll( '.bVideoTestimonials .video-frame' ).forEach( ( frame ) => {
		if ( frame.dataset.bound ) {
			return;
		}
		frame.dataset.bound = '1';

		const play = () => {
			const embed = frame.dataset.embed;
			if ( ! embed ) {
				return;
			}
			frame.innerHTML = embed;
			frame.classList.add( 'is-playing' );
		};

		frame.addEventListener( 'click', play );
		frame.addEventListener( 'keydown', ( e ) => {
			if ( 'Enter' === e.key || ' ' === e.key ) {
				e.preventDefault();
				play();
			}
		} );
	} );
};

document.addEventListener( 'DOMContentLoaded', initVideos );
