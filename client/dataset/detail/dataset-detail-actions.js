import {
    convertDatasetJsonLd,
    convertDistributionJsonLd
} from "../../services/rdf-to-entity";
import {fetchJson} from "../../services/http-request";
import {setApplicationLoader} from "../../application/app-action";
import Notifications from "react-notification-system-redux";
import {getString} from "./../../application/strings";

export const FETCH_DATASET_REQUEST = "FETCH_DATASET_REQUEST";
export function fetchDataset(iri) {
    return (dispatch) => {
        dispatch({
            "type": FETCH_DATASET_REQUEST,
            "iri": iri
        });
        let url = "/api/v1/resource/dataset?iri=" + encodeURI(iri);

        dispatch(setApplicationLoader(true));
        fetchJson(url, (json) => {
            dispatch(setApplicationLoader(false));
            // TODO Extractor to another layer.
            if (REPOSITORY_TYPE == "COUCHDB") {
                dispatch(fetchDatasetSuccess({"@graph": json["jsonld"]}));
            } else {
                dispatch(fetchDatasetSuccess(json));
            }
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
        fetchJson(url, (json) => {
                // TODO Extractor to another layer.
                if (REPOSITORY_TYPE == "COUCHDB") {
                    dispatch(fetchDistributionSuccess(iri,
                        {"@graph": json["jsonld"]}));
                } else {
                    dispatch(fetchDistributionSuccess(iri, json));
                }
            },
            (error) => {
                // TODO Move to fetchJson service
                dispatch(Notifications.error({
                    "uid": "e.serviceOffline",
                    "title": getString("e.serviceOffline"),
                    "position": "tr",
                    "autoDismiss": 4,
                }));
                return fetchDistributionFailed(iri, error);
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