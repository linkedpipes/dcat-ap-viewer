import {
    FETCH_KEYWORDS_FAILED,FETCH_KEYWORDS_SUCCESS,FETCH_KEYWORDS_REQUEST
} from "./keyword-tagloud-action";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED,
    STATUS_FAILED
} from "./../../services/http-request";

const initialState = {
    "status": STATUS_INITIAL,
    "data": [],
};

export const keywordsTagCloudReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_KEYWORDS_REQUEST:
            return {
                ...state,
                "data": undefined,
                "status": STATUS_FETCHING
            };
        case FETCH_KEYWORDS_SUCCESS:
            return onKeywordsRequestSuccess(state, action);
        case FETCH_KEYWORDS_FAILED:
            return {
                ...state,
                "data": undefined,
                "status": STATUS_FAILED
            };
        default:
            return state
    }
};

function onKeywordsRequestSuccess(state, action) {
    return {
        ...state,
        "data" : action.data.json,
        "status": STATUS_FETCHED
    };
}