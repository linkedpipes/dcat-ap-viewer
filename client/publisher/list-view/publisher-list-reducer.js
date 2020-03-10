import {
  FETCH_PUBLISHER_LIST_SUCCESS,
  FETCH_PUBLISHER_LIST_FAILED,
} from "./../../api/api-action";
import {
  PUBLISHER_LIST_MOUNT,
  PUBLISHER_LIST_UNMOUNT,
} from "./publisher-list-action";
import {jsonLdToPublisherList} from "./jsonld-to-publisher-list";

const NAME = "publisher-list";

const initialState = {
  "ready": false,
  "error": 0,
  "publishers": [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PUBLISHER_LIST_MOUNT:
      return onPublisherListMount();
    case PUBLISHER_LIST_UNMOUNT:
      return onPublisherListUnMount();
    case FETCH_PUBLISHER_LIST_SUCCESS:
      return onPublisherListRequestSuccess(state, action);
    case FETCH_PUBLISHER_LIST_FAILED:
      return onPublisherListRequestFailed(state, action);
    default:
      return state;
  }
}

function onPublisherListMount() {
  return initialState;
}

function onPublisherListUnMount() {
  return initialState;
}

function onPublisherListRequestSuccess(state, action) {
  return {
    ...state,
    "ready": true,
    "error": 0,
    "publishers": jsonLdToPublisherList(action.jsonld),
  };
}

function onPublisherListRequestFailed(state, action) {
  return {
    ...state,
    "error": action.error.code,
  };
}

export default {
  "name": NAME,
  "function": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectReady(state) {
  return reducerSelector(state).ready;
}

export function selectError(state) {
  return reducerSelector(state).error;
}

export function selectPublishers(state) {
  return reducerSelector(state).publishers;
}
