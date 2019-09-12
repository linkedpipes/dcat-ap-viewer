import {register} from "app/register.js";
import reducer from "./theme-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
