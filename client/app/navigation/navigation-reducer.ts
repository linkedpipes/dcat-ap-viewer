import {register} from "../register";
import {parse as parseQueryString} from "query-string";
import {TranslationMap, TranslateFunction} from "./language";
import {Literal} from "../../jsonld";
import {ParsedQuery} from "query-string";
import {FETCH_LANGUAGE_SUCCESS} from "../../api/api-action";
import {SET_LANGUAGE} from "./language-action";
import {ResolvedUrl, resolveUrl} from "./url-parse";
import {
  getDefaultLanguage,
  createTranslateUrlFunction,
  createLiteralFunction,
  createTranslateFunction,
} from "./language";
import {getAllLanguages} from "./navigation-map";

const NAME = "navigation";

interface LanguageState {
  active: string;
  all: string[];
  translation: TranslationMap;
  getter: TranslateFunction;
  getterUrl: TranslateFunction;
  getterLiteral: (literal: Literal | Literal[]) => string;
  url: ResolvedUrl;
}

const initialState: LanguageState = {
  // Once we parse the first location change we are ready, not before.
  "active": getDefaultLanguage(),
  "all": getAllLanguages(),
  "translation": {},
  // At the start there is no translation support.
  "getter": () => "",
  "getterUrl": createTranslateUrlFunction(getDefaultLanguage()),
  "getterLiteral": createLiteralFunction(getDefaultLanguage()),
  "url": {
    "path": "",
    "query": {}
  },
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return onLocationChange(state, action);
    case SET_LANGUAGE:
      return onSetLanguage(state, action);
    case FETCH_LANGUAGE_SUCCESS:
      return onAddTranslation(state, action);
    default:
      return state;
  }
}

/**
 * First call of this function happen before the main component is mounted.
 */
function onLocationChange(state: LanguageState, action: any) {
  const location = action.payload.location;
  const resolvedUrl = resolveUrl(
    location.pathname, parseQueryString(location.search));
  return {
    ...state,
    "url": resolvedUrl,
  }
}

function onSetLanguage(state: LanguageState, action: any): LanguageState {
  return {
    ...state,
    "active": action["language"],
    "getter": createTranslateFunction(
      state.translation, action["language"]),
    "getterUrl": createTranslateUrlFunction(action["language"]),
    "getterLiteral": createLiteralFunction(action["language"]),
  };
}

function onAddTranslation(state: LanguageState, action: any): LanguageState {
  const result = {
    ...state,
    "translation": {
      ...state["translation"],
      [action.language]: action.data
    }
  };
  // If we added active language we also need to change
  // the translation source.
  if (action.language === state.active) {
    result.getter = createTranslateFunction(result.translation, state.active);
    result.getterUrl = createTranslateUrlFunction(state.active);
  }
  return result;
}

(function initialize() {
  register({
    "name": NAME,
    "reducer": reducer,
  })
})();

const reducerSelector = (state: any): LanguageState => state[NAME];

export function selectLanguage(state: any): string {
  return reducerSelector(state).active;
}

export function selectT(state: any): TranslateFunction {
  return reducerSelector(state).getter;
}

export function selectTUrl(state: any) {
  return reducerSelector(state).getterUrl;
}

export function selectTLiteral(state: any) {
  return reducerSelector(state).getterLiteral;
}

export function selectUrl(state: any): ResolvedUrl {
  return reducerSelector(state).url;
}

export function selectQuery(state: any): ParsedQuery {
  return reducerSelector(state).url.query;
}

export function selectIri(state: any): string | undefined {
  const query = selectQuery(state);
  if (query === undefined) {
    return undefined;
  }
  return String(query.iri);
}
