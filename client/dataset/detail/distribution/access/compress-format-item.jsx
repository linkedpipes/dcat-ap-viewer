import React from "react";
import {selectLabelNoIri} from "../../../../app-services/labels";

export default function compressFormat(labels, distribution) {
  if (distribution.compressFormat === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      {selectLabelNoIri(labels, distribution.compressFormat)}
      <a href={distribution.compressFormat["@id"]}
        rel="nofollow noopener noreferrer"
        target="_blank">
        {linkIcon()}
      </a>
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

