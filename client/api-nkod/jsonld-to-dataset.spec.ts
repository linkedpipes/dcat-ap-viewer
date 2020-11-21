import {flatten} from "jsonld";
import {jsonLdToDataset, jsonLdToDatasetList} from "./jsonld-to-dataset";

test("Load dataset JSON-LD.", async () => {
  const input = await flatten([{
    "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992",
    "@type": [
      "http://www.w3.org/ns/dcat#Dataset",
      "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
    ],
    "http://purl.org/dc/terms/accrualPeriodicity": [{
      "@id": "http://publications.europa.eu/resource/authority/frequency/DAILY"
    }],
    "http://purl.org/dc/terms/conformsTo": [{
      "@id": "https://ofn.gov.cz/aktuality/draft/"
    }],
    "http://purl.org/dc/terms/description": [{
      "@language": "en",
      "@value": "Description of my second DCAT2 dataset."
    }, {
      "@language": "cs",
      "@value": "Popis mé druhé DCAT2 datové sady."
    }],
    "http://purl.org/dc/terms/issued": [{
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      "@value": "2019-01-03T13:32:50.784+01:00"
    }],
    "http://purl.org/dc/terms/modified": [{
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      "@value": "2019-01-03T13:32:50.784+01:00"
    }],
    "http://purl.org/dc/terms/publisher": [{
      "@id": "https://data.gov.cz/zdroj/ovm/Poskytovatel1"
    }],
    "http://purl.org/dc/terms/spatial": [{
      "@id": "http://publications.europa.eu/resource/authority/continent/AMERICA"
    }, {
      "@id": "http://publications.europa.eu/resource/authority/country/AUT"
    }, {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    }],
    "http://purl.org/dc/terms/temporal": [{
      "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/časové-pokrytí"
    }],
    "http://purl.org/dc/terms/title": [{
      "@language": "cs",
      "@value": "Moje druhá DCAT2 datová sada - se službama"
    }, {
      "@language": "en",
      "@value": "My second DCAT2 dataset - with services"
    }],
    "http://www.w3.org/ns/dcat#contactPoint": [{
      "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/kontaktní-bod"
    }],
    "http://www.w3.org/ns/dcat#distribution": [{
      "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/56ca3053d092a21ced39ef30df66491c"
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/b10568642772621b2354c76b4c06f34a"
    }, {
      "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/da47f610258a0b78fc1f8eee913e4e93"
    }],
    "http://www.w3.org/ns/dcat#keyword": [{
      "@language": "en",
      "@value": "english3"
    }, {
      "@language": "en",
      "@value": "enkey2"
    }, {
      "@language": "en",
      "@value": "enkeyword1"
    }, {
      "@language": "cs",
      "@value": "český3"
    }, {
      "@language": "cs",
      "@value": "českýklíč1"
    }, {
      "@language": "cs",
      "@value": "českýklíč2"
    }],
    "http://www.w3.org/ns/dcat#spatialResolutionInMeters": [{
      "@type": "http://www.w3.org/2001/XMLSchema#decimal",
      "@value": "12.0"
    }],
    "http://www.w3.org/ns/dcat#temporalResolution": [{
      "@type": "http://www.w3.org/2001/XMLSchema#duration",
      "@value": "P20M"
    }],
    "http://www.w3.org/ns/dcat#theme": [{
      "@id": "http://eurovoc.europa.eu/1954"
    }, {
      "@id": "http://eurovoc.europa.eu/3101"
    }, {
      "@id": "http://eurovoc.europa.eu/5713"
    }, {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/INTR"
    }, {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO"
    }, {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/SOCI"
    }, {
      "@id": "https://mojecooltéma.cz/témata/mojecool"
    }],
    "http://xmlns.com/foaf/0.1/page": [{
      "@id": "https://dokumenace.cz/bbb"
    }]
  }, {
    "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/časové-pokrytí",
    "@type": [
      "http://purl.org/dc/terms/PeriodOfTime"
    ],
    "http://www.w3.org/ns/dcat#endDate": [{
      "@type": "http://www.w3.org/2001/XMLSchema#date",
      "@value": "2020-03-24"
    }],
    "http://www.w3.org/ns/dcat#startDate": [{
      "@type": "http://www.w3.org/2001/XMLSchema#date",
      "@value": "2020-03-13"
    }]
  }, {
    "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/kontaktní-bod",
    "@type": [
      "http://www.w3.org/2006/vcard/ns#Organization"
    ],
    "http://www.w3.org/2006/vcard/ns#fn": [{
      "@language": "cs",
      "@value": "Nasťa Kurátorová"
    }],
    "http://www.w3.org/2006/vcard/ns#hasEmail": [{
      "@id": "mailto:nasta@kuratorovi.cz"
    }]
  }, {
    "@id": "http://eurovoc.europa.eu/1954",
    "http://www.w3.org/2004/02/skos/core#inScheme": [{
      "@id": "http://eurovoc.europa.eu/"
    }]
  }, {
    "@id": "http://eurovoc.europa.eu/3101",
    "http://www.w3.org/2004/02/skos/core#inScheme": [{
      "@id": "http://eurovoc.europa.eu/"
    }]
  }, {
    "@id": "http://eurovoc.europa.eu/5713",
    "http://www.w3.org/2004/02/skos/core#inScheme": [{
      "@id": "http://publications.europa.eu/resource/authority/data-theme"
    }]
  }, {
    "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/záznam",
    "@type": [
      "http://www.w3.org/ns/dcat#CatalogRecord"
    ]
  }]);
  const actual = await jsonLdToDataset(input as any);
  const expected = {
    "iri": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992",
    "title": {
      "cs": "Moje druhá DCAT2 datová sada - se službama",
      "en": "My second DCAT2 dataset - with services",
    },
    "description": {
      "cs": "Popis mé druhé DCAT2 datové sady.",
      "en": "Description of my second DCAT2 dataset.",
    },
    "contactPoints": [{
      "iri": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/kontaktní-bod",
      "title": {
        "cs": "Nasťa Kurátorová",
      },
      "email": "nasta@kuratorovi.cz",
    }],
    "distributions": [
      "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/56ca3053d092a21ced39ef30df66491c",
      "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/b10568642772621b2354c76b4c06f34a",
      "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/distribuce/da47f610258a0b78fc1f8eee913e4e93",
    ],
    "keywords": [
      {"en": "english3"},
      {"en": "enkey2"},
      {"en": "enkeyword1"},
      {"cs": "český3"},
      {"cs": "českýklíč1"},
      {"cs": "českýklíč2"},
    ],
    "publisher": "https://data.gov.cz/zdroj/ovm/Poskytovatel1",
    "themes": [
      "http://eurovoc.europa.eu/1954",
      "http://eurovoc.europa.eu/3101",
      "http://publications.europa.eu/resource/authority/data-theme/INTR",
      "http://publications.europa.eu/resource/authority/data-theme/OP_DATPRO",
      "http://publications.europa.eu/resource/authority/data-theme/SOCI",
      "https://mojecooltéma.cz/témata/mojecool"
    ],
    "datasetThemes": [
      "http://eurovoc.europa.eu/5713",
    ],
    "accessRights": [],
    "conformsTo": ["https://ofn.gov.cz/aktuality/draft/"],
    "documentation": ["https://dokumenace.cz/bbb"],
    "frequency": "http://publications.europa.eu/resource/authority/frequency/DAILY",
    "hasVersion": [],
    "identifier": [],
    "isVersionOf": [],
    "landingPage": [],
    "language": [],
    "otherIdentifier": [],
    "provenance": [],
    "relation": [],
    "issued": ["2019-01-03T13:32:50.784+01:00"],
    "sample": [],
    "source": [],
    "spatial": [
      "http://publications.europa.eu/resource/authority/continent/AMERICA",
      "http://publications.europa.eu/resource/authority/country/AUT",
      "https://linked.cuzk.cz/resource/ruian/stat/1"
    ],
    "spatialResolutionInMeters": 12,
    "temporal": {
      "startDate": "2020-03-13",
      "endDate": "2020-03-24"
    },
    "temporalResolution": "P20M",
    "type": [],
    "modified": ["2019-01-03T13:32:50.784+01:00"],
    "version": [],
    "versionNotes": [],
    "datasets": [],
    "parentDataset": undefined,
    "catalog": undefined,
    "catalogSource": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel1/9999992/záznam",
    "lkod": undefined,
  };
  expect(actual).toEqual(expected);
});

