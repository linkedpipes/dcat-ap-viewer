import React from "react";
import {PropTypes} from "prop-types";
import {useSelector} from "react-redux";

import {
  register,
  selectT,
} from "../../client-api";
import {STATUS_FAILED, STATUS_LOADING} from "../nkod-component-names";

const STATUS_STYLE = {
  "textAlign": "center",
  "fontSize": "2rem",
  "margin": "3rem 0 3rem 0",
};

/**
 * HOC for handling loading/failed status.
 * TODO Remove this component.
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
    "http.fetchFailed",
    "http.errorResponse",
    "http.serverFailure",
  ];

  if (props.error > 0) {
    return (
      <div style={STATUS_STYLE}>
        {props.t(errorMessages[props.error])}
      </div>
    );
  } else if (!props.ready) {
    return (
      <div style={STATUS_STYLE}>
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

export function statusFailed() {
  const t = useSelector(selectT);
  return (
    <div style={STATUS_STYLE}>
      {t("http.fetchFailed")}
    </div>
  );
}

register({
  "name": STATUS_FAILED,
  "element": statusFailed,
});

export function statusLoading() {
  const t = useSelector(selectT);
  return (
    <div style={STATUS_STYLE}>
      {t("http.fetching")}
    </div>
  );
}

register({
  "name": STATUS_LOADING,
  "element": statusLoading,
});
