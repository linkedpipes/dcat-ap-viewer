import {fetchJsonCallback} from "../http-request";

export const FETCH_LABEL_SUCCESS = "FETCH_LABEL_SUCCESS";

export const fetchLabel = (iri) => {
    const url = "api/v1/resource/codelist?iri=" + encodeURI(iri);
    return (dispatch) => {
        // TODO Use caching.
        // TODO Update to use Promises instead of callbacks.
        fetchJsonCallback(url, (data) => {
            const jsonld = normalizeJsonLd(data);
            dispatch(fetchLabelSuccess(jsonld));
        }, () => {
            console.warn("Codelist request failed for : ", iri);
        });
    }
};

// TODO Extract to another layer.
function normalizeJsonLd(data) {
    if (REPOSITORY_TYPE === "COUCHDB") {
        return {"@graph": data["jsonld"]};
    } else {
        return data;
    }
}

function fetchLabelSuccess(jsonld) {
    return {
        "type": FETCH_LABEL_SUCCESS,
        "jsonld": jsonld
    }
}