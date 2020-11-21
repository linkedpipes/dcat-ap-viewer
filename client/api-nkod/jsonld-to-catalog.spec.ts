import {flatten} from "jsonld";
import {jsonLdToCatalogs} from "./jsonld-to-catalog";
import {CatalogType} from "../data-model/catalog";

test("Load catalogs JSON-LD.", async () => {
  const input = await flatten([
    {
      "@id": "https://data.gov.cz/zdroj/lokální-katalogy/9999996",
      "@type": "https://data.gov.cz/slovník/nkod/DcatApSparql",
      "http://purl.org/dc/terms/publisher": {
        "@id": "https://data.gov.cz/zdroj/ovm/000000"
      },
      "http://purl.org/dc/terms/title": [{
        "@language": "en",
        "@value": "Dev catalog"
      }, {
        "@language": "cs",
        "@value": "Vývojový katalog"
      }],
      "http://www.w3.org/ns/dcat#contactPoint": {
        "http://xmlns.com/foaf/0.1/email": "user@example.cz",
        "http://xmlns.com/foaf/0.1/name": "Martin"
      },
      "http://www.w3.org/ns/dcat#endpointURL": {
        "@id": "https://opendata.mfcr.cz/lod/sparql"
      },
      "http://xmlns.com/foaf/0.1/homepage": {
        "@id": "https://example.com/homepage"
      }
    },
    {
      "@id": "https://data.gov.cz/zdroj/lokální-katalogy/6946049",
      "@type": "https://data.gov.cz/slovník/nkod/CkanApiLkod",
      "http://purl.org/dc/terms/publisher": {
        "@id": "https://data.gov.cz/zdroj/ovm/Poskytovatel1"
      },
      "http://purl.org/dc/terms/title": {
        "@language": "cs",
        "@value": "Nový test"
      },
      "http://www.w3.org/ns/dcat#contactPoint": {
        "http://xmlns.com/foaf/0.1/email": "user@example.cz",
        "http://xmlns.com/foaf/0.1/name": "Jakub"
      },
      "http://www.w3.org/ns/dcat#endpointURL": {
        "@id": "https://cssz.opendata.cz/sparql"
      }
    }]);
  const actual = await jsonLdToCatalogs(input as any);
  const expected = [{
    "iri": "https://data.gov.cz/zdroj/lokální-katalogy/6946049",
    "title": {
      "cs": "Nový test",
    },
    "type": CatalogType.CkanApiLkod,
    "endpoint": "https://cssz.opendata.cz/sparql",
    "publisher": "https://data.gov.cz/zdroj/ovm/Poskytovatel1",
    "contactName": {
      "": "Jakub"
    },
    "contactEmail": "user@example.cz",
    "homepage": undefined,
  }, {
    "iri": "https://data.gov.cz/zdroj/lokální-katalogy/9999996",
    "title": {
      "cs": "Vývojový katalog",
      "en": "Dev catalog",
    },
    "type": CatalogType.DcatApSparql,
    "endpoint": "https://opendata.mfcr.cz/lod/sparql",
    "publisher": "https://data.gov.cz/zdroj/ovm/000000",
    "contactName": {
      "": "Martin"
    },
    "contactEmail": "user@example.cz",
    "homepage": "https://example.com/homepage",
  }];
  expect(actual).toEqual(expected);
});
