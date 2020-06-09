import React from "react";
import {connect} from "react-redux";
import {
  datasetDetailMount,
  datasetDetailUnMount,
  datasetDetailSet,
} from "./dataset-detail-actions";
import DatasetWebPageMetadata from "./dataset-detail-metadata";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../app/register";
import {ELEMENT_DATASET_DETAIL} from "../app/component-list";
import {selectTLabel, selectTLiteral} from "../app/component-api";
import {
  selectReady,
  selectError,
  selectDatasetDetail,
} from "./dataset-detail-reducer";
import {fetchDataset} from "../api/api-action";
import {selectIri} from "../app/navigation";
import {selectDistribution} from "./distribution/distribution-reducer";

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
      <React.Fragment>
        {this.props.ready && this.props.error === 0 &&
        <DatasetWebPageMetadata
          tLabel={this.props.tLabel}
          tLiteral={this.props.tLiteral}
          dataset={this.props.dataset}
          distributions={this.props.distributions}
        />
        }
        <DatasetDetail
          ready={this.props.ready}
          error={this.props.error}
          dataset={this.props.dataset}
        />
      </React.Fragment>
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
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "dataset": PropTypes.object,
  "distributions": PropTypes.array,
  "location": PropTypes.object.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "iri": selectIri(state),
  "ready": selectReady(state),
  "error": selectError(state),
  "dataset": selectDatasetDetail(state),
  "distributions": selectDistributions(state),
  "tLabel": selectTLabel(state),
  "tLiteral": selectTLiteral(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": (iri) => {
    dispatch(datasetDetailMount(iri));
    dispatch(fetchDataset(iri));
  },
  "onUnMount": () => dispatch(datasetDetailUnMount()),
  "onDatasetChange": (iri) => {
    dispatch(datasetDetailSet(iri));
    dispatch(fetchDataset(iri));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatasetDetailContainer);

function selectDistributions(state) {
  const dataset = selectDatasetDetail(state);
  if (dataset === undefined || dataset.distributions === undefined) {
    return [];
  }
  return dataset.distributions.map(iri => selectDistribution(state, iri));
}