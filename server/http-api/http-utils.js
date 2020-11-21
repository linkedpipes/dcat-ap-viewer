const logger = require("../logging");

const REQUEST_FAILED = "REQUEST_FAILED";

const ERROR_RESPONSE = "ERROR_RESPONSE";

const INVALID_DATA = "INVALID_DATA";

function isResponseOk(response) {
  return response && response.statusCode === 200;
}

function handleApiError(res, error) {
  switch (error.type) {
    case REQUEST_FAILED:
      logger.error("Request failed.", {
        "error": error.error,
        "url": error.url,
      });
      res.status(500).json({
        "error": "service request failed",
      });
      return;
    case ERROR_RESPONSE:
      logger.error("Error response.", {
        "url": error.url,
        "status": error.response.statusCode,
      });
      res.status(error.response.statusCode).json({});
      return;
    case INVALID_DATA:
      logger.error("Can't parse response.", {
        "url": error.url,
        "error": error.error,
        "exception": error.exception,
      });
      res.status(500).json({
        "error": "service request failed",
      });
      return;
    default:
      logger.error("Unknown API error.", {"error": error.stack || error});
      res.status(500).json({
        "error": "service request failed",
      });
      return;
  }
}

function isErrorCode(statusCode) {
  return statusCode > 499 && statusCode < 501;
}

function RequestFailed(url, error) {
  this.url = url;
  this.error = error;
  this.type = REQUEST_FAILED;
}

function ErrorResponse(url, response) {
  this.url = url;
  this.response = response;
  this.type = ERROR_RESPONSE;
}

function InvalidData(url, exception) {
  this.url = url;
  this.type = INVALID_DATA;
  this.exception = exception;
}

module.exports = {
  "isResponseOk": isResponseOk,
  "handleApiError": handleApiError,
  "RequestFailed": RequestFailed,
  "ErrorResponse": ErrorResponse,
  "InvalidData": InvalidData,
};