import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_PUBLISHER_LIST} from "../../app/component-list";
import {
  selectPublishers,
  selectFailed,
  selectReady,
} from "./publisher-list-reducer";
import {
  publisherListMount,
  publisherListUnMount,
} from "./publisher-list-action";
import {fetchPublisherList} from "../../api/api-action";

class PublishersListContainer extends React.Component {

  componentDidMount() {
    this.props.onMount();
  }

  render() {
    const PublisherList = getRegisteredElement(ELEMENT_PUBLISHER_LIST);
    if (this.props.failed) {
      return (
        <div>
          publisher-list : loading ... failed
        </div>
      );
    } else if (this.props.ready) {
      return (
        <PublisherList publishers={this.props.publishers}/>
      )
    } else {
      return (
        <div>
          publisher-list : loading ...
        </div>
      );
    }
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

PublishersListContainer.propTypes = {
  "ready": PropTypes.bool.isRequired,
  "failed": PropTypes.bool.isRequired,
  "publishers": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "ready": selectReady(state),
  "failed": selectFailed(state),
  "publishers": selectPublishers(state),
});

const mapDispatchToProps = (dispatch) => ({
  "onMount": () => {
    dispatch(publisherListMount());
    dispatch(fetchPublisherList());
  },
  "onUnMount": () => {
    dispatch(publisherListUnMount());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublishersListContainer);
