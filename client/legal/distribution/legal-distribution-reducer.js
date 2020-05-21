import {FETCH_DISTRIBUTION_SUCCESS} from "../../api/api-action";
import {
  MOUNT_DISTRIBUTION,
  UNMOUNT_DISTRIBUTION,
} from "../../distribution/list/distribution-action";
import {jsonLdToTermsOfUse} from "./jsonld-to-terms-of-use";

const NAME = "legal-distribution";

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
  case FETCH_DISTRIBUTION_SUCCESS:
    return onDistributionRequestSuccess(state, action);
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

function onDistributionRequestSuccess(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        "ready": true,
        ...jsonLdToTermsOfUse(action.jsonld),
      },
    },
  };
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectLegalDistribution(state, iri) {
  const legal = reducerSelector(state).distributions[iri];
  if (legal) {
    return legal;
  } else {
    return createMissingLegal();
  }
}

function createMissingLegal() {
  // TODO Add information about loading.
  return {
    "ready": false,
  };
}
