import React from "react";
import {connect} from "react-redux";
import {fetchInitialData} from "./initial-data-actions"
import {isReady} from "./initial-data-reducer";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {STATUS_FETCHING} from "@/app-services/http-request";

class _InitialDataFetch extends React.Component {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (this.props.isReady) {
            return this.props.children;
        } else {
            return (
                <HttpRequestStatus status={STATUS_FETCHING}/>
            )
        }
    }

}

const mapStateToProps = (state, ownProps) => ({
    "isReady": isReady(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": () => dispatch(fetchInitialData())
});

export const InitialDataFetch = connect(
    mapStateToProps,
    mapDispatchToProps
)(_InitialDataFetch);