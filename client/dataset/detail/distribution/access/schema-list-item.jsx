import React from "react";
import {getString} from "app/strings";

export default function schemaListItem(distribution) {
    if (distribution.conformsTo.length === 0) {
        return null;
    }
    return (
        <li className="list-group-item px-2">
            <a href={distribution.conformsTo[0]}
               className="card-link"
               rel="nofollow"
               target="_blank">
                {getString("s.schema")}
            </a>
        </li>
    )
}