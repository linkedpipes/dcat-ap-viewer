import {triples} from "./jsonld"
import {DCAT, DCTERMS, FOAF, OWL, ADMS, SPDX} from "./vocabulary"

export function convertDatasetJsonLd(jsonld) {
    const entity = jsonld["@graph"][0];
    return {
        // Mandatory
        "iri": triples.getId(entity),
        "title": triples.getValue(entity, DCTERMS.title),
        "description": triples.getValue(entity, DCTERMS.description),
        // Recommended
        "contactPoint": triples.getResources(entity, DCAT.contactPoint),
        "distribution": triples.getResources(entity, DCAT.distribution),
        "keyword": triples.getValues(entity, DCAT.keyword),
        "publisher": triples.getResource(entity, DCTERMS.publisher),
        "theme": triples.getResources(entity, DCAT.theme),
        // Optional
        "accessRights": triples.getResources(entity, DCTERMS.accessRights),
        "conformsTo": triples.getResources(entity, DCTERMS.conformsTo),
        "documentation": triples.getResources(entity, FOAF.page),
        "frequency": triples.getResource(entity, DCTERMS.accrualPeriodicity),
        "hasVersion": triples.getResource(entity, DCTERMS.hasVersion),
        "identifier": triples.getValues(entity, DCTERMS.identifier),
        "isVersionOf": triples.getResource(entity, DCTERMS.isVersionOf),
        "landingPage": triples.getResource(entity, DCAT.landingPage),
        "language": triples.getResource(entity, DCTERMS.language),
        "otherIdentifier": triples.getResource(entity, ADMS.identifier),
        "provenance": triples.getResource(entity, DCTERMS.provenance),
        "relation": triples.getResource(entity, DCTERMS.relation),
        "issued": triples.getValue(entity, DCTERMS.issued),
        "sample": triples.getResource(entity, ADMS.sample),
        "source": triples.getResource(entity, DCTERMS.source),
        "spatial": triples.getResource(entity, DCTERMS.spatial),
        "temporal": triples.getResource(entity, DCTERMS.temporal),
        "type": triples.getValue(entity, DCTERMS.type),
        "modified": triples.getValue(entity, DCTERMS.modified),
        "version": triples.getValue(entity, OWL.versionInfo),
        "versionNotes": triples.getValue(entity, ADMS.versionNotes)
    }
}

export  function convertDistributionJsonLd(jsonld) {
    const entity = jsonld["@graph"][0];
    return {
        // Mandatory
        "iri": triples.getId(entity),
        "accessURL": triples.getResources(entity, DCAT.accessURL),
        // Recommended
        "description": triples.getValue(entity, DCTERMS.description),
        "format": triples.getResource(entity, DCTERMS.format),
        "license": triples.getResource(entity, DCTERMS.license),
        // Optional
        "byteSize": triples.getValue(entity, DCAT.byteSize),
        "checksum": triples.getResource(entity, SPDX.checksum),
        "documentation": triples.getResources(entity, FOAF.page),
        "downloadURL": triples.getResources(entity, DCAT.downloadURL),
        "language": triples.getResources(entity, DCTERMS.language),
        "conformsTo": triples.getResources(entity, DCTERMS.conformsTo),
        "mediaType": triples.getResource(entity, DCAT.mediaType),
        "issued": triples.getValue(entity, DCTERMS.issued),
        "rights": triples.getResource(entity, DCTERMS.rights),
        "status": triples.getResource(entity, ADMS.status),
        "title": triples.getValues(entity, DCTERMS.title),
        "modified": triples.getResource(entity, DCTERMS.modified),
        // Extension from stats-ap
        "type": triples.getResource(entity, DCTERMS.type)
    }
}