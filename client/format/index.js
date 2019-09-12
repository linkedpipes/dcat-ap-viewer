import {register} from "app/register.js";
import reducer from "./format-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
