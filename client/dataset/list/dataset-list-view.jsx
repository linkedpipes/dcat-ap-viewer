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
  UncontrolledDropdown,
} from "reactstrap";
import FacetFilter from "../../app-components/facet-filter";
import SearchBox from "../../app-components/search-box";
import DatasetList from "./dataset-list";
import Paginator from "../../app-components/paginator";
import {
  fetchData,
  setQueryString,
} from "./dataset-list-actions";
import TagLine from "../../app-components/tag-line";
import {formatNumber} from "../../app-services/formats";
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
  TEMPORAL_END,
} from "../../app/navigation";
import {getString} from "../../app/strings";
import setPageTitle from "../../app-services/page-title";
import {
  STATUS_FETCHING,
  isDataReady,
  fetchJson,
} from "../../app-services/http-request";
import {HttpRequestStatus} from "../../app/http-request-status";
import {constructTypeaheadUrl} from "./../solr-api";
import {parse as parseQueryString} from "query-string";
import {push} from "react-router-redux";
import {PropTypes} from "prop-types";

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

QueryStatusLine.propTypes = {
  "resultSize": PropTypes.number.isRequired,
  "query": PropTypes.object.isRequired,
};

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
      sizes={[10, 20, 40, 80]}
    />
  </div>
);

DatasetListLoaded.propTypes = {
  "setPageIndex": PropTypes.func.isRequired,
  "setPageSize": PropTypes.func.isRequired,
  "onSearch": PropTypes.func.isRequired,
  "onFetchOptions": PropTypes.func.isRequired,
  "showPublisher": PropTypes.func.isRequired,
  "datasetCount": PropTypes.number.isRequired,
  "query": PropTypes.object.isRequired,
  "datasets": PropTypes.object.isRequired,
};

class FilterBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getInitialStatus();
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  getInitialStatus() {
    // TODO Make filters visible on first opening if they are used.
    return {
      "visible": false,
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
        "marginBottom": "1REM",
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
                      "marginLeft": "0.5REM",
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

FilterBox.propTypes = {
  "onClearFilters": PropTypes.func.isRequired,
  "setTemporalStart": PropTypes.func.isRequired,
  "setTemporalEnd": PropTypes.func.isRequired,
  "temporalStart": PropTypes.object.isRequired,
  "temporalEnd": PropTypes.object.isRequired,
  "searchQuery": PropTypes.string.isRequired,
  "setQueryString": PropTypes.func.isRequired,
  "onSearch": PropTypes.func.isRequired,
  "onFetchOptions": PropTypes.func.isRequired,
};

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
            {value !== "title asc" &&
                        <DropdownItem onClick={() => onChange("title asc")}>
                          {getString("title asc")}
                        </DropdownItem>
            }
            {value !== "title desc" &&
                        <DropdownItem onClick={() => onChange("title desc")}>
                          {getString("title desc")}
                        </DropdownItem>
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    );
  }
}

SortSelector.propTypes = {
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string.isRequired,
};

class DatasetListViewComponent extends React.Component {

  constructor(props) {
    super(props);
    this.toggleFacets = this.toggleFacets.bind(this);
    this.callIfNotFetching = this.callIfNotFetching.bind(this);
    this.state = {
      "areFacetsOpen": false,
    };
  }

  componentDidMount() {
    this.props.fetchData(this.props.query);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // Check whether we need to update data.
    if (nextProps.query !== this.props.query) {
      this.props.fetchData(nextProps.query);
    }
  }

