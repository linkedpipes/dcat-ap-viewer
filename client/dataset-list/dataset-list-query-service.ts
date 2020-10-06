import {
  DatasetListViewQuery,
  DatasetListViewState,
} from "./dataset-list-model";
import {
  DATASET_SORT_DEFAULT,
  DEFAULT_FACET_SIZE,
  PAGE_SIZE_DEFAULT,
  getGlobal,
} from "../app/globals";
import {ParsedQuery} from "query-string";
import {DatasetListQuery} from "../api/api-interface";

export function parsedQueryToViewQuery(
  query: ParsedQuery
): DatasetListViewQuery {
  let result = createDefaultQuery();
  addPaginationFromParams(query, result);
  addFirstFromParams(query, "sort", result);
  addFirstFromParams(query, "search", result);
  addArrayFromParams(query, "publisher", result);
  addArrayFromParams(query, "theme", result);
  addArrayFromParams(query, "keyword", result);
  addArrayFromParams(query, "format", result);
  addFirstFromParams(query, "temporalStart", result);
  addFirstFromParams(query, "temporalEnd", result);
  addFirstFromParams(query, "view", result, parseInt);
  addArrayFromParams(query, "isPartOf", result);
  return result;
}

function addPaginationFromParams(
  params: ParsedQuery, query: DatasetListViewQuery
) {
  addFirstFromParams(params, "pageSize", query, parseInt);
  if (params["page"] !== undefined) {
    // In params we count pages from 1, while in query from 0.
    addFirstFromParams(params, "page", query, parseInt);
    query["page"] -= 1;
  }
}

function addFirstFromParams(
  params: ParsedQuery, name: string, query: DatasetListViewQuery,
  transform = ((item: any) => item)
) {
  if (params[name] === undefined) {
    return;
  }
  // @ts-ignore
  query[name] = transform(params[name][0]);
}

function addArrayFromParams(
  params: ParsedQuery, name: string, query: DatasetListViewQuery
) {
  if (params[name] === undefined) {
    return;
  }
  // @ts-ignore
  query[name] = [...params[name]];
}

export function createDefaultQuery(): DatasetListViewQuery {
  return {
    "page": 0,
    "pageSize": Number(getGlobal(PAGE_SIZE_DEFAULT)),
    "sort": getGlobal(DATASET_SORT_DEFAULT),
    "search": "",
    "publisher": [],
    "theme": [],
    "keyword": [],
    "format": [],
    "temporalStart": undefined,
    "temporalEnd": undefined,
    "view": 0,
    "isPartOf": [],
  };
}

export function createDefaultState(): DatasetListViewState {
  const defaultFacetSize = Number(getGlobal(DEFAULT_FACET_SIZE));
  return {
    "publisherLimit": defaultFacetSize,
    "themeLimit": defaultFacetSize,
    "keywordLimit": defaultFacetSize,
    "formatLimit": defaultFacetSize,
    "showMore": 0,
  };
}

export function toDatasetListQuery(
  query: DatasetListViewQuery,
  state: DatasetListViewState,
): DatasetListQuery {
  return {
    "offset": query.page * query.pageSize,
    "limit": query.pageSize + state.showMore,
    "sort": query.sort,
    "search": query.search,
    "publisher": query.publisher,
    "publisherLimit": state.publisherLimit,
    "theme": query.theme,
    "themeLimit": state.themeLimit,
    "keyword": query.keyword,
    "keywordLimit": state.keywordLimit,
    "format": query.format,
    "formatLimit": state.formatLimit,
    "temporalStart": query.temporalStart,
    "temporalEnd": query.temporalEnd,
    "isPartOf": query.isPartOf,
  };
}

export function toParsedQuery(query: DatasetListViewQuery): ParsedQuery {
  // Remove defaults as we do not need them in the URL.
  const result = removeDefaultValues(query);
  // Update page so it starts from 1 instead of 0.
  if (result["page"]) {
    // @ts-ignore
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

function removeDefaultValues(query: DatasetListViewQuery): ParsedQuery {
  const defaultQuery = createDefaultQuery();
  const result = {};
  Object.keys(query).forEach(key => {
    // @ts-ignore
    if (Array.isArray(defaultQuery[key])) {
      // @ts-ignore
      result[key] = query[key];
      // @ts-ignore
    } else if (defaultQuery[key] !== query[key]) {
      // @ts-ignore
      result[key] = query[key];
    }
  });
  // @ts-ignore
  return result;
}

export function areDatasetListViewQueryEqual(
  left: DatasetListViewQuery, right: DatasetListViewQuery
): boolean {
  if (left === undefined || right === undefined) {
    return false;
  }
  return left.page === right.page
    && left.pageSize === right.pageSize
    && left.sort === right.sort
    && left.search === right.search
    && arraysAreEqual(left.publisher, right.publisher)
    && arraysAreEqual(left.theme, right.theme)
    && arraysAreEqual(left.keyword, right.keyword)
    && arraysAreEqual(left.format, right.format)
    && left.temporalStart === right.temporalStart
    && left.temporalEnd === right.temporalEnd
    && arraysAreEqual(left.isPartOf, right.isPartOf);
}

function arraysAreEqual(left: string[], right?: string[]): boolean {
  if (right === undefined) {
    return left === undefined;
  }
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; ++index) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

export function areDatasetListViewStateEqual(
  left: DatasetListViewState, right: DatasetListViewState
): boolean {
  if (left === undefined || right === undefined) {
    return false;
  }
  return left.formatLimit === right.formatLimit &&
    left.publisherLimit === right.publisherLimit &&
    left.keywordLimit === right.keywordLimit &&
    left.themeLimit === right.themeLimit &&
    left.showMore === right.showMore;
}

export function toggleFacet(
  viewQuery: DatasetListViewQuery, facetName: string, facetValue: string
): DatasetListViewQuery {
  const result = {...viewQuery};
  // @ts-ignore
  const index = result[facetName].indexOf(facetValue);
  if (index > -1) {
    // @ts-ignore
    result[facetName] = [
      // @ts-ignore
      ...result[facetName].splice(0, index),
      // @ts-ignore
      ...result[facetName].splice(index + 1),
    ];
  } else {
    // @ts-ignore
    result[facetName] = [...result[facetName], facetValue];
  }
  return result;
}
