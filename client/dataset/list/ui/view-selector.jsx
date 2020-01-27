import React from "react";
import {getString} from "../../../app-services/strings";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {PropTypes} from "prop-types";

const values = [
  "dataset-list",
  "keyword-cloud",
  "theme-cloud",
];

const ViewSelector = ({value, onChange}) => (
  <UncontrolledDropdown>
    <DropdownToggle caret>
      {getString(indexToValue(value))}
    </DropdownToggle>
    <DropdownMenu>
      {values.map((item, index) => {
        if (index === value) {
          return null;
        }
        return menuItem(index, onChange);
      })}
    </DropdownMenu>
  </UncontrolledDropdown>
);

ViewSelector.propTypes = {
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.number.isRequired,
};

function indexToValue(index) {
  return values[index];
}

ViewSelector.propTypes = {
  "value": PropTypes.number.isRequired,
  "onChange": PropTypes.func.isRequired,
};

export default ViewSelector;

function menuItem(index, onChange) {
  return (
    <DropdownItem key={index} onClick={() => onChange(index)}>
      {getString(indexToValue(index))}
    </DropdownItem>
  );
}
