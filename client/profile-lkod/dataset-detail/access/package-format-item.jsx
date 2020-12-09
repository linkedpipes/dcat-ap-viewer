import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, translateString} from "../../viewer-api";

export default function PackageFormat(props) {
  const packageFormat = props.distribution.packageFormat;
  if (packageFormat === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <ListGroupItem className="px-2">
      <div>
        {props.selectLabel(packageFormat, "")}
        <a
          href={packageFormat}
          title={translateString(props.language, "followLink")}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i className="material-icons" style={iconStyle}> open_in_new </i>
        </a>
      </div>
      <div className="label">
        {t("access.packageFormat")}
      </div>
    </ListGroupItem>
  );
}

PackageFormat.propTypes = {
  "language": PropTypes.string.isRequired,
  "selectLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
};
