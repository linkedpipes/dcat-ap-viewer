import React from "react";
import {PropTypes} from "prop-types";

export default function PackageFormat({tLabel, distribution}) {
  if (distribution.packageFormat === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <li className="list-group-item px-2">
      {tLabel(distribution.packageFormat, "")}
      <a
        href={distribution.packageFormat}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <i className="material-icons" style={iconStyle}> open_in_new </i>
      </a>
    </li>
  )
}

PackageFormat.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
};
