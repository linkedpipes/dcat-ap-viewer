import {
  JsonLdEntity,
  iterateEntitiesByType,
  getValue,
  getPlainString,
} from "./jsonld";
import {LP, SKOS} from "./vocabulary"
import {Keyword} from "../data-model/keyword";

export function jsonLdToKeywords(jsonld: JsonLdEntity[]): Keyword[] {
  const result: Keyword[] = [];
  iterateEntitiesByType(jsonld, LP.Keyword, (entry) => {
    const label = getPlainString(entry, SKOS.prefLabel);
    if (label === undefined) {
      return;
    }
    result.push({
      "code": label,
      "title": {"": label},
      "usedByPublisherCount": Number(getValue(entry, LP.usedByPublishersCount)),
    });
  });
  result.sort((left, right) => left.code.localeCompare(right.code));
  return result;
}
