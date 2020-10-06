import {
  DatasetDetailActions,
  DatasetDetailActionsType,
  DatasetDetailChangePayload,
  DatasetDetailMountPayload,
  DatasetFetchPayload,
  DatasetFetchPayloadFailed,
  DatasetFetchPayloadSuccess,
  QualityFetchPayload,
  QualityFetchPayloadFailed,
  QualityFetchPayloadSuccess,
  FetchDescendantsPayload,
  DistributionFetchPayload,
  DistributionFetchPayloadSuccess,
  DistributionFetchPayloadFailed,
} from "./dataset-detail-actions";
import {
  DatasetListActions,
  DatasetListActionsType,
  DatasetsFetchPayloadSuccess,
  DatasetsFetchPayloadFailed,
} from "../dataset-list/dataset-list-actions";
import {
  Dataset,
  QualityMeasures,
  DatasetPart,
  LoadableResource
} from "./dataset-detail-model";
import {
  DatasetListItem,
} from "../dataset-list/dataset-list-model";
import {getType} from "typesafe-actions";
import {DatasetListQuery} from "../api/api-interface";
import {Status} from "../app/resource-status";

export {Status} from "../app/resource-status";

export interface Descendants {
  count?: number;
  datasets: DatasetListItem[];
  resourceStatus: Status;
}

interface State {
  active: boolean;
  /**
   * Current main dataset.
   */
  dataset: (Dataset & LoadableResource) | LoadableResource;
  /**
   * Other datasets in the hierarchy.
   */
  descendants: Descendants;
  /**
   * Query used for descendants, so we react only on data we need.
   */
  descendantsQuery?: DatasetListQuery;
  /**
   * Distributions or data services.
   */
  parts: Record<string, DatasetPart & LoadableResource>;
  /**
   * Quality records for all data.
   */
  quality: Record<string, (QualityMeasures & LoadableResource)
    | LoadableResource>;
}

const initialStatus: State = {
  "active": false,
  "dataset": {
    "resourceStatus": Status.Undefined,
  },
  "descendants": {
    "datasets": [],
    "resourceStatus": Status.Undefined,
  },
  "descendantsQuery": undefined,
  "parts": {},
  "quality": {},
};

type Actions = DatasetDetailActionsType | DatasetListActionsType;

function reducer(state = initialStatus, action: Actions) {
  switch (action.type) {
    case getType(DatasetDetailActions.mountDatasetDetail):
      return onDatasetMount(state, action.payload);
    default:
      break;
  }
  if (!state.active) {
    return state;
  }
  switch (action.type) {
    case getType(DatasetDetailActions.unMountDatasetDetail):
      return onDatasetUnMount();
    case getType(DatasetDetailActions.changeDatasetDetail):
      return onDatasetChange(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.request):
      return onFetchDataset(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.success):
      return onFetchDatasetSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.failure):
      return onFetchDatasetFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.request):
      return onFetchQuality(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.success):
      return onFetchQualitySuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.failure):
      return onFetchQualityFailed(state, action.payload);
    case getType(DatasetDetailActions.setDescendantsQuery):
      return onSetDescendantsQuery(state, action.payload);
    case getType(DatasetListActions.fetchDatasets.success):
      return onFetchDescendantsSuccess(state, action.payload);
    case getType(DatasetListActions.fetchDatasets.failure):
      return onFetchDescendantsFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.request):
      return onFetchDistribution(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.success):
      return onFetchDistributionSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.failure):
      return onFetchDistributionFailed(state, action.payload);
    default:
      return state;
  }
}

function onDatasetMount(
  state: State, action: DatasetDetailMountPayload): State {
  return {
    ...state,
    "active": true,
    "dataset": createEmptyResourceStatus(action.dataset),
    "parts": {},
  };
}

function createEmptyResourceStatus(iri: string): LoadableResource {
  return {
    "iri": iri,
    "resourceStatus": Status.Undefined,
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
    "descendantsQuery": undefined,
    "descendants": {
      "datasets": [],
      "resourceStatus": Status.Undefined,
    },
    "parts": {},
  };
}

