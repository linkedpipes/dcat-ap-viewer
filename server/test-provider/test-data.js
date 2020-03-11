const INITIAL_DATA = [];

const DATASET_LIST = [];

const DATASETS = {};

const DISTRIBUTIONS = {};

(function initialize() {
  module.exports = {
    "initial-data": INITIAL_DATA,
    "dataset-list": DATASET_LIST,
    "datasets": DATASETS,
    "distributions": DISTRIBUTIONS
  };
})();

DATASET_LIST.push([
  {
    "@type": "urn:DatasetListMetadata",
    "urn:datasetsCount": 1
  },
  {
    "@id": "urn:ds",
    "@type": "http://www.w3.org/ns/dcat#Dataset",
    "http://purl.org/dc/terms/title": [
      {
        "@language": "cs",
        "@value": "První datová sada"
      },
      {
        "@language": "en",
        "@value": "First dataset"
      }
    ],
    "http://purl.org/dc/terms/description": [
      {
        "@language": "cs",
        "@value": "Popisuji první datovou sadu"
      },
      {
        "@language": "en",
        "@value": "Description of my first dataset"
      }
    ],
    "http://www.w3.org/ns/dcat#keyword": [
      [
        {
          "@language": "cs",
          "@value": "Klíč1"
        },
      ]
    ],
    "http://purl.org/dc/terms/publisher": {
      "@id": "https://data.gov.cz/zdroj/ovm/00075370"
    }
  },
]);

DATASETS[""] = {
  "@id": "urn:ds",
  "@type": [
    "http://www.w3.org/ns/dcat#Dataset",
    "https://data.gov.cz/slovník/nkod/typ-datové-sady-dle-zdroje/Formulář"
  ],
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "První datová sada"
    },
    {
      "@language": "en",
      "@value": "First dataset"
    }
  ],
  "http://purl.org/dc/terms/description": [
    {
      "@language": "cs",
      "@value": "Popisuji první datovou sadu"
    },
    {
      "@language": "en",
      "@value": "Description of my first dataset"
    }
  ],
  "http://www.w3.org/ns/dcat#distribution": [
    {"@id": "urn:ds/dist/000"},
    {"@id": "urn:ds/dist/001"}
  ],
  "http://www.w3.org/ns/dcat#keyword": [
    [
      {
        "@language": "cs",
        "@value": "Klíč1"
      },
    ],
    [
      {
        "@language": "en",
        "@value": "Key2"
      }
    ]
  ],
  "http://purl.org/dc/terms/accrualPeriodicity": {
    "@id": "http://publications.europa.eu/resource/authority/frequency/MONTHLY"
  },
  "http://purl.org/dc/terms/spatial": [
    {
      "@id": "https://linked.cuzk.cz/resource/ruian/stat/1"
    },
    {
      "@id": "http://publications.europa.eu/resource/authority/continent/EUROPE"
    },
    {
      "@id": "http://publications.europa.eu/resource/authority/country/ALB"
    },
    {
      "@id": "http://publications.europa.eu/resource/authority/place/AND_ALV"
    },
    {
      "@id": "http://dbpedia.org/resource/Earth"
    }
  ],
  "http://xmlns.com/foaf/0.1/page": {
    "@id": "https://moje-dokumentace.cz"
  },
  "http://www.w3.org/ns/dcat#theme": [
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/ENER"
    },
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/ECON"
    },
    {
      "@id": "http://publications.europa.eu/resource/authority/data-theme/INTR"
    },
    {
      "@id": "http://eurovoc.europa.eu/1230"
    },
    {
      "@id": "http://eurovoc.europa.eu/1236"
    },
    {
      "@id": "http://eurovoc.europa.eu/1603"
    },
    {
      "@id": "https://github.com/linkedpipes/dcat-ap-viewer/tree/feature/dcat-ap-2"
    }
  ],
  "http://purl.org/dc/terms/temporal": {
    "@type": [
      "http://purl.org/dc/terms/PeriodOfTime"
    ],
    "http://www.w3.org/ns/dcat#startDate": {
      "@type": "http://www.w3.org/2001/XMLSchema#date",
      "@value": "2020-01-01"
    },
    "http://www.w3.org/ns/dcat#endDate": {
      "@type": "http://www.w3.org/2001/XMLSchema#date",
      "@value": "2020-01-17"
    }
  },
  "http://www.w3.org/ns/dcat#temporalResolution": {
    "@value": "P20M",
    "@type": "http://www.w3.org/2001/XMLSchema#duration"
  },
  "http://www.w3.org/ns/dcat#spatialResolutionInMeters": {
    "@value": "23"
  },
  "http://www.w3.org/ns/dcat#contactPoint": {
    "@type": [
      "http://www.w3.org/2006/vcard/ns#Organization"
    ],
    "http://www.w3.org/2006/vcard/ns#fn": {
      "@language": "cs",
      "@value": "Jan Rohlík"
    },
    "http://www.w3.org/2006/vcard/ns#hasEmail": "rohlíček@seznam.cz"
  },
  "http://purl.org/dc/terms/publisher": {
    "@id": "https://data.gov.cz/zdroj/ovm/00075370"
  }
};

