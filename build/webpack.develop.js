const webpack = require("webpack");
const merge = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));

module.exports = merge(common, {
  "mode": "development",
  "devtool": "eval",
  "entry": [
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
  ],
  "devServer": {
    "hot": true,
  },
  "resolve": {
    "alias": {
      "react-dom": "@hot-loader/react-dom",
    },
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.(js|jsx)$/,
        "exclude": /node_modules/,
        "use": ["babel-loader", "eslint-loader"],
      },
      {
        "test": /\.(sa|sc|c)ss$/,
        "loader": "style-loader!css-loader",
      },
    ],
  },
  "plugins": [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
