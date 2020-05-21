import {
  FETCH_CATALOG_LIST_SUCCESS,
  FETCH_CATALOG_LIST_FAILED,
} from "./../../api/api-action";
import {
  CATALOG_LIST_MOUNT,
  CATALOG_LIST_UNMOUNT,
} from "./catalog-list-actions";
import {jsonLdToCatalogList} from "./jsonld-to-catalog-list";

const NAME = "catalog-list";

const initialState = {
  "ready": false,
  "error": 0,
  "catalogs": [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case CATALOG_LIST_MOUNT:
    return onCatalogListMount(state);
  case CATALOG_LIST_UNMOUNT:
    return onCatalogListUnMount();
  case FETCH_CATALOG_LIST_SUCCESS:
    return onCatalogListRequestSuccess(state, action);
  case FETCH_CATALOG_LIST_FAILED:
    return onCatalogListRequestFailed(state, action);
  default:
    return state;
  }
}

function onCatalogListMount() {
  return initialState;
}

function onCatalogListUnMount() {
  return {};
}

function onCatalogListRequestSuccess(state, action) {
  return {
    ...state,
    "ready": true,
    "error": 0,
    "catalogs": jsonLdToCatalogList(action.jsonld),
  };
}

function onCatalogListRequestFailed(state, action) {
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

export function selectCatalogs(state) {
  return reducerSelector(state).catalogs;
}
