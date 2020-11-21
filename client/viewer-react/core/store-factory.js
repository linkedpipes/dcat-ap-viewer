import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {createStore as createReduxStore, compose, applyMiddleware} from "redux";

import {getReducers} from "./register";

export function createStore() {
  const reducer = prepareReducer();
  const enhancer = prepareEnhancer();
  const initialState = {};
  return createReduxStore(reducer, initialState, enhancer);
}

function prepareReducer() {
  const configuration = {};
  addRegisteredReducers(configuration);
  console.log("Store\n", configuration);
  return combineReducers(configuration);
}

function addRegisteredReducers(configuration) {
  getReducers().forEach((entry) => {
    if (process.env.NODE_ENV !== "production" && configuration[entry.name]) {
      console.warn("Re-registering reducer for name:", entry.name);
    }
    configuration[entry.name] = entry.reducer;
  });
}

function prepareEnhancer() {
  const composeEnhancers = getComposeMethod();
  return composeEnhancers(
    applyMiddleware(thunk)
  );
}

function getComposeMethod() {
  return (
    typeof window !== "undefined"
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) || compose;
}
