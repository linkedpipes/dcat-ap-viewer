import Raven from "raven-js";

export const STATUS_INITIAL = "INITIAL";

export const STATUS_FETCHING = "FETCHING";

export const STATUS_FETCHED = "FETCHED";

export const ERROR_MISSING = "MISSING";

export const ERROR_SERVER_FAILURE = "SERVER_FAILURE";

export const ERROR_RESPONSE = "ERROR_RESPONSE";

export function isDataReady(status) {
    return status === STATUS_FETCHED;
}

export function isStatusLoading(status) {
    return status === STATUS_INITIAL || status === STATUS_FETCHING;
}

export function isStatusFailed(status) {
    return status === ERROR_MISSING ||
        status === ERROR_SERVER_FAILURE ||
        status === ERROR_RESPONSE;
}

function json(response) {
    return response.json().then((json) => {
        return {
            "status": response.status,
            "json": json
        };
    });
}

export function fetchJson(url) {
    return fetch(url).then(json);
}

// TODO Convert to use promises.
export const fetchJsonCallback = (url, onSuccess, onFailure) => {
    fetchJson(url).then((data) => {
        if (isResourceMissing(data)) {
            handleMissingResource(onFailure, createExtra(url));
        } else if (isErrorResponse(data)) {
            handleErrorResponse(data, onFailure, createExtra(url));
        } else if (doesRequestFailed(data)) {
            handleServerFailure(onFailure, createExtra(url));
        } else {
            handleOkResponse(data, onSuccess, createExtra(url));
        }
    }).catch((exception) => {
        handleRequestException(exception, onFailure, createExtra(url))
    });
};

function createExtra(url) {
    return {
        "url": url
    };
}

function isResourceMissing(data) {
    return data.status >= 400 && data.status < 500;
}

function doesRequestFailed(data) {
    return data.status >= 500 && data.status < 600;
}

function isErrorResponse(data) {
    return data.json !== undefined && data.json.error != undefined;
}

function handleMissingResource(callback, extra) {
    callWithCheck(callback, {
        "status": ERROR_MISSING
    }, extra);
}

function handleServerFailure(callback, extra) {
    callWithCheck(callback, {
        "status": ERROR_SERVER_FAILURE
    }, extra);
}

function handleErrorResponse(data, callback, extra) {
    callWithCheck(callback, {
        "status": ERROR_RESPONSE,
        "error": data.json.error
    }, extra);
}

function handleOkResponse(data, callback, extra) {
    callWithCheck(callback, data.json, extra);
}

function handleRequestException(exception, callback, extra) {
    reportException(exception, extra);
    callWithCheck(callback, {
        "status": ERROR_SERVER_FAILURE
    });
}

function reportException(exception, extra) {
    console.error("Error", exception, extra);
    Raven.captureException(exception, {
        "extra": extra
    });
}

function callWithCheck(functionToCall, argument, extra) {
    try {
        functionToCall(argument)
    } catch (exception) {
        reportException(exception, extra);
    }
}
