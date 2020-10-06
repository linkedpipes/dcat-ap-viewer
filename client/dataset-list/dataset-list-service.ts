import {AnyAction} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {DatasetListQuery} from "../api/api-interface";
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
import {
  DatasetList,
  DatasetListViewQuery,
  DatasetListViewState
} from "./dataset-list-model";
import jsonLdToDatasetTypeahead from "./jsonld-to-dataset-typeahead";
import {
  toDatasetListQuery,
  areDatasetListViewQueryEqual,
  areDatasetListViewStateEqual,
  createDefaultState,
} from "./dataset-list-query-service";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function updateDatasetsData(
  prevQuery: DatasetListViewQuery, prevState: DatasetListViewState,
  nextQuery: DatasetListViewQuery, nextState: DatasetListViewState,
): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    if (isLocked(state)) {
      return;
    }
    console.log(
      "updateDatasetsData",
      "query:", areDatasetListViewQueryEqual(prevQuery, nextQuery),
      "state:", areDatasetListViewStateEqual(prevState, nextState),
      "\n", JSON.stringify(prevQuery),
      "\n", JSON.stringify(prevState),
      "\n vs",
      "\n", JSON.stringify(nextQuery),
      "\n", JSON.stringify(nextState));
    if (areDatasetListViewQueryEqual(prevQuery, nextQuery)
      && areDatasetListViewStateEqual(prevState, nextState)) {
      return;
    }
    if (areDatasetListViewQueryEqual(prevQuery, nextQuery)
      && prevState.showMore === nextState.showMore) {
      // There is change only in the facets.
      await fetchFacetsData(dispatch, state, nextQuery, nextState, prevState);
    } else {
      await fetchDatasetsData(dispatch, state, nextQuery, nextState);
    }
  };
}

/**
 * True if any user interaction should be ignored. We use this to prevent
 * user from changing query (clicking) before loading operation is done.
 */
function isLocked(state: any) {
  return selectDatasetListStatus(state) === Status.Loading;
}

async function fetchFacetsData(
  dispatch: ThunkDispatch<any, any, AnyAction>, state: any,
  viewQuery: DatasetListViewQuery, viewState: DatasetListViewState,
  prevState: DatasetListViewState
) {
  dispatch(DatasetListActions.fetchFacets.request());
  const language = selectLanguage(state);
  const query = createQueryForFacetFetch(viewQuery, viewState, prevState);
  try {
    const jsonld = await getApiInstance().fetchDatasetList(language, query);
    if (jsonld === undefined) {
      dispatch(DatasetListActions.fetchFacets.failure({
        "error": new Error("Missing JSON-LD data."),
      }));
      return;
    }
    const payload = jsonLdToDatasetList(jsonld);
    dispatch(DatasetListActions.fetchFacets.success({
      "payload": payload,
      "jsonld": jsonld,
    }));
    fetchDatasetListLabels(dispatch, query, payload);
  } catch (ex) {
    dispatch(DatasetListActions.fetchFacets.failure({
      "error": ex,
    }));
  }
}

function createQueryForFacetFetch(
  viewQuery: DatasetListViewQuery, viewState: DatasetListViewState,
  prevState: DatasetListViewState
): DatasetListQuery {
  const query = toDatasetListQuery(viewQuery, viewState);
  query.offset = 0;
  query.limit = 0;
  // We set limits to zero where no more facets is needed.
  query.publisherLimit =
    viewState.publisherLimit === prevState.publisherLimit ?
      0 : query.publisherLimit;
  query.themeLimit =
    viewState.themeLimit === prevState.themeLimit ?
      0 : query.themeLimit;
  query.keywordLimit =
    viewState.keywordLimit === prevState.keywordLimit ?
      0 : query.keywordLimit;
  query.formatLimit =
    viewState.formatLimit === prevState.formatLimit ?
      0 : query.formatLimit;
  return query;
}

async function fetchDatasetsData(
  dispatch: ThunkDispatch<any, any, AnyAction>, state: any,
  viewQuery: DatasetListViewQuery, viewState: DatasetListViewState
) {
  const language = selectLanguage(state);
  const query = toDatasetListQuery(viewQuery, viewState);
  dispatch(DatasetListActions.fetchDatasets.request());
  try {
    const jsonld = await getApiInstance().fetchDatasetList(language, query);
    if (jsonld === undefined) {
      dispatch(DatasetListActions.fetchDatasets.failure({
        "error": new Error("Missing JSON-LD data."),
      }));
      return;
    }
    const payload = jsonLdToDatasetList(jsonld);
    dispatch(DatasetListActions.fetchDatasets.success({
      "payload": payload,
      "jsonld": jsonld,
    }));
    fetchDatasetListLabels(dispatch, query, payload);
  } catch (ex) {
    dispatch(DatasetListActions.fetchDatasets.failure({
      "error": ex,
    }));
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

export async function fetchDatasetTypeahead(
  viewQuery: DatasetListViewQuery, language: string, search: string) {
  const query = toDatasetListQuery(viewQuery, createDefaultState());
  const jsonld = await getApiInstance().fetchDatasetTypeahead(
    language, query, search);
  return jsonLdToDatasetTypeahead(jsonld);
}
