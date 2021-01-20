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
  const downloadURL = getNonEmptyFromArray(distribution.downloadURL);
  const accessURL = getNonEmptyFromArray(distribution.accessURL);
  if (downloadURL === undefined) {
    if (accessURL === undefined) {
      console.error("Missing downloadURL and accessURL for:", distribution);
      return undefined;
    } else {
      return distribution.accessURL;
    }
  } else {
    return distribution.downloadURL;
  }
}

function getNonEmptyFromArray(array) {
  if (array === undefined || array === null) {
    return undefined;
  }
  for (const item of array) {
    if (!isEmpty(item)) {
      return item;
    }
  }
  return undefined;
}

function isEmpty(value) {
  return value === undefined || value.length === 0;
}
