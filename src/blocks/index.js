/**
 * The one editor bundle for all 40 blocks.
 *
 * Each block used to be its own webpack entry, which meant each one compiled its
 * own copy of everything they share -- the Edit component, every settings panel,
 * the layout switch, bpl-tools -- and of bpl-tools' icon library, which is 3.3 MB
 * of JSON on its own. Forty copies came to 137 MB of build output and 3.5 MB of
 * script for a single block in the editor.
 *
 * Importing them here instead makes one entry of the lot, so the shared code is
 * compiled once. Each block.json points its `editorScript` at this file rather
 * than at its own folder; `viewScript` and `view.css` stay per block, so the
 * front end still loads only what the page actually uses.
 */

import { getBlockType, unregisterBlockType } from '@wordpress/blocks';

import './testimonials';
import './audio-testimonials';
import './before-after';
import './capterra-review-badge';
import './case-study-card';
import './client-logos';
import './comparison-testimonial-table';
import './facebook-review-badge';
import './faq-testimonial-accordion';
import './g2-review-badge';
import './google-review-badge';
import './rating-summary';
import './review-badge-widget';
import './social-proof-toast';
import './star-rating-bars';
import './testimonial-form';
import './testimonial-stats';
import './testimonials-avatar-list';
import './testimonials-card-stack';
import './testimonials-carousel-2';
import './testimonials-compact';
import './testimonials-floating-bubble';
import './testimonials-grid-2';
import './testimonials-grid-3';
import './testimonials-grid-minimal';
import './testimonials-hero';
import './testimonials-list';
import './testimonials-marquee';
import './testimonials-masonry';
import './testimonials-popup-modal';
import './testimonials-quote-box';
import './testimonials-slider';
import './testimonials-slider-3d';
import './testimonials-speech-bubble';
import './testimonials-timeline';
import './trust-badges';
import './trustpilot-review-badge';
import './user-feedback-poll';
import './verified-buyer-badge';
import './video-testimonials';

/**
 * Take back the blocks an administrator switched off.
 *
 * With a bundle per block, a block switched off simply never had its script
 * enqueued, and the editor never heard of it. One shared bundle registers all
 * 40 whatever PHP did, so the ones PHP left out have to be removed again --
 * otherwise the All Blocks screen would still hide them from the dashboard while
 * the inserter went on offering a block that has no server-side registration and
 * so renders nothing on the page.
 *
 * The list is put on the page by BPBTB_Admin_Menu::editor_disabled_blocks().
 * Registration happens in the imports above, which run before this does.
 */
( window.bpbtbDisabledBlocks || [] ).forEach( ( name ) => {
	if ( getBlockType( name ) ) {
		unregisterBlockType( name );
	}
} );
