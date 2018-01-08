import React from "react";
import {connect} from "react-redux";
import {
    Row,
    Col,
    Container,
    Button,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from "reactstrap";
import FacetFilter from "../../components/facet-filter";
import SearchBox from "../../components/search-box";
import DatasetList from "./dataset-list";
import Paginator from "../../components/paginator";
import {
    fetchData,
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
    PUBLISHER_QUERY,
    SORT_QUERY,
    PAGE_SIZE_QUERY
} from "../../application/navigation";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";
import {
    STATUS_INITIAL,
    STATUS_FETCHING,
    STATUS_FETCHED,
    STATUS_FAILED
} from "./../../services/http-request";
import {isDataReady} from "./../../services/http-request";
import {HttpRequestStatus} from "./../../application/http-request-status";

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

const DatasetListLoaded = ({datasetCount, query, datasets, setPageIndex, setPageSize, showPublisher}) => (
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
            recordsCount={datasetCount}
            pageIndex={query.page}
            pageSize={query.pageSize}
            onIndexChange={setPageIndex}
            onSizeChange={setPageSize}
        />
    </div>
);

class SortSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {value, onChange} = this.props;
        return (
            <div style={{"float": "right"}}>
                <UncontrolledDropdown>
                    <DropdownToggle caret>
                        {getString(value)}
                    </DropdownToggle>
                    <DropdownMenu>
                        { value !== "title asc" &&
                        <DropdownItem onClick={() => onChange("title asc")}>
                            {getString("title asc")}
                        </DropdownItem>
                        }
                        { value !== "title desc" &&
                        <DropdownItem onClick={() => onChange("title desc")}>
                            {getString("title desc")}
                        </DropdownItem>
                        }
                        { value !== "issued asc" &&
                        <DropdownItem onClick={() => onChange("issued asc")}>
                            {getString("issued asc")}
                        </DropdownItem>
                        }
                        { value !== "issued desc" &&
                        <DropdownItem onClick={() => onChange("issued desc")}>
                            {getString("issued desc")}
                        </DropdownItem>
                        }
                        { value !== "modified asc" &&
                        <DropdownItem onClick={() => onChange("modified asc")}>
                            {getString("modified asc")}
                        </DropdownItem>
                        }
                        { value !== "modified desc" &&
                        <DropdownItem onClick={() => onChange("modified desc")}>
                            {getString("modified desc")}
                        </DropdownItem>
                        }
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }
}

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
        const isLoading = this.props.status === STATUS_FETCHING;
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

        // TODO Export as a selector.
        const showDatasetList =
            isDataReady(props.status) && props.datasets.length > 0;

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
                            <SortSelector
                                value={props.query.sort}
                                onChange={this.callIfNotFetching(props.setSort)}/>
                            <br/>
                            { showDatasetList &&
                            <DatasetListLoaded datasetCount={props.datasetCount}
                                               query={props.query}
                                               datasets={props.datasets}
                                               setPageIndex={props.setPageIndex}
                                               setPageSize={props.setPageSize}
                                               showPublisher={showPublisher}
                            />
                            }
                            { !showDatasetList &&
                            <HttpRequestStatus status={props.status}/>
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
        dispatch(fetchData(query));
    },
    "setQueryString": (value) => {
        dispatch(setQueryString(value));
    },
    "setQueryFilter": (value) => {
        if (value == "") {
            value = undefined;
        }
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
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
    "setPageIndex": (page) => {
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
    },
    "setPageSize": (pageSize) => {
        // TODO Export as some default constants to make this visible.
        if (pageSize == 10) {
            pageSize = undefined;
        }
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(PAGE_SIZE_QUERY)]: pageSize,
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "setSort": (value) => {
        console.log(value);
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(SORT_QUERY)]: value,
                [getQuery(PAGE_QUERY)]: undefined
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
