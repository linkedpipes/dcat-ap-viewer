export const FETCH_LIST_PAGE_REQUEST = "FETCH_ORGANISATION_LIST_PAGE_REQUEST";
export const FETCH_LIST_PAGE_SUCCESS = "FETCH_ORGANISATION_LIST_PAGE_SUCCESS";
export const FETCH_LIST_PAGE_FAILED = "FETCH_ORGANISATION_LIST_PAGE_FAILED";

function constructQueryUrl() {
    let url = "api/v1/solr/query?" +
        "facet.field=keyword&" +
        "facet.field=publisherName&" +
        "facet=true&" +
        "facet.mincount=1&" +
        "q=*:*";
    return url;
}

export function fetchDataRequest() {
    return (dispatch) => {
        dispatch({
            "type": FETCH_LIST_PAGE_REQUEST,
        });
        const url = constructQueryUrl();
        fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            dispatch(fetchDataSuccess(json));
        }).catch((error) => {
            dispatch(fetchDataFailed(error));
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
    console.log(error);
    return {
        "type": FETCH_LIST_PAGE_FAILED,
        "data": error
    };
}
