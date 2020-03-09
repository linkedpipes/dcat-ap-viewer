//
// Provider used for testing, return predefined data.
// It also showcase the format and content the API should return.
//

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

}

function createDatasetFacet() {

}

function createDatasetItem() {

}

function createDatasetTypeahead() {

}

function createDistributionItem() {

}

function createPublisherList() {

}

function createKeywordList() {

}

function createLabelItem() {

}

function createInitialData() {

}

function createQualityDataset() {

}

function createQualityDistribution() {

}

function createQualityPublisher() {

}

function createCatalogList() {

}
