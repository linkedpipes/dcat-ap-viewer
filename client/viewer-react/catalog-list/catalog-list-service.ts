import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";

import {CatalogListActions} from "./catalog-list-action";
import {catalogsListSelector} from "./catalog-list-reducer";
import {Catalog} from "../../data-model/catalog";
import {ResourceStatus} from "../resource-status";
import {getApi} from "../api-instance";

interface CatalogListData {

  loading: boolean;

  failed: boolean;

  catalogs: Catalog[];

}

export function useCatalogListApi(language: string): CatalogListData {
  const state = useSelector(catalogsListSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CatalogListActions.mountCatalogList());
    return () => {
      dispatch(CatalogListActions.unMountCatalogList());
    };
  }, []);

  if (state.status === ResourceStatus.Undefined) {
    dispatch(fetchCatalogList(language));
  }

  if (!state.mounted) {
    return {
      "loading": true,
      "failed": false,
      "catalogs": [],
    };
  }

  if (state.status === ResourceStatus.Undefined) {
    return {
      "loading": true,
      "failed": false,
      "catalogs": [],
    };
  }

  if (state.status === ResourceStatus.Failed) {
    return {
      "loading": false,
      "failed": true,
      "catalogs": [],
    };
  }

  return {
    "loading": false,
    "failed": false,
    "catalogs": state.catalogs,
  };

}

type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchCatalogList(language: string): ThunkVoidResult {
  return async (dispatch) => {
    dispatch(CatalogListActions.fetchCatalogList.request({
      "loadingIndicator" :1
    }));
    try {
      const response = await getApi().fetchCatalogList(language);
      dispatch(CatalogListActions.fetchCatalogList.success({
        "loadingIndicator" : -1,
        "catalogs": response.catalogs,
        "labels": response.labels,
      }));
    } catch (error : any) {
      dispatch(CatalogListActions.fetchCatalogList.failure({
        "loadingIndicator" : -1,
        "error": error,
      }));
    }
  };
}
