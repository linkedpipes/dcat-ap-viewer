import {
  Dataset,
  PartDistribution,
  DataService,
  QualityMeasures,
  Part,
} from "./dataset-detail-model";
import {JsonLdEntity} from "../jsonld";
import {createAction, createAsyncAction, ActionType} from "typesafe-actions";

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

export interface PartFetchPayload {
  part: Part;
}

export interface PartFetchPayloadSuccess {
  part: Part;
  payload: PartDistribution | DataService;
  jsonld: JsonLdEntity[];
}

export interface PartFetchPayloadFailed {
  part: Part;
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

/**
 * Part can be distribution, data service or dataset. This is used
 * to report change in visibility of the parts, so parts that are not
 * visible may be removed.
 */
export interface DatasetPartChangePayload {
  prev: string;
  next: string;
}

export const DatasetDetailActions = {
  "fetchDataset": createAsyncAction(
    "app.fetchDatasetDetail.request",
    "app.fetchDatasetDetail.success",
    "app.fetchDatasetDetail.failure",
  )<DatasetFetchPayload,
    DatasetFetchPayloadSuccess,
    DatasetFetchPayloadFailed>(),
  "fetchPart": createAsyncAction(
    "app.fetchPart.request",
    "app.fetchPart.success",
    "app.fetchPart.failure",
  )<PartFetchPayload,
    PartFetchPayloadSuccess,
    PartFetchPayloadFailed>(),
  "fetchQuality": createAsyncAction(
    "app.fetchQuality.request",
    "app.fetchQuality.success",
    "app.fetchQuality.failure",
  )<QualityFetchPayload,
    QualityFetchPayloadSuccess,
    QualityFetchPayloadFailed>(),
  "mount": createAction("app.datasetDetail.mount")<DatasetDetailMountPayload>(),
  "change": createAction("app.datasetDetail.set")<DatasetDetailChangePayload>(),
  "unMount": createAction("app.datasetDetail.unMount")(),
  "changePart": createAction(
    "app.datasetDetail.setPart")<DatasetPartChangePayload>(),
};

export type DatasetDetailActionsType = ActionType<typeof DatasetDetailActions>;
