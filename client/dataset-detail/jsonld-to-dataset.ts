import {
  getEntitiesByType,
  getEntityByIri,
  getEntityByType,
  getId,
  getPlainString,
  getPlainStrings,
  getResource,
  getResources,
  getStrings,
  getTypes,
  getValue,
  JsonLdEntity,
} from "../jsonld";
import {
  ADMS,
  DCAT,
  DCTERMS,
  EUA,
  FOAF,
  NKOD,
  OWL,
  SKOS,
  VCARD,
} from "../vocabulary/vocabulary"
import {ContactPoint, Dataset, DatasetCustom,} from "./dataset-detail-model";

export function jsonLdToDataset(jsonld: JsonLdEntity[]): Dataset {
  const entity = getEntitiesByType(jsonld, DCAT.Dataset)[0];
  const iri = getId(entity);
  const datasets = getResources(entity, DCTERMS.hasPart);
  return {
    // Mandatory.
    "iri": iri,
    "description": getStrings(entity, DCTERMS.description),
    // Recommended.
    "contactPoints": loadContactPoints(jsonld, entity),
    "distributions": getResources(entity, DCAT.distribution),
    "keywords": getStrings(entity, DCAT.keyword),
    "publisher": getResource(entity, DCTERMS.publisher),
    ...loadThemes(jsonld, entity),
    // Optional.
    "accessRights": getResources(entity, DCTERMS.accessRights),
    "conformsTo": getResources(entity, DCTERMS.conformsTo),
    "documentation": getResources(entity, FOAF.page),
    "frequency": getResource(entity, DCTERMS.accrualPeriodicity),
    "hasVersion": getResources(entity, DCTERMS.hasVersion),
    "identifier": getPlainStrings(entity, DCTERMS.identifier),
    "isVersionOf": getResources(entity, DCTERMS.isVersionOf),
    "landingPage": getResources(entity, DCAT.landingPage),
    "language": getResources(entity, DCTERMS.language),
    "otherIdentifier": getResources(entity, ADMS.identifier),
    "provenance": getResources(entity, DCTERMS.provenance),
    "relation": getResources(entity, DCTERMS.relation),
    "issued": getPlainStrings(entity, DCTERMS.issued),
    "sample": getResources(entity, ADMS.sample),
    "source": getResources(entity, DCTERMS.source),
    "spatial": getResources(entity, DCTERMS.spatial),
    "temporal": loadTemporal(jsonld, entity),
    "type": getPlainStrings(entity, DCTERMS.type),
    "modified": getPlainStrings(entity, DCTERMS.modified),
    "version": getPlainStrings(entity, OWL.versionInfo),
    "versionNotes": getPlainStrings(entity, ADMS.versionNotes),
    // dcap-ap 2
    "services": loadServices(jsonld, entity),
    "temporalResolution": getPlainString(entity, DCAT.temporalResolution),
    "spatialResolutionInMeters":
      getPlainString(entity, DCAT.spatialResolutionInMeters),
    // Hierarchy.
    "datasets": datasets,
    "parentDataset": getResource(entity, DCTERMS.isPartOf),
    // Custom.
    ...loadForm(jsonld, entity),
  };
}

function loadContactPoints(jsonld: JsonLdEntity[], dataset: JsonLdEntity)
  : ContactPoint[] {
  return getResources(dataset, DCAT.contactPoint)
    .map(iri => getEntityByIri(jsonld, iri))
    .filter(notUndefined)
    .map(entity => {
        let email = getResource(entity, VCARD.hasEmail);
        if (email && email.startsWith("mailto:")) {
          email = email.substr("mailto:".length);
        }
        return {
          "iri": getId(entity),
          "email": email,
        }
      }
    )
    .filter(notUndefined);
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
      "startDate": getValue(temporal, DCAT.startDate),
      "endDate": getValue(temporal, DCAT.endDate),
    };
  }
}

function loadServices(jsonld: JsonLdEntity[], dataset: JsonLdEntity) {
  return getEntitiesByType(jsonld, DCAT.DataService)
    .filter(service => getResources(service, DCAT.servesDataset)
      .includes(getId(dataset)))
    .map(service => getId(service))
}

function loadForm(jsonld: JsonLdEntity[], dataset: JsonLdEntity): DatasetCustom {
  const result: DatasetCustom = {
    "rdfType": getTypes(dataset),
    "lkod": getResource(dataset, NKOD.lkod),
  };
  const catalog = getEntityByType(jsonld, DCAT.Catalog);
  if (catalog) {
    result["catalog"] = getId(catalog);
  }
  const catalogRecord = getEntityByType(jsonld, DCAT.CatalogRecord);
  if (catalogRecord) {
    result["catalogSource"] = getResource(catalogRecord, DCTERMS.source);
  }
  return result;
}
