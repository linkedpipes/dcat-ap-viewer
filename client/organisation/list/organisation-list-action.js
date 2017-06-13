import {fetchJsonAndDispatch} from "../../services/http-request";

export const FETCH_LIST_PAGE_REQUEST = "FETCH_ORGANISATION_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_ORGANISATION_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_ORGANISATION_LIST_PAGE_FAILED";

function constructQueryUrl() {
    let url = "api/v1/solr/query?" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1";
    return url;
}

export function fetchDataRequest() {
    return (dispatch) => {
        dispatch({
            "type": FETCH_LIST_PAGE_REQUEST,
        });
        const url = constructQueryUrl();
        fetchJsonAndDispatch(url, dispatch, fetchDataSuccess, fetchDataFailed);
    };
}

export function fetchDataSuccess(json) {
    return {
        "type": FETCH_LIST_PAGE_SUCCESS,
        "data": json
    };
}

export function fetchDataFailed(error) {
    return {
        "type": FETCH_LIST_PAGE_FAILED,
        "data": error
    };
}
