const request = require("request");
const jsonld = require("jsonld");
const {
  isResponseOk, RequestFailed, ErrorResponse, InvalidData,
} = require("./../http-utils");
const logger = require("../../logging");
const { performance } = require("perf_hooks");

(function initialize() {
  module.exports = {
    "executeSparqlConstruct": executeSparqlConstruct,
    "executeSparqlSelect": executeSparqlSelect,
  };
})();

function executeSparqlConstruct(endpoint, query) {
  const format = "application/ld+json";
  const url = endpoint + "/?timeout=0&query=" + encodeURIComponent(query);
  const startTime = performance.now();
  return new Promise((resolve, reject) => {
    request(requestParams(url, format), (error, response, body) => {
      const queryTime = performance.now();
      if (error) {
        reject(new RequestFailed(url, error));
      }
      if (!isResponseOk(response)) {
        reject(new ErrorResponse(url, response));
      }
      let content;
      try {
        content = JSON.parse(body);
      } catch (ex) {
        reject(new InvalidData(url, ex));
      }
      jsonld.flatten(content)
        .then(data => {
          logLongRunningQuery(startTime, queryTime, query);
          resolve(data);
        })
        .catch(error => reject(new InvalidData(url, error)));
    });
  });
}

function requestParams(url, format) {
  return {
    "url": url,
    "headers": {
      "accept": format,
    },
  };
}

function logLongRunningQuery(startTime, queryTime, query) {
  const endTime = performance.now();
  const durationInSeconds = (endTime - startTime) / 1000;
  if (durationInSeconds > 1) {
    logger.info(
      "SPARQL query construct.",
      {
        "query-duration-ms": queryTime - startTime,
        "parse-duration-ms": endTime - queryTime,
        "query": query,
      });
  }
}

function executeSparqlSelect(endpoint, query) {
  const format = "application/json";
  const url = endpoint + "/?timeout=0&query=" + encodeURIComponent(query);
  const startTime = performance.now();
  return new Promise((resolve, reject) => {
    request(requestParams(url, format), (error, response, body) => {
      const queryTime = performance.now();
      if (error) {
        reject(new RequestFailed(url, error));
      }
      if (!isResponseOk(response)) {
        reject(new ErrorResponse(url, response));
      }
      try {
        const content = JSON.parse(body);
        logLongRunningQuery(startTime, queryTime, query);
        resolve(content.results.bindings);
      } catch (ex) {
        reject(new InvalidData(url, ex));
      }
    });
  });
}
