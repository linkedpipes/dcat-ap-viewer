import React from "react";
import {PropTypes} from "prop-types";
import QualityEndpointDescriptionIcon
  from "../quality/quality-endpoint-description-icon";

export default function EndpointDescription(
  {t, tLiteral, dataSource, openModal, quality}) {
  //
  if (dataSource.endpointDescription === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={dataSource.endpointDescription}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("endpoint_description")}
      </a>
      <QualityEndpointDescriptionIcon
        t={t}
        tLiteral={tLiteral}
        openModal={openModal}
        quality={quality}
      />
    </li>
  );
}

EndpointDescription.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
