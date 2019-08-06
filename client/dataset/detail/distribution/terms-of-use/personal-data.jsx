import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";

export default function personalData(distribution, openModal) {
    let label;
    let title;
    let iconClass = "text-success";
    const mapped = PU_VALUES_MAPPING[distribution.personalData];
    if (mapped === "no") {
        iconClass = " text-success";
        label = getString("license_personal_no");
        title = getString("license_personal_no_comment");
    } else if (mapped === "contains") {
        iconClass = " text-success";
        label = getString("license_personal_yes");
        title = getString("license_personal_yes_comment");
    } else if (mapped === "unspecified") {
        iconClass = " text-danger";
        label = getString("license_personal_unspecified");
        title = getString("license_personal_unspecified_comment");
    } else if (mapped === "missing") {
        iconClass = " text-danger";
        label = getString("license_personal_unspecified");
        title = getString("license_personal_missing_comment");
    } else {
        console.error("Unexpected value for personal data: ",
            distribution.personalData);
        return null;
    }

    return (
        <li className="list-group-item px-2">
            <div>
                {label}
                <i className={"material-icons float-right" + iconClass}
                   title={title}
                   onClick={() => openModal(title)}>
                    person
                </i>
            </div>
            <div className="label">
                {getString("license_personal_type")}
            </div>
        </li>
    );
}