/**
 * Entry point for running the backend.
 */
(function initialize() {
  const express = require("express");
  const app = express();
  const server = require("./server-common");
  server.initializeApi(app);
  initializeStatic(app, express);
  server.start(app);
})();

function initializeStatic(app, express) {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "..", "dist")));
  // All else to index.html to support non-root access.
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  });
}