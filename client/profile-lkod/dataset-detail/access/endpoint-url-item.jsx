import React from "react";
import {PropTypes} from "prop-types";

import {t, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function EndpointUrl(props) {
  const endpointURL = props.dataService.endpointURL;
  if (endpointURL === undefined) {
    return null;
  }
  const measureDefinitions = [{
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
  }];
  return (
    <li className="list-group-item px-2">
      <a
        href={endpointURL}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.endpoint")}
      </a>
      <QualityIconsForMeasures
        quality={props.quality}
        measureDefinitions={measureDefinitions}
      />
    </li>
  );
}

EndpointUrl.propTypes = {
  "dataService": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
