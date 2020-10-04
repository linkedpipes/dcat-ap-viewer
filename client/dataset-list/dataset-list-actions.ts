import {createAsyncAction, ActionType, createAction} from "typesafe-actions";
import {DatasetList, Facet} from "./dataset-list-model";
import {JsonLdEntity} from "../jsonld";
import {DatasetListQuery} from "../api/api-interface";

export interface DatasetsFetchPayload {
  query: DatasetListQuery;
}

export interface DatasetsFetchPayloadSuccess {
  query: DatasetListQuery;
  payload: DatasetList;
  jsonld: JsonLdEntity[];
}

export interface DatasetsFetchPayloadFailed {
  query: DatasetListQuery;
  error: Error;
}

export interface FacetFetchPayload {
  facetName: string;
}

export interface FacetFetchPayloadSuccess {
  facetName: string;
  payload: DatasetList;
  jsonld: JsonLdEntity[];
}

export interface FacetFetchPayloadFailed {
  facetName: string;
  error: Error;
}

export const DatasetListActions = {
  "fetchDatasets": createAsyncAction(
    "app.fetchDatasets.request",
    "app.fetchDatasets.success",
    "app.fetchDatasets.failure",
  )<DatasetsFetchPayload,
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
  )<FacetFetchPayload,
    FacetFetchPayloadSuccess,
    FacetFetchPayloadFailed>(),
};

export type DatasetListActionsType = ActionType<typeof DatasetListActions>;
