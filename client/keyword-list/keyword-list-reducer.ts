import {
  KeywordListActions,
  KeywordListActionsType,
  KeywordListFetchPayloadSuccess,
  KeywordListFetchPayloadFailed,
} from "./keyword-list-action";
import {Keyword} from "./keyword-list-model";
import {Status} from "../app/resource-status";

import {getType} from "typesafe-actions";

export {Status} from "../app/resource-status";

interface State {
  active: boolean;
  status: Status,
  keywords: Keyword[];
  error?: Error;
}

const initialState: State = {
  "active": false,
  "status": Status.Undefined,
  "keywords": []
};

function reducer(state = initialState, action: KeywordListActionsType) {
  switch (action.type) {
    case getType(KeywordListActions.mountKeywordList):
      return onKeywordListMount(state);
    case getType(KeywordListActions.unMountKeywordList):
      return onKeywordListUnMount();
    case getType(KeywordListActions.fetchKeywordList.request):
      return onKeywordsListFetch(state);
    case getType(KeywordListActions.fetchKeywordList.success):
      return onKeywordsListFetchSuccess(state, action.payload);
    case getType(KeywordListActions.fetchKeywordList.failure):
      return onKeywordsListFetchFailed(state, action.payload);
    default:
      return state;
  }
}

function onKeywordListMount(state: State): State {
  return {
    ...state,
    "active": true,
  };
}

function onKeywordListUnMount(): State {
  return {...initialState};
}

function onKeywordsListFetch(state: State): State {
  return {
    ...state,
    "active": true,
    "status": Status.Loading,
  };
}

function onKeywordsListFetchSuccess(
  state:State, action:KeywordListFetchPayloadSuccess
): State {
  return {
    ...state,
    "status": Status.Ready,
    "keywords": action.payload,
  };
}

function onKeywordsListFetchFailed(
  state: State, action: KeywordListFetchPayloadFailed
): State {
  return {
    ...state,
    "active": true,
    "status": Status.Failed,
    "error": action.error,
  };
}

const reducerName = "keyword-list";

export default {
  "name": reducerName,
  "function": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const keywordListSelector = stateSelector;
