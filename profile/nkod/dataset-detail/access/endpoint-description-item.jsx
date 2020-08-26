import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../client-api";
import {qualityIcons} from "../../quality/quality-icon";

export default function EndpointDescription(
  {t, tLiteral, dataSource, openModal, quality}) {
  //
  if (dataSource.endpointDescription === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={dataSource.endpointDescription}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("endpoint_description")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
        "measureOf": QUALITY.endpointDescription,
        "labelTrue": "endpoint_description_quality_true",
        "labelFalse": "endpoint_description_quality_false",
        "iconTrue": "verified_user",
        "iconFalse": "link_off",
      }, {
        "measureOf": QUALITY.endpointDescriptionCors,
        "labelTrue": "endpoint_description_quality_cors_true",
        "labelFalse": "endpoint_description_quality_cors_false",
        "iconTrue": "http",
        "iconFalse": "http",
      }])}
    </li>
  );
}

EndpointDescription.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
