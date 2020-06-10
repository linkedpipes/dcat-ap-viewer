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
        title={t("file_quality_true", strArgs)}
        onClick={() => openModal(t("file_quality_true", strArgs))}
      >
        verified_user
      </i>
    );
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("file_quality_false", strArgs)}
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
