import React from "react";
import {fetchJsonCallback} from "./http-request"
import {triples, graph} from "./../services/jsonld"
import {SKOS} from "./../services/vocabulary"
import {getLanguage} from "./../application/navigation"

// TODO Remove default languages and use application option.
export const selectLabel = (value, languages) => {
    const labels = selectLabels(value, languages);
    if (labels.length > 1) {
        console.warn("Using only one label for:", value, "->", labels[0]);
    }
    return labels[0];
};

export const selectLabels = (value, languages) => {
    // TODO Remove checks and make sure that the data model is ok,or include only in some modes?
    if (value === undefined) {
        return [];
    }
    if (languages === undefined) {
        languages = getLanguagePreferences();
    }

    for (let index in languages) {
        const lang = languages[index];
        const labels = value[lang];
        if (labels === undefined) {
            continue;
        }
        return labels;
    }

    const keys = Object.keys(value);
    for (let index in keys) {
        const key = keys[index];
        if (key !== "@id") {
            return value[key];
        }
    }

    return [value["@id"]];
};

function getLanguagePreferences() {
    return [
        getLanguage(), "en", ""
    ]
}

export function fetchLabel(iri, identifier) {
    return (dispatch) => {
        // TODO Use caching.
        const url = "api/v1/resource/codelist?iri=" + encodeURI(iri);
        fetchJsonCallback(url, (data) => {
            // TODO Extract to another layer.
            if (REPOSITORY_TYPE == "COUCHDB") {
                data = {"@graph": data["jsonld"]};
            }
            const labels = extractLabels(data, iri);
            if (labels === undefined) {
                console.warn("No labels found for: ", iri);
            } else {
                dispatch(fetchLabelSuccess(iri, identifier, labels));
            }
        }, (error) => {
            console.warn("No data found for: ", iri, error);
        });
    };
}

function extractLabels(jsonld, entityIri) {
    const entity = graph.getByResource(jsonld, entityIri);
    if (entity === undefined) {
        return undefined;
    }
    return triples.string(entity, SKOS.prefLabel);
}

export const FETCH_LABEL_SUCCESS = "FETCH_LABEL_SUCCESS";
function fetchLabelSuccess(iri, identifier, data) {
    return {
        "type": FETCH_LABEL_SUCCESS,
        "iri": iri,
        "identifier": identifier,
        "data": data
    }
}

