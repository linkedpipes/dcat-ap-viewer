import {graph, triples} from "./jsonld";
import {
    DCAT,
    DCTERMS,
    FOAF,
    OWL,
    ADMS,
    SPDX,
    VCARD,
    SCHEMA,
    SKOS
} from "./vocabulary";

// TODO Extract to some external source, hide in backend?
// TODO Get as a reference from http://publications.europa.eu/mdr/authority/frequency/
const FREQUENCY_TO_LABEL = {
    "http://publications.europa.eu/resource/authority/frequency/TRIENNIAL": "tříletá",
    "http://publications.europa.eu/resource/authority/frequency/BIENNIAL": "dvouletá",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL": "roční",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_2": "pololetní",
    "http://publications.europa.eu/resource/authority/frequency/ANNUAL_3": "třikrát do roka",
    "http://publications.europa.eu/resource/authority/frequency/QUARTERLY": "čtvrtletní",
    "http://publications.europa.eu/resource/authority/frequency/BIMONTHLY": "dvouměsíční",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY": "měsíční",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_2": "nědvakrát za měsíc",
    "http://publications.europa.eu/resource/authority/frequency/BIWEEKLY": "čtrnáctidenní",
    "http://publications.europa.eu/resource/authority/frequency/MONTHLY_3": "třikrát za měsíc",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY": "týdenní",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_2": "dvakrát týdně",
    "http://publications.europa.eu/resource/authority/frequency/WEEKLY_3": "třikrát týdně",
    "http://publications.europa.eu/resource/authority/frequency/DAILY": "denní",
    "http://publications.europa.eu/resource/authority/frequency/UPDATE_CONT": "průběžně aktualizovaná",
    "http://publications.europa.eu/resource/authority/frequency/IRREG": "nepravidelná",
    "http://publications.europa.eu/resource/authority/frequency/UNKNOWN": "neznámá",
    "http://publications.europa.eu/resource/authority/frequency/OTHER": "ostatní",
    "http://publications.europa.eu/resource/authority/frequency/DAILY_2": "dvakrát denně",
    "http://publications.europa.eu/resource/authority/frequency/CONT": "průběžná",
    "http://publications.europa.eu/resource/authority/frequency/NEVER": "nikdy"
};

export function convertDatasetJsonLd(jsonld) {
    const dataset = graph.getByType(jsonld, DCAT.Dataset);

    const contactPoints = graph.getByResources(jsonld,
        triples.getResources(dataset, DCAT.contactPoint));

    const publisherIri = triples.getResource(dataset, DCTERMS.publisher);
    const publisher = graph.getByResource(jsonld, publisherIri);

    const temporal = graph.getByResource(jsonld,
        triples.getResource(dataset, DCTERMS.temporal));
    let temporalObject;
    if (temporal === undefined) {
        temporalObject = undefined;
    } else {
        temporalObject = {
            "iri": triples.getResource(dataset, DCTERMS.temporal),
            "startDate": triples.getValue(temporal, SCHEMA.startDate),
            "endDate": triples.getValue(temporal, SCHEMA.endDate)
        };
    }

    const frequency = triples.getResource(dataset, DCTERMS.accrualPeriodicity);

    let catalogRecord = graph.getByType(jsonld, DCAT.CatalogRecord);
    if (catalogRecord === undefined) {
        catalogRecord = {};
    }

    // TODO Add labels for all fields

    return {
        // Mandatory
        "iri": triples.getId(dataset),
        "title": triples.getValue(dataset, DCTERMS.title),
        "description": triples.getValue(dataset, DCTERMS.description),
        // Recommended
        "contactPoint": contactPoints.map((item) => ({
            "iri": triples.getId(item),
            "label": triples.getValues(item, VCARD.fn),
            "email": triples.getValues(item, VCARD.hasEmail)
        })),
        "distribution": triples.getResources(dataset, DCAT.distribution),
        "keyword": triples.getValues(dataset, DCAT.keyword),
        "publisher": {
            "iri": publisherIri,
            "label": triples.getValues(publisher,
                "http://xmlns.com/foaf/0.1/name")
        },
        "theme": triples.getResources(dataset, DCAT.theme),
        // Optional
        "accessRights": triples.getResources(dataset, DCTERMS.accessRights),
        "conformsTo": triples.getResources(dataset, DCTERMS.conformsTo),
        "documentation": triples.getResources(dataset, FOAF.page),
        "frequency": {
            "iri": frequency,
            "label": FREQUENCY_TO_LABEL[frequency]
        },
        "hasVersion": triples.getResource(dataset, DCTERMS.hasVersion),
        "identifier": triples.getValues(dataset, DCTERMS.identifier),
        "isVersionOf": triples.getResource(dataset, DCTERMS.isVersionOf),
        "landingPage": triples.getResource(dataset, DCAT.landingPage),
        "language": triples.getResource(dataset, DCTERMS.language),
        "otherIdentifier": triples.getResource(dataset, ADMS.identifier),
        "provenance": triples.getResource(dataset, DCTERMS.provenance),
        "relation": triples.getResource(dataset, DCTERMS.relation),
        "issued": triples.getValue(dataset, DCTERMS.issued),
        "sample": triples.getResource(dataset, ADMS.sample),
        "source": triples.getResource(dataset, DCTERMS.source),
        "spatial": triples.getResource(dataset, DCTERMS.spatial),
        "temporal": temporalObject,
        "type": triples.getValue(dataset, DCTERMS.type),
        "modified": triples.getValue(dataset, DCTERMS.modified),
        "version": triples.getValue(dataset, OWL.versionInfo),
        "versionNotes": triples.getValue(dataset, ADMS.versionNotes),
        "catalogSource": triples.getResource(catalogRecord, DCTERMS.source)
    }
}

export function convertDistributionJsonLd(jsonld) {
    const distribution = graph.getByType(jsonld, DCAT.Distribution);

    if (distribution === undefined) {
        return undefined;
    }

    const format = graph.getByResource(jsonld,
        triples.getResource(distribution, DCTERMS.format));

    return {
        // Mandatory
        "iri": triples.getId(distribution),
        "accessURL": triples.getResources(distribution, DCAT.accessURL),
        // Recommended
        "description": triples.getValue(distribution, DCTERMS.description),
        "format": {
            "iri": triples.getResource(distribution, DCTERMS.format),
            "prefLabel": triples.getValue(format, SKOS.prefLabel)
        },
        "license": triples.getResource(distribution, DCTERMS.license),
        // Optional
        "byteSize": triples.getValue(distribution, DCAT.byteSize),
        "checksum": triples.getResource(distribution, SPDX.checksum),
        "documentation": triples.getResources(distribution, FOAF.page),
        "downloadURL": triples.getResources(distribution, DCAT.downloadURL),
        "language": triples.getResources(distribution, DCTERMS.language),
        "conformsTo": triples.getResources(distribution, DCTERMS.conformsTo),
        "mediaType": triples.getResource(distribution, DCAT.mediaType),
        "issued": triples.getValue(distribution, DCTERMS.issued),
        "rights": triples.getResource(distribution, DCTERMS.rights),
        "status": triples.getResource(distribution, ADMS.status),
        "title": triples.getValues(distribution, DCTERMS.title),
        "modified": triples.getResource(distribution, DCTERMS.modified),
        // Extension from stats-ap
        "type": triples.getResource(distribution, DCTERMS.type)
    }
}