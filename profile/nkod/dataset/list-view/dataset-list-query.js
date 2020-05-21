import {
  getGlobal,
  DATASET_SORT_DEFAULT,
  PAGE_SIZE_DEFAULT,
  DEFAULT_FACET_SIZE,
} from "../../../client-api";

export function paramsToViewQuery(params, state, keepDefault = []) { // params
  const defaultQuery = createDefaultQuery();
  const result = {
    ...defaultQuery,
    "publisherLimit": state["publisherLimit"],
    "themeLimit": state["themeLimit"],
    "keywordLimit": state["keywordLimit"],
    "formatLimit": state["formatLimit"],
    "showMore": state["showMore"],
  };
  // We may need to preserve some defaults, can be used
  // to hyde them in URL params.
  keepDefault.forEach((key) => {
    result[key] = defaultQuery[key];
  });
  //
  addPaginationFromParams(params, result);
  addFirstFromParams(params, "sort", result);
  addFirstFromParams(params, "search", result);
  addArrayFromParams(params, "publisher", result);
  addArrayFromParams(params, "theme", result);
  addArrayFromParams(params, "keyword", result);
  addArrayFromParams(params, "format", result);
  addFirstFromParams(params, "temporalStart", result);
  addFirstFromParams(params, "temporalEnd", result);
  addFirstFromParams(params, "view", result, parseInt);
  return result;
}

export function createDefaultQuery() {
  return {
    "page": 0,
    "pageSize": getGlobal(PAGE_SIZE_DEFAULT),
    "sort": getGlobal(DATASET_SORT_DEFAULT),
    "search": "",
    "publisher": [],
    "publisherLimit": getGlobal(DEFAULT_FACET_SIZE),
    "theme": [],
    "themeLimit": getGlobal(DEFAULT_FACET_SIZE),
    "keyword": [],
    "keywordLimit": getGlobal(DEFAULT_FACET_SIZE),
    "format": [],
    "formatLimit": getGlobal(DEFAULT_FACET_SIZE),
    "temporalStart": undefined,
    "temporalEnd": undefined,
    "view": 0,
  };
}

function addFirstFromParams(params, name, query, transform = (item => item)) {
  if (params[name] === undefined) {
    return;
  }
  query[name] = transform(params[name][0]);
}

function addArrayFromParams(params, name, query) {
  if (params[name] === undefined) {
    return;
  }
  query[name] = [...params[name]];
}

function addPaginationFromParams(params, query) {
  addFirstFromParams(params, "pageSize", query, parseInt);
  if (params["page"] !== undefined) {
    // In params we count pages from 1, while in query from 0.
    addFirstFromParams(params, "page", query, parseInt);
    query["page" ] -= 1;
  }
}

export function viewQueryToDatasetListQuery(query) {
  const result = {
    ...query,
    "offset": query["page"] * query["pageSize"],
    "limit": query["pageSize"] + query["showMore"],
  };
  // Remove parameters specific to this component.
  delete result["page"];
  delete result["pageSize"];
  delete result["view"];
  delete result["showMore"];
  return result;
}

function removeDefaultValues(query, defaultQuery) {
  const result = {};
  // Keep only changed an arrays.
  Object.keys(query).forEach(key => {
    if (Array.isArray(defaultQuery[key])) {
      result[key] = query[key];
    } else if (defaultQuery[key] !== query[key]) {
      result[key] = query[key];
    }
  });
  return result;
}

export function viewQueryToNavigation(query) {
  // Remove defaults as we do not need them in the URL.
  const defaultQuery = createDefaultQuery();
  const result = removeDefaultValues(query, defaultQuery);
  // Update page so it starts from 1 instead of 0.
  if (result["page"]) {
    result["page"] += 1;
  }
  // Remove limits.
  delete result["publisherLimit"];
  delete result["themeLimit"];
  delete result["keywordLimit"];
  delete result["formatLimit"];
  delete result["showMore"];
  return result;
}
