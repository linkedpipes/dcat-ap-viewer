//
// Provider used for testing, return predefined data.
// It also showcase the format and content the API should return.
//

const data = require("./test-data");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider() {
  return {
    "v2-dataset-list": createDatasetList(),
    "v2-dataset-item": createDatasetItem(),
    "v2-dataset-typeahead": createDatasetTypeahead(),
    "v2-distribution-item": createDistributionItem(),
    "v2-publisher-list": createPublisherList(),
    "v2-keyword-list": createKeywordList(),
    "v2-label-item": createLabelItem(),
    "v2-init-data": createInitialData(),
    "v2-quality": createQuality(),
    "v2-catalog-list": createCatalogList(),
  }
}

function createDatasetList() {
  return (req, res) => {
    res.status(200).json(data["dataset-list"]);
  };
}

function createDatasetItem() {
  return (req, res) => {
    res.status(200).json(data["datasets"][req.query.iri]);
  };
}

function createDatasetTypeahead() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createDistributionItem() {
  return (req, res) => {
    res.status(200).json(data["distributions"][req.query.iri]);
  };
}

function createPublisherList() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createKeywordList() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createLabelItem() {
  return (req, res) => {
    res.status(200).json(data["labels"][req.query.iri]);
  };
}

function createInitialData() {
  return (req, res) => {
    res.status(200).json(data["initial-data"]);
  };
}

function createQuality() {
  return (req, res) => {
    res.status(200).json(data["quality"][req.query.iri]);
  };
}

function createCatalogList() {
  return (req, res) => {
    res.status(500).json({});
  };
}
