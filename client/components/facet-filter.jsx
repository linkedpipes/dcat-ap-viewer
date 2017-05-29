import React from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {formatNumber} from "../services/formats"

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
        // TODO First show all actives
        for (let index = 0; index < indexEnd; ++index) {
            const value = props.values[index];
            const isActive = props.active.indexOf(value.label) >= 0;
            const html = (
                <ListGroupItem
                    key={value.label}
                    onClick={() => props.onChange(value, !isActive)}
                    action
                    active={isActive}
                    href="javascript:void(0)"
                    tag="a">
                    {value.label} ({formatNumber(value.count)})
                </ListGroupItem >
            );
            items.push(html);
        }
        if (props.values.length > 7) {
            let label;
            if (this.state.showAll) {
                label = "Zobrazit pouze populární";
            } else {
                label = "Zobrazit další";
            }
            const html = (
                <ListGroupItem
                    key="ShowNext"
                    onClick={() => this.toggle()}
                    action
                    href="javascript:void(0)"
                    tag="a">
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

        return (
            <div style={{"marginTop": "1em"}}>
                <h3 style={{
                    "padding": "0.2em 0em 0.2em 1em"
                }}>{props.label}</h3>
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