import {getType} from "typesafe-actions";

import {
  DatasetDetailActions,
  DatasetDetailActionsType,
  DatasetDetailChangePayload,
  DatasetFetchPayloadFailed,
  DatasetFetchPayloadRequest,
  DatasetFetchPayloadSuccess,
  DistributionFetchPayloadFailed,
  DistributionFetchPayloadRequest,
  DistributionFetchPayloadSuccess,
  FetchDescendantsPayloadFailed,
  FetchDescendantsPayloadRequest,
  FetchDescendantsPayloadSuccess,
  QualityFetchPayloadFailed,
  QualityFetchPayloadRequest,
  QualityFetchPayloadSuccess,
} from "./dataset-detail-actions";
import {ResourceStatus} from "../resource-status";
import {register} from "../core/register";
import {DatasetListItem} from "../../data-api/api-dataset";
import {QualityMeasures} from "../../data-model/quality";
import {NkodDataset} from "../../data-model/dataset";
import {NkodDataService, NkodDistribution} from "../../data-model/distribution";

class DistributionWrap {
  distribution: NkodDistribution | NkodDataService | undefined = undefined;
  status: ResourceStatus = ResourceStatus.Undefined;
}

class DescendantsState {
  count: number = 0;
  datasets: DatasetListItem[] = [];
  status: ResourceStatus = ResourceStatus.Undefined;
}

class QualityWrap {
  quality: QualityMeasures | undefined = undefined;
  status: ResourceStatus = ResourceStatus.Undefined;
}

class State {
  mounted: boolean = false;
  status: ResourceStatus = ResourceStatus.Undefined;
  error: Error | undefined = undefined;
  datasetIri: string | undefined = undefined;
  dataset: NkodDataset | undefined = undefined;
  distributions: Record<string, DistributionWrap> = {};
  descendants: DescendantsState = new DescendantsState();
  quality: Record<string, QualityWrap> = {};
}

function reducer(state = new State(), action: DatasetDetailActionsType) {
  switch (action.type) {
    case getType(DatasetDetailActions.mountDatasetDetail):
      return onDatasetDetailMount(state);
    case getType(DatasetDetailActions.unMountDatasetDetail):
      return onDatasetDetailUnMount();
    case getType(DatasetDetailActions.setDatasetDetail):
      return onDatasetDetailSetDataset(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.request):
      return onDatasetDetailFetchRequest(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.success):
      return onDatasetDetailFetchSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDataset.failure):
      return onDatasetDetailFetchFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.request):
      return onDatasetDetailDistributionFetchRequest(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.success):
      return onDatasetDetailDistributionFetchSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDistribution.failure):
      return onDatasetDetailDistributionFetchFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchDescendants.request):
      return onDatasetDetailDescendantsFetchRequest(state, action.payload);
    case getType(DatasetDetailActions.fetchDescendants.success):
      return onDatasetDetailDescendantsFetchSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchDescendants.failure):
      return onDatasetDetailDescendantsFetchFailed(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.request):
      return onDatasetDetailQualityFetchRequest(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.success):
      return onDatasetDetailQualityFetchSuccess(state, action.payload);
    case getType(DatasetDetailActions.fetchQuality.failure):
      return onDatasetDetailQualityFetchFailed(state, action.payload);
    default:
      return state;
  }
}

function onDatasetDetailMount(state: State): State {
  return {
    ...state,
    "mounted": true,
  };
}

function onDatasetDetailUnMount(): State {
  return new State();
}

function onDatasetDetailSetDataset(
  state: State, payload: DatasetDetailChangePayload
): State {
  return {
    ...state,
    "status": ResourceStatus.Undefined,
    "datasetIri": payload.datasetIri,
    "dataset": undefined,
    "distributions": {},
    "descendants": new DescendantsState(),
    "quality": {},
  };
}

function onDatasetDetailFetchRequest(
  state: State, payload: DatasetFetchPayloadRequest
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "status": ResourceStatus.Loading,
  }
}

function onDatasetDetailFetchSuccess(
  state: State, payload: DatasetFetchPayloadSuccess
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "status": ResourceStatus.Ready,
    "dataset": payload.dataset,
    "distributions": prepareDistributionData(payload),
  }
}

