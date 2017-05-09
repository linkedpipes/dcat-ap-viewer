import React from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";

const FacetFilter = ({label, values, active, onChange}) => (
    <div>
        <h3>{label}</h3>
        <ListGroup>
            {values.map((item) => {
                const isActive = active.indexOf(item.label) >= 0;
                return (
                    <ListGroupItem
                        key={item.label}
                        onClick={() => onChange(item)}
                        action
                        href="javascript:void(0)"
                        tag="a">
                        {item.label} ({item.count})
                        {isActive && <div>ACTIVE</div> }
                    </ListGroupItem >
                );
            })}
        </ListGroup>
    </div>
);

FacetFilter.propTypes = {
    "label": PropTypes.string.isRequired,
    "values": PropTypes.arrayOf(PropTypes.shape({
        "label": PropTypes.string.isRequired,
        "count": PropTypes.number
    })).isRequired,
    "active": PropTypes.arrayOf(PropTypes.string).isRequired,
    "onChange": PropTypes.func.isRequired
};

export default FacetFilter;