import React from "react";
import {PropTypes} from "prop-types";
import {QUERY_DATASET_LIST_THEME, register} from "../../../client-api";
import FacetView from "../../user-iterface/facet-view";
import {DATASET_LIST_THEME_VIEW} from "../../nkod-component-names";

function ThemeContainer({themes, onToggleFacet, onFetchMoreFacets}) {
  //
  return (
    <FacetView
      items={themes}
      onToggle={(item) => onToggleFacet(QUERY_DATASET_LIST_THEME, item.iri)}
      fetchMore={(value) => onFetchMoreFacets(QUERY_DATASET_LIST_THEME, value)}
    />
  )
}

ThemeContainer.propTypes = {
  "themes": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onToggleFacet": PropTypes.func.isRequired,
  "onFetchMoreFacets": PropTypes.func.isRequired,
};
register({
  "name": DATASET_LIST_THEME_VIEW,
  "element": ThemeContainer,
});
