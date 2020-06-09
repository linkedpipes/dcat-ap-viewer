import {
  getEntityByType,
  getEntityByIri,
  getResource,
  getStrings,
} from "../../jsonld";
import {PU, DCAT} from "../../vocabulary/vocabulary";

export function jsonLdToTermsOfUse(jsonld) {
  const distribution = getEntityByType(jsonld, DCAT.Distribution);
  if (distribution === undefined) {
    return undefined;
  }
  const iri = getResource(distribution, PU.specification);
  if (iri === undefined) {
    return {
      "authorship": "missing",
      "author": "missing",
      "databaseAuthorship": "missing",
      "databaseAuthor": "missing",
      "protectedDatabase": "missing",
      "personalData": "missing",
    };
  }
  const entity = getEntityByIri(jsonld, iri);
  return {
    "authorship": getResource(entity, PU.authorship),
    "author": getStrings(entity, PU.author),
    "databaseAuthorship": getResource(entity, PU.databaseAuthorship),
    "databaseAuthor": getStrings(entity, PU.databaseAuthor),
    "protectedDatabase": getResource(entity, PU.protectedDatabase),
    "personalData": getResource(entity, PU.personalData),
  };
}
