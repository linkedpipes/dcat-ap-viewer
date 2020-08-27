import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Keyword} from "./keyword-list-model";
import {JsonLdEntity} from "../jsonld";

export interface KeywordListFetchPayloadSuccess {
  payload: Keyword[];
  jsonld: JsonLdEntity[];
}

export interface KeywordListFetchPayloadFailed {
  error: Error;
}

export const KeywordListActions = {
  "fetchKeywordList": createAsyncAction(
    "app.keywordList.request",
    "app.keywordList.success",
    "app.keywordList.failure",
  )<null,
    KeywordListFetchPayloadSuccess,
    KeywordListFetchPayloadFailed>(),
  "mountKeywordList": createAction("app.keywordList.mount")(),
  "unMountKeywordList": createAction("app.keywordList.unMount")(),
};

export type KeywordListActionsType = ActionType<typeof KeywordListActions>;
