import {getType} from "typesafe-actions";

import {
  PublisherListActions,
  PublisherListActionsType,
  PublisherListFetchPayloadFailed,
  PublisherListFetchPayloadSuccess,
} from "./publisher-list-action";
import {Publisher} from "../../data-model/publisher";
import {ResourceStatus, updateStatusLoading} from "../resource-status";
import {register} from "../core/register";


class State {
  mounted: boolean = false;
  status: ResourceStatus = ResourceStatus.Undefined;
  publishers: Publisher[] = [];
  error: Error | undefined = undefined;
}

function reducer(state = new State(), action: PublisherListActionsType) {
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
    "mounted": true,
  };
}

function onPublisherListUnMount(): State {
  return new State();
}

function onPublishersListFetch(state: State): State {
  return {
    ...state,
    "status": updateStatusLoading(state.status),
  };
}

function onPublishersListFetchSuccess(
  state: State, action: PublisherListFetchPayloadSuccess
): State {
  return {
    ...state,
    "status": ResourceStatus.Ready,
    "publishers": action.publishers,
  };
}

function onPublishersListFetchFailed(
  state: State, action: PublisherListFetchPayloadFailed
): State {
  return {
    ...state,
    "status": ResourceStatus.Failed,
    "error": action.error,
  };
}

const reducerName = "publisher-list.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const publishersListSelector = stateSelector;