test("Load datasets JSON-LD.", async () => {
  const input = await flatten({
    "@context": {
      "dcterms": "http://purl.org/dc/terms/",
      "dcat": "http://www.w3.org/ns/dcat#",
      "Metadata": "urn:DatasetListMetadata",
      "count": "urn:count",
      "Dataset": "dcat:Dataset",
      "modified": "dcterms:modified",
      "accrualPeriodicity": "dcterms:accrualPeriodicity",
      "description": "dcterms:description",
      "issued": "dcterms:issued",
      "title": "dcterms:title",
      "keyword": "dcat:keyword",
      "theme": "dcat:theme",
      "format": "dcterms:format",
      "publisher": "dcterms:publisher",
      "spatial": "dcterms:spatial",
      "Facet": "urn:Facet",
      "facet": "urn:facet",
      "FacetMetadata": "urn:FacetMetadata",
      "code": "urn:code",
      "datasetsCount": "urn:datasetsCount",
      "order": "urn:order",
      "isPartOf": "urn:isPartOf"
    },
    "@graph": [
      {
        "@type": "Metadata",
        "datasetsCount": 1198
      },
      {
        "@id": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel2/6997781/9c73b802263c5e0ccf5542f10fbc35bb",
        "@type": "Dataset",
        "accrualPeriodicity": {
          "@id": "http://publications.europa.eu/resource/authority/frequency/DAILY"
        },
        "description": {
          "@language": "cs",
          "@value": "Agendy evidované v Registru práv a povinností."
        },
        "title": {
          "@language": "cs",
          "@value": "Agendy"
        },
        "keyword": [
          "agenda",
          "registr práv a povinností",
          "činnost"
        ],
        "theme": [{
          "@id": "http://eurovoc.europa.eu/2580"
        }, {
          "@id": "http://eurovoc.europa.eu/39"
        }, {
          "@id": "http://eurovoc.europa.eu/4182"
        }, {
          "@id": "http://publications.europa.eu/resource/authority/data-theme/GOVE"
        }],
        "format": [{
          "@id": "http://publications.europa.eu/resource/authority/file-type/JSON"
        }, {
          "@id": "http://publications.europa.eu/resource/authority/file-type/JSON_LD"
        }],
        "publisher": {
          "@id": "https://data.gov.cz/zdroj/ovm/Poskytovatel2"
        },
        "spatial": [{
          "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
        }],
        "order": 0
      },
      {
        "@id": "https://data.gov.cz/zdroj/datové-sady/MinFinCZ/9999996/c1ddd16f59c6246b8aafc124c3b58166",
        "@type": "Dataset",
        "accrualPeriodicity": {
          "@id": "http://publications.europa.eu/resource/authority/frequency/IRREG"
        },
        "description": {
          "@language": "cs",
          "@value": "Číselník stavů organizací"
        },
        "title": {
          "@language": "cs",
          "@value": "Aktivní organizace"
        },
        "keyword": [
          "rozpočet",
          "státní pokladna"
        ],
        "theme": [{
          "@id": "http://publications.europa.eu/resource/authority/data-theme/ECON"
        }, {
          "@id": "http://publications.europa.eu/resource/authority/data-theme/GOVE"
        }],
        "format": [{
          "@id": "http://publications.europa.eu/resource/authority/file-type/XML"
        }],
        "publisher": {
          "@id": "https://data.gov.cz/zdroj/ovm/MinFin"
        },
        "spatial": [{
          "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
        }],
        "order": 1,
        "isPartOf": [
          {
            "@id": "https://data.gov.cz/zdroj/datové-sady/MinFinCZ/9999996/5aef27ffbec6d40cf1e775b109d6b327"
          }
        ]
      }, {
        "@type": "Facet",
        "urn:code": "rozpočet",
        "facet": {"@id": "urn:keyword"},
        "count": 370
      },
      {
        "@type": "Facet",
        "urn:code": "číselník",
        "facet": {"@id": "urn:keyword"},
        "count": 370
      },
      {
        "@type": "FacetMetadata",
        "facet": {"@id": "urn:keyword"},
        "count": 567
      },
      {
        "@type": "Facet",
        "@id": "http://publications.europa.eu/resource/authority/file-type/CSV",
        "facet": {"@id": "urn:format"},
        "count": 629
      },
      {
        "@type": "FacetMetadata",
        "facet": {"@id": "urn:publisher"},
        "count": 5
      },
      {
        "@type": "Facet",
        "@id": "http://publications.europa.eu/resource/authority/data-theme/GOVE",
        "facet": {"@id": "urn:theme"},
        "count": 559
      },
      {
        "@type": "FacetMetadata",
        "facet": {"@id": "urn:theme"},
        "count": 49
      },
      {
        "@type": "FacetMetadata",
        "facet": {"@id": "urn:format"},
        "count": 0
      }
    ]
  });
  const actual = await jsonLdToDatasetList(input as any);
  const expected = {
    "datasets": [
      {
        "iri": "https://data.gov.cz/zdroj/datové-sady/Poskytovatel2/6997781/9c73b802263c5e0ccf5542f10fbc35bb",
        "title": {
          "cs": "Agendy"
        },
        "accrualPeriodicity": "http://publications.europa.eu/resource/authority/frequency/DAILY",
        "description": {
          "cs": "Agendy evidované v Registru práv a povinností."
        },
        "formats": [
          "http://publications.europa.eu/resource/authority/file-type/JSON",
          "http://publications.europa.eu/resource/authority/file-type/JSON_LD",
        ],
        "issued": undefined,
        "modified": undefined,
        "publisher": "https://data.gov.cz/zdroj/ovm/Poskytovatel2",
        "spatial": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
        "keywords": [
          {"": "agenda"},
          {"": "registr práv a povinností"},
          {"": "činnost"},
        ],
        "themes": [
          "http://eurovoc.europa.eu/2580",
          "http://eurovoc.europa.eu/39",
          "http://eurovoc.europa.eu/4182",
          "http://publications.europa.eu/resource/authority/data-theme/GOVE",
        ],
        "order": 0,
        "isPartOf": undefined,
      },
      {
        "iri": "https://data.gov.cz/zdroj/datové-sady/MinFinCZ/9999996/c1ddd16f59c6246b8aafc124c3b58166",
        "title": {
          "cs": "Aktivní organizace",
        },
        "accrualPeriodicity": "http://publications.europa.eu/resource/authority/frequency/IRREG",
        "description": {
          "cs": "Číselník stavů organizací",
        },
        "formats": [
          "http://publications.europa.eu/resource/authority/file-type/XML"
        ],
        "issued": undefined,
        "modified": undefined,
        "publisher": "https://data.gov.cz/zdroj/ovm/MinFin",
        "spatial": ["https://linked.cuzk.cz/resource/ruian/stat/1"],
        "keywords": [
          {"": "rozpočet"},
          {"": "státní pokladna"},
        ],
        "themes": [
          "http://publications.europa.eu/resource/authority/data-theme/ECON",
          "http://publications.europa.eu/resource/authority/data-theme/GOVE",
        ],
        "order": 1,
        "isPartOf": "https://data.gov.cz/zdroj/datové-sady/MinFinCZ/9999996/5aef27ffbec6d40cf1e775b109d6b327",
      }
    ],
    "datasetsCount": 1198,
    "themes": [
      {
        "iri": "http://publications.europa.eu/resource/authority/data-theme/GOVE",
        "title": undefined,
        "count": 559,
        "color": undefined,
        "queryCode": "http://publications.europa.eu/resource/authority/data-theme/GOVE",
      }
    ],
    "themesCount": 49,
    "keywords": [
      {
        "iri": "_:b1",
        "title": {
          "": "rozpočet",
        },
        "count": 370,
        "color": undefined,
        "queryCode": "rozpočet"
      }, {
        "iri": "_:b2",
        "title": {
          "": "číselník",
        },
        "count": 370,
        "color": undefined,
        "queryCode": "číselník"
      }
    ],
    "keywordsCount": 567,
    "publishers": [],
    "publishersCount": 5,
    "formats": [
      {
        "iri": "http://publications.europa.eu/resource/authority/file-type/CSV",
        "title": undefined,
        "count": 629,
        "color": undefined,
        "queryCode": "http://publications.europa.eu/resource/authority/file-type/CSV",
      }
    ],
    "formatsCount": 0
  };
  expect(actual).toEqual(expected);
});
