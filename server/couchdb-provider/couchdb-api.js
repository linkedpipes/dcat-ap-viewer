const request = require("request");
const {isResponseOk, ApiError} = require("./../http-utils");

(function initialize() {
  module.exports = {
    "executeCouchDBGet": executeCouchDBGet
  };
})();

function executeCouchDBGet(configuration, dataset, id) {
  const url = configuration.url + "/" + dataset + "/" + encodeURIComponent(id);
  return new Promise((resolve, reject) => {
    request({"url": url}, (error, response, body) => {
      if (!isResponseOk(response, error)) {
        reject(new ApiError(error, "Bad response from couchdb."));
      }
      try {
        return resolve(JSON.parse(body));
      } catch (ex) {
        reject(new ApiError(ex, "Can't process response."));
      }
    });
  });
}