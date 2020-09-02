import {
  JsonLdEntity,
  iterateEntitiesByType,
  getId,
  getTypes,
  getResource,
  getValue,
  getEntityByIri,
} from "../jsonld";
import {NKOD, FOAF, DCTERMS, DCAT} from "../vocabulary/vocabulary"
import {Catalog} from "./catalog-list-model";

export function jsonLdToCatalogList(jsonld: JsonLdEntity[]): Catalog[] {
  const result: Catalog[] = [];
  iterateEntitiesByType(jsonld, NKOD.CkanApiLkod, (entry) => {
    const catalog: Catalog = {
      "iri": getId(entry),
      "type": getTypes(entry),
      "endpoint": getResource(entry, DCAT.endpointURL),
      "publisher": getResource(entry, DCTERMS.publisher),
    };
    const contactIri = getResource(entry, DCAT.contactPoint);
    if (contactIri) {
      catalog["contact"] = contactIri;
      const contact = getEntityByIri(jsonld, contactIri);
      if (contact) {
        catalog["contactEmail"] = String(getValue(contact, FOAF.email));
      }
    }
    result.push(catalog);
  });
  return result;
}
