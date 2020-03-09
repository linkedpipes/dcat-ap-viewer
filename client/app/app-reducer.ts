import {
  FETCH_FAILED,
  FETCH_INITIAL_DATA_FAILED,
  FETCH_INITIAL_DATA_SUCCESS,
  FETCH_LANGUAGE_FAILED,
  FETCH_LANGUAGE_SUCCESS,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../api/api-action";
import {register} from "./register";

interface AppState {
  initialDataReady: boolean;
  languageReady: boolean;
  failed: boolean;
  showWaitScreen: boolean;
  activeLoadings: string[];
}

const SHOW_WAIT_SCREEN = "SHOW_WAIT_SCREEN";

export function showWaitScreen() {
  return {
    "type": SHOW_WAIT_SCREEN,
  };
}

const NAME = "app";

const initialState: AppState = {
  "initialDataReady": false,
  "languageReady": false,
  "failed": false,
  "showWaitScreen": false,
  "activeLoadings": []
};

function reducer(state = initialState, action: any) {
  if (action.fetch) {
    state = onFetch(state, action);
  }
  switch (action.type) {
    case SHOW_WAIT_SCREEN:
      return onShowWaitScreen(state);
    case FETCH_LANGUAGE_SUCCESS:
      return onFetchLanguageSuccess(state);
    case FETCH_LANGUAGE_FAILED:
      return onFetchLanguageFailed(state);
    case FETCH_INITIAL_DATA_SUCCESS:
      return onFetchInitialDataSuccess(state);
    case FETCH_INITIAL_DATA_FAILED:
      return onFetchInitialDataFailed(state);
    default:
      return state;
  }
}

function onFetch(state: AppState, action: any): AppState {
  switch (action.fetch) {
    case FETCH_REQUEST:
      return {
        ...state,
        "activeLoadings": [...state.activeLoadings, action.iri]
      };
    case FETCH_SUCCESS:
    case FETCH_FAILED:
      const index = state.activeLoadings.indexOf(action.iri);
      return {
        ...state,
        "activeLoadings": [
          ...state.activeLoadings.slice(0, index),
          ...state.activeLoadings.slice(index + 1),
        ]
      };
    default:
      return state;
  }
}

function onShowWaitScreen(state: AppState): AppState {
  return {
    ...state,
    "showWaitScreen": true
  }
}

function onFetchLanguageSuccess(state: AppState): AppState {
  return {
    ...state,
    "languageReady": true,
  };
}

function onFetchLanguageFailed(state: AppState): AppState {
  if (state.languageReady) {
    // We already have some language, so we ignore other failures.
    return state;
  }
  return {
    ...state,
    "failed": true
  };
}

function onFetchInitialDataSuccess(state: AppState): AppState {
  return {
    ...state,
    "initialDataReady": true,
  };
}

function onFetchInitialDataFailed(state: AppState): AppState {
  return {
    ...state,
    "failed": true
  };
}

const reducerSelector = (state: any): AppState => state[NAME];

export function selectInitialDataReady(state: any) {
  const appState = reducerSelector(state);
  return appState.initialDataReady && appState.languageReady;
}

export function selectInitialDataFailed(state: any) {
  return reducerSelector(state).failed;
}

export function selectShowWaitScreen(state: any) {
  return reducerSelector(state).showWaitScreen;
}

export function selectShowLoadingIndicator(state: any): boolean {
  return reducerSelector(state).activeLoadings.length > 0;
}

(function initialize() {
  register({
    "name": NAME,
    "reducer": reducer,
  })
})();
