import React from "react";
import {connect} from "react-redux";
import {
  fetchDistribution,
  fetchDataSource,
} from "./distribution-action";
import {
  distributionDataSelector,
  distributionStatusSelector,
} from "./distribution-reducer";
import {isDataReady} from "@/app-services/http-request";
import {labelsSelector} from "@/app-services/labels/index";
import Distribution from "./distribution";
import DataService from "./data-service"
import {showModal} from "@/app-services/modal";
import {PropTypes} from "prop-types";


class _DistributionContainer extends React.Component {

  componentWillMount() {
    // TODO Add check for loading already loaded (loading) data.
    if (this.props.data !== undefined) {
      return;
    }
    if (this.props.record.type === "distribution") {
      this.props.fetchDistribution();
    } else {
      this.props.fetchDataSource();
    }
  }

  render() {
    // TODO Add support for loading error.
    if (!isDataReady(this.props.status)) {
      return null;
    }
    if (this.props.record.type === "distribution") {
      return (
        <Distribution
          isLoading={false}
          labels={this.props.labels}
          distribution={this.props.data}
          openModal={this.props.openModal}/>
      )
    } else {
      return (
        <DataService
          isLoading={false}
          labels={this.props.labels}
          distribution={this.props.data}
          openModal={this.props.openModal}/>
      )
    }

  }

}

_DistributionContainer.propTypes = {
  "fetchDistribution": PropTypes.func.isRequired,
  "fetchDataSource": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "status": PropTypes.string.isRequired,
  "data": PropTypes.object,
  "labels": PropTypes.object.isRequired,
  "record": PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  "status": distributionStatusSelector(state, ownProps.record.iri),
  "data": distributionDataSelector(state, ownProps.record.iri),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "fetchDistribution": () => dispatch(fetchDistribution(ownProps.record.iri)),
  "fetchDataSource": () => dispatch(fetchDataSource(ownProps.record.iri)),
  "openModal": (body) => dispatch(showModal(undefined, body)),
});

export const DistributionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_DistributionContainer);
