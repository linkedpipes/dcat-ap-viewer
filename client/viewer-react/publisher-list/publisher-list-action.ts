import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Publisher} from "../../data-model/publisher";
import {Label} from "../../data-api/api-label";

export interface PublisherListFetchPayloadRequest {

  loadingIndicator: number;

}

export interface PublisherListFetchPayloadSuccess {

  loadingIndicator: number;

  publishers: Publisher[];

  labels: Label[];

}

export interface PublisherListFetchPayloadFailed {

  loadingIndicator: number;

  error: Error;

}

export const PublisherListActions = {
  "mountPublisherList": createAction("app.publisherList.mount")(),
  "unMountPublisherList": createAction("app.publisherList.unMount")(),
  "fetchPublisherList": createAsyncAction(
    "app.publisherList.request",
    "app.publisherList.success",
    "app.publisherList.failure",
  )<PublisherListFetchPayloadRequest,
    PublisherListFetchPayloadSuccess,
    PublisherListFetchPayloadFailed>(),
};

export type PublisherListActionsType = ActionType<typeof PublisherListActions>;
