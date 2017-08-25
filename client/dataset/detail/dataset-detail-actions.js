import {fetchJsonCallback} from "../../services/http-request";
import {setApplicationLoader} from "../../application/app-action";
import Notifications from "react-notification-system-redux";
import {getString} from "./../../application/strings";
import {jsonLdToDataset, requestLabelsForDataset} from "./jsonld-to-dataset";
import {
    jsonLdToDistribution,
    requestLabelsForDistribution
} from "./jsonld-to-distribution";

export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export function fetchDataset(iri) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_DATASET_REQUEST,
            "iri": iri
        });
        let url = "/api/v1/resource/dataset?iri=" + encodeURI(iri);
        dispatch(setApplicationLoader(true));
        fetchJsonCallback(url, (json) => {
            dispatch(setApplicationLoader(false));
            // TODO Extractor to another layer.
            let data;
            if (REPOSITORY_TYPE == "COUCHDB") {
                data = jsonLdToDataset({"@graph": json["jsonld"]});
            } else {
                data = jsonLdToDataset(json);
            }
            dispatch(fetchDatasetSuccess(data));
            requestLabelsForDataset(data, dispatch);
        }, (error) => {
            dispatch(setApplicationLoader(false));
            dispatch(fetchDatasetFailed(error));
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

export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
function fetchDatasetSuccess(data) {
    return {
        "type": FETCH_DATASET_SUCCESS,
        "data": data
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
        fetchJsonCallback(url, (json) => {
                // TODO Extractor to another layer.
                let data;
                if (REPOSITORY_TYPE == "COUCHDB") {
                    data = jsonLdToDistribution({"@graph": json["jsonld"]});
                } else {
                    data = jsonLdToDistribution(json);
                }
                dispatch(fetchDistributionSuccess(iri, data));
                requestLabelsForDistribution(data, dispatch);
            },
            (error) => {
                // TODO Move to fetchJson service
                dispatch(Notifications.error({
                    "uid": "e.serviceOffline",
                    "title": getString("e.serviceOffline"),
                    "position": "tr",
                    "autoDismiss": 4,
                }));
                dispatch(fetchDistributionFailed(iri, error));
            });
    };
}

export const FETCH_DISTRIBUTION_SUCCESS = "FETCH_DISTRIBUTION_SUCCESS";
function fetchDistributionSuccess(iri, data) {
    return {
        "type": FETCH_DISTRIBUTION_SUCCESS,
        "iri": iri,
        "data": data
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