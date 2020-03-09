import {register} from "../../app/register";
import reducer from "./quality-distribution-reducer";
export * from "./quality-distribution-action";
export {selectQualityDistribution} from "./quality-distribution-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
