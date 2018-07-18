import React from "react";
import {getString} from "../app/strings";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    ERROR_MISSING,
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
            return getString("s.fetching");
        case STATUS_FETCHING:
            return getString("s.fetching");
        case ERROR_MISSING:
            return getString("s.missing_resource");
        case ERROR_RESPONSE:
            return getString("s.error_response");
        case ERROR_SERVER_FAILURE:
            return getString("s.server_failure");
        default:
            return getString("s.fetch_failed");

    }
}
