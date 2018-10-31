import React from "react";
import {connect} from "react-redux";
import {isDataReady} from "@/app-services/http-request";
import {statusSelector, keywordsSelector} from "./keyword-tagloud-reducer";
import {HttpRequestStatus} from "@/app-ui/http-request-status";
import {onMount, onUnMount, fetchKeywords} from "./keyword-tagloud-action";
import {KeywordTagCloud} from "./keyword-tagloud";
import {
    KEYWORDS_LIST_URL,
} from "@/app/navigation";
import HeadLinks from "@/app-ui/head-links";
import {getString} from "@/app-services/strings";

class _KeywordsViewContainer extends React.Component {

    componentDidMount() {
        this.props.onMount();
        this.props.fetchData();
    }

    render() {
        if (isDataReady(this.props.status)) {
            return (
                <React.Fragment>
                    <HeadLinks title={getString("keywords")}
                               url={KEYWORDS_LIST_URL}/>
                    <KeywordTagCloud tags={this.props.data}/>
                </React.Fragment>
            )
        } else {
            return (
                <HttpRequestStatus status={this.props.status}/>
            )
        }
    }

    componentWillUnmount() {
        this.props.onUnMount();
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "data": keywordsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "fetchData": () => dispatch(fetchKeywords())
});

export const KeywordsViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_KeywordsViewContainer);
