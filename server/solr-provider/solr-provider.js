const {handleApiError} = require("./../http-utils");
const {executeSolrQuery} = require("./solr-api");
const {measureTime} = require("../logging-utils");

(function initialize() {
  module.exports = {
    "createProvider": createProvider
  };
})();

function createProvider(configuration) {
  return {
    "v1-info": createV1InfoGet(configuration),
    "v2-dataset-list": measureTime("dataset-list",
      createV2DatasetListGet(configuration)),
    "v2-dataset-facet": createV2DatasetFacetGet(configuration),
    "v2-dataset-typeahead": createV2DatasetTypeaheadGet(configuration),
    "v2-publisher-list": createV2PublisherListGet(configuration),
  }
}

function createV1InfoGet(configuration) {
  return (req, res) => {
    let language = req.query.language || configuration["default-language"];
    collectStatistics(configuration, language)
      .then(statistics => {
        const responseJson = {
          "data": {
            "numberOfDatasets": statistics["count"]["datasets"],
            "numberOfPublishers": statistics["count"]["publishers"],
            "numberOfKeywords": statistics["count"]["keywords"]
          }
        };
        res.json(responseJson);
      })
      .catch(error => {
        handleApiError(res, error);
      });
  };
}

function collectStatistics(configuration, language) {
  const url = configuration.url
    + "/query?q=*:*"
    + "&rows=0"
    + "&facet=true"
    + "&facet.field=keyword_" + language + ""
    + "&facet.field=publisher"
    + "&facet.limit=-1";
  return executeSolrQuery(
    url, content => solrResponseToStatistics(content, language));
}

function solrResponseToStatistics(content, language) {
  const facetFields = content["facet_counts"]["facet_fields"];
  return {
    "count": {
      "datasets": content["response"]["numFound"],
      "publishers": facetFields["publisher"].length / 2,
      "keywords": facetFields["keyword_" + language].length / 2,
    }
  }
}

