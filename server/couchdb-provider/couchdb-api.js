const request = require("request");
const {
  isResponseOk, RequestFailed, ErrorResponse, InvalidData,
} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeCouchDBGet": executeCouchDBGet
  };
})();

function executeCouchDBGet(configuration, dataset, id) {
  const url = configuration.url + "/" + dataset + "/" + encodeURIComponent(id);
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
