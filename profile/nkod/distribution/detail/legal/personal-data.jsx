import React from "react";
import {PU_VALUES_MAPPING} from "../../../../client-api";
import {PropTypes} from "prop-types";

export default function PersonalData({t, legal, openModal}) {
  let label;
  let title;
  let iconClass = "text-success";
  const mapped = PU_VALUES_MAPPING[legal.personalData];
  if (mapped === "no") {
    iconClass = " text-success";
    label = t("license_personal_no");
    title = t("license_personal_no_comment");
  } else if (mapped === "contains") {
    iconClass = " text-success";
    label = t("license_personal_yes");
    title = t("license_personal_yes_comment");
  } else if (mapped === "unspecified") {
    iconClass = " text-warning";
    label = t("license_personal_unspecified");
    title = t("license_personal_unspecified_comment");
  } else if (mapped === "missing") {
    iconClass = " text-danger";
    label = t("license_personal_unspecified");
    title = t("license_personal_missing_comment");
  } else {
    console.error("Unexpected value for personal data: ", legal.personalData);
    return null;
  }
  return (
    <li className="list-group-item px-2">
      <div>
        {label}
        <i
          className={"material-icons float-right" + iconClass}
          title={title}
          onClick={() => openModal(title)}
        >
          person
        </i>
      </div>
      <div className="label">
        {t("license_personal_type")}
      </div>
    </li>
  );
}

PersonalData.propTypes = {
  "t": PropTypes.func.isRequired,
  "legal": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
};