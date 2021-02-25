import {
  getEntityByIri,
  getId,
  getPlainString,
  getResource,
  getString,
  JsonLdEntity,
  getEntityByType,
  getValue,
  getEntitiesByType,
  getResources,
  getStrings,
  getPlainStrings,
  getDate, getTypes,
} from "./jsonld";
import {
  DCAT, DCTERMS, FOAF, NKOD, LP, ADMS, OWL, VCARD, SKOS, EUA,
} from "./vocabulary"
import {DcatApDataset, NkodDataset} from "../data-model/dataset";
import {
  DatasetList,
  Facet,
  TypeaheadDataset,
} from "../data-api/api-dataset";
import {ContactPoint} from "../data-model/contact-point";

export function jsonLdToDatasetList(jsonld: JsonLdEntity[]): DatasetList {
  const result: DatasetList = createEmptyDatasetList();
  loadDatasetListMetadata(jsonld, result);
  loadDatasetListFacetMetadata(jsonld, result);
  loadDatasetListFacets(jsonld, result);
  loadDatasetListDatasets(jsonld, result);
  // Make sure we have predefined ordering.
  result.keywords.sort((left, right) => -(left.count - right.count));
  result.formats.sort((left, right) => -(left.count - right.count));
  result.publishers.sort((left, right) => -(left.count - right.count));
  result.themes.sort((left, right) => -(left.count - right.count));
  result.datasets.sort((left, right) => left.order - right.order);
  return result;
}

function createEmptyDatasetList(): DatasetList {
  return {
    datasets: [],
    datasetsCount: 0,
    formats: [],
    formatsCount: 0,
    keywords: [],
    keywordsCount: 0,
    publishers: [],
    publishersCount: 0,
    themes: [],
    themesCount: 0
  };
}

function loadDatasetListMetadata(jsonld: JsonLdEntity[], output: DatasetList) {
  const metadataEntry = getEntityByType(jsonld, LP.DatasetListMetadata);
  if (metadataEntry) {
    output.datasetsCount = Number(getValue(metadataEntry, LP.datasetsCount));
  }
}

function loadDatasetListFacetMetadata(
  jsonld: JsonLdEntity[], output: DatasetList
) {
  const facetMetadataEntries = getEntitiesByType(jsonld, LP.FacetMetadata);
  for (let entry of facetMetadataEntries) {
    const count = Number(getValue(entry, LP.count));
    switch (getResource(entry, LP.facet)) {
      case LP.keyword:
        output.keywordsCount = count;
        break;
      case LP.format:
        output.formatsCount = count;
        break;
      case LP.publisher:
        output.publishersCount = count;
        break;
      case LP.theme:
        output.themesCount = count;
        break;
    }
  }
}

function loadDatasetListFacets(jsonld: JsonLdEntity[], output: DatasetList) {
  for (let entry of getEntitiesByType(jsonld, LP.Facet)) {
    const facet: Facet = {
      "iri": getId(entry),
      "title": undefined,
      "count": Number(getValue(entry, LP.count)),
      "color": undefined,
      "queryCode": (getValue(entry, LP.code) as string) || getId(entry)
    };
    switch (getResource(entry, LP.facet)) {
      case LP.keyword:
        facet.title = {"": facet.queryCode};
        output.keywords.push(facet);
        break;
      case LP.format:
        output.formats.push(facet);
        break;
      case LP.publisher:
        output.publishers.push(facet);
        break;
      case LP.theme:
        output.themes.push(facet);
        break;
    }
  }
}

