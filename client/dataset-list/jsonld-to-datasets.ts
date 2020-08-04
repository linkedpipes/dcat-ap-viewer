import {
  getDate,
  getEntitiesByType,
  getEntityByType,
  getId,
  getResource,
  getResources,
  getStrings,
  getValue,
  JsonLdEntity
} from "../jsonld";
import {DCAT, DCTERMS, LP} from "../vocabulary/vocabulary";
import {DatasetListItem, DatasetList, Facet} from "./dataset-list-model";


export function jsonLdToDatasetList(jsonld: JsonLdEntity[]): DatasetList {
  const result = new DatasetList();
  const metadataEntry = getEntityByType(jsonld, LP.DatasetListMetadata);
  if (metadataEntry) {
    result.datasetsCount = Number(getValue(metadataEntry, LP.datasetsCount));
  }
  const facetEntries = getEntitiesByType(jsonld, LP.Facet);
  for (let entry of facetEntries) {
    const count = Number(getValue(entry, LP.count));
    const type = getResource(entry, LP.facet);
    let code = getValue(entry, LP.code);
    if (code === undefined) {
      code = getId(entry);
    } else {
      code = String(code);
    }
    const facet: Facet = {
      "iri": getId(entry),
      "code": code,
      "count": count,
    };
    switch (type) {
      case LP.keyword:
        result.keywords.push(facet);
        break;
      case LP.format:
        result.formats.push(facet);
        break;
      case LP.publisher:
        result.publishers.push(facet);
        break;
      case LP.theme:
        result.themes.push(facet);
        break;
    }
  }
  const facetMetadataEntries = getEntitiesByType(jsonld, LP.FacetMetadata);
  for (let entry of facetMetadataEntries) {
    const count = Number(getValue(entry, LP.count));
    switch (getResource(entry, LP.facet)) {
      case LP.keyword:
        result.keywordsCount = count;
        break;
      case LP.format:
        result.formatsCount = count;
        break;
      case LP.publisher:
        result.publishersCount = count;
        break;
      case LP.theme:
        result.themesCount = count;
        break;
    }
  }
  const datasetEntries = getEntitiesByType(jsonld, DCAT.Dataset);
  for (let entry of datasetEntries) {
    const order = Number(getValue(entry, LP.order));
    const dataset = new DatasetListItem(getId(entry), order);
    dataset.accrualPeriodicity = getResource(entry, DCTERMS.accrualPeriodicity);
    dataset.description = getStrings(entry, DCTERMS.description);
    dataset.formats = getResources(entry, DCTERMS.format);
    dataset.issued = getDate(entry, DCTERMS.issued);
    dataset.modified = getDate(entry, DCTERMS.modified);
    dataset.publisher = getResource(entry, DCTERMS.publisher);
    dataset.spatial = getResource(entry, DCTERMS.source);
    dataset.keywords = getStrings(entry, DCAT.keyword);
    dataset.themes = getResources(entry, DCAT.theme);
    result.datasets.push(dataset);
  }
  // Sort, facets in decreasing order, datasets in increasing.
  result.keywords.sort(
    (left, right) => -(left.count - right.count));
  result.formats.sort(
    (left, right) => -(left.count - right.count));
  result.publishers.sort(
    (left, right) => -(left.count - right.count));
  result.themes.sort(
    (left, right) => -(left.count - right.count));
  result.datasets.sort(
    (left, right) => left.order - right.order);
  return result;
}
