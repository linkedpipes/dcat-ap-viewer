const request = require("request"); // https://github.com/request/request
const config = require('./../configuration');

module.exports = {
    "createDatasetsGet": createDatasetsGet,
    "createDistributionsGet": createDistributionsGet
};

function createDatasetsGet() {
    return (req, res) => {
        const datasetIri = req.query.iri;
        const sparql = createDatasetSparqlQuery(datasetIri);
        queryDataFromSparql(res, sparql);
    }
}

function createDatasetSparqlQuery(iri) {
    return `
PREFIX dcat: <http://www.w3.org/ns/dcat#> 
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX schema: <http://schema.org/>
PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
PREFIX void: <http://rdfs.org/ns/void#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX adms: <http://www.w3.org/ns/adms#>
PREFIX spdx: <http://spdx.org/rdf/terms#>
PREFIX org: <http://www.w3.org/ns/org#>
CONSTRUCT {
    ?dataset ?p ?o .

    ?cp vcard:fn ?cpfn ;
        vcard:hasEmail ?cpemail .
    
    ?publisher a foaf:Agent;
        foaf:name ?name .

    ?temporal schema:startDate ?temporalStart ;      
        schema:endDate ?temporalEnd .

    ?primaryTopic a dcat:CatalogRecord ;
        foaf:primaryTopic ?dataset ;
        dcterms:source ?source .
} WHERE {
    ` + (config.data.datasetPerGraph ? "GRAPH ?g {" : "") + `
    
    ?dataset ?p ?o .
    
    OPTIONAL { ?dataset dcterms:modified ?modified . }
    OPTIONAL { ?dataset dcterms:accrualPeriodicity ?accrualPeriodicity . }
    OPTIONAL { ?dataset dcterms:issued ?issued . }
    OPTIONAL { ?dataset dcterms:language ?language . }
    OPTIONAL { ?dataset dcterms:identifier ?identifier . }
    OPTIONAL { ?dataset dcterms:type ?type . }
    OPTIONAL { ?dataset foaf:page ?page . }
    OPTIONAL { ?dataset dcat:theme ?theme . }
    OPTIONAL { ?dataset dcat:landingPage ?landingPage . }
    OPTIONAL { ?dataset dcat:keyword ?keyword . }
    OPTIONAL {
        ?dataset dcat:contactPoint ?cp .         
        ?cp vcard:fn ?cpfn ;
            vcard:hasEmail ?cpemail .
    }
    OPTIONAL {
        ?dataset dcterms:publisher ?publisher .
        ?publisher a foaf:Agent ;
            foaf:name ?name .
    }
    OPTIONAL {
        ?dataset dcterms:temporal ?temporal .
        ?temporal schema:startDate ?temporalStart ;
            schema:endDate ?temporalEnd .
    }
    OPTIONAL {
        ?primaryTopic a dcat:CatalogRecord ;
            foaf:primaryTopic ?dataset ;
            dcterms:source ?source .
    }
    
    ` + (config.data.datasetPerGraph ? "}" : "") + `
        
    VALUES (?dataset) { (<` + iri + `>) }
}`;
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
        const sparql = createDistributionSparqlQuery(distributionIri);
        queryDataFromSparql(res, sparql);
    }
}

function createDistributionSparqlQuery(iri) {
    return `
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX dcterms: <http://purl.org/dc/terms/>

CONSTRUCT {
    ?distribution ?p ?o ;
        dcterms:format ?format .
    ?format skos:prefLabel ?formatLabel .
} WHERE {
    ?distribution ?p ?o ;
    OPTIONAL {
        ?distribution dcterms:format ?format .   
        ?format skos:prefLabel ?formatLabel . 
    }
    
     VALUES (?distribution) { (<` + iri + `>) }
}`;
}
