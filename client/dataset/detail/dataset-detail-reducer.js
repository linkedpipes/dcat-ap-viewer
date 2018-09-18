import {
    MOUNT_DATASET_DETAIL_LIST,
    UNMOUNT_DATASET_DETAIL_LIST,
    FETCH_DATASET_REQUEST,
    FETCH_DATASET_SUCCESS,
    FETCH_DATASET_FAILED
} from "./dataset-detail-actions";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED
} from "@/app-services/http-request";


const reducerName = "dataset-detail";

function reducer(state = {}, action) {
    switch (action.type) {
        case MOUNT_DATASET_DETAIL_LIST:
            return onMount();
        case UNMOUNT_DATASET_DETAIL_LIST:
            return {};
        case FETCH_DATASET_REQUEST:
            return onDatasetRequest(state, action);
        case FETCH_DATASET_SUCCESS:
            return onDatasetRequestSuccess(state, action);
        case FETCH_DATASET_FAILED:
            return onDatasetRequestFailed(state, action);
        default:
            return state
    }
}

function onMount() {
    return {
        "status": STATUS_INITIAL,
        "dataset": undefined
    }
}

function onDatasetRequest(state, action) {
    return {
        ...state,
        "status": STATUS_FETCHING
    };
}

function onDatasetRequestSuccess(state, action) {
    return {
        ...state,
        "iri": action.iri,
        "status": STATUS_FETCHED,
        "dataset": {
            ...action.data
        }
    };
}

function onDatasetRequestFailed(state, action) {
    return {
        ...state,
        "status": action.error.status,
        "dataset": undefined
    };
}


export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

const reducerSelector = (state) => state[reducerName];

export function statusSelector(state) {
    return reducerSelector(state).status;
}

export function datasetSelector(state) {
    return reducerSelector(state).dataset;
}
