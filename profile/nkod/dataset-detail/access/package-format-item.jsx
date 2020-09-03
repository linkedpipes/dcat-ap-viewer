import React from "react";
import {PropTypes} from "prop-types";

export default function PackageFormat({t, tLabel, distribution}) {
  if (distribution.packageFormat === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <li className="list-group-item px-2">
      <div>
        {tLabel(distribution.packageFormat, "")}
        <a
          href={distribution.packageFormat}
          title={t("followLink")}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i className="material-icons" style={iconStyle}> open_in_new </i>
        </a>
      </div>
      <div className="label">
        {t("access.packageFormat")}
      </div>
    </li>
  );
}

PackageFormat.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
};
