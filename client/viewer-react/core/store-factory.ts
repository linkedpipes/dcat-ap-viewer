// import {combineReducers} from "redux";
// import thunk from "redux-thunk";
// import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit";
import {configureStore, Reducer} from "@reduxjs/toolkit";

import {getReducers} from "./register";

function createStore() {
  // const reducers = {};
  // addRegisteredReducers(reducers);
  // const reducer = prepareReducer();
  // const enhancers = prepareEnhancers();
  return configureStore({
    "reducer": collectRegisteredReducers(),
    // "enhancers": enhancers,
  });
}

// function prepareReducer() {
//   const configuration = {};
//   addRegisteredReducers(configuration);
//   return combineReducers(configuration);
// }

function collectRegisteredReducers(): Record<string, Reducer> {
  const result: Record<string, Reducer> = {};
  getReducers().forEach((entry) => {
    if (process.env.NODE_ENV !== "production" && result[entry.name]) {
      console.warn("Re-registering reducer for name:", entry.name);
    }
    result[entry.name] = entry.reducer;
  });
  return result;
}

// function prepareEnhancers() {
//   const composeEnhancers = getComposeMethod();
//   return composeEnhancers(
//     applyMiddleware(thunk),
//   );
// }
//
// function getComposeMethod() {
//   return (
//     typeof window !== "undefined"
//     && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//   ) || compose;
// }

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
