import React from "react";
import {useSelector} from "react-redux";
import {PropTypes} from "prop-types";
import {register, selectTLabel} from "../../../client-api";
import {
  selectKeywordsFacet,
} from "../../../../client/dataset-list/dataset-list-reducer";
import FacetView from "../ui/facet-view";

function datasetListKeywordView(props) {
  const tLabel = useSelector(selectTLabel);
  const themes = useSelector(selectKeywordsFacet);
  return (
    <FacetView
      facetName={"keyword"}
      query={props.query}
      facetData={themes.facets}
      facetCount={themes.count}
      selectFacetLabel={(facet) => tLabel(facet.code)}
      onUpdateNavigation={props.onUpdateNavigation}
    />
  );
}

register({
  "name": "app.dataset-list.keyword-view",
  "element": datasetListKeywordView,
});

datasetListKeywordView.propTypes = {
  "query": PropTypes.object.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
};
