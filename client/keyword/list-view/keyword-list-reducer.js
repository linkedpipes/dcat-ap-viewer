import {
  MOUNT_KEYWORDS_LIST,
  UNMOUNT_KEYWORDS_LIST,
} from "./keyword-tagloud-action";
import {
  FETCH_KEYWORD_LIST_SUCCESS,
  FETCH_KEYWORD_LIST_FAILED,
} from "../../api/api-action";
import {jsonLdToKeywordList} from "./jsonld-to-keyword-list";

const NAME = "keyword-list";

const initialState = {
  "mounted": false,
  "ready": false,
  "failed": false,
  "keywords": [],
};

function reducer(state = {}, action) {
  switch (action.type) {
    case MOUNT_KEYWORDS_LIST:
      return onMount(state);
    case UNMOUNT_KEYWORDS_LIST:
      return onUnMount();
    case FETCH_KEYWORD_LIST_SUCCESS:
      return onKeywordsRequestSuccess(state, action);
    case FETCH_KEYWORD_LIST_FAILED:
      return onKeywordsRequestFailed(state, action);
    default:
      return state
  }
}

function onMount(state) {
  return {
    ...state,
    "mounted": true,
  }
}

function onUnMount() {
  return initialState;
}

function onKeywordsRequestSuccess(state, action) {
  return {
    ...state,
    "ready": true,
    "keywords": jsonLdToKeywordList(action.jsonld),
  };
}

function onKeywordsRequestFailed(state, action) {
  return {
    ...state,
    "failed": true,
  };
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectReady(state) {
  return reducerSelector(state).ready;
}

export function selectFailed(state) {
  return reducerSelector(state).failed;
}

export function selectKeywords(state) {
  return reducerSelector(state).keywords;
}
