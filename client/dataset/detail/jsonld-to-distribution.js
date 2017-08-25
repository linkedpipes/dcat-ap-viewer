import {graph, triples} from "./../../services/jsonld";
import {
    DCAT,
    DCTERMS,
    FOAF,
    OWL,
    ADMS,
    VCARD,
    SCHEMA,
    SPDX
} from "./../../services/vocabulary";
import {fetchLabel} from "./../../services/labels";


// TODO Merge with action or leave in separated file.

export function jsonLdToDistribution(jsonld) {
    const distribution = graph.getByType(jsonld, DCAT.Distribution);
    if (distribution === undefined) {
        return undefined;
    }

    // TODO Change to getString with specific structure (object with languages).
    const mandatory = {
        "@id": triples.id(distribution),
        "accessURL": triples.resources(distribution, DCAT.accessURL)
    };

    const recommended = {
        "description": triples.string(distribution, DCTERMS.description),
        "format": triples.entity(distribution, DCTERMS.format),
        "license": triples.resource(distribution, DCTERMS.license)
    };

    const optional = {
        "byteSize": triples.value(distribution, DCAT.byteSize),
        "checksum": triples.resource(distribution, SPDX.checksum),
        "documentation": triples.resources(distribution, FOAF.page),
        "downloadURL": triples.resources(distribution, DCAT.downloadURL),
        "language": triples.resources(distribution, DCTERMS.language),
        "conformsTo": triples.resources(distribution, DCTERMS.conformsTo),
        "mediaType": triples.resource(distribution, DCAT.mediaType),
        "issued": triples.value(distribution, DCTERMS.issued),
        "rights": triples.resource(distribution, DCTERMS.rights),
        "status": triples.resource(distribution, ADMS.status),
        "title": triples.values(distribution, DCTERMS.title),
        "modified": triples.resource(distribution, DCTERMS.modified)
    };

    const extension = {
        "type": triples.resource(distribution, DCTERMS.type)
    };

    return {...mandatory, ...recommended, ...optional, ...extension};
}

// TODO Export generalized version to other layer.
export function requestLabelsForDistribution(entity, dispatch) {
    const iri = entity["@id"];
    const properties = ["format"];
    properties.forEach((property) => {
        const value = entity[property];
        if (value === undefined) {
            return;
        } else if (Array.isArray(value)) {
            for (let index in value) {
                dispatchLabelRequest(dispatch, value[index]["@id"], {
                    "target": "distribution",
                    "key": property,
                    "index": index,
                    "iri": iri
                });
            }
        } else {
            dispatchLabelRequest(dispatch, value["@id"], {
                "target": "distribution",
                "key": property,
                "iri": iri
            });
        }
    });
}

function dispatchLabelRequest(dispatch, iri, identifier) {
    dispatch(fetchLabel(iri, identifier));
}