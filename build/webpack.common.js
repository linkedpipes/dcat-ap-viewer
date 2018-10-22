const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("../configuration");

module.exports = {
    "entry": [
        path.join(__dirname, "..", "client", "index.jsx")
    ],
    "output": {
        "path": path.join(__dirname, "..", "dist"),
        "filename": "bundle.js",
        "publicPath": "./"
    },
    "resolve": {
        // This allow us to use absolute paths for modules inside the
        // application.
        "modules": ["client", "node_modules"],
        // Enable implicit resolution of jsx files.
        // Otherwise we would need to specify the jsx extension.
        "extensions": [".js", ".jsx", "*"],
        "alias": {
            "@": path.resolve("client")
        }
    },
    "module": {
        "rules": [
            {
                "test": /\.jsx?$/,
                "loaders": ["babel-loader"],
                "include": path.resolve(__dirname, "..", "client"),
            },
            {
                "test": /\.scss$/,
                "use": [
                    {"loader": "style-loader"},
                    {"loader": "css-loader"}
                ]
            }
        ]
    },
    "plugins": [
        new HtmlWebpackPlugin({
            "filename": "index.html",
            "template": path.join(__dirname, "..", "public", "index.html"),
            "inject": true
        }),
        new webpack.DefinePlugin({
            "SENTRY_REPORT": asString(isNotEmpty(config["sentry"])),
            "SENTRY_URL": asString(config["sentry"]),
            "GOOGLE_TAG_MANAGER_ID": asString(config["googleTagManager"]),
            "PAGE_TITLE_PREFIX": asString(config["client"]["titlePrefix"]),
            "PAGE_TITLE_SUFFIX": asString(config["client"]["titleSuffix"]),
            "REPOSITORY_TYPE": asString(getRepositoryType()),
            "URL_PREFIX": asString(config["client"]["urlPrefix"]),
            "FORM_URL": asString(config["client"]["formUrl"]),
            "DEREFERENCE_IRI": asString(config["client"]["dereferenceIri"])
        })
    ]
};

function asString(value) {
    return JSON.stringify(value);
}

function isNotEmpty(value) {
    return value !== undefined && value.length > 1;
}

function getRepositoryType() {
    const couchdb = config["data"]["couchdb"];
    if (couchdb !== undefined && couchdb.length > 0) {
        return "COUCHDB";
    } else {
        return "SPARQL";
    }
}