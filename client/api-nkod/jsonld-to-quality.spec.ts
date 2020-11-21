import {flatten} from "jsonld";
import {jsonLdToQualityMeasures} from "./jsonld-to-quality";

test("Load quality JSON-LD.", async () => {
  const input = await flatten([{
    "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/a",
    "@type": ["http://www.w3.org/ns/dqv#QualityMeasurement"],
    "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": [{
      "@id": "http://reference.data.gov.uk/id/gregorian-instant/2020-10-23T15:37:45"
    }],
    "http://www.w3.org/ns/dqv#computedOn": [{
      "@id": "https://data.gov.cz/56ca3053d092a21ced39ef30df66491c",
    }],
    "http://www.w3.org/ns/dqv#isMeasurementOf": [{
      "@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiCORSPodmínekUžitíAutorskáDatabáze"
    }],
    "http://www.w3.org/ns/dqv#value": [{
      "@value": true
    }],
  }, {
    "@id": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/b",
    "@type": ["http://www.w3.org/ns/dqv#QualityMeasurement"],
    "http://purl.org/linked-data/sdmx/2009/dimension#refPeriod": [{
      "@id": "http://reference.data.gov.uk/id/gregorian-instant/2020-10-23T15:39:38"
    }],
    "http://www.w3.org/ns/dqv#computedOn": [{
      "@id": "https://data.gov.cz/56ca3053d092a21ced39ef30df66491c",
    }],
    "http://www.w3.org/ns/dqv#isMeasurementOf": [{
      "@id": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiCORSPodmínekUžitíAutorskáDatabáze"
    }],
    "http://www.w3.org/ns/dqv#value": [{
      "@value": false
    }]
  }]);
  const actual = await jsonLdToQualityMeasures(input as any);
  const expected = [{
    "iri": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/a",
    "value": true,
    "lastCheck": "2020-10-23 15:37:45",
    "computedOn": "https://data.gov.cz/56ca3053d092a21ced39ef30df66491c",
    "measureOf": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiCORSPodmínekUžitíAutorskáDatabáze",
    "note": undefined
  }, {
    "iri": "https://dev.nkod.opendata.cz/zdroj/datová-kvalita/b",
    "value": false,
    "lastCheck": "2020-10-23 15:39:38",
    "computedOn": "https://data.gov.cz/56ca3053d092a21ced39ef30df66491c",
    "measureOf": "https://data.gov.cz/zdroj/datová-kvalita/metriky/metrikaDostupnostiCORSPodmínekUžitíAutorskáDatabáze",
    "note": undefined
  }];
  expect(actual.measures).toEqual(expected);
});
