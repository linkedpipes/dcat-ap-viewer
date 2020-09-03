import React from "react";
import {PropTypes} from "prop-types";

export function RequestStatus({t, failed}) {
  return (
    <div
      style={{"textAlign": "center", "fontSize": "2em", "marginTop": "3REM"}}
    >
      {getMessage(t, failed)}
    </div>
  );
}

RequestStatus.propTypes = {
  "t": PropTypes.func,
  "failed": PropTypes.string,
};

function getMessage(t, failed) {
  if (failed) {
    return t("http.errorResponse");
  } else {
    return t("http.fetching");
  }
}
