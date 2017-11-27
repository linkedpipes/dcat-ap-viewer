const express = require("express");
const request = require("request"); // https://github.com/request/request
const configuration = require('./../configuration');

(function initialize() {
    const router = express.Router();

    router.get("/info", getStatistics);
    router.get("/query", forwardSolrQuery);

    module.exports = router;
})();

function getStatistics(req, res) {
    const url = configuration.solr.url + "/query?q=*:*";
    const options = {
        "url": url
    };
    request(options, function (error, response, body) {
        if (error === null && response && response.statusCode == 200) {
            const content = JSON.parse(body);
            res.json(solrToStatistics(content));
        } else {
            // TODO Improve logging and error handling #38.
            console.log("error", error);
            res.status(500).json({
                "error": "Solr request failed."
            });
        }
    });
}

function solrToStatistics(content) {
    return {
        "data": {
            "numberOfDatasets": content.response.numFound
        }
    }
}

function forwardSolrQuery(req, res) {
    const url = configuration.solr.url + req.url;
    const options = {
        "url": url
    };
    request.get(options).on("error", (error) => {
        // TODO Improve logging and error handling #38.
        console.log("error", error);
        res.status(500).json({
            "error": "Call of backend service failed."
        });
    }).pipe(res);
}
