const fileSystem = require("fs");
const logger = require("../../logging");
const path = require("path");

(function initialize() {
  module.exports = {
    "createProvider": createProvider,
  };
})();

function createProvider(configuration) {
  return {
    "v2-storage-post": createStoreContentPost(configuration),
  };
}

function createStoreContentPost(configuration) {
  return (req, res) => {
    const data = req.body;
    let filePath;
    try {
      const fileName = data.identifier.replace(/[:/\\T]/g, "-");
      filePath = path.join(
        configuration.directory,
        fileName + "-" + Date.now() + ".json");
    } catch (error) {
      logger.error(
        "Invalid data.",
        {"error": error.toString(), "identifier": data.identifier});
      res.status(500).send("");
      return;
    }
    jsonToFile(req.body, filePath)
      .then(() => res.status(200).send(""))
      .catch((error) => {
        logger.error("Can't save data.", {"error": error});
        res.status(500).send("");
      });
  };
}

function jsonToFile(json, path) {
  const data = JSON.stringify(json);
  return new Promise((resolve, reject) => {
    fileSystem.writeFile(path, data, callbackToPromise(resolve, reject));
  });
}

function callbackToPromise(resolve, reject) {
  return (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  };
}
