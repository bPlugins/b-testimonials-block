const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const ESLintPlugin = require("eslint-webpack-plugin");
const path = require("path");
const plugins = defaultConfig.plugins.filter((p) => {
  if (
    Object.values(p).length === 2 &&
    Object.values(p)?.[1]["filename"] &&
    Object.values(p)?.[1]["filename"] === "[name]-rtl.css"
  ) {
    return false;
  }
  return true;
});

const rules = defaultConfig.module.rules.map((rule) => {
  if (!(rule.test instanceof RegExp) || !rule.test.test("style.scss")) {
    return rule;
  }
  return {
    ...rule,
    use: rule.use.map((loader) =>
      typeof loader === "object" && loader.loader?.includes("sass-loader")
        ? { ...loader, options: { ...loader.options, api: "modern" } }
        : loader,
    ),
  };
});

const minimizer = (defaultConfig.optimization?.minimizer || []).map(
  (plugin) => {
    if (plugin?.options && "parallel" in plugin.options) {
      plugin.options.parallel = 2;
    }
    return plugin;
  },
);

module.exports = {
  ...defaultConfig,
  module: { ...defaultConfig.module, rules },
  entry: {
    ...defaultConfig.entry(),
    "admin-dashboard": "./src/admin/dashboard.js",
    "admin/post": "./src/admin/post.js",
    "blocks/index": "./src/blocks/index.js",
    "blocks/view": "./src/blocks/view.js",
  },
  plugins: [...plugins, new ESLintPlugin({ threads: false })],
  optimization: { minimizer },
};
