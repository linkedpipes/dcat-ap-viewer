const express = require("express");
const config = require("./../configuration");
const couchdbEndpoint = require("./resource-couchdb");
const sparqlEndpoint = require("./resource-sparql");

(function initialize() {
  const router = express.Router();
  router.get("/dataset", createDatasetsGet());
  router.get("/distribution", createDistributionsGet());
  router.get("/codelist", createCodeListGet());
  router.get("/static", createStaticGet());
  router.get("/filter", createFilterCacheGet());
  router.get("/quality", createQualityGet());
  router.get("/quality-publishers", createPublishersQualityGet());
  module.exports = router;
})();

function createDatasetsGet() {
  if (isUsingCouchDb()) {
    return couchdbEndpoint.createDatasetsGet();
  } else {
    return sparqlEndpoint.createDatasetsGet();
  }
}

function isUsingCouchDb() {
  return config.data.repository === "COUCHDB";
}

function createDistributionsGet() {
  if (isUsingCouchDb()) {
    return couchdbEndpoint.createDistributionsGet();
  } else {
    return sparqlEndpoint.createDistributionsGet();
  }
}

function createCodeListGet() {
  if (isUsingCouchDb()) {
    return couchdbEndpoint.createCodeListGet();
  } else {
    // TODO Provide implementation #39.
    return (req, res) => res.status(500).json({"error": "not_implemented"});
  }
}

function createStaticGet() {
  if (isUsingCouchDb()) {
    return couchdbEndpoint.createStaticGet();
  } else {
    // TODO Provide implementation #39.
    return (req, res) => res.status(500).json({"error": "not_implemented"});
  }
}

function createFilterCacheGet() {
  if (isUsingCouchDb()) {
    return couchdbEndpoint.createFilterCacheGet();
  } else {
    // TODO Provide implementation #39.
    return (req, res) => res.status(200).json({"error": "not_implemented"});
  }
}

function createQualityGet() {
  if (config.quality.sparql) {
    return sparqlEndpoint.createQualityGet();
  }
  return (req, res) => res.status(200).json({"error": "not_implemented"});
}

function createPublishersQualityGet() {
  if (config.quality.sparql) {
    return sparqlEndpoint.createPublishersQualityGet();
  }
  return (req, res) => res.status(200).json({"error": "not_implemented"});
}
