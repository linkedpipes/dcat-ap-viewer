import React from "react";
import {getString} from "@/app-services/strings";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import {PropTypes} from "prop-types";

const values = [
  "title_sort asc",
  "title_sort desc",
];

const SortSelector = ({value, onChange}) => (
  <UncontrolledDropdown>
    <DropdownToggle caret>
      {getString(value)}
    </DropdownToggle>
    <DropdownMenu>
      {values.map((item) => {
        if (value === item) {
          return null;
        }
        return menuItem(item, onChange);
      })}
    </DropdownMenu>
  </UncontrolledDropdown>
);

SortSelector.propTypes = {
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string.isRequired,
};

export default SortSelector;

function menuItem(item, onChange) {
  return (
    <DropdownItem key={item} onClick={() => onChange(item)}>
      {getString(item)}
    </DropdownItem>
  )
}

