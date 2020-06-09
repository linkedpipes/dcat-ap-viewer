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

export function jsonLdToDistribution(jsonld) {
  const distribution = getEntityByType(jsonld, DCAT.Distribution);
  if (distribution === undefined) {
    return undefined;
  }

  const mandatory = {
    "iri": getId(distribution),
    "accessURL": getResource(distribution, DCAT.accessURL),
  };

  const recommended = {
    "description": getStrings(distribution, DCTERMS.description),
    "format": getResource(distribution, DCTERMS.format),
    "license": getResource(distribution, DCTERMS.license),
  };

  const optional = {
    "byteSize": getValue(distribution, DCAT.byteSize),
    "checksum": getStrings(distribution, SPDX.checksum),
    "documentation": getResources(distribution, FOAF.page),
    "downloadURL": getResources(distribution, DCAT.downloadURL),
    "language": getResources(distribution, DCTERMS.language),
    "conformsTo": getResources(distribution, DCTERMS.conformsTo),
    "mediaType": getResource(distribution, DCAT.mediaType),
    "issued": getValue(distribution, DCTERMS.issued),
    "rights": getResource(distribution, DCTERMS.rights),
    "status": getResource(distribution, ADMS.status),
    // "title": Parsed by label service.
    "modified": getResource(distribution, DCTERMS.modified),
  };

  const extension = {
    "type": getResource(distribution, DCTERMS.type),
  };

  const dcat = {
    // "packageFormat": triples.entity(distribution, DCAT.packageFormat),
    // "compressFormat": triples.entity(distribution, DCAT.compressFormat),
  };

  return {
    ...mandatory,
    ...recommended,
    ...optional,
    ...extension,
    ...dcat,
  };
}

