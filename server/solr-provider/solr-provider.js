const request = require("request");
const {isResponseOk, handleError, ApiError} = request("./http-utils");

(function initialize() {
  module.exports = {
    "createProvider": createProvider
  };
})();

function createProvider(configuration) {
  return {
    "v1-info": createV1Info(),
  }
}

function createV1Info(configuration) {
  return (req, res) => {
    collectStatistics(configuration)
      .then(statistics => {
        const content = {
          "data": {
            "numberOfDatasets": statistics["count"]["datasets"],
            "numberOfPublishers": statistics["count"]["publishers"],
            "numberOfKeywords": statistics["count"]["keywords"]
          }
        };
        res.json(content);
      })
      .catch(error => {
        handleError(res, error);
      });
  };
}

function collectStatistics(configuration) {
  const url = configuration.url +
    "/query?q=*:*" +
    "&rows=0&" +
    "facet=true" +
    "&facet.field=keyword&" +
    "facet.field=publisher&" +
    "facet.limit=-1";
  return request({"url": url}, (error, response, body) => {
    if (!isResponseOk(error, response)) {
      throw new ApiError(error, "Can't query SOLR.");
    }
    const content = JSON.parse(body);
    return solrResponseToStatistics(content);
  });
}

function solrResponseToStatistics(content) {
  const facetFields = content["facet_counts"]["facet_fields"];
  return {
    "count": {
      "datasets": content["response"]["numFound"],
      "publishers": facetFields["publisherName"].length / 2,
      "keywords": facetFields["keyword"].length / 2,
    }
  }
}
