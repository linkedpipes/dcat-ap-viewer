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
