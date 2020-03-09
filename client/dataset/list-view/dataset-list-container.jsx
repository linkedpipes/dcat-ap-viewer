import React from "react";
import {connect} from "react-redux";
import {
  datasetListMount,
  datasetListUnMount,
  search,
  fetchMore,
  updatePage,
  updatePageSize,
  sortSet,
  fetchDatasetForQuery,
} from "./dataset-list-actions";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_DATASET_LIST} from "../../app/component-list";
import {
  selectError,
  selectReady,
} from "./dataset-list-reducer";
import FacetContainer from "./facet-container";
import QueryInputContainer from "./query-input-container";
import ViewContainer from "./view-container";
import {selectQuery} from "../../app/navigation";

class DatasetListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
    this.props.onFetchDatasets(this.props.query);
  }

  componentDidUpdate(prevProps) {
    // TODO We need to detect change only in the visual part.
    if (this.props.query !== prevProps.query) {
      this.props.onFetchDatasets(this.props.query);
    }
  }

  render() {
    const DatasetList = getRegisteredElement(ELEMENT_DATASET_LIST);
    return (
      <DatasetList
        ready={this.props.ready}
        error={this.props.error}
        facetContainer={FacetContainer}
        queryInputContainer={QueryInputContainer}
        viewContainer={ViewContainer}
        search={this.props.onSearch}
        onFetchMore={this.props.onFetchMore}
        onUpdatePage={this.props.onUpdatePage}
        onUpdatePageSize={this.props.onUpdatePageSize}
        onSortSet={this.props.onSortSet}
      />
    )
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DatasetListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  "onFetchDatasets": PropTypes.func.isRequired,
  "error": PropTypes.number.isRequired,
  "ready": PropTypes.bool.isRequired,
  "query": PropTypes.object.isRequired,
  "onSearch": PropTypes.func.isRequired,
  "onFetchMore": PropTypes.func.isRequired,
  "onUpdatePage": PropTypes.func.isRequired,
  "onUpdatePageSize": PropTypes.func.isRequired,
  "onSortSet": PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    "error": selectError(state),
    "query": selectQuery(state),
    "ready": selectReady(state),
  }),
  (dispatch) => ({
    "onMount": () => dispatch(datasetListMount()),
    "onUnMount": () => dispatch(datasetListUnMount()),
    "onFetchDatasets": (query) => dispatch(fetchDatasetForQuery(query)),
    "onSearch": (query) => dispatch(search(query)),
    "onFetchMore": () => dispatch(fetchMore()),
    "onUpdatePage": (page) => dispatch(updatePage(page)),
    "onUpdatePageSize": (size) => dispatch(updatePageSize(size)),
    "onSortSet": (sortBy) => dispatch(sortSet(sortBy)),
  }),
)(DatasetListContainer);
