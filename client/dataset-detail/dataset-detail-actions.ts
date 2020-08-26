import {createAction, createAsyncAction, ActionType} from "typesafe-actions";
import {
  Dataset,
  QualityMeasures,
} from "./dataset-detail-model";
import {JsonLdEntity} from "../jsonld";
import {DatasetListQuery} from "../api/api-interface";

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

export interface QualityFetchPayload {
  iri: string;
}

export interface QualityFetchPayloadSuccess {
  iri: string;
  payload: QualityMeasures;
}

export interface QualityFetchPayloadFailed {
  iri: string;
  error: Error;
}

export interface DatasetDetailMountPayload {
  dataset: string;
}

/**
 * What can happen is that component is not changed, but the dataset is,
 * in this case this event is emitted announcing change of dataset.
 *
 * This is so we can ignore results of older queries not relevant for
 * our dataset.
 */
export interface DatasetDetailChangePayload {
  dataset: string;
}

export interface FetchDescendantsPayload {
  query: DatasetListQuery
}

export const DatasetDetailActions = {
  "fetchDataset": createAsyncAction(
    "app.fetchDatasetDetail.request",
    "app.fetchDatasetDetail.success",
    "app.fetchDatasetDetail.failure",
  )<DatasetFetchPayload,
    DatasetFetchPayloadSuccess,
    DatasetFetchPayloadFailed>(),
  "fetchQuality": createAsyncAction(
    "app.fetchQuality.request",
    "app.fetchQuality.success",
    "app.fetchQuality.failure",
  )<QualityFetchPayload,
    QualityFetchPayloadSuccess,
    QualityFetchPayloadFailed>(),
  "mountDatasetDetail": createAction(
    "app.datasetDetail.mount"
  )<DatasetDetailMountPayload>(),
  "changeDatasetDetail": createAction(
    "app.datasetDetail.set"
  )<DatasetDetailChangePayload>(),
  "unMountDatasetDetail": createAction(
    "app.datasetDetail.unMount"
  )(),
  "setDescendantsQuery": createAction(
    "app.datasetDetail.descendants"
  )<FetchDescendantsPayload>(),
};

export type DatasetDetailActionsType = ActionType<typeof DatasetDetailActions>;
