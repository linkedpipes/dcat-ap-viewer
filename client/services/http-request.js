import Raven from "raven-js";

export const fetchJson = (url, onSuccess, onFailure) => {
    fetch(url).then((response) => {
        return response.json();
    }).then((json) => {
        if (doesRequestFailed(json)) {
            const exception = new Error("Request failed.");
            handleException(exception, {"url": url, "json": json});
            callWithCheck(onFailure, json);
            return;
        }
        callWithCheck(onSuccess, json);
    }).catch((exception) => {
        handleException(exception, {"url": url});
        callWithCheck(onFailure, exception);
    });
};

function doesRequestFailed(json) {
    if (json["error"] != undefined) {
        return true;
    }
    if (json["responseHeader"] == undefined) {
        return false;
    } else {
        return json["responseHeader"]["status"] > 399;
    }
}

function handleException(exception, extra) {
    console.error(exception, extra);
    Raven.captureException(exception, {
        "extra": extra
    });
}

function callWithCheck(functionToCall, argument) {
    try {
        functionToCall(argument)
    } catch (exception) {
        handleException(exception);
    }
}

function dispatchWithCheck(dispatch, call) {
    try {
        dispatch(call);
    } catch (exception) {
        handleException(exception);
    }
}

export const fetchJsonAndDispatch = (url, dispatch, onSuccess, onFailure) => {
    fetch(url).then((response) => {
        return response.json();
    }).then((json) => {
        if (doesRequestFailed(json)) {
            const exception = new Error("Request failed.");
            handleException(exception, {"url": url, "json": json});
            dispatchWithCheck(dispatch, onFailure(exception));
            return;
        }
        dispatchWithCheck(dispatch, onSuccess(json));
    }).catch((exception) => {
        handleException(exception, {"url": url});
        dispatchWithCheck(dispatch, onFailure(exception));
    });
};
