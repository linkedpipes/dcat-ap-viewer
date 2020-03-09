import {register} from "../../app/component-api";
import DatasetViewContainer from "./dataset-list-container";
import reducer from "./dataset-list-reducer";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
});

register({
  "name": reducer.name + "-container",
  "url": "/datasets",
  "query": [],
  "view": DatasetViewContainer,
});
