const express = require("express");
const request = require("request");
const config = require("../configuration");

(function initialize() {
  const router = express.Router();
  router.get("/info", createStatisticsGet());
  router.get("/query", createSolrQueryGet());
  module.exports = router;
})();

function createStatisticsGet() {
  const url = config.solr +
        "/query?q=*:*" +
        "&rows=0&" +
        "facet=true" +
        "&facet.field=keyword&" +
        "facet.field=publisherName&" +
        "facet.limit=-1";
  return (req, res) => {
    request({"url": url}, (error, response, body) => {
      if (isResponseOk(error, response)) {
        const content = JSON.parse(body);
        const statistics = solrToStatistics(content);
        res.json(statistics);
      } else {
        handleError(res, error);
      }
    });
  }
}

function isResponseOk(error, response) {
  return error === null && response && response.statusCode === 200;
}

function solrToStatistics(content) {
  const facetFields = content["facet_counts"]["facet_fields"];
  return {
    "data": {
      "numberOfDatasets": content.response.numFound,
      "numberOfPublishers": facetFields["publisherName"].length / 2,
      "numberOfKeywords": facetFields["keyword"].length / 2,
    },
  }
}

function handleError(res, error) {
  // TODO Improve logging and error handling #38.
  console.error("Request failed: ", error);
  res.status(500).json({
    "error": "service_request_failed",
  });
}

function createSolrQueryGet() {
  return (req, res) => {
    const url = config.solr + req.url;
    request.get({"url": url})
      .on("error", (error) => {
        handleError(res, error);
      }).pipe(res);
  };
}
