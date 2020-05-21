import {Spinner} from "reactstrap";
import React from "react";
import {PropTypes} from "prop-types";

export default function QualityEndpointDescriptionIcon(
  {t, tLiteral, quality, openModal}) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  if (quality.endpointDescription === undefined) {
    return null;
  }
  const strArgs = {
    "date": quality.endpointDescriptionLastCheck,
    "note": tLiteral(quality.endpointDescriptionNote),
  };
  if (quality.endpointDescription) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("endpoint_description_available", strArgs)}
        onClick={() => openModal(t("endpoint_description_available", strArgs))}
      >
        verified_user
      </i>
    );
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("endpoint_description_unavailable", strArgs)}
        onClick={() => openModal(
          t("endpoint_description_unavailable", strArgs))}
      >
        link_off
      </i>
    );
  }
}

QualityEndpointDescriptionIcon.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
