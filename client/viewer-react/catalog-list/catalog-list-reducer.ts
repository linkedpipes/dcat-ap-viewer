import {getType} from "typesafe-actions";

import {
  CatalogListActions,
  CatalogListActionsType,
  CatalogListFetchPayloadFailed,
  CatalogListFetchPayloadSuccess,
} from "./catalog-list-action";
import {Catalog} from "../../data-model/catalog";
import {ResourceStatus, updateStatusLoading} from "../resource-status";
import {register} from "../core/register";

class State {
  mounted: boolean = false;
  status: ResourceStatus = ResourceStatus.Undefined;
  catalogs: Catalog[] = [];
  error: Error | undefined;
}

function reducer(state = new State(), action: CatalogListActionsType) {
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
    "mounted": true,
  };
}

function onCatalogListUnMount(): State {
  return new State();
}

function onCatalogsListFetch(state: State): State {
  return {
    ...state,
    "status": updateStatusLoading(state.status),
  };
}

function onCatalogsListFetchSuccess(
  state: State, action: CatalogListFetchPayloadSuccess
): State {
  return {
    ...state,
    "status": ResourceStatus.Ready,
    "catalogs": action.catalogs,
  };
}

function onCatalogsListFetchFailed(
  state: State, action: CatalogListFetchPayloadFailed
): State {
  return {
    ...state,
    "status": ResourceStatus.Failed,
    "error": action.error,
  };
}

const reducerName = "catalog-list.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const catalogsListSelector = stateSelector;
