const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackConfig = require("../build/webpack.develop.js");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const helmet = require('helmet')

const config = require("./server-configuration");
const httpApi = require("./http-api");
const i18n = require("./i18n");
const logger = require("./logging");

/**
 * Entry point for running the backend.
 */
(function main() {
  const app = express();
  app.use(helmet(config.helmet));
  httpApi.initializeHttpApi(app);
  initializeI18nFiles(app);
  initializeStatic(app);
  initializeWebpack(app);
  start(app);
})();

function initializeStatic(app) {
  const flagsPath = path.join(__dirname, "../public/assets/flags");
  app.use("/assets/flags", express.static(flagsPath));
  //
  const assetsPath = path.join(
    __dirname, "../profile/" + config.client.profile + "/assets");
  app.use("/assets", express.static(assetsPath));
}

function initializeI18nFiles(app) {
  app.get("/assets/:file", (req, res) => {
    const reqFile = req.params.file;
    const files = i18n.loadTranslationFiles();
    const language = reqFile.substr(0, reqFile.lastIndexOf("."));
    if (files[language]) {
      res.json(files[language]);
      return;
    }
    res.status(404).json({"error": "Not found."});
  });
}

function initializeWebpack(app) {
  const webpackCompiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(webpackCompiler, {
    "publicPath": webpackConfig.output.publicPath.substr(1),
    "stats": {
      "colors": true,
      "chunks": false,
    },
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(webpackCompiler));
  app.use("/*", (req, res, next) => {
    middleware(req, res, next);
  });
}

function start(app) {
  const port = config.port;
  app.listen(port, function onStart(error) {
    if (error) {
      logger.error("Can't start server.", {"error": error});
    }
    logger.info("Server has been started.", {"port": port});
  });
}
