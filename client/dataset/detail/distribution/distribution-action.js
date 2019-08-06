import {
    fetchDistributionDetail,
    fetchLabelsForDistribution
} from "./distribution-api";
import {jsonLdToDistribution} from "./jsonld-to-distribution";
import {fetchDatasetQuality} from "@/dataset/detail/dataset-api";

export const MOUNT_DISTRIBUTION = "MOUNT_DISTRIBUTION";
export const UNMOUNT_DISTRIBUTION = "UNMOUNT_DISTRIBUTION";

export const FETCH_DISTRIBUTION_REQUEST = "FETCH_DISTRIBUTION_REQUEST";
export const FETCH_DISTRIBUTION_SUCCESS = "FETCH_DISTRIBUTION_SUCCESS";
export const FETCH_DISTRIBUTION_FAILED = "FETCH_DISTRIBUTION_FAILED";

export const SET_DISTRIBUTION_PAGE_INDEX = "SET_DISTRIBUTION_PAGE_INDEX";
export const SET_DISTRIBUTION_PAGE_SIZE = "SET_DISTRIBUTION_PAGE_SIZE";

export const FETCH_DISTRIBUTION_QUALITY_SUCCESS =
    "FETCH_DISTRIBUTION_QUALITY_SUCCESS";
export const FETCH_DISTRIBUTION_QUALITY_FAILED =
    "FETCH_DISTRIBUTION_QUALITY_FAILED";

export function onMount() {
    return {
        "type": MOUNT_DISTRIBUTION
    };
}

export function onUnMount() {
    return {
        "type": UNMOUNT_DISTRIBUTION
    }
}

export function fetchDistribution(iri) {

    return (dispatch) => {
        dispatch(fetchDistributionRequest(iri));
        fetchDistributionDetail(iri).then((jsonld) => {
            const distribution = jsonLdToDistribution(jsonld);
            dispatch(fetchDistributionSuccess(iri, jsonld, distribution));
            fetchLabelsForDistribution(distribution, dispatch);
            dispatch(fetchQuality(iri));
        }).catch((error) => dispatch(fetchDistributionFailed(iri, error)));
    };
}

function fetchDistributionRequest(iri) {
    return {
        "type": FETCH_DISTRIBUTION_REQUEST,
        "iri": iri
    }
}

function fetchDistributionSuccess(iri, jsonld, distribution) {
    return {
        "type": FETCH_DISTRIBUTION_SUCCESS,
        "iri": iri,
        "jsonld": jsonld,
        "distribution": distribution
    }
}

function fetchDistributionFailed(iri, error) {
    return {
        "type": FETCH_DISTRIBUTION_FAILED,
        "iri": iri,
        "error": error
    }
}

export function setPage(page) {
    return {
        "type": SET_DISTRIBUTION_PAGE_INDEX,
        "page": page
    }
}

export function setPageSize(size) {
    return {
        "type": SET_DISTRIBUTION_PAGE_SIZE,
        "size": size
    }
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
        "type": FETCH_DISTRIBUTION_QUALITY_SUCCESS,
        "iri": iri,
        "data": jsonld
    }
}

function fetchQualityFailed(iri, error) {
    console.error("Can't fetch distribution's quality.", error);
    return {
        "type": FETCH_DISTRIBUTION_QUALITY_FAILED,
        "iri": iri,
        "error": error
    }
}

