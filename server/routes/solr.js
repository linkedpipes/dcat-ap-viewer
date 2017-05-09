/**
 * Forward communication to Solr instance.
 */
(() => {
    const express = require("express");
    // https://github.com/request/request
    const request = require("request");
    const configuration = require('./../configuration');

    const router = express.Router();

    router.get("/query", function (req, res) {
        const url = configuration.solr.url + req.url;
        var options = {
            "url": url
        };
        request.get(options).pipe(res);
    });

    module.exports = router;
})();
