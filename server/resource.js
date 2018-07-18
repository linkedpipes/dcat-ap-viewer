const express = require("express");
const config = require("./../configuration");
const couchdbEndpoint = require("./resource.couchdb");
const sparqlEndpoint = require("./resource.sparql");

const COUCHDB = "COUCHDB";

(function initialize() {
    const router = express.Router();
    router.get("/dataset", createDatasetsGet());
    router.get("/distribution", createDistributionsGet());
    router.get("/codelist", createCodeListGet());
    router.get("/static", createStaticGet());
    module.exports = router;
})();

function createDatasetsGet() {
    if (config.data.repository === COUCHDB) {
        return couchdbEndpoint.createDatasetsGet();
    } else {
        return sparqlEndpoint.createDatasetsGet();
    }
}

function createDistributionsGet() {
    if (config.data.repository === COUCHDB) {
        return couchdbEndpoint.createDistributionsGet();
    } else {
        return sparqlEndpoint.createDistributionsGet();
    }
}

function createCodeListGet() {
    if (config.data.repository === COUCHDB) {
        return couchdbEndpoint.createCodeListGet();
    } else {
        // TODO Provide implementation #39.
        return (req, res) => res.status(500).json({"error": "not_implemented"});
    }
}

function createStaticGet() {
    if (config.data.repository === COUCHDB) {
        return couchdbEndpoint.createStaticGet();
    } else {
        // TODO Provide implementation #39.
        return (req, res) => res.status(500).json({"error": "not_implemented"});
    }
}
