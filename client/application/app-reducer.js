import {SET_APPLICATION_LOADER} from "./app-action";

const initialState = {
    "active": false
};

// TODO Move to loader reducer.
export function indeterminateLoaderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_APPLICATION_LOADER:
            return {
                "active": action.active
            };
        default:
            return state;
    }
}