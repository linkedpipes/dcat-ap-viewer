//
// Provider used for testing, return predefined data.
// It also showcase the format and content the API should return.
//

const data = require("./test-data");

(function initialize() {
  module.exports = {
    "createProvider": createProvider
  };
})();

function createProvider() {
  return {
    "v2-dataset-list": createDatasetList(),
    "v2-dataset-facet": createDatasetFacet(),
    "v2-dataset-item": createDatasetItem(),
    "v2-dataset-typeahead": createDatasetTypeahead(),
    "v2-distribution-item": createDistributionItem(),
    "v2-publisher-list": createPublisherList(),
    "v2-keyword-list": createKeywordList(),
    "v2-label-item": createLabelItem(),
    "v2-init-data": createInitialData(),
    "v2-quality-dataset": createQualityDataset(),
    "v2-quality-distribution": createQualityDistribution(),
    "v2-quality-publisher": createQualityPublisher(),
    "v2-catalog-list": createCatalogList(),
  }
}

function createDatasetList() {
  return (req, res) => {
    res.status(200).json(data["dataset-list"]);
  };
}

function createDatasetFacet() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createDatasetItem() {
  return (req, res) => {
    res.status(200).json(data["datasets"][req.query.url]);
  };
}

function createDatasetTypeahead() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createDistributionItem() {
  return (req, res) => {
    res.status(200).json(data["distributions"][req.query.url]);
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
    res.status(500).json({});
  };
}

function createInitialData() {
  return (req, res) => {
    res.status(200).json(data["initial-data"]);
  };
}

function createQualityDataset() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createQualityDistribution() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createQualityPublisher() {
  return (req, res) => {
    res.status(500).json({});
  };
}

function createCatalogList() {
  return (req, res) => {
    res.status(500).json({});
  };
}
