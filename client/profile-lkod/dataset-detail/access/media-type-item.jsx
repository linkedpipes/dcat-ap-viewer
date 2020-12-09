import React from "react";
import {PropTypes} from "prop-types";
import {ListGroupItem} from "reactstrap";

import {t, QUALITY, translateString} from "../../viewer-api";
import {QualityIconsForMeasures} from "../quality-icons";

export default function MediaTypeItem(props) {
  const mediaType = props.distribution.mediaType;
  if (mediaType === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  const measureDefinitions = [{
    "measureOf": QUALITY.mediaType,
    "labelTrue": "access.formatQualityTrue",
    "labelFalse": "access.formatQualityFalse",
    "iconTrue": "verified_user",
    "iconFalse": "link_off",
  }];
  return (
    <ListGroupItem className="px-2">
      <div>
        {props.selectLabel(mediaType, "")}
        <a
          href={mediaType}
          title={translateString(props.language, "followLink")}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i className="material-icons" style={iconStyle}> open_in_new </i>
        </a>
        <QualityIconsForMeasures
          quality={props.quality}
          measureDefinitions={measureDefinitions}
        />
      </div>
      <div className="label">
        {t("access.mediaType")}
      </div>
    </ListGroupItem>
  );
}

MediaTypeItem.propTypes = {
  "language": PropTypes.string.isRequired,
  "selectLabel": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
