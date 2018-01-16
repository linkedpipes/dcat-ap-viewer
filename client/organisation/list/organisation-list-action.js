import {fetchJsonCallback} from "../../services/http-request";
import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "../../components/loading-indicator";

export const FETCH_LIST_PAGE_REQUEST = "FETCH_ORGANISATION_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_ORGANISATION_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_ORGANISATION_LIST_PAGE_FAILED";

function constructQueryUrl() {
    const url = "api/v1/solr/query?" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*&" +
        "facet.limit=-1";
    return url;
}

export function fetchDataRequest() {
    return (dispatch) => {
        dispatch(fetchKeywords());
        const url = constructQueryUrl();
        fetchJsonCallback(url, (json) => {
            dispatch(fetchDataSuccess(json));
        }, (error) => {
            dispatch(fetchDataFailed(error));
        });
    };
}

function fetchKeywords() {
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
        "error": error
    });
}
