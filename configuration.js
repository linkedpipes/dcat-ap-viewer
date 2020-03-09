const path = require("path");
const fs = require("fs");
const YAML  = require("yaml");

(function initialize() {
  // We use env. prefix as this allow us to pass the argument
  // through the webpack.
  let configurationPath = readProperty("env.configFileLocation");
  if (configurationPath === undefined) {
    configurationPath = path.join(__dirname, "configuration.yaml");
  }
  console.log("Using configuration: ", configurationPath);
  const file = fs.readFileSync(configurationPath, "utf8");
  const configuration = YAML.parse(file)["dcat-ap-viewer"];

  // TODO Use function to transform to make sure there is proper structure.
  module.exports = {
    "port": configuration["port"],
    "serve_static_content": configuration["server-static-content"],
    "providers": configuration["providers"],
    "client": {
      "profile": configuration["client"]["profile"],
      "title": {
        "default": configuration["client"]["title-default"],
        "prefix": configuration["client"]["title-prefix"],
        "suffix": configuration["client"]["title-suffix"],
      },
      "form_url": configuration["client"]["form-url"],
      "url": {
        "base": configuration["client"]["url-base"],
        "subdirectory": configuration["client"]["url-subdirectory"],
      }
    },
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
