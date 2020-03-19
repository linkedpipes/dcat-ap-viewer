const express = require("express");
const path = require("path");
const helmet = require('helmet')

const config = require("./server-configuration");
const httpApi = require("./http-api");
const logger = require("./logging");

/**
 * Entry point for running the backend.
 */
(function main() {
  const app = express();
  app.use(helmet(config.helmet));
  if (config.serve_static_content) {
    initializeStatic(app, express);
  }
  httpApi.initializeHttpApi(app);
  if (config.serve_static_content) {
    initializeStaticFallback(app);
  }
  start(app);
})();

function initializeStatic(app, express) {
  app.use(express.static(path.join(__dirname, "..", "dist")));
}

function initializeStaticFallback(app) {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
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
