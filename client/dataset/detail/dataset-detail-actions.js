import {fetchJsonCallback} from "../../services/http-request";
import {jsonLdToDataset, requestLabelsForDataset} from "./jsonld-to-dataset";
import {
    jsonLdToDistribution,
    requestLabelsForDistribution
} from "./jsonld-to-distribution";
import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "../../components/loading-indicator";

export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
export const FETCH_DATASET_FAILED = "FETCH_DATASET_FAILED";
export const FETCH_DISTRIBUTION_REQUEST = "FETCH_DISTRIBUTION_REQUEST";
export const FETCH_DISTRIBUTION_SUCCESS = "FETCH_DISTRIBUTION_SUCCESS";
export const FETCH_DISTRIBUTION_FAILED = "FETCH_DISTRIBUTION_FAILED";
export const SET_DISTRIBUTION_PAGE_INDEX = "SET_DISTRIBUTION_PAGE_INDEX";
export const SET_DISTRIBUTION_PAGE_SIZE = "SET_DISTRIBUTION_PAGE_SIZE";

export function fetchDataset(iri) {
    return (dispatch) => {
        dispatch(fetchDatasetRequest(iri));
        const url = "/api/v1/resource/dataset?iri=" + encodeURI(iri);
        fetchJsonCallback(url, (json) => {
            const data = jsonLdToDataset(normalizeData(json));
            dispatch(fetchDatasetSuccess(data));
            requestLabelsForDataset(data, dispatch);
        }, (error) => {
            dispatch(fetchDatasetFailed(error));
        });
    };
}

// TODO Extract to some API file.
function normalizeData(data) {
    if (REPOSITORY_TYPE == "COUCHDB") {
        return {"@graph": data["jsonld"]};
    } else {
        return data;
    }
}

function fetchDatasetRequest(iri) {
    return addLoaderStatusOn({
        "type": FETCH_DATASET_REQUEST,
        "iri": iri
    });
}

function fetchDatasetSuccess(data) {
    return addLoaderStatusOff({
        "type": FETCH_DATASET_SUCCESS,
        "data": data
    });
}

function fetchDatasetFailed(error) {
    return addLoaderStatusOff({
        "type": FETCH_DATASET_FAILED,
        "error": error
    });
}

export function fetchDistribution(iri) {
    return (dispatch) => {
        dispatch(fetchDistributionRequest(iri));
        let url = "/api/v1/resource/distribution?iri=" + encodeURI(iri);
        fetchJsonCallback(url, (json) => {
            const data = jsonLdToDistribution(normalizeData(json));
            dispatch(fetchDistributionSuccess(iri, data));
            requestLabelsForDistribution(data, dispatch);
        }, (error) => {
            dispatch(fetchDistributionFailed(iri, error));
        });
    };
}

function fetchDistributionRequest(iri) {
    return {
        "type": FETCH_DISTRIBUTION_REQUEST,
        "iri": iri
    }
}

function fetchDistributionSuccess(iri, data) {
    return {
        "type": FETCH_DISTRIBUTION_SUCCESS,
        "iri": iri,
        "data": data
    }
}

function fetchDistributionFailed(iri, error) {
    return {
        "type": FETCH_DISTRIBUTION_FAILED,
        "iri": iri,
        "error": error
    }
}

export function setDistributionPageIndex(page) {
    return {
        "type": SET_DISTRIBUTION_PAGE_INDEX,
        "page": page
    }
}

export function setDistributionPageSize(size) {
    return {
        "type": SET_DISTRIBUTION_PAGE_SIZE,
        "size": size
    }
}
