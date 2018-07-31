const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  ); // change importing css to less
  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#13e600",
      "@body-background": "hsl(0, 0%, 10%)",
      "@background-color-base": "hsl(0, 0%, 5%)",
      "@background-color-light": "hsl(0, 0%, 5%)",
      "@tag-default-color": "hsl(0, 0%, 5%)",
      "@tag-default-bg": "hsl(0, 0%, 85%)",
      "@item-hover-bg": "hsl(0, 0%, 5%)",
      "@item-active-bg": "@item-hover-bg",
      "@btn-primary-color": "hsl(0, 0%, 7%)",
      "@btn-default-bg": "hsl(0, 0%, 15%)",
      "@input-bg": "hsl(0, 0%, 15%)",
      "@input-border-color": "hsl(0, 0%, 85%)",
      "@text-color": "hsla(0, 0%, 95%, 1)",
      "@font-family-no-number": "Menlo, Courier, monospaced",
      "@text-color-secondary-dark": "#262626",
      "@text-color-secondary": "hsla(0, 0%, 95%, 1)",
      "@menu-dark-color": "hsl(0, 0%, 95%)",
      "@menu-highlight-color": "hsl(0, 0%, 20%)",
      "@menu-dark-item-active-bg": "@menu-highlight-color",
      "@menu-dark-item-selected-bg": "@menu-highlight-color",
      "@menu-item-active-bg": "@menu-highlight-color",
      "@layout-body-background": "hsl(0, 0%, 10%)",
      "@layout-header-background": "hsl(0, 0%, 10%)",
      "@component-background": "hsl(0, 0%, 15%)",
      "@border-color-split": "hsl(0, 0%, 2%)",
      "@heading-color": "hsl(0, 0%, 95%)",
      "@card-actions-background": "hsl(0, 0%, 12%)",
      "@card-shadow": "0 8px 17px rgba(0, 0, 0, 0.9)",
      "@card-hover-border": "@border-color-split",
      "@popover-bg": "hsl(0, 0%, 5%)"
    }
  })(config, env);
  return config;
};
