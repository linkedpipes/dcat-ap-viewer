import React from "react";
import {connect} from "react-redux";
import {Row, Col} from "reactstrap";
import FacetFilter from "../../components/facet-filter";
import SearchBox from "../../components/search-box";
import DatasetList from "./dataset-list";
import Paginator from "../../components/paginator";
import {
    fetchDataRequest,
    setListPage,
    setListFacetFilter,
    setListQueryString,
    setListQueryFilter
} from "../actions";

class DatasetListViewComponent extends React.Component {

    componentDidMount() {
        console.log("componentDidMount");
        this.props.fetchData(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps");
        // Check whether we need to update data.
        if (nextProps.query !== this.props.query) {
            this.props.fetchData(nextProps.query);
        }
    }

    // componentDidUpdate() {
    //     console.log("componentWillUpdate");
    //     this.props.fetchData(this.props.query);
    // }

    render() {
        const props = this.props;
        return (
            <Row>
                <Col md={3} style={{backgroundColor: "yellow"}}>
                    <FacetFilter
                        label="Tagy"
                        values={props.keyword}
                        active={props.query.keyword}
                        onChange={props.setKeywordsFacet}
                    />
                    <FacetFilter
                        label="Organizace"
                        values={props.publisher}
                        active={props.query.publisher}
                        onChange={props.setPublisherFacet}
                    />
                </Col>
                <Col md={9} style={{backgroundColor: "beige"}}>
                    <SearchBox
                        value={props.searchString}
                        onChange={this.props.setQueryString}
                        onSearch={this.props.setQueryFilter}
                    />
                    <DatasetList values={props.data}/>
                    <Paginator
                        start={0}
                        end={props.pageCount}
                        value={props.query.page}
                        onChange={this.props.setPage}/>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // "fetching": state.dataset.list.fetching,
    "searchString": state.dataset.list.searchString,
    "keyword": state.dataset.list.keyword,
    "publisher": state.dataset.list.publisher,
    "data": state.dataset.list.data,
    "pageCount": state.dataset.list.pageCount,
    "query": state.dataset.list.query,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => {
        dispatch(fetchDataRequest(query));
    },
    "setQueryString": (value) => {
        dispatch(setListQueryString(value));
    },
    "setQueryFilter": (value) => {
        dispatch(setListQueryFilter(value));
    },
    "setKeywordsFacet": (facet) => {
        dispatch(setListFacetFilter("keyword", facet));
    },
    "setPublisherFacet": (facet) => {
        dispatch(setListFacetFilter("publisher", facet));
    },
    "setPage": (page) => {
        dispatch(setListPage(page));
    }
});

export const DatasetListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetListViewComponent);
