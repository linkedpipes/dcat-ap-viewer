import React from "react";
import {connect} from "react-redux";
import {
  fetchDistribution,
} from "./distribution-action";
import {
  distributionDataSelector,
  distributionStatusSelector,
} from "./distribution-reducer";
import {isDataReady} from "../../../app-services/http-request";
import {labelsSelector} from "../../../app-services/labels/index";
import Distribution from "./distribution";
import {PropTypes} from "prop-types";
import DataService from "./data-service";
import {showModal} from "../../../app-services/modal";

class _DistributionContainer extends React.Component {

  UNSAFE_componentWillMount() {
    // TODO Add check for loading already loaded (loading) data.
    if (this.props.data === undefined) {
      this.props.fetchDistribution();
    }
  }

  render() {
    // TODO Add support for loading error.
    if (!isDataReady(this.props.status)) {
      return (
        <Distribution
          isLoading={true}
          labels={this.props.labels}/>
      )
    }
    if (this.props.data.resourceType === "distribution") {
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
  "iri": PropTypes.string.isRequired,
  "status": PropTypes.string.isRequired,
  "labels": PropTypes.object.isRequired,
  "fetchDistribution": PropTypes.func.isRequired,
  "openModal": PropTypes.func.isRequired,
  "data": PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  "status": distributionStatusSelector(state, ownProps.iri),
  "data": distributionDataSelector(state, ownProps.iri),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "fetchDistribution": () => dispatch(fetchDistribution(ownProps.iri)),
  "openModal": (body) => dispatch(showModal(undefined, body)),
});

export const DistributionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_DistributionContainer);
