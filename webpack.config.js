const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const ESLintPlugin = require('eslint-webpack-plugin');
const path = require('path');
const plugins = defaultConfig.plugins.filter(p => {
	if (Object.values(p).length === 2 && Object.values(p)?.[1]['filename'] && Object.values(p)?.[1]['filename'] === '[name]-rtl.css') {
		return false;
	}
	return true;
});

// wp-scripts leaves sass-loader on Dart Sass's legacy JS API, which is
// deprecated and warns once per stylesheet. Opt the sass rule into the modern
// API instead.
const rules = defaultConfig.module.rules.map(rule => {
	if (!(rule.test instanceof RegExp) || !rule.test.test('style.scss')) {
		return rule;
	}
	return {
		...rule,
		use: rule.use.map(loader =>
			typeof loader === 'object' && loader.loader?.includes('sass-loader')
				? { ...loader, options: { ...loader.options, api: 'modern' } }
				: loader
		),
	};
});

// `optimization: {}` left the minimizer unset, so webpack fell back to its own
// TerserPlugin default with `parallel: true` -- one worker per core, each
// holding a whole ~6 MB bundle, which is what threw ERR_WORKER_OUT_OF_MEMORY on
// roughly every other build. Reuse the instance wp-scripts already configured
// (it preserves `translators:` comments and keeps the i18n function names
// unmangled, both of which the bare webpack default drops) and cap how many run
// at once.
const minimizer = (defaultConfig.optimization?.minimizer || []).map(plugin => {
	if (plugin?.options && 'parallel' in plugin.options) {
		plugin.options.parallel = 2;
	}
	return plugin;
});

module.exports = {
	...defaultConfig,
	module: { ...defaultConfig.module, rules },
	entry: {
		...defaultConfig.entry(),
		'admin-dashboard': './src/admin/dashboard.js',
		// The one editor bundle for all forty blocks -- see src/blocks/index.js
		// for why. Named to match what wp-scripts derives from the
		// `"editorScript": "file:../index.js"` in each block.json, so the two
		// agree on one entry rather than producing two of the same thing.
		'blocks/index': './src/blocks/index.js',
	},
	plugins: [
		...plugins,
		// threads:false keeps linting in-process; the worker pool blew its heap
		// on this 40-block build.
		new ESLintPlugin({ threads: false })
	],
	// Only the minimizer is overridden -- webpack fills in the rest of its
	// defaults, which is what emits index.css / view.css under these names.
	optimization: { minimizer }
};