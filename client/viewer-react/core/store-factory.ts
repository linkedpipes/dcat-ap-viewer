import {configureStore, Reducer} from "@reduxjs/toolkit";

import {getReducers} from "./register";

function createStore() {
  return configureStore({
    "reducer": collectRegisteredReducers(),
    // "enhancers": enhancers,
    "middleware": getDefaultMiddleware => getDefaultMiddleware({
      // To remove this we must not use class for state.
      "serializableCheck": false,
    }),
  });
}

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

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
