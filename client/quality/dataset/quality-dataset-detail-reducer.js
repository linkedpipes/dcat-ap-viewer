import {
  FETCH_QUALITY_DATASET,
  FETCH_QUALITY_DATASET_SUCCESS,
} from "../../api/api-action";
import {
  DATASET_DETAIL_MOUNT,
  DATASET_DETAIL_UNMOUNT,
} from "../../dataset-detail/dataset-detail-actions";
import jsonLdToDatasetQuality from "./jsonld-to-dataset-quality";

const initialState = {
  "mounted": false,
  "quality": undefined,
};

const NAME = "quality-dataset-detail";

function reducer(state = initialState, action) {
  switch (action["type"]) {
  case FETCH_QUALITY_DATASET:
    return onDatasetQualityFetch(state);
  case FETCH_QUALITY_DATASET_SUCCESS:
    return onDatasetQualityFetchSuccess(state, action);
  case DATASET_DETAIL_MOUNT:
    return onDatasetListMount(state);
  case DATASET_DETAIL_UNMOUNT:
    return onDatasetListUnMount(state);
  default:
    return state;
  }
}

function onDatasetQualityFetch(state) {
  return {
    ...state,
    "quality": {
      "ready": false,
    },
  };
}

function onDatasetQualityFetchSuccess(state, action) {
  return {
    ...state,
    "quality": {
      "ready": true,
      ...jsonLdToDatasetQuality(action.jsonld),
    },
  };
}

function onDatasetListMount(state) {
  return {
    ...state,
    "mounted": true,
  };
}

function onDatasetListUnMount() {
  return initialState;
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectDatasetQuality(state) {
  const quality = reducerSelector(state).quality;
  if (quality) {
    return quality;
  } else {
    return createMissingQuality();
  }
}

function createMissingQuality() {
  // TODO Add information about loading.
  return {
    "ready": false,
  };
}
