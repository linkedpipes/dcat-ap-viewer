import React from "react";
import {connect} from "react-redux";
import {
    Input,
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
    PAGE_SIZE_QUERY,
    TEMPORAL_START,
    TEMPORAL_END
} from "../../application/navigation";
import {getString} from "../../application/strings";
import setPageTitle from "../../services/page-title";
import {
    STATUS_FETCHING,
    STATUS_FAILED,
    isDataReady,
    fetchJson
} from "./../../services/http-request";
import {HttpRequestStatus} from "./../../application/http-request-status";
import {constructTypeaheadUrl} from "./../solr-api";

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

const DatasetListLoaded = ({datasetCount, query, datasets, setPageIndex, setPageSize, showPublisher, onSearch, onFetchOptions}) => (
    <div>
        <QueryStatusLine
            resultSize={datasetCount}
            query={query}
            onSearch={onSearch}
            onFetchOptions={onFetchOptions}
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

class FilterBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialStatus();
        this.toggleVisibility = this.toggleVisibility.bind(this);
    }

    getInitialStatus() {
        // TODO Make filters visible on first opening if they are used.
        return {
            "visible" : false
        }
    }

    toggleVisibility() {
        this.setState({"visible": !this.state.visible});
    }

    render() {
        const {onClearFilters, setTemporalStart, setTemporalEnd, temporalStart, temporalEnd, searchQuery, setQueryString, onSearch, onFetchOptions} = this.props;
        return (
            <div style={{
                "borderStyle": "solid",
                "borderWidth": "1px",
                "borderColor": "#E0E0E0",
                "padding": "0.5REM",
                "marginBottom": "1REM"
            }}>
                <SearchBox
                    value={searchQuery}
                    onValueChange={setQueryString}
                    onSearch={onSearch}
                    onFetchOptions={onFetchOptions}/>
                {this.state.visible &&
                <div style={{"margin": "1REM 1REM 0REM 2REM"}}>
                    <Row style={{"lineHeight": "2.5REM"}}>
                        <span style={{"marginRight": "0.5REM"}}>
                            {getString("s.temporal")}
                        </span>
                        <span style={{"marginRight": "0.5REM"}}>
                            {getString("s.from")}
                        </span>
                        <Input type="date" id="temporal-start"
                               onChange={setTemporalStart}
                               value={temporalStart}
                               style={{"width": "12REM"}}/>
                        <span style={{
                            "marginRight": "0.5REM",
                            "marginLeft": "0.5REM"
                        }}>
                            {getString("s.to")}
                        </span>
                        <Input type="date" id="temporal-end"
                               onChange={setTemporalEnd}
                               value={temporalEnd}
                               style={{"width": "12REM"}}/>
                    </Row>
                </div>
                }
                <Row style={{"marginTop": "1REM"}}>
                    <Col>
                        <Button onClick={this.toggleVisibility}>
                            {this.state.visible ? getString("s.hide_filters") : getString("s.show_filters")}
                        </Button>
                    </Col>
                    <Col>
                        <div className="float-right">
                            <Button onClick={onClearFilters}>
                                {getString("s.clear_filters")}
                            </Button>
                        </div>
                    </Col>
                </Row>

            </div>
        )
    }

}

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
        // TODO Move to http-request service ?
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

        const showDatasetList = isDataReady(props.status);

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
                            <FilterBox
                                searchQuery={props.searchQuery}
                                setQueryString={props.setQueryString}
                                onSearch={this.callIfNotFetching(props.setQueryFilter)}
                                temporalStart={this.props.query.temporalStart}
                                temporalEnd={this.props.query.temporalEnd}
                                setTemporalStart={this.callIfNotFetching(this.props.setTemporalStart)}
                                setTemporalEnd={this.callIfNotFetching(this.props.setTemporalEnd)}
                                onClearFilters={this.callIfNotFetching(this.props.clearFilters)}
                                onFetchOptions={this.props.onFetchOptions}/>
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
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {
                ...ownProps.router.location.query,
                [getQuery(SORT_QUERY)]: value,
                [getQuery(PAGE_QUERY)]: undefined
            }
        });
    },
    "clearFilters": () => {
        ownProps.router.push({
            "pathname": ownProps.router.location.pathname,
            "query": {}
        });
    },
    "setTemporalStart": (event) => {
        const value = event.target.value;
        if (value === "") {
            ownProps.router.push({
                "pathname": ownProps.router.location.pathname,
                "query": {
                    ...ownProps.router.location.query,
                    [getQuery(TEMPORAL_START)]: undefined,
                    [getQuery(PAGE_QUERY)]: undefined
                }
            });
        } else {
            ownProps.router.push({
                "pathname": ownProps.router.location.pathname,
                "query": {
                    ...ownProps.router.location.query,
                    [getQuery(TEMPORAL_START)]: value,
                    [getQuery(PAGE_QUERY)]: undefined
                }
            });
        }
    },
    "setTemporalEnd": (event) => {
        const value = event.target.value;
        if (value === "") {
            ownProps.router.push({
                "pathname": ownProps.router.location.pathname,
                "query": {
                    ...ownProps.router.location.query,
                    [getQuery(TEMPORAL_END)]: undefined,
                    [getQuery(PAGE_QUERY)]: undefined
                }
            });
        } else {
            ownProps.router.push({
                "pathname": ownProps.router.location.pathname,
                "query": {
                    ...ownProps.router.location.query,
                    [getQuery(TEMPORAL_END)]: value,
                    [getQuery(PAGE_QUERY)]: undefined
                }
            });
        }
    },
    "onFetchOptions": (query, onSuccess, onFail) => {
        const url = constructTypeaheadUrl(query);
        return fetchJson(url).then((data) => {
            onSuccess(data.json.response.docs.map((item) => item.title));
        }).catch(onFail);
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
