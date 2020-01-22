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

class _DistributionContainer extends React.Component {

  UNSAFE_componentWillMount() {
    // TODO Add check for loading already loaded (loading) data.
    if (this.props.distribution === undefined) {
      this.props.fetchData();
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
    return (
      <Distribution
        isLoading={false}
        labels={this.props.labels}
        distribution={this.props.distribution}/>
    )
  }

}

_DistributionContainer.propTypes = {
  "status": PropTypes.string.isRequired,
  "distribution": PropTypes.object.isRequired,
  "labels": PropTypes.object.isRequired,
  "fetchData": PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  "status": distributionStatusSelector(state, ownProps.iri),
  "distribution": distributionDataSelector(state, ownProps.iri),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "fetchData": () => dispatch(fetchDistribution(ownProps.iri)),
});

export const DistributionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_DistributionContainer);
