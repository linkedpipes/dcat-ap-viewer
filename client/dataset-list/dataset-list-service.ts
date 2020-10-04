import {AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {areDatasetListQueryEqual, DatasetListQuery} from "../api/api-interface";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {DatasetListActions} from "./dataset-list-actions";
import {jsonLdToDatasetList} from "./jsonld-to-datasets";
import {selectDatasetListStatus, Status} from "./dataset-list-reducer";
import {selectUrl} from "../app/navigation/navigation-reducer";
import {createUrl} from "../app/navigation/url-create";
import {push} from "connected-react-router";
import {ParsedQuery} from "query-string";
import {fetchLabels, fetchDatasetLabel} from "../labels/labels-service";
import {DatasetList} from "./dataset-list-model";
import jsonLdToDatasetTypeahead from "./jsonld-to-dataset-typeahead";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function updateDatasets(
  nextQuery: DatasetListQuery, prevQuery: DatasetListQuery
): ThunkVoidResult {
  return (dispatch, getState) => {
    const state = getState();
    if (areDatasetListQueryEqual(nextQuery, prevQuery)) {
      return;
    }
    if (isLocked(state)) {
      return;
    }
    dispatch(fetchDatasets(nextQuery));
  };
}

/**
 * True if any user interaction should be ignored. We use this to prevent
 * user from changing query (clicking) before loading operation is done.
 */
function isLocked(state: any) {
  return selectDatasetListStatus(state) === Status.Loading;
}

export function fetchDatasets(query: DatasetListQuery): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    dispatch(DatasetListActions.fetchDatasets.request({
      "query": query
    }));
    try {
      const jsonld = await getApiInstance().fetchDatasetList(language, query);
      if (jsonld === undefined) {
        dispatch(DatasetListActions.fetchDatasets.failure({
          "query": query,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDatasetList(jsonld);
      dispatch(DatasetListActions.fetchDatasets.success({
        "query": query,
        "payload": payload,
        "jsonld": jsonld,
      }));
      fetchDatasetListLabels(dispatch, query, payload);
    } catch (ex) {
      dispatch(DatasetListActions.fetchDatasets.failure({
        "query": query,
        "error": ex,
      }));
    }

  }
}

function fetchDatasetListLabels(
  dispatch: ThunkDispatch<any, any, AnyAction>,
  query: DatasetListQuery,
  datasetList: DatasetList
) {
  const iris: string [] = [
    ...query.publisher,
    ...query.theme,
    ...query.format,
    ...datasetList.publishers.map((item) => item.iri),
    ...datasetList.themes.map((item) => item.iri),
    ...datasetList.formats.map((item) => item.iri),
  ];
  dispatch(fetchLabels(iris));
  //
  for (const iri of query.isPartOf) {
    dispatch(fetchDatasetLabel(iri));
  }
}

export function replaceNavigation(query: ParsedQuery): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    if (isLocked(state)) {
      return;
    }
    const oldUrl = selectUrl(state);
    const language = selectLanguage(state);
    const newUrl = createUrl(oldUrl.path, language, query);
    dispatch(push(newUrl));
  };
}

export function fetchFacets(
  query: DatasetListQuery, facetName: string
): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (isLocked(state)) {
      return;
    }
    dispatch(DatasetListActions.fetchFacets.request({
      "facetName": facetName
    }));
    try {
      const jsonld = await getApiInstance().fetchDatasetList(language, query);
      if (jsonld === undefined) {
        dispatch(DatasetListActions.fetchFacets.failure({
          "facetName": facetName,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDatasetList(jsonld);
      dispatch(DatasetListActions.fetchFacets.success({
        "facetName": facetName,
        "payload": payload,
        "jsonld": jsonld,
      }));
      fetchDatasetListLabels(dispatch, query, payload);
    } catch (ex) {
      console.log(ex);
      dispatch(DatasetListActions.fetchFacets.failure({
        "facetName": facetName,
        "error": ex,
      }));
    }
  };
}

export async function fetchDatasetTypeahead(
  query: DatasetListQuery, language: string, search: string) {
  const jsonld = await getApiInstance().fetchDatasetTypeahead(
    language, query, search);
  return jsonLdToDatasetTypeahead(jsonld);
}
