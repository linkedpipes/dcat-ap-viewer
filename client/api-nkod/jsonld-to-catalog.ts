import {
  getEntityByIri,
  getId,
  getPlainString,
  getResource,
  getString,
  getTypes,
  iterateEntities,
  JsonLdEntity,
} from "./jsonld";
import {DCAT, DCTERMS, FOAF, NKOD} from "./vocabulary"
import {Catalog, CatalogType} from "../data-model/catalog";

export function jsonLdToCatalogs(jsonld: JsonLdEntity[]): Catalog[] {
  const result: Catalog[] = [];
  iterateEntities(jsonld, (entry) => {
    const type = rdfTypesToCatalogType(getTypes(entry));
    if (type === undefined) {
      return;
    }
    const catalog: Catalog = {
      "iri": getId(entry),
      "title": getString(entry, DCTERMS.title),
      "type": type,
      "endpoint": getResource(entry, DCAT.endpointURL),
      "publisher": getResource(entry, DCTERMS.publisher),
      "homepage": getResource(entry, FOAF.homepage),
    };
    const contact = getEntityByIri(
      jsonld, getResource(entry, DCAT.contactPoint));
    if (contact) {
      catalog["contactName"] = getString(contact, FOAF.name);
      catalog["contactEmail"] = getPlainString(contact, FOAF.email);
    }
    result.push(catalog);
  });
  result.sort((left, right) => left.iri.localeCompare(right.iri));
  return result;
}

function rdfTypesToCatalogType(types: string[]): CatalogType | undefined {
  for (const type of types) {
    switch (type) {
      case NKOD.DcatApSparql:
        return CatalogType.DcatApSparql;
      case NKOD.CkanApiLkod:
        return CatalogType.CkanApiLkod;
      case NKOD.DcatApLkod:
        return CatalogType.DcatApLkod;
    }
  }
  return undefined;
}
