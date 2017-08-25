import React from "react";
import {fetchJson} from "./http-request"
import {triples, graph} from "./../services/jsonld"
import {SKOS} from "./../services/vocabulary"
import {getLanguage} from "./../application/navigation"

/*
Use @label property to store object with labels and @id to store object IRI.
*/

// export const SelectLabel = (WrappedComponent) => {
//     return class SelectLabelWrap extends React.Component {
//         render() {
//             console.log("SelectLabelWrap", this.props);
//             return (
//                 <WrappedComponent {...this.props}/>
//             );
//         }
//     }
// };

// TODO Remove default languages and use application option.
export const selectLabel = (value, languages) => {
    const labels = selectLabels(value, languages);
    if (labels.length > 1) {
        console.warn("Using only one label for:", value, "->", labels[0]);
    }
    return labels[0];
};

export const selectLabels = (value, languages) => {
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
    return (dispatch, getState) => {
        // TODO Use caching (getState).
        // dispatch(fetchLabelRequest(iri, identifier));
        const url = "api/v1/resource/codelist?iri=" + encodeURI(iri);
        fetchJson(url).then((data) => {
            // TODO Move error handling to another layer or backend?
            if (data === undefined || data.error) {
                console.warn("No data found for: ", iri);
                return;
            }
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

// const FETCH_REQUEST = "FETCH_REQUEST";
// function fetchLabelRequest(iri, identifier) {
//     return {
//         "type": FETCH_REQUEST,
//         "iri": iri,
//         "identifier": identifier
//     }
// }

export const FETCH_LABEL_SUCCESS = "FETCH_LABEL_SUCCESS";
function fetchLabelSuccess(iri, identifier, data) {
    return {
        "type": FETCH_LABEL_SUCCESS,
        "iri": iri,
        "identifier": identifier,
        "data": data
    }
}

const initialState = {
    // TODO Watch for active requests.
    // TODO Use local caching.
};

export const labelsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case FETCH_REQUEST:
        //     return state;
        case FETCH_LABEL_SUCCESS:
            return state;
    }
};
