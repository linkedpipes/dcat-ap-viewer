import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../../client/vocabulary/vocabulary";
import {qualityIcons} from "../../quality/quality-icon";

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
        {t("schema")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
        "measureOf": QUALITY.schema,
        "labelTrue": "schema_quality_true",
        "labelFalse": "schema_quality_true",
        "iconTrue": "verified_user",
        "iconFalse": "link_off",
      }, {
        "measureOf": QUALITY.schemaCors,
        "labelTrue": "schema_quality_cors_true",
        "labelFalse": "schema_quality_cors_false",
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
