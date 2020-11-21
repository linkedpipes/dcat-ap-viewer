import {createAction, createAsyncAction, ActionType} from "typesafe-actions";
import {NkodDataset} from "../../data-model/dataset";
import {NkodDataService, NkodDistribution} from "../../data-model/distribution";
import {Label} from "../../data-api/api-label";
import {Publisher} from "../../data-model/publisher";
import {QualityMeasures} from "../../data-model/quality";
import {DatasetListItem} from "../../data-api/api-dataset";

/**
 * What can happen is that component is not changed, but the dataset is,
 * in this case this event is emitted announcing change of dataset.
 *
 * This is so we can ignore results of older queries not relevant for
 * our dataset.
 */
export interface DatasetDetailChangePayload {

  datasetIri: string;

}

export interface DatasetFetchPayloadRequest {

  loadingIndicator: number;

  datasetIri: string;

}

export interface DatasetFetchPayloadSuccess {

  loadingIndicator: number;

  datasetIri: string;

  dataset: NkodDataset;

  distributions: (NkodDistribution | NkodDataService)[];

  labels: Label[];

  publishers: Publisher[];

}

export interface DatasetFetchPayloadFailed {

  loadingIndicator: number;

  datasetIri: string;

  error: Error;

}

export interface DistributionFetchPayloadRequest {

  loadingIndicator: number;

  distributionIri: string;

}

export interface DistributionFetchPayloadSuccess {

  loadingIndicator: number;

  distributionIri: string;

  distribution?: NkodDistribution | NkodDataService;

  labels: Label[];

}

export interface DistributionFetchPayloadFailed {

  loadingIndicator: number;

  distributionIri: string;

  error: Error;

}

export interface QualityFetchPayloadRequest {

  loadingIndicator: number;

  iri: string;

}

export interface QualityFetchPayloadSuccess {

  loadingIndicator: number;

  iri: string;

  payload: QualityMeasures;

}

export interface QualityFetchPayloadFailed {

  loadingIndicator: number;

  iri: string;

  error: Error;

}

export interface FetchDescendantsPayloadRequest {

  loadingIndicator: number;

  datasetIri: string;

}

export interface FetchDescendantsPayloadSuccess {

  loadingIndicator: number;

  datasetIri: string;

  datasets: DatasetListItem[];

  datasetsCount: number;

  labels: Label[];

}

export interface FetchDescendantsPayloadFailed {

  loadingIndicator: number;

  datasetIri: string;

  error: Error;

}

export const DatasetDetailActions = {
  "mountDatasetDetail": createAction(
    "app.datasetDetail.mount"
  )(),
  "unMountDatasetDetail": createAction(
    "app.datasetDetail.unMount"
  )(),
  "setDatasetDetail": createAction(
    "app.datasetDetail.set"
  )<DatasetDetailChangePayload>(),
  "fetchDataset": createAsyncAction(
    "app.fetchDatasetDetail.request",
    "app.fetchDatasetDetail.success",
    "app.fetchDatasetDetail.failure",
  )<DatasetFetchPayloadRequest,
    DatasetFetchPayloadSuccess,
    DatasetFetchPayloadFailed>(),
  "fetchDistribution": createAsyncAction(
    "app.fetchDistribution.request",
    "app.fetchDistribution.success",
    "app.fetchDistribution.failure",
  )<DistributionFetchPayloadRequest,
    DistributionFetchPayloadSuccess,
    DistributionFetchPayloadFailed>(),
  "fetchQuality": createAsyncAction(
    "app.fetchQuality.request",
    "app.fetchQuality.success",
    "app.fetchQuality.failure",
  )<QualityFetchPayloadRequest,
    QualityFetchPayloadSuccess,
    QualityFetchPayloadFailed>(),
  "fetchDescendants": createAsyncAction(
    "app.datasetDetail.descendants.request",
    "app.datasetDetail.descendants.success",
    "app.datasetDetail.descendants.failure",
  )<FetchDescendantsPayloadRequest,
    FetchDescendantsPayloadSuccess,
    FetchDescendantsPayloadFailed>(),
};

export type DatasetDetailActionsType = ActionType<typeof DatasetDetailActions>;
