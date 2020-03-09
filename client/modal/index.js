import {register} from "./../app/register";
import reducer from "./modal-reducer";

export {ModalContainer} from "./modal";
export {showModal} from "./modal-action";

register({
  "reducer": reducer.reducer,
  "name": reducer.name,
});