function loadDatasetListDatasets(jsonld: JsonLdEntity[], output: DatasetList) {
  const datasetEntries = getEntitiesByType(jsonld, DCAT.Dataset);
  for (let entry of datasetEntries) {
    output.datasets.push({
      "iri": getId(entry),
      "title": getString(entry, DCTERMS.title),
      "accrualPeriodicity": getResource(entry, DCTERMS.accrualPeriodicity),
      "description": getString(entry, DCTERMS.description),
      "formats": getResources(entry, DCTERMS.format),
      "issued": getDate(entry, DCTERMS.issued),
      "modified": getDate(entry, DCTERMS.modified),
      "publisher": getResource(entry, DCTERMS.publisher),
      "spatial": getResources(entry, DCTERMS.spatial),
      "keywords": getStrings(entry, DCAT.keyword),
      "themes": getResources(entry, DCAT.theme),
      "order": Number(getValue(entry, LP.order)),
      "isPartOf": getResource(entry, LP.isPartOf),
    });
  }
}

export default function jsonLdToDatasetTypeahead(
  jsonld: JsonLdEntity[]
): TypeaheadDataset[] {
  const result = [];
  for (let entry of getEntitiesByType(jsonld, DCAT.Dataset)) {
    const title = getPlainString(entry, DCTERMS.title);
    if (title === undefined) {
      continue;
    }
    result.push({
      "iri": getId(entry),
      "title": title,
    });
  }
  return result;
}

export function jsonLdToDataset(
  jsonld: JsonLdEntity[], datasetIri: string
): NkodDataset {
  const entity = getEntityByIri(jsonld, datasetIri);
  if (entity === undefined) {
    throw Error(`Missing dataset for ${datasetIri}`);
  }
  const types = getTypes(entity);
  if (!types.includes(DCAT.Dataset)) {
    console.warn("Missing ", DCAT.Dataset, "type for dataset entity.");
  }
  const result = createEmptyNkodDataset(datasetIri);
  loadDatasetMandatory(jsonld, entity, result);
  loadDatasetRecommended(jsonld, entity, result);
  loadDatasetThemes(jsonld, entity, result);
  loadDatasetTemporal(jsonld, entity, result);
  loadDatasetOptional(jsonld, entity, result);
  loadDatasetNkod(jsonld, entity, result);
  return result;
}

function createEmptyNkodDataset(iri: string): NkodDataset {
  return {
    "iri": iri,
    "title": undefined,
    "description": undefined,
    "contactPoints": [],
    "distributions": [],
    "keywords": [],
    "publisher": undefined,
    "themes": [],
    "datasetThemes": [],
    "accessRights": [],
    "conformsTo": [],
    "documentation": [],
    "frequency": undefined,
    "hasVersion": [],
    "identifier": [],
    "isVersionOf": [],
    "landingPage": [],
    "language": [],
    "otherIdentifier": [],
    "provenance": [],
    "relation": [],
    "issued": [],
    "sample": [],
    "source": [],
    "spatial": [],
    "spatialResolutionInMeters": undefined,
    "temporal": undefined,
    "temporalResolution": undefined,
    "type": [],
    "modified": [],
    "version": [],
    "versionNotes": [],
    "datasets": [],
    "parentDataset": undefined,
    "catalog": undefined,
    "catalogSource": undefined,
    "lkod": undefined,
    "isFromForm": false,
    "isFromCatalog": false,
  }
}

function loadDatasetMandatory(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: DcatApDataset
) {
  output.title = getString(entity, DCTERMS.title);
  output.description = getString(entity, DCTERMS.description);
}

function loadDatasetRecommended(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: DcatApDataset
) {
  output.contactPoints = loadContactPoints(jsonld, entity);
  output.distributions = getResources(entity, DCAT.distribution);
  output.keywords = getStrings(entity, DCAT.keyword);
  output.publisher = getResource(entity, DCTERMS.publisher);
}

function loadContactPoints(
  jsonld: JsonLdEntity[], entity: JsonLdEntity
): ContactPoint[] {

  function notUndefined<T>(x: T | undefined): x is T {
    return x !== undefined;
  }

  return getResources(entity, DCAT.contactPoint)
    .map(iri => getEntityByIri(jsonld, iri))
    .filter(notUndefined)
    .map(contactEntity => {
        let email = getResource(contactEntity, VCARD.hasEmail);
        if (email && email.startsWith("mailto:")) {
          email = email.substr("mailto:".length);
        }
        return {
          "iri": getId(contactEntity),
          "title": getString(contactEntity, VCARD.fn),
          "email": email,
        }
      }
    );
}

