import {SET_APPLICATION_LOADER_PROPERTY} from "./loading-indicator-action";

const initialState = {
    "active": false
};

const reducerName = "loading-indicator";

function reducer(state = initialState, action) {
    if (action[SET_APPLICATION_LOADER_PROPERTY] !== undefined) {
        return {
            "active": action[SET_APPLICATION_LOADER_PROPERTY]
        };
    }
    return state;
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function isLoaderActiveSelector(state) {
    return reducerSelector(state)["active"];
}