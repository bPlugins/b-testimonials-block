import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

/**
 * The arrangements a card list can take.
 *
 * The last two are Swiper effects rather than separate renderers -- Layout.js
 * sends all three slider cases down the same branch -- but they are arrangements
 * a block can be switched to, so they belong in the list. Leaving them out left
 * a 3D Slider or Coverflow block showing a blank select, because its own value
 * matched no option.
 */
export const arrangementOpt = [
	{ label: __('Default', 'b-testimonials-block'), value: 'default' },
	{ label: __('Slider', 'b-testimonials-block'), value: 'slider' },
	{ label: __('Masonry', 'b-testimonials-block'), value: 'masonry' },
	{ label: __('List', 'b-testimonials-block'), value: 'list' },
	{ label: __('Marquee', 'b-testimonials-block'), value: 'marquee' },
	{ label: __('3D Slider', 'b-testimonials-block'), value: 'slider-3d' },
	{ label: __('Coverflow', 'b-testimonials-block'), value: 'coverflow' },
]

export const themeOpt = [
	{ label: __('Default', 'b-testimonials-block'), value: 'default' },
	{ label: __('Theme-1', 'b-testimonials-block'), value: 'theme_1' },
	{ label: __('Theme-2', 'b-testimonials-block'), value: 'theme_2' },
	{ label: __('Theme-3', 'b-testimonials-block'), value: 'theme_3' },
	{ label: __('Theme-4', 'b-testimonials-block'), value: 'theme_4' },
	{ label: __('Theme-5', 'b-testimonials-block'), value: 'theme_5' },
	{ label: __('Theme-6', 'b-testimonials-block'), value: 'theme_6' }
];

export const layouts = [
	{ label: __('Vertical', 'block-directory'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'block-directory'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'b-testimonials-block') },
	{ name: 'style', title: __('Style', 'b-testimonials-block') }
];