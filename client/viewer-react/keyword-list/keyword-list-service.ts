import {useEffect} from "react";
import {useDispatch, useSelector} from "../hooks";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";

import {KeywordListActions} from "./keyword-list-action";
import {keywordListSelector} from "./keyword-list-reducer";
import {ColoredKeyword} from "./keyword-list-model";
import {ResourceStatus} from "../resource-status";
import {getApi} from "../api-instance";

interface KeywordsListData {

  loading: boolean;

  failed: boolean;

  keywords: ColoredKeyword[];

}

export function useKeywordsListApi(language: string): KeywordsListData {
  const state = useSelector(keywordListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(KeywordListActions.mountKeywordList());
    return () => {
      dispatch(KeywordListActions.mountKeywordList());
    };
  }, []);

  useEffect(() => {
    if (state.status === ResourceStatus.Undefined) {
      dispatch(fetchKeywordList(language));
    }
  }, [state.status]);

  if (!state.mounted || state.status === ResourceStatus.Loading) {
    return {
      "loading": true,
      "failed": false,
      "keywords": [],
    };
  }

  if (state.status === ResourceStatus.Undefined) {
    return {
      "loading": true,
      "failed": false,
      "keywords": [],
    };
  }

  if (state.status === ResourceStatus.Failed) {
    return {
      "loading": false,
      "failed": true,
      "keywords": [],
    };
  }

  return {
    "loading": false,
    "failed": false,
    "keywords": state.keywords,
  };
}

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

function fetchKeywordList(language: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(KeywordListActions.fetchKeywordList.request({
      "loadingIndicator": 1,
    }));
    try {
      const response = await getApi().fetchKeywordList(language);
      dispatch(KeywordListActions.fetchKeywordList.success({
        "loadingIndicator": -1,
        "keywords": response.keywords,
        "labels": response.labels,
      }));
    } catch (error : any) {
      dispatch(KeywordListActions.fetchKeywordList.failure({
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}
