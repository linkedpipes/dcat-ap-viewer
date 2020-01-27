import {
  MOUNT,
  UNMOUNT,
  FETCH_TERMS,
  FETCH_TERMS_SUCCESS,
  FETCH_TERMS_FAILED,
} from "./semantic-terms-actions";
import {
  STATUS_INITIAL,
  STATUS_FETCHING,
  STATUS_FETCHED,
} from "app-services/http-request";

const initialState = {};

const reducerName = "semantic-terms";

function reducer(state = initialState, action) {
  switch (action.type) {
    case MOUNT:
      return onMount();
    case UNMOUNT:
      return onUnMount();
    case FETCH_TERMS:
      return onRequest(state);
    case FETCH_TERMS_SUCCESS:
      return onRequestSuccess(state, action);
    case FETCH_TERMS_FAILED:
      return onRequestFailed(state, action);
  }
  return state;
}

function onMount() {
  return {
    "status": STATUS_INITIAL,
    "terms": [],
  }
}

function onUnMount() {
  return {};
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
    "terms": action.terms,
  };
}

function onRequestFailed(state, action) {
  return {
    ...state,
    "status": action.error.status,
    "terms": undefined,
  };
}


export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function statusSelector(state) {
  return reducerSelector(state)["status"];
}

export function termsSelector(state) {
  return reducerSelector(state)["terms"];
}

