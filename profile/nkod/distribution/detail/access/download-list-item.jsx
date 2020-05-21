import React from "react";
import {PropTypes} from "prop-types";
import QualityIcon from "../quality/quality-download-icon";

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
        {t("download")}
      </a>
      <QualityIcon
        t={t}
        tLiteral={tLiteral}
        quality={quality}
        openModal={openModal}
      />
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

