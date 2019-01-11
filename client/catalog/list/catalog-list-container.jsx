import React from "react";
import {connect} from "react-redux";
import {statusSelector, catalogsSelector} from "./catalog-list-reducer";
import {fetchCatalogList} from "./catalog-list-actions";
import {CatalogList} from "./catalog-list";

import {isDataReady} from "@/app-services/http-request";
import {HttpRequestStatus} from "@/app-ui/http-request-status";


class _CatalogsViewContainer extends React.Component {

    componentDidMount() {
        this.props.fetchData();
    }

    render() {
        if (isDataReady(this.props.status)) {
            return (
                <CatalogList catalogs={this.props.catalogs}/>
            )
        } else {
            return (
                <HttpRequestStatus status={this.props.status}/>
            )
        }
    }

    componentWillUnmount() {

    }

}

const mapStateToProps = (state, ownProps) => ({
    "status": statusSelector(state),
    "catalogs": catalogsSelector(state)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": () => dispatch(fetchCatalogList())
});

export const CatalogsViewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(_CatalogsViewContainer);
