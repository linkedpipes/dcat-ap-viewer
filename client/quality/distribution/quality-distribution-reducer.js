import {FETCH_QUALITY_DISTRIBUTION_SUCCESS} from "../../api/api-action";
import {
  MOUNT_DISTRIBUTION,
  UNMOUNT_DISTRIBUTION,
} from "../../distribution/list/distribution-action";
import {jsonLdToQualityDistribution} from "./jsonld-to-distribution-quality";

const NAME = "quality-distribution";

const initialState = {
  "mounted": false,
  "distributions": {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case MOUNT_DISTRIBUTION:
    return onMount(state);
  case UNMOUNT_DISTRIBUTION:
    return onUnMount();
  case FETCH_QUALITY_DISTRIBUTION_SUCCESS:
    return onQualityDistributionRequestSuccess(state, action);
  default:
    return state;
  }
}

function onMount(state) {
  return {
    ...state,
    "mounted": true,
  };
}

function onUnMount() {
  return initialState;
}

function onQualityDistributionRequestSuccess(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        "ready": true,
        ...jsonLdToQualityDistribution(action.jsonld),
      },
    },
  };
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectQualityDistribution(state, iri) {
  const quality = reducerSelector(state).distributions[iri];
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
