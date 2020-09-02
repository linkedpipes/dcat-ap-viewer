import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Catalog} from "./catalog-list-model";
import {JsonLdEntity} from "../jsonld";

export interface CatalogListFetchPayloadSuccess {
  payload: Catalog[];
  jsonld: JsonLdEntity[];
}

export interface CatalogListFetchPayloadFailed {
  error: Error;
}

export const CatalogListActions = {
  "fetchCatalogList": createAsyncAction(
    "app.catalogList.request",
    "app.catalogList.success",
    "app.catalogList.failure",
  )<null,
    CatalogListFetchPayloadSuccess,
    CatalogListFetchPayloadFailed>(),
  "mountCatalogList": createAction("app.catalogList.mount")(),
  "unMountCatalogList": createAction("app.catalogList.unMount")(),
};

export type CatalogListActionsType = ActionType<typeof CatalogListActions>;
