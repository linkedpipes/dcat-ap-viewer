import {fetchJsonCallback} from "../../services/http-request";
import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "../../application/app-action";

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

function constructSearchQueryUrl(query) {
    let url = "api/v1/solr/query?" +
        "facet.field=keyword&" +
        "facet.field=formatName&" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&";

    const start = query.page * query.pageSize;
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

    url += "&rows=" + query.pageSize;

    if (query.temporalStart === "") {
        if (query.temporalEnd === "") {
            // No temporal limits.
        } else {
            // Only temporal end is set.
            url += "&fq=temporal-start:%5B+*+TO+" + query.temporalEnd + "T00%5C:00%5C:00Z+%5D";
        }
    } else {
        if (query.temporalEnd === "") {
            // Only temporal start is set.
            url += "&fq=temporal-end:%5B+" + query.temporalStart+ "T00%5C:00%5C:00Z+TO+*+%5D";
        } else {
            // Both temporal values are set.
            url += "&fq=temporal-start:%5B+*+TO+" + query.temporalStart + "T00%5C:00%5C:00Z+%5D";
            url += "&fq=temporal-end:%5B+" + query.temporalEnd + "T00%5C:00%5C:00Z+TO+*+%5D";
        }
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
    const tokens = query.trim().split(" ").filter(value => value.length > 0);
    if (tokens.length === 0) {
        return "";
    }
    let solrQuery = "*" + tokens[0] + "*";
    for (let index = 1; index < tokens.length; ++index) {
        solrQuery += " AND *" + tokens[index] + "*";
    }

    return solrQuery;
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
