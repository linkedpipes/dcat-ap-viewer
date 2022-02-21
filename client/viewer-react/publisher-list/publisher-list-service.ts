import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";

import {PublisherListActions} from "./publisher-list-action";
import {publishersListSelector} from "./publisher-list-reducer";
import {Publisher} from "../../data-model/publisher";
import {ResourceStatus} from "../resource-status";
import {getApi} from "../api-instance";

interface PublisherListData {

  loading: boolean;

  failed: boolean;

  publishers: Publisher[];

}

export function usePublisherListApi(language: string): PublisherListData {
  const state = useSelector(publishersListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PublisherListActions.mountPublisherList());
    return () => {
      dispatch(PublisherListActions.unMountPublisherList());
    };
  }, []);

  if (state.status === ResourceStatus.Undefined) {
    dispatch(fetchPublisherList(language));
  }

  if (!state.mounted) {
    return {
      "loading": true,
      "failed": false,
      "publishers": [],
    };
  }

  if (state.status === ResourceStatus.Undefined) {
    return {
      "loading": true,
      "failed": false,
      "publishers": [],
    };
  }

  if (state.status === ResourceStatus.Failed) {
    return {
      "loading": false,
      "failed": true,
      "publishers": [],
    };
  }

  return {
    "loading": false,
    "failed": false,
    "publishers": state.publishers,
  };

}

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

function fetchPublisherList(language: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(PublisherListActions.fetchPublisherList.request({
      "loadingIndicator": 1,
    }));
    try {
      const response = await getApi().fetchPublisherList(language);
      dispatch(PublisherListActions.fetchPublisherList.success({
        "loadingIndicator": -1,
        "publishers": response.publishers,
        "labels": response.labels,
      }));
    } catch (error : any) {
      dispatch(PublisherListActions.fetchPublisherList.failure({
        "loadingIndicator": -1,
        "error": error,
      }));
    }
  };
}
