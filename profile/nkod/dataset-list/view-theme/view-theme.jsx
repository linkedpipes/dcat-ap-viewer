import React from "react";
import {PropTypes} from "prop-types";
import {useSelector} from "react-redux";
import {register, selectTLabel} from "../../../client-api";
import {
  selectThemesFacet,
} from "../../../../client/dataset-list/dataset-list-reducer";
import FacetView from "../ui/facet-view";

function datasetListThemeView(props) {
  const tLabel = useSelector(selectTLabel);
  const themes = useSelector(selectThemesFacet);
  return (
    <FacetView
      facetName={"theme"}
      query={props.query}
      facetData={themes.facets}
      facetCount={themes.count}
      selectFacetLabel={(facet) => tLabel(facet.iri)}
      onUpdateNavigation={props.onUpdateNavigation}
    />
  );
}

register({
  "name": "app.dataset-list.theme-view",
  "element": datasetListThemeView,
});

datasetListThemeView.propTypes = {
  "query": PropTypes.object.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
};
