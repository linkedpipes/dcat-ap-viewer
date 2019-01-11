import {
    FETCH_CATALOGS_REQUEST,
    FETCH_CATALOGS_SUCCESS,
    FETCH_CATALOGS_FAILED
} from "./catalog-list-actions";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED
} from "@/app-services/http-request";

const reducerName = "catalog-list";

const initialState = {
    "status": STATUS_INITIAL,
    "catalogs": undefined,
};

function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_CATALOGS_REQUEST:
            return onCatalogsRequest();
        case FETCH_CATALOGS_SUCCESS:
            return onCatalogsRequestSuccess(state, action);
        case FETCH_CATALOGS_FAILED:
            return onCatalogsRequestFailed(state, action);
        default:
            return state
    }
}

function onCatalogsRequest() {
    return {
        "status": STATUS_FETCHING,
        "catalogs": []
    };
}

function onCatalogsRequestSuccess(state, action) {
    return {
        ...state,
        "status": STATUS_FETCHED,
        "catalogs": action.catalogs
    };
}

function onCatalogsRequestFailed(state, action) {
    return {
        ...state,
        "status": action.error.status,
        "catalogs": undefined
    };
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function statusSelector(state) {
    return reducerSelector(state).status;
}

export function catalogsSelector(state) {
    return reducerSelector(state).catalogs;
}
