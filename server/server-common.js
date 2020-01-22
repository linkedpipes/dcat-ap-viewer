function initializeApi(app) {
  initializeApiRoutes(app);
}

function initializeApiRoutes(app) {
  app.use("/api/v1/solr", require("./solr"));
  app.use("/api/v1/resource/", require("./resource"));
}

function start(app) {
  const config = require("./../configuration");
  const port = config.port;
  app.listen(port, function onStart(error) {
    if (error) {
      console.error(error);
    }
    console.info("Listening on port %s.", port);
  });
}

module.exports = {
  "initializeApi" : initializeApi,
  "start": start,
};