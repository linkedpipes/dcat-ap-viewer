import React from "react";
import {connect} from "react-redux";
import {Row, Col, Container} from "reactstrap";
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
} from "./dataset-list-actions";
import TagLine from "../../components/tag-line";

const QueryStatusLine = ({resultSize, query}) => (
    <div>
        <h4>
            {resultSize} datových sad nalezeno
            {query.search &&
            " na dotaz: \"" + query.search + "\""
            }
        </h4>
        <TagLine values={query.publisher}/>
        <TagLine values={query.keyword}/>
    </div>
);

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

    render() {
        const props = this.props;
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <FacetFilter
                            label="Organizace"
                            values={props.publisher}
                            active={props.query.publisher}
                            onChange={props.setPublisherFacet}
                        />
                        <FacetFilter
                            label="Tagy"
                            values={props.keyword}
                            active={props.query.keyword}
                            onChange={props.setKeywordsFacet}
                        />
                    </Col>
                    <Col md={9}>
                        <div style={{"margin": "1em 1em 1em 1em"}}>
                            <SearchBox
                                value={props.searchString}
                                onChange={props.setQueryString}
                                onSearch={props.setQueryFilter}/>
                            <br/>
                            <QueryStatusLine
                                resultSize={props.datasetCount}
                                query={props.query}
                            />
                            <br/>
                            <DatasetList values={props.data}/>
                            <br/>
                            <Paginator
                                start={0}
                                end={Math.ceil(props.datasetCount / 10)}
                                value={props.query.page}
                                onChange={this.props.setPage}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    // "fetching": state.dataset.list.fetching,
    "searchString": state.dataset.list.searchString,
    "keyword": state.dataset.list.keyword,
    "publisher": state.dataset.list.publisher,
    "data": state.dataset.list.data,
    "datasetCount": state.dataset.list.datasetCount,
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
