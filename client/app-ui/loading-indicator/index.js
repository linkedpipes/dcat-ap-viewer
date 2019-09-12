import {register} from "app/register.js";
export {
  addLoaderStatusOn,
  addLoaderStatusOff,
} from "./loading-indicator-action";
export {default as LoaderIndicator} from "./loading-indicator";
import reducer from "./loading-indicator-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
