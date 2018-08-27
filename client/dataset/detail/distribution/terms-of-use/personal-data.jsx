import React from "react";
import {getString} from "app/strings";

export default function personalData(distribution) {
    let label;
    if (distribution.personalData === "no") {
        label = getString("license_personal_no");
    } else if (distribution.personalData === "contains") {
        label = getString("license_personal_yes");
    } else if (distribution.personalData === "unspecified") {
        label = getString("license_personal_unspecified");
    } else if (distribution.personalData === "missing") {
        label = getString("license_personal_unspecified");
    } else {
        console.error("Unexpected value for personal data: ",
            distribution.personalData);
        return null;
    }
    return (
        <li className="list-group-item px-2">
            <div>
                {label}
            </div>
            <div className="label">
                {getString("license_personal_type")}
            </div>
        </li>
    );
}