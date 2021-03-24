const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("../../configuration");
const logger = require("../logging");
const httpApi = require("../http-api/http-api");
const webpackConfig = require("../../build/webpack.develop");

/**
 * Entry point for running the backend.
 */
(function main() {
  const app = express();
  httpApi.initializeHttpApi(app);
  initializeStatic(app);
  initializeWebpack(app);
  start(app);
})();

function initializeStatic(app) {
  const directories = config.client.profiles.map(
    (profile) => path.join(__dirname, "..", "..", "client", profile, "assets"));
  for (const directory of directories) {
    app.use("/assets/", express.static(directory));
  }
}

function initializeWebpack(app) {
  const webpackCompiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(webpackCompiler, {
    "publicPath": webpackConfig.output.publicPath.substr(1),
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
