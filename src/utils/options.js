import { __ } from '@wordpress/i18n';

import { verticalLineIcon, horizontalLineIcon } from './icons';

export const layoutOpt = [
	{ label: __('Default', 'b-testimonials'), value: 'default' },
	{ label: __('Grid-1', 'b-testimonials'), value: 'grid_1' },
	{ label: __('Grid-2', 'b-testimonials'), value: 'grid_2' },
	{ label: __('Grid-3', 'b-testimonials'), value: 'grid_3' },
	{ label: __('Grid-4', 'b-testimonials'), value: 'grid_4' },
	{ label: __('Grid-5', 'b-testimonials'), value: 'grid_5' },
	{ label: __('Masonry', 'b-testimonials'), value: 'masonry' }
];

export const layouts = [
	{ label: __('Vertical', 'block-directory'), value: 'vertical', icon: verticalLineIcon },
	{ label: __('Horizontal', 'block-directory'), value: 'horizontal', icon: horizontalLineIcon }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'b-testimonials') },
	{ name: 'style', title: __('Style', 'b-testimonials') }
];