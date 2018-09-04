import React from "react";
import {getString} from "app/strings";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const values = [
    "dataset-list",
    "keyword-cloud",
    "theme-cloud"
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

function indexToValue(index) {
    return values[index];
}

export default ViewSelector;

const menuItem = (index, onChange) => (
    <DropdownItem key={index} onClick={() => onChange(index)}>
        {getString(indexToValue(index))}
    </DropdownItem>
);
