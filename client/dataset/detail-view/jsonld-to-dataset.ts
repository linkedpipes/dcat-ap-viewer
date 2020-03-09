import {
  JsonLdEntity,
  getId,
  getTypes,
  getResources,
  getValue,
  getEntityByIri,
  getEntitiesByType,
  getStrings,
  getResource,
  getValues,
} from "../../jsonld";
import {
  DCAT,
  DCTERMS,
  FOAF,
  OWL,
  ADMS,
  VCARD,
  SKOS,
  EUA,
  SCHEMA,
} from "../../vocabulary/vocabulary"

export interface ContactPoint {
  "iri": string;
  "email": string;
}

export function jsonLdToDataset(jsonld: JsonLdEntity[]): {} {
  const datasets = getEntitiesByType(jsonld, DCAT.Dataset);
  const dataset = datasets[0];

  const mandatory = {
    "iri": getId(dataset),
    "description": getStrings(dataset, DCTERMS.description),
  };

  const recommended = {
    "contactPoints": loadContactPoints(jsonld, dataset),
    "distributions": getResources(dataset, DCAT.distribution),
    "keywords": getStrings(dataset, DCAT.keyword),
    "publisher": getResource(dataset, DCTERMS.publisher),
    ...loadThemes(jsonld, dataset),
  };

  const optional = {
    "accessRights": getResources(dataset, DCTERMS.accessRights),
    "conformsTo": getResources(dataset, DCTERMS.conformsTo),
    "documentation": getResources(dataset, FOAF.page),
    "frequency": getResource(dataset, DCTERMS.accrualPeriodicity), //
    "hasVersion": getResources(dataset, DCTERMS.hasVersion),
    "identifier": getValues(dataset, DCTERMS.identifier),
    "isVersionOf": getResources(dataset, DCTERMS.isVersionOf),
    "landingPage": getResources(dataset, DCAT.landingPage),
    "language": getResources(dataset, DCTERMS.language), //
    "otherIdentifier": getResources(dataset, ADMS.identifier), //
    "provenance": getResources(dataset, DCTERMS.provenance),
    "relation": getResources(dataset, DCTERMS.relation),
    "issued": getValues(dataset, DCTERMS.issued),
    "sample": getResources(dataset, ADMS.sample),
    "source": getResources(dataset, DCTERMS.source),
    "spatial": getResources(dataset, DCTERMS.spatial), //
    "temporal": loadTemporal(jsonld, dataset),
    "type": getValues(dataset, DCTERMS.type),
    "modified": getValues(dataset, DCTERMS.modified),
    "version": getValues(dataset, OWL.versionInfo),
    "versionNotes": getValues(dataset, ADMS.versionNotes),
  };

  const dcat = {
    "services": loadServices(jsonld, dataset),
    "temporalResolution": getValue(dataset, DCAT.temporalResolution),
    "spatialResolutionInMeters":
      getValue(dataset, DCAT.spatialResolutionInMeters),
  };

  return {
    "@type": getTypes(dataset),
    //
    ...mandatory,
    ...recommended,
    ...optional,
    ...dcat,
  };
}

function loadContactPoints(jsonld: JsonLdEntity[], dataset: JsonLdEntity)
  : ContactPoint[] {
  return getResources(dataset, DCAT.contactPoint)
    .map(iri => getEntityByIri(jsonld, iri))
    .filter(notUndefined)
    .map(entity => {
        return {
          "iri": getId(entity),
          "email": String(getValue(entity, VCARD.hasEmail)),
        }
      }
    );
}

function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

/**
 * Load theme a themes. Some themes can be special if they are in
 * EUA.dataTheme schema.
 */
function loadThemes(
  jsonld: JsonLdEntity[], dataset: JsonLdEntity)
  : { themes: string[], datasetThemes: string[] } {
  //
  const themes: string[] = [];
  const datasetThemes: string[] = [];

  getResources(dataset, DCAT.theme)
    .forEach(iri => {
      const entity = getEntityByIri(jsonld, iri);
      if (entity === undefined) {
        console.warn("Missing data for theme:", iri);
        themes.push(iri);
        return;
      }
      const inScheme = getResources(entity, SKOS.inScheme);
      if (inScheme.includes(EUA.dataTheme)) {
        datasetThemes.push(iri);
      } else {
        themes.push(iri);
      }
    });

  return {
    "themes": themes,
    "datasetThemes": datasetThemes,
  }
}

function loadTemporal(jsonld: JsonLdEntity[], dataset: JsonLdEntity) {
  const iri = getResource(dataset, DCTERMS.temporal);
  if (iri === undefined) {
    return undefined;
  }
  const temporal = getEntityByIri(jsonld, iri);
  if (temporal === undefined) {
    return undefined;
  } else {
    return {
      "startDate": getValue(temporal, SCHEMA.startDate),
      "endDate": getValue(temporal, SCHEMA.endDate),
    };
  }
}

function loadServices(jsonld: JsonLdEntity[], dataset: JsonLdEntity) {
  return getEntitiesByType(jsonld, DCAT.DataService)
    .filter(service => getResources(service, DCAT.servesDataset)
      .includes(getId(dataset)))
    .map(service => getId(service))
}
