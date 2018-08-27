import React from "react";
import {getString} from "app/strings";

export default function downloadListItem(distribution) {
    let downloadUrl = undefined;
    if (isEmpty(distribution.downloadURL)) {
        if (isEmpty(distribution.accessURL)) {
            console.error("Invalid data, missing accessURL", distribution);
        } else {
            downloadUrl = distribution.accessURL[0];
        }
    } else {
        downloadUrl = distribution.downloadURL[0];
    }

    if (downloadUrl === undefined) {
        return null;
    }

    return (
        <li className="list-group-item px-2">
            <a href={downloadUrl}
               className="card-link"
               rel="nofollow"
               target="_blank">
                {getString("s.download")}
            </a>
        </li>
    )
}

function isEmpty(value) {
    return value === undefined || value.length === 0;
}