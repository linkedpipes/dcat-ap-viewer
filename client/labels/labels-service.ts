import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {LabelActions} from "./labels-action";
import {shouldFetch} from "./labels-reducer";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchLabels(iris: string[]): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    for (const iri of iris) {
      // We can not fetch information about blank nodes.
      if (iri === undefined || iri === null || isBlankNode(iri)) {
        continue;
      }
      if (!shouldFetch(state, iri, language)) {
        return;
      }
      await fetchLabel(dispatch, language, iri);
    }
  };
}

function isBlankNode(iri: string) {
  return iri.startsWith("_:");
}

async function fetchLabel(
  dispatch: ThunkDispatch<any, any, AnyAction>, language: string, iri: string
) {
  dispatch(LabelActions.fetchLabel.request({"iri": iri}));
  try {
    const jsonld = await getApiInstance().fetchLabel(language, iri);
    dispatch(LabelActions.fetchLabel.success({
      "iri": iri,
      "jsonld": jsonld,
    }));
  } catch (error) {
    dispatch(LabelActions.fetchLabel.failure({"iri": iri}));
  }
}

export function fetchDatasetLabel(iri: string): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (!shouldFetch(state, iri, language)) {
      return;
    }
    const jsonld = await getApiInstance().fetchDataset(language, iri);
    dispatch(LabelActions.fetchLabel.success({
      "iri": iri,
      "jsonld": jsonld
    }));
  };
}
