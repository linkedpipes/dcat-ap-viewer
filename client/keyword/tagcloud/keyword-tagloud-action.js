import {fetchJsonCallback} from "../../services/http-request";
import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "../../components/loading-indicator";

export const FETCH_KEYWORDS_REQUEST = "FETCH_KEYWORDS_REQUEST";
export const FETCH_KEYWORDS_SUCCESS = "FETCH_KEYWORDS_SUCCESS";
export const FETCH_KEYWORDS_FAILED = "FETCH_KEYWORDS_FAILED";

export function fetchKeywordsRequest() {
    return (dispatch) => {
        dispatch(fetchKeywords());
        const url = "/api/v1/resource/static?id=keywords_by_publishers";
        fetchJsonCallback(url, (json) => {
            dispatch(fetchKeywordsSuccess(json));
        }, (error) => {
            dispatch(fetchKeywordsFailed(error));
        });
    };
}

function fetchKeywords() {
    return addLoaderStatusOn({
        "type": FETCH_KEYWORDS_REQUEST
    });
}

function fetchKeywordsSuccess(json) {
    return addLoaderStatusOff({
        "type": FETCH_KEYWORDS_SUCCESS,
        "data": json
    });
}

function fetchKeywordsFailed(error) {
    return addLoaderStatusOff({
        "type": FETCH_KEYWORDS_FAILED,
        "error": error
    });
}
