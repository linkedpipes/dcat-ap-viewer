import {Spinner} from "reactstrap";
import React from "react";
import {PropTypes} from "prop-types";

export default function QualitySchemaIcon({t, tLiteral, quality, openModal}) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    );
  }
  if (quality.schema === undefined) {
    return null;
  }
  const strArgs = {
    "date": quality.schemaLastCheck,
    "note": tLiteral(quality.schemaNote),
  };
  if (quality.schema) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("schema_quality_true", strArgs)}
        onClick={() => openModal(t("schema_quality_true", strArgs))}
      >
        verified_user
      </i>
    );
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("schema_quality_false", strArgs)}
        onClick={() => openModal(t("schema_quality_false", strArgs))}
      >
        link_off
      </i>
    );
  }
}

QualitySchemaIcon.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