/**
 * Load theme a themes. Some themes can be special if they are in
 * EUA.dataTheme schema.
 */
function loadDatasetThemes(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: DcatApDataset
) {
  for (const iri of getResources(entity, DCAT.theme)) {
    const entity = getEntityByIri(jsonld, iri);
    if (entity === undefined) {
      console.warn("Missing data for theme:", iri);
      output.themes.push(iri);
      continue;
    }
    const inScheme = getResources(entity, SKOS.inScheme);
    if (inScheme.includes(EUA.dataTheme)) {
      output.datasetThemes.push(iri);
    } else {
      output.themes.push(iri);
    }
  }
}

function loadDatasetTemporal(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: DcatApDataset
) {
  const iri = getResource(entity, DCTERMS.temporal);
  if (iri === undefined) {
    return;
  }
  const temporal = getEntityByIri(jsonld, iri);
  if (temporal === undefined) {
    return;
  }
  output.temporal = {
    "startDate": getValue(temporal, DCAT.startDate) as string,
    "endDate": getValue(temporal, DCAT.endDate) as string,
  };
}

function loadDatasetOptional(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: NkodDataset
) {
  output.accessRights = getResources(entity, DCTERMS.accessRights);
  output.conformsTo = getResources(entity, DCTERMS.conformsTo);
  output.documentation = getResources(entity, FOAF.page);
  output.frequency = getResource(entity, DCTERMS.accrualPeriodicity);
  output.hasVersion = getResources(entity, DCTERMS.hasVersion);
  output.identifier = getPlainStrings(entity, DCTERMS.identifier);
  output.isVersionOf = getResources(entity, DCTERMS.isVersionOf);
  output.landingPage = getResources(entity, DCAT.landingPage);
  output.language = getResources(entity, DCTERMS.language);
  output.otherIdentifier = getResources(entity, ADMS.identifier);
  output.provenance = getResources(entity, DCTERMS.provenance);
  output.relation = getResources(entity, DCTERMS.relation);
  output.issued = getPlainStrings(entity, DCTERMS.issued);
  output.sample = getResources(entity, ADMS.sample);
  output.source = getResources(entity, DCTERMS.source);
  output.spatial = getResources(entity, DCTERMS.spatial);
  output.type = getPlainStrings(entity, DCTERMS.type);
  output.modified = getPlainStrings(entity, DCTERMS.modified);
  output.version = getPlainStrings(entity, OWL.versionInfo);
  output.versionNotes = getPlainStrings(entity, ADMS.versionNotes);
  output.temporalResolution = getPlainString(entity, DCAT.temporalResolution);
  const resolution = getPlainString(entity, DCAT.spatialResolutionInMeters);
  output.spatialResolutionInMeters = resolution === undefined ?
    undefined : Number(resolution);
}

function loadDatasetNkod(
  jsonld: JsonLdEntity[], entity: JsonLdEntity, output: NkodDataset
) {
  output.datasets = getResources(entity, DCTERMS.hasPart);
  output.parentDataset = getResource(entity, DCTERMS.isPartOf);
  const catalog = getEntityByType(jsonld, DCAT.Catalog);
  if (catalog !== undefined) {
    output.catalog = getId(catalog);
  }
  const catalogSource = getEntityByType(jsonld, DCAT.CatalogRecord);
  if (catalogSource !== undefined) {
    output.catalogSource = getId(catalogSource);
  }
  output.lkod = getResource(entity, NKOD.lkod);
  const types = getTypes(entity);
  output.isFromForm = types.includes(NKOD.SourceForm);
  output.isFromCatalog = types.includes(NKOD.SourceLkod);
}
