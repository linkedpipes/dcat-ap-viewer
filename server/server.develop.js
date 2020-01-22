const express = require("express");

/**
 * Entry point for running the backend.
 */
(function initialize() {
  const app = express();
  const server = require("./server-common");
  server.initializeApi(app);
  initializeStatic(app);
  initializeWebpack(app);
  server.start(app);
})();

function initializeStatic(app) {
  const path = require("path");
  const assetsPath = path.join(__dirname, "../public/assets/");
  app.use("/assets", express.static(assetsPath));
}

function initializeWebpack(app) {
  const webpack = require("webpack");
  const webpack_config = require("../build/webpack.develop.js");
  const webpackMiddleware = require("webpack-dev-middleware");
  // https://github.com/webpack-contrib/webpack-hot-middleware
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const webpackCompiler = webpack(webpack_config);

  const middleware = webpackMiddleware(webpackCompiler, {
    "publicPath": webpack_config.output.publicPath.substr(1),
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