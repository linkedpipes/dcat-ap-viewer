import randomColor from "randomcolor";
import {
  DatasetListActions,
  DatasetsFetchPayloadSuccess,
  DatasetListActionsType,
  FacetFetchPayloadSuccess,
} from "./dataset-list-actions";
import {
  Facet,
  DatasetListItem
} from "./dataset-list-model";
import {getType} from "typesafe-actions";
import {Status} from "../app/resource-status";
import {DatasetListQuery} from "../api/api-interface";

export {Status} from "../app/resource-status";

interface State {
  active: boolean;
  status: Status;
  datasets: DatasetListItem[];
  // Total dataset count.
  datasetsCount: number;
  // Facets.
  themes: FacetData;
  keywords: FacetData;
  publishers: FacetData;
  formats: FacetData;
  // Colors for facet views.
  colors: Record<string, string>;
}

interface FacetData {
  /**
   * Already fetched facets.
   */
  facets: Facet[];
  /**
   * Total number of facets that can be fetched.
   */
  count: number;
}

const initialState: State = {
  "active": false,
  "status": Status.Undefined,
  "datasets": [],
  "datasetsCount": 0,
  "themes": {
    "facets": [],
    "count": 0,
  },
  "keywords": {
    "facets": [],
    "count": 0,
  },
  "publishers": {
    "facets": [],
    "count": 0,
  },
  "formats": {
    "facets": [],
    "count": 0,
  },
  "colors": {},
};

function reducer(state = initialState, action: DatasetListActionsType) {
  switch (action.type) {
    case getType(DatasetListActions.mountDatasetList):
      return onDatasetListMount(state);
    case getType(DatasetListActions.unMountDatasetList):
      return onDatasetListUnMount(state);
    case getType(DatasetListActions.fetchDatasets.request):
      return onDatasetListFetch(state);
    case getType(DatasetListActions.fetchDatasets.success):
      return onDatasetListSuccess(state, action.payload);
    case getType(DatasetListActions.fetchDatasets.failure):
      return onDatasetListFailed(state);
    case getType(DatasetListActions.fetchFacets.request):
      return onDatasetListFacetFetch(state);
    case getType(DatasetListActions.fetchFacets.success):
      return onDatasetListFacetFetchSuccess(state, action.payload);
    case getType(DatasetListActions.fetchFacets.failure):
      return onDatasetListFacetFetchFailed(state);
    default:
      return state;
  }
}

function onDatasetListMount(state: State): State {
  return {
    ...state,
    "active": true,
    "status": Status.Undefined,
  };
}

function onDatasetListUnMount(state: State): State {
  // We keep data about colors.
  return {
    ...initialState,
    "active": false,
    "status": Status.Undefined,
    "colors": state.colors,
  };
}

function onDatasetListFetch(state: State): State {
  return {
    ...state,
    "status": state.status === Status.Ready ? Status.Updating : Status.Loading,
  };
}

function onDatasetListSuccess(
  state: State, action: DatasetsFetchPayloadSuccess
): State {
  const colors = {
    ...state.colors,
    ...addColors(action.payload.themes, state.colors),
    ...addColors(action.payload.keywords, state.colors),
  };
  return {
    ...state,
    "status": Status.Ready,
    "datasets": action.payload.datasets,
    "datasetsCount": action.payload.datasetsCount,
    "themes": {
      "facets": action.payload.themes,
      "count": action.payload.themesCount,
    },
    "keywords": {
      "facets": action.payload.keywords,
      "count": action.payload.keywordsCount,
    },
    "publishers": {
      "facets": action.payload.publishers,
      "count": action.payload.publishersCount,
    },
    "formats": {
      "facets": action.payload.formats,
      "count": action.payload.formatsCount,
    },
    "colors": colors,
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

function onDatasetListFailed(state: State): State {
  return {
    ...state,
    "status": Status.Failed,
  }
}

function onDatasetListFacetFetch(state: State) {
  return {
    ...state,
    "status": state.status === Status.Ready ? Status.Updating : Status.Loading,
  };
}

function onDatasetListFacetFetchSuccess(
  state: State, action:FacetFetchPayloadSuccess
) {
  const facetName = action.facetName;
  const colors = {
    ...state.colors,
    // @ts-ignore
    ...addColors(action.payload[facetName], state.colors),
  };
  return {
    ...state,
    "status": Status.Ready,
    [facetName]: {
      // @ts-ignore
      "facets": action.payload[facetName],
      // @ts-ignore
      "count": action.payload[facetName + "Count"],
    },
    "colors": colors,
  }
}

function onDatasetListFacetFetchFailed(state: State) {
  return {
    ...state,
    "status": state.status === Status.Updating ? Status.Ready : Status.Failed,
  }
}

const reducerName = "dataset-list";

export default {
  "name": reducerName,
  "reducer": reducer,
};

const stateSelector = (state: any): State => state[reducerName];

export function selectDatasetListStatus(state:any) {
  return stateSelector(state).status;
}

export function selectDatasetList(state:any) {
  return stateSelector(state).datasets;
}

export function selectDatasetListCount(state:any) {
  return stateSelector(state).datasetsCount;
}

export function selectThemesFacet(state:any) {
  return stateSelector(state).themes;
}

export function selectKeywordsFacet(state:any) {
  return stateSelector(state).keywords;
}

export function selectPublishersFacet(state:any) {
  return stateSelector(state).publishers;
}

export function selectFormatsFacet(state:any) {
  return stateSelector(state).formats;
}
