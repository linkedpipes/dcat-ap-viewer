import React from "react";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {formatNumber} from "../../../app-services/formats"
import {getString} from "../../../app/strings"
import {selectLabel} from "../../../app-services/labels";

class FacetFilter extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.createListItems = this.createListItems.bind(this);
        this.createListItem = this.createListItem.bind(this);
        this.state = {
            "showAll": false
        };
    }

    toggle() {
        this.setState({
            "showAll": !this.state.showAll
        });
    }

    render() {
        const props = this.props;
        const label = getString(props.label) + " (" + props.values.length + ")";
        return (
            <div className="mt-2">
                <h3 className="p-lg-2">{label}</h3>
                <ListGroup>
                    {this.createListItems()}
                </ListGroup>
            </div>
        )
    }

    createListItems() {
        const props = this.props;
        let indexEnd;
        if (this.state.showAll) {
            indexEnd = props.values.length;
        } else {
            indexEnd = Math.min(7, props.values.length);
        }
        const items = [];
        // TODO Show active on the top.
        for (let index = 0; index < indexEnd; ++index) {
            const value = props.values[index];
            items.push(this.createListItem(value));
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

    createListItem(item) {
        let label;
        let value;
        const listStyle = {
            "wordWrap": "break-word"
        };

        if (this.props.useIris) {
            label = selectLabel(this.props.labels, item.iri);
            value = item.iri;
        } else {
            label = item.label;
            value = label;
        }

        const isActive = this.props.active.indexOf(value) >= 0;
        return (
            <ListGroupItem
                key={value}
                onClick={() => this.props.onChange(value, !isActive)}
                action
                className="filter-button"
                active={isActive}
                style={listStyle}
                tag="button">
                {label} ({formatNumber(item.count)})
            </ListGroupItem >
        );
    }
}

FacetFilter.propTypes = {
    "label": PropTypes.string.isRequired,
    "values": PropTypes.arrayOf(PropTypes.shape({
        "label": PropTypes.string,
        "iri": PropTypes.string,
        "count": PropTypes.number
    })).isRequired,
    "active": PropTypes.arrayOf(PropTypes.string).isRequired,
    "onChange": PropTypes.func.isRequired,
    "useIris": PropTypes.bool,
    "labels": PropTypes.object
};

export default FacetFilter;