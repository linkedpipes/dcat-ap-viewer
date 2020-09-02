import {
  PublisherListActions,
  PublisherListActionsType,
  PublisherListFetchPayloadFailed,
  PublisherListFetchPayloadSuccess,
} from "./publisher-list-action";
import {Publisher} from "./publisher-list-model";
import {Status} from "../app/resource-status";

import {getType} from "typesafe-actions";

export {Status} from "../app/resource-status";

interface State {
  active: boolean;
  status: Status,
  publishers: Publisher[];
  error?: Error;
}

const initialState: State = {
  "active": false,
  "status": Status.Undefined,
  "publishers": []
};

function reducer(state = initialState, action: PublisherListActionsType) {
  switch (action.type) {
    case getType(PublisherListActions.mountPublisherList):
      return onPublisherListMount(state);
    case getType(PublisherListActions.unMountPublisherList):
      return onPublisherListUnMount();
    case getType(PublisherListActions.fetchPublisherList.request):
      return onPublishersListFetch(state);
    case getType(PublisherListActions.fetchPublisherList.success):
      return onPublishersListFetchSuccess(state, action.payload);
    case getType(PublisherListActions.fetchPublisherList.failure):
      return onPublishersListFetchFailed(state, action.payload);
    default:
      return state;
  }
}

function onPublisherListMount(state: State): State {
  return {
    ...state,
    "active": true,
  };
}

function onPublisherListUnMount(): State {
  return {...initialState};
}

function onPublishersListFetch(state: State): State {
  return {
    ...state,
    "active": true,
    "status": Status.Loading,
  };
}

function onPublishersListFetchSuccess(
  state:State, action:PublisherListFetchPayloadSuccess
): State {
  return {
    ...state,
    "status": Status.Ready,
    "publishers": action.payload,
  };
}

function onPublishersListFetchFailed(
  state: State, action: PublisherListFetchPayloadFailed
): State {
  return {
    ...state,
    "active": true,
    "status": Status.Failed,
    "error": action.error,
  };
}

const reducerName = "publisher-list";

export default {
  "name": reducerName,
  "function": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const publishersListSelector = stateSelector;
