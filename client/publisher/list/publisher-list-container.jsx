import React from "react";
import {connect} from "react-redux";
import {isDataReady} from "@/app-services/http-request";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {fetchPublisherList} from "../publisher-action";
import {statusSelector, publishersSelector} from "../publisher-reducer"
import {PublisherList} from "./publisher-list";
import {ORGANISATION_LIST_URL} from "@/app/navigation";
import HeadLinks from "@/app-ui/head-links";
import {getString} from "@/app-services/strings";
import {PropTypes} from "prop-types";
import {labelsSelector, fetchLabel} from "../../app-services/labels";

class _PublishersListContainer extends React.Component {

  componentDidMount() {
    this.props.fetchData();
    if (this.props.publishers) {
      this.props.publishers.forEach(
        (publisher) => this.props.fetchLabel(publisher["@id"]));
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.publishers && prevProps.publishers !== this.props.publishers) {
      this.props.publishers.forEach(
        (publisher) => this.props.fetchLabel(publisher["@id"]));
    }
  }

  render() {
    if (!isDataReady(this.props.status)) {
      return (
        <HttpRequestStatus status={this.props.status}/>
      )
    } else {
      return (
        <React.Fragment>
          <HeadLinks title={getString("publishers")}
                     url={ORGANISATION_LIST_URL}/>
          <PublisherList
            publishers={this.props.publishers}
            labels={this.props.labels}
          />
        </React.Fragment>
      );
    }
  }

}

_PublishersListContainer.propTypes = {
  "fetchData": PropTypes.func.isRequired,
  "status": PropTypes.string.isRequired,
  "publishers": PropTypes.arrayOf(PropTypes.object).isRequired,
  "labels": PropTypes.object.isRequired,
  "fetchLabel": PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  "status": statusSelector(state),
  "publishers": publishersSelector(state),
  "labels": labelsSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  "fetchData": () => dispatch(fetchPublisherList()),
  "fetchLabel": (iri) => dispatch(fetchLabel(iri)),
});

export const PublisherListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PublishersListContainer);
