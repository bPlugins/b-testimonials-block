/**
 * The front-end bundle for every block that has no front-end code of its own.
 *
 * Thirty of the forty blocks had a view.js holding exactly this and nothing
 * else -- twenty-five of them with an empty `DOMContentLoaded` listener around
 * a comment naming the block. Each was its own webpack entry, so the same
 * ~190 KB of shared renderer and ~93 KB of shared stylesheet were compiled
 * thirty times over.
 *
 * That cost more than disk. WordPress loads a block's `viewScript` when that
 * block is on the page, so a page with three of them fetched three different
 * files with identical contents. Pointed at this one instead, it fetches one.
 *
 * There is nothing per-block to lose: `shared/view` does not render a block, it
 * scans the page for every `.bTestimonials` element and mounts each one from the
 * `data-attributes` payload its render.php wrote. It is page-wide by design, and
 * it clears the attribute as it goes, so running twice is harmless -- which is
 * why thirty copies of it were never noticed.
 *
 * The ten blocks that do have their own front-end code keep their own view.js:
 * before-after, client-logos, rating-summary, testimonial-form,
 * testimonial-stats, testimonials-card-stack, testimonials-slider-3d,
 * trust-badges, user-feedback-poll, video-testimonials.
 */

import '../shared/styles/frontend.scss';
import '../shared/view';
