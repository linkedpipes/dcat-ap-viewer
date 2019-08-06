import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";
import {selectString} from "@/app-services/labels";
import {Spinner} from "reactstrap";

export default function authorship(distribution, openModal) {
    const mapped = PU_VALUES_MAPPING[distribution.authorship];
    switch (mapped) {
        case "multi":
            return (
                <li className="list-group-item  px-2">
                    <div>
                        {getString("license_author_multi")}
                        <i className="material-icons text-warning float-right"
                           title={getString("license_author_multi_comment")}
                           onClick={() => openModal(getString("license_author_multi_comment"))}>
                            list
                        </i>
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
                        <i className="material-icons text-success float-right"
                           title={getString("license_author_no_comment")}
                           onClick={() => openModal(getString("license_author_no_comment"))}>
                            check
                        </i>
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
                        <i className="material-icons text-warning float-right"
                           title={getString("license_author_ccBy_comment")}
                           onClick={() => openModal(getString("license_author_ccBy_comment"))}>
                            turned_in
                        </i>
                    </div>
                    <div className="label">
                        {selectString(distribution.author)}
                    </div>
                </li>
            );
        case "missing":
            return missing(openModal);
        default:
            return custom(distribution, openModal);

    }
}

function missing(openModal) {
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
                {getString("license_author_type")}
            </div>
        </li>
    );
}

function custom(distribution, openModal) {
    const strArgs = {
        "date": distribution.quality.authorshipCustomLastCheck
    };
    return (
        <li className="list-group-item px-2">
            <div>
                <a href={distribution.authorship}
                   rel="nofollow"
                   target="_blank">
                    {getString("license_author_custom")}
                </a>
                <i className="material-icons text-warning float-right"
                   title={getString("license_author_custom_comment")}
                   onClick={() => openModal(getString("license_author_custom_comment"))}>
                    help
                </i>
                {!distribution.quality.ready &&
                <Spinner size="sm" color="secondary" className="float-right"/>
                }
                {distribution.quality.ready && !distribution.quality.authorshipCustom &&
                <i className="material-icons text-danger float-right"
                   title={getString("license_author_custom_unavailable", strArgs)}
                   onClick={() => openModal(getString("license_author_custom_unavailable", strArgs))}>
                    link_off
                </i>
                }
            </div>
            <div className="label">
                {getString("license_author_type")}
            </div>
        </li>
    );
}