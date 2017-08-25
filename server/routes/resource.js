(() => {
    const express = require("express");
    const request = require("request"); // https://github.com/request/request
    const configuration = require('./../configuration');
    const router = express.Router();

    // TODO We can remove the condition by conditional initialization.

    router.get("/dataset", function (req, res) {
        // TODO Update content-type
        // TODO Add error handling
        // TODO Set COUCHDB or VIRTUOSO at startup (save if statement).
        const datasetIri = req.query.iri;
        if (configuration.REPOSITORY_TYPE == "COUCHDB") {
            queryDataFromCouchDB(configuration, "datasets",
                request, res, datasetIri);
        } else {
            const sparql = getDatasetSparqlQuery(
                datasetIri, configuration.sparql.profile);
            queryDataFromSparql(configuration, request, res, sparql);
        }
    });

    router.get("/distribution", function (req, res) {
        // TODO Same as /dataset
        const distributionIri = req.query.iri;
        if (configuration.REPOSITORY_TYPE == "COUCHDB") {
            queryDataFromCouchDB(configuration, "distributions",
                request, res, distributionIri);
        } else {
            const sparql = getDistributionSparqlQuery(
                distributionIri, configuration.sparql.profile);
            queryDataFromSparql(configuration, request, res, sparql);
        }
    });

    // TODO Transform into general "label" source service.
    router.get("/codelist", function (req, res) {
        // TODO Same as /dataset
        const itemIri = req.query.iri;
        if (configuration.REPOSITORY_TYPE == "COUCHDB") {
            queryDataFromCouchDB(configuration, "codelists",
                request, res, itemIri);
        } else {
            // TODO Add implementation for Virtuoso !
        }
    });

    module.exports = router;
})();

function queryDataFromCouchDB(configuration, dataset, request, res, iri) {
    const url = configuration.couchdb.url + "/"
        + dataset + "/" + encodeURIComponent(iri);
    request.get({"url": url}).on("error", (error) => {
        // TODO Use better logging.
        console.log("error", error);
        res.status(500).json({
            "error": "Call of backend service failed."
        });
    }).pipe(res);
}

function queryDataFromSparql(configuration, request, res, sparql) {
    const url = configuration.sparql.url + "/?" +
        "format=application%2Fx-json%2Bld&" +
        "timeout=0&" +
        "query=" + encodeURIComponent(sparql);
    request.get({"url": url}).on("error", (error) => {
        // TODO Use better logging.
        console.log("error", error);
        res.status(500).json({
            "error": "Call of backend service failed."
        });
    }).pipe(res);

}

function getDatasetSparqlQuery(iri, profile) {
    let query = "" +
        "PREFIX dcat: <http://www.w3.org/ns/dcat#> " +
        "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
        "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
        "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> " +
        "PREFIX dcterms: <http://purl.org/dc/terms/> " +
        "PREFIX foaf: <http://xmlns.com/foaf/0.1/> " +
        "PREFIX schema: <http://schema.org/> " +
        "PREFIX vcard: <http://www.w3.org/2006/vcard/ns#> " +
        "PREFIX void: <http://rdfs.org/ns/void#> " +
        "PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> " +
        "PREFIX adms: <http://www.w3.org/ns/adms#> " +
        "PREFIX spdx: <http://spdx.org/rdf/terms#> " +
        "PREFIX org: <http://www.w3.org/ns/org#> " +
        "" +
        "CONSTRUCT { " +
        "?Dataset ?p ?o .  " +
        "  " +
        "?cp vcard:fn ?cpfn ; " +
        "  vcard:hasEmail ?cpemail .  " +
        " " +
        "?publisher a foaf:Agent; " +
        "  foaf:name ?name .  " +
        "?temporal schema:startDate ?temporalStart ; " +
        "  schema:endDate ?temporalEnd . " +
        "" +
        "?primaryTopic a dcat:CatalogRecord ; " +
        "  foaf:primaryTopic ?Dataset ; " +
        "  dcterms:source ?source ." +
        "} WHERE {  ";

    // TODO Prepare template on start instead on every query
    if (profile === "SINGLE-GRAPH") {
        query += "GRAPH ?g { "
    }

    query += "?Dataset ?p ?o . " +
        "" +
        "OPTIONAL { ?Dataset dcterms:modified ?modified . } " +
        "OPTIONAL { ?Dataset dcterms:accrualPeriodicity ?accrualPeriodicity . } " +
        "OPTIONAL { ?Dataset dcterms:issued ?issued . } " +
        "OPTIONAL { ?Dataset dcterms:language ?language . } " +
        "OPTIONAL { ?Dataset dcterms:identifier ?identifier . } " +
        "OPTIONAL { ?Dataset dcterms:type ?type . } " +
        "OPTIONAL { ?Dataset foaf:page ?page . } " +
        "OPTIONAL { ?Dataset dcat:theme ?theme . } " +
        "OPTIONAL { ?Dataset dcat:landingPage ?landingPage . } " +
        "OPTIONAL { ?Dataset dcat:keyword ?keyword . } " +
        "OPTIONAL {  " +
        "  ?Dataset dcat:contactPoint ?cp .  " +
        "  ?cp vcard:fn ?cpfn ; " +
        "    vcard:hasEmail ?cpemail .  " +
        "} " +
        "OPTIONAL { " +
        "  ?Dataset dcterms:publisher ?publisher .  " +
        "  ?publisher a foaf:Agent; " +
        "    foaf:name ?name .  " +
        "} " +
        "OPTIONAL { " +
        "  ?Dataset dcterms:temporal ?temporal . " +
        "  ?temporal schema:startDate ?temporalStart ; " +
        "    schema:endDate ?temporalEnd . " +
        "} " +
        "OPTIONAL { " +
        "  ?primaryTopic a dcat:CatalogRecord ; " +
        "    foaf:primaryTopic ?Dataset ; " +
        "    dcterms:source ?source ." +
        "} ";

    if (profile === "SINGLE-GRAPH") {
        query += "} "
    }

    query += "VALUES (?Dataset) { (<" + iri + ">) } " +
        "} ";

    return query;
}

function getDistributionSparqlQuery(iri) {
    return "" +
        "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> " +
        "PREFIX dcterms: <http://purl.org/dc/terms/> " +
        "" +
        "CONSTRUCT { " +
        "   <" + iri + "> ?p ?o . " +
        "   <" + iri + "> dcterms:format ?format . " +
        "   ?format skos:prefLabel ?formatLabel. " +
        "} WHERE { " +
        "   <" + iri + "> ?p ?o . " +
        "OPTIONAL { " +
        "   <" + iri + "> dcterms:format ?format . " +
        "   ?format skos:prefLabel ?formatLabel. " +
        "} " +
        "}";
}