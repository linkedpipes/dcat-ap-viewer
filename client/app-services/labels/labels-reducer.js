import {graph, triples} from "@/app-services/jsonld";
import {SKOS, DCTERMS, RDF, VCARD, FOAF} from "@/app-services/vocabulary";

// TODO Add round-robin for labels repository?

const initialState = {};

export const reducerName = "labels";

function reducer(state = initialState, action) {
    if (action["jsonld"] !== undefined) {
        return onJsonLd(state, action);
    }
    return state;
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

function onJsonLd(state, action) {
    const newLabels = {...state};
    addToLabels(action["jsonld"], newLabels);
    return newLabels;
}

function addToLabels(jsonld, labels) {
    const resources = graph.getResources(jsonld);
    const result = {};
    resources.forEach((entity) => {
        const iri = triples.id(entity);

        const extractedLabels = {};
        merge(extractedLabels, triples.string(entity, SKOS.prefLabel));
        merge(extractedLabels, triples.string(entity, DCTERMS.title));
        merge(extractedLabels, triples.string(entity, RDF.label));
        merge(extractedLabels, triples.string(entity, VCARD.fn));
        merge(extractedLabels, triples.string(entity, FOAF.name));

        if (extractedLabels.length === 0) {
            return;
        }

        labels[iri] = {
            "@id": iri,
            ...labels[iri],
            ...extractedLabels
        };
    });
    return result;
}

function merge(labels, newLabels) {
    if (newLabels === undefined) {
        return;
    }
    for (let key in newLabels) {
        if (!newLabels.hasOwnProperty(key) ) {
            continue;
        }
        // TODO Introduce some form of a merging strategy.
        const filteredNewValues = filterEmpty(newLabels[key]);
        if (filteredNewValues.length > 0) {
            labels[key] = filteredNewValues;
        }
    }
}

function filterEmpty(values) {
    return values.filter(value => value !== "")
}


const reducerSelector = (state) => state[reducerName];

export function labelsSelector(state) {
    return reducerSelector(state);
}