import {
  CatalogListActions,
  CatalogListActionsType,
  CatalogListFetchPayloadFailed,
  CatalogListFetchPayloadSuccess,
} from "./catalog-list-action";
import {Catalog} from "./catalog-list-model";
import {Status} from "../app/resource-status";

import {getType} from "typesafe-actions";

export {Status} from "../app/resource-status";

interface State {
  active: boolean;
  status: Status,
  catalogs: Catalog[];
  error?: Error;
}

const initialState: State = {
  "active": false,
  "status": Status.Undefined,
  "catalogs": []
};

function reducer(state = initialState, action: CatalogListActionsType) {
  switch (action.type) {
    case getType(CatalogListActions.mountCatalogList):
      return onCatalogListMount(state);
    case getType(CatalogListActions.unMountCatalogList):
      return onCatalogListUnMount();
    case getType(CatalogListActions.fetchCatalogList.request):
      return onCatalogsListFetch(state);
    case getType(CatalogListActions.fetchCatalogList.success):
      return onCatalogsListFetchSuccess(state, action.payload);
    case getType(CatalogListActions.fetchCatalogList.failure):
      return onCatalogsListFetchFailed(state, action.payload);
    default:
      return state;
  }
}

function onCatalogListMount(state: State): State {
  return {
    ...state,
    "active": true,
  };
}

function onCatalogListUnMount(): State {
  return {...initialState};
}

function onCatalogsListFetch(state: State): State {
  return {
    ...state,
    "active": true,
    "status": Status.Loading,
  };
}

function onCatalogsListFetchSuccess(
  state:State, action:CatalogListFetchPayloadSuccess
): State {
  return {
    ...state,
    "status": Status.Ready,
    "catalogs": action.payload,
  };
}

function onCatalogsListFetchFailed(
  state: State, action: CatalogListFetchPayloadFailed
): State {
  return {
    ...state,
    "active": true,
    "status": Status.Failed,
    "error": action.error,
  };
}

const reducerName = "catalog-list";

export default {
  "name": reducerName,
  "function": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const catalogsListSelector = stateSelector;