DISTRIBUTIONS["urn:ds/dist/000"] = {
  "@id": "urn:ds/dist/000",
  "@type": "http://www.w3.org/ns/dcat#Distribution",
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "Distro1"
    },
    {
      "@language": "en",
      "@value": "Distribution 1"
    }
  ],
  "http://www.w3.org/ns/dcat#downloadURL": {
    "@id": "https://download.url"
  },
  "http://www.w3.org/ns/dcat#mediaType": {
    "@id": "http://www.iana.org/assignments/media-types/application/gzip"
  },
  "http://purl.org/dc/terms/format": {
    "@id": "http://publications.europa.eu/resource/authority/file-type/CSV"
  },
  "http://purl.org/dc/terms/conformsTo": {
    "@id": "https://schéma.cz"
  },
  "http://www.w3.org/ns/dcat#packageFormat": {
    "@id": "http://www.iana.org/assignments/media-types/application/prs.hpub+zip"
  },
  "http://www.w3.org/ns/dcat#compressFormat": {
    "@id": "http://www.iana.org/assignments/media-types/application/gzip"
  },
  "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
    "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
    "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
      "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
      "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
      "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
      "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
    }
  }
};

DISTRIBUTIONS["urn:ds/dist/001"] = {
  "@id": "urn:ds/dist/001",
  "@type": "http://www.w3.org/ns/dcat#Distribution",
  "http://purl.org/dc/terms/title": [
    {
      "@language": "cs",
      "@value": "První služba"
    },
    {
      "@language": "en",
      "@value": "First data service"
    }
  ],
  "http://www.w3.org/ns/dcat#accessURL": {
    "@id": "https://data.service.1.cz"
  },
  "http://www.w3.org/ns/dcat#accessService": {
    "@type": "http://www.w3.org/ns/dcat#DataService",
    "http://www.w3.org/ns/dcat#endpointURL": {
      "@id": "https://data.service.1.cz"
    },
    "http://www.w3.org/ns/dcat#endpointDescription": {
      "@id": "https://data.service.1.cz/description"
    },
    "http://purl.org/dc/terms/title": [
      {
        "@language": "cs",
        "@value": "První služba"
      },
      {
        "@language": "en",
        "@value": "First data service"
      }
    ],
    "http://www.w3.org/ns/dcat#servesDataset": {
      "@id": "urn:ds"
    }
  },
  "https://data.gov.cz/slovník/podmínky-užití/specifikace": {
    "@type": "https://data.gov.cz/slovník/podmínky-užití/Specifikace",
    "https://data.gov.cz/slovník/podmínky-užití/autorské-dílo": {
      "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-autorská-díla/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/databáze-jako-autorské-dílo": {
      "@id": "https://data.gov.cz/podmínky-užití/není-autorskoprávně-chráněnou-databází/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/databáze-chráněná-zvláštními-právy": {
      "@id": "https://data.gov.cz/podmínky-užití/není-chráněna-zvláštním-právem-pořizovatele-databáze/"
    },
    "https://data.gov.cz/slovník/podmínky-užití/osobní-údaje": {
      "@id": "https://data.gov.cz/podmínky-užití/neobsahuje-osobní-údaje/"
    }
  }
};


