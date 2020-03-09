import {
  JsonLdEntity,
  iterateEntitiesByType,
  getId,
  getValue,
} from "../../jsonld";
import {LP} from "../../vocabulary/vocabulary"

interface Keyword {
  iri: string;
  usedByPublisherCount?: number;
}

export function jsonLdToKeywordList(jsonld: JsonLdEntity[]): Keyword[] {
  const result: Keyword[] = [];
  iterateEntitiesByType(jsonld, LP.Keyword, (entry) => {
    const publisher: Keyword = {
      "iri": getId(entry),
      "usedByPublisherCount": Number(getValue(entry, LP.usedByPublishersCount)),
    };
    result.push(publisher);
  });
  return result;
}
