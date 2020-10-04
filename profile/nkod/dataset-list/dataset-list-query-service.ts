import {
  getGlobal,
  DATASET_SORT_DEFAULT,
  PAGE_SIZE_DEFAULT,
  DEFAULT_FACET_SIZE,
} from "../../client-api";
import {ParsedQuery} from "query-string";
import {DatasetListQuery} from "../../../client/api/api-interface";

/**
 * Holds status of the dataset view, that is not saved into URL.
 */
export interface DatasetListViewState {
  publisherLimit: number;
  themeLimit: number;
  keywordLimit: number;
  formatLimit: number;
  showMore: number;
}

/**
 * Holds status of dataset view, that is saved in the URL.
 */
export interface DatasetListViewQuery extends DatasetListViewState {
  page: number;
  pageSize: number;
  view: number;
  //
  sort?: string;
  search?: string;
  publisher: string[];
  theme: string[];
  keyword: string[];
  format: string[];
  temporalStart?: string;
  temporalEnd?: string;
  isPartOf: string[];
}

export function createDefaultState(): DatasetListViewState {
  return {
    "publisherLimit": Number(getGlobal(DEFAULT_FACET_SIZE)),
    "themeLimit": Number(getGlobal(DEFAULT_FACET_SIZE)),
    "keywordLimit": Number(getGlobal(DEFAULT_FACET_SIZE)),
    "formatLimit": Number(getGlobal(DEFAULT_FACET_SIZE)),
    "showMore": 0,
  };
}

export function toViewQuery(query: ParsedQuery): DatasetListViewQuery {
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

export function createDefaultQuery(): DatasetListViewQuery {
  return {
    ...createDefaultState(),
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

export function toDatasetListQuery(
  query: DatasetListViewQuery,
  showMore: number = 0
): DatasetListQuery {
  return {
    "offset": query.page * query.pageSize,
    "limit": query.pageSize + query.showMore + showMore,
    "sort": query.sort,
    "search": query.search,
    "publisher": query.publisher,
    "publisherLimit": query.publisherLimit,
    "theme": query.theme,
    "themeLimit": query.themeLimit,
    "keyword": query.keyword,
    "keywordLimit": query.keywordLimit,
    "format": query.format,
    "formatLimit": query.formatLimit,
    "temporalStart": query.temporalStart,
    "temporalEnd": query.temporalEnd,
    "isPartOf": query.isPartOf,
  };
}

export function toNavigation(query: DatasetListViewQuery): ParsedQuery {
  // Remove defaults as we do not need them in the URL.
  const defaultQuery = createDefaultQuery();
  const result = removeDefaultValues(query, defaultQuery);
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

function removeDefaultValues(
  query: DatasetListViewQuery, defaultQuery: DatasetListViewQuery
): ParsedQuery {
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
