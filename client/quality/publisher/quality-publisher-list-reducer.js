import {
  FETCH_QUALITY_PUBLISHER_LIST_SUCCESS,
} from "../../api/api-action";
import {
  PUBLISHER_LIST_MOUNT,
  PUBLISHER_LIST_UNMOUNT,
} from "../../publisher/list-view/publisher-list-action";
import {jsonLdToPublisherList} from "./jsonld-to-quality-publisher-list";

const initialState = {
  "mounted": false,
  "ready": false,
  "exceptionalPublishers": [],
};

const NAME = "quality-publisher-list";

function reducer(state = initialState, action) {
  switch (action["type"]) {
  case FETCH_QUALITY_PUBLISHER_LIST_SUCCESS:
    return onPublisherQualityFetchSuccess(state, action);
  case PUBLISHER_LIST_MOUNT:
    return onPublisherListMount(state);
  case PUBLISHER_LIST_UNMOUNT:
    return onPublisherListUnMount(state);
  default:
    return state;
  }
}

function onPublisherQualityFetchSuccess(state, action){
  return {
    ...state,
    "ready": true,
    "exceptionalPublishers": jsonLdToPublisherList(action.jsonld),
  };
}

function onPublisherListMount(state) {
  return {
    ...state,
    "mounted": true,
  };
}

function onPublisherListUnMount() {
  return initialState;
}

export default {
  "name": NAME,
  "reducer": reducer,
};

const reducerSelector = (state) => state[NAME];

export function selectExceptionalPublishers(state) {
  return reducerSelector(state).exceptionalPublishers;
}
