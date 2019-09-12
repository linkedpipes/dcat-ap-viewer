const config = require("../configuration");

module.exports = {
  "solr": config["solr"],
  "data": {
    "sparql": config["data"]["sparql"],
    "datasetPerGraph": config["data"]["datasetPerGraph"],
    "couchdb": config["data"]["couchdb"],
  },
  "port": config["port"],
  "repository": getRepositoryType(),
};

function getRepositoryType() {
  const couchdb = config["data"]["couchdb"];
  if (couchdb !== undefined && couchdb.length > 0) {
    return "COUCHDB";
  } else {
    return "SPARQL";
  }
}