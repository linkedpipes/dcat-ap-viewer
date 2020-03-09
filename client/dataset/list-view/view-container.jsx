import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {
  selectFacet,
  selectDatasets,
  selectDatasetsCount,
} from "./dataset-list-reducer";
import {toggleFacet, fetchMoreFacets} from "./dataset-list-actions";

function ViewContainer(props) {
  return React.cloneElement(props.children, {
    ...props,
    "children": undefined,
  });
}

ViewContainer.propTypes = {
  "datasetsCount": PropTypes.number.isRequired,
  "datasets": PropTypes.array.isRequired,
  "publishers": PropTypes.array.isRequired,
  "themes": PropTypes.array.isRequired,
  "keywords": PropTypes.array.isRequired,
  "formats": PropTypes.array.isRequired,
  "children": PropTypes.element.isRequired,
  "onToggleFacet": PropTypes.func.isRequired,
  "onFetchMoreFacets": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "datasetsCount": selectDatasetsCount(state),
  "datasets": selectDatasets(state),
  "publishers": selectFacet(state, "publisher"),
  "themes": selectFacet(state, "theme"),
  "keywords": selectFacet(state, "keyword"),
  "formats": selectFacet(state, "format"),
}), (dispatch) => ({
  "onToggleFacet": (group, value) => dispatch(toggleFacet(group,value)),
  "onFetchMoreFacets": (group, amount) =>
    dispatch(fetchMoreFacets(group, amount)),
}))(ViewContainer);
