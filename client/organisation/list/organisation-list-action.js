import {fetchJson} from "../../services/http-request";
import {setApplicationLoader} from "../../application/app-action";
import Notifications from "react-notification-system-redux";
import {getString} from "./../../application/strings";

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
        dispatch(setApplicationLoader(true));
        fetchJson(url, (json) => {
            dispatch(setApplicationLoader(false));
            dispatch(fetchDataSuccess(json));
        }, (error) => {
            dispatch(setApplicationLoader(false));
            dispatch(fetchDataFailed(error));
            // TODO Move to fetchJson service
            dispatch(Notifications.error({
                "uid": "e.serviceOffline",
                "title": getString("e.serviceOffline"),
                "position": "tr",
                "autoDismiss": 4,
            }));
        });
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
