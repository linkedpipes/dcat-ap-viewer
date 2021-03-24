const express = require("express");
const configuration = require("../../configuration");
const solrProvider = require("./solr-provider/solr-provider");
const couchdbProvider = require("./couchdb-provider/couchdb-provider");
const sparqlProvider = require("./sparql-provider/sparql-provider");
const testProvider = require("./test-provider/test-provider");
const proxyProvider =require("./proxy-provider/proxy-provider");

module.exports = {
  "initializeHttpApi": initializeHttpApi,
};

function initializeHttpApi(app) {
  const provider = createRootProvider();

  const v1 = express.Router();
  v1.get("/solr/info", provider["v1-info"]);
  app.use("/api/v1", v1);

  const v2 = express.Router();
  v2.get("/dataset", provider["v2-dataset-list"]);
  v2.get("/dataset/item", provider["v2-dataset-item"]);
  v2.get("/dataset/typeahead", provider["v2-dataset-typeahead"]);
  v2.get("/distribution/item", provider["v2-distribution-item"]);
  v2.get("/publisher", provider["v2-publisher-list"]);
  v2.get("/keyword", provider["v2-keyword-list"]);
  v2.get("/label/item", provider["v2-label-item"]);
  v2.get("/init-data", provider["v2-init-data"]);
  v2.get("/catalog", provider["v2-catalog-list"]);
  v2.get("/quality", provider["v2-quality"]);
  app.use("/api/v2", v2);
}

function createRootProvider() {
  let result = defaultProvider();
  configuration["providers"].forEach((providerConfiguration) => {
    result = {
      ...result,
      ...createProvider(providerConfiguration),
    };
  });
  return result;
}

/**
 * By default nothing is implemented.
 */
function defaultProvider() {
  const notImplemented = (req, res) => {
    res.status(404).json({"error": "not_supported"});
  };
  return {
    "v1-info": notImplemented,
    "v2-dataset-list": notImplemented,
    "v2-dataset-item": notImplemented,
    "v2-dataset-typeahead": notImplemented,
    "v2-distribution-item": notImplemented,
    "v2-publisher-list": notImplemented,
    "v2-keyword-list": notImplemented,
    "v2-label-item": notImplemented,
    "v2-init-data": notImplemented,
    "v2-quality-dataset": notImplemented,
    "v2-quality-distribution": notImplemented,
    "v2-quality-publishers": notImplemented,
    "v2-catalog-list": notImplemented,
  };
}

function createProvider(providerConfiguration) {
  let provider = {};
  if (providerConfiguration["type"] === "solr") {
    provider = solrProvider.createProvider(providerConfiguration);
  }
  if (providerConfiguration["type"] === "couchdb") {
    provider = couchdbProvider.createProvider(providerConfiguration);
  }
  if (providerConfiguration["type"] === "sparql") {
    provider = sparqlProvider.createProvider(providerConfiguration);
  }
  if (providerConfiguration["type"] === "test") {
    provider = testProvider.createProvider();
  }
  if (providerConfiguration["type"] === "proxy") {
    provider = proxyProvider.createProvider(providerConfiguration);
  }
  return filterProvider(provider, providerConfiguration);
}

function filterProvider(provider, providerConfiguration) {
  if (!providerConfiguration["filter"]) {
    return provider;
  }
  const result = [];
  providerConfiguration["filter"].forEach((key) => {
    result[key] = provider[key];
  });
  return result;
}
