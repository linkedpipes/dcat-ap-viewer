import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "app-components/loading-indicator";
import {fetchKeywordsByPublishers} from "../keyword-api";

export const MOUNT_KEYWORDS_LIST = "MOUNT_KEYWORDS_LIST";
export const UNMOUNT_KEYWORDS_LIST = "UNMOUNT_KEYWORDS_LIST";
export const FETCH_KEYWORDS_REQUEST = "FETCH_KEYWORDS_REQUEST";
export const FETCH_KEYWORDS_SUCCESS = "FETCH_KEYWORDS_SUCCESS";
export const FETCH_KEYWORDS_FAILED = "FETCH_KEYWORDS_FAILED";

export function onMount() {
    return {
        "type": MOUNT_KEYWORDS_LIST
    };
}

export function onUnMount() {
    return {
        "type": UNMOUNT_KEYWORDS_LIST
    }
}

export function fetchKeywords() {
    return (dispatch) => {
        dispatch(fetchRequest());
        fetchKeywordsByPublishers()
            .then((payload) => dispatch(fetchSuccess(payload)))
            .catch((error) => dispatch(fetchFailed(error)));
    };
}

function fetchRequest() {
    return addLoaderStatusOn({
        "type": FETCH_KEYWORDS_REQUEST
    });
}

function fetchSuccess(json) {
    return addLoaderStatusOff({
        "type": FETCH_KEYWORDS_SUCCESS,
        "keywords": json
    });
}

function fetchFailed(error) {
    // TODO Add API for handling errors!
    console.error("fetchFailed", error);
    return addLoaderStatusOff({
        "type": FETCH_KEYWORDS_FAILED,
        "error": error
    });
}
