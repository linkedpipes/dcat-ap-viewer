import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";

export default function personalData(distribution) {
    let label;
    const mapped = PU_VALUES_MAPPING[distribution.personalData];
    if (mapped === "no") {
        label = getString("license_personal_no");
    } else if (mapped === "contains") {
        label = getString("license_personal_yes");
    } else if (mapped === "unspecified") {
        label = getString("license_personal_unspecified");
    } else if (mapped === "missing") {
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