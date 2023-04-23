import React from "react";
import {PropTypes} from "prop-types";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import {t} from "../../viewer-api";

const AVAILABLE_VISUALISATIONS = [
  "datasetList",
  "keywordCloud",
  "themeCloud",
];

export default function ViewSelector(props) {
  return (
    <UncontrolledDropdown className={props.className}>
      <DropdownToggle caret>
        {t(AVAILABLE_VISUALISATIONS[props.value])}
      </DropdownToggle>
      <DropdownMenu>
        {AVAILABLE_VISUALISATIONS.map((item, index) => (
          index === props.value ? null : (
            <DropdownItem key={index} onClick={() => props.onChange(index)}>
              {t(item)}
            </DropdownItem>
          )))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}

ViewSelector.propTypes = {
  "value": PropTypes.number.isRequired,
  "onChange": PropTypes.func.isRequired,
  "className": PropTypes.string,
};
