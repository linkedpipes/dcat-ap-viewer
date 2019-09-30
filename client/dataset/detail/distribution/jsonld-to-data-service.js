import {graph, triples} from "../../../app-services/jsonld";
import {
  DCAT,
  DCTERMS,
  FOAF,
  ADMS,
  SPDX,
} from "../../../app-services/vocabulary";
import {parseTermsOfUse} from "./jsonld-to-distribution";

// TODO Merge with action or leave in separated file.

export function jsonLdToDataService(jsonld) {
  const dataService = graph.getByType(jsonld, DCAT.DataService);
  if (dataService === undefined) {
    return undefined;
  }

  // TODO Change to getString with specific structure (object with languages).
  const mandatory = {
    "@id": triples.id(dataService),
    "accessURL": triples.resources(dataService, DCAT.accessURL),
    ...parseTermsOfUse(dataService, jsonld),
  };

  const recommended = {
    "description": triples.string(dataService, DCTERMS.description),
    "format": triples.entity(dataService, DCTERMS.format),
    "license": triples.resource(dataService, DCTERMS.license),
  };

  const optional = {
    "byteSize": triples.value(dataService, DCAT.byteSize),
    "checksum": triples.resource(dataService, SPDX.checksum),
    "documentation": triples.resources(dataService, FOAF.page),
    "downloadURL": triples.resources(dataService, DCAT.downloadURL),
    "language": triples.resources(dataService, DCTERMS.language),
    "conformsTo": triples.resources(dataService, DCTERMS.conformsTo),
    "mediaType": triples.entity(dataService, DCAT.mediaType),
    "issued": triples.value(dataService, DCTERMS.issued),
    "rights": triples.resource(dataService, DCTERMS.rights),
    "status": triples.resource(dataService, ADMS.status),
    "title": triples.values(dataService, DCTERMS.title),
    "modified": triples.resource(dataService, DCTERMS.modified),
  };

  const extension = {
    "type": triples.resource(dataService, DCTERMS.type),
  };

  const quality = {
    "quality": {
      "ready": false,
      "download": null,
      "downloadLastCheck": null,
      "downloadNone": null,
      "schema": null,
      "schemaLastCheck": null,
      "schemaNone": null,
      "mediaType": null,
      "mediaTypeCheck": null,
      "mediaTypeNote": null,
      "authorshipCustom": null,
      "authorshipCustomLastCheck": null,
      "authorshipCustomNte": null,
      "databaseAuthorship": null,
      "databaseAuthorshipLastCheck": null,
      "databaseAuthorshipNote": null,
      "protectedDatabaseAuthorship": null,
      "protectedDatabaseAuthorshipLastCheck": null,
      "protectedDatabaseAuthorshipNote": null,
    },
  };

  const dcat = {
    "packageFormat": triples.entity(dataService, DCAT.packageFormat),
    "compressFormat": triples.entity(dataService, DCAT.compressFormat),
    "endpointDescription":
      triples.resource(dataService, DCAT.endpointDescription),
    "endpointURL": triples.resource(dataService, DCAT.endpointURL),
  };

  return {
    ...mandatory,
    ...recommended,
    ...optional,
    ...extension,
    ...quality,
    ...dcat,
  };
}
