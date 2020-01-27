import React from "react";
import {selectLabelNoIri} from "../../../../app-services/labels";
import {getString} from "../../../../app-services/strings";
import {Spinner} from "reactstrap";

export default function mediaTypeItem(labels, distribution, openModal) {
  if (distribution.mediaType === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      {selectLabelNoIri(labels, distribution.mediaType)}
      <a href={distribution.mediaType["@id"]}
        rel="nofollow noopener noreferrer"
        target="_blank">
        {linkIcon()}
      </a>
      {qualityIcon(distribution, openModal)}
    </li>
  )
}

function linkIcon() {
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <i className="material-icons" style={iconStyle}>
            open_in_new
    </i>
  );
}

function qualityIcon(distribution, openModal) {
  if (!distribution.quality.ready) {
    return (
      <Spinner size="sm" color="secondary" className="float-right"/>
    )
  }
  if (distribution.quality.mediaType === null) {
    return null;
  }
  if (distribution.quality.mediaType) {
    return (
      <i className="material-icons text-success float-right"
        title={getString("format_match")}
        onClick={() => openModal(getString("format_match"))}>
                verified_user
      </i>
    )
  } else {
    const strArgs = {
      "date": distribution.quality.mediaTypeLastCheck,
      "note": distribution.quality.mediaTypeNote,
    };
    return (
      <i className="material-icons text-warning float-right"
        title={getString("format_mismatch", strArgs)}
        onClick={() => openModal(getString("format_mismatch", strArgs))}>
                warning
      </i>
    )
  }
}
