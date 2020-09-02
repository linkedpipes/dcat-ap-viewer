import {register} from "../app/register";
import reducer from "./labels-reducer";
export {selectTLabel} from "./labels-reducer";
export {fetchLabels, fetchDatasetLabel} from "./labels-service";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
