import {ThunkAction} from "redux-thunk";
import {AnyAction} from "redux";
import randomColor from "randomcolor";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {jsonLdToKeywordList} from "./jsonld-to-keyword-list";
import {keywordListSelector, Status} from "./keyword-list-reducer";
import {KeywordListActions} from "./keyword-list-action";
import {Keyword} from "./keyword-list-model";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchKeywordList(): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    if (keywordListSelector(state).status === Status.Loading) {
      return;
    }
    dispatch(KeywordListActions.fetchKeywordList.request(null));
    try {
      const jsonld = await getApiInstance().fetchKeywordList(language);
      if (jsonld === undefined) {
        dispatch(KeywordListActions.fetchKeywordList.failure({
          "error": new Error("Missing JSON-LD data."),
        }));
      }
      const keywords = jsonLdToKeywordList(jsonld);
      keywords.sort((left, right) =>
        right.usedByPublisherCount - left.usedByPublisherCount);
      addColors(keywords);
      //
      dispatch(KeywordListActions.fetchKeywordList.success({
        "payload": keywords,
        "jsonld": jsonld,
      }));
    } catch (ex) {
      dispatch(KeywordListActions.fetchKeywordList.failure({
        "error": ex,
      }));
    }

  };
}

function addColors(keywords: Keyword[]) {
  const colors = randomColor({
    "luminosity": "dark",
    "hue": "random",
    "seed": 13,
    "count": keywords.length,
  });
  for (let index = 0; index < keywords.length; ++index) {
    keywords[index].color = colors[index];
  }
}
