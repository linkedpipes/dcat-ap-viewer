import React, {useCallback} from "react";
import {PropTypes} from "prop-types";

import FacetView from "../facet-view";
import {register, useLabelApi} from "../../viewer-api";

function DatasetListThemeView(props) {
  const labelSelector = useLabelApi();

  const {onUpdateQuery, query, state} = props;

  const onClickFacet = useCallback((value) => {
    onUpdateQuery({
      "themes": toggleInArray(query.themes, value.queryCode),
    });
  }, [onUpdateQuery, query]);

  const onShowMore = useCallback((count) => {
    onUpdateQuery({
      "themesLimit": Math.min(
        query.themesLimit + count,
        state.themesCount,
      ),
    });
  }, [onUpdateQuery, query, state]);

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
