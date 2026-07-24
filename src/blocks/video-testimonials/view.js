import '../../shared/styles/frontend.scss';
import '../../shared/view';
import '../../shared/styles/video.scss';

const handlePlay = ( frame ) => {
	if ( ! frame || frame.classList.contains( 'is-playing' ) ) {
		return;
	}
	const embed = frame.dataset.embed;
	if ( embed ) {
		frame.innerHTML = embed;
		frame.classList.add( 'is-playing' );
	}
};

document.addEventListener( 'click', ( e ) => {
	const frame = e.target.closest( '.bVideoTestimonials .video-frame' );
	if ( frame ) {
		handlePlay( frame );
	}
} );

document.addEventListener( 'keydown', ( e ) => {
	if ( 'Enter' === e.key || ' ' === e.key ) {
		const frame = e.target.closest( '.bVideoTestimonials .video-frame' );
		if ( frame ) {
			e.preventDefault();
			handlePlay( frame );
		}
	}
} );
