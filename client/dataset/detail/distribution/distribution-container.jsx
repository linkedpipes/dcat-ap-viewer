import React from "react";
import {connect} from "react-redux";
import {
    fetchDistribution
} from "./distribution-action";
import {
    distributionDataSelector,
    distributionStatusSelector
} from "./distribution-reducer";
import {isDataReady} from "@/app-services/http-request";
import {labelsSelector} from "@/app-services/labels/index";
import Distribution from "./distribution";
import {showModal} from "@/app-services/modal";

class _DistributionContainer extends React.Component {

    componentWillMount() {
        // TODO Add check for loading already loaded (loading) data.
        if (this.props.distribution === undefined) {
            this.props.fetchData();
        }
    }

    render() {
        // TODO Add support for loading error.
        if (!isDataReady(this.props.status)) {
            return (
                <Distribution
                    isLoading={true}
                    labels={this.props.labels}
                    openModal={this.props.openModal}/>
            )
        }
        return (
            <Distribution
                isLoading={false}
                labels={this.props.labels}
                distribution={this.props.distribution}
                openModal={this.props.openModal}/>
        )
    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": distributionStatusSelector(state, ownProps.iri),
    "distribution": distributionDataSelector(state, ownProps.iri),
    "labels": labelsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": () => dispatch(fetchDistribution(ownProps.iri)),
    "openModal": (body) => dispatch(showModal(undefined, body))
});

export const DistributionContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DistributionContainer);
