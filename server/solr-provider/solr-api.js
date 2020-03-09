const request = require("request");
const {isResponseOk, ApiError} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeSolrQuery": executeSolrQuery
  };
})();

function executeSolrQuery(url, responseHandler) {
  return new Promise((resolve, reject) => {
    request({"url": url}, (error, response, body) => {
      if (!isResponseOk(response, error)) {
        reject(new ApiError(error, "Can't query SOLR:" + url));
        return;
      }
      let result;
      try {
        const data = JSON.parse(body);
        console.time("parse");
        result = responseHandler(data);
        console.timeEnd("parse");
      } catch (ex) {
        reject(new ApiError(ex, "Can't process response."));
        return;
      }
      return resolve(result);
    });
  });
}