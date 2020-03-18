import React from "react";
import {PropTypes} from "prop-types";
import QualitySchemaIcon from "../quality/quality-schema-icon";

export default function SchemaListItem(
  {t, tLabel, tLiteral, distribution, quality, openModal}) {
  if (distribution.conformsTo.length === 0) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={distribution.conformsTo[0]}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("schema")}
      </a>
      <QualitySchemaIcon
        t={t}
        tLabel={tLabel}
        tLiteral={tLiteral}
        openModal={openModal}
        quality={quality}
      />
    </li>
  )
}

SchemaListItem.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "distribution": PropTypes.object.isRequired,
  "quality": PropTypes.object,
};
