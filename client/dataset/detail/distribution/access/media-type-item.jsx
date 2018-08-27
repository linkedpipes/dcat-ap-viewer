import React from "react";
import {selectLabel, selectLabelNoIri} from "../../../../app-services/labels";

export default function mediaTypeItem(labels, distribution) {
    if (distribution.mediaType === undefined) {
        return null;
    }
    return (
        <li className="list-group-item px-2">
            {selectLabelNoIri(labels, distribution.mediaType)}
            <a href={distribution.mediaType["@id"]}
               rel="nofollow"
               target="_blank">
                {linkIcon()}
            </a>
        </li>
    )
}

function linkIcon() {
    const iconStyle = {
        "fontSize": "1.2rem",
        "paddingLeft": "0.5rem"
    };
    return (
        <i className="material-icons" style={iconStyle}>
            open_in_new
        </i>
    );
}
