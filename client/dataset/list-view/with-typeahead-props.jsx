import React from "react";
import {connect} from "react-redux";
import {selectLanguage} from "./../../app/navigation";
import {fetchDatasetTypeahead} from "./../../api/api-action";
import jsonLdToDatasetTypeahead from "./jsonld-to-dataset-typeahead.ts";
import {PropTypes} from "prop-types";

export default function withTypeaheadProps(WrappedComponent) {
  class TypeaheadProps extends React.Component {
    render() {

      const fetchTypeahead = (text) =>
        fetchDatasetTypeahead(this.props.query, this.props.language, text)
          .then(jsonLdToDatasetTypeahead);

      return (
        <WrappedComponent
          {...this.props}
          fetchTypeahead={fetchTypeahead}
        />
      );
    }
  }

  TypeaheadProps.propTypes = {
    "query": PropTypes.object.isRequired,
    "language": PropTypes.string.isRequired,
  };

  return connect((state) => ({
    "language": selectLanguage(state),
  }))(TypeaheadProps);
}

