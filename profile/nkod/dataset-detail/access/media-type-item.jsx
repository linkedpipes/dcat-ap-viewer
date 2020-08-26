import React from "react";
import {PropTypes} from "prop-types";
import {QUALITY} from "../../../client-api";
import {qualityIcons} from "../../quality/quality-icon";

export default function MediaTypeItem(
  {t, tLabel, tLiteral, distribution, quality, openModal}) {
  //
  if (distribution.mediaType === undefined) {
    return null;
  }
  const iconStyle = {
    "fontSize": "1.2rem",
    "paddingLeft": "0.5rem",
  };
  return (
    <li className="list-group-item px-2">
      <div>
        {tLabel(distribution.mediaType, "")}
        <a
          href={distribution.mediaType}
          title={t("follow_link")}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i className="material-icons" style={iconStyle}> open_in_new </i>
        </a>
        {qualityIcons(t, tLiteral, openModal, quality, [{
          "measureOf": QUALITY.mediaType,
          "labelTrue": "format_quality_true",
          "labelFalse": "format_quality_false",
          "iconTrue": "verified_user",
          "iconFalse": "link_off",
        }])}
      </div>
      <div className="label">
        {t("access_mediaType")}
      </div>
    </li>
  );
}

MediaTypeItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};

