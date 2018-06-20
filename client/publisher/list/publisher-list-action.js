import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "app-components/loading-indicator";
import {fetchPublishers} from "../publisher-api";

export const MOUNT_ORGANISATION_LIST = "MOUNT_ORGANISATION_LIST";
export const UNMOUNT_ORGANISATION_LIST = "UNMOUNT_ORGANISATION_LIST";
export const FETCH_LIST_PAGE_REQUEST = "FETCH_ORGANISATION_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_ORGANISATION_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_ORGANISATION_LIST_PAGE_FAILED";

export function onMount() {
    return {
        "type": MOUNT_ORGANISATION_LIST
    };
}

export function onUnMount() {
    return {
        "type": UNMOUNT_ORGANISATION_LIST
    }
}

export function fetchPublisherList() {
    return (dispatch) => {
        dispatch(fetchRequest());
        fetchPublishers()
            .then((payload) => dispatch(fetchSuccess(payload)))
            .catch((error) => dispatch(fetchFailed(error)));
    };
}

function fetchRequest() {
    return addLoaderStatusOn({
        "type": FETCH_LIST_PAGE_REQUEST
    });
}

function fetchSuccess(data) {
    return addLoaderStatusOff({
        "type": FETCH_LIST_PAGE_SUCCESS,
        "publishers": data
    });
}

function fetchFailed(error) {
    console.error("Can't fetch publishers.", error);
    return addLoaderStatusOff({
        "type": FETCH_LIST_PAGE_FAILED,
        "error": error
    });
}
