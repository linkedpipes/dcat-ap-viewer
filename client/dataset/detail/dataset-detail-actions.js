import {
    addLoaderStatusOn,
    addLoaderStatusOff
} from "app-components/loading-indicator";
import {
    fetchDatasetDetail,
    fetchLabelsForDataset,
} from "./dataset-api";
import {jsonLdToDataset} from "./jsonld-to-dataset";

export const MOUNT_DATASET_DETAIL_LIST = "MOUNT_DATASET_DETAIL_LIST";
export const UNMOUNT_DATASET_DETAIL_LIST = "UNMOUNT_DATASET_DETAIL_LIST";
export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
export const FETCH_DATASET_FAILED = "FETCH_DATASET_FAILED";


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
            dispatch(fetchDatasetSuccess(jsonld, dataset));
            fetchLabelsForDataset(dataset, dispatch);
        }).catch((error) => dispatch(fetchDatasetFailed(error)));
    };
}

function fetchDatasetRequest(iri) {
    return addLoaderStatusOn({
        "type": FETCH_DATASET_REQUEST,
        "iri": iri
    });
}

function fetchDatasetSuccess(jsonld, data) {
    return addLoaderStatusOff({
        "type": FETCH_DATASET_SUCCESS,
        "jsonld": jsonld,
        "data": data
    });
}

function fetchDatasetFailed(error) {
    // TODO Add API for handling errors!
    console.error("fetchFailed", error);
    return addLoaderStatusOff({
        "type": FETCH_DATASET_FAILED,
        "error": error
    });
}
