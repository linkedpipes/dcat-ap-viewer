import {
  DATASET_DETAIL_MOUNT,
  DATASET_DETAIL_UNMOUNT,
  DATASET_DETAIL_SET,
} from "./dataset-detail-actions";
import {
  FETCH_DATASET_SUCCESS,
  FETCH_DATASET_FAILED,
} from "../api/api-action";
import {jsonLdToDataset} from "./jsonld-to-dataset";

const NAME = "dataset-detail";

const initialStatus = {
  "ready": false,
  "error": 0,
  "dataset": undefined,
  "data": {},
};

function reducer(state = initialStatus, action) {
  switch (action.type) {
  case DATASET_DETAIL_MOUNT:
    return onDatasetDetailMount(action);
  case DATASET_DETAIL_UNMOUNT:
    return onDatasetDetailUnMount();
  case DATASET_DETAIL_SET:
    return onDatasetDetailSet(state, action);
  case FETCH_DATASET_SUCCESS:
    return onDatasetRequestSuccess(state, action);
  case FETCH_DATASET_FAILED:
    return onDatasetRequestFailed(state, action);
  default:
    return state;
  }
}

function onDatasetDetailMount(action) {
  return {
    ...initialStatus,
    "dataset": action.dataset,
  };
}

function onDatasetDetailUnMount() {
  return initialStatus;
}

function onDatasetDetailSet(state, action) {
  return {
    ...initialStatus,
    "dataset": action.dataset,
  };
}

function onDatasetRequestSuccess(state, action) {
  if (state.dataset !== action.iri) {
    return state;
  }
  return {
    ...state,
    "ready": true,
    "error": 0,
    "data": jsonLdToDataset(action.jsonld),
  };
}

function onDatasetRequestFailed(state, action) {
  if (state.dataset !== action.iri) {
    return state;
  }
  return {
    ...state,
    "error": action.error.code,
  };
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectReady(state) {
  return reducerSelector(state).ready;
}

export function selectError(state) {
  return reducerSelector(state).error;
}

export function selectDatasetDetail(state) {
  return reducerSelector(state).data;
}
