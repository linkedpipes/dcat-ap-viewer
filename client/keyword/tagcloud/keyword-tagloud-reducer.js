import {
    MOUNT_KEYWORDS_LIST,
    UNMOUNT_KEYWORDS_LIST,
    FETCH_KEYWORDS_FAILED,
    FETCH_KEYWORDS_SUCCESS,
    FETCH_KEYWORDS_REQUEST
} from "./keyword-tagloud-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED
} from "../../app-services/http-request";

const reducerName = "keyword-tagcloud";

function reducer(state = {}, action) {
    switch (action.type) {
        case MOUNT_KEYWORDS_LIST:
            return onMount();
        case UNMOUNT_KEYWORDS_LIST:
            return {};
        case FETCH_KEYWORDS_REQUEST:
            return onKeywordsRequest();
        case FETCH_KEYWORDS_SUCCESS:
            return onKeywordsRequestSuccess(state, action);
        case FETCH_KEYWORDS_FAILED:
            return onKeywordsRequestFailed(state, action);
        default:
            return state
    }
}

function onMount() {
    return {
        "status": STATUS_INITIAL,
        "keywords": undefined,
    }
}

function onKeywordsRequest() {
    return {
        "status": STATUS_FETCHING,
        "keywords": []
    };
}

function onKeywordsRequestSuccess(state, action) {
    return {
        ...state,
        "status": STATUS_FETCHED,
        "keywords": action.keywords
    };
}

function onKeywordsRequestFailed(state, action) {
    return {
        ...state,
        "status": action.error.status,
        "keywords": undefined
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

export function keywordsSelector(state) {
    return reducerSelector(state).keywords;
}