  toggleFacets() {
    this.setState({
      "areFacetsOpen": !this.state.areFacetsOpen,
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

    if (props.query.publisher.length !== 0) {
      setPageTitle(props.query.publisher[0]);
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
            <div className="d-sm-none">
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
              {showDatasetList &&
                            <DatasetListLoaded datasetCount={props.datasetCount}
                              query={props.query}
                              datasets={props.datasets}
                              setPageIndex={props.setPageIndex}
                              setPageSize={props.setPageSize}
                              showPublisher={showPublisher}
                            />
              }
              {!showDatasetList &&
                            <HttpRequestStatus status={props.status}/>
              }
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

DatasetListViewComponent.propTypes = {
  "fetchData": PropTypes.func.isRequired,
  "setQueryString": PropTypes.func.isRequired,
  "setQueryFilter": PropTypes.func.isRequired,
  "setKeywordsFacet": PropTypes.func.isRequired,
  "setPublisherFacet": PropTypes.func.isRequired,
  "setFormatFacet": PropTypes.func.isRequired,
  "setPageIndex": PropTypes.func.isRequired,
  "setPageSize": PropTypes.func.isRequired,
  "setSort": PropTypes.func.isRequired,
  "clearFilters": PropTypes.func.isRequired,
  "setTemporalStart": PropTypes.func.isRequired,
  "setTemporalEnd": PropTypes.func.isRequired,
  "onFetchOptions": PropTypes.func.isRequired,
  "searchQuery": PropTypes.string.isRequired,
  "keyword": PropTypes.array.isRequired,
  "publisher": PropTypes.array.isRequired,
  "format": PropTypes.array.isRequired,
  "datasets": PropTypes.object.isRequired,
  "datasetCount": PropTypes.number.isRequired,
  "query": PropTypes.object.isRequired,
  "status": PropTypes.string,
};

const mapStateToProps = (state) => ({
  "searchQuery": state["dataset-list"].ui.searchQuery,
  "keyword": state["dataset-list"].data.keyword,
  "publisher": state["dataset-list"].data.publisher,
  "format": state["dataset-list"].data.format,
  "datasets": state["dataset-list"].data.datasets,
  "datasetCount": state["dataset-list"].data.datasetCount,
  "query": state["dataset-list"].query,
  "status": state["dataset-list"].data.status,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  "fetchData": (query) => {
    dispatch(fetchData(query));
  },
  "setQueryString": (value) => {
    dispatch(setQueryString(value));
  },
  "setQueryFilter": (value) => {
    if (value === "") {
      value = undefined;
    }
    dispatch(push(
      createPushObject(ownProps.location, {
        [STRING_QUERY]: value,
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "setKeywordsFacet": (facet, isActive) => {
    const params = parseQueryString(ownProps.location.search);
    let keywords = params[getQuery(KEYWORDS_QUERY)];
    dispatch(push(
      createPushObject(ownProps.location, {
        [KEYWORDS_QUERY]: updateValueList(facet.label, isActive, keywords),
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "setPublisherFacet": (facet, isActive) => {
    const params = parseQueryString(ownProps.location.search);
    let publishers = params[getQuery(PUBLISHER_QUERY)];
    dispatch(push(
      createPushObject(ownProps.location, {
        [PUBLISHER_QUERY]: updateValueList(facet.label, isActive, publishers),
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "setFormatFacet": (facet, isActive) => {
    const params = parseQueryString(ownProps.location.search);
    let formats = params[getQuery(FORMAT_QUERY)];
    dispatch(push(
      createPushObject(ownProps.location, {
        [FORMAT_QUERY]: updateValueList(facet.label, isActive, formats),
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "setPageIndex": (page) => {
    dispatch(push(
      createPushObject(ownProps.location, {
        [PAGE_QUERY]: page === 0 ? undefined : page,
      }),
    ));
  },
  "setPageSize": (pageSize) => {
    // Extract constant.
    dispatch(push(
      createPushObject(ownProps.location, {
        [PAGE_SIZE_QUERY]: pageSize === 10 ? undefined : pageSize,
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "setSort": (value) => {
    dispatch(push(
      createPushObject(ownProps.location, {
        [SORT_QUERY]: value,
        [PAGE_QUERY]: undefined,
      }),
    ));
  },
  "clearFilters": () => {
    dispatch(push({
      "pathname": ownProps.location.pathname,
      "search": "",
    }));
  },
  "setTemporalStart": (event) => {
    const value = event.target.value;
    if (value === "") {
      ownProps.router.push({
        "pathname": ownProps.location.pathname,
        "query": {
          ...ownProps.location.query,
          [getQuery(TEMPORAL_START)]: undefined,
          [getQuery(PAGE_QUERY)]: undefined,
        },
      });
    } else {
      ownProps.router.push({
        "pathname": ownProps.location.pathname,
        "query": {
          ...ownProps.location.query,
          [getQuery(TEMPORAL_START)]: value,
          [getQuery(PAGE_QUERY)]: undefined,
        },
      });
    }
  },
  "setTemporalEnd": (event) => {
    const value = event.target.value;
    if (value === "") {
      ownProps.router.push({
        "pathname": ownProps.location.pathname,
        "query": {
          ...ownProps.location.query,
          [getQuery(TEMPORAL_END)]: undefined,
          [getQuery(PAGE_QUERY)]: undefined,
        },
      });
    } else {
      ownProps.router.push({
        "pathname": ownProps.location.pathname,
        "query": {
          ...ownProps.location.query,
          [getQuery(TEMPORAL_END)]: value,
          [getQuery(PAGE_QUERY)]: undefined,
        },
      });
    }
  },
  "onFetchOptions": (query, onSuccess, onFail) => {
    const url = constructTypeaheadUrl(query);
    return fetchJson(url).then((data) => {
      onSuccess(data.json.response.docs.map((item) => item.title));
    }).catch(onFail);
  },
});

function updateValueList(value, isActive, activeList) {
  activeList = asNewArray(activeList);
  const index = activeList.indexOf(value);
  if (isActive && index === -1) {
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

function createPushObject(location, query) {
  let finalQuery = parseQueryString(location.search);
  Object.keys(query).map((key) => {
    const value = query[key];
    finalQuery[getQuery(key)] = value;
  });
  let search = "";
  Object.keys(finalQuery).map((key) => {
    let values = finalQuery[key];
    if (values === undefined || values.length === 0 || values === "") {
      return;
    }
    if (!Array.isArray(values)) {
      values = [values];
    }
    values.forEach((value) => {
      if (search === "") {
        search += "?";
      } else {
        search += "&";
      }
      search += encodeURIComponent(key) + "=" + encodeURIComponent(value);
    });
  });
  return {
    "pathname": location.pathname,
    "search": search,
  }
}

export const DatasetListView = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatasetListViewComponent);
