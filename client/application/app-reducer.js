import {SET_APPLICATION_LOADER_PROPERTY} from "./app-action";

const initialState = {
    "active": false
};

// TODO Move to loader reducer.
export function indeterminateLoaderReducer(state = initialState, action) {
    if (action[SET_APPLICATION_LOADER_PROPERTY] !== undefined) {
        return {
            "active": action[SET_APPLICATION_LOADER_PROPERTY]
        };
    }
    return state;
}
