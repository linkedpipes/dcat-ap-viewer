import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";
import {selectString} from "@/app-services/labels";
import {Spinner} from "reactstrap";

export default function databaseAuthorship(distribution, openModal) {
    const mapped = PU_VALUES_MAPPING[distribution.databaseAuthorship];
    switch (mapped) {
        case "no":
            return (
                <li className="list-group-item px-2">
                    <div>
                        {getString("license_author_no")}
                        {getString("license_db_no")}
                        <i className="material-icons text-success float-right"
                           title={getString("license_db_no_comment")}
                           onClick={() => openModal(getString("license_db_no_comment"))}>
                            check
                        </i>
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
                        {getString("license_db_ccBy")}
                        <i className="material-icons text-warning float-right"
                           title={getString("license_db_ccBy_comment")}
                           onClick={() => openModal(getString("license_db_ccBy_comment"))}>
                            turned_in
                        </i>
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
                        <i className="material-icons text-danger float-right"
                           title={getString("license_missing_comment")}
                           onClick={() => openModal(getString("license_missing_comment"))}>
                            warning
                        </i>
                    </div>
                    <div className="label">
                        {getString("license_db_type")}
                    </div>
                </li>
            );
        default:
            return custom(distribution);
    }
}

function custom(distribution) {
    const strArgs = {
        "date": distribution.quality.databaseAuthorshipLastCheck
    };
    return (
        <li className="list-group-item px-2">
            <div>
                <a href={distribution.databaseAuthorship}
                   rel="nofollow"
                   target="_blank">
                    {getString("license_db_custom")}
                </a>
                <i className="material-icons text-warning float-right"
                   title={getString("license_db_custom_comment")}
                   onClick={() => openModal(getString("license_db_custom_comment", strArgs))}>
                    help
                </i>
                {!distribution.quality.ready &&
                <Spinner size="sm" color="secondary" className="float-right"/>
                }
                {distribution.quality.ready && !distribution.quality.databaseAuthorship &&
                <i className="material-icons text-danger float-right"
                   title={getString("license_db_custom_unavailable", strArgs)}
                   onClick={() => openModal(getString("license_db_custom_unavailable", strArgs))}>
                    link_off
                </i>
                }
            </div>
            <div className="label">
                {getString("license_db_type")}
            </div>
        </li>
    );
}