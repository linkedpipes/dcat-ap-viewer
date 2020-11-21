import {getType} from "typesafe-actions";
import randomColor from "randomcolor";

import {
  KeywordListActions,
  KeywordListActionsType,
  KeywordListFetchPayloadFailed,
  KeywordListFetchPayloadSuccess,
} from "./keyword-list-action";
import {Keyword} from "../../data-model/keyword";
import {ColoredKeyword} from "./keyword-list-model";
import {ResourceStatus, updateStatusLoading} from "../resource-status";
import {register} from "../core/register";

class State {
  mounted: boolean = false;
  status: ResourceStatus = ResourceStatus.Undefined;
  keywords: ColoredKeyword[] = [];
  error: Error | undefined = undefined;
}

function reducer(state = new State(), action: KeywordListActionsType) {
  switch (action.type) {
    case getType(KeywordListActions.mountKeywordList):
      return onKeywordListMount(state);
    case getType(KeywordListActions.unMountKeywordList):
      return onKeywordListUnMount();
    case getType(KeywordListActions.fetchKeywordList.request):
      return onKeywordsListFetch(state);
    case getType(KeywordListActions.fetchKeywordList.success):
      return onKeywordsListFetchSuccess(state, action.payload);
    case getType(KeywordListActions.fetchKeywordList.failure):
      return onKeywordsListFetchFailed(state, action.payload);
    default:
      return state;
  }
}

function onKeywordListMount(state: State): State {
  return {
    ...state,
    "mounted": true,
  };
}

function onKeywordListUnMount(): State {
  return new State();
}

function onKeywordsListFetch(state: State): State {
  return {
    ...state,
    "status": updateStatusLoading(state.status),
  };
}

function onKeywordsListFetchSuccess(
  state: State, action: KeywordListFetchPayloadSuccess
): State {

  action.keywords.sort((left, right) =>
    right.usedByPublisherCount - left.usedByPublisherCount);

  return {
    ...state,
    "status": ResourceStatus.Ready,
    "keywords": colorKeywords(action.keywords),
    "error": undefined,
  };
}

function colorKeywords(keywords: Keyword[]): ColoredKeyword[] {
  const colors = randomColor({
    "luminosity": "dark",
    "hue": "random",
    "seed": 13,
    "count": keywords.length,
  });
  return keywords.map((keyword, index) => ({
    ...keyword,
    "color": colors[index],
  }));
}

function onKeywordsListFetchFailed(
  state: State, action: KeywordListFetchPayloadFailed
): State {
  return {
    ...state,
    "status": ResourceStatus.Failed,
    "error": action.error,
  };
}

const reducerName = "keyword-list.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

// We export whole state, as the rendering need it anyway.
export const keywordListSelector = stateSelector;
