import React, {useCallback} from "react";
import {PropTypes} from "prop-types";

import FacetView from "../facet-view";
import {register} from "../../viewer-api";

function DatasetListKeywordView(props) {

  const {onUpdateQuery, query, state} = props;

  const onClickFacet = useCallback((value) => {
    onUpdateQuery({
      "keywords": toggleInArray(query.keywords, value.queryCode),
    });
  }, [onUpdateQuery, query]);

  const onShowMore = useCallback((count) => {
    onUpdateQuery({
      "keywordsLimit": Math.min(
        query.keywordsLimit + count,
        state.keywordsCount,
      ),
    });
  }, [onUpdateQuery, query, state]);

  return (
    <FacetView
      title={"keywordsFound"}
      facets={props.state.keywords}
      facetCount={props.state.keywordsCount}
      selectFacetLabel={(item) => item.queryCode}
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
  "name": "app.dataset-list.view-keyword",
  "element": DatasetListKeywordView,
});

DatasetListKeywordView.propTypes = {
  "state": PropTypes.shape({
    "keywords": PropTypes.array.isRequired,
    "keywordsCount": PropTypes.number.isRequired,
  }).isRequired,
  "query": PropTypes.shape({
    "keywords": PropTypes.array.isRequired,
    "keywordsLimit": PropTypes.number.isRequired,
  }).isRequired,
  "onUpdateQuery": PropTypes.func.isRequired,
};