function onFetchDataset(state: State, action: DatasetFetchPayload): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  return {
    ...state,
    "dataset": createLoadingResourceStatus(state.dataset.iri),
    "parts": {},
  };
}

function createLoadingResourceStatus(iri: string): LoadableResource {
  return {
    "iri": iri,
    "resourceStatus": Status.Loading,
  };
}

function onFetchDatasetSuccess(
  state: State, action: DatasetFetchPayloadSuccess): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  const parts: Record<string, DatasetPart & LoadableResource> = {};
  for (const part of action.partsPayload) {
    if (part.iri === undefined) {
      continue;
    }
    parts[part.iri] = wrapReadyResourceStatus(part);
  }
  return {
    ...state,
    "dataset": wrapReadyResourceStatus(action.payload),
    "parts": parts,
  };
}

function wrapReadyResourceStatus<T>(data: T): LoadableResource & T {
  return {
    ...data,
    "resourceStatus": Status.Ready,
  };
}

function onFetchDatasetFailed(
  state: State, action: DatasetFetchPayloadFailed): State {
  if (state.dataset.iri !== action.dataset) {
    return state;
  }
  return {
    ...state,
    "dataset": createFailedResourceStatus(state.dataset.iri, action.error),
    "parts": {},
  };
}

function createFailedResourceStatus(
  iri: string, error: Error
): LoadableResource {
  return {
    "iri": iri,
    "resourceStatus": Status.Failed,
    "error": error,
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

function onSetDescendantsQuery(
  state: State, action: FetchDescendantsPayload): State {
  if (state.descendants.resourceStatus === Status.Ready) {
    return {
      ...state,
      "descendantsQuery": action.query,
      "descendants": {
        ...state.descendants,
        "resourceStatus": Status.Updating,
      },
    };
  }
  return {
    ...state,
    "descendantsQuery": action.query,
    "descendants": {
      "datasets": [],
      "resourceStatus": Status.Loading,
    },
  };
}

function onFetchDescendantsSuccess(
  state: State, action: DatasetsFetchPayloadSuccess): State {
  if (action.query !== state.descendantsQuery) {
    return state;
  }
  return {
    ...state,
    "descendants": {
      "count": action.payload.datasetsCount,
      "datasets": action.payload.datasets,
      "resourceStatus": Status.Ready,
    },
  };
}

function onFetchDescendantsFailed(
  state: State, action: DatasetsFetchPayloadFailed): State {
  if (action.query !== state.descendantsQuery) {
    return state;
  }
  return {
    ...state,
    "descendants": {
      "datasets": [],
      "resourceStatus": Status.Failed,
    },
  };
}

function onFetchDistribution(
  state: State, action: DistributionFetchPayload) {
  return {
    ...state,
    "parts": {
      ...state.parts,
      [action.distribution]: createLoadingResourceStatus(action.distribution),
    }
  }
}

function onFetchDistributionSuccess(
  state: State, action: DistributionFetchPayloadSuccess) {
  return {
    ...state,
    "parts": {
      ...state.parts,
      [action.distribution]: wrapReadyResourceStatus(action.payload),
    }
  }
}

function onFetchDistributionFailed(
  state: State, action: DistributionFetchPayloadFailed) {
  return {
    ...state,
    "parts": {
      ...state.parts,
      [action.distribution]: createFailedResourceStatus(
        action.distribution, action.error),
    }
  }
}

const reducerName = "dataset-detail";

export default {
  "name": reducerName,
  "reducer": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

const undefinedResource: LoadableResource = {
  "resourceStatus": Status.Undefined,
};

export const datasetSelector =
  (state: any): (Dataset & LoadableResource) | LoadableResource =>
    stateSelector(state).dataset;

export const qualitySelector =
  (state: any, iri: string):
    (QualityMeasures & LoadableResource) | LoadableResource =>
    stateSelector(state).quality[iri] || undefinedResource;

export const descendantsSelector =
  (state: any): Descendants => stateSelector(state).descendants;

export const datasetPartSelector =
  (state: any, iri: string): (DatasetPart & LoadableResource) | LoadableResource =>
    stateSelector(state).parts[iri] || {...undefinedResource, "iri": iri};
