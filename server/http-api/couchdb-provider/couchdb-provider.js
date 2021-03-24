const {handleApiError} = require("./../http-utils");
const {executeCouchDBGet} = require("./couchdb-api");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    "v2-dataset-item": createDatasetsItemGet(configuration),
    "v2-distribution-item": createDistributionItemGet(configuration),
    "v2-keyword-list": createKeywordListGet(configuration),
    "v2-label-item": createLabelItem(configuration),
    "v2-init-data": createInitDataGet(configuration),
    "v2-catalog-list": createCatalogListGet(configuration),
  };
}

function createDatasetsItemGet(configuration) {
  return (req, res) => {
    const id = req.query.iri;
    executeCouchDBGet(configuration, "datasets", id)
      .then(transformDatasetItem)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformDatasetItem(content) {
  return content["jsonld"];
}

/**
 * Send response with JsonLD content.
 */
function responseJsonLd(res, data) {
  res.setHeader("Content-Type", "application/ld+json");
  res.end(JSON.stringify(data));
}

function createDistributionItemGet(configuration) {
  return (req, res) => {
    const id = req.query.iri;
    executeCouchDBGet(configuration, "distributions", id)
      .then(transformDistributionItem)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformDistributionItem(content) {
  return content["jsonld"];
}

function createKeywordListGet(configuration) {
  return (req, res) => {
    let language = req.query.language || configuration["default-language"];
    executeCouchDBGet(
      configuration, "static", "keywords_by_publishers_" + language)
      .then(transformKeywordList)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformKeywordList(content) {
  return content["jsonld"];
}

function createLabelItem(configuration) {
  return (req, res) => {
    const id = req.query.iri;
    executeCouchDBGet(configuration, "labels", id)
      .then(transformLabelItem)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformLabelItem(content) {
  return content["jsonld"];
}

function createInitDataGet(configuration) {
  return (req, res) => {
    executeCouchDBGet(configuration, "static", "initial_data_cache")
      .then(transformInitData)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformInitData(content) {
  return content["jsonld"];
}

function createCatalogListGet(configuration) {
  return (req, res) => {
    executeCouchDBGet(configuration, "static", "local_catalogs")
      .then(transformCatalogList)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function transformCatalogList(content) {
  return content["jsonld"];
}