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
  QualityFetchPayloadSuccess,
  FetchDescendantsPayload,
} from "./dataset-detail-actions";
import {
  DatasetListActions,
  DatasetListActionsType,
  DatasetsFetchPayloadSuccess,
  DatasetsFetchPayloadFailed,
} from "../dataset-list/dataset-list-actions";
import {
  DataService,
  Dataset,
  PartDistribution,
  DistributionType,
  PartType,
  QualityMeasures,
  Part,
} from "./dataset-detail-model";
import {
  DatasetListItem,
} from "../dataset-list/dataset-list-model";
import {getType} from "typesafe-actions";
import {DatasetListQuery} from "../api/api-interface";
import {act} from "react-dom/test-utils";

// TODO Move App level.
export enum Status {
  Undefined,
  Loading,
  Ready,
  Failed,
  /**
   * Used when data are not available, for example there are
   * no data on quality.
   */
  NotAvailable,
  /**
   * Used if we have data and we do re-load, so we can show
   * the old data until the new one are ready to prevent
   * changes.
   */
  Updating,
}

export interface ResourceStatus {
  iri?: string;
  status: Status;
  error?: Error;
}

export interface Descendants {
  count?:number;
  datasets: DatasetListItem[];
  status: Status;
}

interface State {
  active: boolean;
  /**
   * Current main dataset.
   */
  dataset: (Dataset & ResourceStatus) | ResourceStatus;
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
  "active": false,
  "dataset": {
    "status": Status.Undefined,
  },
  "descendants": {
    "datasets": [],
    "status": Status.Undefined,
  },
  "descendantsQuery": undefined,
  "parts": {},
  "quality": {},
};

type Actions = DatasetDetailActionsType | DatasetListActionsType;

function reducer(state = initialStatus, action: Actions) {
  switch (action.type) {
    case getType(DatasetDetailActions.mount):
      return onDatasetMount(state, action.payload);
    default:
      break;
  }
  if (!state.active) {
    return state;
  }
  switch (action.type) {
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
    case getType(DatasetDetailActions.setDescendantsQuery):
      return onSetDescendantsQuery(state, action.payload);
    case getType(DatasetListActions.fetchDatasets.success):
      return onFetchDescendantsSuccess(state, action.payload);
    case getType(DatasetListActions.fetchDatasets.failure):
      return onFetchDescendantsFailed(state, action.payload);
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
  };
}

function createEmptyResourceStatus(iri: string): ResourceStatus {
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
    "descendantsQuery": undefined,
    "descendants": {
      "datasets": [],
      "status": Status.Undefined,
    },
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

function createLoadingResourceStatus(iri: string): ResourceStatus {
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
    "dataset": createFailedResourceStatus(state.dataset.iri, action.error),
  };
}

function createFailedResourceStatus(iri: string, error: Error): ResourceStatus {
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
  let partIndex = -1;
  for (let index = 0; index < dataset.distributions.length; ++index) {
    if (dataset.distributions[index].iri == part.iri) {
      partIndex = index;
      break;
    }
  }
  state.dataset = {
    ...dataset,
    "distributions": [
      ...dataset.distributions.slice(0, partIndex),
      part,
      ...dataset.distributions.slice(partIndex + 1)
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
        createFailedResourceStatus(action.part.iri, action.error),
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

function onSetDescendantsQuery(
  state: State, action: FetchDescendantsPayload): State {
  if (state.descendants.status === Status.Ready) {
    return {
      ...state,
      "descendantsQuery": action.query,
      "descendants": {
        ...state.descendants,
        "status": Status.Updating,
      },
    };
  }
  return {
    ...state,
    "descendantsQuery": action.query,
    "descendants": {
      "datasets": [],
      "status": Status.Loading,
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
      "status": Status.Ready,
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
      "status": Status.Failed,
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

export const descendantsSelector =
  (state: any): Descendants => stateSelector(state).descendants;
