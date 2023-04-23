/**
 * Provides shared functionality for parsing dataset list query.
 */
(function initialize() {
  module.exports = {
    "defaultUserQuery": defaultUserQuery,
    "parseDatasetUserQuery": parseDatasetUserQuery,
    "addUserQueryFacet": addUserQueryFacet,
    "addUserQueryValue": addUserQueryValue,
  };
})();

const DEFAULT_FACET_RETURN_COUNT = 32;

function defaultUserQuery(language) {
  return {
    "text": "",
    "sortBy": "title",
    "sortOrder": "asc",
    "keyword": [],
    "keywordLimit": DEFAULT_FACET_RETURN_COUNT,
    "publisher": [],
    "publisherLimit": DEFAULT_FACET_RETURN_COUNT,
    "fileType": [],
    "fileTypeLimit": DEFAULT_FACET_RETURN_COUNT,
    "dataServiceType": [],
    "dataServiceTypeLimit": DEFAULT_FACET_RETURN_COUNT,
    "theme": [],
    "themeLimit": DEFAULT_FACET_RETURN_COUNT,
    "temporalStart": undefined,
    "temporalEnd": undefined,
    "offset": 0,
    "limit": 10,
    "language": language,
    "isPartOf": [],
    "containsService": undefined,
    "isVdfPublicData": undefined,
    "isVdfCodelist": undefined,
  };
}

function parseDatasetUserQuery(query) {
  const result = {};
  if (query.sort) {
    const [by, order] = query.sort.split(" ", 2);
    result["sortBy"] = by;
    result["sortOrder"] = order;
  }
  if (query.text) {
    result["text"] = query.text;
  }
  addUserQueryFacet(query, result, "keyword");
  addUserQueryFacet(query, result, "keywordLimit");
  addUserQueryFacet(query, result, "publisher");
  addUserQueryFacet(query, result, "publisherLimit");
  addUserQueryFacet(query, result, "fileType");
  addUserQueryFacet(query, result, "fileTypeLimit");
  addUserQueryFacet(query, result, "dataServiceType");
  addUserQueryFacet(query, result, "dataServiceTypeLimit");
  addUserQueryFacet(query, result, "theme");
  addUserQueryFacet(query, result, "themeLimit");
  addUserQueryFacet(query, result, "isPartOf");
  addUserQueryValue(query, result, ["temporalStart", "temporal-start"]);
  addUserQueryValue(query, result, ["temporalEnd", "temporal-end"]);
  addUserQueryValue(query, result, "offset");
  addUserQueryValue(query, result, "limit");
  addUserQueryValue(query, result, "language");
  addUserQueryByPresence(query, result, "isVdfPublicData");
  addUserQueryByPresence(query, result, "isVdfCodelist");
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
  const names = Array.isArray(name) ? name : [name];
  const outputName = names[0];
  for (const item of names) {
    if (query[item]) {
      result[outputName] = query[item];
      break;
    }
  }
}

function addUserQueryByPresence(query, result, name) {
  if (query[name] !== undefined) {
    result[name] = true;
  }
}
