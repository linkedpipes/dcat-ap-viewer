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

(() => {
    const propertiesReader = require("properties-reader");
    const propertyFilePath = readProperty("configFileLocation");
    const properties = propertiesReader(propertyFilePath);

    console.log("Using configuration: ", propertyFilePath);

    module.exports = {
        "solr": {
            "url": properties.get("solr.url")
        },
        "sparql": {
            "url": properties.get("virtuoso.sparql.url")
        },
        "port": properties.get("port"),
        // SECTION WITH PAGE OPTIONS
        "CONST_TITLE_PREFIX": properties.get("client.title_prefix"),
        "CONST_TITLE_SUFFIX": properties.get("client.title_suffix")
    };
})();
