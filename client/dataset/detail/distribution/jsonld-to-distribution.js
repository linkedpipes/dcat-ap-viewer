import {graph, triples} from "../../../app-services/jsonld";
import {
  DCAT,
  DCTERMS,
  FOAF,
  ADMS,
  SPDX,
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
  };

  const recommended = {
    "description": triples.string(distribution, DCTERMS.description),
    "format": triples.entity(distribution, DCTERMS.format),
    "license": triples.resource(distribution, DCTERMS.license),
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
    "modified": triples.resource(distribution, DCTERMS.modified),
  };

  const extension = {
    "type": triples.resource(distribution, DCTERMS.type),
  };

  return {...mandatory, ...recommended, ...optional, ...extension};
}
