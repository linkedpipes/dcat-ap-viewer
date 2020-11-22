import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Catalog} from "../../data-model/catalog";
import {Label} from "../../data-api/api-label";

export interface CatalogListFetchPayloadRequest {

  loadingIndicator: number;

}

export interface CatalogListFetchPayloadSuccess {

  loadingIndicator: number;

  catalogs: Catalog[];

  labels: Label[];

}

export interface CatalogListFetchPayloadFailed {

  loadingIndicator: number;

  error: Error;

}

export const CatalogListActions = {
  "mountCatalogList": createAction("app.catalogList.mount")(),
  "unMountCatalogList": createAction("app.catalogList.unMount")(),
  "fetchCatalogList": createAsyncAction(
    "app.catalogList.request",
    "app.catalogList.success",
    "app.catalogList.failure",
  )<CatalogListFetchPayloadRequest,
    CatalogListFetchPayloadSuccess,
    CatalogListFetchPayloadFailed>(),
};

export type CatalogListActionsType = ActionType<typeof CatalogListActions>;