function prepareDistributionData(payload: DatasetFetchPayloadSuccess) {
  const distributions: Record<string, DistributionWrap> = {};
  for (const distribution of payload.distributions) {
    distributions[distribution.iri] = {
      "distribution": distribution,
      "status": ResourceStatus.Ready,
    };
  }
  for (const iri of payload.dataset.distributions) {
    if (distributions[iri] === undefined) {
      distributions[iri] = {
        "distribution": undefined,
        "status": ResourceStatus.Undefined,
      };
    }
  }
  return distributions;
}

function onDatasetDetailFetchFailed(
  state: State, payload: DatasetFetchPayloadFailed
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "status": ResourceStatus.Failed,
    "error": payload.error,
  };
}

function onDatasetDetailDistributionFetchRequest(
  state: State, payload: DistributionFetchPayloadRequest
): State {
  if (state.distributions[payload.distributionIri] === undefined) {
    return state;
  }
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [payload.distributionIri]: {
        "distribution": undefined,
        "status": ResourceStatus.Loading,
      }
    }
  }
}

function onDatasetDetailDistributionFetchSuccess(
  state: State, payload: DistributionFetchPayloadSuccess
): State {
  if (state.distributions[payload.distributionIri] === undefined) {
    return state;
  }
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [payload.distributionIri]: {
        "distribution": payload.distribution,
        "status": ResourceStatus.Ready,
      }
    }
  }
}

function onDatasetDetailDistributionFetchFailed(
  state: State, payload: DistributionFetchPayloadFailed
): State {
  if (state.distributions[payload.distributionIri] === undefined) {
    return state;
  }
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [payload.distributionIri]: {
        "distribution": undefined,
        "status": ResourceStatus.Failed,
      }
    }
  }
}

function onDatasetDetailDescendantsFetchRequest(
  state: State, payload: FetchDescendantsPayloadRequest
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "descendants": {
      ...state.descendants,
      "status": ResourceStatus.Loading,
    },
  };
}

function onDatasetDetailDescendantsFetchSuccess(
  state: State, payload: FetchDescendantsPayloadSuccess
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "descendants": {
      "count": payload.datasets.length,
      "status": ResourceStatus.Ready,
      "datasets": payload.datasets,
    },
  };
}

function onDatasetDetailDescendantsFetchFailed(
  state: State, payload: FetchDescendantsPayloadFailed
): State {
  if (payload.datasetIri !== state.datasetIri) {
    return state;
  }
  return {
    ...state,
    "descendants": {
      ...state.descendants,
      "status": ResourceStatus.Failed,
    },
  };
}

function onDatasetDetailQualityFetchRequest(
  state: State, payload: QualityFetchPayloadRequest
): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [payload.iri]: {
        "quality": undefined,
        "status": ResourceStatus.Loading,
      }
    }
  }
}

function onDatasetDetailQualityFetchSuccess(
  state: State, payload: QualityFetchPayloadSuccess
): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [payload.iri]: {
        "quality": payload.payload,
        "status": ResourceStatus.Ready,
      }
    }
  }
}

function onDatasetDetailQualityFetchFailed(
  state: State, payload: QualityFetchPayloadFailed
): State {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [payload.iri]: {
        "quality": undefined,
        "status": ResourceStatus.Failed,
      }
    }
  }
}

const reducerName = "dataset-detail.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

export const statusSelector = (state: any) => stateSelector(state).status;

export const datasetSelector = (state: any) => stateSelector(state).dataset;

export const distributionSelector = (state: any, iri: string) =>
  stateSelector(state).distributions[iri];

export const loadedDistributionSelector = (state: any) => {
  const dataset = stateSelector(state).dataset;
  if (dataset === undefined) {
    return [];
  }
  const distributions = stateSelector(state).distributions;
  const result: DistributionWrap [] = [];
  for (const iri of dataset.distributions) {
    const distribution = distributions[iri];
    if (distribution === undefined) {
      continue;
    }
    result.push(distribution);
  }
  return result;
};

export const qualitySelector = (state: any, iri: string) =>
  stateSelector(state).quality[iri];

export const descendantsSelector = (state: any) =>
  stateSelector(state).descendants;
