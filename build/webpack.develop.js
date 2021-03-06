const webpack = require("webpack");
const {merge} = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));

module.exports = merge({
  "mode": "development",
  "devtool": "eval",
  "entry": [
    "webpack-hot-middleware/client",
    "react-hot-loader/patch",
  ],
  "devServer": {
    "hot": true,
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
        "use": ["style-loader", "css-loader"],
      },
    ],
  },
  "plugins": [
    new webpack.HotModuleReplacementPlugin(),
  ],
}, common);
