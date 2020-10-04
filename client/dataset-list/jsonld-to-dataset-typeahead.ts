import {
  JsonLdEntity,
  getEntitiesByType,
  getId,
  getValue,
} from "../jsonld";
import {DCAT, DCTERMS} from "../vocabulary/vocabulary"

type TypeaheadDatasetList = TypeaheadDataset[];

class TypeaheadDataset {
  iri: string;
  title: string;

  constructor(iri: string, title: string) {
    this.iri = iri;
    this.title = title;
  }
}

export default function jsonLdToDatasetTypeahead(
  jsonld: JsonLdEntity[]
): TypeaheadDatasetList {
  const result: TypeaheadDatasetList = [];
  const datasetEntries = getEntitiesByType(jsonld, DCAT.Dataset);
  for (let entry of datasetEntries) {
    const title = getValue(entry, DCTERMS.title);
    if (title === undefined) {
      // Ignore item without
      continue;
    }
    result.push(new TypeaheadDataset(
      getId(entry),
      String(title),
    ));
  }
  return result;
}
