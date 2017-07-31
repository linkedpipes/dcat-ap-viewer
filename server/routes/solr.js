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
                // TODO Export to some solar mapping function.
                res.json({
                    "data": {
                        "numberOfDatasets": content.response.numFound
                    }
                });
            } else {
                // TODO Use better logging.
                console.log("error", error);
                res.status(500).json({
                    "error": "Call of backend service failed."
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

        request.get(options).on("error", (error) => {
            // TODO Use better logging.
            console.log("error", error);
            res.status(500).json({
                "error": "Call of backend service failed."
            });
        }).pipe(res);

    });

    module.exports = router;
})();
