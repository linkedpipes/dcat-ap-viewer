import {register} from "../app/register";
import DatasetViewContainer from "./dataset-detail-container";
import reducer from "./dataset-detail-reducer";

export {
  Status,
  datasetSelector,
  qualitySelector,
  descendantsSelector,
  datasetPartSelector,
} from "./dataset-detail-reducer";
export {
  ELEMENT_DATASET_DETAIL,
} from "./dataset-detail-container";
export {
  fetchDataset,
  fetchDatasetQuality,
  fetchDatasetPartQuality,
  fetchDescendants,
  fetchDistribution,
} from "./dataset-detail-service";
export {
  DistributionType,
} from "./dataset-detail-model";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
});

register({
  "name": reducer.name + "-container",
  "url": "/dataset",
  "query": [],
  "view": DatasetViewContainer,
});
