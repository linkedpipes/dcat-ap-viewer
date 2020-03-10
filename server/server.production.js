const express = require("express");
const path = require("path");
const config = require("./server-configuration");

const httpApi = require("./http-api");

/**
 * Entry point for running the backend.
 */
(function main() {
  const app = express();
  if (config.serve_static_content) {
    initializeStatic(app, express);
  }
  httpApi.initializeHttpApi(app);
  start(app);
})();

function initializeStatic(app, express) {
  app.use(express.static(path.join(__dirname, "..", "dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  });
}

function start(app) {
  const port = config["port"];
  app.listen(port, function onStart(error) {
    if (error) {
      console.error(error);
    }
    console.info("Listening on port %s.", port);
  });
}