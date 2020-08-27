//
// Provide binding from api to Redux actions.
//

import {
  Api,
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

export const FETCH_PUBLISHER_LIST =
  "FETCH_PUBLISHER_LIST";
export const FETCH_PUBLISHER_LIST_SUCCESS =
  "FETCH_PUBLISHER_LIST_SUCCESS";
export const FETCH_PUBLISHER_LIST_FAILED =
  "FETCH_PUBLISHER_LIST_FAILED";

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

export const FETCH_REQUEST = "FETCH_REQUEST";

export const FETCH_SUCCESS = "FETCH_SUCCESS";

export const FETCH_FAILED = "FETCH_FAILED";

let apiAdapter = createApiImplementation();

export function getApiInstance() : Api {
  return apiAdapter;
}

export function fetchDatasetList(query: DatasetListQuery) {
  //
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
  beforeAction: string, successAction: string, failAction: string,
  args: any = {}, silent: boolean = false) {
  return (dispatch: any, getState: any) => {
    const language = selectLanguage(getState());
    dispatch({
      ...args,
      "type": beforeAction,
      "fetch": FETCH_REQUEST,
    });
    call(language)
      .then(response => {
        dispatch({
          ...args,
          "type": successAction,
          "jsonld": response,
          "fetch": FETCH_SUCCESS,
        });
      })
      .catch(error => {
        if (!silent) {
          console.error("API call error", error);
        }
        dispatch({
          ...args,
          "type": failAction,
          "error": error,
          "fetch": FETCH_FAILED,
        });
      })
  }
}

/**
 * This does not behave as a redux action.
 */
export function fetchDatasetTypeahead(
  query: DatasetListQuery, language: string, text: string) {
  return apiAdapter.fetchDatasetTypeahead(language, query, text);
}

export function fetchPublisherList() {
  return callApi(
    (lang) => apiAdapter.fetchPublisherList(lang),
    FETCH_PUBLISHER_LIST,
    FETCH_PUBLISHER_LIST_SUCCESS,
    FETCH_PUBLISHER_LIST_FAILED);
}

export function fetchLabel(iri: string) {
  return callApi(
    (lang) => apiAdapter.fetchLabel(lang, iri),
    FETCH_LABEL,
    FETCH_LABEL_SUCCESS,
    FETCH_LABEL_FAILED,
    {iri},
    true);
}

export function fetchInitialData() {
  return callApi(
    (lang) => apiAdapter.fetchInitialData(lang),
    FETCH_INITIAL_DATA,
    FETCH_INITIAL_DATA_SUCCESS,
    FETCH_INITIAL_DATA_FAILED);
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
