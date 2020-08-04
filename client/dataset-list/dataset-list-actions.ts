import {createAsyncAction, ActionType} from "typesafe-actions";
import {DatasetList} from "./dataset-list-model";
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

export const DatasetListActions = {
  "fetchDatasets": createAsyncAction(
    "app.fetchDatasets.request",
    "app.fetchDatasets.success",
    "app.fetchDatasets.failure",
  )<DatasetsFetchPayload,
    DatasetsFetchPayloadSuccess,
    DatasetsFetchPayloadFailed>(),
};

export type DatasetListActionsType = ActionType<typeof DatasetListActions>;
