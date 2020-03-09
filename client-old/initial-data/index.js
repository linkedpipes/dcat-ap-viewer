export {InitialDataFetch} from "./initial-data-fetch-component";

import {register} from "../../app/register";
import {default as reducer} from "./initial-data-reducer"

register({
  "reducer": reducer.reducer,
  "name": reducer.name,