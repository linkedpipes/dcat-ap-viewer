import {AnyAction} from "redux";
import {ThunkAction} from "redux-thunk";
import {DatasetListQuery} from "../api/api-interface";
import {getApiInstance} from "../api/api-action";
import {selectLanguage} from "../app/component-api";
import {DatasetListActions} from "./dataset-list-actions";
import {jsonLdToDatasetList} from "./jsonld-to-datasets";

export type ThunkVoidResult = ThunkAction<void, any, any, AnyAction>;

export function fetchDatasets(query: DatasetListQuery): ThunkVoidResult {
  return async (dispatch, getState) => {
    const state = getState();
    const language = selectLanguage(state);
    dispatch(DatasetListActions.fetchDatasets.request({
      "query": query
    }));
    try {
      const jsonld = await getApiInstance().fetchDatasetList(language, query);
      if (jsonld === undefined) {
        dispatch(DatasetListActions.fetchDatasets.failure({
          "query": query,
          "error": new Error("Missing JSON-LD data."),
        }));
        return;
      }
      const payload = jsonLdToDatasetList(jsonld);
      dispatch(DatasetListActions.fetchDatasets.success({
        "query": query,
        "payload": payload,
        "jsonld": jsonld,
      }));
    } catch (ex) {
      dispatch(DatasetListActions.fetchDatasets.failure({
        "query": query,
        "error": ex,
      }));
    }

  }
}
