import React from "react";
import {PropTypes} from "prop-types";
import QualityEndpointUrlIcon from "../quality/quality-endpoint-url-icon";

export default function EndpointUrl(
  {t, tLiteral, dataSource, openModal, quality}) {
  if (dataSource.endpointURL === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a
        href={dataSource.endpointURL}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {t("endpoint")}
      </a>
      <QualityEndpointUrlIcon
        t={t}
        tLiteral={tLiteral}
        openModal={openModal}
        quality={quality}
      />
    </li>
  );
}

EndpointUrl.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
  "quality": PropTypes.object,
};
