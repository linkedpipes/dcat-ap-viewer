const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./build-configuration");

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
    "extensions": [".js", ".jsx", ".ts"],
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
      "title": config.PAGE_TITLE.DEFAULT,
      "template": path.join(__dirname, "..", "public", "index.html"),
      "inject": true,
    }),
    new webpack.DefinePlugin({
      "SENTRY_REPORT": config.SENTRY.ACTIVE,
      "SENTRY_URL": config.SENTRY.URL,
      "GOOGLE_TAG_MANAGER_ID": config.GOOGLE_TAG_MANAGER,
      "PAGE_TITLE_PREFIX": config.PAGE_TITLE.PREFIX,
      "PAGE_TITLE_SUFFIX": config.PAGE_TITLE.SUFFIX,
      "REPOSITORY_TYPE": config.REPOSITORY_TYPE,
      "URL_PREFIX": config.URL.PREFIX,
      "URL_BASE": config.URL.BASE,
      "DEREFERENCE_IRI": config.DEREFERENCE,
    }),
  ],
};

