import React from "react";
import {PropTypes} from "prop-types";
import {qualityIcons} from "../../../quality/quality-icon";
import {QUALITY} from "../../../../../client/vocabulary/vocabulary";

export default function EndpointUrl(
  {t, tLiteral, dataSource, openModal, quality}) {
  if (dataSource.endpointURL === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={dataSource.endpointURL}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("endpoint")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
        "measureOf": QUALITY.endpointUrl,
        "labelTrue": "endpoint_url_quality_true",
        "labelFalse": "endpoint_url_quality_false",
        "iconTrue": "verified_user",
        "iconFalse": "link_off",
      }, {
        "measureOf": QUALITY.endpointUrlCors,
        "labelTrue": "endpoint_url_quality_cors_true",
        "labelFalse": "endpoint_url_quality_cors_false",
        "iconTrue": "http",
        "iconFalse": "http",
      }])}
    </li>
  );
}

EndpointUrl.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
