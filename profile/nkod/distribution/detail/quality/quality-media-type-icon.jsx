import {Spinner} from "reactstrap";
import React from "react";
import {PropTypes} from "prop-types";

export default function QualityMediaTypeIcon(t, tLiteral, quality, openModal) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  if (quality.mediaType === undefined) {
    return null;
  }
  if (quality.mediaType) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("format_quality_true")}
        onClick={() => openModal(t("format_quality_true"))}
      >
        verified_user
      </i>
    );
  } else {
    const strArgs = {
      "date": quality.mediaTypeLastCheck,
      "note": tLiteral(quality.mediaTypeNote),
    };
    return (
      <i
        className="material-icons text-warning float-right"
        title={t("format_quality_false", strArgs)}
        onClick={() => openModal(t("format_quality_false", strArgs))}
      >
        warning
      </i>
    );
  }
}

QualityMediaTypeIcon.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
