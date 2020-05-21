import {
  selectUrl,
  createUrl,
  selectLanguage,
  // selectQuery,
} from "../../app/navigation";
import {push} from "connected-react-router";
import {selectDatasetListLocked} from "./dataset-list-reducer";
import {fetchDatasetList} from "../../api/api-action";
import {areDatasetListQueryEqual} from "../../api/api-interface";

export const DATASET_LIST_MOUNT = "DATASET_LIST_MOUNT";

export const DATASET_LIST_UNMOUNT = "DATASET_LIST_UNMOUNT";

export function datasetListMount() {
  return {
    "type": DATASET_LIST_MOUNT,
  };
}

export function datasetListUnMount() {
  return {
    "type": DATASET_LIST_UNMOUNT,
  };
}

export function replaceNavigation(query) {
  return (dispatch, getState) => {
    const state = getState();
    if (selectDatasetListLocked(state)) {
      return;
    }
    const oldUrl = selectUrl(state);
    const language = selectLanguage(state);
    const newUrl = createUrl(oldUrl.path, language, query);
    dispatch(push(newUrl));
  };
}

/**
 * Both parameters must be of type DatasetListQuery.
 */
export function fetchDatasets(nextQuery, prevQuery) {
  return (dispatch, getState) => {
    const state = getState();
    if (areDatasetListQueryEqual(nextQuery, prevQuery)) {
      return;
    }
    if (selectDatasetListLocked(state)) {
      // Take no action as the UI is locked.
      return;
    }
    dispatch(fetchDatasetList(nextQuery));
  };
}
