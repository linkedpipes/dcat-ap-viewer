import React from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {PropTypes} from "prop-types";

const VISUALISATION_CODELIST = [
  "dataset-list",
  "keyword-cloud",
  "theme-cloud",
];

export default function ViewSelector({t, value, onChange}) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        {t(VISUALISATION_CODELIST[value])}
      </DropdownToggle>
      <DropdownMenu>
        {VISUALISATION_CODELIST
          .map((item, index) =>
            index === value ? null : (
              <DropdownItem key={index} onClick={() => onChange(index)}>
                {t(item)}
              </DropdownItem>
            ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

ViewSelector.propTypes = {
  "t": PropTypes.func.isRequired,
  "value": PropTypes.number.isRequired,
  "onChange": PropTypes.func.isRequired,
};
