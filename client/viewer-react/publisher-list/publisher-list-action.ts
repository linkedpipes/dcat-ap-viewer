import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Publisher} from "../../data-model/publisher";
import {Label} from "../../data-api/api-label";

export interface PublisherListFetchPayloadSuccess {

  publishers: Publisher[];

  labels: Label[];

}

export interface PublisherListFetchPayloadFailed {

  error: Error;

}

export const PublisherListActions = {
  "mountPublisherList": createAction("app.publisherList.mount")(),
  "unMountPublisherList": createAction("app.publisherList.unMount")(),
  "fetchPublisherList": createAsyncAction(
    "app.publisherList.request",
    "app.publisherList.success",
    "app.publisherList.failure",
  )<null,
    PublisherListFetchPayloadSuccess,
    PublisherListFetchPayloadFailed>(),
};

export type PublisherListActionsType = ActionType<typeof PublisherListActions>;
