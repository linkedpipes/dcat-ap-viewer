//
// Shared configuration entry point, used by server and webpack (client).
//

const path = require("path");
const fs = require("fs");
const YAML = require("yaml");

(function initialize() {
  // We use env. prefix as this allow us to pass the argument
  // through the webpack.
  let configurationPath = readProperty("env.configFileLocation");
  if (configurationPath === undefined) {
    configurationPath = path.join(__dirname, "configuration.yaml");
  }
  const file = fs.readFileSync(configurationPath, "utf8");
  const configuration = YAML.parse(file)["dcat-ap-viewer"];

  const client = sanitizeConfiguration(configuration["client"]);
  // As YAML import arrays as dictionaries we need to sanitize 'profiles'.
  client.profiles = Object.values(client.profiles);

  module.exports = {
    "port": configuration["port"],
    "serveStaticContent": configuration["server-static-content"] || false,
    "providers": configuration["providers"] || [],
    "helmet": configuration["helmet"] || {},
    /**
     * As this is provided to the profile, it may have custom properties
     * so we only do some basic sanitization.
     */
    "client": client,
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

function sanitizeConfiguration(configuration) {
  const result = {};
  for (const [key, value] of Object.entries(configuration)) {
    if (typeof value === "object") {
      result[sanitizeConfigurationKey(key)] = sanitizeConfiguration(value);
    } else {
      result[sanitizeConfigurationKey(key)] = value;
    }
  }
  return result;
}

function sanitizeConfigurationKey(key) {
  let result = "";
  let capitalizeNext = false;
  for (const char of key) {
    if (char === "-") {
      capitalizeNext = true;
      continue;
    }
    if (capitalizeNext) {
      result += char.toLocaleUpperCase();
      capitalizeNext = false;
      continue;
    }
    result += char;
  }
  return result;
}
