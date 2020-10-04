import {
  DatasetListViewState,
  DatasetListViewQuery,
  toDatasetListQuery,
} from "./dataset-list-query-service";
import {
  fetchDatasets,
  fetchFacets
} from "../../../client/dataset-list/dataset-list-service";

export function fetchMoreFacets(
  dispatch: any, query: DatasetListViewQuery,
  facetName: string, facetCount: number
) {
  const datasetQuery = toDatasetListQuery(query);
  datasetQuery.offset = 0;
  datasetQuery.limit = 0;
  datasetQuery.themeLimit = 0;
  datasetQuery.keywordLimit = 0;
  datasetQuery.publisherLimit = 0;
  datasetQuery.formatLimit = 0;
  // @ts-ignore
  datasetQuery[facetName + "Limit"] = facetCount;
  console.log("fetchMoreFacets", facetName);
  dispatch(fetchFacets(datasetQuery, facetName + "s"));
}

/**
 * Fetch facets for view, unlike fetchMoreFacets fetch all facets.
 */
export function updateFacets(dispatch: any, query: DatasetListViewQuery) {
  const datasetQuery = toDatasetListQuery(query);
  // We do not need any datasets.
  datasetQuery.offset = 0;
  datasetQuery.limit = 0;
  dispatch(fetchDatasets(datasetQuery));
}

export function onToggleFacet(
  onUpdateNavigation: any,
  viewQuery: DatasetListViewQuery,
  facetName: string, facetValue: string
) {
  const updatedQuery = {...viewQuery};
  // @ts-ignore
  const index = updatedQuery[facetName].indexOf(facetValue);
  if (index > -1) {
    // @ts-ignore
    updatedQuery[facetName] = [
      // @ts-ignore
      ...updatedQuery[facetName].splice(0, index),
      // @ts-ignore
      ...updatedQuery[facetName].splice(index + 1),
    ];
  } else {
    // @ts-ignore
    updatedQuery[facetName] = [...updatedQuery[facetName], facetValue];
  }
  onUpdateNavigation(updatedQuery);
}