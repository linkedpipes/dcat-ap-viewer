import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {fetchDistribution} from "../../api/api-action";
import {selectDistribution} from "../list/distribution-reducer";
import {getRegisteredElement} from "../../app/register";
import {
  ELEMENT_DATA_SERVICE_DETAIL,
  ELEMENT_DISTRIBUTION_DETAIL,
} from "../../app/component-list";

class DistributionContainer extends React.Component {

  componentDidMount() {
    this.props.fetchDistribution();
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    if (this.props.data.resourceType === "data-service") {
      const DataService = getRegisteredElement(ELEMENT_DATA_SERVICE_DETAIL);
      return (
        <DataService dataService={this.props.data}/>
      );
    } else {
      const Distribution = getRegisteredElement(ELEMENT_DISTRIBUTION_DETAIL);
      return (
        <Distribution distribution={this.props.data}/>
      );
    }
  }

}

DistributionContainer.propTypes = {
  "fetchDistribution": PropTypes.func.isRequired,
  "iri": PropTypes.string.isRequired,
  "data": PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  "data": selectDistribution(state, ownProps.iri),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "fetchDistribution": () => dispatch(fetchDistribution(ownProps.iri)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributionContainer);
