const request = require("request");
const {
  isResponseOk, RequestFailed, ErrorResponse, InvalidData,
} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeSolrQuery": executeSolrQuery,
  };
})();

function executeSolrQuery(url, responseHandler) {
  return new Promise((resolve, reject) => {
    request({"url": url}, (error, response, body) => {
      if (error) {
        reject(new RequestFailed(url, error));
      }
      if (!isResponseOk(response)) {
        reject(new ErrorResponse(url, response));
      }
      let result;
      try {
        const data = JSON.parse(body);
        result = responseHandler(data);
      } catch (ex) {
        reject(new InvalidData(url, ex));
      }
      resolve(result);
    });
  });
}