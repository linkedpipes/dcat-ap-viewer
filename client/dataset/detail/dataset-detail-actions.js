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
    // TODO Use better conversion method, fix conversion of arrays.
    // TODO Export vocabulary.
    const distribution = [];
    if (Array.isArray(entity["http://www.w3.org/ns/dcat#distribution"])) {
        entity["http://www.w3.org/ns/dcat#distribution"].forEach((item) => {
            distribution.push(item["@id"]);
        });
    } else {
        distribution.push(
            entity["http://www.w3.org/ns/dcat#distribution"]["@id"]);
    }

    return {
        "iri": entity["@id"],
        "modified": entity["http://purl.org/dc/terms/modified"]["@value"],
        "accrualPeriodicity": entity["http://purl.org/dc/terms/accrualPeriodicity"]["@id"],
        "description": entity["http://purl.org/dc/terms/description"]["@value"],
        "issued": entity["http://purl.org/dc/terms/issued"]["@value"],
        "publisher": entity["http://purl.org/dc/terms/publisher"]["@id"],
        "spatial": entity["http://purl.org/dc/terms/spatial"]["@id"],
        "title": entity["http://purl.org/dc/terms/title"]["@value"],
        "keyword": entity["http://www.w3.org/ns/dcat#keyword"].map((value) => value["@value"]),
        "distribution": distribution,
        "contactPoint": entity["http://www.w3.org/ns/dcat#contactPoint"]["@id"],
        "temporal": entity["http://purl.org/dc/terms/temporal"]["@id"]
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
    // TODO Same as convertDatasetJsonLdToData
    return {
        "iri": entity["@id"],
        "description": entity["http://purl.org/dc/terms/description"]["@value"],
        "title": entity["http://purl.org/dc/terms/title"]["@value"],
        "format": readProperty(entity, "http://purl.org/dc/terms/format"),
        "license": entity["http://purl.org/dc/terms/license"]["@id"],
        "downloadURL": entity["http://www.w3.org/ns/dcat#downloadURL"]["@id"],
        "mediaType": entity["http://www.w3.org/ns/dcat#mediaType"]["@id"],
        "accessURL": entity["http://www.w3.org/ns/dcat#accessURL"]["@id"]
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