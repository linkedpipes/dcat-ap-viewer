import {createAsyncAction, ActionType, createAction} from "typesafe-actions";
import {DatasetList, DatasetListQuery} from "../../data-api/api-dataset";
import {Label} from "../../data-api/api-label";

export interface DatasetsFetchPayloadRequest {

  loadingIndicator: number;

}

export interface DatasetsFetchPayloadSuccess {

  loadingIndicator: number;

  query: DatasetListQuery;

  /**
   * If true add result data to current data, i.e. there was no change in
   * filters only in offsets.
   */
  merge: boolean;

  content: DatasetList;

  labels: Label[];

}

export interface DatasetsFetchPayloadFailed {

  loadingIndicator: number;

  error: Error;

}

export const DatasetListActions = {
  "mountDatasetList": createAction("app.datasetList.mount")(),
  "unMountDatasetList": createAction("app.datasetList.mount")(),
  "fetchDatasetList": createAsyncAction(
    "app.datasetList.request",
    "app.datasetList.success",
    "app.datasetList.failure",
  )<DatasetsFetchPayloadRequest,
    DatasetsFetchPayloadSuccess,
    DatasetsFetchPayloadFailed>(),
};

export type DatasetListActionsType = ActionType<typeof DatasetListActions>;
