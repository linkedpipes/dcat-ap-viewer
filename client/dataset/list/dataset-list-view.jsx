import React from "react";
import {connect} from "react-redux";
import {Row, Col, Container, Button} from "reactstrap";
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
import {formatNumber} from "../../services/formats";
import {
    getQuery,
    FORMAT_QUERY,
    STRING_QUERY,
    KEYWORDS_QUERY,
    PAGE_QUERY,
    PUBLISHER_QUERY
} from "../../application/navigation";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";

const QueryStatusLine = ({resultSize, query}) => (
    <div>
        <h4>
            {formatNumber(resultSize)} {getString("s.datasets_found")}
            {query.search &&
            getString("s.with_query") + ": \"" + query.search + "\""
            }
        </h4>
        <TagLine values={query.publisher}/>
        <TagLine values={query.keyword}/>
        <TagLine values={query.format}/>
    </div>
);

const DatasetListLoaded = ({datasetCount, query, datasets, setPage, showPublisher}) => (
    <div>
        <QueryStatusLine
            resultSize={datasetCount}
            query={query}
        />
        <br/>
        <DatasetList
            values={datasets}
            showPublisher={showPublisher}
        />
        <br/>
        <Paginator
            start={0}
            end={Math.ceil(datasetCount / 10)}
            value={query.page}
            onChange={setPage}/>
    </div>
);

const DatasetListNotLoaded = ({status}) => {
    // TODO Export status report to another component
    if (status === "uninitialized") {
        return (
            <div style={{"textAlign": "center", "fontSize": "2em"}}>
                {getString("s.no_data")}
            </div>
        )
    } else if (status === "fetching") {
        return (
            <div style={{"textAlign": "center", "fontSize": "2em"}}>
                {getString("s.fetching")}
            </div>
        )
    } else if (status === "failed") {
        return (
            <div style={{"textAlign": "center", "fontSize": "2em"}}>
                {getString("s.failed")}
            </div>
        )
    } else {
        console.error("DatasetListNotLoaded used with invalid status:", status);
        return (
            <div></div>
        )
    }
};

class DatasetListViewComponent extends React.Component {

    constructor(props) {
        super(props);
        this.toggleFacets = this.toggleFacets.bind(this);
        this.callIfNotFetching = this.callIfNotFetching.bind(this);
        this.state = {
            "areFacetsOpen": false
        };
    }

    componentDidMount() {
        this.props.fetchData(this.props.query);
    }

    componentWillReceiveProps(nextProps) {
        // Check whether we need to update data.
        if (nextProps.query !== this.props.query) {
            this.props.fetchData(nextProps.query);
        }
    }

    toggleFacets() {
        this.setState({
            "areFacetsOpen": !this.state.areFacetsOpen
        });
    }

    callIfNotFetching(action) {
        const isLoading = this.props.status === "fetching";
        if (isLoading) {
            return () => {
            };
        } else {
            return action;
        }
    }

    render() {
        const props = this.props;
        const showPublisher = props.query.publisher === undefined ||
            props.query.publisher.length === 0;

        if (props.query.publisher != "") {
            setPageTitle(props.query.publisher);
        } else {
            setPageTitle(getString("title.datasets"));
        }

        // TODO Extract into another component
        let facetClassName;
        let toggleButtonLabel;
        if (this.state.areFacetsOpen) {
            toggleButtonLabel = getString("s.hide_facets");
            facetClassName = "collapse-sm-down show";
        } else {
            toggleButtonLabel = getString("s.show_facets");
            facetClassName = "collapse-sm-down";
        }
        const areDataActual = props.status === "actual";
        return (
            <Container>
                <Row>
                    <Col xs={12} md={3}>
                        <div className="hidden-sm-up">
                            <Button onClick={this.toggleFacets}
                                    style={{"margin": "1em"}}>
                                {toggleButtonLabel}
                            </Button>
                        </div>
                        <div className={facetClassName}>
                            <FacetFilter
                                label="s.publishers"
                                values={props.publisher}
                                active={props.query.publisher}
                                onChange={this.callIfNotFetching(props.setPublisherFacet)}
                            />
                            <FacetFilter
                                label="s.keywords"
                                values={props.keyword}
                                active={props.query.keyword}
                                onChange={this.callIfNotFetching(props.setKeywordsFacet)}
                            />
                            <FacetFilter
                                label="s.formats"
                                values={props.format}
                                active={props.query.format}
                                onChange={this.callIfNotFetching(props.setFormatFacet)}
                            />
                        </div>
                    </Col>
                    <Col xs={12} md={9}>
                        <div style={{"margin": "1em 1em 1em 1em"}}>
                            <SearchBox
                                value={props.searchQuery}
                                onChange={props.setQueryString}
                                onSearch={this.callIfNotFetching(props.setQueryFilter)}/>
                            <br/>
                            { areDataActual &&
                            <DatasetListLoaded datasetCount={props.datasetCount}
                                               query={props.query}
                                               datasets={props.datasets}
                                               setPage={props.setPage}
                                               showPublisher={showPublisher}
                            />
                            }
                            { !areDataActual &&
                            <DatasetListNotLoaded status={props.status}/>
                            }
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
    "status": state.dataset.list.data.status
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
            "pathname": ownProps.router.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(STRING_QUERY)]: value,
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "setKeywordsFacet": (facet, isActive) => {
        let keywords = ownProps.router.location.query[getQuery(KEYWORDS_QUERY)];
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(KEYWORDS_QUERY)]: updateValueList(facet.label, isActive, keywords),
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "setPublisherFacet": (facet, isActive) => {
        let publishers = ownProps.router.location.query[getQuery(PUBLISHER_QUERY)];
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(PUBLISHER_QUERY)]: updateValueList(facet.label, isActive, publishers),
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "setFormatFacet": (facet, isActive) => {
        let formats = ownProps.router.location.query[getQuery(FORMAT_QUERY)];
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(FORMAT_QUERY)]: updateValueList(facet.label, isActive, formats),
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "setPage": (page) => {
        if (page == 0) {
            page = undefined;
        }
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(PAGE_QUERY)]: page
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
