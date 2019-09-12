const path = require("path");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const common = Object.assign({}, require("./webpack.common"));

module.exports = merge(common, {
  "mode": "production",
  "output": {
    "filename": path.join("assets", "bundle.[chunkhash].js"),
  },
  "optimization": {
    "splitChunks": {
      "cacheGroups": {
        "commons": {
          "test": /[\\/]node_modules[\\/]/,
          "name": "vendor",
          "chunks": "all",
          "filename": path.join("assets", "commons.[chunkhash].js"),
        },
      },
    },
    "minimizer": [
      new UglifyJsPlugin({
        "cache": true,
        "parallel": true,
        "sourceMap": true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  "module": {
    "rules": [
      {
        "test": /\.(sa|sc|c)ss$/,
        "use": [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  "plugins": [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      "filename": path.join("assets", "main.[chunkhash].css"),
    }),
    new CopyWebpackPlugin([{
      "from": path.join(__dirname, "..", "public", "assets"),
      "to": path.join(__dirname, "..", "dist", "assets"),
    }]),
  ],
});

