import '../../shared/styles/frontend.scss';
import { initTestimonials } from '../../shared/view';

if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', () => initTestimonials() );
} else {
	initTestimonials();
}

