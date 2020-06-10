import {register} from "../../app/register";
import reducer from "./quality-reducer";

export {selectQuality} from "./quality-reducer";
export {fetchDatasetQuality, fetchDistributionQuality} from "./quality-service";
export {QUALITY} from "../../vocabulary/vocabulary";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
