const request = require("request"); // https://github.com/request/request
const config = require('./../configuration');

module.exports = {
    "createDatasetsGet": createDatasetsGet,
    "createDistributionsGet": createDistributionsGet,
    "createCodeListGet": createCodeListGet,
    "createStaticGet": createStaticGet
};

function createDatasetsGet() {
    return (req, res) => {
        const datasetIri = req.query.iri;
        queryDataFromCouchDB("datasets", res, datasetIri);
    }
}

function queryDataFromCouchDB(database, res, recordId) {
    // TODO Update response content-type.
    const url = config.data.couchdb + "/" + database + "/" +
        encodeURIComponent(recordId);
    request.get({"url": url}).on("error", (error) => {
        handleError(res, error);
    }).pipe(res);
}

function handleError(res, error) {
    // TODO Improve logging and error handling #38.
    console.error("Request failed: ", error);
    res.status(500).json({
        "error": "service_request_failed"
    });
}

function createDistributionsGet() {
    return (req, res) => {
        const distributionIri = req.query.iri;
        queryDataFromCouchDB("distributions", res, distributionIri);
    }
}

function createCodeListGet() {
    return (req, res) => {
        const itemIri = req.query.iri;
        queryDataFromCouchDB("codelists", res, itemIri);
    }
}

function createStaticGet() {
    return (req, res) => {
        const itemId = req.query.id;
        queryDataFromCouchDB("static", res, itemId);
    }
}
