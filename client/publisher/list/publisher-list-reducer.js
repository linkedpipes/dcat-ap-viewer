import {
    MOUNT_ORGANISATION_LIST,
    UNMOUNT_ORGANISATION_LIST,
    FETCH_LIST_PAGE_REQUEST,
    FETCH_LIST_PAGE_SUCCESS,
    FETCH_LIST_PAGE_FAILED
} from "./publisher-list-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED,
} from "@/app-services/http-request";

const reducerName = "publisher-list";

function reducer(state = {}, action) {
    switch (action.type) {
        case MOUNT_ORGANISATION_LIST:
            return onMount();
        case UNMOUNT_ORGANISATION_LIST:
            return {};
        case FETCH_LIST_PAGE_REQUEST:
            return onRequest(state);
        case FETCH_LIST_PAGE_SUCCESS:
            return onRequestSuccess(state, action);
        case FETCH_LIST_PAGE_FAILED:
            return onRequestFailed(state, action);
        default:
            return state
    }
}

function onMount() {
    return {
        "status": STATUS_INITIAL,
        "publishers": undefined,
    }
}

function onRequest(state) {
    return {
        ...state,
        "status": STATUS_FETCHING
    };
}

function onRequestSuccess(state, action) {
    // Create copy so we have our own array that we can sort.
    const publishers = [...action.publishers];
    publishers.sort((left, right) => right.count - left.count);
    return {
        ...state,
        "status": STATUS_FETCHED,
        "publishers": publishers
    };
}

function onRequestFailed(state, action) {
    return {
        ...state,
        "status": action.error.status,
        "publishers": undefined
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

export function publishersSelector(state) {
    return reducerSelector(state).publishers;
}
