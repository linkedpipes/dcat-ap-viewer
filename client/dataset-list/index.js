import {register} from "../app/register";
import DatasetListContainer from "./dataset-list-container";
import reducer from "./dataset-list-reducer";

export {
  Status,
  selectDatasetListStatus,
  selectDatasetList,
  selectDatasetListCount,
  selectFormatsFacet,
  selectKeywordsFacet,
  selectPublishersFacet,
  selectThemesFacet,
  selectDatasetQuery,
} from "./dataset-list-reducer";
export {
  ELEMENT_DATASET_LIST,
} from "./dataset-list-container";
export {
  fetchDatasets,
  replaceNavigation,
  updateDatasets,
  fetchFacets,
  fetchDatasetTypeahead,
} from "./dataset-list-service";
export {
  Facet,
} from "./dataset-list-model";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
});

register({
  "name": reducer.name + "-container",
  "url": "/datasets",
  "query": [],
  "view": DatasetListContainer,
});
