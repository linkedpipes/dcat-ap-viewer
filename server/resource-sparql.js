const request = require("request");
const config = require("./../configuration");
const queries = require("./sparql-queries");

module.exports = {
  "createDatasetsGet": createDatasetsGet,
  "createDistributionsGet": createDistributionsGet,
  "createQualityGet": createQualityGet,
  "createPublishersQualityGet": createPublishersQualityGet,
};

function createDatasetsGet() {
  return (req, res) => {
    const datasetIri = req.query.iri;
    const sparql = queries.dataset(datasetIri);
    queryDataFromSparql(res, sparql);
  }
}

function queryDataFromSparql(res, sparql) {
  const url = config.data.sparql + "/?" +
        "format=application%2Fx-json%2Bld&" +
        "timeout=0&" +
        "query=" + encodeURIComponent(sparql);
  request.get({"url": url}).on("error", (error) => {
    handleError(res, error);
  }).pipe(res);
}

function handleError(res, error) {
  // TODO Improve logging and error handling #38.
  console.error("Request failed: ", error);
  res.status(500).json({
    "error": "service_request_failed",
  });
}

function createDistributionsGet() {
  return (req, res) => {
    const distributionIri = req.query.iri;
    const sparql = queries.distribution(distributionIri);
    queryDataFromSparql(res, sparql);
  }
}

function createQualityGet() {
  return (req, res) => {
    const query = createQualityGetSparql(req.query.iri);
    const url = config.quality.sparql + "/?" +
            "format=application%2Fx-json%2Bld&" +
            "timeout=0&" +
            "query=" + encodeURIComponent(query);
    request.get({"url": url}).on("error", (error) => {
      handleError(res, error);
    }).pipe(res);
  }
}

function createQualityGetSparql(resource) {
  return `
prefix dqv: <http://www.w3.org/ns/dqv#>
prefix sdmx-dimension: <http://purl.org/linked-data/sdmx/2009/dimension#>
prefix skos: <http://www.w3.org/2004/02/skos/core#> 

CONSTRUCT {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${resource}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value ;
    sdmx-dimension:refPeriod ?refPeriod ;
    skos:note ?note .
} WHERE {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${resource}> ;
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

function createPublishersQualityGet() {
  const query = `
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
  return (req, res) => {
    const url = config.quality.sparql + "/?" +
            "format=application%2Fx-json%2Bld&" +
            "timeout=0&" +
            "query=" + encodeURIComponent(query);
    request.get({"url": url}).on("error", (error) => {
      handleError(res, error);
    }).pipe(res);
  }
}
