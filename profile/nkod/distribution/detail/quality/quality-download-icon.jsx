import {Spinner} from "reactstrap";
import React from "react";
import {PropTypes} from "prop-types";

export default function QualityDownloadIcon({t, tLiteral, openModal, quality}) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  const strArgs = {
    "date": quality.downloadLastCheck,
    "note": tLiteral(quality.downloadNote),
  };
  if (quality.download === undefined) {
    return null;
  }
  if (quality.download) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("file_available", strArgs)}
        onClick={() => openModal(t("file_available", strArgs))}
      >
        verified_user
      </i>
    );
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("file_unavailable", strArgs)}
        onClick={() => openModal(t("file_unavailable", strArgs))}
      >
        link_off
      </i>
    );
  }
}

QualityDownloadIcon.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
