import {register} from "../../app/register";
import reducer from "./form-reducer";
export {selectFormData} from "./form-reducer";
export * from "./form-links.js";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
