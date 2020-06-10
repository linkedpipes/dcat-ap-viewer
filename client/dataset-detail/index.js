import {register} from "../app/component-api";
import DatasetViewContainer from "./dataset-detail-container";
import reducer from "./dataset-detail-reducer";

import "./distribution";
import "./quality";

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
