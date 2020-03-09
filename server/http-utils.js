function isResponseOk(response, error) {
  return error === null && response && response.statusCode === 200;
}

function handleError(res, error) {
  // TODO Improve logging and error handling #38.
  console.error("Request failed: ", error);
  res.status(500).json({
    "error": "service_request_failed",
  });
}

function ApiError(error, message) {
  this.error = error;
  this.message = message;
}

module.exports = {
  "isResponseOk": isResponseOk,
  "handleError": handleError,
  "ApiError": ApiError,
};