import {
  MOUNT_DISTRIBUTION,
  UNMOUNT_DISTRIBUTION,
  FETCH_DISTRIBUTION_REQUEST,
  FETCH_DISTRIBUTION_SUCCESS,
  FETCH_DISTRIBUTION_FAILED,
  SET_DISTRIBUTION_PAGE_INDEX,
  SET_DISTRIBUTION_PAGE_SIZE,
  FETCH_DISTRIBUTION_QUALITY_SUCCESS,
  FETCH_DISTRIBUTION_QUALITY_FAILED,
  FETCH_DATA_SOURCE_REQUEST,
  FETCH_DATA_SOURCE_SUCCESS,
  FETCH_DATA_SOURCE_FAILED,
} from "./distribution-action";
import {
  STATUS_UNKNOWN,
  STATUS_FETCHING,
  STATUS_FETCHED,
} from "@/app-services/http-request";
import {loadDistributionQuality} from "./jsonld-to-distribution";

const reducerName = "dataset-detail-distribution";

const initialState = {
  "page": 0,
  "pageSize": 4,
  "distributions": [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MOUNT_DISTRIBUTION:
      return state;
    case UNMOUNT_DISTRIBUTION:
      return onUnMount(state);
    case FETCH_DISTRIBUTION_REQUEST:
      return onDistributionRequest(state, action);
    case FETCH_DISTRIBUTION_SUCCESS:
      return onDistributionRequestSuccess(state, action);
    case FETCH_DISTRIBUTION_FAILED:
      return onDistributionRequestFailed(state, action);
    case SET_DISTRIBUTION_PAGE_INDEX:
      return onSetDistributionPage(state, action);
    case SET_DISTRIBUTION_PAGE_SIZE:
      return onSetDistributionPageSize(state, action);
    case FETCH_DISTRIBUTION_QUALITY_SUCCESS:
      return onQualityRequestSuccess(state, action);
    case FETCH_DISTRIBUTION_QUALITY_FAILED:
      return onQualityRequestFailed(state, action);
    // Reuse logic for distributions, as for now
    // we do not need any distinction.
    case FETCH_DATA_SOURCE_REQUEST:
      return onDistributionRequest(state, action);
    case FETCH_DATA_SOURCE_SUCCESS:
      return onDistributionRequestSuccess(state, action);
    case FETCH_DATA_SOURCE_FAILED:
      return onDistributionRequestFailed(state, action);
    default:
      return state
  }
}

function onUnMount(state) {
  return {
    ...state,
    "page": 0,
    "distributions": [],
  }
}

function onDistributionRequest(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        "status": STATUS_FETCHING,
      },
    },
  };
}

function onDistributionRequestSuccess(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        "status": STATUS_FETCHED,
        "data": action.distribution,
      },
    },
  };
}

function onDistributionRequestFailed(state, action) {
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        "status": action.error.status,
        "data": action.data,
      },
    },
  };
}

function onSetDistributionPage(state, action) {
  return {
    ...state,
    "page": action.page,
  };
}

function onSetDistributionPageSize(state, action) {
  return {
    ...state,
    "page": 0,
    "pageSize": action.size,
  };
}

function onQualityRequestSuccess(state, action) {
  const dist = state.distributions[action.iri];
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        ...dist,
        "data": {
          ...dist.data,
          "quality": loadDistributionQuality(action.data, dist.data),
        },

      },
    },
  }
}

function onQualityRequestFailed(state, action) {
  const dist = state.distributions[action.iri];
  return {
    ...state,
    "distributions": {
      ...state.distributions,
      [action.iri]: {
        ...dist,
        "data": {
          ...dist.data,
          "quality": {
            ...dist.data.quality,
            "ready": true,
          },
        },
      },
    },
  }
}

export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function pageSelector(state) {
  return reducerSelector(state)["page"];
}

export function pageSizeSelector(state) {
  return reducerSelector(state)["pageSize"];
}

export function distributionStatusSelector(state, iri) {
  const distributions = reducerSelector(state)["distributions"];
  if (distributions === undefined) {
    return STATUS_UNKNOWN;
  }
  const dist = distributions[iri];
  if (dist === undefined) {
    return STATUS_UNKNOWN;
  } else {
    return dist["status"];
  }
}

export function distributionDataSelector(state, iri) {
  const distributions = reducerSelector(state)["distributions"];
  if (distributions === undefined) {
    return undefined;
  }
  const dist = distributions[iri];
  if (dist === undefined) {
    return undefined;
  } else {
    return dist["data"];
  }
}
