//
// Proxy API calls to given backend instance.
//

const request = require("request");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  const url = configuration["url"] + "/api/v2";
  return {
    "v2-dataset-list": createProxyUrl(url),
    "v2-dataset-item": createProxyUrl(url),
    "v2-dataset-typeahead": createProxyUrl(url),
    "v2-distribution-item": createProxyUrl(url),
    "v2-publisher-list": createProxyUrl(url),
    "v2-keyword-list": createProxyUrl(url),
    "v2-label-item": createProxyUrl(url),
    "v2-init-data": createProxyUrl(url),
    "v2-quality": createProxyUrl(url),
    "v2-catalog-list": createProxyUrl(url),
  };
}

function createProxyUrl(url) {
  return (req, res) => {
    req.pipe(request(url + req.url)).pipe(res);
  };
}
