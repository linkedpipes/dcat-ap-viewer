import React from "react";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

export default function SchemaListItem({t, tLiteral, distribution, openModal}) {
  if (distribution.conformsTo.length === 0) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={distribution.conformsTo[0]}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("schema")}
      </a>
      {qualityIcon(t, tLiteral, distribution, openModal)}
    </li>
  )
}

SchemaListItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
};

function qualityIcon(t, tLiteral, distribution, openModal) {
  if (!distribution.quality) {
    return null;
  }
  if (!distribution.quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    )
  }
  if (distribution.quality.schema === null) {
    return null;
  }
  const strArgs = {
    "date": distribution.quality.schemaLastCheck,
    "note": tLiteral(distribution.quality.schemaNote),
  };
  if (distribution.quality.schema) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("schema_available", strArgs)}
        onClick={() => openModal(t("schema_available", strArgs))}
      >
        verified_user
      </i>
    )
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("schema_unavailable", strArgs)}
        onClick={() => openModal(t("schema_unavailable", strArgs))}
      >
        link_off
      </i>
    )
  }
}
