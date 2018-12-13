import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";
import {selectString} from "@/app-services/labels";

export default function databaseAuthorship(distribution) {
    const mapped = PU_VALUES_MAPPING[distribution.databaseAuthorship];
    switch (mapped) {
        case "no":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_db_type")}
                    </div>
                </li>
            );
        case "ccBy":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_ccBy")}
                    </div>
                    <div className="label">
                        {selectString(distribution.databaseAuthor)}
                    </div>
                </li>
            );
        case "missing":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_missing")}
                    </div>
                    <div className="label">
                        {getString("license_db_type")}
                    </div>
                </li>
            );
        default:
            return (
                <li className="list-group-item px-2">
                    <div>
                        <a href={distribution.databaseAuthorship}
                           rel="nofollow"
                           target="_blank">
                            {getString("license_author_custom")}
                        </a>
                    </div>
                    <div className="label">
                        {getString("license_db_type")}
                    </div>
                </li>
            );
    }
}