import {
  MOUNT_DISTRIBUTION,
  UNMOUNT_DISTRIBUTION,
} from "./distribution-action";
import {
  FETCH_DISTRIBUTION_SUCCESS,
  FETCH_DISTRIBUTION_FAILED,
} from "../../api/api-action";
import {getEntityByType} from "../../jsonld";
import {DCAT} from "../../vocabulary/vocabulary";
import {jsonLdToDataService} from "./jsonld-to-data-service";
import {jsonLdToDistribution} from "./jsonld-to-distribution";

const NAME = "dataset-detail-distribution";

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
  case FETCH_DISTRIBUTION_FAILED:
    return onDistributionRequestFailed(state, action);
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
  return {
    ...initialState,
  };
}

function onDistributionRequestSuccess(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: loadDistributionFromAction(action),
    },
  };
}

function loadDistributionFromAction(action) {
  const dataService = getEntityByType(action.jsonld, DCAT.DataService);
  if (dataService) {
    return {
      ...jsonLdToDataService(action.jsonld),
      "resourceType": "data-service",
    };
  } else {
    return {
      ...jsonLdToDistribution(action.jsonld),
      "resourceType": "distribution",
    };
  }
}

function onDistributionRequestFailed(state) {
  return state;
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectDistribution(state, iri) {
  return reducerSelector(state).distributions[iri];
}
