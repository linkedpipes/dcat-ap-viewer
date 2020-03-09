import {
  JsonLdEntity,
  iterateEntitiesByType,
  getId,
} from "../../jsonld";
import {NKOD} from "../../vocabulary/vocabulary"

export function jsonLdToPublisherList(jsonld: JsonLdEntity[]): string[] {
  const result: string[] = [];
  iterateEntitiesByType(jsonld, NKOD.ExceptionalPublisher, (entry) => {
    result.push(getId(entry));
  });
  return result;
}
