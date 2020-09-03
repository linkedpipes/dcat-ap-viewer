import React from "react";
import {PropTypes} from "prop-types";
import {PU_VALUES_MAPPING} from "../../../client-api";

export default function PersonalData({t, legal, openModal}) {
  let label;
  let title;
  let iconClass = "text-success";
  const mapped = PU_VALUES_MAPPING[legal.personalData];
  if (mapped === "no") {
    iconClass = " text-success";
    label = t("license.personalNo");
    title = t("license.personalNoComment");
  } else if (mapped === "contains") {
    iconClass = " text-success";
    label = t("license.personalYes");
    title = t("license.personalYesComment");
  } else if (mapped === "unspecified") {
    iconClass = " text-warning";
    label = t("license.personalUnspecified");
    title = t("license.personalUnspecifiedComment");
  } else if (mapped === "missing") {
    iconClass = " text-danger";
    label = t("license.personalMissing");
    title = t("license.personalMissingComment");
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
        {t("license.personalType")}
      </div>
    </li>
  );
}

PersonalData.propTypes = {
  "t": PropTypes.func.isRequired,
  "legal": PropTypes.object.isRequired,
  "openModal": PropTypes.func.isRequired,
};