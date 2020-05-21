import React from "react";
import {connect} from "react-redux";
import {onMount, onUnMount} from "./distribution-action";
import {hot} from "react-hot-loader";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_DISTRIBUTION_LIST} from "../../app/component-list";
import {
  selectDatasetDetail,
} from "../../dataset/detail-view/dataset-detail-reducer";
import {DistributionContainer} from "../detail";

class DistributionListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const DistributionList = getRegisteredElement(ELEMENT_DISTRIBUTION_LIST);
    return (
      <DistributionList
        iris={this.props.dataset.distributions}
        DistributionContainer={DistributionContainer}
      />
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

DistributionListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
  "dataset": PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  "dataset": selectDatasetDetail(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(onMount()),
  "onUnMount": () => dispatch(onUnMount()),
});

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(DistributionListContainer));
