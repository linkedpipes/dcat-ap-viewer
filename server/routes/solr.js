(() => {
    const express = require("express");
    const request = require("request"); // https://github.com/request/request
    const configuration = require('./../configuration');

    const router = express.Router();

    router.get("/info", function (req, res) {
        const url = configuration.solr.url + "/query?q=*:*";
        const options = {
            "url": url
        };
        request(options, function (error, response, body) {
            if (error === null && response && response.statusCode == 200) {
                const content = JSON.parse(body);
                res.json({
                    "data": {
                        "numberOfDatasets": content.response.numFound
                    }
                });
            } else {
                res.status(500);
                res.json({
                    "error": error
                });
            }
        });
    });

    // Forward to Solr query.
    router.get("/query", function (req, res) {
        const url = configuration.solr.url + req.url;
        const options = {
            "url": url
        };
        request.get(options).pipe(res);
    });

    module.exports = router;
})();
