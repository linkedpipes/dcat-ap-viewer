import {
    addLoaderStatusOn as _addLoaderStatusOn,
    addLoaderStatusOff as _addLoaderStatusOff
} from "./loading-indicator-action";
import {LoaderIndicator as _LoaderIndicator} from "./loading-indicator";
import {default as _reducer} from "./loading-indicator-reducer";

export const addLoaderStatusOn = _addLoaderStatusOn;

export const addLoaderStatusOff = _addLoaderStatusOff;

export const LoaderIndicator = _LoaderIndicator;

export const reducer = _reducer;