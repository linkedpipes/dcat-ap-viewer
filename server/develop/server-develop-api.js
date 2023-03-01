const express = require("express");
const config = require("../../configuration");
const logger = require("../logging");
const httpApi = require("../http-api/http-api");

/**
 * Start only HTTP API.
 */
(function main() {
  const app = express();
  httpApi.initializeHttpApi(app);
  start(app);
})();

function start(app) {
  const port = config.port;
  app.listen(port, function onStart(error) {
    if (error) {
      logger.error("Can't start server.", {"error": error});
    }
    logger.info("Server has been started.", {"port": port});
  });
}
