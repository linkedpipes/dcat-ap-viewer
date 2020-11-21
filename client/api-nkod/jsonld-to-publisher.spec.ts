import {flatten} from "jsonld";
import {jsonLdToPublishers} from "./jsonld-to-publisher";

test("Load publishers JSON-LD.", async () => {
  const input = await flatten([{
    "@type": "http://schema.org/Organization",
    "@id": "https://data.gov.cz/zdroj/ovm/Min",
    "urn:datasetsCount": 519,
    "http://xmlns.com/foaf/0.1/name": {
      "@language": "cs",
      "@value": "Miny"
    }
  }, {
    "@type": "http://schema.org/Organization",
    "@id": "https://data.gov.cz/zdroj/ovm/Poskytovatel1",
    "urn:datasetsCount": 15,
    "http://xmlns.com/foaf/0.1/name": {
      "@language": "cs",
      "@value": "poskytovatel"
    }
  }]);
  const actual = await jsonLdToPublishers(input as any);
  const expected = [{
    "iri": "https://data.gov.cz/zdroj/ovm/Min",
    "title": {
      "cs": "Miny"
    },
    "datasetCount": 519
  }, {
    "iri": "https://data.gov.cz/zdroj/ovm/Poskytovatel1",
    "title": {
      "cs": "poskytovatel"
    },
    "datasetCount": 15
  }];
  expect(actual).toEqual(expected);
});
