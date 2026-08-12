import '../../shared/styles/frontend.scss';
import '../../shared/view';
import '../../shared/styles/stats.scss';

const format = ( num, decimals ) =>
	decimals > 0 ? num.toFixed( decimals ) : Math.round( num ).toLocaleString();

const animateEl = ( el ) => {
	const target = parseFloat( el.dataset.number ) || 0;
	const decimals = parseInt( el.dataset.decimals, 10 ) || 0;
	const duration = 1500;
	const start = performance.now();

	const tick = ( now ) => {
		const p = Math.min( 1, ( now - start ) / duration );
		const eased = 0.5 - Math.cos( Math.PI * p ) / 2; // easeInOut
		el.textContent = format( target * eased, decimals );
		if ( p < 1 ) {
			requestAnimationFrame( tick );
		} else {
			el.textContent = format( target, decimals );
		}
	};

	requestAnimationFrame( tick );
};

const initStats = () => {
	const numbers = [ ...document.querySelectorAll( '.bTestimonialStats[data-animate="1"] .stat-number' ) ]
		.filter( ( el ) => ! el.dataset.bound );

	if ( ! numbers.length ) {
		return;
	}

	numbers.forEach( ( el ) => {
		el.dataset.bound = '1';
	} );

	if ( ! ( 'IntersectionObserver' in window ) ) {
		numbers.forEach( animateEl );
		return;
	}

	const io = new IntersectionObserver( ( entries ) => {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting ) {
				animateEl( entry.target );
				io.unobserve( entry.target );
			}
		} );
	}, { threshold: 0.4 } );

	numbers.forEach( ( el ) => io.observe( el ) );
};

// The stats grid is rendered by React (shared/view), and createRoot().render()
// commits asynchronously, so the numbers are not always in the DOM on
// DOMContentLoaded. The retries catch that; `dataset.bound` above keeps a number
// from being observed -- and counted up -- twice.
const bindStats = () => {
	initStats();
	setTimeout( initStats, 100 );
	setTimeout( initStats, 500 );
};

if ( 'loading' === document.readyState ) {
	document.addEventListener( 'DOMContentLoaded', bindStats );
} else {
	bindStats();
}
