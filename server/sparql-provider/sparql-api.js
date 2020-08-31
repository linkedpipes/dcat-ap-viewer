const request = require("request");
const jsonld = require("jsonld");
const {
  isResponseOk, RequestFailed, ErrorResponse, InvalidData,
} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeSparqlConstruct": executeSparqlConstruct,
    "executeSparqlSelect": executeSparqlSelect,
  };
})();

function executeSparqlConstruct(endpoint, query) {
  const format = "application/ld+json";
  const url = endpoint + "/?timeout=0&query=" + encodeURIComponent(query);
  return new Promise((resolve, reject) => {
    request(requestParams(url, format), (error, response, body) => {
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
        .then(resolve)
        .catch(error => reject(new InvalidData(url, error)));
    });
  });
}

function requestParams(url, format) {
  return {
    "url": url,
    "headers": {
      "accept": format
    }
  }
}

function executeSparqlSelect(endpoint, query) {
  const format = "application/json";
  const url = endpoint + "/?timeout=0&query=" + encodeURIComponent(query);
  return new Promise((resolve, reject) => {
    request(requestParams(url, format), (error, response, body) => {
      if (error) {
        reject(new RequestFailed(url, error));
      }
      if (!isResponseOk(response)) {
        reject(new ErrorResponse(url, response));
      }
      try {
        const content = JSON.parse(body);
        resolve(content.results.bindings);
      } catch (ex) {
        reject(new InvalidData(url, ex));
      }
    });
  });
}
