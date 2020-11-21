import {
  getId,
  JsonLdEntity,
  iterateEntities,
  getString,
} from "./jsonld";
import {FOAF, SKOS, DCTERMS, RDF, RDFS, VCARD} from "./vocabulary";
import {Label} from "../data-api/api-label";
import {Literal} from "../data-model/primitives";

/**
 * Extract and return all labels.
 */
export function jsonLdToLabels(jsonld: JsonLdEntity[]): Label[] {
  const result: Label[] = [];
  iterateEntities(jsonld, (entity) => {
    // We merge all labels, so basically we randomly pick one of
    // the available.
    const literal: Literal = {
      ...getString(entity, SKOS.prefLabel),
      ...getString(entity, DCTERMS.title),
      ...getString(entity, RDF.label),
      ...getString(entity, VCARD.fn),
      ...getString(entity, FOAF.name),
      ...getString(entity, RDFS.label),
    };
    if (Object.keys(literal).length > 0) {
      result.push({
        "iri": getId(entity),
        "value": literal,
      });
    }
  });
  return result;
}
