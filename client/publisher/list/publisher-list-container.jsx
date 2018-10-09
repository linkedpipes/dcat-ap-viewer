import React from "react";
import {connect} from "react-redux";
import {getString} from "@/app-services/strings";
import setPageTitle from "@/app-services/page-title";
import {isDataReady} from "@/app-services/http-request";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {fetchPublisherList} from "../publisher-action";
import {statusSelector, publishersSelector} from "../publisher-reducer"
import {PublisherList} from "./publisher-list";

class _PublishersListContainer extends React.Component {

    componentDidMount() {
        setPageTitle(getString("publishers"));
        this.props.fetchData();
    }

    render() {
        if (!isDataReady(this.props.status)) {
            return (
                <HttpRequestStatus status={this.props.status}/>
            )
        } else {
            return (
                <PublisherList publishers={this.props.publishers}/>
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
