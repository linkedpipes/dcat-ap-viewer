import {
    MOUNT,
    UNMOUNT,
    FETCH_RELATED,
    FETCH_RELATED_SUCCESS,
    FETCH_RELATED_FAILED
} from "./semantic-related-actions";
import {
    STATUS_FETCHED,
    STATUS_FETCHING,
    STATUS_INITIAL
} from "../../app-services/http-request";

const initialState = {};

const reducerName = "semantic-related";

function reducer(state = initialState, action) {
    switch (action.type) {
        case MOUNT:
            return onMount();
        case UNMOUNT:
            return onUnMount();
        case FETCH_RELATED:
            return onRequest(state, action);
        case FETCH_RELATED_SUCCESS:
            return onRequestSuccess(state, action);
        case FETCH_RELATED_FAILED:
            return onRequestFailed(state, action);
    }
    return state;
}

function onMount() {
    return {
        "status": STATUS_INITIAL,
        "terms": []
    }
}

function onUnMount() {
    return {};
}

function onRequest(state, action) {
    return {
        ...state,
        "status": STATUS_FETCHING
    };
}

function onRequestSuccess(state, action) {
    return {
        ...state,
        "status": STATUS_FETCHED,
        "related": action.related
    };
}

function onRequestFailed(state, action) {
    return {
        ...state,
        "status": action.error.status,
        "related": undefined
    };
}


export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function statusSelector(state) {
    return reducerSelector(state)["status"];
}

export function relatedSelector(state) {
    return reducerSelector(state)["related"];
}
