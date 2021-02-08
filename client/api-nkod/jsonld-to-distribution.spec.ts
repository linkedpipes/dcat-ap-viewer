import {flatten} from "jsonld";
import {jsonLdToDistributionOrDataService} from "./jsonld-to-distribution";
import {DistributionType} from "../data-model/distribution";

test("Load distribution JSON-LD.", async () => {
  const input = await flatten([{
    "@id": "https://localhost/distribution",
    "@type": ["http://www.w3.org/ns/dcat#Distribution"],
    "http://purl.org/dc/terms/conformsTo": [{
      "@id": "https://schéma.distribuce.cz/schéma.jsonld"
    }],
    "http://purl.org/dc/terms/format": [{
      "@id": "http://publications.europa.eu/resource/authority/file-type/CSV"
    }],
    "http://purl.org/dc/terms/title": [{
      "@language": "cs",
      "@value": "ZIP s céesvěčkem"
    }],
    "http://www.w3.org/ns/dcat#accessURL": [{
      "@id": "https://soubor.ke.stažení.cz/soubory/1.zip"
    }],
    "http://www.w3.org/ns/dcat#compressFormat": [{
      "@id": "http://www.iana.org/assignments/media-types/application/zip"
    }],
    "http://www.w3.org/ns/dcat#downloadURL": [{
      "@id": "https://soubor.ke.stažení.cz/soubory/1.zip"
    }],
    "http://www.w3.org/ns/dcat#mediaType": [{
      "@id": "http://www.iana.org/assignments/media-types/text/csv"
    }],
    "http://www.w3.org/ns/dcat#packageFormat": [{
      "@id": "http://www.iana.org/assignments/media-types/application/zip"
    }],
    "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": [{
      "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/specifikace": [{
      "@id": "https://localhost/distribution/podmínky-užití"
    }]
  }, {
    "@id": "https://localhost/distribution/podmínky-užití",
    "@type": [
      "https://data.gov.cz/slovník/podmínky-užití/Specifikace"
    ],
    "https://data.gov.cz/slovník/podmínky-užití/autor": [{
      "@language": "cs",
      "@value": "Pepa vomáčka"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/autor-databáze": [{
      "@language": "cs",
      "@value": "Jarda Pecka"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": [{
      "@id": "https://creativecommons.org/licenses/by/4.0/"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": [{
      "@id": "https://creativecommons.org/publicdomain/zero/1.0/"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": [{
      "@id": "https://creativecommons.org/licenses/by/4.0/"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": [{
      "@id": "https://data.gov.cz/podmínky-užití/obsahuje-osobní-údaje/"
    }]
  }]);
  const actual = await jsonLdToDistributionOrDataService(
    input as any, "https://localhost/distribution"
  );
  const expected = {
    "iri": "https://localhost/distribution",
    "title": {
      "cs": "ZIP s céesvěčkem",
    },
    "accessURL": "https://soubor.ke.stažení.cz/soubory/1.zip",
    "description": undefined,
    "format": "http://publications.europa.eu/resource/authority/file-type/CSV",
    "license": undefined,
    "byteSize": undefined,
    "checksum": [],
    "documentation": [],
    "downloadURL": ["https://soubor.ke.stažení.cz/soubory/1.zip"],
    "language": [],
    "conformsTo": ["https://schéma.distribuce.cz/schéma.jsonld"],
    "mediaType": "http://www.iana.org/assignments/media-types/text/csv",
    "issued": undefined,
    "rights": undefined,
    "status": undefined,
    "modified": undefined,
    "packageFormat": "http://www.iana.org/assignments/media-types/application/zip",
    "compressFormat": "http://www.iana.org/assignments/media-types/application/zip",
    "type": DistributionType.Distribution,
    "legal": {
      "authorship": "https://creativecommons.org/licenses/by/4.0/",
      "author": {
        "cs": "Pepa vomáčka",
      },
      "databaseAuthorship": "https://creativecommons.org/licenses/by/4.0/",
      "databaseAuthor": {
        "cs": "Jarda Pecka"
      },
      "protectedDatabase": "https://creativecommons.org/publicdomain/zero/1.0/",
      "personalData": "https://data.gov.cz/podmínky-užití/obsahuje-osobní-údaje/",
    }
  };
  expect(actual).toEqual(expected);
});

test("Load dataservice JSON-LD.", async () => {
  const input = await flatten([{
    "@id": "https://localhost/distribution",
    "@type": ["http://www.w3.org/ns/dcat#Distribution"],
    "http://purl.org/dc/terms/title": [{
      "@language": "en",
      "@value": "Another service"
    }],
    "http://www.w3.org/ns/dcat#accessService": [{
      "@id": "https://localhost/distribution/service"
    }],
    "http://www.w3.org/ns/dcat#accessURL": [{
      "@id": "https://data.gov.cz/NEEXISTUJE"
    }],
    "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/typÚložiště": [{
      "@id": "https://data.gov.cz/slovník/nkod/typ-úložiště-datové-sady/Web"
    }],
    "https://data.gov.cz/slovník/podmínky-užití/specifikace": [{
      "@id": "https://localhost/distribution/podmínky-užití"
    }]
  }, {
    "@id": "https://localhost/distribution/service",
    "@type": ["http://www.w3.org/ns/dcat#DataService"],
    "http://purl.org/dc/terms/title": [{
      "@language": "en",
      "@value": "Another service Name"
    }],
    "http://www.w3.org/ns/dcat#endpointDescription": [{
      "@id": "https://data.gov.cz/ED-NEEXISTUJE"
    }],
    "http://www.w3.org/ns/dcat#endpointURL": [{
      "@id": "https://data.gov.cz/sparql"
    }]
  },
    {
      "@id": "https://localhost/distribution/podmínky-užití",
      "@type": ["https://data.gov.cz/slovník/podmínky-užití/Specifikace"],
      "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": [{
        "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
      }],
      "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": [{
        "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
      }],
      "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": [{
        "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
      }],
      "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": [{
        "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
      }]
    }]);
  const actual = await jsonLdToDistributionOrDataService(
    input as any, "https://localhost/distribution"
  );
  const expected = {
    "iri": "https://localhost/distribution",
    "title": {
      "en": "Another service",
    },
    "accessURL": "https://data.gov.cz/NEEXISTUJE",
    "description": undefined,
    "format": undefined,
    "license": undefined,
    "byteSize": undefined,
    "checksum": [],
    "documentation": [],
    "downloadURL": [],
    "language": [],
    "conformsTo": [],
    "mediaType": undefined,
    "issued": undefined,
    "rights": undefined,
    "status": undefined,
    "modified": undefined,
    "packageFormat": undefined,
    "compressFormat": undefined,
    "dataService": "https://localhost/distribution/service",
    "dataServiceConformsTo": [],
    "dataServiceTitle": {
      "en": "Another service Name",
    },
    "endpointDescription": "https://data.gov.cz/ED-NEEXISTUJE",
    "endpointURL": "https://data.gov.cz/sparql",
    "type": DistributionType.DataService,
    "legal": {
      "authorship": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/",
      "author": undefined,
      "databaseAuthorship": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/",
      "databaseAuthor": undefined,
      "protectedDatabase": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/",
      "personalData": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/",
    }
  };
  expect(actual).toEqual(expected);
});
