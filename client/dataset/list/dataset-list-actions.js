import {fetchJson} from "../../services/http-request";
import {setApplicationLoader} from "../../application/app-action";
import Notifications from "react-notification-system-redux";
import {getString} from "./../../application/strings";

export const FETCH_LIST_PAGE_REQUEST = "FETCH_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_LIST_PAGE_FAILED";
export const SET_LIST_QUERY_STRING = "SET_LIST_QUERY_STRING";

function constructSearchQueryUrl(query) {
    let url = "api/v1/solr/query?" +
        "facet.field=keyword&" +
        "facet.field=formatName&" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&";

    const start = query.page * 10;
    url += "start=" + start + "&";

    if (query.search === undefined || query.search === "") {
        url += "q=*:*";
    } else {
        url += "q=" + encodeURI(escapeSolrQuery(query.search))
    }

    query.keyword.forEach((item) => {
        url += "&fq=keyword:\"" + encodeURI(item) + "\""
    });

    query.publisher.forEach((item) => {
        url += "&fq=publisherName:\"" + encodeURI(item) + "\""
    });

    query.format.forEach((item) => {
        url += "&fq=formatName:\"" + encodeURI(item) + "\""
    });

    if (query.sort === undefined) {
        url += "&sort=modified desc";
    } else {
        url += "&sort=" + query.sort;
    }

    return url;
}

function escapeSolrQuery(query) {
    // Convert to lowe case.
    query = query.toLocaleLowerCase();

    // Escape control characters
    const pattern = /([\!\*\+\-\=\<\>\&\|\(\)\[\]\{\}\^\~\?\:\\/"])/g;
    query = query.replace(pattern, "\\$1");

    // Escape control words (and, or, not).
    query = query.replace("and", "\\and");
    query = query.replace("or", "\\or");
    query = query.replace("not", "\\not");

    // Update query.
    const tokens = query.trim().split(" ").filter(value=>value.length > 0);
    if (tokens.length === 0){
        return "";
    }
    let solrQuery = "*" + tokens[0] + "*";
    for (let index = 1; index < tokens.length; ++index ) {
        solrQuery += " AND *" + tokens[index] + "*";
    }

    return solrQuery;
}

export function fetchDataRequest(query) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_LIST_PAGE_REQUEST,
        });
        const url = constructSearchQueryUrl(query);
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

export function setQueryString(value) {
    return {
        "type": SET_LIST_QUERY_STRING,
        "value": value
    };
}
