export const FETCH_LIST_PAGE_REQUEST = "FETCH_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_LIST_PAGE_FAILED";

export const SET_LIST_QUERY_STRING = "SET_LIST_QUERY_STRING";
export const SET_LIST_QUERY_FILTER = "SET_LIST_QUERY_FILTER";
export const SET_LIST_FACET_FILTER = "SET_LIST_FACET_FILTER";
export const SET_LIST_PAGE = "SET_LIST_PAGE";

export function fetchDataRequest(query) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_LIST_PAGE_REQUEST,
        });

        const start = query.page * 10;

        let url = "http://localhost:3000/api/v1/solr/query?" +
            "facet.field=keyword&" +
            "facet.field=publisherName&" +
            "facet=true&" +
            "facet.mincount=1&" +
            "&start=" + start + "&";

        if (query.search === undefined || query.search === "") {
            url += "q=*:*";
        } else {
            console.log(query.search, encodeURI(query.search));
            url += "q=" + encodeURI(query.search)
        }

        query.keyword.forEach((item) => {
            url += "&fq=keyword:\"" + encodeURI(item) + "\""

        });

        query.publisher.forEach((item) => {
            url += "&fq=publisherName:\"" + encodeURI(item) + "\""

        });

        fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.error === undefined) {
                dispatch(fetchDataSuccess(json));
            } else {
                dispatch(fetchDataFailed(error));
            }
        // TODO Handle exceptions
        // }).catch((error) => {
        //     dispatch(fetchDataFailed(error));
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

export function setListQueryString(value) {
    return {
        "type": SET_LIST_QUERY_STRING,
        "value": value
    };
}

export function setListQueryFilter(value) {
    return {
        "type": SET_LIST_QUERY_FILTER,
        "value": value
    };
}

export function setListFacetFilter(facet, value) {
    return {
        "type": SET_LIST_FACET_FILTER,
        "facet": facet,
        "value": value
    };
}

export function setListPage(page) {
    return {
        "type": SET_LIST_PAGE,
        "page": page
    };
}
