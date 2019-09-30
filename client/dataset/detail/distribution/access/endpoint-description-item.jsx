import React from "react";
import {getString} from "@/app-services/strings";

export default function endpointDescription(labels, dataSource) {
  if (dataSource.endpointDescription === undefined) {
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <a href={dataSource.endpointDescription}
        className="card-link"
        rel="nofollow noopener noreferrer"
        target="_blank">
        {getString("endpoint_description")}
      </a>
    </li>
  )
}
