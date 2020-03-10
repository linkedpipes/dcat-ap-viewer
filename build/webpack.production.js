const path = require("path");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const common = Object.assign({}, require("./webpack.common"));
const fs = require("fs");
const config = require("../configuration");

const i18n = require("../server/i18n");

class BuildI18Files {
  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      "Prepare i18 files.",
      () => buildI18Files())
  }
}

function buildI18Files() {
  const files = i18n.loadTranslationFiles();
  Object.keys(files)
    .filter(key => key !== "navigation")
    .forEach(language => {
      const data = files[language];
      const filePath = path.join(
        common.output.path, "assets", language + ".json");
      fs.writeFileSync(filePath, JSON.stringify(data));
    });
}

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
      new OptimizeCSSAssetsPlugin({}),
      new TerserPlugin({
        "cache": true,
        "parallel": false,
        "sourceMap": false,
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
      "filename": path.join("assets", "main.[chunkhash].css"),
    }),
    new CopyWebpackPlugin([{
      "from": path.join(__dirname, "..", "public", "assets"),
      "to": path.join(__dirname, "..", "dist", "assets"),
    }, {
      "from": path.join(
        __dirname, "..", "profile", config.client.profile, "assets"),
      "to": path.join(__dirname, "..", "dist", "assets"),
    }]),
    new BuildI18Files(),
  ],
});
