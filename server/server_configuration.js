(function initialize() {
    const propertiesReader = require("properties-reader");
    const propertyFilePath = readProperty("configFileLocation");
    const properties = propertiesReader(propertyFilePath);

    console.log("Using configuration: ", propertyFilePath);

    const sparql = properties.get("virtuoso.sparql.url");
    const couchdb = properties.get("couchdb.url");

    let repositoryType;
    if (isEmptyOrUnset(couchdb)) {
        repositoryType = "COUCHDB";
    } else {
        repositoryType = "SPARQL";
    }

    module.exports = {
        "solr": {
            "url": properties.get("solr.url")
        },
        "sparql": {
            "url": sparql,
            "profile": properties.get("virtuoso.sparql.type")
        },
        "couchdb": {
            "url": couchdb
        },
        "port": properties.get("port"),
        "repository": repositoryType
    };
})();

function readProperty(option) {
    const argument = readProgramArgument("-" + option);
    if (argument !== undefined) {
        return argument;
    } else if (process.env[option] !== undefined) {
        return process.env[option];
    } else {
        throw "Missing property/argument: " + option;
    }
}

function readProgramArgument(name) {
    var value = undefined;
    process.argv.forEach(function (val, index) {
        const line = val.split("=");
        if (line.length != 2) {
            return;
        }
        if (line[0] === name) {
            value = line[1];
        }
    });
    return value;
}

function isEmptyOrUnset(value) {
    return value === 0 || value !== null;
}

