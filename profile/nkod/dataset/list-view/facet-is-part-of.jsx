import React from "react";
import {useDispatch} from "react-redux";
import {PropTypes} from "prop-types";
import {ListGroup, ListGroupItem} from "reactstrap";
import {fetchDatasetLabel} from "../../../../client/labels/labels-action";

export default function FacetIsPartOf(props) {
  const dispatch = useDispatch();
  if (props.values.length === 0) {
    return null;
  }
  // There should be only one parent dataset.
  const value = props.values[0];
  dispatch(fetchDatasetLabel(value));
  const label = props.tLabel(value);
  return (
    <div className="mt-2">
      <h3 className="p-lg-2">
        {props.t("isPartOfFacet")}
      </h3>
      <ListGroup>
        <ListGroupItem
          onClick={() => props.deselect(value)}
          action
          className="filter-button"
          style={{"wordWrap": "break-word"}}
        >
          {label}
          <i
            className="material-icons center pl-2"
            style={{"float": "right"}}
          >
            close
          </i>
        </ListGroupItem>
      </ListGroup>
    </div>
  );

}

FacetIsPartOf.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "values": PropTypes.array.isRequired,
  "deselect": PropTypes.func.isRequired,
};
