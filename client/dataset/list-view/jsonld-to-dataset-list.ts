import {
  JsonLdEntity,
  getEntityByType,
  getEntitiesByType,
  getId,
  getValue,
  Literal,
  getStrings,
  getResources,
  getDate,
} from "../../jsonld";
import {DCAT, LP, DCTERMS} from "../../vocabulary/vocabulary"
import {getResource} from "../../jsonld";

class DatasetList {
  datasets: Dataset[] = [];
  datasetsCount?: number;
  themes: Facet[] = [];
  themesCount?: number;
  keywords: Facet[] = [];
  keywordsCount?: number;
  publishers: Facet[] = [];
  publishersCount?: number;
  formats: Facet[] = [];
  formatsCount?: number;
}

class Dataset {
  iri: string;
  accrualPeriodicity?: string;
  description?: Literal[];
  formats: string[] = [];
  issued?: Date;
  modified?: Date;
  publisher?: string;
  spatial?: string;
  keywords: Literal[] = [];
  themes: string[] = [];
  order: number;

  constructor(iri: string, order: number) {
    this.iri = iri;
    this.order = order;
  }
}

interface Facet {
  iri: string;
  count: number;
  // Used to identify the facet for purpose of query.
  code: string;
}

export default function jsonLdToDatasetList(jsonld: JsonLdEntity[])
  : DatasetList {
  //
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
    const dataset = new Dataset(getId(entry), order);
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
