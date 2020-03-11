//
// Collect information from translation files.
//

const path = require("path");
const fs = require("fs");
const configuration = require("./server-configuration");

module.exports = {
  "loadTranslationFiles": loadTranslationFiles,
};

function loadTranslationFiles() {

  const translations = {
    "url": {},
    "query": {},
    "string": {},
    "languages": new Set(),
  };

  const fileHandler = (filePath, fileName) => {
    if (!fileName.startsWith("translation") || !fileName.endsWith(".json")) {
      return;
    }
    const fileContent = loadTranslationFile(filePath);
    Object.keys(fileContent).forEach(language => {
      translations["languages"].add(language);
      const content = fileContent[language];
      translations["string"][language] = {
        ...(translations["string"][language] || {}),
        ...content["string"],
      };
      if (content["url"]) {
        Object.entries(content["url"]).forEach(([key, value]) => {
          addToMap(translations["url"], language, key, value);
        });
      }
      if (content["query"]) {
        Object.entries(content["query"]).forEach(([key, value]) => {
          addToMap(translations["query"], language, key, value);
        });
      }
    });
  };

  // We need to load core and profile based translations.
  walk(
    path.join(__dirname, "..", "client"),
    fileHandler);
  walk(
    path.join(__dirname, "..", "profile", configuration.client.profile),
    fileHandler);

  return {
    "navigation": {
      "url": translations["url"],
      "query": translations["query"],
      "languages": [...translations["languages"]],
    },
    ...translations["string"],
  };
}

function walk(directory, callback) {
  fs.readdirSync(directory).forEach(fileName => {
    const filePath = path.join(directory, fileName);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      callback(filePath, fileName);
    }
    if (stats.isDirectory()) {
      walk(filePath, callback);
    }
  });
}

function loadTranslationFile(filePath) {
  const content = fs.readFileSync(filePath);
  return JSON.parse(content);
}

function addToMap(map, language, key, value) {
  if (!map[key]) {
    map[key] = {};
  }
  map[key][language] = value;
}
