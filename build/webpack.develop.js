const {HotModuleReplacementPlugin} = require("webpack");
const {merge} = require("webpack-merge");
const common = Object.assign({}, require("./webpack.common"));
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = merge({
  "mode": "development",
  "devtool": "eval",
  "entry": [
    "webpack-hot-middleware/client",
    "webpack/hot/dev-server.js",
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
        "use": ["babel-loader"],
      },
      {
        "test": /\.(sa|sc|c)ss$/,
        "use": ["style-loader", "css-loader"],
      },
    ],
  },
  "plugins": [
    new HotModuleReplacementPlugin(),
    new ESLintPlugin(),
  ],
}, common);
