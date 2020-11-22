const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const configuration = require("../../configuration").client;

const profile = configuration.profiles.slice(-1)[0]

module.exports = {
  "entry": [
    path.join(__dirname, "..", profile, "index.js"),
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
      "title": configuration.pageTitleDefault,
      "template": path.join(
        __dirname, "..", profile, "index.html"
      ),
      "inject": true,
    }),
    new webpack.DefinePlugin({
      "CONFIGURATION": JSON.stringify(configuration),
    }),
  ],
};
