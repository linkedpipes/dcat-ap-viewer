const request = require("request");
const config = require("./../configuration");
const queries = require("./sparql-queries");

module.exports = {
    "createDatasetsGet": createDatasetsGet,
    "createDistributionsGet": createDistributionsGet,
    "createQualityGet": createQualityGet
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
        "error": "service_request_failed"
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

CONSTRUCT {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${resource}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value ;
    sdmx-dimension:refPeriod ?refPeriod .
} WHERE {
  ?measure a dqv:QualityMeasurement ;
    dqv:computedOn <${resource}> ;
    dqv:isMeasurementOf ?MeasurementOf ;
    dqv:value ?value .
  OPTIONAL {
    ?measure sdmx-dimension:refPeriod ?refPeriod .
  }
}
    `;
}