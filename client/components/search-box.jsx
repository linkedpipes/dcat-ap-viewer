import React from "react";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    Button,
    Input
} from "reactstrap";

const SearchBox = ({value, onChange, onSearch}) => (
    <div style={{margin: "1em 1em 1em 1em"}}>
        <InputGroup>
            <InputGroupAddon>Query</InputGroupAddon>
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
                placeholder="Search datasets..."
                type="text"/>
            <InputGroupButton>
                <Button onClick={() => onSearch(value)} color="secondary">
                    Search
                </Button>
            </InputGroupButton>
        </InputGroup>
    </div>
);

export default SearchBox;