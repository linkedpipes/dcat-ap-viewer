import {triples} from "../../services/jsonld"
import {DCAT, DCTERMS} from "../../services/vocabulary"

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

function convertDatasetJsonLdToData(jsonld) {
    const entity = jsonld["@graph"][0];
    return {
        "iri": triples.getId(entity),
        "modified": triples.getValue(entity, DCTERMS.modified),
        "accrualPeriodicity": triples.getResource(entity, DCTERMS.accrualPeriodicity),
        "description": triples.getValue(entity, DCTERMS.description),
        "issued": triples.getValue(entity, DCTERMS.issued),
        "publisher": triples.getResource(entity, DCTERMS.publisher),
        "spatial": triples.getResource(entity, DCTERMS.spatial),
        "title": triples.getValue(entity, DCTERMS.title),
        "keyword": triples.getValues(entity, DCAT.keyword),
        "distribution": triples.getResources(entity, DCAT.distribution),
        "contactPoint": triples.getResource(entity, DCAT.contactPoint),
        "temporal": triples.getResource(entity, DCTERMS.temporal)
    }
}

export const FETCH_DATASET_SUCCESS = "FETCH_DATASET_SUCCESS";
function fetchDatasetSuccess(jsonld) {
    return {
        "type": FETCH_DATASET_SUCCESS,
        "data": convertDatasetJsonLdToData(jsonld)
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

function convertDistributionJsonLdToData(jsonld) {
    const entity = jsonld["@graph"][0];
    return {
        "iri": triples.getId(entity),
        "description": triples.getValue(entity, DCTERMS.description),
        "title": triples.getValue(entity, DCTERMS.title),
        "format": triples.getResource(entity, DCTERMS.format),
        "license": triples.getResource(entity, DCTERMS.license),
        "downloadURL": triples.getResource(entity, DCAT.downloadURL),
        "mediaType": triples.getResource(entity, DCAT.mediaType),
        "accessURL": triples.getResource(entity, DCAT.accessURL)
    }
}

// TODO Use JSON-LD helper
function readProperty(entity, property) {
    if (entity[property] === undefined) {
        return undefined;
    } else {
        return entity[property]["@id"];
    }

}

export const FETCH_DISTRIBUTION_SUCCESS = "FETCH_DISTRIBUTION_SUCCESS";
function fetchDistributionSuccess(iri, jsonld) {
    return {
        "type": FETCH_DISTRIBUTION_SUCCESS,
        "iri": iri,
        "data": convertDistributionJsonLdToData(jsonld)
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