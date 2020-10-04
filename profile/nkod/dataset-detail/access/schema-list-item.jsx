import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../client-api";
import {qualityIcons} from "../quality/quality-icon";

export default function SchemaListItem(
  {t, tLiteral, distribution, quality, openModal}) {
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
        {t("access.schema")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
        "measureOf": QUALITY.schema,
        "labelTrue": "access.schemaQualityTrue",
        "labelFalse": "access.schemaQualityFalse",
        "iconTrue": "verified_user",
        "iconFalse": "link_off",
      }, {
        "measureOf": QUALITY.schemaCors,
        "labelTrue": "access.schemaQualityCorsTrue",
        "labelFalse": "access.schemaQualityCorsFalse",
        "iconTrue": "http",
        "iconFalse": "http",
      }])}
    </li>
  );
}

SchemaListItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
