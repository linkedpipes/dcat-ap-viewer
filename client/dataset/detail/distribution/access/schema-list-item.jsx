import React from "react";
import {getString} from "@/app-services/strings";
import {Spinner} from "reactstrap";

export default function schemaListItem(distribution, openModal) {
    if (distribution.conformsTo.length === 0) {
        return null;
    }
    return (
        <li className="list-group-item px-2">
            <a href={distribution.conformsTo[0]}
               className="card-link"
               rel="nofollow"
               target="_blank">
                {getString("schema")}
            </a>
            {qualityIcon(distribution, openModal)}
        </li>
    )
}

function qualityIcon(distribution, openModal) {
    if (!distribution.quality.ready) {
        return (
            <Spinner size="sm" color="secondary" className="float-right"/>
        )
    }
    if (distribution.quality.schema === null) {
        return null;
    }
    const strArgs = {
        "date": distribution.quality.schemaLastCheck
    };
    if (distribution.quality.schema) {
        return (
            <i className="material-icons text-success float-right"
               title={getString("schema_available", strArgs)}
               onClick={() => openModal(getString("schema_available", strArgs))}>
                verified_user
            </i>
        )
    } else {
        return (
            <i className="material-icons text-danger float-right"
               title={getString("schema_unavailable", strArgs)}
               onClick={() => openModal(getString("schema_unavailable", strArgs))}>
                link_off
            </i>
        )
    }
}

