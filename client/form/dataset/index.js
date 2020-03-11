import {register} from "../../app/register";
import reducer from "./form-reducer";
export {selectFormData} from "./form-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
