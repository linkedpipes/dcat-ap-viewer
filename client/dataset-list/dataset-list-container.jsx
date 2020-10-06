import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../app/register";
import {DatasetListActions} from "./dataset-list-actions";
import {selectQuery} from "../app/navigation/navigation-reducer";
import {selectViewState} from "./dataset-list-reducer";
import {
  updateDatasetsData,
  replaceNavigation,
} from "./dataset-list-service";
import {
  parsedQueryToViewQuery,
  createDefaultQuery,
  toParsedQuery,
} from "./dataset-list-query-service";

export const ELEMENT_DATASET_LIST = "app.dataset-list";

class DatasetListContainer extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      "query": createDefaultQuery(),
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      "query": parsedQueryToViewQuery(props.parsedQuery),
    };
  }

  componentDidMount() {
    this.props.onMount();
    // Initial data fetch.
    this.props.onUpdateData(
      undefined, undefined,
      this.state.query, this.props.viewState
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.props.onUpdateData(
      prevState.query, prevProps.viewState,
      this.state.query, this.props.viewState
    );
  }

  render() {
    console.log("render\n", this.state.query, "\n", this.props.viewState);
    const DatasetList = getRegisteredElement(ELEMENT_DATASET_LIST);
    return (
      <DatasetList
        query={this.state.query}
        state={this.props.viewState}
        onUpdateViewState={this.props.onUpdateViewState}
        onUpdateViewQuery={this.props.onUpdateViewQuery}
      />
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DatasetListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  "onUpdateData": PropTypes.func.isRequired,
  "onUpdateViewState": PropTypes.func.isRequired,
  "onUpdateViewQuery": PropTypes.func.isRequired,
  "parsedQuery": PropTypes.object.isRequired,
  "viewState": PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  "parsedQuery": selectQuery(state),
  "viewState": selectViewState(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(DatasetListActions.mountDatasetList()),
  "onUnMount": () => dispatch(DatasetListActions.unMountDatasetList()),
  "onUpdateViewState":
    (state) => dispatch(DatasetListActions.updateViewState(state)),
  "onUpdateData": (prevQuery, prevState, nextQuery, nextState) =>
    dispatch(updateDatasetsData(prevQuery, prevState, nextQuery, nextState)),
  "onUpdateViewQuery": (query) =>
    dispatch(replaceNavigation(toParsedQuery(query))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetListContainer);
