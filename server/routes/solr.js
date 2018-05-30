const express = require("express");
const request = require("request"); // https://github.com/request/request
const configuration = require('./../server_configuration');

(function initialize() {
    const router = express.Router();

    router.get("/info", getStatistics);
    router.get("/query", forwardSolrQuery);

    module.exports = router;
})();

function getStatistics(req, res) {
    const url = configuration.solr.url + "/query?q=*:*&rows=0&facet=true" +
        "&facet.field=keyword&facet.field=publisherName";
    const options = {
        "url": url
    };
    request(options, (error, response, body) => {
        if (isRequestOk(error, response)) {
            const content = JSON.parse(body);
            res.json(solrToStatistics(content));
        } else {
            handleError(res, error);
        }
    });
}

function isRequestOk(error, response) {
    return error === null && response && response.statusCode == 200;
}

function solrToStatistics(content) {
    const facetFields = content.facet_counts.facet_fields;
    return {
        "data": {
            "numberOfDatasets": content.response.numFound,
            "numberOfPublishers": facetFields["publisherName"].length / 2,
            "numberOfKeywords": facetFields["keyword"].length / 2
        }
    }
}

function handleError(res, error) {
    // TODO Improve logging and error handling #38.
    console.log("Request failed: ", error);
    res.status(500).json({
        "error": "service_request_failed"
    });
}

function forwardSolrQuery(req, res) {
    const url = configuration.solr.url + req.url;
    const options = {
        "url": url
    };
    request.get(options).on("error", (error) => {
        handleError(res, error);
    }).pipe(res);
}
