import {
  Dataset,
} from "./dataset-list-model";
import {JsonLdEntity} from "../jsonld";
import {createAsyncAction, ActionType} from "typesafe-actions";

export interface DatasetFetchPayload {
  dataset: string;
}

export interface DatasetFetchPayloadSuccess {
  dataset: string;
  payload: Dataset;
  jsonld: JsonLdEntity[];
}

export interface DatasetFetchPayloadFailed {
  dataset: string;
  error: Error;
}

export const DatasetDetailActions = {
  "fetchDatasets": createAsyncAction(
    "app.fetchDatasets.request",
    "app.fetchDatasets.success",
    "app.fetchDatasets.failure",
  )<DatasetFetchPayload,
    DatasetFetchPayloadSuccess,
    DatasetFetchPayloadFailed>(),
};

export type DatasetDetailActionsType = ActionType<typeof DatasetDetailActions>;
