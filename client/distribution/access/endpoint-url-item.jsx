import React from "react";
import {getString} from "../../../../app-services/strings";

export default function endpointUrl(labels, dataSource) {
  if (dataSource.endpointURL === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a href={dataSource.endpointURL}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank">
        {getString("endpoint")}
      </a>
    </li>
  )
}
