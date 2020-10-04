import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {getRegisteredElement} from "../app/register";
import {DatasetListActions} from "./dataset-list-actions";
import {selectQuery} from "../app/navigation/navigation-reducer";

export const ELEMENT_DATASET_LIST = "app.dataset-list";

class DatasetListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const DatasetList = getRegisteredElement(ELEMENT_DATASET_LIST);
    return (
      <DatasetList query={this.props.query}/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DatasetListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  "query": selectQuery(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(DatasetListActions.mountDatasetList()),
  "onUnMount": () => dispatch(DatasetListActions.unMountDatasetList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetListContainer);
