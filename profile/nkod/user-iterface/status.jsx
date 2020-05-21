import React from "react";
import {PropTypes} from "prop-types";

/**
 * HOC for handling loading/failed status.
 */
export default function withStatus(WrappedComponent) {
  return (props) => {
    if (props.error > 0 || !props.ready) {
      return (
        <Status t={props.t} error={props.error} ready={props.ready}/>
      );
    } else {
      return (
        <WrappedComponent {...props}/>
      );
    }
  };
}

export function Status(props) {
  const errorMessages = [
    "",
    "http.fetch_failed",
    "http.error_response",
    "http.server_failure",
  ];
  const statusStyle = {
    "textAlign": "center",
    "fontSize": "2rem",
    "margin": "3rem 0 3rem 0",
  };

  if (props.error > 0) {
    return (
      <div style={statusStyle}>
        {props.t(errorMessages[props.error])}
      </div>
    );
  } else if (!props.ready) {
    return (
      <div style={statusStyle}>
        {props.t("http.fetching")}
      </div>
    );
  } else {
    return null;
  }
}

Status.propTypes = {
  "t": PropTypes.func.isRequired,
  "error": PropTypes.number.isRequired,
  "ready": PropTypes.bool.isRequired,
};
