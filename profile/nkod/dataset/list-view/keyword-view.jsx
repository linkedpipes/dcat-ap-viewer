import React from "react";
import {PropTypes} from "prop-types";
import {QUERY_DATASET_LIST_KEYWORD} from "../../../client-api";
import FacetView from "../../user-iterface/facet-view";

export default function KeywordContainer(
  {keywords, onToggleFacet, onFetchMoreFacets}) {
  //
  return (
    <FacetView
      items={keywords}
      onToggle={(item) => onToggleFacet(QUERY_DATASET_LIST_KEYWORD, item.iri)}
      fetchMore={(value) => onFetchMoreFacets(QUERY_DATASET_LIST_KEYWORD, value)}
    />
  )
}

KeywordContainer.propTypes = {
  "keywords": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onToggleFacet": PropTypes.func.isRequired,
  "onFetchMoreFacets": PropTypes.func.isRequired,
};
