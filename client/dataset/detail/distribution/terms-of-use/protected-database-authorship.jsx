import React from "react";
import {getString} from "app/strings";

export default function protectedDatabaseAuthorship(distribution) {
    switch (distribution.protectedDatabase) {
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
                        {getString("s.license_missing")}
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
                        {getString("license_author_custom")}
                    </div>
                    <div className="label">
                        <a href={distribution.protectedDatabase}
                           rel="nofollow"
                           target="_blank">
                            {distribution.protectedDatabase}
                        </a>
                    </div>
                </li>
            );
    }
}