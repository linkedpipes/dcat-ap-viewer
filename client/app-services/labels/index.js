import {register} from "@/app/register";
import {default as reducer} from "./labels-reducer"

export {fetchLabel} from "./labels-action";
export {labelsSelector} from "./labels-reducer";
export {
    selectLabel,
    selectLabelNoIri,
    selectString
} from "./labels-api";

register({
    "reducer": reducer.reducer,
    "name": reducer.name
});