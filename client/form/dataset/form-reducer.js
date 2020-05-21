import {
  DATASET_DETAIL_MOUNT,
  DATASET_DETAIL_UNMOUNT,
  DATASET_DETAIL_SET,
} from "./../../dataset/detail-view/dataset-detail-actions";
import {FETCH_DATASET_SUCCESS} from "../../api/api-action";
import {jsonldToForm} from "./jsonld-to-form";

const initialState = {
  "ready": false,
  "dataset": undefined,
  "data": undefined,
};

const NAME = "form-dataset-detail";

function reducer(state = initialState, action) {
  switch (action["type"]) {
  case DATASET_DETAIL_MOUNT:
    return onDatasetDetailMount(action);
  case DATASET_DETAIL_UNMOUNT:
    return onDatasetDetailUnMount();
  case DATASET_DETAIL_SET:
    return onDatasetDetailSet(state, action);
  case FETCH_DATASET_SUCCESS:
    return onDatasetDetailFetchSuccess(state, action);
  }
  return state;
}

function onDatasetDetailMount(action) {
  return {
    ...initialState,
    "dataset": action.dataset,
  };
}

function onDatasetDetailUnMount() {
  return initialState;
}

function onDatasetDetailSet(state, action) {
  return {
    ...state,
    "dataset": action.dataset,
    "data": undefined,
  };
}

function onDatasetDetailFetchSuccess(state, action) {
  if (state.dataset !== action.iri) {
    // We ignore this request as it is not for our data.
  }
  return {
    ...state,
    "ready": true,
    "data": jsonldToForm(action.jsonld),
  };
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectFormData(state) {
  return reducerSelector(state).data;
}
