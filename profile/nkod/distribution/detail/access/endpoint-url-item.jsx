import React from "react";
import {PropTypes} from "prop-types";

export default function EndpointUrl({t, dataSource}) {
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
    </li>
  )
}

EndpointUrl.propTypes = {
  "t": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
};
