const config = require("../configuration");

module.exports = {
  "PAGE_TITLE": {
    "DEFAULT": config.client.title,
    "PREFIX": asString(config["client"]["titlePrefix"]),
    "SUFFIX": asString(config["client"]["titleSuffix"]),
  },
  "SENTRY": {
    "ACTIVE": asString(isNotEmpty(config["sentry"])),
    "URL": asString(config["sentry"]),
  },
  "GOOGLE_TAG_MANAGER": asString(config["googleTagManager"]),
  "REPOSITORY_TYPE": asString(getRepository()),
  "URL": {
    "PREFIX": asString(config["client"]["urlPrefix"]),
    "BASE": asString(config["client"]["urlBase"]),
  },
  "DEREFERENCE": asString(config["client"]["dereferenceIri"]),
  "FORM": {
    "URL": asString(config["client"]["formUrl"]),
  },
};

function asString(value) {
  return JSON.stringify(value);
}

function isNotEmpty(value) {
  return value !== undefined && value.length > 1;
}

function getRepository() {
  const couchdb = config["data"]["couchdb"];
  if (couchdb !== null && couchdb.length > 0) {
    return "COUCHDB";
  } else {
    return "SPARQL";
  }
}