import React from "react";
import {connect} from "react-redux";
import {Col, Container, Row} from "reactstrap";
import {
  ELEMENT_DATASET_LIST,
  register,
  selectT,
  selectTLabel,
  selectQuery,
  QUERY_DATASET_LIST_VIEW,
  QUERY_DATASET_LIST_PUBLISHER,
  QUERY_DATASET_LIST_PAGE,
  QUERY_DATASET_LIST_PAGE_SIZE,
  getGlobal,
  getRegisteredElement,
  PAGE_SIZE_DEFAULT,
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

function DatasetList(props) {
  if (props.error > 0 || !props.ready) {
    // TODO Use only for initial data loading !
    return (
      <Status t={props.t} error={props.error} ready={props.ready}/>
    )
  }

  const FacetFilters = getRegisteredElement(DATASET_LIST_FACET_FILTERS);
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

  return (
    <Container>
      <Row>
        <FacetFilters
          t={props.t}
          tLabel={props.tLabel}
          facetContainer={props.facetContainer}
        />
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
  const DatasetsView = getRegisteredElement(DATASET_LIST_DATASET_VIEW);
  const KeywordView = getRegisteredElement(DATASET_LIST_KEYWORD_VIEW);
  const ThemeView = getRegisteredElement(DATASET_LIST_THEME_VIEW);
  //
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
  const defaultPageSize = getGlobal(PAGE_SIZE_DEFAULT);
  return query[QUERY_DATASET_LIST_PAGE_SIZE] ?
    parseInt(query[QUERY_DATASET_LIST_PAGE_SIZE][0]) : defaultPageSize;
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
  const defaultPageSize = getGlobal(PAGE_SIZE_DEFAULT);
  if (pageSize === defaultPageSize) {
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
