import {
  FETCH_PUBLISHERS_REQUEST,
  FETCH_PUBLISHERS_SUCCESS,
  FETCH_PUBLISHERS_FAILED,
  FETCH_PUBLISHERS_QUALITY_SUCCESS,
} from "./publisher-action";
import {
  STATUS_INITIAL,
  STATUS_FETCHING,
  STATUS_FETCHED,
} from "@/app-services/http-request";

const reducerName = "publishers";

const initialState = {
  "status": STATUS_INITIAL,
  // Sorted list of publishers.
  "publishers": [],
  // Map from a identified to a publisher object.
  "publishers-map": {},
  "allFetched": false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PUBLISHERS_REQUEST:
      return onRequest(state);
    case FETCH_PUBLISHERS_SUCCESS:
      return onRequestSuccess(state, action);
    case FETCH_PUBLISHERS_FAILED:
      return onRequestFailed(state, action);
    case FETCH_PUBLISHERS_QUALITY_SUCCESS:
      return onQualityRequestSuccess(state, action);
    default:
      break;
  }
  if (action.$publishers) {
    return {
      ...state,
      ...addPublishers(state, action.$publishers),
    }
  }
  return state;
}

function onRequest(state) {
  return {
    ...state,
    "status": STATUS_FETCHING,
  };
}

function onRequestSuccess(state, action) {
  return {
    ...state,
    "status": STATUS_FETCHED,
    "allFetched": true,
    ...addPublishers(state, action.publishers),
  };
}

function addPublishers(state, publishersToAdd) {
  const publishersMap = {...state.publishersMap};
  publishersToAdd.forEach((publisher) => {
    const id = publisher["@id"];
    if (publishersMap[id] === undefined) {
      publishersMap[id] = publisher;
    } else {
      publishersMap[id] = {
        ...publishersMap[id],
        ...publisher,
      }
    }
  });
  //
  const publishers = Object.values(publishersMap);
  publishers.sort((left, right) => right.count - left.count);
  return {
    "publishers": publishers,
    "publishersMap": publishersMap,
  };
}

function onRequestFailed(state, action) {
  return {
    ...state,
    "status": action.error.status,
    "publishers": [],
  };
}

function onQualityRequestSuccess(state, action) {
  const exceptionalPublisher = action.publishers;
  const publishers = state.publishers.map((publisher) => {
    const name = publisher["@id"];
    if (exceptionalPublisher.indexOf(name) === -1) {
      return publisher;
    } else {
      return {
        ...publisher,
        "exceptional": true,
      };
    }
  });
  return {
    ...state,
    "publishers": publishers,
  };
}

export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function statusSelector(state) {
  return reducerSelector(state).status;
}

export function publishersSelector(state) {
  return reducerSelector(state).publishers;
}
