import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const layoutOpt = [
	{ label: __('Default', 'b-testimonials-block'), value: 'default' },
	{ label: __('Slider', 'b-testimonials-block'), value: 'slider' },
	{ label: __('Masonry', 'b-testimonials-block'), value: 'masonry' },
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