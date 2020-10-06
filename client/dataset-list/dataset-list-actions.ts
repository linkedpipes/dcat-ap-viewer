import {createAsyncAction, ActionType, createAction} from "typesafe-actions";
import {DatasetList, DatasetListViewState} from "./dataset-list-model";
import {JsonLdEntity} from "../jsonld";

export interface DatasetsFetchPayloadSuccess {
  payload: DatasetList;
  jsonld: JsonLdEntity[];
}

export interface DatasetsFetchPayloadFailed {
  error: Error;
}

export interface FacetFetchPayloadSuccess {
  payload: DatasetList;
  jsonld: JsonLdEntity[];
}

export interface FacetFetchPayloadFailed {
  error: Error;
}

export const DatasetListActions = {
  "fetchDatasets": createAsyncAction(
    "app.fetchDatasets.request",
    "app.fetchDatasets.success",
    "app.fetchDatasets.failure",
  )<void,
    DatasetsFetchPayloadSuccess,
    DatasetsFetchPayloadFailed>(),
  "mountDatasetList": createAction(
    "app.datasetList.mount"
  )(),
  "unMountDatasetList": createAction(
    "app.datasetList.mount"
  )(),
  "fetchFacets": createAsyncAction(
    "app.fetchFacets.request",
    "app.fetchFacets.success",
    "app.fetchFacets.failure",
  )<void,
    FacetFetchPayloadSuccess,
    FacetFetchPayloadFailed>(),
  "updateViewState": createAction(
    "app.datasetList.viewState"
  )<DatasetListViewState>(),
};

export type DatasetListActionsType = ActionType<typeof DatasetListActions>;
