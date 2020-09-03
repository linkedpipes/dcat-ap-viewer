//
// Collect information from translation files.
//

const path = require("path");
const fs = require("fs");
const configuration = require("./server-configuration");
const logger = require("./logging");

module.exports = {
  "loadTranslationFiles": loadTranslationFiles,
};

function loadTranslationFiles() {

  const translations = {
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
      translations["string"][language] = merge(
        transformForPlurals(translations["string"][language] || {}),
        transformForPlurals(content["string"]),
      );
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

function merge(left, right) {
  const result = {...left};
  for (const [key, rightValue] of Object.entries(right)) {
    const leftValue = result[key];
    if (leftValue === undefined) {
      result[key] = rightValue;
      continue;
    }
    if (typeof (leftValue) === "object" && typeof (rightValue) === "object") {
      result[key] = {
        ...leftValue,
        ...rightValue,
      };
    }
    // Just use next value.
    logger.error(
      "Translation collision for.",
      {"key": key, "left": leftValue, "right": rightValue}
    );
    result[key] = rightValue;
  }
  return result;
}

function transformForPlurals(values) {
  const result = {};
  for (const [key, value] of Object.entries(values)) {
    const index = key.lastIndexOf("_");
    if (index === -1) {
      result[key] = value;
      continue;
    }
    const count = key.substr(index + 1);
    if (isNaN(count)) {
      result[key] = value;
      continue;
    }
    const prefix = key.substr(0, index);
    if (result[prefix] === undefined) {
      result[prefix] = {};
    }
    result[prefix][count] = value;
  }
  return result;
}
