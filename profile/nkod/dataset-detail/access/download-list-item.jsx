import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../client-api";
import {qualityIcons} from "../quality/quality-icon";

export default function DownloadListItem(
  {t, tLiteral, distribution, quality, openModal}) {
  //
  let downloadUrl = undefined;
  if (isEmpty(distribution.downloadURL)) {
    if (isEmpty(distribution.accessURL)) {
      console.error("Invalid data, missing accessURL", distribution);
    } else {
      downloadUrl = distribution.accessURL[0];
    }
  } else {
    downloadUrl = distribution.downloadURL[0];
  }

  if (downloadUrl === undefined) {
    return null;
  }

  return (
    <li className="list-group-item px-2">
      <a
        href={downloadUrl}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("access.download")}
      </a>
      {qualityIcons(t, tLiteral, openModal, quality, [{
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
      }])}
    </li>
  );
}

DownloadListItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};

function isEmpty(value) {
  return value === undefined || value.length === 0;
}
