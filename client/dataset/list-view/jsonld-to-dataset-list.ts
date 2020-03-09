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
  keywords: Facet[] = [];
  publishers: Facet[] = [];
  formats: Facet[] = [];
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

  constructor(iri: string) {
    this.iri = iri;
  }
}

interface Facet {
  iri: string;
  count: number;
  // Used if IRI can not be used to identify the facet.
  code?: string;
}

export default function jsonLdToDatasetList(jsonld: JsonLdEntity[])
  : DatasetList {
  //
  const result = new DatasetList();
  const metadataEntry = getEntityByType(jsonld, LP.DatasetListMetadata);
  result.datasetsCount = Number(getValue(metadataEntry, LP.datasetsCount));
  const facetEntries = getEntitiesByType(jsonld, LP.Facet);
  for (let entry of facetEntries) {
    const count = Number(getValue(entry, LP.count));
    const type = getResource(entry, LP.facet);
    const facet: Facet = {
      "iri": getId(entry),
      "code": String(getValue(entry, LP.code)),
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

  const datasetEntries = getEntitiesByType(jsonld, DCAT.Dataset);
  for (let entry of datasetEntries) {
    const dataset = new Dataset(getId(entry));
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

  // Sort in decreasing order.
  result.keywords.sort(
    (left, right) => -(left.count - right.count));
  result.formats.sort(
    (left, right) => -(left.count - right.count));
  result.publishers.sort(
    (left, right) => -(left.count - right.count));
  result.themes.sort(
    (left, right) => -(left.count - right.count));

  return result;
}
