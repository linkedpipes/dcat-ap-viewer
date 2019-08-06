import React from "react";
import {getString} from "@/app-services/strings";
import {Spinner} from "reactstrap";

export default function downloadListItem(distribution, openModal) {
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
                {getString("download")}
            </a>
            {qualityIcon(distribution, openModal)}
        </li>
    )
}

function isEmpty(value) {
    return value === undefined || value.length === 0;
}

function qualityIcon(distribution, openModal) {
    if (!distribution.quality.ready) {
        return (
            <Spinner size="sm" color="secondary" className="float-right"/>
        )
    }
    const strArgs = {
        "date": distribution.quality.downloadLastCheck,
        "note": distribution.quality.downloadNote
    };
    if (distribution.quality.download === null) {
        return null;
    }
    if (distribution.quality.download) {
        return (
            <i className="material-icons text-success float-right"
               title={getString("file_available", strArgs)}
               onClick={() => openModal(getString("file_available", strArgs))}>
                verified_user
            </i>
        )
    } else {
        return (
            <i className="material-icons text-danger float-right"
               title={getString("file_unavailable", strArgs)}
               onClick={() => openModal(getString("file_unavailable", strArgs))}>
                link_off
            </i>
        )
    }
}
