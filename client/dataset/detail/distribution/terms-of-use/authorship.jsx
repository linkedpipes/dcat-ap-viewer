import React from "react";
import {getString} from "@/app-services/strings";

export default function authorship(distribution) {
    switch (distribution.authorship) {
        case "multi":
            return (
                <li className="list-group-item  px-2">
                    <div>
                        {getString("license_author_multi")}
                    </div>
                    <div className="label">
                        {getString("license_author_type")}
                    </div>
                </li>
            );
        case "no":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_no")}
                    </div>
                    <div className="label">
                        {getString("license_author_type")}
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
                        {distribution.author}
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
                        {getString("license_author_type")}
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
                        <a href={distribution.authorship}
                           rel="nofollow"
                           target="_blank">
                            {distribution.authorship}
                        </a>
                    </div>
                </li>
            );
    }
}