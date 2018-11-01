import React from "react";
import {getString} from "../app-services/strings";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    ERROR_NOT_FOUND,
    ERROR_RESPONSE,
    ERROR_SERVER_FAILURE
} from "../app-services/http-request";

export const HttpRequestStatus = ({status}) => {
    return (
        <div style={{"textAlign": "center", "fontSize": "2em", "marginTop": "3REM"}}>
            {getMessage(status)}
        </div>
    );
};

function getMessage(status) {
    switch (status) {
        case STATUS_INITIAL:
            return getString("http.fetching");
        case STATUS_FETCHING:
            return getString("http.fetching");
        case ERROR_NOT_FOUND:
            return getString("http.missing_resource");
        case ERROR_RESPONSE:
            return getString("http.error_response");
        case ERROR_SERVER_FAILURE:
            return getString("http.server_failure");
        default:
            return getString("http.fetch_failed");

    }
}
