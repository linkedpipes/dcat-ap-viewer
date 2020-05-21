import {Spinner} from "reactstrap";
import React from "react";
import {PropTypes} from "prop-types";

export default function QualityEndpointUrlIcon(
  {t, tLiteral, quality, openModal}) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  if (quality.endpointUrl === undefined) {
    return null;
  }
  const strArgs = {
    "date": quality.endpointUrlLastCheck,
    "note": tLiteral(quality.endpointUrlNote),
  };
  if (quality.endpointUrl) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("endpoint_url_available", strArgs)}
        onClick={() => openModal(t("endpoint_url_available", strArgs))}
      >
        verified_user
      </i>
    );
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("endpoint_url_unavailable", strArgs)}
        onClick={() => openModal(t("endpoint_url_unavailable", strArgs))}
      >
        link_off
      </i>
    );
  }
}

QualityEndpointUrlIcon.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
