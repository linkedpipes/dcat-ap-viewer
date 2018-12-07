import {graph, triples} from "@/app-services/jsonld";
import {SKOS, DCTERMS, RDF, VCARD, FOAF, RDFS} from "@/app-services/vocabulary";

const initialState = {};

export const reducerName = "labels";

function reducer(state = initialState, action) {
    if (action["jsonld"] !== undefined) {
        return addFromJsonLd(state, action);
    } else if (action["$labels"] !== undefined) {
        return addFromLabels(state, action["$labels"]);
    } else {
        return state;
    }
}

export default reducer = {
    "name": reducerName,
    "reducer": reducer
};

function addFromJsonLd(state, action) {
    const resources = graph.getResources(action["jsonld"]);
    const result = {...state};
    resources.forEach((entity) => {
        const iri = triples.id(entity);

        const extractedLabels = {};
        merge(extractedLabels, triples.string(entity, SKOS.prefLabel));
        merge(extractedLabels, triples.string(entity, DCTERMS.title));
        merge(extractedLabels, triples.string(entity, RDF.label));
        merge(extractedLabels, triples.string(entity, VCARD.fn));
        merge(extractedLabels, triples.string(entity, FOAF.name));
        merge(extractedLabels, triples.string(entity, RDFS.label));

        if (Object.keys(extractedLabels).length === 0) {
            return;
        }

        result[iri] = {
            "@id": iri,
            ...state[iri],
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
        if (!newLabels.hasOwnProperty(key)) {
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

function addFromLabels(state, labels) {
    const result = {...state};
    labels.forEach((entity) => {
        const iri = entity["@id"];
        result[iri] = {
            "@id": iri,
            ...state[iri],
            ...entity["labels"]
        };
    });
    return result;
}

const reducerSelector = (state) => state[reducerName];

export function labelsSelector(state) {
    return reducerSelector(state);
}