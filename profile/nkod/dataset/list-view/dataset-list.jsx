import React from "react";
import {Col, Container, Row} from "reactstrap";
import {
  ELEMENT_DATASET_LIST,
  register,
  getRegisteredElement,
  selectT,
  selectTLabel, getGlobal, DEFAULT_FACET_SIZE,
} from "../../../client-api";
import {PropTypes} from "prop-types";
import {Status} from "../../user-iterface/status";
import {
  DATASET_LIST_DATASET_VIEW,
  DATASET_LIST_FACET_FILTERS,
  DATASET_LIST_KEYWORD_VIEW,
  DATASET_LIST_THEME_VIEW,
} from "../../nkod-component-names";
import QueryElement from "./query-element";
import {connect} from "react-redux";
import {
  paramsToViewQuery,
  viewQueryToDatasetListQuery,
  viewQueryToNavigation,
  createDefaultQuery,
} from "./dataset-list-query";

// We ask for more facets by default that we need to prevent
// immediate fetch as user expand the facets.
const REQUEST_ADDITIONAL_FACETS = 3;

const SHOW_MORE_DATASETS = 12;

class DatasetList extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onFetchMoreFacet = this.onFetchMoreFacet.bind(this);
    this.onToggleFacet = this.onToggleFacet.bind(this);
    this.onSetView = this.onSetView.bind(this);
    this.selectViewElement = this.selectViewElement.bind(this);
    this.onDatasetsPage = this.onDatasetsPage.bind(this);
    this.onDatasetsPageSize = this.onDatasetsPageSize.bind(this);
    this.onDatasetsSort = this.onDatasetsSort.bind(this);
    this.onSetSearchText = this.onSetSearchText.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
    this.onSetTemporal = this.onSetTemporal.bind(this);
    this.onShowMoreDatasets = this.onShowMoreDatasets.bind(this);
    //
    const facetSize = getGlobal(DEFAULT_FACET_SIZE);
    this.state = {
      "publisherLimit": facetSize * REQUEST_ADDITIONAL_FACETS,
      "themeLimit": facetSize * REQUEST_ADDITIONAL_FACETS,
      "keywordLimit": facetSize * REQUEST_ADDITIONAL_FACETS,
      "formatLimit": facetSize * REQUEST_ADDITIONAL_FACETS,
      "initialised": true,
      "showMore": 0,
    };
  }

  // TODO We may compute query only once and add it to props.
  // static getDerivedStateFromProps(props, state) {
  //   return {
  //     "viewQuery": paramsToViewQuery(props.query, state),
  //   };
  // }

  componentDidMount() {
    const viewQuery = paramsToViewQuery(this.props.query, this.state);
    const datasetQuery = viewQueryToDatasetListQuery(viewQuery);
    this.props.onFetchDatasets(datasetQuery);
    //
    this.FacetFilters = getRegisteredElement(DATASET_LIST_FACET_FILTERS);
    this.QueryElement = this.props.withTypeaheadProps(QueryElement);
    this.DatasetView = this.props.withViewProps(
      getRegisteredElement(DATASET_LIST_DATASET_VIEW));
    this.KeywordView = this.props.withViewProps(
      getRegisteredElement(DATASET_LIST_KEYWORD_VIEW));
    this.ThemeView = this.props.withViewProps(
      getRegisteredElement(DATASET_LIST_THEME_VIEW));
    //
    this.setState({"initialised": true});
  }

  componentDidUpdate(prevProps, prevState) {
    const nextViewQuery = paramsToViewQuery(this.props.query, this.state);
    const nextDatasetQuery = viewQueryToDatasetListQuery(nextViewQuery);
    const prevViewQuery = paramsToViewQuery(prevProps.query, prevState);
    const prevDatasetQuery = viewQueryToDatasetListQuery(prevViewQuery);
    this.props.onFetchDatasets(nextDatasetQuery, prevDatasetQuery);
  }

  render() {
    if (this.props.error > 0 || !this.props.ready) {
      return (
        <Status
          t={this.props.t}
          error={this.props.error}
          ready={this.props.ready}
        />
      )
    }
    //
    const query = paramsToViewQuery(this.props.query, this.state);
    const {FacetFilters, QueryElement} = this;
    const ViewElement = this.selectViewElement(query.view);
    return (
      <Container>
        <Row>
          <Col xs={12} md={3}>
            <FacetFilters
              t={this.props.t}
              tLabel={this.props.tLabel}
              withFacetProps={this.props.withFacetProps}
              fetchMoreFacet={this.onFetchMoreFacet}
              toggleFacet={this.onToggleFacet}
              activeFacet={query}
              fetchLabels={this.props.fetchLabels}
            />
          </Col>
          <Col xs={12} md={9}>
            <div className="m-md-1">
              <QueryElement
                t={this.props.t}
                query={query}
                onSetView={this.onSetView}
                onSetSearchText={this.onSetSearchText}
                onClearFilters={this.onClearFilters}
                onSetTemporal={this.onSetTemporal}
              />
            </div>
            <div className="m-md-1">
              <ViewElement
                t={this.props.t}
                tLabel={this.props.tLabel}
                query={query}
                onDatasetsPage={this.onDatasetsPage}
                onDatasetsPageSize={this.onDatasetsPageSize}
                onDatasetsSort={this.onDatasetsSort}
                onShowMoreDatasets={this.onShowMoreDatasets}
                toggleFacet={this.onToggleFacet}
                fetchMoreFacet={this.onFetchMoreFacet}
                fetchLabels={this.props.fetchLabels}
              />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  onFetchMoreFacet(facetName, count) {
    const key = facetName + "Limit";
    this.setState({[key]: count});
  }

  onToggleFacet(facetName, value) {
    const query = paramsToViewQuery(this.props.query, this.state);
    const index = query[facetName].indexOf(value);
    if (index > -1) {
      query[facetName].splice(index, 1)
    } else {
      query[facetName].push(value);
    }
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onSetView(value) {
    const query = paramsToViewQuery(
      this.props.query, this.state, ["page", "pageSize", "sort"]);
    query.view = value;
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  selectViewElement(view) {
    switch (view) {
      case 1:
        return this.KeywordView;
      case 2:
        return this.ThemeView;
      case 0:
      default:
        return this.DatasetView;
    }
  }

  onDatasetsPage(page) {
    const query = paramsToViewQuery(this.props.query, this.state);
    query.page = page;
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onDatasetsPageSize(size) {
    const query = paramsToViewQuery(this.props.query, this.state);
    query.page = 0;
    query.pageSize = size;
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onDatasetsSort(sortBy) {
    const query = paramsToViewQuery(this.props.query, this.state);
    query.sort = sortBy;
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onSetSearchText(search) {
    const query = paramsToViewQuery(
      this.props.query, this.state, ["page", "pageSize", "sort"]);
    query.search = search;
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));

  }

  onClearFilters() {
    const query = createDefaultQuery();
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onSetTemporal(start, end) {
    const query = paramsToViewQuery(
      this.props.query, this.state, ["page", "pageSize", "sort"]);
    query.temporalStart = start;
    query.temporalEnd = end;
    this.setState({"showMore": 0});
    this.props.onUpdateNavigation(viewQueryToNavigation(query));
  }

  onShowMoreDatasets() {
    this.setState({"showMore": this.state.showMore + SHOW_MORE_DATASETS});
  }

}

DatasetList.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  //
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "query": PropTypes.object.isRequired,
  "onFetchDatasets": PropTypes.func.isRequired,
  "onUpdateNavigation": PropTypes.func.isRequired,
  "withFacetProps": PropTypes.func.isRequired,
  "withTypeaheadProps": PropTypes.func.isRequired,
  "withViewProps": PropTypes.func.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};

register({
  "name": ELEMENT_DATASET_LIST,
  "element": connect((state) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
  }))(DatasetList),
});
