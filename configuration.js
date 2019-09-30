(function initialize() {
  const path = require("path");

  // We use env. prefix as this allow us to pass the argument
  // through the webpack.
  let configurationPath = readProperty("env.configFileLocation");
  if (configurationPath === undefined) {
    configurationPath = path.join(__dirname, "configuration.properties");
  }
  console.log("Using configuration: ", configurationPath);

  const propertiesReader = require("properties-reader");
  const properties = propertiesReader(configurationPath);

  module.exports = {
    "solr": properties.get("solr.url"),
    "data": {
      "sparql": properties.get("virtuoso.sparql.url"),
      "datasetPerGraph": getDatasetPerGraph(properties),
      "couchdb": properties.get("couchdb.url"),
      "repository": getRepositoryType(properties),
    },
    "quality": {
      "sparql": properties.get("quality.sparql"),
    },
    "port": properties.get("port"),
    "client": {
      "title": properties.get("client.title_default") || "",
      "titlePrefix": properties.get("client.title_prefix") || "",
      "titleSuffix": properties.get("client.title_suffix") || "",
      "urlPrefix": getUrlPrefix(properties),
      "formUrl": properties.get("client.form_url"),
      "urlBase": getUrl(properties),
      "dereferenceIri": properties.get("client.dereference_prefix") || "",
      "hidePublisherTab": asBoolean(properties.get("client.hide_publisher_tab")),
    },
    "sentry": properties.get("sentry.url") || false,
    "googleTagManager": properties.get("google_tag_manager.id") || false,
  };
})();


function readProperty(option) {
  const argument = readProgramArgument("-" + option);
  if (argument !== undefined) {
    return argument;
  } else if (process.env[option] !== undefined) {
    return process.env[option];
  } else {
    return undefined;
  }
}

function readProgramArgument(name) {
  let output = undefined;
  process.argv.forEach((value) => {
    const line = value.split("=");
    if (line.length !== 2) {
      return;
    }
    if (line[0] === name) {
      output = line[1];
    }
  });
  return output;
}

function getDatasetPerGraph(properties) {
  const type = properties.get("virtuoso.sparql.type");
  return type === "SINGLE-GRAPH";
}

function getRepositoryType(properties) {
  const couchdb = properties.get("couchdb.url");
  if (couchdb !== undefined && couchdb !== null && couchdb.length > 0) {
    return "COUCHDB";
  } else {
    return "SPARQL";
  }
}

function getUrlPrefix(properties) {
  let value = properties.get("client.url_subdirectory");
  if (!value) {
    return "";
  } else if (value.startsWith("/")) {
    return value;
  } else {
    return "/" + value;
  }
}

function getUrl(properties) {
  let value = properties.get("client.base_url");
  if (!value) {
    return "";
  }
  let prefix = getUrlPrefix(properties);
  if (value.endsWith("/")) {
    return value.substr(0, value.length - 1) + prefix;
  } else {
    return value + prefix;
  }
}

function asBoolean(value) {
  if (value === undefined || value === null) {
    return false;
  }
  return value;
}
