import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function EndpointDescription(props) {
  const endpointDescription = props.dataService.endpointDescription;
  if (endpointDescription === undefined) {
    return null;
  }
  const measureDefinitions = [{
    "measureOf": QUALITY.endpointDescription,
    "labelTrue": "access.endpointDescriptionQualityTrue",
    "labelFalse": "access.endpointDescriptionQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.endpointDescriptionCors,
    "labelTrue": "access.endpointDescriptionQualityCorsTrue",
    "labelFalse": "access.endpointDescriptionQualityCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return (
    <ListGroupItem className="px-2">
      <a
        href={endpointDescription}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.endpointDescription")}
      </a>
      <QualityIconsForMeasures
        quality={props.quality}
        measureDefinitions={measureDefinitions}
      />
    </ListGroupItem>
  );
}

EndpointDescription.propTypes = {
  "dataService": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
