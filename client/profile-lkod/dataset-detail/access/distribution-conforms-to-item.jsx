import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function DistributionConformsTo(props) {
  const conformsTo = props.distribution.conformsTo;
  if (conformsTo.length === 0) {
    return null;
  }
  if (conformsTo.length > 1) {
    console.warn("At most conformsTo expected. Given", conformsTo);
  }
  const measureDefinitions = [{
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
  }];
  return (
    <ListGroupItem className="px-2">
      <a
        href={conformsTo[0]}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.schema")}
      </a>
      <QualityIconsForMeasures
        quality={props.quality}
        measureDefinitions={measureDefinitions}
      />
    </ListGroupItem>
  );
}

DistributionConformsTo.propTypes = {
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
