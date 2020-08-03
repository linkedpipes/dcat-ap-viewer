//
// As of now we support only one label per language.
//

import {SKOS, DCTERMS, RDF, VCARD, FOAF, RDFS} from "../vocabulary/vocabulary";
import {iterateEntities, getStrings, getId, Literal} from "../jsonld";
import {getDefaultLanguage, SET_LANGUAGE} from "../app/navigation";
import {FETCH_LABEL} from "../api/api-action";

type TranslationMap = { [iri: string]: Literal };

export type LabelFunction =
  (value: string, defaultValue?: string | null) => string | undefined | null;

interface LabelsState {
  language: string;
  requested: string[];
  labels: TranslationMap;
  getter: LabelFunction;
}

const initialState: LabelsState = {
  "language": getDefaultLanguage(),
  "requested": [],
  "labels": {},
  "getter": () => ""
};

const NAME = "labels";

function reducer(state = initialState, action: any): LabelsState {
  if (action["jsonld"]) {
    state = onJsonLdData(state, action["jsonld"]);
  }
  // For typesafe-actions
  if (action["payload"] && action["payload"]["jsonld"]) {
    state = onJsonLdData(state, action["payload"]["jsonld"]);
  }
  switch (action["type"]) {
    case SET_LANGUAGE:
      return onSetLanguage(state, action);
    case FETCH_LABEL:
      return onFetchLabel(state, action);
    default:
      return state;
  }
}

export default {
  "name": NAME,
  "reducer": reducer,
};

function onJsonLdData(state: LabelsState, jsonld: any): LabelsState {
  const labels = {...state["labels"]};
  iterateEntities(jsonld, (entity) => {
    // We merge all labels, so basically we randomly pick one of
    // the available.
    const extractedLabels: Literal[] = [
      ...getStrings(entity, SKOS.prefLabel),
      ...getStrings(entity, DCTERMS.title),
      ...getStrings(entity, RDF.label),
      ...getStrings(entity, VCARD.fn),
      ...getStrings(entity, FOAF.name),
      ...getStrings(entity, RDFS.label),
    ];
    if (Object.keys(extractedLabels).length > 0) {
      const iri = getId(entity);
      labels[iri] = {
        ...labels[iri],
        ...mergeLiterals(extractedLabels),
      };
    }
  });
  return {
    ...state,
    "labels": labels,
    "getter": createLabelFunction(labels, state.language),
  };
}

function mergeLiterals(literals: Literal[]): Literal {
  let result: Literal = {};
  literals.forEach(literal => {
    result = {
      ...literal,
      ...result,
    }
  });
  return result;
}

function createLabelFunction(
  labels: TranslationMap, language: string): LabelFunction {
  //
  return (iri, defaultValue) => {
    if (defaultValue === undefined) {
      defaultValue = iri;
    }
    if (!labels[iri]) {
      reportMissingLabel(iri, "any");
      return defaultValue;
    }
    const label = selectLabelString(labels[iri], language);
    if (label) {
      return label;
    } else {
      return defaultValue;
    }
  }
}

/**
 * Select label for given language or any other language available.
 */
function selectLabelString(
  value: Literal, language: string): string | undefined {
  //
  if (value[language]) {
    return value[language];
  }
  for (let entry of Object.entries(value)) {
    const [labelLanguage, label] = entry;
    return label;
  }
  return undefined;
}

const DEVELOP_REPORTED: Set<string> = new Set();

function reportMissingLabel(iri: string, language: string) {
  if (process.env.NODE_ENV !== "production") {
    if (!DEVELOP_REPORTED.has(iri)) {
      DEVELOP_REPORTED.add(iri);
      console.log(
        "Missing label for  " + JSON.stringify(iri) + " for " + language);
    }
  }
}

function onSetLanguage(state: LabelsState, action: any): LabelsState {
  return {
    ...state,
    "language": action["language"],
    "getter": createLabelFunction(state.labels, action["language"]),
  };
}

function onFetchLabel(state: LabelsState, action: any): LabelsState {
  return {
    ...state,
    "requested": [...state.requested, action.iri]
  }
}

const reducerSelector = (state: any): LabelsState => state[NAME];

export function selectTLabel(state: any): LabelFunction {
  return reducerSelector(state).getter;
}

export function shouldFetch(state: any, iri: string, language: string): boolean {
  const labelsState = reducerSelector(state);
  // We require the label in given language.
  const labelIsAvailable =
    labelsState.labels[iri] && labelsState.labels[iri][language];
  return !labelIsAvailable && !labelsState.requested.includes(iri);
}
