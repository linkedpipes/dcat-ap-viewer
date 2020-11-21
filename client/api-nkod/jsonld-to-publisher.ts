import {
  getId,
  getString,
  JsonLdEntity,
  iterateEntitiesByType,
  getValue,
} from "./jsonld";
import {SCHEMA, LP, FOAF} from "./vocabulary";
import {Publisher} from "../data-model/publisher";

export function jsonLdToPublishers(jsonld: JsonLdEntity[]): Publisher[] {
  const result: Publisher[] = [];
  iterateEntitiesByType(jsonld, SCHEMA.Organization, (entry) => {
    const publisher: Publisher = {
      "iri": getId(entry),
      "title": getString(entry, FOAF.name),
      "datasetCount": Number(getValue(entry, LP.datasetsCount)),
    };
    result.push(publisher);
  });
  result.sort((left, right) => left.iri.localeCompare(right.iri));
  return result;
}
