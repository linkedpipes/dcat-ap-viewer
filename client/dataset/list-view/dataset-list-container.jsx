import React from "react";
import {connect} from "react-redux";
import {
  datasetListMount,
  datasetListUnMount,
  fetchDatasets,
  replaceNavigation,
} from "./dataset-list-actions";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_DATASET_LIST} from "../../app/component-list";
import {selectError, selectReady} from "./dataset-list-reducer";
import withFacetProps from "./with-facet-props";
import withTypeaheadProps from "./with-typeahead-props";
import withViewProps from "./with-view-props";
import {selectQuery} from "../../app/navigation";
import {fetchLabels} from "../../labels";

class DatasetListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const DatasetList = getRegisteredElement(ELEMENT_DATASET_LIST);
    return (
      <DatasetList
        ready={this.props.ready}
        error={this.props.error}
        query={this.props.query}
        // Events
        onFetchDatasets={this.props.onFetchDatasets}
        onUpdateNavigation={this.props.onUpdateNavigation}
        // HOC to bind props.
        withFacetProps={withFacetProps}
        withTypeaheadProps={withTypeaheadProps}
        withViewProps={withViewProps}
        // Functions.
        fetchLabels={this.props.fetchLabels}
      />
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DatasetListContainer.propTypes = {
  "error": PropTypes.number.isRequired,
  "ready": PropTypes.bool.isRequired,
  "query": PropTypes.object.isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  //
  "onFetchDatasets": PropTypes.func.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

export default connect((state) => ({
  "error": selectError(state),
  "ready": selectReady(state),
  "query": selectQuery(state),
}), (dispatch) => ({
  "onMount": () => dispatch(datasetListMount()),
  "onUnMount": () => dispatch(datasetListUnMount()),
  "onFetchDatasets": (next, prev) => dispatch(fetchDatasets(next, prev)),
  "onUpdateNavigation": (replace) => dispatch(replaceNavigation(replace)),
  "fetchLabels": (values) => dispatch(fetchLabels(values)),
}))(DatasetListContainer);
