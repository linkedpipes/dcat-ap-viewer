import {createAction, ActionType, createAsyncAction} from "typesafe-actions";
import {Keyword} from "../../data-model/keyword";
import {Label} from "../../data-api/api-label";

export interface KeywordListFetchPayloadRequest {

  loadingIndicator: number;

}

export interface KeywordListFetchPayloadSuccess {

  loadingIndicator: number;

  keywords: Keyword[];

  labels: Label[];

}

export interface KeywordListFetchPayloadFailed {

  loadingIndicator: number;

  error: Error;

}

export const KeywordListActions = {
  "mountKeywordList": createAction("app.keywordList.mount")(),
  "unMountKeywordList": createAction("app.keywordList.unMount")(),
  "fetchKeywordList": createAsyncAction(
    "app.keywordList.request",
    "app.keywordList.success",
    "app.keywordList.failure",
  )<KeywordListFetchPayloadRequest,
    KeywordListFetchPayloadSuccess,
    KeywordListFetchPayloadFailed>(),
};

export type KeywordListActionsType = ActionType<typeof KeywordListActions>;
