import {
    convertDatasetJsonLd,
    convertDistributionJsonLd
} from "../../services/rdf-to-entity";

export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export function fetchDataset(iri) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_DATASET_REQUEST,
            "iri": iri
        });
        // TODO Extract HTTP query into special function
        let url = "/api/v1/resource/dataset?iri=" + encodeURI(iri);
        fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.error === undefined) {
                dispatch(fetchDatasetSuccess(json));
            }
            // TODO Add error handling
            // }).catch((error) => {
            //     dispatch(fetchDatasetFailed(error));
        });
    };
}

export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
function fetchDatasetSuccess(jsonld) {
    return {
        "type": FETCH_DATASET_SUCCESS,
        "data": convertDatasetJsonLd(jsonld)
    }
}

export const FETCH_DATASET_FAILED = "FETCH_DATASET_FAILED";
function fetchDatasetFailed(error) {
    return {
        "type": FETCH_DATASET_FAILED,
        "error": error
    }
}

export const FETCH_DISTRIBUTION_REQUEST = "FETCH_DISTRIBUTION_REQUEST";
export function fetchDistribution(iri) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_DISTRIBUTION_REQUEST,
            "iri": iri
        });
        let url = "/api/v1/resource/distribution?iri=" + encodeURI(iri);
        fetch(url).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.error === undefined) {
                dispatch(fetchDistributionSuccess(iri, json));
            }
            // TODO Add error handling
            // }).catch((error) => {
            //     dispatch(fetchDistributionFailed(iri, error));
        });
    };
}

export const FETCH_DISTRIBUTION_SUCCESS = "FETCH_DISTRIBUTION_SUCCESS";
function fetchDistributionSuccess(iri, jsonld) {
    return {
        "type": FETCH_DISTRIBUTION_SUCCESS,
        "iri": iri,
        "data": convertDistributionJsonLd(jsonld)
    }
}

export const FETCH_DISTRIBUTION_FAILED = "FETCH_DISTRIBUTION_FAILED";
function fetchDistributionFailed(iri, error) {
    return {
        "type": FETCH_DISTRIBUTION_FAILED,
        "iri": iri,
        "error": error
    }
}

export const SET_DISTRIBUTION_PAGE_INDEX = "SET_DISTRIBUTION_PAGE_INDEX";
export function setDistributionPageIndex(page) {
    return {
        "type": SET_DISTRIBUTION_PAGE_INDEX,
        "page": page
    }
}