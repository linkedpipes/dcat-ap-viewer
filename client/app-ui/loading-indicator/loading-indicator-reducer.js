import {SET_APPLICATION_LOADER_PROPERTY} from "./loading-indicator-action";

const initialState = {
  "active": 0,
};

const reducerName = "loading-indicator";

function reducer(state = initialState, action) {
  if (action[SET_APPLICATION_LOADER_PROPERTY] === undefined) {
    return state;
  }
  if (action[SET_APPLICATION_LOADER_PROPERTY]) {
    return {
      "active": state.active + 1,
    };
  } else {
    return {
      "active": state.active - 1,
    };
  }
}

export default {
  "name": reducerName,
  "reducer": reducer,
};

const reducerSelector = (state) => state[reducerName];

export function isLoaderActiveSelector(state) {
  return reducerSelector(state)["active"] > 0;
}