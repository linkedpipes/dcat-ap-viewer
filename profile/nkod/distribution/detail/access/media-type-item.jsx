import React from "react";
import {Spinner} from "reactstrap";
import {PropTypes} from "prop-types";

export default function MediaTypeItem(
  {t, tLabel, tLiteral, distribution, quality, openModal}) {
  //
  if (distribution.mediaType === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      {tLabel(distribution.mediaType, true)}
      <a
        href={distribution.mediaType["@id"]}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {linkIcon()}
      </a>
      {qualityIcon(t, tLiteral, quality, openModal)}
    </li>
  )
}

MediaTypeItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

function linkIcon() {
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <i className="material-icons" style={iconStyle}> open_in_new </i>
  );
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
  if (quality.mediaType === undefined) {
    return null;
  }
  if (quality.mediaType) {
    return (
      <i
        className="material-icons text-success float-right"
        title={t("format_match")}
        onClick={() => openModal(t("format_match"))}
      >
        verified_user
      </i>
    )
  } else {
    const strArgs = {
      "date": quality.mediaTypeLastCheck,
      "note": tLiteral(quality.mediaTypeNote),
    };
    return (
      <i
        className="material-icons text-warning float-right"
        title={t("format_mismatch", strArgs)}
        onClick={() => openModal(t("format_mismatch", strArgs))}
      >
        warning
      </i>
    )
  }
}
