import React from "react";
import {getString} from "@/app-services/strings";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";

const values = [
    "title asc",
    "title desc"
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

export default SortSelector;

const menuItem = (item, onChange) => (
    <DropdownItem key={item} onClick={() => onChange(item)}>
        {getString(item)}
    </DropdownItem>
);
