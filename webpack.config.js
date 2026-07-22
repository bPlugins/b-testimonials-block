const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve?.alias,
			// Shared bPlugins toolkit lives in a sibling plugin directory.
			// Aliasing it keeps imports depth-independent as we add more blocks.
			'bpl-tools': path.resolve(__dirname, '../bpl-tools'),
			// Code shared across every block in this plugin.
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
};
