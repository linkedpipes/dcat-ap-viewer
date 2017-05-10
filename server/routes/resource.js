(() => {
    const express = require("express");
    const request = require("request"); // https://github.com/request/request
    const configuration = require('./../configuration');

    const router = express.Router();

    // https://nkod.opendata.cz/sparql/?
    //  default-graph-uri=&
    //  query=describe+%3Chttps%3A%2F%2Fnkod.opendata.cz%2Fzdroj%2Fdatov%C3%A1-sada%2F100130707%3E& -> use ?s ?p ?o as describe includes also incomming links
    //  format=application%2Fx-json%2Bld&
    //  timeout=0&
    //  debug=on

    router.get("/dataset", function (req, res) {
        // TODO Extract Virtuoso query to function
        const datasetIri = req.query.iri;
        const url = configuration.sparql.url + "/?" +
            "format=application%2Fx-json%2Bld&" +
            "timeout=0&" +
            "query=" + encodeURI("CONSTRUCT WHERE { <" + datasetIri + "> ?p ?o }");

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
            "query=" + encodeURI("CONSTRUCT WHERE { <" + datasetIri + "> ?p ?o }");

        const options = {
            "url": url
        };
        // TODO Update content-type
        // TODO Add error handling
        request.get(options).pipe(res);
    });

    module.exports = router;
})();
