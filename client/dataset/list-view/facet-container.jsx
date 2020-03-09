import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {selectFacet, selectFacetAllFetched} from "./dataset-list-reducer";
import {selectQuery} from "../../app/navigation";
import {toggleFacet, fetchMoreFacets} from "./dataset-list-actions";
import {fetchLabels} from "../../labels";

function FacetContainer(props) {
  const query = props.query[props.group] || [];
  const getFacetId = props.getFacetId || ((item) => item.iri);
  const actives = props.facetData
    .filter(item => query.includes(getFacetId(item)));
  return React.cloneElement(
    props.children, {
      "facets": props.facetData,
      "fetchMore": props.fetchMore,
      "isAllFetched": props.isAllFetched,
      "activeFacets": actives,
      "onToggleFacet": props.toggle,
      "fetchLabels": props.fetchLabels,
    });
}

FacetContainer.propTypes = {
  "group": PropTypes.string.isRequired,
  "facetData": PropTypes.array.isRequired,
  "children": PropTypes.element.isRequired,
  "fetchMore": PropTypes.func.isRequired,
  "isAllFetched": PropTypes.bool.isRequired,
  "toggle": PropTypes.func.isRequired,
  "getFacetId": PropTypes.func,
  "fetchLabels": PropTypes.func.isRequired,
};

export default connect((state, ownProps) => ({
  "facetData": selectFacet(state, ownProps.group),
  "isAllFetched": selectFacetAllFetched(state, ownProps.group),
  "query": selectQuery(state),
}), (dispatch, ownProps) => ({
  "fetchMore": (amount) => dispatch(fetchMoreFacets(ownProps.group, amount)),
  "toggle": (value) => dispatch(toggleFacet(ownProps.group,value)),
  "fetchLabels": (values) => dispatch(fetchLabels(values)),
}))(FacetContainer);
