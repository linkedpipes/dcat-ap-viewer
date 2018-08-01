import {graph, triples} from "../../../app-services/jsonld";
import {
    DCAT,
    DCTERMS,
    FOAF,
    OWL,
    ADMS,
    VCARD,
    SCHEMA,
    SPDX,
    PU,
    PU_VALUES_MAPPING
} from "../../../app-services/vocabulary";


// TODO Merge with action or leave in separated file.

export function jsonLdToDistribution(jsonld) {
    const distribution = graph.getByType(jsonld, DCAT.Distribution);
    if (distribution === undefined) {
        return undefined;
    }

    // TODO Change to getString with specific structure (object with languages).
    const mandatory = {
        "@id": triples.id(distribution),
        "accessURL": triples.resources(distribution, DCAT.accessURL),
        ...parseTermsOfUse(distribution, jsonld)
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
        "mediaType": triples.entity(distribution, DCAT.mediaType),
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

function parseTermsOfUse(distribution, jsonld) {
    const iri = triples.resource(distribution, PU.specification);
    const entity = graph.getByResource(jsonld, iri);

    const authorship = triples.resource(entity, PU.authorship);
    const author = triples.string(entity, PU.author);
    const databaseAuthorship = triples.resource(entity, PU.databaseAuthorship);
    const databaseAuthor = triples.string(entity, PU.databaseAuthor);
    const protectedDatabase = triples.resource(entity, PU.protectedDatabase);
    const personalData = triples.resource(entity, PU.personalData);

    return {
        "authorship":  mapTermsOfUseValue(authorship),
        "author":  author,
        "databaseAuthorship":  mapTermsOfUseValue(databaseAuthorship),
        "databaseAuthor":  databaseAuthor,
        "protectedDatabase":  mapTermsOfUseValue(protectedDatabase),
        "personalData":  mapTermsOfUseValue(personalData)
    };
}

function mapTermsOfUseValue(value) {
    const mapped = PU_VALUES_MAPPING[value];
    if (mapped === undefined) {
        return value;
    } else {
        return mapped;
    }
}