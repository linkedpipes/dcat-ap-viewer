import {register} from "@/app/register.js";
import reducer from "./distribution-reducer";
import {DistributionListContainer as _DLC} from "./distribution-list-container";

export const DistributionListContainer = _DLC;

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
