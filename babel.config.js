module.exports = (api) => {

  api.cache.using(() => process.env.NODE_ENV);

  const presets = [
    "@babel/preset-react",
    "@babel/preset-typescript",
    ["@babel/preset-env", {
      "useBuiltIns": "usage",
      "corejs": {
        "version": "3.8",
        "proposals": true,
      },
    }],
  ];

  const plugins = [];
  if (api.env(["development"])) {
    // We could add hot-redeployment here, yet the client application
    // is simple enough, so it is not required.
  }

  return {
    "presets": presets,
    "plugins": plugins,
    "ignore": [
      /node_modules/,
    ],
  };
};