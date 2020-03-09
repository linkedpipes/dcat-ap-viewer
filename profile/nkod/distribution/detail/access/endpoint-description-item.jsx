import React from "react";
import {PropTypes} from "prop-types";

export default function EndpointDescription({t, dataSource}) {
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
    </li>
  )
}

EndpointDescription.propTypes = {
  "t": PropTypes.func.isRequired,
  "dataSource": PropTypes.object.isRequired,
};
