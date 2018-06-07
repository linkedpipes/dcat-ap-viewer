import {fetchJsonCallback} from "../../app-services/http-request";
import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "../../app-components/loading-indicator";
import {constructSearchQueryUrl} from "./../solr-api";

export const FETCH_LIST_PAGE_REQUEST = "FETCH_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_LIST_PAGE_FAILED";
export const SET_LIST_QUERY_STRING = "SET_LIST_QUERY_STRING";

export function fetchData(query) {
    return (dispatch) => {
        dispatch(fetchDataRequest());
        const url = constructSearchQueryUrl(query);
        fetchJsonCallback(url, (json) => {
            dispatch(fetchDataSuccess(json));
        }, (error) => {
            dispatch(fetchDataFailed(error));
        });
    };
}

function fetchDataRequest() {
    return addLoaderStatusOn({
        "type": FETCH_LIST_PAGE_REQUEST
    });
}

function fetchDataSuccess(json) {
    return addLoaderStatusOff({
        "type": FETCH_LIST_PAGE_SUCCESS,
        "data": json
    });
}

function fetchDataFailed(error) {
    return addLoaderStatusOff({
        "type": FETCH_LIST_PAGE_FAILED,
        "data": error
    });
}

export function setQueryString(value) {
    return addLoaderStatusOff({
        "type": SET_LIST_QUERY_STRING,
        "value": value
    });
}
