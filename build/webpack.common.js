const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const configuration = require("./../configuration");

// TODO Share whole object for globals.
const constants = {
  "DEF_DEFAULT_PAGE_TITLE":
    JSON.stringify(configuration.client.title.default),
  "DEF_PAGE_TITLE_PREFIX":
    JSON.stringify(configuration.client.title.prefix),
  "DEF_PAGE_TITLE_SUFFIX":
    JSON.stringify(configuration.client.title.suffix),
  "DEF_FORM_URL":
    JSON.stringify(configuration.client.form_url),
  "DEF_URL_BASE":
    JSON.stringify(configuration.client.url.base),
  "DEF_DEREFERENCE_PREFIX":
    JSON.stringify(configuration.client.url.subdirectory),
};

module.exports = {
  "entry": [
    path.join(__dirname, "..", "client", "index.jsx"),
  ],
  "output": {
    "path": path.join(__dirname, "..", "dist"),
    "filename": "bundle.js",
    "publicPath": "./",
  },
  "resolve": {
    "extensions": [".js", ".jsx", ".ts", ".tsx"],
  },
  "module": {
    "rules": [
      {
        "test": /\.jsx?$/,
        "use": "babel-loader",
      },
      {
        "test": /\.tsx?$/,
        "use": "ts-loader",
        "exclude": /node_modules/,
      },
    ],
  },
  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "title": configuration.client.title.default,
      "template": path.join(
        __dirname, "..", "profile",
        configuration.client.profile, "index.html"),
      "inject": true,
    }),
    new webpack.DefinePlugin(constants),
  ],
};
