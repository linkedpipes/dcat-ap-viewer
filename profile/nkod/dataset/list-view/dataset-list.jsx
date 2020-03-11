import React, {useState} from "react";
import {connect} from "react-redux";
import {Button, Col, Container, Row} from "reactstrap";
import {
  ELEMENT_DATASET_LIST,
  register,
  selectT,
  selectTLabel,
  selectQuery,
  QUERY_DATASET_LIST_VIEW,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_THEME,
  QUERY_DATASET_LIST_KEYWORD,
  QUERY_DATASET_LIST_FORMAT,
  QUERY_DATASET_LIST_PAGE,
  QUERY_DATASET_LIST_PAGE_SIZE, getGlobal,
} from "../../../client-api";
import {PropTypes} from "prop-types";
import DatasetsView, {DEFAULT_PAGE_SIZE} from "./datasets-view";
import FacetFilter from "./facet-filter";
import QueryElement from "./query-element";
import KeywordView from "./keyword-view";
import ThemeView from "./theme-view";
import {Status} from "../../user-iterface/status";

function DatasetList(props) {
  const [facetsOpen, setFacetsOpen] = useState(false);

  if (props.error > 0 || !props.ready) {
    // TODO Use only for initial data loading !
    return (
      <Status t={props.t} error={props.error} ready={props.ready}/>
    )
  }

  const facetClassName = "collapse-sm-down" + (facetsOpen ? " show" : "");
  const FacetContainer = props.facetContainer;
  const QueryInputContainer = props.queryInputContainer;
  const ViewContainer = props.viewContainer;

  const onSetView = (value) => {
    if (value === 0) {
      // For 0 we use no value - i.e. the default.
      value = undefined;
    }
    // We keep all other values so user can go back to the dataset list.
    props.search({
      ...props.query,
      [QUERY_DATASET_LIST_VIEW]: value,
    })
  };

  const selectKeywordId = (item) => item.code;

  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
          <div className="d-sm-none">
            <Button
              onClick={() => setFacetsOpen(!facetsOpen)}
              style={{"margin": "1em"}}
            >
              {props.t(facetsOpen ? "facet.hide" : "facet.show")}
            </Button>
          </div>
          <div className={facetClassName}>
            <FacetContainer
              group={QUERY_DATASET_LIST_PUBLISHER}
              component = {FacetFilter}
              t={props.t}
              label="publishers"
              getFacetLabel={(item) => props.tLabel(item.iri)}
              fetchLabelsFromRemote={true}
            >
            </FacetContainer>
            <FacetContainer
              group={QUERY_DATASET_LIST_THEME}
              component = {FacetFilter}
              t={props.t}
              label="themes"
              getFacetLabel={(item) => props.tLabel(item.iri)}
              fetchLabelsFromRemote={true}
            >
            </FacetContainer>
            <FacetContainer
              group={QUERY_DATASET_LIST_KEYWORD}
              component = {FacetFilter}
              t={props.t}
              label="keywords"
              getFacetLabel={selectKeywordId}
              getFacetId={selectKeywordId}
            >
            </FacetContainer>
            <FacetContainer
              group={QUERY_DATASET_LIST_FORMAT}
              component = {FacetFilter}
              t={props.t}
              label="formats"
              getFacetLabel={(item) => props.tLabel(item.iri)}
              fetchLabelsFromRemote={true}
            >
            </FacetContainer>
          </div>
        </Col>
        <Col xs={12} md={9}>
          <div className="m-md-1">
            <QueryInputContainer>
              <QueryElement onSetView={onSetView}/>
            </QueryInputContainer>
          </div>
          <div className="m-md-1">
            <ViewContainer>
              {ActiveView(props)}
            </ViewContainer>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

DatasetList.propTypes = {
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "facetContainer": PropTypes.object.isRequired,
  "queryInputContainer": PropTypes.object.isRequired,
  "viewContainer": PropTypes.object.isRequired,
  "ready": PropTypes.bool.isRequired,
  "error": PropTypes.number.isRequired,
  "query": PropTypes.object.isRequired,
  "search": PropTypes.func.isRequired,
  "onFetchMore": PropTypes.func.isRequired,
  "onUpdatePage": PropTypes.func.isRequired,
  "onUpdatePageSize": PropTypes.func.isRequired,
  "onSortSet": PropTypes.func.isRequired,
};

register({
  "name": ELEMENT_DATASET_LIST,
  "element": connect((state) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
    "query": selectQuery(state),
  }))(DatasetList),
});

function ActiveView(props) {
  const view = props.query[QUERY_DATASET_LIST_VIEW] ?
    parseInt(props.query[QUERY_DATASET_LIST_VIEW][0]) : 0;
  switch (view) {
    case 1:
      return (
        <KeywordView/>
      );
    case 2:
      return (
        <ThemeView/>
      );
    case 0:
    default:
      // TODO ADD FUNCTION IMPLEMENTATION
      return (
        <DatasetsView
          showPublisher={getShowPublisher(props.query)}
          page={getPage(props.query)}
          pageSize={getPageSize(props.query)}
          onFetchMore={props.onFetchMore}
          onUpdatePage={(page) => onUpdatePage(page, props.onUpdatePage)}
          onUpdatePageSize={
            (size) => onUpdatePageSize(size, props.onUpdatePageSize)}
          onSortSet={(value) => onUpdateSort(value, props.onSortSet)}
          query={props.query}
        />
      );
  }
}

ActiveView.propTypes = {
  "query": PropTypes.object.isRequired,
  "themes": PropTypes.array.isRequired,
  "keywords": PropTypes.array.isRequired,
  "onFetchMore": PropTypes.func.isRequired,
  "onUpdatePage": PropTypes.func.isRequired,
  "onUpdatePageSize": PropTypes.func.isRequired,
  "onSortSet": PropTypes.func.isRequired,
};

function getShowPublisher(query) {
  return !(query[QUERY_DATASET_LIST_PUBLISHER] &&
    query[QUERY_DATASET_LIST_PUBLISHER].length > 0);
}

function getPage(query) {
  return query[QUERY_DATASET_LIST_PAGE] ?
    parseInt(query[QUERY_DATASET_LIST_PAGE][0]) - 1 : 0;
}

function getPageSize(query) {
  return query[QUERY_DATASET_LIST_PAGE_SIZE] ?
    parseInt(query[QUERY_DATASET_LIST_PAGE_SIZE][0]) : DEFAULT_PAGE_SIZE;
}

function onUpdatePage(page, action) {
  if (page === 0) {
    page = undefined;
  } else {
    // We count from 1 not 0.
    page += 1;
  }
  action(page);
}

function onUpdatePageSize(pageSize, action) {
  // Hyde default values.
  if (pageSize === DEFAULT_PAGE_SIZE) {
    action(undefined);
  } else {
    action(pageSize);
  }
}

function onUpdateSort(value, action) {
  const defaultSort = getGlobal("dataset-list-sort-default");
  if (value === defaultSort) {
    value = undefined;
  }
  action(value);
}
