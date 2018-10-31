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

class _PublishersListContainer extends React.Component {

    componentDidMount() {
        this.props.fetchData();
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
                    <PublisherList publishers={this.props.publishers}/>
                </React.Fragment>
            );
        }
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "publishers": publishersSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": () => dispatch(fetchPublisherList())
});

export const PublisherListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PublishersListContainer);
