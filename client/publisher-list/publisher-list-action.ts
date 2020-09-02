import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Publisher} from "./publisher-list-model";
import {JsonLdEntity} from "../jsonld";

export interface PublisherListFetchPayloadSuccess {
  payload: Publisher[];
  jsonld: JsonLdEntity[];
}

export interface PublisherListFetchPayloadFailed {
  error: Error;
}

export const PublisherListActions = {
  "fetchPublisherList": createAsyncAction(
    "app.publisherList.request",
    "app.publisherList.success",
    "app.publisherList.failure",
  )<null,
    PublisherListFetchPayloadSuccess,
    PublisherListFetchPayloadFailed>(),
  "mountPublisherList": createAction("app.publisherList.mount")(),
  "unMountPublisherList": createAction("app.publisherList.unMount")(),
};

export type PublisherListActionsType = ActionType<typeof PublisherListActions>;
