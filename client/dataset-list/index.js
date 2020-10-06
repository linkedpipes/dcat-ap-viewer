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
} from "./dataset-list-reducer";
export {
  ELEMENT_DATASET_LIST,
} from "./dataset-list-container";
export {
  replaceNavigation,
  fetchDatasetTypeahead,
} from "./dataset-list-service";
export {
  Facet,
} from "./dataset-list-model";
export {
  toggleFacet,
  createDefaultQuery,
} from "./dataset-list-query-service";

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
