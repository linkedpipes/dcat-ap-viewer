const request = require("request");
const {
  isResponseOk, RequestFailed, ErrorResponse, InvalidData,
} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeSparqlConstruct": executeSparqlConstruct
  };
})();

function executeSparqlConstruct(endpoint, query) {
  const url = endpoint + "/?" +
    "format=application%2Fx-json%2Bld&" +
    "timeout=0&" +
    "query=" + encodeURIComponent(query);
  return new Promise((resolve, reject) => {
    request({"url": url}, (error, response, body) => {
      if (error) {
        reject(new RequestFailed(url, error));
      }
      if (!isResponseOk(response)) {
        reject(new ErrorResponse(url, response));
      }
      try {
        resolve(JSON.parse(body));
      } catch (ex) {
        reject(new InvalidData(url, ex));
      }
    });
  });
}
