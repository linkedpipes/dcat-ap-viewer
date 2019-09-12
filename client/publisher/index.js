import {register} from "app/register.js";
import reducer from "./publisher-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
