import React from "react";
import {PropTypes} from "prop-types";

import {t, LEGAL, translateString} from "../../viewer-api";

export default function PersonalData(props) {
  let label;
  let message;
  let iconClass = "text-success";
  const mapped = LEGAL[props.legal.personalData];
  if (mapped === "no") {
    iconClass = " text-success";
    label = "license.personalNo";
    message = "license.personalNoComment";
  } else if (mapped === "contains") {
    iconClass = " text-warning";
    label = "license.personalYes";
    message = "license.personalYesComment";
  } else if (mapped === "unspecified") {
    iconClass = " text-warning";
    label = "license.personalUnspecified";
    message = "license.personalUnspecifiedComment";
  } else if (mapped === "missing") {
    iconClass = " text-danger";
    label = "license.personalMissing";
    message = "license.personalMissingComment";
  } else {
    console.warn(
      "Unexpected value for personal data: ",
      props.legal.personalData);
    return null;
  }
  const translatedLabel = translateString(props.language, label);
  const translatedMessage = translateString(props.language, message);
  return (
    <li className="list-group-item px-2">
      <div>
        {translatedLabel}
        <i
          className={"material-icons float-end" + iconClass}
          title={translatedMessage}
          onClick={() => props.showModal(translatedMessage)}
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
  "language": PropTypes.string.isRequired,
  "legal": PropTypes.object.isRequired,
  "showModal": PropTypes.func.isRequired,
};