import {combineReducers} from "redux";
import {connectRouter, routerMiddleware} from "connected-react-router";
import {getRegisteredReducers} from "./register";
import {createStore as createReduxStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";

export function createStore(history) {
  const reducer = prepareReducer(history);
  const enhancer = prepareEnhancer(history);
  const initialState = {};
  return createReduxStore(reducer, initialState, enhancer);
}

function prepareReducer(history) {
  const configuration = {
    "router": connectRouter(history),
  };
  addRegisteredReducers(configuration);
  return combineReducers(configuration);
}

function addRegisteredReducers(configuration) {
  getRegisteredReducers().forEach((entry) => {
    if (entry.reducer === undefined) {
      return;
    }
    if (process.env.NODE_ENV !== "production" && configuration[entry.name]) {
      console.warn("Re-registering reducer for name:", entry.name);
    }
    configuration[entry.name] = entry.reducer;
  });
}

function prepareEnhancer(history) {
  const composeEnhancers = getComposeMethod();
  return composeEnhancers(
    applyMiddleware(routerMiddleware(history), thunk)
  );
}

function getComposeMethod() {
  return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
