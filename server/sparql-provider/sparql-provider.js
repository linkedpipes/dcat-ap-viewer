const {handleApiError} = require("./../http-utils");
const {
  executeSparqlConstruct,
  executeSparqlSelect,
} = require("./sparql-api");
const quality = require("./sparql-quality");
const {
  defaultUserQuery,
  parseDatasetUserQuery,
} = require("../dataset-list-query");
const {
  createDatasetListSelectQuery,
  createDatasetListQuery,
  createPublisherFacetQuery,
  createThemeFacetQuery,
  createFormatFacetQuery,
  createKeywordFacetQuery,
  createDatasetListTypeaheadQuery,
  createDatasetSparql,
  createLabelSparql,
  createPublisherListSparql,
  createKeywordListSparql,
} = require("./sparql-query");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    // "v1-info"                  NOT SUPPORTED
    "v2-dataset-list": createDatasetListGet(configuration),
    "v2-dataset-item": createDatasetItemGet(configuration),
    "v2-dataset-typeahead": createDatasetListTypeaheadGet(configuration),
    // "v2-distribution-item"     NOT SUPPORTED
    "v2-publisher-list": createPublisherListGet(configuration),
    "v2-keyword-list": createKeywordListGet(configuration),
    "v2-label-item": createLabelItemGet(configuration),
    "v2-init-data": createInitialDataListGet(),
    // "v2-catalog-list"          NOT SUPPORTED
    ...quality.createProvider(configuration),
  }
}

function createDatasetListGet(configuration) {
  return (req, res) => {
    const query = {
      ...defaultUserQuery(configuration["default-language"]),
      ...parseDatasetUserQuery(req.query),
    };
    datasetListGet(configuration, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}

async function datasetListGet(configuration, query) {
  const endpoint = configuration.url;
  const selectQuery = createDatasetListSelectQuery(query);
  const selectQueryResponse = await executeSparqlSelect(endpoint, selectQuery);
  const allDatasets = selectQueryResponse.map(item => item.dataset.value);
  const datasets = selectSubArray(allDatasets, query.offset, query.limit);
  const datasetDataQuery = createDatasetListQuery(datasets);
  const datasetsData = await executeSparqlConstruct(endpoint, datasetDataQuery);

  const publisherFacets = await executeSparqlConstruct(
    endpoint, createPublisherFacetQuery(query));
  const themeFacets = await executeSparqlConstruct(
    endpoint, createThemeFacetQuery(query));
  const formatFacets = await executeSparqlConstruct(
    endpoint, createFormatFacetQuery(query));
  const keywordFacets = await executeSparqlConstruct(
    endpoint, createKeywordFacetQuery(query));

  return [
    {
      "@type": "urn:DatasetListMetadata",
      "urn:datasetsCount": allDatasets.length,
    },
    ...transformDatasetForResponse(datasetsData, query.language),
    ...transformFacetsForType(
      publisherFacets, "urn:publisher", query.publisherLimit),
    ...transformFacetsForType(
      themeFacets, "urn:theme", query.formatLimit),
    ...transformFacetsForType(
      formatFacets, "urn:format", query.themeLimit),
    ...transformFacetsForType(
      keywordFacets, "urn:keyword", query.keywordLimit),
  ];
}

function selectSubArray(array, offset, limit) {
  if (array.length < offset) {
    return [];
  }
  array = array.slice(offset);
  if (array.length < limit) {
    return array;
  }
  return array.slice(0, limit);
}

function transformDatasetForResponse(datasetsJsonLd, language) {
  return datasetsJsonLd;
}

function transformFacetsForType(allFacets, facetType, limit) {
  const facets = allFacets.filter(
    (item) => item["urn:facet"]["@id"] === facetType);
  facets.sort((left, right) => right["urn:count"] - left["urn:count"])
  return [
    {
      "@type": "urn:FacetMetadata",
      "urn:facet": {"@id": facetType},
      "urn:count": facets.length,
    },
    ...selectSubArray(facets, 0, limit),
  ]
}

function createDatasetItemGet(configuration) {
  const datasetPerGraph = configuration["dataset-per-graph"] === true;
  return (req, res) => {
    const iri = req.query.iri;
    const query = createDatasetSparql(datasetPerGraph, iri);
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}


function createDatasetListTypeaheadGet(configuration) {
  return (req, res) => {
    const query = {
      ...defaultUserQuery(configuration["default-language"]),
      ...parseDatasetUserQuery(req.query),
    };
    datasetListTypeaheadGet(configuration, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}

async function datasetListTypeaheadGet(configuration, query) {
  const endpoint = configuration.url;
  const selectQuery = createDatasetListSelectQuery(query);
  const selectQueryResponse = await executeSparqlSelect(endpoint, selectQuery);
  const allDatasets = selectQueryResponse.map(item => item.dataset.value);
  const datasets = selectSubArray(allDatasets, query.offset, query.limit);
  const datasetDataQuery = createDatasetListTypeaheadQuery(datasets);
  const datasetsData = await executeSparqlConstruct(endpoint, datasetDataQuery);

  return [
    {
      "@type": "urn:DatasetListMetadata",
      "urn:datasetsCount": allDatasets.length,
    },
    ...transformDatasetForResponse(datasetsData, query.language),
  ];
}

function createLabelItemGet(configuration) {
  return (req, res) => {
    const language = req.query.language;
    const query = createLabelSparql(req.query.iri, language);
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  }
}

function createInitialDataListGet() {
  return (req, res) => {
    res.json({});
  };
}

function createPublisherListGet(configuration) {
  return (req, res) => {
    const query = createPublisherListSparql();
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  }
}

function createKeywordListGet(configuration) {
  return (req, res) => {
    const language = req.query.language;
    const query = createKeywordListSparql(language);
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  }
}
