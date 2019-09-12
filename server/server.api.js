/**
 * Entry point for running the backend.
 */
(function initialize() {
  const express = require("express");
  const app = express();
  const server = require("./server.common");
  server.initializeApi(app);
  server.start(app);
})();