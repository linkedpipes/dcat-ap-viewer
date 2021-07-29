const path = require("path");
const {merge} = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = Object.assign({}, require("./webpack.common"));
const configuration = require("../configuration").client;

module.exports = merge(common, {
  "mode": "production",
  "output": {
    "filename": "assets/bundle.[chunkhash].js",
    "path": path.join(__dirname, "..", "dist"),
  },
  "optimization": {
    "splitChunks": {
      "cacheGroups": {
        "commons": {
          "test": /[\\/]node_modules[\\/]/,
          "name": "vendor",
          "chunks": "all",
          "filename": "assets/commons.[chunkhash].js",
        },
      },
    },
    "minimizer": [
      new CssMinimizerPlugin({}),
      new TerserPlugin({
        "terserOptions": {
          // https://github.com/terser/terser#compress-options
          "compress": {
            "ecma": 6,
          },
        },
      }),
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
      "filename": "assets/main.[chunkhash].css",
    }),
    new CopyWebpackPlugin({
      "patterns": configuration.profiles.map((profile) => ({
        "from": path.join(__dirname, "..", "client", profile, "assets"),
        "to": path.join(__dirname, "..", "dist", "assets"),
      })),
    }),
  ],
});
