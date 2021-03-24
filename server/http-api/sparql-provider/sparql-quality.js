const {handleApiError} = require("./../http-utils");
const {executeSparqlConstruct} = require("./sparql-api");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    "v2-quality": createV2Quality(configuration),
  };
}

function createV2Quality(configuration) {
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
prefix schema: <http://schema.org/>

CONSTRUCT {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${iri}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value ;
    sdmx-dimension:refPeriod ?refPeriod ;
    skos:note ?note ;
    schema:object ?object .
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
  OPTIONAL {
    ?measure schema:object ?object .
  }
}
`;
}
