const {handleApiError} = require("./../http-utils");
const {executeSparqlConstruct} = require("./sparql-api");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    "v2-quality-dataset": createV2QualityDataset(configuration),
    "v2-quality-distribution": createV2QualityDistribution(configuration),
    "v2-quality-publisher": createV2QualityPublisher(configuration),
  }
}

function createV2QualityDataset(configuration) {
  return (req, res) => {
    const iri = req.query.iri;
    const query = qualitySparql(iri);
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}

function qualitySparql(iri) {
  return `
prefix dqv: <http://www.w3.org/ns/dqv#>
prefix sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>
prefix skos: <http://www.w3.org/2004/02/skos/core#> 

CONSTRUCT {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${iri}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value ;
    sdmx-dimension:refPeriod ?refPeriod ;
    skos:note ?note .
} WHERE {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${iri}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value .
  OPTIONAL {
    ?measure sdmx-dimension:refPeriod ?refPeriod .
  }
  OPTIONAL {
    ?measure skos:note ?note .
  }  
}
`;
}

function createV2QualityDistribution(configuration) {
  return (req, res) => {
    const iri = req.query.iri;
    const query = qualitySparql(iri);
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}

function createV2QualityPublisher(configuration) {
  return (req, res) => {
    const query = qualityPublisherSparql();
    executeSparqlConstruct(configuration.url, query)
      .then(data => res.json(data))
      .catch(error => handleApiError(res, error));
  };
}

function qualityPublisherSparql() {
  return `
prefix foaf: <http://xmlns.com/foaf/0.1/>

CONSTRUCT {
  ?publisher a <https://data.gov.cz/slovník/nkod/VzornýPoskytovatel> ;
    foaf:name ?name .
}
WHERE {
  ?publisher a <https://data.gov.cz/slovník/nkod/VzornýPoskytovatel> ;
    foaf:name ?name .
}
`;
}
