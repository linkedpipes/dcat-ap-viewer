import {register} from "../app/component-api";
import DatasetViewContainer from "./dataset-detail-container";
import reducer from "./dataset-detail-reducer";

export {
  Part,
  PartType,
} from "./dataset-detail-model";
export {
  Status,
  ResourceStatus,
  datasetSelector,
  partSelector,
  qualitySelector,
} from "./dataset-detail-reducer";
export {
  ELEMENT_DATASET_DETAIL,
} from "./dataset-detail-container";
export {
  fetchDataset,
  fetchDatasetQuality,
  fetchDistribution,
  fetchDatasetPartQuality,
} from "./dataset-detail-service";

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
