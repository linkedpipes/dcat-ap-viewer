import {
  FETCH_QUALITY_DATASET,
  FETCH_QUALITY_DATASET_SUCCESS,
  FETCH_QUALITY_DISTRIBUTION,
  FETCH_QUALITY_DISTRIBUTION_SUCCESS,
} from "../../api/api-action";
import {
  DATASET_DETAIL_MOUNT,
  DATASET_DETAIL_UNMOUNT,
} from "../dataset-detail-actions";
import {jsonLdToQualityMeasures} from "./quality-service";

const initialState = {
  "mounted": false,
  "quality": {},
};

function reducer(state = initialState, action) {
  switch (action["type"]) {
  case DATASET_DETAIL_MOUNT:
    return onDatasetListMount(state);
  case DATASET_DETAIL_UNMOUNT:
    return onDatasetListUnMount(state);
  case FETCH_QUALITY_DATASET:
  case FETCH_QUALITY_DISTRIBUTION:
    return onQualityFetch(state, action);
  case FETCH_QUALITY_DATASET_SUCCESS:
  case FETCH_QUALITY_DISTRIBUTION_SUCCESS:
    return onDatasetQualityFetchSuccess(state, action);
  default:
    return state;
  }
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

function onQualityFetch(state, action) {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [action.iri]: {
        "ready": false,
      },
    },
  };
}

function onDatasetQualityFetchSuccess(state, action) {
  return {
    ...state,
    "quality": {
      ...state.quality,
      [action.iri]: {
        "ready": true,
        "data": jsonLdToQualityMeasures(action.jsonld),
      },
    },
  };
}

const NAME = "dataset-quality";

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectQuality(state, iri) {
  const quality = reducerSelector(state).quality[iri];
  if (quality) {
    return quality;
  } else {
    return createMissingQuality();
  }
}

function createMissingQuality() {
  return {
    "ready": false,
  };
}
