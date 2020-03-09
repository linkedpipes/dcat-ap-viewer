import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {selectLanguage, selectQuery} from "./../../app/navigation";
import {search, fetchTypeahead} from "./dataset-list-actions";


function QueryInputContainer({children, language, query, search}) {
  const onFetchTypeahead = (text) => fetchTypeahead(language, text, query);
  return React.cloneElement(
    children,
    {
      "query": query,
      "onSearch": search,
      "onFetchTypeahead": onFetchTypeahead,
    });
}

QueryInputContainer.propTypes = {
  "language": PropTypes.string.isRequired,
  "query": PropTypes.object.isRequired,
  "search": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "language": selectLanguage(state),
  "query": selectQuery(state),
}), (dispatch) => ({
  "search": (query) => dispatch(search(query)),
}))(QueryInputContainer);
