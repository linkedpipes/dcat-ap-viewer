import {
    FETCH_KEYWORDS_FAILED,
    FETCH_KEYWORDS_SUCCESS,
    FETCH_KEYWORDS_REQUEST
} from "./keyword-tagloud-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED
} from "./../../services/http-request";

const initialState = {
    "status": STATUS_INITIAL,
    "data": [],
};

export const keywordsTagCloudReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_KEYWORDS_REQUEST:
            return onKeywordsRequest();
        case FETCH_KEYWORDS_SUCCESS:
            return onKeywordsRequestSuccess(state, action);
        case FETCH_KEYWORDS_FAILED:
            return onKeywordsRequestFailed(state, action);
        default:
            return state
    }
};

function onKeywordsRequest() {
    return {
        "status": STATUS_FETCHING,
        "data": []
    };
}

function onKeywordsRequestSuccess(state, action) {
    return {
        ...state,
        "data": action.data.json,
        "status": STATUS_FETCHED
    };
}

function onKeywordsRequestFailed(state, action) {
    return {
        ...state,
        "data": [],
        "status": action.error.status
    };
}

export function keywordsStatusSelector(state) {
    return state.keywords.status;
}

export function keywordsDataSelector(state) {
    return state.keywords.data;
}
