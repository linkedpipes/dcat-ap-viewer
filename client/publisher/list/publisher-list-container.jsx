import React from "react";
import {connect} from "react-redux";
import {getString} from "@/app-services/strings";
import setPageTitle from "@/app-services/page-title";
import {isDataReady} from "@/app-services/http-request";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {onMount, onUnMount, fetchPublisherList} from "./publisher-list-action";
import {statusSelector, publishersSelector} from "./publisher-list-reducer"
import {PublisherList} from "./publisher-list";


class _PublishersListContainer extends React.Component {

    componentDidMount() {
        setPageTitle(getString("publishers"));
        this.props.onMount();
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

    componentWillUnmount() {
        this.props.onUnMount();
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "publishers": publishersSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "fetchData": () => dispatch(fetchPublisherList())
});

export const PublisherListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PublishersListContainer);
