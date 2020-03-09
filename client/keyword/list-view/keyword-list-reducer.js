import {
  MOUNT_KEYWORDS_LIST,
  UNMOUNT_KEYWORDS_LIST,
} from "./keyword-list-action";
import {
  FETCH_KEYWORD_LIST_SUCCESS,
  FETCH_KEYWORD_LIST_FAILED,
} from "../../api/api-action";
import {jsonLdToKeywordList} from "./jsonld-to-keyword-list";
import {randomColor} from "randomcolor";

const NAME = "keyword-list";

const initialState = {
  "mounted": false,
  "ready": false,
  "error": 0,
  "keywords": [],
};

function reducer(state = initialState, action) {
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
  const keywords = jsonLdToKeywordList(action.jsonld);
  keywords.sort((left, right) =>
    right.usedByPublisherCount - left.usedByPublisherCount);
  addColors(keywords);
  return {
    ...state,
    "ready": true,
    "error": 0,
    "keywords": keywords,
  };
}

function addColors(values) {
  const colors = randomColor({
    "luminosity": "dark",
    "hue": "random",
    "seed": 13,
    "count": values.length,
  });
  for (let index = 0; index < values.length; ++index) {
    values[index]["color"] = colors[index];
  }
}

function onKeywordsRequestFailed(state, action) {
  return {
    ...state,
    "error": action.error.code,
  };
}

export default {
  "name": NAME,
  "function": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectReady(state) {
  return reducerSelector(state).ready;
}

export function selectError(state) {
  return reducerSelector(state).error;
}

export function selectKeywords(state) {
  return reducerSelector(state).keywords;
}
