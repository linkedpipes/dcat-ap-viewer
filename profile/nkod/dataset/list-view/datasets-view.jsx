import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import {
  URL_DATASET_LIST,
  URL_DATASET_DETAIL,
  QUERY_DATASET_LIST_PUBLISHER,
  QEURY_DATASET_DETAIL_IRI,
  selectTLabel,
  selectTUrl,
  selectTLiteral,
  fetchLabels,
  selectT,
  getGlobal,
  register,
  PAGE_SIZE_DEFAULT,
} from "../../../client-api";
import TagLine from "../../user-iterface/tag-line";
import Paginator from "../../user-iterface/paginator";
import DatasetsViewHeader from "./datasets-view-header";
import {DATASET_LIST_DATASET_VIEW} from "../../nkod-component-names";

const PAGE_SIZES = [getGlobal(PAGE_SIZE_DEFAULT), 20, 40, 80];

function DatasetsView(props) {
  return (
    <React.Fragment>
      <DatasetsViewHeader
        t={props.t}
        tLabel={props.tLabel}
        query={props.query}
        datasetCount={props.datasetsCount}
        onSortSet={props.onSortSet}
      />
      <div>
        {props.datasets.map(dataset => (
          <DatasetListItem
            key={dataset.iri}
            tLabel={props.tLabel}
            tLiteral={props.tLiteral}
            tUrl={props.tUrl}
            showPublisher={props.showPublisher}
            dataset={dataset}
            fetchLabels={props.fetchLabels}
          />
        ))}
      </div>
      <br/>
      <Paginator
        recordsCount={props.datasetsCount}
        pageIndex={props.page}
        pageSize={props.pageSize}
        onIndexChange={props.onUpdatePage}
        onSizeChange={props.onUpdatePageSize}
        sizes={PAGE_SIZES}/>
    </React.Fragment>
  )
}

DatasetsView.propTypes = {
  "datasetsCount": PropTypes.number.isRequired,
  "datasets": PropTypes.array.isRequired,
  "t": PropTypes.func.isRequired,
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "showPublisher": PropTypes.bool.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
  "page": PropTypes.number.isRequired,
  "pageSize": PropTypes.number.isRequired,
  "onFetchMore": PropTypes.func.isRequired,
  "onUpdatePage": PropTypes.func.isRequired,
  "onUpdatePageSize": PropTypes.func.isRequired,
  "onSortSet": PropTypes.func.isRequired,
  "query": PropTypes.object.isRequired,
};

register({
  "name": DATASET_LIST_DATASET_VIEW,
  "element": connect((state) => ({
    "t": selectT(state),
    "tLabel": selectTLabel(state),
    "tUrl": selectTUrl(state),
    "tLiteral": selectTLiteral(state),
  }), (dispatch) => ({
    "fetchLabels": (iris) => dispatch(fetchLabels(iris)),
  }))(DatasetsView),
});

function DatasetListItem(
  {tLabel, tLiteral, tUrl, showPublisher, dataset, fetchLabels}) {
  fetchLabels([dataset.iri, dataset.publisher, ...dataset.formats]);
  const datasetUrl = tUrl(
    URL_DATASET_DETAIL,
    {[QEURY_DATASET_DETAIL_IRI]: dataset.iri});
  const publisherUrl = tUrl(
    URL_DATASET_LIST,
    {[QUERY_DATASET_LIST_PUBLISHER]: dataset.publisher});
  return (
    <div>
      <Link to={datasetUrl}>
        <h4>{tLabel(dataset.iri)}</h4>
      </Link>
      {
        showPublisher &&
        <Link to={publisherUrl}>{tLabel(dataset.publisher)}</Link>
      }
      <p style={{
        "overflow": "hidden",
        "display": "-webkit-box",
        "WebkitLineClamp": "3",
        "WebkitBoxOrient": "vertical",
      }}>
        {tLiteral(dataset.description)}
      </p>
      <TagLine
        items={dataset.formats}
        size={0.7}
        labelFunction={(iri) => tLabel(iri, iri)}
      />
      <hr/>
    </div>
  )
}

DatasetListItem.propTypes = {
  "tLabel": PropTypes.func.isRequired,
  "tLiteral": PropTypes.func.isRequired,
  "tUrl": PropTypes.func.isRequired,
  "showPublisher": PropTypes.bool.isRequired,
  "dataset": PropTypes.object.isRequired,
  "fetchLabels": PropTypes.func.isRequired,
};
