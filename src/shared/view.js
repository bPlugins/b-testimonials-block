import { createRoot } from 'react-dom/client';

import TestimonialsView from '@shared/Components/Common/TestimonialsView';

/**
 * Shared frontend renderer for every testimonials block.
 *
 * All blocks output a root element with the `.bTestimonials` class plus a
 * `data-attributes` JSON payload (with CPT items already resolved server-side).
 * The attribute is removed after mount, so if more than one block's view script
 * runs on the same page the second pass safely skips initialised elements.
 */
export const initTestimonials = ( selector = '.bTestimonials' ) => {
	document.querySelectorAll( selector ).forEach( ( el ) => {
		if ( ! el.dataset.attributes ) {
			return;
		}

		const attributes = JSON.parse( el.dataset.attributes );

		createRoot( el ).render( <TestimonialsView attributes={ attributes } /> );

		el.removeAttribute( 'data-attributes' );
	} );
};

// Auto-initialise once the DOM is ready.
document.addEventListener( 'DOMContentLoaded', () => initTestimonials() );
