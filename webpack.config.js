const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

module.exports = {
	...defaultConfig,
	entry: {
		...defaultConfig.entry(),
		'admin-dashboard': './src/admin/dashboard.js',
	},
	resolve: {
		...defaultConfig.resolve,
		alias: {
			...defaultConfig.resolve?.alias,
			// Shared bPlugins toolkit lives in a sibling plugin directory.
			'bpl-tools': path.resolve(__dirname, '../bpl-tools'),
			// Code shared across every block in this plugin.
			'@shared': path.resolve(__dirname, 'src/shared'),
		},
	},
};

