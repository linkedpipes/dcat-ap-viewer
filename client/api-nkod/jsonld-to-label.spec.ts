import {flatten} from "jsonld";
import {jsonLdToLabels} from "./jsonld-to-label";

test("Load labels JSON-LD.", async () => {
  const input = await flatten([
    {
      "@id": "http://localhost",
      "http://www.w3.org/2004/02/skos/core#prefLabel": {
        "@language": "cs",
        "@value": "přirozený pohyb",
      },
    },
  ]);
  const actual = await jsonLdToLabels(input as any);
  const expected = [{
    "iri": "http://localhost",
    "value": {
      "cs": "přirozený pohyb",
    },
  }];
  expect(actual).toEqual(expected);
});
