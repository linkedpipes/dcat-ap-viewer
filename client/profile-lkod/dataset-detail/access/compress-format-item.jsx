import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t} from "../../viewer-api";

export default function CompressFormat(props) {
  const compressFormat = props.distribution.compressFormat;
  if (compressFormat === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <ListGroupItem className="px-2">
      <div>
        {props.selectLabel(compressFormat)}
        <a
          href={compressFormat}
          title={t("followLink")}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i className="material-icons" style={iconStyle}>
            open_in_new
          </i>
        </a>
      </div>
      <div className="label">
        {t("access.compressFormat")}
      </div>
    </ListGroupItem>
  );
}

CompressFormat.propTypes = {
  "selectLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
};
