const path = require("path");

function initializeParsers(app) {
    const bodyParser = require("body-parser");
    // Parse application/x-www-form-urlencoded.
    app.use(bodyParser.urlencoded({"extended": false}));
    // Parse application/json.
    app.use(bodyParser.json());
}

function initializeRoutes(app) {
    app.use("/api/v1/solr", require("./server/routes/solr"));
    app.use("/api/v1/resource/", require("./server/routes/resource"));
}

function initializeWebpack(app) {
    const webpack = require("webpack");
    const webpackConfig = require("./webpack.develop.config.js");
    const webpackMiddleware = require("webpack-dev-middleware");
    //
    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler, {
        "publicPath": webpackConfig.output.publicPath,
        "stats": {
            "colors": true,
            "chunks": false
        }
    }));
    initializeRoutesForStaticResources(app);
}

function initializeRoutesForStaticResources(app) {
    const express = require("express");

    const assetsPath = path.join(__dirname, "public/assets");
    app.use("/assets", express.static(assetsPath));

    // TODO Improve fetching of static resources, do not load from hard drive
    // https://github.com/expressjs/serve-favicon

    // Serve the index - use as fall back.  Without the * the server
    // fail to resolve non root paths like server/about .
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/public/", "index.html"));
    });
}

function startServer(app) {
    const configuration = require('./server/configuration');
    const port = configuration.port;
    app.listen(port, function onStart(err) {
        if (err) {
            console.log(err);
        }
        console.info("Listening on port %s.", port);
    });
}

(()=> {
    const express = require("express");
    const app = express();
    initializeParsers(app);
    initializeRoutes(app);
    initializeWebpack(app);
    startServer(app);
})();




