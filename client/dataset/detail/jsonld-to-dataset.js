import {graph, triples} from "./../../services/jsonld";
import {
    DCAT,
    DCTERMS,
    FOAF,
    OWL,
    ADMS,
    VCARD,
    SCHEMA
} from "./../../services/vocabulary";
import {fetchLabel} from "./../../services/labels";

// TODO Merge with action or leave in separated file.

export function jsonLdToDataset(jsonld) {
    const dataset = graph.getByType(jsonld, DCAT.Dataset);

    // TODO Change to getString with specific structure (object with languages).
    const mandatory = {
        "@id": triples.id(dataset),
        "title": triples.string(dataset, DCTERMS.title),
        "description": triples.string(dataset, DCTERMS.description)
    };

    const recommended = {
        "contactPoints": loadContactPoints(jsonld, dataset),
        "distributions": triples.resources(dataset, DCAT.distribution),
        "keywords": triples.string(dataset, DCAT.keyword),
        "publisher": loadPublisher(jsonld, dataset),
        "themes": triples.entities(dataset, DCAT.theme)
    };

    // TODO Check usage of getValue
    const optional = {
        "accessRights": triples.resources(dataset, DCTERMS.accessRights),
        "conformsTo": triples.resources(dataset, DCTERMS.conformsTo),
        "documentation": triples.resources(dataset, FOAF.page),
        "frequency": triples.entity(dataset, DCTERMS.accrualPeriodicity),
        "hasVersion": triples.resource(dataset, DCTERMS.hasVersion),
        "identifier": triples.values(dataset, DCTERMS.identifier),
        "isVersionOf": triples.resource(dataset, DCTERMS.isVersionOf),
        "landingPage": triples.resource(dataset, DCAT.landingPage),
        "language": triples.entity(dataset, DCTERMS.language),
        "otherIdentifier": triples.entity(dataset, ADMS.identifier),
        "provenance": triples.resource(dataset, DCTERMS.provenance),
        "relation": triples.resource(dataset, DCTERMS.relation),
        "issued": triples.value(dataset, DCTERMS.issued),
        "sample": triples.resource(dataset, ADMS.sample),
        "source": triples.resource(dataset, DCTERMS.source),
        "spatial": triples.entity(dataset, DCTERMS.spatial),
        "temporal": loadTemporal(jsonld, dataset),
        "type": triples.value(dataset, DCTERMS.type),
        "modified": triples.value(dataset, DCTERMS.modified),
        "version": triples.value(dataset, OWL.versionInfo),
        "versionNotes": triples.value(dataset, ADMS.versionNotes)
    };

    const catalog = graph.getByType(jsonld, DCAT.Catalog) || {};
    const catalogRecord = graph.getByType(jsonld, DCAT.CatalogRecord) || {};
    const external = {
        "catalog": triples.id(catalog),
        "catalogSource": triples.resource(catalogRecord, DCTERMS.source)
    };

    return {...mandatory, ...recommended, ...optional, ...external};
}

function loadContactPoints(jsonld, dataset) {
    const contactPointIris = triples.resources(dataset, DCAT.contactPoint);
    return contactPointIris.map((iri) => loadContactPoint(jsonld, iri));
}

function loadContactPoint(jsonld, contactPointIri) {
    const contactPoint = graph.getByResource(jsonld, contactPointIri);
    return {
        "iri": triples.id(contactPoint),
        "label": triples.string(contactPoint, VCARD.fn),
        "email": triples.values(contactPoint, VCARD.hasEmail)
    };
}

function loadPublisher(jsonld, dataset) {
    const publisherIri = triples.resource(dataset, DCTERMS.publisher);
    const publisher = graph.getByResource(jsonld, publisherIri) || {};

    return {
        "@id": triples.resource(dataset, DCTERMS.publisher),
        ...triples.string(publisher, "http://xmlns.com/foaf/0.1/name")
    };
}

function loadTemporal(jsonld, dataset) {
    const temporalIri = triples.resource(dataset, DCTERMS.temporal);
    const temporal = graph.getByResource(jsonld, temporalIri);
    if (temporal === undefined) {
        return undefined;
    } else {
        return {
            "iri": temporalIri,
            "startDate": triples.value(temporal, SCHEMA.startDate),
            "endDate": triples.value(temporal, SCHEMA.endDate)
        };
    }
}

// TODO Export generalized version to other layer.
export function requestLabelsForDataset(entity, dispatch) {
    const properties = ["themes", "frequency", "spatial"];
    properties.forEach((property) => {
        const value = entity[property];
        if (value === undefined) {
            return;
        } else if (Array.isArray(value)) {
            for (let index in value) {
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