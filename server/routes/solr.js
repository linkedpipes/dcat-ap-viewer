(() => {
    const express = require("express");
    const request = require("request"); // https://github.com/request/request
    const configuration = require('./../configuration');

    const router = express.Router();

    // Forward to Solr.
    router.get("/query", function (req, res) {
        const url = configuration.solr.url + req.url;
        const options = {
            "url": url
        };
        request.get(options).pipe(res);
    });

    module.exports = router;
})();
