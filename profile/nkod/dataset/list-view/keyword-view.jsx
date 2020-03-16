import React from "react";
import {PropTypes} from "prop-types";
import {QUERY_DATASET_LIST_KEYWORD, register} from "../../../client-api";
import FacetView from "./facet-view";
import {DATASET_LIST_KEYWORD_VIEW} from "../../nkod-component-names";

function KeywordContainer(props) {
  const toggleFacet = (item) =>
    props.toggleFacet(QUERY_DATASET_LIST_KEYWORD, item.code);
  const fetchMore = (value) =>
    props.fetchMoreFacet(QUERY_DATASET_LIST_KEYWORD, value);
  return (
    <FacetView
      t={props.t}
      itemToLabel={(item) => item["code"]}
      items={props.keywords}
      count={props.keywordsCount}
      allFetched={props.keywordsAllFetched}
      toggleFacet={toggleFacet}
      fetchMore={fetchMore}/>
  )
}

KeywordContainer.propTypes = {
  "t": PropTypes.func.isRequired,
  "keywords": PropTypes.arrayOf(PropTypes.object).isRequired,
  "keywordsCount": PropTypes.number.isRequired,
  "keywordsAllFetched": PropTypes.bool.isRequired,
  "toggleFacet": PropTypes.func.isRequired,
  "fetchMoreFacet": PropTypes.func.isRequired,
};

register({
  "name": DATASET_LIST_KEYWORD_VIEW,
  "element": KeywordContainer,
});
