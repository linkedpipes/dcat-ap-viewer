import React from "react";
import {getString} from "@/app-services/strings";
import {PU_VALUES_MAPPING} from "@/app-services/vocabulary";
import {Spinner} from "reactstrap";

export default function protectedDatabaseAuthorship(distribution, openModal) {
  const mapped = PU_VALUES_MAPPING[distribution.protectedDatabase];
  switch (mapped) {
    case "no":
      return (
        <li className="list-group-item px-2">
          <div>
            {getString("license_author_no")}
            {getString("license_specialdb_no")}
            <i className="material-icons text-success float-right"
              title={getString("license_specialdb_no_comment")}
              onClick={() => openModal(getString("license_specialdb_no_comment"))}>
                            check
            </i>
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
            {getString("license_specialdb_cc0")}
            <i className="material-icons text-success float-right"
              title={getString("license_specialdb_cc0_comment")}
              onClick={() => openModal(getString("license_specialdb_cc0_comment"))}>
                            check
            </i>
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
            <i className="material-icons text-danger float-right"
              title={getString("license_missing_comment")}
              onClick={() => openModal(getString("license_missing_comment"))}>
                            warning
            </i>
          </div>
          <div className="label">
            {getString("license_specialdb_type")}
          </div>
        </li>
      );
    default:
      return custom(distribution, openModal);
  }
}

function custom(distribution, openModal) {
  const strArgs = {
    "date": distribution.quality.protectedDatabaseAuthorshipLastCheck,
    "note": distribution.quality.protectedDatabaseAuthorshipNote,
  };
  return (
    <li className="list-group-item px-2">
      <div>
        <a href={distribution.protectedDatabase}
          rel="nofollow noopener noreferrer"
          target="_blank">
          {getString("license_specialdb_custom")}
        </a>
        <i className="material-icons text-warning float-right"
          title={getString("license_specialdb_custom_comment")}
          onClick={() => openModal(getString("license_specialdb_custom_comment"))}>
                    help
        </i>
        {!distribution.quality.ready &&
                <Spinner size="sm" color="secondary" className="float-right"/>
        }
        {distribution.quality.ready && distribution.quality.protectedDatabaseAuthorship === false &&
                <i className="material-icons text-danger float-right"
                  title={getString("license_specialdb_custom_unavailable", strArgs)}
                  onClick={() => openModal(getString("license_specialdb_custom_unavailable", strArgs))}>
                    link_off
                </i>
        }
      </div>
      <div className="label">
        {getString("license_specialdb_type")}
      </div>
    </li>
  );
}