import React from "react";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

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
      {qualityIcon(t, tLiteral, quality, openModal)}
    </li>
  )
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

function qualityIcon(t, tLiteral, quality, openModal) {
  if (!quality) {
    return null;
  }
  if (!quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    )
  }
  const strArgs = {
    "date": quality.downloadLastCheck,
    "note": tLiteral(quality.downloadNote),
  };
  if (quality.download === undefined) {
    return null;
  }
  if (quality.download) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("file_available", strArgs)}
        onClick={() => openModal(t("file_available", strArgs))}
      >
        verified_user
      </i>
    )
  } else {
    return (
      <i
        className="material-icons text-danger float-right"
        title={t("file_unavailable", strArgs)}
        onClick={() => openModal(t("file_unavailable", strArgs))}
      >
        link_off
      </i>
    )
  }
}
