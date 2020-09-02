import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";

import {getRegisteredElement} from "../app/register";
import {PublisherListActions} from "./publisher-list-action";

export const ELEMENT_PUBLISHER_LIST = "app.publisher-list";

class PublisherListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const PublisherList = getRegisteredElement(ELEMENT_PUBLISHER_LIST);
    return (
      <PublisherList/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

PublisherListContainer.propTypes = {
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => dispatch(PublisherListActions.mountPublisherList()),
  "onUnMount": () => dispatch(PublisherListActions.unMountPublisherList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherListContainer);
