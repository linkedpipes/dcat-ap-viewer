module.exports = (api) => {

  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {
      "targets": {
        /**
         * We need Chrome 41 to support Google search. As for newer version
         * Google search fails to interpret the page.
         */
        "chrome": 41,
      },
      "useBuiltIns": "usage",
      "corejs": {
        "version": 3,
        "proposals": true,
      },
    }],
  ];

  const plugins = [];

  const ignore = [ ];

  // We exclude node_modules as they would cause a lot of warnings.
  ignore.push("node_modules");

  if (api.env(["development"])) {
    plugins.push("react-hot-loader/babel");
  }

  return {
    "presets": presets,
    "plugins": plugins,
    "ignore": ignore,
  }
};