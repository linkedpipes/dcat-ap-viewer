import {register} from "../../app/register";
import reducer from "./quality-publisher-list-reducer";
export * from "./quality-publisher-list-action";
export {selectExceptionalPublishers} from "./quality-publisher-list-reducer";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
