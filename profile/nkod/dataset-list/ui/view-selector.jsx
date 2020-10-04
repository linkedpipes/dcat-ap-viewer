import React from "react";
import {PropTypes} from "prop-types";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

const AVAILABLE_VISUALISATIONS = [
  "datasetList",
  "keywordCloud",
  "themeCloud",
];

export default function ViewSelector({t, value, onChange}) {
  return (
    <UncontrolledDropdown>
      <DropdownToggle caret>
        {t(AVAILABLE_VISUALISATIONS[value])}
      </DropdownToggle>
      <DropdownMenu>
        {AVAILABLE_VISUALISATIONS.map((item, index) =>
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
