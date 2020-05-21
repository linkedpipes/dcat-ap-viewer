import React from "react";
import {PropTypes} from "prop-types";
import QualityMediaTypeIcon from "../quality/quality-media-type-icon";

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
      {tLabel(distribution.mediaType, "")}
      <a
        href={distribution.mediaType}
        title={t("follow_link")}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        <i className="material-icons" style={iconStyle}> open_in_new </i>
      </a>
      <QualityMediaTypeIcon
        t={t}
        tLabel={tLabel}
        tLiteral={tLiteral}
        openModal={openModal}
        quality={quality}
      />
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

