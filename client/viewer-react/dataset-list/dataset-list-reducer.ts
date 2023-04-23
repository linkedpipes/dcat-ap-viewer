import {getType} from "typesafe-actions";
import randomColor from "randomcolor";

import {
  DatasetListActions,
  DatasetListActionsType,
  DatasetsFetchPayloadFailed,
  DatasetsFetchPayloadSuccess,
} from "./dataset-list-actions";
import {
  DatasetList,
  DatasetListItem,
  DatasetListQuery,
  Facet,
} from "../../data-api/api-dataset";
import {ResourceStatus, updateStatusLoading} from "../resource-status";
import {register} from "../core/register";

class State implements DatasetList {
  mounted: boolean = false;
  status: ResourceStatus = ResourceStatus.Undefined;
  error: Error | undefined = undefined;
  /**
   * Last query used to successfully fetch the data.
   */
  query: DatasetListQuery | undefined;
  /**
   * Colors used for facets.
   */
  colors: Record<string, string> = {};
  //
  datasets: DatasetListItem[] = [];
  datasetsCount: number = 0;
  fileTypes: Facet[] = [];
  fileTypesCount: number = 0;
  dataServiceTypes: Facet[] = [];
  dataServiceTypesCount: number = 0;
  keywords: Facet[] = [];
  keywordsCount: number = 0;
  publishers: Facet[] = [];
  publishersCount: number = 0;
  themes: Facet[] = [];
  themesCount: number = 0;
}

function reducer(state = new State(), action: DatasetListActionsType) {
  switch (action.type) {
    case getType(DatasetListActions.mountDatasetList):
      return onDatasetListMount(state);
    case getType(DatasetListActions.unMountDatasetList):
      return onDatasetListUnMount(state);
    case getType(DatasetListActions.fetchDatasetList.request):
      return onDatasetListFetch(state);
    case getType(DatasetListActions.fetchDatasetList.success):
      return onDatasetListSuccess(state, action.payload);
    case getType(DatasetListActions.fetchDatasetList.failure):
      return onDatasetListFailed(state, action.payload);
    default:
      return state;
  }
}

function onDatasetListMount(state: State): State {
  return {
    ...state,
    "mounted": true,
  };
}

function onDatasetListUnMount(state: State): State {
  return {
    ...new State(),
    "colors": state.colors,
  };
}

function onDatasetListFetch(state: State): State {
  return {
    ...state,
    "status": updateStatusLoading(state.status),
  };
}

function onDatasetListSuccess(
  state: State, action: DatasetsFetchPayloadSuccess
): State {
  const content = action.content;
  const colors = {
    ...state.colors,
    ...addColors(content.themes, state.colors),
    ...addColors(content.keywords, state.colors),
  };
  if (action.merge) {
    return {
      ...mergeContentIntoState(state, action.content, action.query),
      "status": ResourceStatus.Ready,
      "colors": colors,
    };
  } else {
    return {
      ...state,
      "status": ResourceStatus.Ready,
      "query": action.query,
      "datasets": content.datasets,
      "datasetsCount": content.datasetsCount,
      "themes": content.themes,
      "themesCount": content.themesCount,
      "keywords": content.keywords,
      "keywordsCount": content.keywordsCount,
      "publishers": content.publishers,
      "publishersCount": content.publishersCount,
      "fileTypes": content.fileTypes,
      "fileTypesCount": content.fileTypesCount,
      "dataServiceTypes": content.dataServiceTypes,
      "dataServiceTypesCount": content.dataServiceTypesCount,
      "colors": colors,
    };
  }
}

/**
 * Add colors to given entries. Reuse provided colors using iri mapping,
 * return mapping for new colors.
 */
function addColors(items: Facet[], colors: Record<string, string>) {
  const newEntries: Facet[] = [];
  items.forEach((item) => {
    if (colors[item.iri]) {
      item["color"] = colors[item.iri];
    } else {
      newEntries.push(item);
    }
  });
  //
  const newColors: Record<string, string> = {};
  const generatedColors = randomColor({
    "luminosity": "dark",
    "hue": "random",
    "count": items.length,
  });
  for (let index = 0; index < newEntries.length; ++index) {
    const entry = newEntries[index];
    entry["color"] = generatedColors[index];
    newColors[entry.iri] = generatedColors[index];
  }
  return newColors;
}

function mergeContentIntoState(
  state: State, action: DatasetList, query: DatasetListQuery
): State {
  const result = {...state};
  if (action.datasets.length > 0) {
    result.query = {
      // If we are here there is already a valid query.
      ...(state.query as DatasetListQuery),
      "limit": query.limit,
      "offset": query.offset
    };
    result.datasets = action.datasets;
  }
  if (action.publishers.length > 0) {
    result.publishers = action.publishers;
  }
  if (action.themes.length > 0) {
    result.themes = action.themes;
  }
  if (action.keywords.length > 0) {
    result.keywords = action.keywords;
  }
  if (action.fileTypes.length > 0) {
    result.fileTypes = action.fileTypes;
  }
  if (action.dataServiceTypes.length > 0) {
    result.dataServiceTypes = action.dataServiceTypes;
  }
  return result;
}

function onDatasetListFailed(
  state: State, action: DatasetsFetchPayloadFailed
): State {
  return {
    ...state,
    "status": ResourceStatus.Failed,
    "error": action.error,
  }
}

const reducerName = "dataset-list.reducer";

register({
  "name": reducerName,
  "reducer": reducer as any,
});

const stateSelector = (state: any): State => state[reducerName];

export const datasetListSelector = stateSelector;
