import React from "react";
import {PropTypes} from "prop-types";
import {QUERY_DATASET_LIST_THEME, register} from "../../../client-api";
import FacetView from "./facet-view";
import {DATASET_LIST_THEME_VIEW} from "../../nkod-component-names";

function ThemeContainer(props) {
  const toggleFacet = (item) =>
    props.toggleFacet(QUERY_DATASET_LIST_THEME, item.code);
  const fetchMore = (value) =>
    props.fetchMoreFacet(QUERY_DATASET_LIST_THEME, value);
  //
  props.fetchLabels(props.themes.map(item => item.iri));
  //
  return (
    <FacetView
      t={props.t}
      itemToLabel={(item) => props.tLabel(item.iri)}
      items={props.themes}
      count={props.themesCount}
      allFetched={props.themesAllFetched}
      toggleFacet={toggleFacet}
      fetchMore={fetchMore}
    />
  )
}

ThemeContainer.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "themes": PropTypes.arrayOf(PropTypes.object).isRequired,
  "themesCount": PropTypes.number.isRequired,
  "themesAllFetched": PropTypes.bool.isRequired,
  "toggleFacet": PropTypes.func.isRequired,
  "fetchMoreFacet": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

register({
  "name": DATASET_LIST_THEME_VIEW,
  "element": ThemeContainer,
});
