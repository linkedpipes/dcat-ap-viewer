import React from "react";
import {InputGroup, InputGroupButton, Button, Input} from "reactstrap";

const SearchBox = ({value, onChange, onSearch}) => (
    <InputGroup>
        <Input
            value={value}
            onChange={(event) => {
                onChange(event.target.value);
            }}
            onKeyPress={(event) => {
                if (event.key === "Enter") {
                    onSearch(value);
                }
            }}
            placeholder="Vyhledat datové sady ..."
            type="text"/>
        <InputGroupButton>
            <Button onClick={() => onSearch(value)} color="secondary">
                Hledat
            </Button>
        </InputGroupButton>
    </InputGroup>
);

export default SearchBox;