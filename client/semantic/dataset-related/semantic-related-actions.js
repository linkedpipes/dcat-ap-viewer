import {fetchJsonLd} from "@/app-services/http-request";
import {graph, triples} from "app-services/jsonld";
import {DCELEMENTS} from "@/app-services/vocabulary";
import {FEL} from "@/app-services/vocabulary-semantic";

export const MOUNT = "SEMANTIC_RELATED_MOUNT";
export const UNMOUNT = "SEMANTIC_RELATED_UNMOUNT";

export const FETCH_RELATED = "FETCH_RELATED";
export const FETCH_RELATED_SUCCESS = "FETCH_RELATED_SUCCESS";
export const FETCH_RELATED_FAILED = "FETCH_RELATED_FAILED";

export function onMount() {
    return {
        "type": MOUNT
    }
}

export function onUnMount() {
    return {
        "type": UNMOUNT
    }
}

export function fetch(iri) {
    return (dispatch) => {
        dispatch(fetchStart());
        const url = "https://kbss.felk.cvut.cz/termit-server-dev/rest/resources/resource/related?iri=" + iri;
        fetchJsonLd(url)
            .then(response => dispatch(fetchSuccess(iri, response)))
            .catch(error => dispatch(fetchFailed(iri, error)));
    };

}

function fetchStart() {
    return {
        "type": FETCH_RELATED
    }
}

function fetchSuccess(dataset, response) {
    const related = [];

    graph.forEachResource(response["jsonld"], (resource) => {
        related.push({"@id": triples.id(resource)})
    });

    return {
        "type": FETCH_RELATED_SUCCESS,
        "dataset": dataset,
        "jsonld": response["jsonld"],
        "related": related
    }
}

function fetchFailed(dataset, error) {
    return {
        "type": FETCH_RELATED_FAILED,
        "dataset": dataset,
        "error": error
    }
}