import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../client-api";
import {qualityIcons} from "../quality/quality-icon";

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
        {t("access.endpoint")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
        "measureOf": QUALITY.endpointUrl,
        "labelTrue": "access.endpointUrlQualityTrue",
        "labelFalse": "access.endpointUrlQualityFalse",
        "iconTrue": "verified_user",
        "iconFalse": "link_off",
      }, {
        "measureOf": QUALITY.endpointUrlCors,
        "labelTrue": "access.endpointUrlQualityCorsTrue",
        "labelFalse": "access.endpointUrlQualityCorsFalse",
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
