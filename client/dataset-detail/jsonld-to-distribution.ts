import {
  getEntityByIri,
  getId,
  getPlainString,
  getPlainStrings,
  getResource,
  getResources,
  getStrings,
  JsonLdEntity,
} from "../jsonld";
import {ADMS, DCAT, DCTERMS, FOAF, PU, SPDX,} from "../vocabulary/vocabulary"
import {
  DataService,
  Distribution,
  DistributionLegal,
  DistributionType,
} from "./dataset-detail-model";

export function jsonLdToDistributionOrDataService(
  jsonld: JsonLdEntity[], iri: string
): Distribution | DataService | undefined {
  const distribution = getEntityByIri(jsonld, iri);
  if (distribution === undefined) {
    return undefined;
  }
  const accessServiceIri = getResource(distribution, DCAT.accessService);
  return {
    // Mandatory.
    "iri": getId(distribution),
    "accessURL": getResource(distribution, DCAT.accessURL),
    // Recommended.
    "description": getStrings(distribution, DCTERMS.description),
    "format": getResource(distribution, DCTERMS.format),
    "license": getResource(distribution, DCTERMS.license),
    // Optional.
    "byteSize": getPlainString(distribution, DCAT.byteSize),
    "checksum": getPlainStrings(distribution, SPDX.checksum),
    "documentation": getResources(distribution, FOAF.page),
    "downloadURL": getResources(distribution, DCAT.downloadURL),
    "language": getResources(distribution, DCTERMS.language),
    "conformsTo": getResources(distribution, DCTERMS.conformsTo),
    "mediaType": getResource(distribution, DCAT.mediaType),
    "issued": getPlainString(distribution, DCTERMS.issued),
    "rights": getResource(distribution, DCTERMS.rights),
    "status": getResource(distribution, ADMS.status),
    "modified": getResource(distribution, DCTERMS.modified),
    // dcap-ap 2
    "packageFormat": getResource(distribution, DCAT.packageFormat),
    "compressFormat": getResource(distribution, DCAT.compressFormat),
    // Custom
    "type": accessServiceIri === undefined ?
      DistributionType.Distribution : DistributionType.DataService,
    "legal": jsonLdToLegal(distribution, jsonld),
    //
    ...jsonLdToDataService(accessServiceIri, jsonld),
  };
}

function jsonLdToLegal(
  distribution: JsonLdEntity, jsonld: JsonLdEntity[]): DistributionLegal {
  const iri = getResource(distribution, PU.specification);
  if (iri === undefined) {
    return createMissingLegal();
  }
  const entity = getEntityByIri(jsonld, iri);
  if (entity === undefined) {
    return createMissingLegal();
  }
  return {
    "authorship": getResource(entity, PU.authorship),
    "author": getStrings(entity, PU.author),
    "databaseAuthorship": getResource(entity, PU.databaseAuthorship),
    "databaseAuthor": getStrings(entity, PU.databaseAuthor),
    "protectedDatabase": getResource(entity, PU.protectedDatabase),
    "personalData": getResource(entity, PU.personalData),
  };
}

function createMissingLegal(): DistributionLegal {
  return {
    "authorship": undefined,
    "author": [],
    "databaseAuthorship": undefined,
    "databaseAuthor": [],
    "protectedDatabase": undefined,
    "personalData": undefined,
  };
}

function jsonLdToDataService(
  accessServiceIri: string | undefined, jsonld: JsonLdEntity[]) {
  if (accessServiceIri === undefined) {
    return {};
  }
  const dataService = getEntityByIri(jsonld, accessServiceIri);
  if (dataService === undefined) {
    ``
    return {
      "endpointDescription": undefined,
      "endpointURL": undefined,
      "dataService": accessServiceIri,
    };
  }
  return {
    "endpointDescription": getResource(dataService, DCAT.endpointDescription),
    "endpointURL": getResource(dataService, DCAT.endpointURL),
    "dataService": accessServiceIri,
  }
}
