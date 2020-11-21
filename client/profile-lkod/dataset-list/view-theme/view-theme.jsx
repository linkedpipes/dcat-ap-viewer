import React, {useCallback} from "react";
import {PropTypes} from "prop-types";

import FacetView from "../facet-view";
import {register, useLabelApi} from "../../viewer-api";

function DatasetListThemeView(props) {
  const labelSelector = useLabelApi();

  const onClickFacet = useCallback((value) => {
    props.onUpdateQuery({
      "themes": toggleInArray(props.query.themes, value.queryCode),
    });
  }, [props.onUpdateQuery, props.query]);

  const onShowMore = useCallback((count) => {
    props.onUpdateQuery({
      "themesLimit": Math.min(
        props.query.themesLimit + count,
        props.state.themesCount
      ),
    });
  }, [props.onUpdateQuery, props.query]);

  return (
    <FacetView
      title={"themesFound"}
      facets={props.state.themes}
      facetCount={props.state.themesCount}
      selectFacetLabel={(item) => labelSelector(item.queryCode)}
      onClickFacet={onClickFacet}
      onShowMore={onShowMore}
    />
  );
}

function toggleInArray(array, value) {
  const index = array.indexOf(value);
  if (index === -1) {
    return [...array, value];
  } else {
    return [
      ...array.slice(0, index),
      ...array.slice(index + 1),
    ];
  }
}

register({
  "name": "app.dataset-list.view-theme",
  "element": DatasetListThemeView,
});

DatasetListThemeView.propTypes = {
  "state": PropTypes.shape({
    "themes": PropTypes.array.isRequired,
    "themesCount": PropTypes.number.isRequired,
  }).isRequired,
  "query": PropTypes.shape({
    "themes": PropTypes.array.isRequired,
    "themesLimit": PropTypes.number.isRequired,
  }).isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
};
