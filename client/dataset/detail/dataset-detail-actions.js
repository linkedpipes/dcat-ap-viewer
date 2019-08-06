import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "app-ui/loading-indicator";
import {
    fetchDatasetDetail,
    fetchLabelsForDataset,
    fetchDatasetQuality
} from "./dataset-api";
import {jsonLdToDataset} from "./jsonld-to-dataset";

export const MOUNT_DATASET_DETAIL_LIST = "MOUNT_DATASET_DETAIL_LIST";
export const UNMOUNT_DATASET_DETAIL_LIST = "UNMOUNT_DATASET_DETAIL_LIST";
export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
export const FETCH_DATASET_FAILED = "FETCH_DATASET_FAILED";
export const FETCH_DATASET_QUALITY_SUCCESS = "FETCH_DATASET_QUALITY_SUCCESS";
export const FETCH_DATASET_QUALITY_FAILED = "FETCH_DATASET_QUALITY_FAILED";

export function onMount() {
    return {
        "type": MOUNT_DATASET_DETAIL_LIST
    };
}

export function onUnMount() {
    return {
        "type": UNMOUNT_DATASET_DETAIL_LIST
    }
}

export function fetchDataset(iri) {
    return (dispatch) => {
        dispatch(fetchDatasetRequest(iri));
        fetchDatasetDetail(iri).then((jsonld) => {
            const dataset = jsonLdToDataset(jsonld);
            dispatch(fetchDatasetSuccess(iri, jsonld, dataset));
            fetchLabelsForDataset(dataset, dispatch);
            dispatch(fetchQuality(iri));
        }).catch((error) => dispatch(fetchDatasetFailed(iri, error)));
    };
}

function fetchDatasetRequest(iri) {
    return addLoaderStatusOn({
        "type": FETCH_DATASET_REQUEST,
        "iri": iri
    });
}

function fetchDatasetSuccess(iri, jsonld, data) {
    return addLoaderStatusOff({
        "type": FETCH_DATASET_SUCCESS,
        "iri": iri,
        "jsonld": jsonld,
        "data": data
    });
}

function fetchDatasetFailed(iri, error) {
    console.error("Can't fetch dataset.", error);
    return addLoaderStatusOff({
        "type": FETCH_DATASET_FAILED,
        "iri": iri,
        "error": error
    });
}

function fetchQuality(iri) {
    return (dispatch) => {
        fetchDatasetQuality(iri).then((jsonld) => {
            dispatch(fetchQualitySuccess(iri, jsonld));
        }).catch((error) => dispatch(fetchQualityFailed(iri, error)));
    };
}

function fetchQualitySuccess(iri, jsonld) {
    return {
        "type": FETCH_DATASET_QUALITY_SUCCESS,
        "dataset": iri,
        "data": jsonld
    }
}

function fetchQualityFailed(iri, error) {
    console.error("Can't fetch dataset's quality.", error);
    return {
        "type": FETCH_DATASET_QUALITY_FAILED,
        "dataset": iri,
        "error": error
    }
}

