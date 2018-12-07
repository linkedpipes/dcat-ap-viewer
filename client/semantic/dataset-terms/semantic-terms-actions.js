import {fetchJsonLd} from "@/app-services/http-request";
import {graph, triples} from "app-services/jsonld";
import {DCELEMENTS} from "@/app-services/vocabulary";
import {FEL} from "@/app-services/vocabulary-semantic";

export const MOUNT = "SEMANTIC_TERMS_MOUNT";
export const UNMOUNT = "SEMANTIC_TERMS_UNMOUNT";

export const FETCH_TERMS = "FETCH_TERMS";
export const FETCH_TERMS_SUCCESS = "FETCH_TERMS_SUCCESS";
export const FETCH_TERMS_FAILED = "FETCH_TERMS_FAILED";

const BASE_TERMS_URL = "http://kbss.felk.cvut.cz/termit-server-dev/rest/resources/resource/terms?iri=";

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
        const url = BASE_TERMS_URL + encodeURIComponent(iri);
        fetchJsonLd(url)
            .then(response => dispatch(fetchSuccess(iri, response)))
            .catch(error => dispatch(fetchFailed(iri, error)));
    };

}

function fetchStart() {
    return {
        "type": FETCH_TERMS
    }
}

function fetchSuccess(dataset, response) {
    const terms = [];

    graph.forEachResource(response["jsonld"], (resource) => {
        terms.push({
            "@id": triples.id(resource),
            "source": triples.value(resource, DCELEMENTS.source),
            "vocabulary": triples.resource(resource, FEL.jePojmemZeSlovniku)
        })
    });

    return {
        "type": FETCH_TERMS_SUCCESS,
        "dataset": dataset,
        "jsonld": response["jsonld"],
        "terms": terms
    }
}

function fetchFailed(dataset, error) {
    return {
        "type": FETCH_TERMS_FAILED,
        "dataset": dataset,
        "error": error
    }
}