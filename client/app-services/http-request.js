import Raven from "raven-js";

// Initial status no data available.
export const STATUS_INITIAL = "INITIAL";

// Fetching from initial state ie. no data available.
export const STATUS_FETCHING = "FETCHING";

// Data has been fetched successfully.
export const STATUS_FETCHED = "FETCHED";

// We have some data, but we are fetching again - for an update.
export const STATUS_FETCHING_UPDATE = "FETCHING_UPDATE";

export const ERROR_NOT_FOUND = "ERROR_NOT_FOUND";

export const ERROR_SERVER_FAILURE = "SERVER_FAILURE";

export const ERROR_RESPONSE = "ERROR_RESPONSE";

export function isFetching(status) {
    return status === STATUS_FETCHING || status === STATUS_FETCHING_UPDATE;
}

export function isDataReady(status) {
    return status === STATUS_FETCHED || status === STATUS_FETCHING_UPDATE;
}

export function fetchJson(url) {
    return fetch(url, {
        "method": "GET",
        "headers": {
            "Accept": "application/json"
        },
    }).catch(failureToResponse).then(json);
}

function json(response) {
    return response.json().catch(() => {
        return Promise.reject({
            "error": "parsing"
        })
    }).then((data) => {
        if (response.ok) {
            return {
                "status": response.status,
                "json": data
            }
        } else {
            return Promise.reject({
                "error": "server",
                "status": response.status,
                "json": data
            });
        }
    }).catch((error) => {
        reportException(error, {
            "status": response.status,
            "statusText": response.statusText
        });
        throw error;
    })
}

function failureToResponse(error) {
    reportException(error, {});
    return Promise.reject({
        "error": "offline"
    })
}

function reportException(exception, extra) {
    Raven.captureException(exception, {
        "extra": extra
    });
}

export function fetchJsonLd(url) {
    return fetch(url, {
        "method": "GET",
        "headers": {
            "Accept": "application/ld+json"
        },
    }).catch(failureToResponse).then(json).then(response => ({
        "error": response["error"],
        "status": response["status"],
        "jsonld": response["json"],
        "statusText": response["statusText"]
    }));
}