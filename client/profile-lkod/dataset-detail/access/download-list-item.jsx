import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, QUALITY} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function DownloadListItem(props) {
  const downloadUrl = getDownloadUrl(props.distribution);
  if (downloadUrl === undefined) {
    return null;
  }
  const measureDefinitions = [{
    "measureOf": QUALITY.download,
    "labelTrue": "access.fileQualityTrue",
    "labelFalse": "access.fileQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }, {
    "measureOf": QUALITY.downloadCors,
    "labelTrue": "access.fileQualityCorsTrue",
    "labelFalse": "access.fileQualityCorsFalse",
    "iconTrue": "http",
    "iconFalse": "http",
  }];
  return (
    <ListGroupItem className="px-2">
      <a
        href={downloadUrl}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.download")}
      </a>
      <QualityIconsForMeasures
        quality={props.quality}
        measureDefinitions={measureDefinitions}
      />
    </ListGroupItem>
  );
}

DownloadListItem.propTypes = {
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

function getDownloadUrl(distribution) {
  if (isEmpty(distribution.downloadURL)) {
    if (isEmpty(distribution.accessURL)) {
      console.error("Missing downloadURL, accessURL", distribution);
      return undefined;
    } else {
      return distribution.accessURL[0];
    }
  } else {
    return distribution.downloadURL[0];
  }
}

function isEmpty(value) {
  return value === undefined || value.length === 0;
}
