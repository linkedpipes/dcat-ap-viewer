import {fetchJson} from "app-services/http-request";
import {fetchLabel} from "app-services/labels";

export function fetchDatasetDetail(iri) {
    const url = "/api/v1/resource/dataset?iri=" + encodeURI(iri);
    return fetchJson(url).then((response) => {
        return normalizeData(response.json);
    });
}

function normalizeData(data) {
    if (REPOSITORY_TYPE === "COUCHDB") {
        return {"@graph": data["jsonld"]};
    } else {
        return data;
    }
}

// TODO Generalize and merge with distributions.
export function fetchLabelsForDataset(entity, dispatch) {
    const properties = ["themes", "frequency", "spatial"];
    properties.forEach((property) => {
        const value = entity[property];
        if (value === undefined) {
            return;
        } else if (Array.isArray(value)) {
            for (let index in value) {
                if (!value.hasOwnProperty(index)) {
                    continue;
                }
                dispatchLabelRequest(dispatch, value[index]["@id"], {
                    "target": "dataset",
                    "key": property,
                    "index": index
                });
            }
        } else {
            dispatchLabelRequest(dispatch, value["@id"], {
                "target": "dataset",
                "key": property
            });
        }
    });
}

function dispatchLabelRequest(dispatch, iri, identifier) {
    dispatch(fetchLabel(iri, identifier));
}
