const express = require("express");
const path = require("path");
const helmet = require("helmet");

const config = require("../../configuration");
const logger = require("../logging");
const httpApi = require("../http-api/http-api");


/**
 * Entry point for running the backend.
 */
(function main() {
  const app = express();
  app.use(helmet(config.helmet));
  if (config.serveStaticContent) {
    initializeStatic(app, express);
  }
  httpApi.initializeHttpApi(app);
  if (config.serveStaticContent) {
    initializeStaticFallback(app);
  }
  start(app);
})();

function initializeStatic(app, express) {
  app.use(express.static(path.join(__dirname, "..", "..", "dist")));
}

function initializeStaticFallback(app) {
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "..", "dist", "index.html"));
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
