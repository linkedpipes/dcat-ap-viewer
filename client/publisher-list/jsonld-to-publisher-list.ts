import {
  JsonLdEntity,
  iterateEntitiesByType,
  getId,
  getValue,
} from "../jsonld";
import {Publisher} from "./publisher-list-model";
import {SCHEMA, LP} from "../vocabulary/vocabulary"

export function jsonLdToPublisherList(jsonld: JsonLdEntity[]): Publisher[] {
  const result: Publisher[] = [];
  iterateEntitiesByType(jsonld, SCHEMA.Organization, (entry) => {
    const publisher: Publisher = {
      "iri": getId(entry),
      "datasetCount": Number(getValue(entry, LP.datasetsCount)),
    };
    result.push(publisher);
  });
  return result;
}
