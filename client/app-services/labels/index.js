import {register} from "app/register";

import {fetchLabel as _fetchLabel} from "./labels-action";
import {
    default as reducer,
    labelsSelector as _labelsSelector
} from "./labels-reducer";
import {
    selectLabel as _selectLabel,
    selectLabels as _selectLabels,
    selectString as _selectString
} from "./labels-api";

// TODO Use better naming for selectLabel, selectLabels and selectString?

export const fetchLabel = _fetchLabel;
export const selectLabel = _selectLabel;
export const selectLabels = _selectLabels;
export const labelsSelector = _labelsSelector;
export const selectString = _selectString;

register({
    "reducer": reducer.reducer,
    "name": reducer.name
});