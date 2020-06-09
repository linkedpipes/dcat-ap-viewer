import {register} from "../../app/component-api";
import reducer from "./legal-distribution-reducer";
export {selectLegalDistribution} from "./legal-distribution-reducer";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
});
