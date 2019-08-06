import {graph, triples} from "../../../app-services/jsonld";
import {
    DCAT,
    DCTERMS,
    FOAF,
    ADMS,
    SPDX,
    PU,
    DQV,
    SDMX,
    QUALITY
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

    const quality = {
        "quality": {
            "ready": false,
            "download": null,
            "downloadLastCheck": null,
            "schema": null,
            "schemaLastCheck": null,
            "mediaType": null,
            "mediaTypeByServer": null,
            "authorshipCustom": null,
            "authorshipCustomLastCheck": null,
            "databaseAuthorship": null,
            "databaseAuthorshipLastCheck": null,
            "protectedDatabaseAuthorship": null,
            "protectedDatabaseAuthorshipLastCheck": null
        }
    };

    return {...mandatory, ...recommended, ...optional, ...extension, ...quality};
}

function parseTermsOfUse(distribution, jsonld) {
    const iri = triples.resource(distribution, PU.specification);
    if (iri === undefined) {
        return {
            "authorship": "missing",
            "author": "missing",
            "databaseAuthorship": "missing",
            "databaseAuthor": "missing",
            "protectedDatabase": "missing",
            "personalData": "missing"
        };
    }

    const entity = graph.getByResource(jsonld, iri);

    const authorship = triples.resource(entity, PU.authorship);
    const author = triples.string(entity, PU.author);
    const databaseAuthorship = triples.resource(entity, PU.databaseAuthorship);
    const databaseAuthor = triples.string(entity, PU.databaseAuthor);
    const protectedDatabase = triples.resource(entity, PU.protectedDatabase);
    const personalData = triples.resource(entity, PU.personalData);

    return {
        "authorship": authorship,
        "author": author,
        "databaseAuthorship": databaseAuthorship,
        "databaseAuthor": databaseAuthor,
        "protectedDatabase": protectedDatabase,
        "personalData": personalData,
    };
}

export function loadDistributionQuality(jsonld, distribution) {
    const measures = graph.getAllByType(jsonld, DQV.QualityMeasurement);
    const quality = {
        ...distribution.quality,
        "ready": true
    };
    measures.forEach((measure) => {
        const period = triples.resource(measure, SDMX.refPeriod);
        const measureOf = triples.resource(measure, DQV.isMeasurementOf);
        const value = triples.value(measure, DQV.value);
        switch (measureOf) {
            case QUALITY.downloadAvailability:
                quality["download"] = value;
                quality["downloadLastCheck"] = sdmxRefToDate(period);
                break;
            case QUALITY.mediaType:
                quality["mediaType"] = value;
                quality["mediaTypeByServer"] =
                    triples.value(measure, DQV.expectedDataType);
                break;
            case QUALITY.schemaAvailability:
                quality["format"] = value;
                quality["schemaLastCheck"] = sdmxRefToDate(period);
                break;
            case QUALITY.authorship:
                quality["authorshipCustom"] = value;
                quality["authorshipCustomLastCheck"] = sdmxRefToDate(period);
                break;
            case QUALITY.databaseAuthorship:
                quality["databaseAuthorship"] = value;
                quality["databaseAuthorshipLastCheck"] = sdmxRefToDate(period);
                break;
            case QUALITY.specialDatabaseAuthorship:
                quality["protectedDatabaseAuthorship"] = value;
                quality["protectedDatabaseAuthorshipLastCheck"] =
                    sdmxRefToDate(period);
                break;
            default:
                break;
        }
    });
    return quality;
}

function sdmxRefToDate(iri) {
    return iri.substr(iri.lastIndexOf("/") + 1)
        .replace("T", " ");
}
