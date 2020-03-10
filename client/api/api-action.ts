//
// Provide binding from api to Redux actions.
//

import {
  FlatJsonLdPromise,
  createApiImplementation,
  DatasetListQuery,
} from "./api-interface";
import {fetchJson} from "./fetch-api";
import {selectLanguage} from "../app/navigation";

export const FETCH_DATASET_LIST =
  "FETCH_DATASET_LIST";
export const FETCH_DATASET_LIST_SUCCESS =
  "FETCH_DATASET_LIST_SUCCESS";
export const FETCH_DATASET_LIST_FAILED =
  "FETCH_DATASET_LIST_FAILED";

export const FETCH_DATASET =
  "FETCH_DATASET";
export const FETCH_DATASET_SUCCESS =
  "FETCH_DATASET_SUCCESS";
export const FETCH_DATASET_FAILED =
  "FETCH_DATASET_FAILED";

export const FETCH_DISTRIBUTION =
  "FETCH_DISTRIBUTION";
export const FETCH_DISTRIBUTION_SUCCESS =
  "FETCH_DISTRIBUTION_SUCCESS";
export const FETCH_DISTRIBUTION_FAILED =
  "FETCH_DISTRIBUTION_FAILED";

export const FETCH_PUBLISHER_LIST =
  "FETCH_PUBLISHER_LIST";
export const FETCH_PUBLISHER_LIST_SUCCESS =
  "FETCH_PUBLISHER_LIST_SUCCESS";
export const FETCH_PUBLISHER_LIST_FAILED =
  "FETCH_PUBLISHER_LIST_FAILED";

export const FETCH_KEYWORD_LIST =
  "FETCH_KEYWORD_LIST";
export const FETCH_KEYWORD_LIST_SUCCESS =
  "FETCH_KEYWORD_LIST_SUCCESS";
export const FETCH_KEYWORD_LIST_FAILED =
  "FETCH_KEYWORD_LIST_FAILED";

export const FETCH_LABEL =
  "FETCH_LABEL";
export const FETCH_LABEL_SUCCESS =
  "FETCH_LABEL_SUCCESS";
export const FETCH_LABEL_FAILED =
  "FETCH_LABEL_FAILED";

export const FETCH_INITIAL_DATA =
  "FETCH_INITIAL_DATA";
export const FETCH_INITIAL_DATA_SUCCESS =
  "FETCH_INITIAL_DATA_SUCCESS";
export const FETCH_INITIAL_DATA_FAILED =
  "FETCH_INITIAL_DATA_FAILED ";

export const FETCH_QUALITY_DATASET =
  "FETCH_QUALITY_DATASET";
export const FETCH_QUALITY_DATASET_SUCCESS =
  "FETCH_QUALITY_DATASET_SUCCESS";
export const FETCH_QUALITY_DATASET_FAILED =
  "FETCH_QUALITY_DISTRIBUTION_FAILED";


export const FETCH_QUALITY_DISTRIBUTION =
  "FETCH_QUALITY_DISTRIBUTION";
export const FETCH_QUALITY_DISTRIBUTION_SUCCESS =
  "FETCH_QUALITY_DISTRIBUTION_SUCCESS";
export const FETCH_QUALITY_DISTRIBUTION_FAILED =
  "FETCH_QUALITY_DISTRIBUTION_FAILED";

export const FETCH_QUALITY_PUBLISHER_LIST =
  "FETCH_QUALITY_PUBLISHER_LIST";
export const FETCH_QUALITY_PUBLISHER_LIST_SUCCESS =
  "FETCH_QUALITY_PUBLISHER_LIST_SUCCESS";
export const FETCH_QUALITY_PUBLISHER_LIST_FAILED =
  "FETCH_QUALITY_PUBLISHER_LIST_FAILED ";

export const FETCH_CATALOG_LIST =
  "FETCH_CATALOG_LIST";
export const FETCH_CATALOG_LIST_SUCCESS =
  "FETCH_CATALOG_LIST_SUCCESS";
export const FETCH_CATALOG_LIST_FAILED =
  "FETCH_CATALOG_LIST_FAILED";

export const FETCH_LANGUAGE =
  "FETCH_LANGUAGE";
export const FETCH_LANGUAGE_SUCCESS =
  "FETCH_LANGUAGE_SUCCESS";
export const FETCH_LANGUAGE_FAILED =
  "FETCH_LANGUAGE_FAILED";

export const FETCH_FACETS =
  "FETCH_FACETS";
export const FETCH_FACETS_SUCCESS =
  "FETCH_FACETS_SUCCESS";
export const FETCH_FACETS_FAILED =
  "FETCH_FACETS_FAILED";

export const FETCH_REQUEST = "FETCH_REQUEST";

export const FETCH_SUCCESS = "FETCH_SUCCESS";

export const FETCH_FAILED = "FETCH_FAILED";

