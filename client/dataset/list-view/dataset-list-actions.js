import {
  selectUrl,
  createUrl,
  selectLanguage,
} from "../../app/navigation";
import {push} from "connected-react-router";
import {
  QUERY_DATASET_LIST_PAGE,
  QUERY_DATASET_LIST_PAGE_SIZE,
  QUERY_DATASET_LIST_SORT,
  QUERY_DATASET_LIST_SEARCH,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_TEMPORAL_START,
  QUERY_DATASET_LIST_TEMPORAL_END,
} from "../../app/component-list";
import {
  selectFacetAllFetched,
  selectDatasetListLocked,
} from "./dataset-list-reducer";
import {
  fetchFacets,
  fetchDatasetList,
  fetchDatasetTypeahead,
} from "../../api/api-action";
import {getGlobal} from "../../app/globals";
import jsonLdToDatasetTypeahead from "./jsonld-to-dataset-typeahead.ts";

export const DATASET_LIST_MOUNT = "DATASET_LIST_MOUNT";
export const DATASET_LIST_UNMOUNT = "DATASET_LIST_UNMOUNT";

// pushIfNotPending --> prevent change of data

export function datasetListMount() {
  return {
    "type": DATASET_LIST_MOUNT,
  };
}

export function datasetListUnMount() {
  return {
    "type": DATASET_LIST_UNMOUNT,
  }
}

export function toggleFacet(group, value) {
  return updateNavigation({[group]: value});
}

/**
 * @param merge Properties to merge, add to existing. If the already set value
 *  is provided it is removed from the list.
 * @param replace Replace existing values.
 */
function updateNavigation(merge, replace = {}) {
  return (dispatch, getState) => {
    const state = getState();
    if (selectDatasetListLocked(state)) {
      return;
    }
    const oldUrl = selectUrl(state);
    const language = selectLanguage(state);
    const newQuery = {...oldUrl.query};
    Object.entries(merge).forEach(([key, value]) => {
      // Merge values - keep only unique.
      const oldValue = asArray(oldUrl.query[key]);
      const newValue = asArray(value);
      newQuery[key] = [
        ...oldValue.filter(item => !newValue.includes(item)),
        ...newValue.filter(item => !oldValue.includes(item)),
      ];
    });
    Object.entries(replace).forEach(([key, value]) => {
      // Just replace.
      newQuery[key] = value;
    });
    const newUrl = createUrl(oldUrl.path, language, newQuery);
    dispatch(push(newUrl));
  };
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  } else if (value === null || value === undefined) {
    return [];
  } else {
    return [value];
  }
}

// TODO Update names with updateNavigation as they represent similar functionality
export function search(query) {
  return (dispatch, getState) => {
    const state = getState();
    if (selectDatasetListLocked(state)) {
      return;
    }
    const oldUrl = selectUrl(state);
    const language = selectLanguage(state);
    const newQuery = {
      ...query,
      // We need to remove page index (page parameter),
      // as there may not be enough records.
      [QUERY_DATASET_LIST_PAGE]: undefined,
    };
    const newUrl = createUrl(oldUrl.path, language, newQuery);
    dispatch(push(newUrl));
  };
}

// TODO
export function fetchMoreFacets(group, amount) {
  return (dispatch, getState) => {
    const state = getState();
    if (selectFacetAllFetched(state, group)) {
      // TODO Call this only when all data has been fetched.
      dispatch(fetchFacets(group, amount));
    }
  };
}

// TODO
export function fetchMore() {

}

export function updatePage(page) {
  return updateNavigation({}, {
    [QUERY_DATASET_LIST_PAGE]: page,
  });
}

export function updatePageSize(pageSize) {
  return updateNavigation({}, {
    [QUERY_DATASET_LIST_PAGE]: 0,
    [QUERY_DATASET_LIST_PAGE_SIZE]: pageSize,
  });
}

export function sortSet(sortBy) {
  return updateNavigation({}, {
    [QUERY_DATASET_LIST_SORT]: sortBy,
  });
}

/**
 * Execute API call.
 */
export function fetchDatasetForQuery(query) {
  const apiQuery = queryToApiQuery(query);
  return fetchDatasetList(apiQuery);
}

function queryToApiQuery(query) {
  return {
    "search": query[QUERY_DATASET_LIST_SEARCH] ?
      query[QUERY_DATASET_LIST_SEARCH][0] : undefined,
    "publisher": query[QUERY_DATASET_LIST_PUBLISHER] ?
      query[QUERY_DATASET_LIST_PUBLISHER] : [],
    "theme": query[QUERY_DATASET_LIST_THEME] ?
      query[QUERY_DATASET_LIST_THEME] : [],
    "keyword": query[QUERY_DATASET_LIST_KEYWORD] ?
      query[QUERY_DATASET_LIST_KEYWORD] : [],
    "format": query[QUERY_DATASET_LIST_FORMAT] ?
      query[QUERY_DATASET_LIST_FORMAT] : [],
    "page": query[QUERY_DATASET_LIST_PAGE] ?
      // We subtract -1, as first page is zero not one.
      parseInt(query[QUERY_DATASET_LIST_PAGE][0]) - 1 : [],
    "pageSize": query[QUERY_DATASET_LIST_PAGE_SIZE] ?
      parseInt(query[QUERY_DATASET_LIST_PAGE_SIZE][0]) :
      getGlobal("page-size-default"),
    "sort": query[QUERY_DATASET_LIST_SORT] ?
      query[QUERY_DATASET_LIST_SORT][0] :
      getGlobal("dataset-list-sort-default"),
    "temporalStart": query[QUERY_DATASET_LIST_TEMPORAL_START] ?
      query[QUERY_DATASET_LIST_TEMPORAL_START][0] : undefined,
    "temporalEnd": query[QUERY_DATASET_LIST_TEMPORAL_END] ?
      query[QUERY_DATASET_LIST_TEMPORAL_END][0] : undefined,
  };
}

/**
 * Is not implemented as a Redux action.
 */
export function fetchTypeahead(language, text, query) {
  const apiQuery = queryToApiQuery(query);
  apiQuery["search"] = undefined;
  apiQuery["page"] = undefined;
  apiQuery["pageSize"] = undefined;
  apiQuery["sort"] = undefined;
  return fetchDatasetTypeahead(language, text, query)
    .then(jsonld => {
      console.log(jsonld, "->");
      const result = jsonLdToDatasetTypeahead(jsonld);
      console.log(result);
      return result;
    });
}
