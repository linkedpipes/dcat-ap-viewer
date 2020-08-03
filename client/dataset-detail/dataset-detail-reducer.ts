import {
  DatasetDetailActions,
  DatasetDetailActionsType,
  DatasetDetailChangePayload,
  DatasetDetailMountPayload,
  DatasetFetchPayload,
  DatasetFetchPayloadFailed,
  DatasetFetchPayloadSuccess,
  DatasetPartChangePayload,
  PartFetchPayload,
  PartFetchPayloadFailed,
  PartFetchPayloadSuccess,
  QualityFetchPayload,
  QualityFetchPayloadFailed,
  QualityFetchPayloadSuccess
} from "./dataset-detail-actions";
import {
  DataService,
  Dataset,
  PartDistribution,
  DistributionType,
  DatasetMetadata,
  PartType,
  QualityMeasures,
  Part,
} from "./dataset-detail-model";
import {getType} from "typesafe-actions";

// TODO Move App level.
export enum Status {
  Undefined,
  Loading,
  Ready,
  Failed,
  NotAvailable,
}

export interface ResourceStatus {
  iri?: string;
  status: Status;
  error?: Error;
}

interface State {
  /**
   * Current main dataset.
   */
  dataset: (Dataset & ResourceStatus) | ResourceStatus;
  /**
   * Other datasets in the hierarchy.
   */
  descendants: Record<string, (DatasetMetadata & ResourceStatus) | ResourceStatus>;
  /**
   * Distributions or data services.
   */
  parts: Record<string,
    (PartDistribution & ResourceStatus) |
    (DataService & ResourceStatus) |
    ResourceStatus>;
  /**
   * Quality records for all data.
   */
  quality: Record<string, (QualityMeasures & ResourceStatus) | ResourceStatus>;
}

const initialStatus: State = {
  "dataset": {
    "status": Status.Undefined,
  },
  "descendants": {},
  "parts": {},
  "quality": {},
};

function reducer(state = initialStatus, action: DatasetDetailActionsType) {
  switch (action.type) {
    case getType(DatasetDetailActions.mount):
      return onDatasetMount(state, action.payload);
    case getType(DatasetDetailActions.unMount):
      return onDatasetUnMount();
    case getType(DatasetDetailActions.change):
      return onDatasetChange(state, action.payload);
    case getType(DatasetDetailActions.changePart):
      return onChangePart(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.request):
      return onFetchDataset(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.success):
      return onFetchDatasetSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.failure):
      return onFetchDatasetFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchPart.request):
      return onFetchPart(state, action.payload);
    case getType(DatasetDetailActions.fetchPart.success):
      return onFetchPartSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchPart.failure):
      return onFetchPartFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.request):
      return onFetchQuality(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.success):
      return onFetchQualitySuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.failure):
      return onFetchQualityFailed(state, action.payload);
    default:
      return state;
  }
}

function onDatasetMount(
  state: State, action: DatasetDetailMountPayload): State {
  return {
    ...state,
    "dataset": createEmptyResourceStatus(action.dataset),
  };
}

function createEmptyResourceStatus(iri:string): ResourceStatus {
  return {
    "iri": iri,
    "status": Status.Undefined,
  };
}

function onDatasetUnMount(): State {
  return initialStatus;
}

function onDatasetChange(
  state: State, action: DatasetDetailChangePayload): State {
  return {
    ...state,
    "dataset": createEmptyResourceStatus(action.dataset),
  };
}

/**
 * Remove the old part as it is no longer visible.
 */
function onChangePart(state: State, action: DatasetPartChangePayload): State {
  const parts = {
    [action.next]: createEmptyResourceStatus(action.next),
    ...state.parts,
  };
  delete parts[action.prev];
  return {
    ...state,
    "parts": parts,
  }
}

function onFetchDataset(state: State, action: DatasetFetchPayload): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  return {
    ...state,
    "dataset": createLoadingResourceStatus(state.dataset.iri),
  };
}

function createLoadingResourceStatus(iri:string): ResourceStatus {
  return {
    "iri": iri,
    "status": Status.Loading,
  };
}

function onFetchDatasetSuccess(
  state: State, action: DatasetFetchPayloadSuccess): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  return {
    ...state,
    "dataset": wrapReadyResourceStatus(action.payload),
  };
}

function wrapReadyResourceStatus<T>(data: T): ResourceStatus & T {
  return {
    ...data,
    "status": Status.Ready,
  };
}

function onFetchDatasetFailed(
  state: State, action: DatasetFetchPayloadFailed): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  return {
    ...state,
    "dataset":  createFailedResourceStatus(state.dataset.iri, action.error),
  };
}

function createFailedResourceStatus(iri:string, error: Error): ResourceStatus {
  return {
    "iri": iri,
    "status": Status.Failed,
    "error": error,
  };
}

function onFetchPart(state: State, action: PartFetchPayload): State {
  return {
    ...state,
    "parts": {
      ...state.parts,
      [action.part.iri]: createLoadingResourceStatus(action.part.iri),
    },
  };
}

function onFetchPartSuccess(
  state: State, action: PartFetchPayloadSuccess): State {
  const result = {
    ...state,
    "parts": {
      ...state.parts,
      [action.part.iri]: wrapReadyResourceStatus(action.payload),
    },
  };
  /**
   * Set part data type.
   */
  if (action.part.type === PartType.Unknown) {
    setPartType(result, action);
  }
  return result;
}

function setPartType(state: State, action: PartFetchPayloadSuccess) {
  const part = {...action.part};
  if (action.payload.type === DistributionType.DataService) {
    part.type = PartType.PartDataService;
  }
  if (action.payload.type === DistributionType.Distribution) {
    part.type = PartType.PartDistribution;
  }
  const dataset = state.dataset as (Dataset & ResourceStatus);
  const index = dataset.distributions.indexOf(action.part);
  state.dataset = {
    ...dataset,
    "distributions": [
      ...dataset.distributions.slice(0, index),
      part,
      ...dataset.distributions.slice(index + 1)
    ],
  } as (Dataset & ResourceStatus);
}

function onFetchPartFailed(
  state: State, action: PartFetchPayloadFailed): State {
  return {
    ...state,
    "parts": {
      ...state.parts,
      [action.part.iri]:
        createFailedResourceStatus(action.part.iri,action.error),
    },
  };
}

function onFetchQuality(state: State, action: QualityFetchPayload): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [action.iri]: createLoadingResourceStatus(action.iri),
    },
  };
}

function onFetchQualitySuccess(
  state: State, action: QualityFetchPayloadSuccess): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [action.iri]: wrapReadyResourceStatus(action.payload),
    },
  };
}

function onFetchQualityFailed(
  state: State, action: QualityFetchPayloadFailed): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [action.iri]: createFailedResourceStatus(action.iri, action.error),
    },
  };
}

const reducerName = "dataset-detail";

export default {
  "name": reducerName,
  "reducer": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

const undefinedResource: ResourceStatus = {
  "status": Status.Undefined,
};

export const datasetSelector =
  (state: any): (Dataset & ResourceStatus) | ResourceStatus =>
    stateSelector(state).dataset;

export const partSelector =
  (state: any, part: Part): PartDistribution | DataService | ResourceStatus => {
    return stateSelector(state).parts[part.iri] || undefinedResource;
  };

export const qualitySelector =
  (state: any, iri: string): QualityMeasures | ResourceStatus =>
    stateSelector(state).quality[iri] || undefinedResource;
