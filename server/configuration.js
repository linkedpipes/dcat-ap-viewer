(() => {
    const propertiesReader = require("properties-reader");
    const propertyFilePath = readProperty("configFileLocation");
    const properties = propertiesReader(propertyFilePath);

    console.log("Using configuration: ", propertyFilePath);

    const sparql = properties.get("virtuoso.sparql.url");
    const couchdb = properties.get("couchdb.dataset.url");

    let repositoryType;
    if (couchdb !== 0 && couchdb !== null) {
        repositoryType = "COUCHDB";
    } else {
        repositoryType = "SPARQL";
    }

    module.exports = {
        "solr": {
            "url": properties.get("solr.url")
        },
        "sparql": {
            "url": sparql
        },
        "couchdb" : {
            "url": couchdb
        },
        "port": properties.get("port"),
        // SECTION WITH PAGE OPTIONS
        "CONST_TITLE_PREFIX": properties.get("client.title_prefix"),
        "CONST_TITLE_SUFFIX": properties.get("client.title_suffix"),
        "REPOSITORY_TYPE": repositoryType
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