function createV2DatasetListGet(configuration) {
  return (req, res) => {
    const [query, language] = buildDatasetSolrQuery(
      req.query, configuration["default-language"]);
    const url = configuration.url + "/query?" + query;
    executeSolrQuery(url,
      (content) => solrResponseToDatasets(
        content, language, configuration["languages"]))
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function responseJsonLd(res, data) {
  res.setHeader("Content-Type", "application/ld+json");
  res.end(JSON.stringify(data));
}

function buildDatasetSolrQuery(query, defaultLanguage) {
  let userQuery = {
    ...defaultUserQuery(defaultLanguage),
    ...parseDatasetUserQuery(query),
  };
  if (query.text) {
    userQuery["text"] = encodeURIComponent(escapeSolrQueryForText(query.text));
  }
  //
  let sort;
  if (userQuery.sort_by === "title") {
    sort = userQuery.sort_by + "_" + userQuery.language + " "
      + userQuery.sort_order;
  } else {
    sort = userQuery.sort_by + " " + userQuery.sort_order;
  }
  let url = "facet.field=keyword_" + userQuery.language + "&"
    + "facet.field=format&"
    + "facet.field=publisher&"
    + "facet.field=theme&"
    + "facet=true&"
    + "facet.limit=-1&" // TODO Facet limit
    + "facet.mincount=1&"
    + "sort=" + encodeURIComponent(sort) + "&"
    + "q=" + userQuery.text + "";
  url += paginationToSolrQuery(userQuery);
  url += facetsToSolrQuery(userQuery);
  url += temporalToSolrQuery(userQuery);
  return [url, userQuery.language];
}

function defaultUserQuery(language) {
  return {
    "text": "*",
    "sort_by": "title",
    "sort_order": "asc",
    "keyword": [],
    "publisher": [],
    "format": [],
    "theme": [],
    "temporal-start": undefined,
    "temporal-end": undefined,
    "page-start": 0,
    "page-size": 10,
    "language": language,
  }
}

function parseDatasetUserQuery(query) {
  const result = {};
  if (query.sort) {
    const [by, order] = query.sort.split(" ", 2);
    result["sort_by"] = by;
    result["sort_order"] = order;
  }
  addUserQueryFacet(query, result, "keyword");
  addUserQueryFacet(query, result, "publisher");
  addUserQueryFacet(query, result, "format");
  addUserQueryFacet(query, result, "theme");
  addUserQueryValue(query, result, "temporal-start");
  addUserQueryValue(query, result, "temporal-end");
  addUserQueryValue(query, result, "offset");
  addUserQueryValue(query, result, "limit");
  addUserQueryValue(query, result, "language");
  return result;
}

function addUserQueryFacet(query, result, name) {
  if (query[name]) {
    if (Array.isArray(query[name])) {
      result[name] = query[name];
    } else {
      result[name] = [query[name]];
    }
  }
}

function addUserQueryValue(query, result, name) {
  if (query[name]) {
    result[name] = query[name];
  }
}

/**
 * TODO Describe and clarify difference to 'escapeSolrQueryValue'.
 */
function escapeSolrQueryForText(text) {
  text = escapeSolrQueryValue(text);

  const tokens = text.trim().split(" ")
    .filter(item => !isEmpty(item))
    .filter(isSpecialCharacter);
  if (tokens.length === 0) {
    return "";
  }

  let solrQuery = "_text_:*" + tokens[0] + "*";
  for (let index = 1; index < tokens.length; ++index) {
    solrQuery += " AND _text_:*" + tokens[index] + "*";
  }

  return solrQuery;
}

function isEmpty(value) {
  return value === undefined || value === null || value.length === 0;
}

function isSpecialCharacter(value) {
  return value[0] !== "\\" || value.length !== 2;
}

function escapeSolrQueryValue(text) {
  text = text.toLocaleLowerCase();

  const charactersToEscape = /([!*+=<>&|{}^~?[\]:"])/g;
  text = text.replace(charactersToEscape, "\\$1");

  // Escape control words (and, or, not).
  text = text.replace("and", "\\and");
  text = text.replace("or", "\\or");
  text = text.replace("not", "\\not");

  return text;
}

function paginationToSolrQuery(userQuery) {
  let url = "";
  url += "&start=" + (userQuery["offset"] || 0);
  url += "&rows=" + (userQuery["limit"] || 10);
  return url;
}

function facetsToSolrQuery(userQuery) {
  let url = "";

  userQuery.keyword.forEach((item) => {
    url += "&fq=keyword:\"" + encodeURIComponent(item) + "\""
  });

  userQuery.publisher.forEach((item) => {
    url += "&fq=publisher:\"" + encodeURIComponent(item) + "\""
  });

  userQuery.format.forEach((item) => {
    url += "&fq=format:\"" + encodeURIComponent(item) + "\""
  });

  userQuery.theme.forEach((item) => {
    url += "&fq=theme:\"" + encodeURIComponent(item) + "\""
  });

  return url;
}

function temporalToSolrQuery(userQuery) {
  let url = "";
  if (userQuery["temporal-start"] === undefined) {
    if (userQuery["temporal-end"] === undefined) {
      // No temporal limits.
    } else {
      // Only temporal end is set.
      url += "&fq=temporal-start:%5B+*+TO+"
        + userQuery["temporal-end"]
        + "T00%5C:00%5C:00Z+%5D";
    }
  } else {
    if (userQuery["temporal-end"] === undefined) {
      // Only temporal start is set.
      url += "&fq=temporal-end:%5B+"
        + userQuery["temporal-start"]
        + "T00%5C:00%5C:00Z+TO+*+%5D";
    } else {
      // Both temporal values are set.
      url += "&fq=temporal-start:%5B+*+TO+"
        + userQuery["temporal-start"]
        + "T00%5C:00%5C:00Z+%5D";
      url += "&fq=temporal-end:%5B+"
        + userQuery["temporal-end"]
        + "T00%5C:00%5C:00Z+TO+*+%5D";
    }
  }
  return url;
}

function solrResponseToDatasets(content, language, languagePreferences) {
  const facets = content["facet_counts"]["facet_fields"];
  return {
    "@context": datasetListContext(),
    "@graph": [
      {
        "@type": "Metadata",
        "datasetsCount": content["response"]["numFound"],
      },
      ...content["response"]["docs"].map(item => ({
        "@id": item["iri"],
        "@type": "Dataset",
        "modified": item["modified"],
        "accrualPeriodicity": asResource(item["accrualPeriodicity"]),
        "description": asLiteral(
          item, "description", language, languagePreferences),
        "issued": item["issued"],
        "title": asLiteral(item, "title", language, languagePreferences),
        "keyword": item["keyword_" + language],
        "theme": asResource(item["theme"]),
        "format": asResource(item["format"]),
        "publisher": asResource(item["publisher"]),
        "spatial": asResource(item["spatial"]),
      })),
      ...convertKeywords(facets["keyword_" + language], "urn:keyword"),
      ...convertFacet(facets["format"], "urn:format"),
      ...convertFacet(facets["publisher"], "urn:publisher"),
      ...convertFacet(facets["theme"], "urn:theme"),
    ],
  }
}

function datasetListContext() {
  return {
    "dcterms": "http://purl.org/dc/terms/",
    "dcat": "http://www.w3.org/ns/dcat#",
    "Metadata": "urn:DatasetListMetadata",
    "count": "urn:count",
    "Dataset": "dcat:Dataset",
    "modified": "dcterms:modified",
    "accrualPeriodicity": "dcterms:accrualPeriodicity",
    "description": "dcterms:description",
    "issued": "dcterms:issued",
    "title": "dcterms:title",
    "keyword": "dcat:keyword",
    "theme": "dcat:theme",
    "format": "dcterms:format",
    "publisher": "dcterms:publisher",
    "spatial": "dcterms:spatial",
    "Facet": "urn:Facet",
    "facet": "urn:facet",
    "code": "urn:code",
    "datasetsCount": "urn:datasetsCount",
  };
}

function convertKeywords(values, facetIri) {
  if (!values) {
    return [];
  }
  const result = [];
  for (let index = 0; index < values.length; index += 2) {
    const iri = values[index];
    const count = values[index + 1];
    result.push({
      "@type": "Facet",
      "urn:code": iri,
      "facet": {"@id": facetIri},
      "count": count,
    });
  }
  return result;
}

function convertFacet(values, facetIri) {
  if (!values) {
    return [];
  }
  const result = [];
  for (let index = 0; index < values.length; index += 2) {
    const iri = values[index];
    const count = values[index + 1];
    result.push({
      "@type": "Facet",
      "@id": iri,
      "facet": {"@id": facetIri},
      "count": count,
    });
  }
  return result;
}

function asResource(value) {
  if (Array.isArray(value)) {
    return value.map(item => ({"@id": item}));
  }
  if (value) {
    return {"@id": value};
  } else {
    return undefined;
  }
}

function asLiteral(item, propertyName, language, languagePreferences) {
  const preferredValue = item[propertyName + "_" + language];
  if (!isEmpty(preferredValue)) {
    return {
      "@language": language,
      "@value": preferredValue,
    }
  }
  // Just pick what is available.
  for (let lang of languagePreferences) {
    const value = item[propertyName + "_" + lang];
    if (!isEmpty(value)) {
      return {
        "@language": lang,
        "@value": value,
      }
    }
  }
}

/**
 * This function allows to retrieve all facets for given filters,
 * but no datasets.
 */
function createV2DatasetFacetGet(configuration) {
  return (req, res) => {
    const url = configuration.url + "/query?" + buildFacetSolrQuery(req.query);
    executeSolrQuery(url, solrResponseToFacets)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function buildFacetSolrQuery(query) {
  let userQuery = {
    ...defaultUserQuery(),
    ...parseDatasetUserQuery(query),
    "facet": "",
    "limit": -1,
  };
  if (query.text) {
    userQuery["text"] = encodeURIComponent(escapeSolrQueryForText(query.text));
  }
  addUserQueryFacet(query, userQuery, "facet");
  addUserQueryFacet(query, userQuery, "limit");
  //
  let url = "facet.field=" + encodeURIComponent(userQuery.facet) + "&"
    + "facet=true&"
    + "facet.limit=" + userQuery.limit + "&"
    + "facet.mincount=1&"
    + "rows=0&"
    + "q=" + userQuery.text + "";
  url += facetsToSolrQuery(userQuery);
  url += temporalToSolrQuery(userQuery);
  return url;
}

function solrResponseToFacets(content) {
  const facets = content["facet_counts"]["facet_fields"];
  return {
    "@context": datasetListContext(),
    "@graph": [
      ...convertFacet(facets["keyword"], "urn:keyword"),
      ...convertFacet(facets["format"], "urn:format"),
      ...convertFacet(facets["publisher"], "urn:publisher"),
      ...convertFacet(facets["theme"], "urn:theme"),
    ],
  }
}

function createV2DatasetTypeaheadGet(configuration) {
  // default-language
  return (req, res) => {
    const [params, language] =
      buildTypeaheadSolrQuery(req.query, configuration["default-language"]);
    const url = configuration.url + "/query?" + params;
    executeSolrQuery(url, content => solrResponseToTypeaheadDatasets(
      content, language, configuration["default-language"]))
      .then(data => {
        res.json(data);
      })
      .catch(error => {
        handleApiError(res, error);
      });
  };
}

function buildTypeaheadSolrQuery(query, defaultLanguage) {
  let userQuery = {
    ...defaultUserQuery(defaultLanguage),
    ...parseDatasetUserQuery(query),
  };
  if (query.text) {
    userQuery["text"] = encodeURIComponent(escapeSolrQueryValue(query.text));
  }
  //
  let url = "rows=8"
    + "&fl=title_" + query.language + ""
    + "&fl=title_" + defaultLanguage + ""
    + "&fl=iri"
    + "&q=" + userQuery.text + "";
  url += facetsToSolrQuery(userQuery);
  url += temporalToSolrQuery(userQuery);
  return [url, query.language];
}

function solrResponseToTypeaheadDatasets(content, language, defaultLanguage) {
  return {
    "@context": datasetListContext(),
    "@graph": [
      {
        "@type": "Metadata",
        "datasetsCount": content["response"]["numFound"],
      },
      ...content["response"]["docs"]
        .map(item => solrDocToTypeaheadDatasets(
          item, language, defaultLanguage)),
    ]
  };
}

function solrDocToTypeaheadDatasets(doc, language, defaultLanguage) {
  // The language may not be available, in such case
  // we need to use default language.
  let languageToUse;
  if (doc["title_" + language]) {
    languageToUse = language;
  } else {
    languageToUse = defaultLanguage;
  }
  return {
    "@id": doc["iri"],
    "@type": "Dataset",
    "title": {
      "@language": languageToUse,
      "@value": doc["title_" + languageToUse],
    },
  };
}

function createV2PublisherListGet(configuration) {
  return (req, res) => {
    const url = configuration.url
      + "/query?"
      + "facet.field=publisher&"
      + "facet=true&"
      + "facet.mincount=1"
      + "&q=*:*"
      + "&facet.limit=-1"
      + "&rows=0";
    executeSolrQuery(url, solrResponseToPublishers)
      .then(data => responseJsonLd(res, data))
      .catch(error => handleApiError(res, error));
  };
}

function solrResponseToPublishers(content) {
  const facets = content["facet_counts"]["facet_fields"];
  const publishers = facets["publisher"];
  if (!publishers) {
    return [];
  }
  const result = [];
  for (let index = 0; index < publishers.length; index += 2) {
    const iri = publishers[index];
    const count = publishers[index + 1];
    result.push({
      "@type": "http://schema.org/Organization",
      "@id": iri,
      "urn:datasetsCount": count,
    });
  }
  return result;
}