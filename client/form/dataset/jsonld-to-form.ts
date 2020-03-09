import {
  JsonLdEntity,
  getEntityByType,
  getId,
  getResource, getEntitiesByType,
} from "../../jsonld";
import {
  DCAT,
  DCTERMS,
  NKOD,
} from "../../vocabulary/vocabulary";

export function jsonldToForm(jsonld: JsonLdEntity[]) {
  const dataset = getEntityByType(jsonld, DCAT.Dataset);
  const catalog = getEntityByType(jsonld, DCAT.Catalog);
  const catalogRecord = getEntityByType(jsonld, DCAT.CatalogRecord);
  return {
    "catalog": catalog ? getId(catalog) : undefined,
    "catalogSource": catalogRecord ?
      getResource(catalogRecord, DCTERMS.source) : undefined,
    "lkod": dataset ? getResource(dataset, NKOD.lkod) : undefined,
  };
}
