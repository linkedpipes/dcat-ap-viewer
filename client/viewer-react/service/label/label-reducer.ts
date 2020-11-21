import {getType} from "typesafe-actions";

import {LabelActions, LabelFetchPayload} from "./label-action";
import {Literal} from "../../../data-model/primitives";
import {Label} from "../../../data-api/api-label";
import {register} from "../../core/register";

interface ActionWithLabels {
  labels: Label[];
}

type TranslationMap = { [iri: string]: Literal };

class State {
  requested: string[] = [];
  labels: TranslationMap = {};
}

function reducer(state = new State(), action: any): State {

  switch (action["type"]) {
    case getType(LabelActions.fetchLabel.request):
      return onFetchLabel(state, action.payload);
    default:
      if (isActionWithLabels(action.payload)) {
        return onActionWithLabels(state, action.payload);
      } else {
        return state;
      }
  }
}

function isActionWithLabels(payload: any): payload is ActionWithLabels {
  return payload !== undefined && payload.labels !== undefined;
}

function onActionWithLabels(state: State, payload: ActionWithLabels) {
  const labels = {...state.labels};
  for (const label of payload.labels) {
    if (labels[label.iri]) {
      labels[label.iri] = {
        ...labels[label.iri],
        ...label.value,
      };
    } else {
      labels[label.iri] = label.value;
    }
  }
  return {
    ...state,
    "labels": labels,
  };
}

function onFetchLabel(state: State, action: LabelFetchPayload): State {
  const code = getLabelCode(action.language, action.iri);
  return {
    ...state,
    "requested": [...state.requested, code]
  }
}

function getLabelCode(language: string, iri: string) {
  return language + ":" + iri;
}

const reducerName = "label.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const reducerSelector = (state: any): State => state[reducerName];

export const labelsSelector = (state: any) => reducerSelector(state).labels;

export function shouldFetchSelector(state: any, iri: string, language: string) {
  const literal = reducerSelector(state).labels[iri];
  if (literal && literal[language]) {
    // We already have the label.
    return false;
  }
  const code = getLabelCode(language, iri);
  return !reducerSelector(state).requested.includes(code);
}
