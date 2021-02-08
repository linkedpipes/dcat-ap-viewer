import {flatten} from "jsonld";
import {jsonLdToKeywords} from "./jsonld-to-keyword";

test("Load keywords JSON-LD.", async () => {
  const input = await flatten([
    {
      "@type": [
        "urn:Keyword",
      ],
      "http://www.w3.org/2004/02/skos/core#prefLabel": {
        "@language": "cs",
        "@value": "přirozený pohyb",
      },
      "urn:usedByPublishersCount": 1,
    },
    {
      "@type": [
        "urn:Keyword",
      ],
      "http://www.w3.org/2004/02/skos/core#prefLabel": {
        "@language": "cs",
        "@value": "uchazeč o práci",
      },
      "urn:usedByPublishersCount": 3,
    },
  ]);
  const actual = await jsonLdToKeywords(input as any);
  const expected = [{
    "code": "přirozený pohyb",
    "title": {
      // Keywords are without a language.
      "": "přirozený pohyb",
    },
    "usedByPublisherCount": 1,
  }, {
    "code": "uchazeč o práci",
    "title": {
      "": "uchazeč o práci",
    },
    "usedByPublisherCount": 3,
  }];
  expect(actual).toEqual(expected);
});
