import {
  JsonLdEntity,
  iterateEntitiesByType,
  getId,
  getValue, getValues,
} from "../../jsonld";
import {SCHEMA, LP} from "../../vocabulary/vocabulary"

interface Publisher {
  iri: string;
  datasetCount?: number;
}

export function jsonLdToPublisherList(jsonld: JsonLdEntity[]): Publisher[] {
  const result: Publisher[] = [];
  iterateEntitiesByType(jsonld, SCHEMA.Organization, (entry) => {
    const publisher: Publisher = {
      "iri": getId(entry),
      "datasetCount": Number(getValue(entry, LP.datasetsCount)),
    }; // urn:datasetsCount
    result.push(publisher);
  });
  return result;
}
