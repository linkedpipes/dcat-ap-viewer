import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../app/register";
import {DatasetDetailActions} from "./dataset-detail-actions";
import {selectIri} from "../app/navigation";

export const ELEMENT_DATASET_DETAIL = "element-dataset";

class DatasetDetailContainer extends React.Component {

  componentDidMount() {
    this.props.onMount(this.props.iri);
  }

  componentDidUpdate(prevProps) {
    if (this.props.iri !== prevProps.iri) {
      this.props.onDatasetChange(this.props.iri);
    }
  }

  render() {
    const DatasetDetail = getRegisteredElement(ELEMENT_DATASET_DETAIL);
    return (
      <DatasetDetail iri={this.props.iri}/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DatasetDetailContainer.propTypes = {
  "iri": PropTypes.string.isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  "onDatasetChange": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "iri": selectIri(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": (iri) => dispatch(DatasetDetailActions.mount({"dataset": iri})),
  "onUnMount": () => dispatch(DatasetDetailActions.unMount()),
  "onDatasetChange":
    (iri) => dispatch(DatasetDetailActions.set({"dataset": iri})),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDetailContainer);
