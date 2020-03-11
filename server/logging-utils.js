const logger = require("./logging");

const MS_PER_SEC = 1e3;

const NS_PER_MS = 1e6;

(function initialize() {
  module.exports = {
    "measureTime": measureTime,
  };
})();

function measureTime(name, callback) {
  return function () {
    const start = process.hrtime();
    callback(...arguments);
    const duration = process.hrtime(start);
    const durationInMs = Math.floor(
      (duration[0] * MS_PER_SEC) + (duration[1] / NS_PER_MS));
    logger.info(name, {"duration": durationInMs})
  };
}

