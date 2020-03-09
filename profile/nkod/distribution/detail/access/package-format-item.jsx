import React from "react";
import {PropTypes} from "prop-types";

export default function PackageFormat({tLabel, distribution}) {
  if (distribution.packageFormat === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      {tLabel(distribution.packageFormat, true)}
      <a
        href={distribution.packageFormat}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {linkIcon()}
      </a>
    </li>
  )
}

PackageFormat.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
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
