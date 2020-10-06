import {createAction, createAsyncAction, ActionType} from "typesafe-actions";
import {
  DataService,
  Dataset,
  Distribution,
  QualityMeasures,
  DatasetPart,
} from "./dataset-detail-model";
import {JsonLdEntity} from "../jsonld";
import {DatasetListQuery} from "../api/api-interface";
import {DatasetList} from "../dataset-list/dataset-list-model";

export interface DatasetFetchPayload {
  dataset: string;
}

export interface DatasetFetchPayloadSuccess {
  dataset: string;
  payload: Dataset;
  partsPayload: DatasetPart[],
  jsonld: JsonLdEntity[];
}

export interface DatasetFetchPayloadFailed {
  dataset: string;
  error: Error;
}

export interface DistributionFetchPayload {
  distribution: string;
}

export interface DistributionFetchPayloadSuccess {
  distribution: string;
  payload: Distribution | DataService;
  jsonld: JsonLdEntity[];
}

export interface DistributionFetchPayloadFailed {
  distribution: string;
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

export interface FetchDescendantsPayloadSuccess {
  dataset:string;
  payload: DatasetList;
  jsonld: JsonLdEntity[];
}

export interface FetchDescendantsPayloadFailed {
  dataset:string;
  error: Error;
}

export const DatasetDetailActions = {
  "fetchDataset": createAsyncAction(
    "app.fetchDatasetDetail.request",
    "app.fetchDatasetDetail.success",
    "app.fetchDatasetDetail.failure",
  )<DatasetFetchPayload,
    DatasetFetchPayloadSuccess,
    DatasetFetchPayloadFailed>(),
  "fetchDistribution": createAsyncAction(
    "app.fetchDistribution.request",
    "app.fetchDistribution.success",
    "app.fetchDistribution.failure",
  )<DistributionFetchPayload,
    DistributionFetchPayloadSuccess,
    DistributionFetchPayloadFailed>(),
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
  "fetchDescendants": createAsyncAction(
    "app.datasetDetail.descendants.request",
    "app.datasetDetail.descendants.success",
    "app.datasetDetail.descendants.failure",
  )<void,
    FetchDescendantsPayloadSuccess,
    FetchDescendantsPayloadFailed>(),
};

export type DatasetDetailActionsType = ActionType<typeof DatasetDetailActions>;
