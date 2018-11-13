import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";

export default function protectedDatabaseAuthorship(distribution) {
    const mapped = PU_VALUES_MAPPING[distribution.protectedDatabase];
    switch (mapped) {
        case "no":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_specialdb_type")}
                    </div>
                </li>
            );
        case "cc0":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_ccBy")}
                    </div>
                    <div className="label">
                        {getString("license_specialdb_type")}
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
                        {getString("license_specialdb_type")}
                    </div>
                </li>
            );
        default:
            return (
                <li className="list-group-item px-2">
                    <div>
                        <a href={distribution.protectedDatabase}
                           rel="nofollow"
                           target="_blank">
                            {getString("license_author_custom")}
                        </a>
                    </div>
                    <div className="label">
                        {getString("license_specialdb_type")}
                    </div>
                </li>
            );
    }
}