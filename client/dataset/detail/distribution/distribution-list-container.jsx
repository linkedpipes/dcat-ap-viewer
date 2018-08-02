import React from "react";
import {connect} from "react-redux";
import {
    onMount,
    onUnMount,
    setPage,
    setPageSize
} from "./distribution-action";
import {
    pageSelector,
    pageSizeSelector,
} from "./distribution-reducer";
import DistributionList from "./distribution-list";
import {hot} from "react-hot-loader";

class _DistributionListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.updateVisibleList = this.updateVisibleList.bind(this);
    }

    componentWillMount() {
        this.props.onMount();
        this.updateVisibleList(this.props);
    }

    updateVisibleList({page, pageSize, dataset}) {
        const distributions = dataset["distributions"];
        const visibleDistributions = [];
        const start = page * pageSize;
        const end = Math.min((page  + 1) * pageSize, distributions.length);
        for (let index = start; index < end; ++index) {
            visibleDistributions.push(distributions[index]);
        }
        this.setState({
            "distributions": visibleDistributions
        });
    }

    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) {
            return;
        }
        this.updateVisibleList(nextProps);
    }

    render() {
        return (
            <DistributionList
                distributions={this.state.distributions}
                recordsCount={this.props.dataset.distributions.length}
                page={this.props.page}
                pageSize={this.props.pageSize}
                setPage={this.props.setPage}
                setPageSize={this.props.setPageSize}
            />
        )
    }

    componentWillUnmount() {
        this.props.onUnMount();
    }

}

const mapStateToProps = (state, ownProps) => ({
    "page": pageSelector(state),
    "pageSize": pageSizeSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "onMount": () => dispatch(onMount()),
    "onUnMount": () => dispatch(onUnMount()),
    "setPage": (value) => dispatch(setPage(value)),
    "setPageSize": (value) => dispatch(setPageSize(value))
});

export const DistributionListContainer = hot(module)(connect(
    mapStateToProps,
    mapDispatchToProps
)(_DistributionListContainer));
