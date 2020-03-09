import {
  DCAT,
  DCTERMS,
  FOAF,
  ADMS,
  SPDX,
} from "../../vocabulary/vocabulary";
import {
  getId,
  getEntityByType,
  getResources,
  getValue,
  getStrings,
  getResource,
} from "../../jsonld";

export function jsonLdToDataService(jsonld) {
  const entity = getEntityByType(jsonld, DCAT.DataService);
  if (entity === undefined) {
    return undefined;
  }

  const mandatory = {
    "iri": getId(entity),
    "accessURL": getResource(entity, DCAT.accessURL),
  };

  const recommended = {
    "description": (entity, DCTERMS.description),
    "format": getResource(entity, DCTERMS.format),
    "license": getResource(entity, DCTERMS.license),
  };

  const optional = {
    "byteSize": getValue(entity, DCAT.byteSize),
    "checksum": getStrings(entity, SPDX.checksum),
    "documentation": getResources(entity, FOAF.page),
    "downloadURL": getResources(entity, DCAT.downloadURL),
    "language": getResources(entity, DCTERMS.language),
    "conformsTo": getResources(entity, DCTERMS.conformsTo),
    "mediaType": getResource(entity, DCAT.mediaType),
    "issued": getValue(entity, DCTERMS.issued),
    "rights": getResource(entity, DCTERMS.rights),
    "status": getResource(entity, ADMS.status),
    // "title": Parsed by label service.
    "modified": getResource(entity, DCTERMS.modified),
  };

  const extension = {
    "type": getResource(entity, DCTERMS.type),
  };

  const dcat = {
    "packageFormat": getResource(entity, DCAT.packageFormat),
    "compressFormat": getResource(entity, DCAT.compressFormat),
    "endpointDescription": getResource(entity, DCAT.endpointDescription),
    "endpointURL": getResource(entity, DCAT.endpointURL),
  };

  return {
    ...mandatory,
    ...recommended,
    ...optional,
    ...extension,
    ...dcat,
  };

}
