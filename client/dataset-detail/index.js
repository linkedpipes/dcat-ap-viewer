import {register} from "../app/register";
import DatasetViewContainer from "./dataset-detail-container";
import reducer from "./dataset-detail-reducer";

export {
  Status,
  ResourceStatus,
  datasetSelector,
  qualitySelector,
  descendantsSelector,
} from "./dataset-detail-reducer";
export {
  ELEMENT_DATASET_DETAIL,
} from "./dataset-detail-container";
export {
  fetchDataset,
  fetchDatasetQuality,
  fetchDatasetPartQuality,
  fetchDescendants,
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