let apiAdapter = createApiImplementation();

export function fetchDatasetList(query: DatasetListQuery) {
  return callApi(
    (lang) => apiAdapter.fetchDatasetList(lang, query),
    FETCH_DATASET_LIST,
    FETCH_DATASET_LIST_SUCCESS,
    FETCH_DATASET_LIST_FAILED);
}

/**
 * Execute given function and emmit actions.
 */
function callApi(
  call: (lang: string) => FlatJsonLdPromise,
  beforeAction: string,
  successAction: string,
  failAction: string,
  iri?: string,
  silent: boolean = false) {
  return (dispatch: any, getState: any) => {
    const language = selectLanguage(getState());
    dispatch({
      "type": beforeAction,
      "iri": iri,
      "fetch": FETCH_REQUEST,
    });
    call(language)
      .then(response => {
        dispatch({
          "type": successAction,
          "jsonld": response,
          "iri": iri,
          "fetch": FETCH_SUCCESS,
        });
      })
      .catch(error => {
        if (!silent) {
          console.error("API call error", error);
        }
        dispatch({
          "type": failAction,
          "error": error,
          "iri": iri,
          "fetch": FETCH_FAILED,
        });
      })
  }
}

export function fetchDataset(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchDataset(lang, iri),
    FETCH_DATASET,
    FETCH_DATASET_SUCCESS,
    FETCH_DATASET_FAILED,
    iri);
}

/**
 * This does not behave as a redux action.
 */
export function fetchDatasetTypeahead(
  language: string, text: string, query: DatasetListQuery) {
  return apiAdapter.fetchDatasetTypeahead(language, text, query);
}

export function fetchDistribution(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchDistribution(lang, iri),
    FETCH_DISTRIBUTION,
    FETCH_DISTRIBUTION_SUCCESS,
    FETCH_DISTRIBUTION_FAILED,
    iri);
}

export function fetchPublisherList() {
  return callApi(
    (lang) => apiAdapter.fetchPublisherList(lang),
    FETCH_PUBLISHER_LIST,
    FETCH_PUBLISHER_LIST_SUCCESS,
    FETCH_PUBLISHER_LIST_FAILED);
}

export function fetchKeywordList() {
  return callApi(
    (lang) => apiAdapter.fetchKeywordList(lang),
    FETCH_KEYWORD_LIST,
    FETCH_KEYWORD_LIST_SUCCESS,
    FETCH_KEYWORD_LIST_FAILED);
}

export function fetchLabel(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchLabel(lang, iri),
    FETCH_LABEL,
    FETCH_LABEL_SUCCESS,
    FETCH_LABEL_FAILED,
    iri,
    true);
}

export function fetchInitialData() {
  return callApi(
    (lang) => apiAdapter.fetchInitialData(lang),
    FETCH_INITIAL_DATA,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_FAILED);
}

export function fetchQualityDataset(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchQualityDataset(lang, iri),
    FETCH_QUALITY_DATASET,
    FETCH_QUALITY_DATASET_SUCCESS,
    FETCH_QUALITY_DATASET_FAILED,
    iri);
}

export function fetchQualityDistribution(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchQualityDistribution(lang, iri),
    FETCH_QUALITY_DISTRIBUTION,
    FETCH_QUALITY_DISTRIBUTION_SUCCESS,
    FETCH_QUALITY_DISTRIBUTION_FAILED,
    iri);
}

export function fetchQualityPublisherList() {
  return callApi(
    (lang) => apiAdapter.fetchQualityPublisherList(lang),
    FETCH_QUALITY_PUBLISHER_LIST,
    FETCH_QUALITY_PUBLISHER_LIST_SUCCESS,
    FETCH_QUALITY_PUBLISHER_LIST_FAILED);
}

export function fetchCatalogList() {
  return callApi(
    (lang) => apiAdapter.fetchCatalogList(lang),
    FETCH_CATALOG_LIST,
    FETCH_CATALOG_LIST_SUCCESS,
    FETCH_CATALOG_LIST_FAILED);
}

export function fetchFacets(group: string, amount: number) {
  return callApi(
    (lang) => apiAdapter.fetchDatasetFacets(lang, group, amount),
    FETCH_FACETS,
    FETCH_FACETS_SUCCESS,
    FETCH_FACETS_FAILED);
}

export function fetchLanguage(language: string) {
  // This call is not part of the API.
  return (dispatch: any) => {
    dispatch({
      "type": FETCH_LANGUAGE,
      "language": language,
    });
    fetchJson("./assets/" + language + ".json")
      .then((response) => {
        dispatch({
          "type": FETCH_LANGUAGE_SUCCESS,
          "data": response.data,
          "language": language,
        });
      })
      .catch((error) => {
        dispatch({
          "type": FETCH_LANGUAGE_FAILED,
          "error": error,
          "language": language,
        });
      });
  };
}
