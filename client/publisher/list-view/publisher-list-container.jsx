import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {getRegisteredElement} from "../../app/register";
import {ELEMENT_PUBLISHER_LIST} from "../../app/component-list";
import {
  selectPublishers,
  selectError,
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
    const {ready, error, publishers} = this.props;
    return (
      <PublisherList ready={ready} error={error} publishers={publishers}/>
    );
  }

  componentWillUnmount() {
    this.props.onUnMount();
  }

}

PublishersListContainer.propTypes = {
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "publishers": PropTypes.arrayOf(PropTypes.object).isRequired,
  "onMount": PropTypes.func.isRequired,
  "onUnMount": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "ready": selectReady(state),
  "error": selectError(state),
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
  mapDispatchToProps
)(PublishersListContainer);
