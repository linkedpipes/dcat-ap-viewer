(() => {
    const express = require("express");
    const request = require("request"); // https://github.com/request/request
    const configuration = require('./../configuration');

    const router = express.Router();

    router.get("/dataset", function (req, res) {
        // TODO Extract Virtuoso query to function
        const datasetIri = req.query.iri;
        const url = configuration.sparql.url + "/?" +
            "format=application%2Fx-json%2Bld&" +
            "timeout=0&" +
            "query=" + encodeURIComponent(getDatasetSparqlQuery(datasetIri));
        const options = {
            "url": url
        };
        // TODO Update content-type
        // TODO Add error handling
        request.get(options).pipe(res);
    });

    router.get("/distribution", function (req, res) {
        // TODO Same as for /dataset
        const datasetIri = req.query.iri;
        const url = configuration.sparql.url + "/?" +
            "format=application%2Fx-json%2Bld&" +
            "timeout=0&" +
            "query=" + encodeURIComponent(
                getDistributionSparqlQuery(datasetIri));

        const options = {
            "url": url
        };
        // TODO Update content-type
        // TODO Add error handling
        request.get(options).pipe(res);
    });

    module.exports = router;
})();

function getDatasetSparqlQuery(iri) {
    return "" +
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
        "   vcard:hasEmail ?cpemail .  " +
        " " +
        "?publisher a foaf:Agent; " +
        "   foaf:name ?name .  " +
        "?temporal schema:startDate ?temporalStart ; " +
        "   schema:endDate ?temporalEnd . " +
        "} WHERE {  " +
        "?Dataset ?p ?o . " +
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
        "   ?Dataset dcat:contactPoint ?cp .  " +
        "   ?cp vcard:fn ?cpfn ; " +
        "       vcard:hasEmail ?cpemail .  " +
        "} " +
        "OPTIONAL {  " +
        "   ?Dataset dcterms:publisher ?publisher .  " +
        "   ?publisher a foaf:Agent; " +
        "       foaf:name ?name .  " +
        "} " +
        "OPTIONAL {" +
        "    ?Dataset dcterms:temporal ?temporal . " +
        "    ?temporal schema:startDate ?temporalStart ; " +
        "       schema:endDate ?temporalEnd . " +
        "} " +
        "VALUES (?Dataset) { (<" + iri + ">) } " +
        "}";
}

function getDistributionSparqlQuery(iri) {
    return "" +
        "PREFIX skos: <http://www.w3.org/2004/02/skos/core#> " +
        "PREFIX dcterms: <http://purl.org/dc/terms/> " +
        "" +
        "CONSTRUCT WHERE { " +
        "   <" + iri + "> ?p ?o . " +
        "OPTIONAL { " +
        "   <" + iri + "> dcterms:format ?format . " +
        "   ?format skos:prefLabel ?formatLabel. " +
        "}" +
        "}";
}