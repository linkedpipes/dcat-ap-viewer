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
    setQueryString,
    setListQueryFilter
} from "./dataset-list-actions";
import TagLine from "../../components/tag-line";
import {formatNumber} from "../../services/formats"

const QueryStatusLine = ({resultSize, query}) => (
    <div>
        <h4>
            {formatNumber(resultSize)} datových sad nalezeno
            {query.search &&
            " na dotaz: \"" + query.search + "\""
            }
        </h4>
        <TagLine values={query.publisher}/>
        <TagLine values={query.keyword}/>
        <TagLine values={query.format}/>
    </div>
);

class DatasetListViewComponent extends React.Component {

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        // Check whether we need to update data.
        if (nextProps.query !== this.props.query) {
            this.props.fetchData(nextProps.query);
        }
    }

    render() {
        const props = this.props;
        const showPublisher = props.query.publisher === undefined ||
            props.query.publisher.length === 0;
        return (
            <Container>
                <Row>
                    <Col md={3}>
                        <FacetFilter
                            label="Poskytovatelé"
                            values={props.publisher}
                            active={props.query.publisher}
                            onChange={props.setPublisherFacet}
                        />
                        <FacetFilter
                            label="Klíčová slova"
                            values={props.keyword}
                            active={props.query.keyword}
                            onChange={props.setKeywordsFacet}
                        />
                        <FacetFilter
                            label="Formát"
                            values={props.format}
                            active={props.query.format}
                            onChange={props.setFormatFacet}
                        />

                    </Col>
                    <Col md={9}>
                        <div style={{"margin": "1em 1em 1em 1em"}}>
                            <SearchBox
                                value={props.searchQuery}
                                onChange={props.setQueryString}
                                onSearch={props.setQueryFilter}/>
                            <br/>
                            <QueryStatusLine
                                resultSize={props.datasetCount}
                                query={props.query}
                            />
                            <br/>
                            <DatasetList
                                values={props.datasets}
                                showPublisher={showPublisher}
                            />
                            <br/>
                            <Paginator
                                start={0}
                                end={Math.floor(props.datasetCount / 10)}
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
    "searchQuery": state.dataset.list.ui.searchQuery,
    "keyword": state.dataset.list.data.keyword,
    "publisher": state.dataset.list.data.publisher,
    "format": state.dataset.list.data.format,
    "datasets": state.dataset.list.data.datasets,
    "datasetCount": state.dataset.list.data.datasetCount,
    "query": state.dataset.list.query,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    "fetchData": (query) => {
        dispatch(fetchDataRequest(query));
    },
    "setQueryString": (value) => {
        dispatch(setQueryString(value));
    },
    "setQueryFilter": (value) => {
        if (value == "") {
            value = undefined;
        }
        ownProps.router.push({
            "pathname": "/datasets",
            "query": {
                ...ownProps.router.location.query,
                "search": value,
                "page": undefined
            }
        });
    },
    "setKeywordsFacet": (facet, isActive) => {
        let keywords = ownProps.router.location.query.keyword;
        ownProps.router.push({
            "pathname": "/datasets",
            "query": {
                ...ownProps.router.location.query,
                "page": undefined,
                "keyword": updateValueList(facet.label, isActive, keywords)
            }
        });
    },
    "setPublisherFacet": (facet, isActive) => {
        let publishers = ownProps.router.location.query.publisher;
        ownProps.router.push({
            "pathname": "/datasets",
            "query": {
                ...ownProps.router.location.query,
                "page": undefined,
                "publisher": updateValueList(facet.label, isActive, publishers)
            }
        });
    },
    "setFormatFacet": (facet, isActive) => {
        let formats = ownProps.router.location.query.format;
        ownProps.router.push({
            "pathname": "/datasets",
            "query": {
                ...ownProps.router.location.query,
                "page": undefined,
                "format": updateValueList(facet.label, isActive, formats)
            }
        });
    },
    "setPage": (page) => {
        if (page == 0) {
            page = undefined;
        }
        ownProps.router.push({
            "pathname": "/datasets", "query": {
                ...ownProps.router.location.query,
                "page": page,
            }
        });
    }
});

function updateValueList(value, isActive, activeList) {
    activeList = asNewArray(activeList);
    const index = activeList.indexOf(value);
    if (isActive && index == -1) {
        activeList.push(value);
    } else if (index > -1) {
        activeList.splice(index, 1);
    }
    return activeList;
}

function asNewArray(value) {
    if (value === undefined) {
        return [];
    } else if (Array.isArray(value)) {
        return [...value];
    } else {
        return [value];
    }
}

export const DatasetListView = connect(
    mapStateToProps,
    mapDispatchToProps
)(DatasetListViewComponent);
