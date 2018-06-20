import React from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {formatNumber} from "../../../app-services/formats"
import {getString} from "../../../app/strings"

class FacetFilter extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.generateListItems = this.generateListItems.bind(this);
        this.state = {
            "showAll": false
        };
    }

    toggle() {
        this.setState({
            "showAll": !this.state.showAll
        });
    }

    generateListItems() {
        const props = this.props;
        let indexEnd;
        if (this.state.showAll) {
            indexEnd = props.values.length;
        } else {
            indexEnd = Math.min(7, props.values.length);
        }
        const items = [];
        // TODO First show all active
        for (let index = 0; index < indexEnd; ++index) {
            const value = props.values[index];
            const isActive = props.active.indexOf(value.label) >= 0;
            const html = (
                <ListGroupItem
                    key={value.label}
                    onClick={() => props.onChange(value, !isActive)}
                    action
                    className="filter-button"
                    active={isActive}
                    tag="button">
                    {value.label} ({formatNumber(value.count)})
                </ListGroupItem >
            );
            items.push(html);
        }
        if (props.values.length > 7) {
            let label;
            if (this.state.showAll) {
                label = getString("s.show_popular");
            } else {
                label = getString("s.show_more");
            }
            const html = (
                <ListGroupItem
                    key="ShowNext"
                    onClick={() => this.toggle()}
                    action
                    className="filter-button"
                    tag="button">
                    <strong>{label}</strong>
                </ListGroupItem >
            );
            items.push(html);
        }

        return items;
    }

    render() {
        const props = this.props;
        const items = this.generateListItems();
        const label = getString(props.label) + " (" + props.values.length + ")";
        return (
            <div className="mt-2">
                <h3 className="p-lg-2">{label}</h3>
                <ListGroup>
                    {items}
                </ListGroup>
            </div>
        )
    }
}

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