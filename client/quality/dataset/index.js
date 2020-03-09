import {register} from "../../app/register";
import reducer from "./quality-dataset-detail-reducer";
export {selectDatasetQuality} from "./quality-dataset-detail-reducer";
export * from "./quality-dataset-detail-action";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
