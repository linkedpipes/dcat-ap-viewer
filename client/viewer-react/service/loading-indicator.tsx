import React from "react";
import {useSelector} from "react-redux";

import {register, getElement} from "../core/register";

export function LoadingIndicator() {
  const LoadingIndicatorElement =
    getElement("loading-indicator.element").element as any;

  const show = useSelector(isLoadingSelector);
  if (show) {
    return (<LoadingIndicatorElement/>);
  } else {
    return null;
  }
}

interface State {
  loading: number;
}

const initialState: State = {
  "loading": 0,
};

function reducer(state = initialState, action: any): State {
  const loadingIndicatorChange = action.payload?.loadingIndicator;
  if (loadingIndicatorChange === undefined) {
    return state;
  }
  return {
    "loading": state.loading + loadingIndicatorChange,
  };
}

const reducerName = "loading-indicator.reducer";

const stateSelector = (state: any): State => state[reducerName];

const isLoadingSelector =
  (state: any): boolean => stateSelector(state).loading > 0;

register({
  "name": reducerName,
  "reducer": reducer as any
});
