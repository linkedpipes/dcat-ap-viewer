const request = require("request");
const {isResponseOk, ApiError} = require("./../http-utils");

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
      if (!isResponseOk(response, error)) {
        reject(new ApiError(error, "Can't query SPARQL"));
        return;
      }
      let result;
      try {
        result = JSON.parse(body);
      } catch (ex) {
        reject(new ApiError(ex, "Can't process response."));
        return;
      }
      return resolve(result);
    });
  });
}
