import {register} from "../../app/component-api";
import reducer from "./distribution-reducer";

export {default as DistributionList} from "./distribution-list-container";

register({
  "name": reducer.name,
  "reducer": reducer.reducer,
});
